# robots.txt — paste into Wix Dashboard

**Where:** Wix Dashboard → Marketing & SEO → SEO Tools → **Robots.txt Editor**

**What to do:** Replace the entire current robots.txt with the block below. Click **Save**, then **Update** at the top of the panel.

**Verification:** After saving, in a private browser tab fetch `https://www.bajawing.com/robots.txt` and confirm every line below appears. Then in Google Search Console → Settings → robots.txt, click **Re-fetch** so Google picks up the new file within minutes instead of hours.

---

## Paste the entire block below

```txt
# robots.txt for Baja Wing & Watersports
# Source of truth: https://www.bajawing.com/robots.txt
# Last reviewed: 2026-05-20

# --- Default crawler policy ---
User-agent: *
Allow: /
Disallow: /search/
Disallow: /search-results/
Disallow: /es/search/
Disallow: /es/search-results/
Disallow: /inquiry-services-page
Disallow: /es/inquiry-services-page
Disallow: /cart
Disallow: /es/cart
Disallow: /checkout
Disallow: /es/checkout
Disallow: /thank-you
Disallow: /es/thank-you
Disallow: /account/
Disallow: /es/account/
Disallow: /_api/
Disallow: /_functions/health
Crawl-delay: 1

# --- AI / LLM crawlers: explicit allow (Day-1 GEO play) ---
# These bots crawl for AI training, RAG indexes, AI search citations, and
# AI Overviews. Allowing them increases citation surface on
# ChatGPT, Perplexity, Google AI Overviews, Claude, and similar engines.

User-agent: GPTBot
Allow: /
Disallow: /search/
Disallow: /inquiry-services-page

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Diffbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: MistralAI-User
Allow: /

# --- Sitemap ---
Sitemap: https://www.bajawing.com/sitemap.xml

# --- llms.txt manifest (served by Velo HTTP function) ---
# Canonical: https://www.bajawing.com/llms.txt  (redirects to /_functions/llms)
# Full:      https://www.bajawing.com/llms-full.txt  (redirects to /_functions/llms-full)
# See LLMS_TXT_REDIRECT_FOR_NICO.md in the Velo repo for setup.
```

---

## What changed vs the live robots.txt

1. **Added explicit `Allow:` rules for every major AI crawler.** Default Wix robots.txt is silent on these; many crawlers default to "Disallow if unmentioned." Explicit allow opens the gate.
2. **Disallowed the search-result and inquiry pages** so they stop bleeding crawl budget.
3. **Added `Crawl-delay: 1`** so high-frequency crawlers don't hammer the site.
4. **Sitemap directive** preserved.
5. **llms.txt declared as a comment** at the bottom — robots.txt has no spec for declaring llms.txt, but the comment is a hint for human auditors and well-behaved AI tooling.

## Rollback

If anything breaks (404s spike, organic traffic dips), the safe rollback is to revert the panel to Wix's auto-generated default (the editor has an **Auto-generated** toggle at the top — flip it back on temporarily).
