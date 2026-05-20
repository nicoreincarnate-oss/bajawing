/* ============================================================================
 * Search Results.sgqrn.js  —  Bajawing.com /search-results page
 * ----------------------------------------------------------------------------
 * Internal site search results page. Should NEVER be indexed — search-result
 * pages are infinite-permutation thin content that bleeds crawl budget and
 * pollutes the index. We force noindex,nofollow + canonical to home so any
 * accumulated equity transfers back to the root.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { SITE } from 'public/seo-config';

$w.onReady(function () {
    wixSeoFrontend.setTitle('Search Results | Baja Wing');
    wixSeoFrontend.setMetaTags([
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
        { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet' },
        { rel: 'canonical', href: SITE.domain + '/' },
    ]);
    wixSeoFrontend.setStructuredData([]);
});
