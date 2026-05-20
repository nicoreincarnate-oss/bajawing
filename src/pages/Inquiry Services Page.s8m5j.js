/* ============================================================================
 * Inquiry Services Page.s8m5j.js  —  /inquiry-services-page
 * ----------------------------------------------------------------------------
 * Internal Wix Bookings inquiry form page. Should not be indexed — it's a
 * form surface, not a content destination. Mark noindex,nofollow + canonical
 * to /lessons so any accumulated equity transfers to the commercial page.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { SITE } from 'public/seo-config';

$w.onReady(function () {
    wixSeoFrontend.setTitle('Service Inquiry | Baja Wing');
    wixSeoFrontend.setMetaTags([
        { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet' },
        { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet' },
        { rel: 'canonical', href: SITE.domain + '/lessons' },
    ]);
    wixSeoFrontend.setStructuredData([]);
});
