/* ============================================================================
 * About us.f0rdn.js  —  Bajawing.com /about-us page
 * ----------------------------------------------------------------------------
 * AboutPage + Person(Ilaria) schema for E-E-A-T signal. AboutPage links to
 * Ilaria via mainEntity so AI engines can resolve the "who runs this school"
 * question with a single citation.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import { PAGES, SITE, FOUNDER, ABOUT_NARRATIVE } from 'public/seo-config';
import {
    buildAboutPage,
    buildPerson,
    buildBreadcrumbList,
    buildWebPage,
} from 'public/schema-builders';

$w.onReady(function () {
    const page = PAGES.about;
    const canonical = SITE.domain + page.path;

    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { rel: 'canonical', href: canonical },

        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: page.ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ilaria, head wingfoil instructor at Baja Wing in La Ventana' },

        // Profile-specific OG
        { property: 'profile:first_name', content: FOUNDER.givenName },

        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.ogImage },
    ]);

    const breadcrumb = buildBreadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'About', url: page.path },
    ]);

    const blocks = [
        buildWebPage({
            url: page.path,
            title: page.title,
            description: page.description,
            breadcrumbId: SITE.domain + page.path + '#breadcrumb',
        }),
        buildAboutPage(ABOUT_NARRATIVE),
        buildPerson(FOUNDER),
        breadcrumb,
    ].filter(Boolean);

    wixSeoFrontend.setStructuredData(blocks);
});
