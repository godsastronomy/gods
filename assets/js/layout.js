/*
 * GODS shared layout loader
 * GitHub Pages is static: it does not include HTML partials automatically.
 * This script fetches header.html and footer.html, then loads site.js.
 * The main site.js MUST run after the shared elements have been inserted:
 * it initializes the mobile menu, active-year footer, and GitHub link.
 *
 * Use Phoenix Code Live Preview (http://localhost/...) rather than opening
 * an HTML file directly with file://, where fetch() is often blocked.
 */
(() => {
  'use strict';

  // Resolve paths from this script, not from the page URL. Works under
  // GitHub Pages project sites such as /gods/ and on local preview servers.
  const siteRoot = new URL('../../', document.currentScript.src);
  const localFile = (path) => new URL(path, siteRoot);

  async function insertSharedHTML(elementId, filename) {
    const target = document.getElementById(elementId);
    if (!target) {
      throw new Error(`Missing placeholder: #${elementId}`);
    }

    const response = await fetch(localFile(`components/${filename}`));
    if (!response.ok) {
      throw new Error(`Could not load ${filename} (HTTP ${response.status})`);
    }

    // Replace the placeholder with sibling elements, rather than nesting
    // the header inside a div. This preserves CSS position: sticky.
    target.insertAdjacentHTML('beforebegin', await response.text());
    target.remove();
  }

  function highlightCurrentPage() {
    const file = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('#primary-nav a').forEach((link) => {
      const destination = new URL(link.getAttribute('href'), siteRoot);
      const targetFile = destination.pathname.split('/').pop() || 'index.html';

      if (targetFile === file) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  async function initializeLayout() {
    const parts = await Promise.allSettled([
      insertSharedHTML('site-header-placeholder', 'header.html'),
      insertSharedHTML('site-footer-placeholder', 'footer.html')
    ]);

    parts.forEach((part) => {
      if (part.status === 'rejected') {
        console.error('GODS shared layout:', part.reason);
      }
    });

    highlightCurrentPage();

    // site.js must execute after the shared header and footer exist.
    const siteScript = document.createElement('script');
    siteScript.src = localFile('assets/js/site.js').href;
    document.body.appendChild(siteScript);
  }

  // "defer" means the page has already been parsed when we reach here.
  initializeLayout();
})();
