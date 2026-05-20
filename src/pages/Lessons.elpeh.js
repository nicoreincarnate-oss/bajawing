/* ============================================================================
 * Lessons.elpeh.js  —  Bajawing.com /lessons landing page
 * ----------------------------------------------------------------------------
 * High-intent commercial page targeting "wingfoil lessons La Ventana".
 *
 * Structured data stack:
 *   - Service (with five Offers — 1hr advanced, 2hr, 4hr, 6hr, 8hr packages)
 *   - FAQPage with speakable (5 Q&A from LESSONS_FAQ in seo-config)
 *   - WebPage wrapper
 *   - BreadcrumbList
 *
 * AEO: every offer carries a price + currency + url so AI engines can quote
 * pricing inline. FAQ schema is the strongest AI Overview citation surface.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { PAGES, SITE, LESSONS_FAQ, RATING } from 'public/seo-config';
import {
    buildService,
    buildFAQPage,
    buildBreadcrumbList,
    buildWebPage,
} from 'public/schema-builders';

$w.onReady(function () {
    const page = PAGES.lessons;
    const canonical = SITE.domain + page.path;

    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { name: 'keywords', content:
            'wingfoil lessons la ventana, wing foil lessons baja, private wingfoil lessons, ' +
            'wingfoil beginner lesson, wing foil instructor la ventana' },
        { rel: 'canonical', href: canonical },

        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: page.ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Private wingfoil lesson in La Ventana, BCS with Baja Wing' },

        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.ogImage },
    ]);

    const service = buildService({
        name: 'Private Wingfoil Lessons in La Ventana',
        serviceType: 'Wingfoiling Lessons',
        description:
            'Private wingfoil lessons in La Ventana, Baja California Sur, with a Go Foil ' +
            'sponsored head instructor, premium Reedin and Go Foil gear, BB Talking radios ' +
            'for real-time on-water coaching, and shuttle service to the best wind spot each day.',
        slug: page.path,
        offers: [
            {
                name: '1-Hour Advanced Refresh Lesson',
                price: '125',
                priceCurrency: 'USD',
                url: '/service-page/1hr-advanced-lesson',
            },
            {
                name: '2-Hour Beginner Wingfoil Lesson',
                price: '250',
                priceCurrency: 'USD',
                url: '/service-page/1-day-wingfoil-course-2-hr-lesson',
            },
            {
                name: '2-Day Wingfoil Course (4 hours total)',
                price: '480',
                priceCurrency: 'USD',
                url: '/service-page/2-day-wingfoil-course-4-hours-total',
            },
            {
                name: '3-Day Wingfoil Course (6 hours total)',
                price: '690',
                priceCurrency: 'USD',
                url: '/service-page/3-day-wingfoil-course-6-hours-total',
            },
            {
                name: '4-Day Wingfoil Course (8 hours total)',
                price: '880',
                priceCurrency: 'USD',
                url: '/service-page/4-day-wingfoil-course-8-hours-total',
            },
        ],
        aggregateRating: {
            ratingValue: RATING.ratingValue,
            reviewCount: RATING.reviewCount,
        },
    });

    const breadcrumb = buildBreadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Lessons', url: page.path },
    ]);

    const blocks = [
        buildWebPage({
            url: page.path,
            title: page.title,
            description: page.description,
            breadcrumbId: canonical + '#breadcrumb',
        }),
        service,
        buildFAQPage(LESSONS_FAQ, canonical),
        breadcrumb,
    ].filter(Boolean);

    wixSeoFrontend.setStructuredData(blocks);
});
