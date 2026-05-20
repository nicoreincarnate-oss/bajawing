/* ============================================================================
 * masterPage.js  —  Bajawing.com global Velo code
 * ----------------------------------------------------------------------------
 * Runs on EVERY page load (regardless of which page is rendering). Used here
 * to set universal SEO/AEO/GEO meta tags that apply site-wide:
 *   - hreflang (en + es bidirectional via Wix Multilingual at /es/)
 *   - og:site_name, og:locale
 *   - default twitter:card = summary_large_image
 *   (twitter:site intentionally omitted — BajaWing has no Twitter/X account.)
 *
 * Per-page values (title, description, og:image, page-specific JSON-LD) are
 * set inside each page's own file via wixSeoFrontend.setMetaTags() and
 * wixSeoFrontend.setStructuredData(). Nothing in this file overrides those.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import wixLocationFrontend from 'wix-location-frontend';
import { SITE } from 'public/seo-config';

$w.onReady(function () {
    setUniversalMetaTags();
});

function setUniversalMetaTags() {
    try {
        const currentUrl = wixLocationFrontend.url || (SITE.domain + '/');

        // Strip any querystring + trailing slash variance for hreflang anchors
        const cleanPath = (() => {
            try {
                const u = new URL(currentUrl);
                return u.pathname.replace(/\/$/, '') || '/';
            } catch (_e) {
                return '/';
            }
        })();

        // Spanish mirror lives at /es/<same-path>
        const isSpanish = cleanPath.startsWith('/es');
        const enPath = isSpanish ? cleanPath.replace(/^\/es/, '') || '/' : cleanPath;
        const esPath = isSpanish ? cleanPath : '/es' + (cleanPath === '/' ? '' : cleanPath);

        const enUrl = SITE.domain + (enPath === '/' ? '/' : enPath);
        const esUrl = SITE.domain + esPath;

        wixSeoFrontend.setMetaTags([
            // hreflang triple — en, es, x-default
            { rel: 'alternate', hreflang: 'en', href: enUrl },
            { rel: 'alternate', hreflang: 'es', href: esUrl },
            { rel: 'alternate', hreflang: 'x-default', href: enUrl },

            // og:site_name + og:locale — applies everywhere unless overridden
            { property: 'og:site_name', content: SITE.name },
            { property: 'og:locale', content: isSpanish ? SITE.spanishLocale : SITE.locale },
            { property: 'og:locale:alternate', content: isSpanish ? SITE.locale : SITE.spanishLocale },

            // Twitter card defaults — page-level files can override card type and image.
            // twitter:site intentionally omitted — BajaWing has no Twitter/X account.
            { name: 'twitter:card', content: 'summary_large_image' },

            // Crawler hints — be explicit, not implicit
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1' },

            // Geo signals (AEO/local SEO entity anchors)
            { name: 'geo.region', content: 'MX-BCS' },
            { name: 'geo.placename', content: 'La Ventana, Baja California Sur' },
            { name: 'geo.position', content: '24.0478291;-109.9883684' },
            { name: 'ICBM', content: '24.0478291, -109.9883684' },

            // Application name + theme
            { name: 'application-name', content: SITE.name },
            { name: 'theme-color', content: '#0f4a5c' },
        ]);
    } catch (err) {
        // Silent: never block page rendering on SEO meta tag failures
        console.warn('[masterPage] universal meta tag set failed', err);
    }
}
