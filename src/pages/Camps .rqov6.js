/* ============================================================================
 * Camps .rqov6.js  —  Bajawing.com /camps landing page
 * ----------------------------------------------------------------------------
 * Note: filename has a trailing space — that's Wix's canonical mapping for
 * the "Camps " page node. Do not rename or the page will lose its code.
 *
 * Targets: "wingfoil camp la ventana" / "wingfoil retreat baja".
 *
 * Structured data stack:
 *   - Service (multi-day camps with Offers)
 *   - FAQPage with speakable (5 Q&A from CAMPS_FAQ in seo-config)
 *   - WebPage wrapper
 *   - BreadcrumbList
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { PAGES, SITE, CAMPS_FAQ, RATING } from 'public/seo-config';
import {
    buildService,
    buildFAQPage,
    buildBreadcrumbList,
    buildWebPage,
} from 'public/schema-builders';

$w.onReady(function () {
    const page = PAGES.camps;
    const canonical = SITE.domain + page.path;

    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { name: 'keywords', content:
            'wingfoil camp la ventana, wing foil retreat baja, wingfoil clinic mexico, ' +
            'multi day wingfoil course, sea of cortez wingfoil camp' },
        { rel: 'canonical', href: canonical },

        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: page.ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Wingfoil camp on the Sea of Cortez with Baja Wing' },

        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.ogImage },
    ]);

    const service = buildService({
        name: 'Wingfoil Camps in La Ventana',
        serviceType: 'Wingfoiling Multi-Day Camp',
        description:
            '5- to 7-day wingfoil camps in La Ventana, Baja California Sur, with 8–10 hours ' +
            'of private coaching, premium Reedin and Go Foil gear, BB Talking radios, daily ' +
            'shuttle to the best wind spot, and optional lodging at partner casa rentals. ' +
            'Max 4 students per cohort.',
        slug: page.path,
        offers: [
            {
                name: '5-Day Wingfoil Camp',
                price: '1650',
                priceCurrency: 'USD',
                url: page.path,
            },
            {
                name: '7-Day Wingfoil Camp',
                price: '2200',
                priceCurrency: 'USD',
                url: page.path,
            },
        ],
        aggregateRating: {
            ratingValue: RATING.ratingValue,
            reviewCount: RATING.reviewCount,
        },
    });

    const breadcrumb = buildBreadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Camps', url: page.path },
    ]);

    const blocks = [
        buildWebPage({
            url: page.path,
            title: page.title,
            description: page.description,
            breadcrumbId: canonical + '#breadcrumb',
        }),
        service,
        buildFAQPage(CAMPS_FAQ, canonical),
        breadcrumb,
    ].filter(Boolean);

    wixSeoFrontend.setStructuredData(blocks);
});
