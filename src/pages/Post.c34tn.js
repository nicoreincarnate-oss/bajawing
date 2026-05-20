/* ============================================================================
 * Post.c34tn.js  —  Bajawing.com /post/{slug} dynamic blog post page
 * ----------------------------------------------------------------------------
 * Dynamic blog post page driven by Wix Blog. Pulls the current post from the
 * Blog/Posts collection by slug (derived from wix-location-frontend), then
 * sets per-post meta tags + BlogPosting JSON-LD with full E-E-A-T signals.
 *
 * If the post lookup fails for any reason, we fall back to letting Wix Blog's
 * auto-injected SEO render and just add a minimal BreadcrumbList. No errors
 * are surfaced to the visitor.
 *
 * Authored: 2026-05-20
 * ========================================================================= */

import wixSeoFrontend from 'wix-seo-frontend';
import wixLocationFrontend from 'wix-location-frontend';
import wixData from 'wix-data';
import { SITE, ASSETS, FOUNDER } from 'public/seo-config';
import {
    buildBlogPosting,
    buildBreadcrumbList,
    buildPerson,
} from 'public/schema-builders';

$w.onReady(async function () {
    try {
        const slug = extractPostSlug(wixLocationFrontend.path);

        let post = null;
        if (slug) {
            const result = await wixData
                .query('Blog/Posts')
                .eq('slug', slug)
                .limit(1)
                .find();
            post = (result.items && result.items[0]) || null;

            // Fallback: try permanentLink if slug query came up empty
            if (!post) {
                const r2 = await wixData
                    .query('Blog/Posts')
                    .eq('permanentLink', slug)
                    .limit(1)
                    .find();
                post = (r2.items && r2.items[0]) || null;
            }
        }

        if (!post) {
            // No post found via lookup — set breadcrumb only, let Wix Blog's
            // auto-injected meta tags handle the rest.
            wixSeoFrontend.setStructuredData([
                buildBreadcrumbList([
                    { name: 'Home', url: '/' },
                    { name: 'Blog', url: '/blog' },
                ]),
            ].filter(Boolean));
            return;
        }

        const title = post.title || 'Baja Wing Blog';
        const description = (post.excerpt
            || (post.plainContent || '').slice(0, 160)
            || 'Story from the Baja Wing wingfoil school in La Ventana, BCS.').trim();
        const image = post.coverImage || post.mediaUrl || ASSETS.ogImageDefault;
        const datePublished = post.publishedDate
            ? new Date(post.publishedDate).toISOString()
            : undefined;
        const dateModified = post.lastPublishedDate
            ? new Date(post.lastPublishedDate).toISOString()
            : datePublished;
        const url = SITE.domain + '/post/' + (post.slug || slug);
        const seoTitle = title + ' | Baja Wing Blog';

        /* ----- Meta tags ----- */
        wixSeoFrontend.setTitle(seoTitle);
        wixSeoFrontend.setMetaTags([
            { name: 'description', content: description },
            { name: 'author', content: post.ownerDisplayName || FOUNDER.name },
            { rel: 'canonical', href: url },

            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: url },
            { property: 'og:image', content: image },
            { property: 'article:published_time', content: datePublished },
            { property: 'article:modified_time', content: dateModified },
            { property: 'article:author', content: post.ownerDisplayName || FOUNDER.name },
            { property: 'article:section', content: 'Wingfoiling' },

            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image },
        ]);

        /* ----- Structured Data ----- */
        const blocks = [
            buildBlogPosting({
                title,
                slug: post.slug || slug,
                description,
                image,
                datePublished,
                dateModified,
                authorName: post.ownerDisplayName,
                authorImage: post.ownerProfileImage,
                wordCount: post.plainContent ? post.plainContent.split(/\s+/).length : undefined,
                keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
            }),
            // Re-emit Person(founder) so the BlogPosting author resolves to a
            // known entity for AI engines when the post is by Ilaria.
            buildPerson(FOUNDER),
            buildBreadcrumbList([
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
                { name: title, url: '/post/' + (post.slug || slug) },
            ]),
        ].filter(Boolean);

        wixSeoFrontend.setStructuredData(blocks);
    } catch (err) {
        // Never let SEO logic break the page. Log + fall through.
        console.warn('[Post] dynamic SEO setup failed', err);
    }
});

/**
 * Derive a blog post slug from the current path.
 *   /post/why-la-ventana-rules     → why-la-ventana-rules
 *   /es/post/por-que-la-ventana    → por-que-la-ventana
 *   /post/                         → null
 */
function extractPostSlug(path) {
    if (!path || !Array.isArray(path)) return null;
    // wixLocationFrontend.path is an array of segments after the host
    // For /post/foo it is ['post', 'foo']; for /es/post/foo it is ['es', 'post', 'foo']
    const idx = path.indexOf('post');
    if (idx === -1 || idx >= path.length - 1) return null;
    return path[idx + 1];
}
