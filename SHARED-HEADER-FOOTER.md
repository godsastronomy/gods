# Shared header and footer — GODS

Every root-level `.html` page loads the same two HTML fragments:

- `components/header.html` — institutional banner, logo, navigation, mobile menu markup.
- `components/footer.html` — logo, quick links, institution, credits, copyright.

**To change the navigation or footer:** edit only the respective file above.
Do not copy the same markup into every page.

The shared sections are loaded by `assets/js/layout.js`, which then starts
`assets/js/site.js`. **Do not include site.js directly in each HTML page**,
because it needs the header and footer to be present before initializing
mobile navigation and footer data.

Each page `<head>` contains:

```html
<script defer src="assets/js/content.js"></script>
<script defer src="assets/js/layout.js"></script>
```

In the page `<body>`:

```html
<a class="skip-link" href="#main">Skip to content</a>
<div id="site-header-placeholder"></div>
<main id="main">... page-specific content ...</main>
<div id="site-footer-placeholder"></div>
```

The current page is highlighted automatically with `aria-current="page"`.
On GitHub Pages, these HTML fragments are fetched normally. For local editing,
use **Phoenix Code Live Preview**, or another HTTP server. Opening a page
with a `file://` URL may block `fetch()` for security reasons.

The existing global CSS in `assets/css/style.css` remains unchanged. Existing
content fields stay in `assets/js/content.js`. All eight pages were updated.

The latest research page and the more accurate `formation.webp` illustration
are included in this package.
