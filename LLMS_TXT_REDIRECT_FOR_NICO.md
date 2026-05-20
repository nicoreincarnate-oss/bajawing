# llms.txt redirect setup — Wix URL Redirect Manager

**Goal:** Make `https://www.bajawing.com/llms.txt` and `https://www.bajawing.com/llms-full.txt` resolve to the Velo-served manifests at `/_functions/llms` and `/_functions/llms-full`, so AI crawlers that probe the conventional path find Baja Wing content immediately.

**Why two paths?**
- `/llms.txt` — the compact manifest (~1 KB). Most AI crawlers hit this first.
- `/llms-full.txt` — the verbose manifest (~3 KB) including FAQ blocks. Crawlers that follow the "full" convention pick this up too.

---

## Step-by-step

**Where:** Wix Dashboard → **Marketing & SEO** → **SEO Tools** → **URL Redirect Manager**

### Redirect 1 — compact manifest

1. Click **+ New Redirect**.
2. **Old URL** (Old Path) field — enter exactly: `/llms.txt`
3. **New URL** (Redirect To) field — enter exactly: `/_functions/llms`
4. **Redirect Type** — select `301 (Permanent)`
5. Click **Save**.

### Redirect 2 — extended manifest

1. Click **+ New Redirect**.
2. **Old URL** field — enter exactly: `/llms-full.txt`
3. **New URL** field — enter exactly: `/_functions/llms-full`
4. **Redirect Type** — select `301 (Permanent)`
5. Click **Save**.

---

## Verification

Open a private browser tab (so no Wix admin cookies) and visit each URL. You should see plain-text content (markdown-like), NOT a 404 or the Wix homepage.

```
https://www.bajawing.com/llms.txt
https://www.bajawing.com/llms-full.txt
```

Both should display a markdown manifest starting with `# Baja Wing & Watersports`.

You can also verify via terminal:
```bash
curl -IL https://www.bajawing.com/llms.txt
# Expect: HTTP/2 301 → location: /_functions/llms → HTTP/2 200, content-type: text/plain
```

---

## What's behind the curtain

The `/_functions/llms` endpoint is implemented in `src/backend/http-functions.js` of the Velo repo (function: `get_llms`). It returns a static text/plain body — no database lookup, no user input — so it costs effectively zero per request and never errors out. The 301 in Wix's redirect manager is the only piece that lives in the dashboard.

If we ever want to update the manifest content, the only file to touch is `src/backend/http-functions.js`. No dashboard edit required — git push and Velo redeploys automatically.

---

## Rollback

If the redirects misfire (404s on /llms.txt, wrong destination), open URL Redirect Manager, find the two rows we just added, and delete them. The Velo function will still be available at `/_functions/llms` directly — just not at the conventional path.
