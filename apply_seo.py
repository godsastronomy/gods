#!/usr/bin/env python3
"""SEO improvements for the static GODS GitHub Pages website.

Run from the *root of your current GODS website*. The script only updates
HTML metadata inside <head> and creates/refreshes sitemap.xml. It does not
modify any <body>, JavaScript, CSS, media, or scientific content.

  python3 apply_seo.py --dry-run
  python3 apply_seo.py
"""

from pathlib import Path
from html import escape
from urllib.parse import urljoin
from xml.etree import ElementTree as ET
import argparse
import json
import re

BASE = 'https://godsastronomy.github.io/gods/'
LOGO = urljoin(BASE, 'assets/images/gods-logo.png')
OG_IMAGE = urljoin(BASE, 'assets/images/hero-orbits.webp')

SEO = {
    'index.html': (
        'GODS | Group of Origin and Dynamics of Satellites',
        'GODS is a planetary science research group at Observatório Nacional, Brazil, studying satellite formation, ring dynamics, exomoons and orbital evolution.'
    ),
    'research.html': (
        'Research | Satellite Formation, Rings and Exomoons — GODS',
        'Explore GODS research on accretion in giant-impact disks, dynamical interactions between rings and satellites, and the formation and detection of exomoons.'
    ),
    'people.html': (
        'People | Researchers and Students — GODS',
        'Meet the researchers and students of the Group of Origin and Dynamics of Satellites at Observatório Nacional in Rio de Janeiro, Brazil.'
    ),
    'publications.html': (
        'Publications and Conference Presentations | GODS',
        'Read scientific publications, related research papers and conference presentations by members of the GODS planetary science research group.'
    ),
    'data.html': (
        'Research Data | Satellite Formation and Dynamics — GODS',
        'Explore animations and research materials associated with scientific papers by GODS researchers on satellite accretion and self-gravitating particulate disks.'
    ),
    'data3.html': (
        'Dense Solid-Particle Disk Simulations | GODS Research Data',
        'Numerical simulation animations accompanying Madeira et al., On the formation of satellites in dense solid-particle disks.'
    ),
    'data4.html': (
        'Darwin Ellipsoid Simulations | GODS Research Data',
        'Research animations accompanying Madeira et al., Do Self-Gravitating Hard-Sphere Disk Simulations Form Darwin Ellipsoids?'
    ),
    'events.html': (
        'Workshops and Events | GODS Planetary Science Group',
        'Discover the Workshop on Circumplanetary Systems organized by GODS and Observatório Nacional, including the 2027 edition and previous workshop activities.'
    ),
    'contact.html': (
        'Contact | GODS — Observatório Nacional',
        'Get in touch with GODS, the Group of Origin and Dynamics of Satellites at Observatório Nacional, Rio de Janeiro, Brazil, for inquiries and collaborations.'
    ),
    'credits.html': (
        'Credits | GODS Research Group',
        'Credits and acknowledgements for the GODS research group website and its visual materials.'
    ),
}

SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': BASE + '#organization',
            'name': 'Group of Origin and Dynamics of Satellites',
            'alternateName': 'GODS',
            'url': BASE,
            'logo': LOGO,
            'description': 'Planetary science research group at Observatório Nacional, Rio de Janeiro, Brazil.',
            'sameAs': ['https://github.com/godsastronomy/'],
        },
        {
            '@type': 'WebSite',
            '@id': BASE + '#website',
            'url': BASE,
            'name': 'GODS',
            'alternateName': 'Group of Origin and Dynamics of Satellites',
            'inLanguage': 'en',
            'publisher': {'@id': BASE + '#organization'},
        },
    ]
}


def set_meta(head: str, attr: str, value: str, content: str) -> str:
    """Replace the existing meta tag even if its attribute order differs."""
    pattern = re.compile(
        r"""<meta\b(?=[^>]*\b""" + attr + r"""\s*=\s*['"]"""
        + re.escape(value) + r"""['"])[^>]*>""", re.I | re.S
    )
    new = '<meta ' + attr + '=\"' + value + '\" content=\"' + escape(content, quote=True) + '\">'
    if pattern.search(head):
        return pattern.sub(lambda _m: new, head, count=1)
    return head + '\n    ' + new


def update_page(text: str, filename: str) -> str:
    match = re.search(r'(?is)(<head\b[^>]*>)(.*?)(</head\s*>)', text)
    if not match:
        raise ValueError(f'No <head> found in {filename}')
    opening, head, closing = match.groups()
    title, description = SEO[filename]
    url = BASE if filename == 'index.html' else urljoin(BASE, filename)

    # Only head content is edited: all page text and layouts are left intact.
    title_pat = re.compile(r'(?is)<title\b[^>]*>.*?</title\s*>')
    new_title = '<title>' + escape(title) + '</title>'
    if title_pat.search(head):
        head = title_pat.sub(lambda _m: new_title, head, count=1)
    else:
        head += '\n    ' + new_title

    for attr, name, value in [
        ('name', 'description', description),
        ('property', 'og:title', title),
        ('property', 'og:description', description),
        ('property', 'og:url', url),
        ('property', 'og:image', OG_IMAGE),
    ]:
        head = set_meta(head, attr, name, value)

    # Avoid duplicate canonical or schema declarations on repeated execution.
    head = re.sub(
        r"""(?is)\s*<link\b(?=[^>]*\brel\s*=\s*['"]canonical['"])[^>]*>""",
        '', head
    )
    head = head.rstrip()
    head += '\n    <link rel=\"canonical\" href=\"' + escape(url, quote=True) + '\">'

    if filename == 'index.html':
        head = re.sub(
            r"""(?is)\s*<script\b[^>]*\bid\s*=\s*['"]gods-structured-data['"][^>]*>.*?</script\s*>""",
            '', head
        )
        head = head.rstrip()
        head += '\n    <script type=\"application/ld+json\" id=\"gods-structured-data\">\n'
        head += json.dumps(SCHEMA, ensure_ascii=False, indent=2)
        head += '\n    </script>'

    head = head.rstrip()

    # Keep metadata together, before the original closing </head>.
    return text[:match.start()] + opening + head + '\n' + closing + text[match.end():]


def sitemap(paths) -> str:
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    root = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}urlset')
    ordered = [f for f in SEO if f in paths]
    for filename in ordered:
        u = ET.SubElement(root, '{http://www.sitemaps.org/schemas/sitemap/0.9}url')
        ET.SubElement(u, '{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text = (
            BASE if filename == 'index.html' else urljoin(BASE, filename)
        )
    ET.indent(root, space='  ')
    return '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' + ET.tostring(root, encoding='unicode') + '\n'


def main():
    arg = argparse.ArgumentParser()
    arg.add_argument('--dry-run', action='store_true', help='List changes but do not modify files')
    args = arg.parse_args()
    root = Path.cwd()
    available = [name for name in SEO if (root / name).is_file()]
    if not (root / 'index.html').is_file():
        raise SystemExit('ERROR: Run from the GODS website root (where index.html is located).')

    for name in available:
        path = root / name
        original = path.read_text(encoding='utf-8')
        revised = update_page(original, name)
        print(('Would update: ' if args.dry_run else 'Updated: ') + name)
        if not args.dry_run and revised != original:
            path.write_text(revised, encoding='utf-8')

    if args.dry_run:
        print('Would generate: sitemap.xml')
    else:
        (root / 'sitemap.xml').write_text(sitemap(available), encoding='utf-8')
        print('Created: sitemap.xml with', len(available), 'URLs')
    print('No JavaScript, CSS, images, or page-body content changed.')

if __name__ == '__main__':
    main()
