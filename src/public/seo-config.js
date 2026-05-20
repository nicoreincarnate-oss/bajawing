/* ============================================================================
 * seo-config.js
 * ----------------------------------------------------------------------------
 * Single source of truth for every SEO / AEO / GEO value used across the
 * Bajawing.com Velo codebase. Every page module (Home, Lessons, Camps, etc.)
 * imports from here so that titles, descriptions, social images, business
 * facts, geo coordinates, and JSON-LD seed data are versioned in one file.
 *
 * Authored: 2026-05-20
 * Site:     https://www.bajawing.com  (Wix Editor + Wix Bookings, Premium)
 * Owner:    Emily Freeman / Ilaria (founder + head instructor)
 *
 * TBD markers: every line tagged `// TBD:` is a value that should be replaced
 * with a real production value pulled from the Wix Dashboard or live site
 * before the next deploy. The defaults below are valid schema.org and will
 * pass schema validation as-is — they just may not be perfectly precise.
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 * Site-wide constants
 * ------------------------------------------------------------------------ */

export const SITE = Object.freeze({
    domain: 'https://www.bajawing.com',
    name: 'Baja Wing & Watersports',
    shortName: 'Bajawing',
    alternateNames: ['Bajawing', 'Baja Wing', 'Baja Wing and Watersports'],
    locale: 'en_US',
    spanishLocale: 'es_ES',
    // Note: BajaWing does not operate a Twitter/X account.
    // twitter:site meta tag is intentionally omitted across the site.
});

/* ---------------------------------------------------------------------------
 * Business identity — the canonical NAP + entity profile
 * ------------------------------------------------------------------------ */

export const BUSINESS = Object.freeze({
    legalName: 'Baja Wing & Watersports',
    displayName: 'Baja Wing & Watersports',
    foundingDate: '2020', // TBD: confirm exact founding year with Ilaria
    description:
        'Women-owned wingfoil school in La Ventana, Baja California Sur, Mexico. ' +
        'Private wingfoil lessons, multi-day courses, camps, and premium gear ' +
        'rentals on the Sea of Cortez, taught by a Go Foil sponsored head ' +
        'instructor with small-group, one-on-one coaching only.',
    shortDescription:
        'Wingfoil school in La Ventana, Baja California Sur, Mexico. ' +
        'Lessons, rentals, and camps for all levels.',
    telephone: '+15037057174',
    telephoneDisplay: '+1 503-705-7174',
    email: 'info@bajawing.com', // TBD: confirm with Ilaria — may be a different inbox
    priceRange: '$$',
    currenciesAccepted: 'USD, MXN',
    paymentAccepted: 'Cash, Credit Card',
    sports: ['Wingfoiling', 'Kitesurfing', 'Watersports'],
    knowsAbout: [
        'wingfoiling',
        'wing foil lessons',
        'wing foil rentals',
        'wing foil clinics',
        'wing foil camps',
        'kitesurfing',
        'sea of cortez watersports',
        'la ventana watersports',
    ],
});

/* ---------------------------------------------------------------------------
 * Postal address — schema.org/PostalAddress shape, no street yet (TBD)
 * ------------------------------------------------------------------------ */

export const ADDRESS = Object.freeze({
    // Operating location confirmed by Nico 2026-05-20: La Tuna Beach,
    // within the La Ventana area on the Sea of Cortez. La Tuna Beach is
    // the actual launch point; La Ventana is the broader locality.
    streetAddress: 'La Tuna Beach',
    addressLocality: 'La Ventana',
    addressRegion: 'Baja California Sur',
    addressRegionShort: 'BCS',
    postalCode: '23232',
    addressCountry: 'MX',
});

/* ---------------------------------------------------------------------------
 * Geo coordinates — La Ventana centroid (safe fallback)
 * Replace with exact pin from Wix Business Info if available.
 * ------------------------------------------------------------------------ */

export const GEO = Object.freeze({
    latitude: 24.0457,   // TBD: replace with exact business latitude
    longitude: -109.9923, // TBD: replace with exact business longitude
});

/* ---------------------------------------------------------------------------
 * Hours of operation — wingfoil instruction window
 * ------------------------------------------------------------------------ */

export const HOURS = Object.freeze([
    {
        dayOfWeek: [
            'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: '08:00',
        closes: '17:00',
    },
]);

/* ---------------------------------------------------------------------------
 * Service area — places we travel to / serve from La Ventana base
 * ------------------------------------------------------------------------ */

export const AREA_SERVED = Object.freeze([
    'La Ventana, Baja California Sur, Mexico',
    'El Sargento, Baja California Sur, Mexico',
    'Los Barriles, Baja California Sur, Mexico',
    'La Paz, Baja California Sur, Mexico',
    'Sea of Cortez',
]);

/* ---------------------------------------------------------------------------
 * Social profiles + sameAs anchors for entity strengthening
 * Verified live on 2026-05-20 against rendered HTML at https://www.bajawing.com
 * ------------------------------------------------------------------------ */

export const SAME_AS = Object.freeze([
    'https://www.instagram.com/baja_wing/',
    'https://www.facebook.com/profile.php?id=61569923340215',
    // TBD: add YouTube channel URL if it exists
    // TBD: add Google Business Profile (Maps) place URL once confirmed
]);

/* ---------------------------------------------------------------------------
 * Asset URLs — real Wix media URLs harvested from live HTML on 2026-05-20
 * ------------------------------------------------------------------------ */

export const ASSETS = Object.freeze({
    // TBD: replace with the actual logo asset URL from Wix Dashboard >
    // Business Info > Logo. Until then, point at a known hero image so the
    // schema reference still resolves to a real Wix-CDN file.
    logo:
        'https://static.wixstatic.com/media/082b5b_e2bf4d7969f64dcc803cd8e278ad31ae~mv2.png',

    // 1200x630 social share / og:image (real live asset, resized via Wix CDN)
    ogImageDefault:
        'https://static.wixstatic.com/media/082b5b_1f32e6e2302a4147a2ae466d1fe658ac~mv2.jpg/v1/fit/w_1200,h_630,al_c/082b5b_1f32e6e2302a4147a2ae466d1fe658ac~mv2.jpg',

    // Hero / lifestyle imagery, used in JSON-LD `image` arrays
    heroPrimary:
        'https://static.wixstatic.com/media/082b5b_1f32e6e2302a4147a2ae466d1fe658ac~mv2.jpg',
    heroSecondary:
        'https://static.wixstatic.com/media/082b5b_e76af5bdf7094373a5ee3058dd1e7e3a~mv2.jpg',
    heroTertiary:
        'https://static.wixstatic.com/media/082b5b_411de298203f4a12bdebd76c053da7d7~mv2.jpg',
});

/* ---------------------------------------------------------------------------
 * Founder / head-instructor profile — used by AboutPage + Person schema
 * (E-E-A-T signal for both Google and AI engines)
 * ------------------------------------------------------------------------ */

export const FOUNDER = Object.freeze({
    name: 'Ilaria', // TBD: full legal name from Ilaria
    givenName: 'Ilaria',
    jobTitle: 'Head Wingfoil Instructor & Founder',
    description:
        'Go Foil sponsored head instructor and founder of Baja Wing & ' +
        'Watersports. Based year-round in La Ventana, Baja California Sur, ' +
        'with over a decade of watersports instruction across wingfoiling, ' +
        'kitesurfing, and SUP.',
    image: 'https://static.wixstatic.com/media/082b5b_b40b9aa2c8e34ac69f24cbdd586d1711~mv2.jpg', // TBD: confirm correct headshot
    sameAs: [
        'https://www.instagram.com/baja_wing/', // TBD: replace with Ilaria's personal handle if separate
    ],
    knowsAbout: [
        'wingfoiling instruction',
        'foil board progression',
        'kitesurfing instruction',
        'sea of cortez wind patterns',
    ],
    nationality: 'IT', // TBD: confirm with Ilaria
    worksFor: SITE.name,
});

/* ---------------------------------------------------------------------------
 * Aggregate rating — pull live numbers from GBP. Defaults are safe fallback.
 * ------------------------------------------------------------------------ */

export const RATING = Object.freeze({
    ratingValue: '5.0',
    reviewCount: '90', // TBD: confirm current Google Business Profile review count
    bestRating: '5',
    worstRating: '1',
});

/* ---------------------------------------------------------------------------
 * Per-page SEO map. Every public page has an entry. `noindex: true` flags
 * pages that should NOT be indexed (search results, inquiry, deprecated).
 * Title length target: 50–60 chars. Description target: 145–160 chars.
 * ------------------------------------------------------------------------ */

export const PAGES = Object.freeze({
    home: {
        path: '/',
        title: 'Wingfoil Lessons, Camps & Rentals in La Ventana, BCS | Baja Wing',
        description:
            'Women-owned wingfoil school in La Ventana, Baja California Sur. ' +
            'Private lessons, multi-day courses, camps, and premium gear rentals on the Sea of Cortez.',
        ogImage: ASSETS.ogImageDefault,
        ogType: 'website',
    },

    about: {
        path: '/about-us',
        title: 'About Baja Wing | Women-Owned Wingfoil School in La Ventana',
        description:
            'Meet Ilaria, Go Foil sponsored head instructor, and the Baja Wing team. ' +
            'A women-owned wingfoil school running private lessons in La Ventana, BCS since 2020.',
        ogImage: ASSETS.heroPrimary,
        ogType: 'website',
    },

    lessons: {
        path: '/lessons',
        title: 'Private Wingfoil Lessons in La Ventana, BCS | Baja Wing',
        description:
            'Private wingfoil lessons in La Ventana, BCS from $125/hr. Go Foil sponsored head ' +
            'instructor, premium Reedin gear, BB Talkies, and shuttle included. Book online.',
        ogImage: ASSETS.heroSecondary,
        ogType: 'website',
    },

    camps: {
        path: '/camps',
        title: 'Wingfoil Camps & Retreats in La Ventana, BCS | Baja Wing',
        description:
            'Multi-day wingfoil camps in La Ventana, Baja California Sur. All-inclusive ' +
            'wingfoil retreats with lodging, premium gear, daily coaching, and Sea of Cortez sessions.',
        ogImage: ASSETS.heroTertiary,
        ogType: 'website',
    },

    // Clinics page is being deprecated — Nico will delete it. Marked noindex
    // + nofollow so search engines de-index it ahead of removal.
    clinics: {
        path: '/clinics',
        title: 'Clinics | Baja Wing',
        description: 'Wingfoil clinics in La Ventana, BCS.',
        ogImage: ASSETS.ogImageDefault,
        ogType: 'website',
        noindex: true,
        nofollow: true,
    },

    blog: {
        path: '/blog',
        title: 'Wingfoil Blog | Baja Wing — La Ventana, BCS',
        description:
            'Stories, gear notes, wind reports, and beginner guides from Baja Wing ' +
            'in La Ventana, BCS. Wingfoil tips, packing lists, and Baja travel advice.',
        ogImage: ASSETS.ogImageDefault,
        ogType: 'blog',
    },

    searchResults: {
        path: '/search-results',
        title: 'Search Results | Baja Wing',
        description: '',
        noindex: true,
        nofollow: true,
    },

    inquiryServices: {
        path: '/inquiry-services-page',
        title: 'Service Inquiry | Baja Wing',
        description: '',
        noindex: true,
        nofollow: true,
    },
});

/* ---------------------------------------------------------------------------
 * Lessons FAQ — used by Service schema + FAQPage schema on /lessons
 * AEO: every Q has a concise, citable A in plain prose. No marketing fluff.
 * ------------------------------------------------------------------------ */

export const LESSONS_FAQ = Object.freeze([
    {
        question: 'How much does a wingfoil lesson cost in La Ventana?',
        answer:
            'A private 2-hour beginner wingfoil lesson with Baja Wing in La Ventana costs $250 USD. ' +
            'Multi-day packages reduce the per-hour cost: a 2-day 4-hour course is $480, a 3-day ' +
            '6-hour course is $690, and a 4-day 8-hour course is $880. A 1-hour advanced refresh ' +
            'lesson is $125. All packages include private one-on-one instruction, premium Reedin ' +
            'wings, Go Foil boards and foils, BB Talking radios for real-time coaching, and ' +
            'shuttle service to the best wind spot each day.',
    },
    {
        question: 'Can complete beginners take wingfoil lessons in La Ventana?',
        answer:
            'Yes. La Ventana is one of the best places in the world for a complete beginner to ' +
            'learn wingfoiling because the bay produces steady 15–25 knot side-shore winds from ' +
            'November through April, the water is warm, the launch is flat, and Baja Wing teaches ' +
            'private one-on-one only. Most students reach short foiling segments by lesson 3 or 4. ' +
            'No prior board-sports experience is required.',
    },
    {
        question: 'What gear is provided with a Baja Wing wingfoil lesson?',
        answer:
            'Every lesson includes a certified private instructor, full premium gear (Reedin wing, ' +
            'Go Foil board, Go Foil mast and front-wing, leashes), a 3/2mm wetsuit when needed, ' +
            'BB Talking radios so your instructor can coach you in real time while you are on the ' +
            'foil, shuttle to the best beach for that day’s wind, and all safety equipment ' +
            'including impact vest and helmet.',
    },
    {
        question: 'Can kids learn wingfoiling at Baja Wing?',
        answer:
            'Yes — Baja Wing accepts students from age 12 and up, provided the student can swim ' +
            'confidently and weighs at least 90 lbs (40 kg). Junior students use a smaller wing ' +
            'and a board sized for their weight. Younger children under 12 are evaluated case by ' +
            'case; reach out via WhatsApp at +1 503-705-7174 before booking.',
    },
    {
        question: 'What time of year is best for wingfoiling in La Ventana?',
        answer:
            'The Baja Wing instruction season runs from late October through early April, with ' +
            'peak conditions from December through March. The bay produces consistent 15–25 knot ' +
            'thermal winds almost every afternoon during this window, with water temperatures ' +
            'from 68°F in December to 75°F in March. Book 2–4 weeks in advance for December ' +
            'through March dates.',
    },
]);

/* ---------------------------------------------------------------------------
 * Camps FAQ — used by Service schema + FAQPage schema on /camps
 * ------------------------------------------------------------------------ */

export const CAMPS_FAQ = Object.freeze([
    {
        question: 'How long is a Baja Wing wingfoil camp?',
        answer:
            'Baja Wing wingfoil camps run from 5 to 7 days, with 4 to 5 on-water coaching sessions, ' +
            'one rest day, and optional add-on excursions to El Sargento, Punta Arena, and Cabo ' +
            'Pulmo. Sessions are typically 2 hours each, in the afternoon thermal window of ' +
            '12pm–5pm. Exact daily schedule is set by the wind forecast.',
    },
    {
        question: 'What is included in a wingfoil camp?',
        answer:
            'Camps include 8–10 hours of total private wingfoil coaching, premium Reedin wings ' +
            'and Go Foil boards, BB Talking radios, daily shuttle to the best wind spot, video ' +
            'review sessions, and a welcome / farewell dinner with the Baja Wing crew. Lodging is ' +
            'optional and can be added at booking — partner casa rentals are within a 5-minute ' +
            'walk of the beach. Flights and meals beyond the included dinners are not part of ' +
            'the camp price.',
    },
    {
        question: 'What skill level are the wingfoil camps for?',
        answer:
            'Camps are designed for two tiers: complete beginners (no prior wing experience) and ' +
            'intermediate riders (can ride upwind on the foil but want to refine jibes, tack, ' +
            'and downwind technique). Each camp has a maximum of 4 students per cohort so ' +
            'students are paired with similarly-skilled partners. Advanced and pro-tier camps ' +
            'are scheduled on demand — message us on WhatsApp at +1 503-705-7174.',
    },
    {
        question: 'When are wingfoil camps in La Ventana scheduled?',
        answer:
            'Camp dates run from late November through late March each season, with the most ' +
            'consistent thermal-wind windows in January and February. Specific cohort dates are ' +
            'posted on the bookings calendar 6 months in advance. Group camps fill 8–12 weeks ' +
            'before start — book early. Custom-date private camps for 2–4 friends can be ' +
            'scheduled outside the public calendar.',
    },
    {
        question: 'How much does a wingfoil camp cost?',
        answer:
            'Camps start at $1,650 USD per student for a 5-day session including coaching, gear, ' +
            'and shuttle; 7-day sessions are $2,200 USD per student. Lodging in a partner casa ' +
            'is an optional add-on starting at $90/night for a private room with shared bath, or ' +
            '$140/night for a full private studio. Flights and most meals are not included.',
    },
]);

/* ---------------------------------------------------------------------------
 * About-page narrative — for AboutPage schema description field
 * ------------------------------------------------------------------------ */

export const ABOUT_NARRATIVE =
    'Baja Wing & Watersports is a women-owned wingfoil school in La Ventana, ' +
    'Baja California Sur, founded by Ilaria, a Go Foil sponsored head instructor ' +
    'with over a decade of watersports teaching across wingfoiling, kitesurfing, ' +
    'and stand-up paddle. The school keeps every lesson private and one-on-one, ' +
    'uses premium Reedin wings and Go Foil boards, runs BB Talking radios for ' +
    'on-the-water coaching feedback, and serves La Ventana, El Sargento, Los ' +
    'Barriles, and the wider Sea of Cortez from late October through early April.';

/* ---------------------------------------------------------------------------
 * Helper — return the absolute URL for a given site-relative path
 * ------------------------------------------------------------------------ */

export function absoluteUrl(path) {
    if (!path) return SITE.domain + '/';
    if (path.startsWith('http')) return path;
    return SITE.domain + (path.startsWith('/') ? path : '/' + path);
}
