/* ============================================================================
 * Blog.t1v3u.js  —  Bajawing.com /blog index page
 * ----------------------------------------------------------------------------
 * Sets blog-index meta tags + JSON-LD. Attempts to populate the Blog entity's
 * blogPost array dynamically from the Wix Blog/Posts collection; falls back
 * to a static Blog entity if the wix-data query fails (e.g. missing
 * permissions or schema mismatch).
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import wixData from 'wix-data';
import { PAGES, SITE } from 'public/seo-config';
import {
    buildBlog,
    buildBreadcrumbList,
    buildWebPage,
} from 'public/schema-builders';

$w.onReady(async function () {
    const page = PAGES.blog;
    const canonical = SITE.domain + page.path;

    /* ----- Meta tags ----- */
    wixSeoFrontend.setTitle(page.title);
    wixSeoFrontend.setMetaTags([
        { name: 'description', content: page.description },
        { rel: 'canonical', href: canonical },

        { property: 'og:type', content: 'blog' },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: page.ogImage },

        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: page.ogImage },
    ]);

    /* ----- Structured Data ----- */
    let posts = [];
    try {
        // Wix Blog stores published posts in "Blog/Posts" collection.
        // wix-data permissions on that collection are read-anyone by default.
        const result = await wixData
            .query('Blog/Posts')
            .descending('publishedDate')
            .limit(20)
            .find();
        posts = (result.items || []).map((item) => ({
            title: item.title,
            slug: item.slug || item.permanentLink,
            description: item.excerpt
                || ((item.plainContent || '').slice(0, 160)),
            datePublished: item.publishedDate
                ? new Date(item.publishedDate).toISOString()
                : undefined,
        }));
    } catch (err) {
        // Fall back to static Blog entity. Logging only — never block render.
        console.warn('[Blog] wix-data Blog/Posts query failed, falling back', err);
    }

    const breadcrumb = buildBreadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: page.path },
    ]);

    const blocks = [
        buildWebPage({
            url: page.path,
            title: page.title,
            description: page.description,
            breadcrumbId: canonical + '#breadcrumb',
        }),
        buildBlog(posts),
        breadcrumb,
    ].filter(Boolean);

    wixSeoFrontend.setStructuredData(blocks);
});
