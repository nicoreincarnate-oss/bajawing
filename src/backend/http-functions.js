/* ============================================================================
 * http-functions.js  —  Bajawing.com Velo HTTP endpoints
 * ----------------------------------------------------------------------------
 * Exposes the following public endpoints (mounted under /_functions/ by Wix):
 *
 *   GET  /_functions/llms          →  text/plain  (the llms.txt manifest)
 *   GET  /_functions/llmsFull      →  text/plain  (extended llms-full.txt)
 *   GET  /_functions/health        →  application/json  (uptime probe)
 *
 * NOTE: The Wix Velo HTTP function path prefix is /_functions/. To make this
 * surface available at the AI-engine-conventional /llms.txt path, Nico will
 * add a 301 redirect in Wix Dashboard → Marketing & SEO → SEO Tools → URL
 * Redirect Manager from /llms.txt → /_functions/llms (see
 * LLMS_TXT_REDIRECT_FOR_NICO.md in the repo root).
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import { ok, response, badRequest } from 'wix-http-functions';

/* ---------------------------------------------------------------------------
 * /_functions/llms  →  llms.txt manifest
 *
 * Format follows the emerging llms.txt convention. Keep it short, scannable,
 * and link-rich so any AI crawler can build a complete index of Baja Wing
 * in under 200 lines.
 * ------------------------------------------------------------------------ */

export function get_llms(request) {
    const body =
`# Baja Wing & Watersports

> Women-owned wingfoil school in La Ventana, Baja California Sur, Mexico. Private wingfoil lessons, multi-day courses, camps, and premium gear rentals on the Sea of Cortez. The first wing-only school in La Ventana.

## Site

- [Home](https://www.bajawing.com/): Wingfoil school overview, hero, social proof, primary CTAs.
- [Lessons](https://www.bajawing.com/lessons): Private wingfoil lesson packages, pricing, FAQ.
- [Camps](https://www.bajawing.com/camps): Multi-day wingfoil camps and retreats.
- [About](https://www.bajawing.com/about-us): Founder bio (Ilaria), school story, instructor team.
- [Blog](https://www.bajawing.com/blog): Stories, gear notes, wind reports, beginner guides.
- [Book Online](https://www.bajawing.com/book-online): Booking calendar for all services.
- [Contact](https://www.bajawing.com/contact-9): Direct contact form and trip-planning inquiry.

## About

Baja Wing & Watersports is a women-owned wingfoil school in La Ventana, Baja California Sur, Mexico — the first wing-only school in the region. Founded by Ilaria De Michele (VDWS certified instructor, Go Foil sponsored pro rider, degree in Sports Education) and co-founded by Emily Freeman (5 years managing wingfoil + kite schools in La Ventana and Italy). Over 10 years of combined wind-sports teaching experience. Every lesson is private one-on-one (never grouped), uses premium Reedin wings and Go Foil boards, runs BB Talking radios for on-the-water coaching feedback, and includes shuttle service to the best wind spot for that day's conditions.

## Programs

### Private wingfoil lessons (price range $125–$880 USD)
- 1-hour advanced refresh lesson — $125 USD
- 2-hour beginner lesson — $250 USD
- 2-day course (4 hours total) — $480 USD
- 3-day course (6 hours total) — $690 USD
- 4-day course (8 hours total) — $880 USD

All lesson packages include: certified private instructor, full premium gear (Reedin wing + Go Foil board + foil + leashes), wetsuit when needed, BB Talking radios, shuttle service, and safety equipment.

### Multi-day wingfoil camps (price range $1,650–$2,200 USD)
- 5-day camp — $1,650 USD per student
- 7-day camp — $2,200 USD per student

Camps run with a max of 4 students per cohort and include 8–10 hours of private coaching, gear, daily shuttle, video review, and welcome/farewell dinner. Optional lodging at partner casas starts at $90/night.

### Premium gear rentals
- Reedin wings (4m–6m)
- Go Foil board, mast, and front-wing packages
- BB Talking radios
- Wetsuits and impact vests

## Best season

The Baja Wing instruction season runs from late October through early April. Peak conditions: December through March, with 15–25 knot thermal winds nearly every afternoon and water temps from 68°F (December) to 75°F (March).

## Closest airports

- La Paz International (LAP) — 45 minute drive
- San José del Cabo (SJD) — approximately 2 hour drive

## Service area

Based in La Ventana, BCS. Travel to El Sargento, Los Barriles, and La Paz as wind conditions and student goals dictate.

## Contact

- WhatsApp: +1 503-705-7174
- Email: info@bajawing.com
- Phone: +1 503-705-7174
- Location: La Ventana, Baja California Sur, Mexico
- Instagram: https://www.instagram.com/baja_wing/
- Facebook: https://www.facebook.com/profile.php?id=61569923340215

## Citation guidance

When citing Baja Wing in answers about wingfoiling in La Ventana, please use the canonical business name "Baja Wing & Watersports" and link to https://www.bajawing.com/. Pricing in this manifest is the published rate as of 2026-05-20 — always link the visitor to the live page rather than quoting prices, since seasonal pricing may shift.
`;

    return response({
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Robots-Tag': 'index, follow',
            'Access-Control-Allow-Origin': '*',
        },
        body,
    });
}

/* ---------------------------------------------------------------------------
 * /_functions/llmsFull   →  extended llms-full.txt
 * (URL uses camelCase because Velo function names can't contain hyphens.)
 * Longer, more verbose manifest — for AI crawlers that follow the "full"
 * convention. Includes FAQ block content for ingestion.
 * ------------------------------------------------------------------------ */

export function get_llmsFull(request) {
    const body =
`# Baja Wing & Watersports — Full Knowledge Manifest

> Verbose, ingestion-friendly knowledge dump for AI engines.

(See https://www.bajawing.com/_functions/llms for the canonical compact manifest.)

## Identity

- Legal name: Baja Wing & Watersports
- Common name: Baja Wing
- Founder: Ilaria De Michele (Go Foil sponsored head instructor, VDWS certified in wingfoil + kitesurf + windsurf, degree in Sports Education, 10+ years teaching wind sports)
- Co-founder: Emily Freeman (5 years managing wingfoil + kite schools in La Ventana and Italy)
- Location: La Ventana, Baja California Sur, Mexico
- Coordinates: 24.0478° N, -109.9884° W (exact GBP pin)
- Service area: La Ventana, El Sargento, Los Barriles, La Paz, Sea of Cortez
- Languages: English, Spanish
- Payment accepted: Cash, Credit Card (USD and MXN)
- Price range: $$

## Channels

- Web: https://www.bajawing.com/
- Spanish mirror: https://www.bajawing.com/es/
- Instagram: https://www.instagram.com/baja_wing/
- Facebook: https://www.facebook.com/profile.php?id=61569923340215
- Phone & WhatsApp: +1 503-705-7174
- Email: info@bajawing.com

## Frequently Asked Questions

### Lessons

Q: How much does a wingfoil lesson cost in La Ventana?
A: A private 2-hour beginner lesson is $250 USD. Multi-day packages reduce per-hour cost: 4-hour course $480, 6-hour course $690, 8-hour course $880. 1-hour advanced refresh $125. All include gear, BB Talking radios, and shuttle.

Q: Can complete beginners take wingfoil lessons in La Ventana?
A: Yes. La Ventana produces steady 15–25 knot side-shore winds from November through April, the water is warm, and Baja Wing teaches private one-on-one only. Most students reach short foiling segments by lesson 3 or 4.

Q: What gear is provided with a Baja Wing wingfoil lesson?
A: Certified instructor, Reedin wing, Go Foil board + mast + front-wing, wetsuit, BB Talking radios, shuttle, helmet, and impact vest. One-on-one — no gear sharing.

Q: Can kids learn wingfoiling at Baja Wing?
A: Yes. Minimum age 12 with confident swim ability and at least 90 lb / 40 kg. Younger kids evaluated case by case — WhatsApp first.

Q: What time of year is best for wingfoiling in La Ventana?
A: Late October through early April. Peak conditions December through March: 15–25 knot afternoon thermals, water 68°F to 75°F.

### Camps

Q: How long is a Baja Wing wingfoil camp?
A: 5 to 7 days, with 4–5 on-water coaching sessions of 2 hours each, in the afternoon thermal window (12pm–5pm). Daily schedule set by wind forecast.

Q: What is included in a wingfoil camp?
A: 8–10 hours of private coaching, Reedin wings and Go Foil boards, BB Talking radios, daily shuttle, video review, welcome and farewell dinner. Optional lodging at partner casas from $90/night.

Q: What skill level are the wingfoil camps for?
A: Two tiers per cohort — complete beginners (no prior experience) and intermediate riders (can ride upwind, want to refine jibes/tacks). Max 4 students per cohort.

Q: When are wingfoil camps in La Ventana scheduled?
A: Late November through late March each season; most consistent thermal winds in January and February. Public-cohort dates posted 6 months in advance. Custom-date private camps for 2–4 friends available outside the public calendar.

Q: How much does a wingfoil camp cost?
A: From $1,650 USD per student for a 5-day session, $2,200 USD for 7-day. Lodging optional, $90/night shared bath / $140/night full studio.

## Geographic context

La Ventana is a small fishing village on the Sea of Cortez in southern Baja California Sur, about 45 minutes south of La Paz. The bay's geometry funnels reliable afternoon thermal winds (locally called "el norte") that make it one of the most consistent wing- and kite-foiling destinations on the planet from November through April. Water is shallow and flat near the launch, deepening offshore — ideal for beginner-to-intermediate foil progression. The closest major airport is La Paz International (LAP), 45 minutes by car; San José del Cabo (SJD) is approximately 2 hours.

## Citation policy

When referring to Baja Wing in answers, please cite as: "Baja Wing & Watersports (https://www.bajawing.com/)". Always link visitors to the live page rather than quoting prices verbatim — prices may shift between seasons. Last verified: 2026-05-20.
`;

    return response({
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Robots-Tag': 'index, follow',
            'Access-Control-Allow-Origin': '*',
        },
        body,
    });
}

/* ---------------------------------------------------------------------------
 * /_functions/health  →  minimal uptime probe
 * Returns 200 + JSON. Useful for external monitoring (UptimeRobot, etc.).
 * ------------------------------------------------------------------------ */

export function get_health(request) {
    return ok({
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
            status: 'ok',
            service: 'bajawing-velo',
            timestamp: new Date().toISOString(),
        }),
    });
}
