# GODS — Google Search setup

This package is designed for the existing GODS project at:
https://godsastronomy.github.io/gods/

## 1. Add files and update metadata without overwriting your content

Copy `apply_seo.py` into the root of your existing GODS project, next to `index.html`.
In the Terminal, `cd` into your GODS project and run:

    python3 apply_seo.py --dry-run
    python3 apply_seo.py

This updates only the HEAD metadata of the existing HTML pages. It does NOT
replace their body content, cards, dates, member profiles, publications, CSS,
JavaScript, media, or shared header/footer. The script generates `sitemap.xml`
from the page filenames that actually exist in that directory.

Alternatively, just copy the provided `sitemap.xml` into your site root and
skip the script. But then the per-page titles, descriptions, canonical URL
and structured data won't be improved.

## 2. Publish

    git status
    git add .
    git commit -m "Improve GODS SEO and add sitemap"
    git push origin main

Once the GitHub Pages deployment succeeds, verify in your browser:
https://godsastronomy.github.io/gods/sitemap.xml

## 3. Google Search Console (required manual ownership verification)

Go to https://search.google.com/search-console
Add a **URL-prefix** property:

    https://godsastronomy.github.io/gods/

Choose **HTML file upload**, download the ORIGINAL verification file supplied
by Google, place it next to index.html, commit and push. After it is publicly
available, click **Verify** in Search Console. Do not invent or rename the file.

Then go to Indexing > Sitemaps and submit:

    https://godsastronomy.github.io/gods/sitemap.xml

Use URL Inspection on your homepage and key Research/Research Data pages, and
request indexing. Indexing is not immediate or guaranteed.

## Technical notes

- This is a GitHub Pages project website served at /gods/. A `robots.txt` file
  at /gods/robots.txt is NOT the host-root robots.txt for github.io; don't
  rely on it to control crawling. A sitemap submitted through Search Console
  works without a project-level robots.txt.
- No `lastmod` dates were invented. Google recommends them only when reliably
  reflecting substantial page changes.
- OG metadata, canonical URLs and JSON-LD structured data are included.
- Google may render JavaScript content, but directly written static HTML is
  more straightforward for crawlers. If Publications and People are populated
  entirely via JS, inspect the rendered HTML in Search Console.
- If you later choose a custom domain, update BASE inside `apply_seo.py` and
  regenerate the sitemap and canonicals.
