/* ============================================================================
 * Home.lahot.js  —  Bajawing.com home page Velo code
 * ----------------------------------------------------------------------------
 * Sets canonical home-page meta tags + structured data:
 *   - title, description, canonical, og:*, twitter:*
 *   - JSON-LD: WebSite + Organization + SportsActivityLocation + BreadcrumbList
 *
 * Replaces the legacy stack on the live site:
 *   - Two duplicate WebSite blocks (now collapsed to one)
 *   - LocalBusiness missing image/sameAs/geo/hours/priceRange (rebuilt as
 *     SportsActivityLocation with full entity fields)
 *   - Organization with broken logo ("https://www.bajawing.com/") and
 *     invalid openingHours syntax (replaced with proper ImageObject + no
 *     openingHours field — hours live on SportsActivityLocation only)
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { PAGES, SITE, BUSINESS } from 'public/seo-config';
import {
    buildWebSite,
    buildOrganization,
    buildSportsActivityLocation,
    buildBreadcrumbList,
    buildPerson,
} from 'public/schema-builders';

$w.onReady(function () {
    const page = PAGES.home;
    const canonical = SITE.domain + '/';

    /* ----- Meta tags ----- */
    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { name: 'keywords', content:
            'wingfoil lessons la ventana, wingfoiling la ventana, wing foil school baja, ' +
            'wingfoil camp la ventana, wing foil rental la ventana, sea of cortez wingfoil' },

        // Canonical
        { rel: 'canonical', href: canonical },

        // Open Graph
        { property: 'og:type', content: page.ogType },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: page.ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content:
            'Wingfoiler riding on the Sea of Cortez in La Ventana, BCS with Baja Wing' },

        // Twitter
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.ogImage },
        { name: 'twitter:image:alt', content:
            'Wingfoil school in La Ventana, BCS — Baja Wing & Watersports' },
    ]);

    /* ----- Structured Data ----- */
    // AEO: the four blocks below cross-reference via @id so AI engines see a
    // single coherent business entity instead of four loose objects.
    const blocks = [
        buildWebSite(),
        buildOrganization(),
        buildSportsActivityLocation(),
        buildPerson(),                                              // Ilaria
        buildBreadcrumbList([{ name: 'Home', url: '/' }]),
    ].filter(Boolean);

    wixSeoFrontend.setStructuredData(blocks);
});
