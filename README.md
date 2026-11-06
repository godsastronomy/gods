# GODS / Research Data update

## Files to add to the existing GODS site

- `data.html` — replace the current Research Data landing page.
- `data3.html` — 2025b paper, two Figure 1 animations.
- `data4.html` — 2025c paper, one Figure 2 animation.
- `assets/css/research-data.css` — new CSS specific to these pages.
- `download-videos.sh` — optional one-time downloader for the three original videos.

All HTML files use your existing `assets/js/content.js`, `assets/js/layout.js`,
`assets/css/style.css`, and shared `components/header.html` and `components/footer.html`.
Do **not** replace your JavaScript, header or footer.

## Move the actual videos from the personal site

The MP4s are not included in this ZIP. To migrate them to the GODS
repository, open a terminal inside the GODS project and run:

```bash
bash download-videos.sh
```

This creates:

- `assets/research/sim_11.mp4` (Figure 1, top line; source ~3.11 MB)
- `assets/research/sim_26.mp4` (Figure 1, bottom line; source ~3.19 MB)
- `assets/research/GODS_shape.mp4` (Figure 2; source ~8.2 MB)

The pages already include a remote source as a fallback while the files
have not been copied, and will prioritize the local MP4s after migration.
Upload the three videos along with the other files to the GODS repository.

## References and captions

Scientific descriptions and filenames were preserved from:

- https://gusmadeira.github.io/data3.html
- https://gusmadeira.github.io/data4.html

The papers are linked to their original reference destinations (arXiv,
ReadCube). Nothing needs to change in `site.js` or `content.js`.

## Preview

Use Phoenix Code Live Preview (or a local HTTP server), not `file://`,
so that shared header/footer components can be fetched.
