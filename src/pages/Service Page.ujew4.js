/* ============================================================================
 * Service Page.ujew4.js  —  Bajawing.com /service-page/{slug} dynamic page
 * ----------------------------------------------------------------------------
 * Dynamic Wix Bookings service detail page. Pulls the current service via the
 * wix-bookings-v2 services API using the slug from wixLocationFrontend, then
 * sets per-service meta tags + Service + Offer JSON-LD.
 *
 * If the service lookup fails for any reason (collection schema mismatch,
 * permissions), we fall back to a generic Service entity built from page
 * defaults so the page still emits valid structured data.
 *
 * TODO(2026-05-20): If Wix Bookings exposes AggregateRating per service via
 * the Reviews API, wire it in here. Currently we omit per-service ratings to
 * avoid invalid schema.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import wixLocationFrontend from 'wix-location-frontend';
import wixData from 'wix-data';
import { SITE, BUSINESS, ASSETS } from 'public/seo-config';
import {
    buildService,
    buildBreadcrumbList,
    buildWebPage,
} from 'public/schema-builders';

$w.onReady(async function () {
    try {
        const slug = extractServiceSlug(wixLocationFrontend.path);

        let svc = null;
        if (slug) {
            // Wix Bookings exposes services through the Bookings/Services collection.
            // Some sites have it as 'Bookings/Services'; older sites use a slightly
            // different key. We attempt both and use whichever returns first.
            const candidates = ['Bookings/Services', 'wix:bookings_services'];
            for (const collection of candidates) {
                try {
                    const r = await wixData
                        .query(collection)
                        .eq('mainSlug.name', slug)
                        .limit(1)
                        .find();
                    if (r.items && r.items[0]) { svc = r.items[0]; break; }
                    // Some shapes store the slug directly on the record
                    const r2 = await wixData
                        .query(collection)
                        .eq('slug', slug)
                        .limit(1)
                        .find();
                    if (r2.items && r2.items[0]) { svc = r2.items[0]; break; }
                } catch (_e) {
                    // try the next collection name
                }
            }
        }

        // Pull display-time fields from $w bindings if the page template
        // exposes them. This is the fallback when wix-data is locked down.
        const titleFromW = readText('#serviceTitle');
        const priceFromW = readText('#servicePrice');
        const descFromW = readText('#serviceDescription') || readText('#serviceTagline');

        const serviceName = (svc && svc.info && svc.info.name)
            || (svc && svc.name)
            || titleFromW
            || 'Wingfoil Service';
        const serviceDescription = (svc && svc.info && svc.info.description)
            || (svc && svc.description)
            || descFromW
            || BUSINESS.shortDescription;
        const priceRaw = (svc && svc.payment && svc.payment.fixed && svc.payment.fixed.price && svc.payment.fixed.price.value)
            || (svc && svc.price)
            || (priceFromW ? priceFromW.replace(/[^0-9.]/g, '') : null);
        const currency = (svc && svc.payment && svc.payment.fixed && svc.payment.fixed.price && svc.payment.fixed.price.currency)
            || 'USD';
        const imageUrl = (svc && svc.media && svc.media.coverMedia && svc.media.coverMedia.image && svc.media.coverMedia.image.url)
            || (svc && svc.image)
            || ASSETS.heroSecondary;

        const canonical = SITE.domain + '/service-page/' + (slug || '');

        const seoTitle = serviceName + ' | Baja Wing — La Ventana, BCS';
        const seoDescription = sanitizeDescription(serviceDescription);

        /* ----- Meta tags ----- */
        wixSeoFrontend.setTitle(seoTitle);
        wixSeoFrontend.setMetaTags([
            { name: 'description', content: seoDescription },
            { rel: 'canonical', href: canonical },

            { property: 'og:type', content: 'product' },
            { property: 'og:title', content: serviceName },
            { property: 'og:description', content: seoDescription },
            { property: 'og:url', content: canonical },
            { property: 'og:image', content: imageUrl },

            { name: 'twitter:title', content: serviceName },
            { name: 'twitter:description', content: seoDescription },
            { name: 'twitter:image', content: imageUrl },

            // Product-style structured properties for shopping crawlers
            { name: 'product:price:amount', content: priceRaw ? String(priceRaw) : undefined },
            { name: 'product:price:currency', content: currency },
        ].filter((t) => t.content !== undefined));

        /* ----- Structured Data ----- */
        const offers = priceRaw ? [{
            name: serviceName,
            price: String(priceRaw),
            priceCurrency: currency,
            url: canonical,
        }] : undefined;

        const serviceBlock = buildService({
            name: serviceName,
            serviceType: 'Wingfoiling Lessons',
            description: seoDescription,
            slug: '/service-page/' + slug,
            offers,
        });

        const blocks = [
            buildWebPage({
                url: '/service-page/' + slug,
                title: seoTitle,
                description: seoDescription,
                breadcrumbId: canonical + '#breadcrumb',
            }),
            serviceBlock,
            buildBreadcrumbList([
                { name: 'Home', url: '/' },
                { name: 'Lessons', url: '/lessons' },
                { name: serviceName, url: '/service-page/' + slug },
            ]),
        ].filter(Boolean);

        wixSeoFrontend.setStructuredData(blocks);
    } catch (err) {
        // Never block render on SEO failure. Log + fall through.
        console.warn('[ServicePage] dynamic SEO setup failed', err);
    }
});

/* ---------- helpers ---------- */

function extractServiceSlug(path) {
    if (!path || !Array.isArray(path)) return null;
    const idx = path.indexOf('service-page');
    if (idx === -1 || idx >= path.length - 1) return null;
    return path[idx + 1];
}

function readText(selector) {
    try {
        const el = $w(selector);
        if (el && typeof el.text === 'string') return el.text.trim();
    } catch (_e) { /* element not present on this page variant */ }
    return null;
}

function sanitizeDescription(raw) {
    if (!raw) return BUSINESS.shortDescription;
    const cleaned = String(raw)
        .replace(/\s+/g, ' ')
        .trim();
    if (cleaned.length <= 160) return cleaned;
    return cleaned.slice(0, 157).trim() + '...';
}
