# GODS — Group of Origin and Dynamics of Satellites

Website for the **GODS** research group, based at **Observatório Nacional, Rio de Janeiro, Brazil**. All website copy is in English.

This is a **complete static website** for GitHub Pages. There is no build step, npm, server-side code or database. Edit it locally in **Phoenix Code** (or any HTML editor) and publish the resulting files.

## Pages

- `index.html` — home, research highlights, group overview, publications, data and events
- `research.html` — research areas
- `people.html` — members and collaborations
- `publications.html` — **Group Publications** and **Related Publications**; search and year filter
- `data.html` — datasets, software and tools
- `events.html` — upcoming and past events
- `contact.html` — institution and contact information
- `credits.html` — logo and illustration credits

## Edit in Phoenix Code

1. Open the **entire `gods-website` folder**, not just `index.html`.
2. Edit the page text in the corresponding `.html` file.
3. Edit colors, typography, spacing and layout in `assets/css/style.css`.
4. Add team members, publications, research resources, and events in **`assets/js/content.js`**.
5. The JavaScript in `assets/js/site.js` handles mobile navigation, dynamically filled records, search, tab selection and filters.
6. Replace/add illustrations in `assets/images/`, updating paths in the HTML or CSS.

### Add a publication

Open `assets/js/content.js` and add an entry under `publications.group` or `publications.related`:

```js
{
  title: 'Actual title of the scientific paper',
  authors: 'Surname, A., Surname, B. & Surname, C.',
  journal: 'Journal name, volume, article number',
  year: 2026,
  doi: 'https://doi.org/10.XXXX/XXXX',
  arxiv: '',
  pdf: ''
},
```

**Do not publish the example literally.** These fields are illustrative. The arrays are empty until you add authentic records. The same file has examples for `people`, `resources` and `events`.

### Add a group member

Add an object in `people`. Use the `group` property to classify the member as one of: `Leadership`, `Researchers`, `Students`, `Collaborators`, or `Alumni`.

For a portrait, save a WebP/JPEG/PNG photo in `assets/images/` and put `image: 'assets/images/the-photo.webp'`.

### Contact and GitHub

Set the group's **real** email and GitHub repository/organization URL in `group.email` and `group.github` inside `assets/js/content.js`. Until set, the site does **not** invent an address.

## Publish on GitHub Pages

1. Open the GitHub repository (for example `your-organization/gods`).
2. Upload **the contents** of this folder into the repository root. In particular, `index.html` must be at the top level, next to the `assets` folder.
3. Go to **Settings → Pages → Build and deployment**.
4. Choose **Deploy from a branch**, `main`, `/(root)`, and **Save**.
5. Your site will appear at `https://your-organization.github.io/gods/` if the repository name is `gods`.

To upload local changes via the terminal:

```bash
git add .
git commit -m "Update GODS website"
git push origin main
```

Everything uses **relative links**, so GitHub Pages works from a project URL such as `/gods/`.

## Design and image assets

- Main logo: `assets/images/gods-logo.png` (the refined transparent PNG provided in the conversation).
- Header emblem: `assets/images/gods-mark.png`.
- Standalone vector interpretation: `assets/images/gods-logo-vector.svg`. This is a **simplified vector rendition**, not an exact vector trace of the textured PNG. The original PNG is retained in the actual site design.
- Favicon: `assets/images/favicon.svg`.
- Atmospheric science illustrations: original artwork in local `.webp` images. They are **illustrations, not actual space-mission photographs or scientific simulation outputs**.
- Design: editorial / institutional aesthetic, inspired by the high-impact imagery and typographic hierarchy of leading international research institutes.
- Fonts: Manrope and DM Sans from Google Fonts; system fallbacks are provided.

## Before public launch

- Review the English scientific copy against the actual GODS research scope.
- Add real papers and DOIs; no bibliography has been invented.
- Confirm the principal investigator profile, add member photos, affiliations and links.
- Add the real group email and GitHub URL.
- Add verified event details and data/software links.
- Review institutional branding requirements before adding any official institutional logo.

This site deliberately does **not** use a functional HTML contact form: GitHub Pages is static, and a plain form would not send email without an external service.
