/* ============================================================================
 * Clinics .ycoya.js  —  Bajawing.com /clinics page (DEPRECATED)
 * ----------------------------------------------------------------------------
 * This page is scheduled for deletion by Nico. Until it's removed, we mark it
 * noindex,nofollow so search engines drop it from the index proactively. The
 * canonical link points at /lessons so any accumulated equity transfers.
 *
 * NOTE: filename has a trailing space — that's Wix's canonical mapping. Do
 * not rename.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { PAGES, SITE } from 'public/seo-config';

$w.onReady(function () {
    const page = PAGES.clinics;

    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
        { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet' },
        { rel: 'canonical', href: SITE.domain + '/lessons' }, // pipe equity to /lessons
    ]);

    // Empty structured data — suppress anything auto-injected where possible.
    wixSeoFrontend.setStructuredData([]);
});
