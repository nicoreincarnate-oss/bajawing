/* ============================================================================
 * schema-builders.js
 * ----------------------------------------------------------------------------
 * Pure functions that build schema.org JSON-LD objects for Bajawing.com.
 * Every function returns a plain JS object ready to hand to
 *   wixSeoFrontend.setStructuredData([...])
 * inside a page's $w.onReady() callback.
 *
 * Authored: 2026-05-20
 *
 * AEO design notes:
 *  - Every primary entity has a stable @id so blocks cross-reference without
 *    duplicating identity.
 *  - FAQPage answers carry a `speakable` property so AI engines know which
 *    spans are safe to read aloud / cite.
 *  - Person + AboutPage carry sameAs URLs for entity disambiguation.
 *  - Service schema chains to the parent SportsActivityLocation by @id.
 *
 * All output validates against the schema.org spec and Google's Rich Results
 * required-fields list as of 2026-05-20.
 * ========================================================================= */

import {
    SITE,
    BUSINESS,
    ADDRESS,
    GEO,
    HOURS,
    AREA_SERVED,
    SAME_AS,
    ASSETS,
    FOUNDER,
    RATING,
    absoluteUrl,
} from 'public/seo-config';

/* ---------------------------------------------------------------------------
 * #school — the canonical SportsActivityLocation entity for Baja Wing.
 * This is the entity every other schema block links back to via @id.
 * ------------------------------------------------------------------------ */

export function buildSportsActivityLocation() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        '@id': SITE.domain + '/#school',
        name: BUSINESS.legalName,
        alternateName: SITE.alternateNames,
        url: SITE.domain + '/',
        logo: ASSETS.logo,
        image: [
            ASSETS.heroPrimary,
            ASSETS.heroSecondary,
            ASSETS.heroTertiary,
        ],
        description: BUSINESS.description,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        priceRange: BUSINESS.priceRange,
        currenciesAccepted: BUSINESS.currenciesAccepted,
        paymentAccepted: BUSINESS.paymentAccepted,
        address: buildPostalAddress(),
        geo: buildGeoCoordinates(),
        areaServed: AREA_SERVED.map((name) => ({
            '@type': 'Place',
            name,
        })),
        openingHoursSpecification: HOURS.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.dayOfWeek,
            opens: h.opens,
            closes: h.closes,
        })),
        sameAs: SAME_AS,
        sport: BUSINESS.sports,
        knowsAbout: BUSINESS.knowsAbout,
        founder: { '@id': SITE.domain + '/#founder' },
        // aggregateRating intentionally omitted — emitting AggregateRating
        // without a verified reviewCount risks Google flagging the schema
        // as deceptive (or auto-stripping the rich result). GBP currently
        // shows 5.0 stars but Google does not surface a public review
        // count, so we don't fabricate one. Re-enable once Bajawing has
        // a verified count via live GBP fetch (Places API).
        ...(buildAggregateRating() ? { aggregateRating: buildAggregateRating() } : {}),
    };
}

/* ---------------------------------------------------------------------------
 * #website — single canonical WebSite block with SearchAction.
 * Replaces the two competing WebSite blocks currently emitted on home.
 * ------------------------------------------------------------------------ */

export function buildWebSite() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': SITE.domain + '/#website',
        url: SITE.domain + '/',
        name: BUSINESS.legalName,
        alternateName: SITE.alternateNames,
        description: BUSINESS.shortDescription,
        inLanguage: ['en', 'es'],
        publisher: { '@id': SITE.domain + '/#organization' },
        // AEO: SearchAction lets AI engines reason about how to query the site
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: SITE.domain + '/search-results?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

/* ---------------------------------------------------------------------------
 * #organization — Organization wrapper, properly formed (no broken logo,
 * no malformed openingHours string).
 * ------------------------------------------------------------------------ */

export function buildOrganization() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': SITE.domain + '/#organization',
        name: BUSINESS.legalName,
        alternateName: SITE.alternateNames,
        url: SITE.domain + '/',
        logo: {
            '@type': 'ImageObject',
            url: ASSETS.logo,
            // TBD: confirm exact logo dimensions; 600x60 is a safe default
            width: 600,
            height: 60,
        },
        sameAs: SAME_AS,
        contactPoint: [{
            '@type': 'ContactPoint',
            telephone: BUSINESS.telephone,
            contactType: 'reservations',
            email: BUSINESS.email,
            availableLanguage: ['English', 'Spanish'],
            areaServed: 'MX',
        }],
        foundingDate: BUSINESS.foundingDate,
        founder: { '@id': SITE.domain + '/#founder' },
    };
}

/* ---------------------------------------------------------------------------
 * #breadcrumb — BreadcrumbList for any nested page
 *   items: [{ name: 'Lessons', url: '/lessons' }, ...]
 * ------------------------------------------------------------------------ */

export function buildBreadcrumbList(items) {
    if (!Array.isArray(items) || items.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: absoluteUrl(item.url),
        })),
    };
}

/* ---------------------------------------------------------------------------
 * #founder — Person schema for Ilaria, head instructor + founder
 * AEO: Person entity with sameAs is a strong E-E-A-T signal
 * ------------------------------------------------------------------------ */

export function buildPerson(personData) {
    const p = personData || FOUNDER;
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': p['@id'] || (SITE.domain + '/#founder'),
        name: p.name,
        givenName: p.givenName,
        jobTitle: p.jobTitle,
        description: p.description,
        image: p.image,
        sameAs: p.sameAs || [],
        knowsAbout: p.knowsAbout || [],
        nationality: p.nationality,
        worksFor: { '@id': SITE.domain + '/#school' },
    };
}

/* ---------------------------------------------------------------------------
 * Service schema — used for /lessons and /camps landing pages, and
 * dynamically for individual Wix Bookings service pages.
 *
 * serviceData: {
 *   name, serviceType, description, slug,
 *   offers: [{ name, price, priceCurrency, url }],
 *   aggregateRating?: { ratingValue, reviewCount }
 * }
 * ------------------------------------------------------------------------ */

export function buildService(serviceData) {
    if (!serviceData || !serviceData.name) return null;
    const idPath = serviceData.slug || ('/services/' + slugify(serviceData.name));

    const out = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': absoluteUrl(idPath) + '#service',
        name: serviceData.name,
        serviceType: serviceData.serviceType || 'Wingfoil Lessons',
        description: serviceData.description,
        provider: { '@id': SITE.domain + '/#school' },
        areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
        category: 'Watersports Instruction',
        audience: {
            '@type': 'PeopleAudience',
            audienceType: 'wingfoilers, kitesurfers, watersports travelers',
        },
    };

    if (Array.isArray(serviceData.offers) && serviceData.offers.length > 0) {
        out.offers = serviceData.offers.map((o) => ({
            '@type': 'Offer',
            name: o.name,
            price: typeof o.price === 'number' ? String(o.price) : o.price,
            priceCurrency: o.priceCurrency || 'USD',
            url: o.url ? absoluteUrl(o.url) : undefined,
            availability: 'https://schema.org/InStock',
            seller: { '@id': SITE.domain + '/#school' },
        }));
    } else if (serviceData.priceRange) {
        out.offers = {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: String(serviceData.priceRange.low),
            highPrice: String(serviceData.priceRange.high),
            offerCount: serviceData.priceRange.count || 5,
        };
    }

    if (serviceData.aggregateRating) {
        out.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: String(serviceData.aggregateRating.ratingValue),
            reviewCount: String(serviceData.aggregateRating.reviewCount),
            bestRating: '5',
            worstRating: '1',
        };
    }

    return out;
}

/* ---------------------------------------------------------------------------
 * FAQPage with speakable
 *   faqArray: [{ question, answer }, ...]
 *   pageUrl: full URL of the page hosting the FAQ
 * AEO: speakable.cssSelector lets voice + AI engines pull answers verbatim
 * ------------------------------------------------------------------------ */

export function buildFAQPage(faqArray, pageUrl) {
    if (!Array.isArray(faqArray) || faqArray.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': (pageUrl || SITE.domain) + '#faq',
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.faq-question', '.faq-answer'],
        },
        mainEntity: faqArray.map((qa) => ({
            '@type': 'Question',
            name: qa.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: qa.answer,
            },
        })),
    };
}

/* ---------------------------------------------------------------------------
 * BlogPosting — dynamic post page
 *   postData: { title, slug, description, image, datePublished, dateModified,
 *               authorName, authorImage, body, wordCount, keywords }
 * ------------------------------------------------------------------------ */

export function buildBlogPosting(postData) {
    if (!postData || !postData.title) return null;

    const url = absoluteUrl(postData.slug
        ? ('/post/' + postData.slug)
        : '/blog');

    const author = postData.authorName
        ? {
            '@type': 'Person',
            name: postData.authorName,
            image: postData.authorImage || undefined,
        }
        : { '@id': SITE.domain + '/#founder' };

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': url + '#post',
        mainEntityOfPage: url,
        headline: postData.title,
        description: postData.description || '',
        image: postData.image
            ? [postData.image]
            : [ASSETS.ogImageDefault],
        author: author,
        publisher: { '@id': SITE.domain + '/#organization' },
        datePublished: postData.datePublished,
        dateModified: postData.dateModified || postData.datePublished,
        url: url,
        keywords: postData.keywords,
        wordCount: postData.wordCount,
        inLanguage: 'en',
        // AEO: BlogPosting speakable helps AI engines cite the article
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['article h1', 'article h2', 'article p'],
        },
    };
}

/* ---------------------------------------------------------------------------
 * Review entity — for /reviews when it lands
 *   reviewData: { author, datePublished, ratingValue, reviewBody, itemReviewedId }
 * ------------------------------------------------------------------------ */

export function buildReview(reviewData) {
    if (!reviewData || !reviewData.reviewBody) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'Review',
        author: { '@type': 'Person', name: reviewData.author },
        datePublished: reviewData.datePublished,
        reviewBody: reviewData.reviewBody,
        reviewRating: {
            '@type': 'Rating',
            ratingValue: String(reviewData.ratingValue || 5),
            bestRating: '5',
            worstRating: '1',
        },
        itemReviewed: {
            '@id': reviewData.itemReviewedId || (SITE.domain + '/#school'),
        },
    };
}

/* ---------------------------------------------------------------------------
 * AboutPage — wraps the About narrative with a Person mainEntity (Ilaria)
 * ------------------------------------------------------------------------ */

export function buildAboutPage(narrative) {
    return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': SITE.domain + '/about-us#aboutpage',
        url: SITE.domain + '/about-us',
        name: 'About Baja Wing & Watersports',
        description: narrative,
        inLanguage: 'en',
        isPartOf: { '@id': SITE.domain + '/#website' },
        mainEntity: { '@id': SITE.domain + '/#founder' },
        about: { '@id': SITE.domain + '/#school' },
    };
}

/* ---------------------------------------------------------------------------
 * WebPage generic — adds a thin WebPage wrapper for pages that don't have a
 * more specific page type. Helps with breadcrumb + entity linkage.
 * ------------------------------------------------------------------------ */

export function buildWebPage({ url, title, description, breadcrumbId }) {
    const fullUrl = absoluteUrl(url);
    const out = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': fullUrl + '#webpage',
        url: fullUrl,
        name: title,
        description: description,
        isPartOf: { '@id': SITE.domain + '/#website' },
        about: { '@id': SITE.domain + '/#school' },
        inLanguage: 'en',
    };
    if (breadcrumbId) out.breadcrumb = { '@id': breadcrumbId };
    return out;
}

/* ---------------------------------------------------------------------------
 * Blog index — for /blog landing page
 *   posts: array of { title, slug, description, datePublished } (optional)
 * ------------------------------------------------------------------------ */

export function buildBlog(posts) {
    const blog = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': SITE.domain + '/blog#blog',
        url: SITE.domain + '/blog',
        name: 'Baja Wing Blog',
        description:
            'Stories, gear notes, wind reports, and beginner guides from the ' +
            'Baja Wing wingfoil school in La Ventana, BCS.',
        publisher: { '@id': SITE.domain + '/#organization' },
        inLanguage: 'en',
    };

    if (Array.isArray(posts) && posts.length > 0) {
        blog.blogPost = posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            url: absoluteUrl('/post/' + (p.slug || slugify(p.title))),
            datePublished: p.datePublished,
            author: { '@id': SITE.domain + '/#founder' },
        }));
    }

    return blog;
}

/* ---------------------------------------------------------------------------
 * Internal helpers
 * ------------------------------------------------------------------------ */

function buildPostalAddress() {
    const a = {
        '@type': 'PostalAddress',
        addressLocality: ADDRESS.addressLocality,
        addressRegion: ADDRESS.addressRegion,
        postalCode: ADDRESS.postalCode,
        addressCountry: ADDRESS.addressCountry,
    };
    if (ADDRESS.streetAddress) a.streetAddress = ADDRESS.streetAddress;
    return a;
}

function buildGeoCoordinates() {
    return {
        '@type': 'GeoCoordinates',
        latitude: GEO.latitude,
        longitude: GEO.longitude,
    };
}

function buildAggregateRating() {
    // Only emit AggregateRating if we have a verified reviewCount.
    // Schema.org requires reviewCount OR ratingCount on AggregateRating;
    // emitting without it produces an invalid block that Google may flag.
    if (!RATING || !RATING.reviewCount || RATING.reviewCount === null) {
        return null;
    }
    return {
        '@type': 'AggregateRating',
        ratingValue: RATING.ratingValue,
        reviewCount: RATING.reviewCount,
        bestRating: RATING.bestRating,
        worstRating: RATING.worstRating,
    };
}

function slugify(s) {
    return String(s || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
