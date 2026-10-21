From acea655c49acbf34ce704db6787102423036f96b Mon Sep 17 00:00:00 2001
From: Claude <noreply@anthropic.com>
Date: Wed, 21 Oct 2026 10:39:40 +0000
Subject: [PATCH] docs(seo): add single-file SEO guide

Adds nitrajsinh-solanki/SEO-GUIDE.md: a self-contained audit, implementation
runbook, content/structured-data/technical/off-site guides, measurement manual
and owner-decision register, with the audit and icon scripts as appendices.

Documentation only. No application code, config or dependency is changed.
---
 nitrajsinh-solanki/SEO-GUIDE.md | 2376 +++++++++++++++++++++++++++++++
 1 file changed, 2376 insertions(+)
 create mode 100644 nitrajsinh-solanki/SEO-GUIDE.md

diff --git a/nitrajsinh-solanki/SEO-GUIDE.md b/nitrajsinh-solanki/SEO-GUIDE.md
new file mode 100644
index 0000000..c790489
--- /dev/null
+++ b/nitrajsinh-solanki/SEO-GUIDE.md
@@ -0,0 +1,2376 @@
+# SEO Guide — Nitrajsinh Solanki portfolio
+
+| | |
+|---|---|
+| **Applies to** | branch `main` @ `1b75d64` (the app is in `nitrajsinh-solanki/`) |
+| **Audited on** | 21 Oct 2026 |
+| **Live site** | https://nitrajsinh-solanki.vercel.app |
+| **This file** | One self-contained document: 8 parts and 3 appendices. Nothing else needs to be downloaded. |
+
+## Contents
+
+0. This overview
+1. [Part 1 — Current-state audit](#part-1)
+2. [Part 2 — Implementation runbook](#part-2)
+3. [Part 3 — On-page SEO and content](#part-3)
+4. [Part 4 — Structured data (JSON-LD)](#part-4)
+5. [Part 5 — Technical SEO and performance](#part-5)
+6. [Part 6 — Off-site and entity SEO](#part-6)
+7. [Part 7 — Measurement and maintenance](#part-7)
+8. [Part 8 — Decisions only you can make](#part-8)
+9. [Appendix A — `scripts/seo-audit.py`](#appendix-a)
+10. [Appendix B — `scripts/self-host-icons.mjs`](#appendix-b)
+11. [Appendix C — raw audit output (before and after)](#appendix-c)
+
+> In cross-references, `01`…`08` mean Part 1…8.
+
+## TL;DR
+
+1. The site is already technically solid: static HTML, unique titles/descriptions, canonicals, Open Graph images, JSON-LD, sitemap and robots. A previous SEO commit fixed many issues.
+2. In the real build output I found several concrete defects (missing `apple-touch-icon`, wrong JSON-LD `programmingLanguage` on 8 pages, invalid microdata on `/projects`, visible `localhost:3000`, a stale "10 projects" label, …) and **tested fixes for them**: the audit went from **10 FAIL to 0 FAIL**.
+3. The biggest remaining opportunities need *your* material, not code: real project screenshots, deeper case studies, one consistent identity (role, CGPA, name), and **links from GitHub to the portfolio (0 of 8 repos link today)**.
+4. Nothing here guarantees rankings. The guide separates what I **verified**, **tested**, could **not** verify, and what is **your decision**.
+
+## How to use this file
+
+| Part | Use it to… |
+|---|---|
+| [1](#part-1) | See what is good, what is broken, and the evidence |
+| [2](#part-2) | **Do the work**, step by step, with code, commands and verification |
+| [8](#part-8) | Answer the questions only you can answer (do this early) |
+| [3](#part-3) | Improve titles, headings, project pages, images, internal links, identity |
+| [4](#part-4) | Understand and maintain the JSON-LD |
+| [5](#part-5) | Crawling, domain, icons, performance and how to measure it |
+| [6](#part-6) | GitHub/LinkedIn/clients: the links and consistency that build authority |
+| [7](#part-7) | Search Console, KPIs, release checklist, the audit tool, troubleshooting |
+
+## Evidence tags used everywhere
+
+| Tag | Meaning |
+|---|---|
+| **[V]** | Verified in the source or in the output of a real `next build` |
+| **[T]** | Tested: fix applied to a scratch copy, built, linted, audited |
+| **[N]** | Not verified here (needs the live site, Search Console, or is unknowable offline) |
+| **[O]** | Owner decision |
+
+## Scoreboard (measured)
+
+| Measure | Before (`main`) | After the tested fixes |
+|---|---:|---:|
+| Audit result | **10 FAIL, 21 WARN** | **0 FAIL, 12 WARN** |
+| `apple-touch-icon` link on pages | 0 of 15 | 15 of 15 |
+| Project pages with correct `programmingLanguage` | 0 of 8 | 8 of 8 |
+| Invalid microdata entities on `/projects` | 11 | 0 |
+| Project pages showing `localhost:3000` | 7 of 11 | 0 |
+| Third-party image requests on `/` | 46 | 0 |
+| `/projects` extra JS chunk holding all project text | 55.5 KB | gone |
+| Inbound internal links per project page | 2–4 | 2–11 |
+| Tech-stack label project count | "10" (wrong) | `STATS.total` (11) |
+
+Still needing you: project screenshots `0/11`, identical sitemap dates (a policy, not a bug), and off-site links `0/9`.
+
+## 30-minute quick start
+
+```bash
+git checkout main && git pull
+git checkout -b seo/quick-wins
+cd nitrajsinh-solanki && npm ci
+mkdir -p scripts                       # save Appendix A as scripts/seo-audit.py
+npm run build && python3 scripts/seo-audit.py           # baseline: 10 FAIL, 21 WARN
+# make the seven edits in Part 2 → Phase 1
+npm run lint && npm run build && python3 scripts/seo-audit.py   # expect 0 FAIL
+```
+
+Then follow Phase 2 (icons) and the rest of Part 2, and answer the decisions in Part 8.
+
+## Limits of this work
+
+I could not reach the live site, Search Console, PageSpeed, the CDNs or the GitHub API (rate-limited), and Google Fonts are blocked in my sandbox, so builds used a scratch copy with the three font imports stubbed (**that stub is not part of any fix in this file**). Anything depending on those is tagged **[N]**. I did not change your claims, copy or design.
+
+## Relationship to the older `SEO-IMPROVEMENT-PLAN.md`
+
+That plan was written *before* commit #20, so parts of it are stale (several items it lists are fixed, and some "done" items are not fully effective — for example the Apple icon). I left it untouched. This file supersedes it; once you are happy, archive or delete the old one.
+
+
+---
+
+<a id="part-1"></a>
+
+# Part 1 — Current-state audit
+
+> **Audited:** branch `main` @ `1b75d64` ("fix: implement safe SEO improvements (#20)") · **Date:** 21 Oct 2026
+> **Scope:** everything inside `nitrajsinh-solanki/` (the Next.js app). Other remote branches (`feature/all-updation`, `feature/remaining-improvement`) have **0 commits** that are not already in `main`, so `main` is the complete picture.
+
+Evidence tags used throughout this guide:
+
+| Tag | Meaning |
+|---|---|
+| **[V]** | Verified: seen in the source code and/or in the HTML produced by a real `next build`. |
+| **[T]** | Tested: the fix was applied to a scratch copy, built, and the audit script passed. |
+| **[N]** | Not verified here (needs the live site, Search Console, PageSpeed, or information only you have). |
+| **[O]** | Owner decision: a factual or positioning choice I will not make for you. |
+
+---
+
+## 1. Method (so you can repeat it)
+
+1. Cloned the repo, read **every** file in `nitrajsinh-solanki/` (routes, components, `lib/`, config, CI, public assets, both existing `.md` plans).
+2. Checked Next.js 16.2.6 behaviour against the docs **bundled with the installed package** (`node_modules/next/dist/docs`), as `AGENTS.md` instructs, and against Next's own source where docs were silent.
+3. Ran `npm ci && npm run build` and analysed the prerendered HTML in `.next/server/app` with my own parser (titles, meta, canonicals, headings, JSON-LD, microdata, images, links, sizes).
+4. Built **pristine `main`** as the baseline and ran the audit script (Appendix A) on it (result in §8).
+5. Applied each proposed fix to a scratch copy, rebuilt, linted, and re-ran the audit (result in §8).
+6. Cloned all 8 public project repositories (shallow) to measure their real languages instead of guessing.
+
+**Environment limits (be aware of these):**
+
+* The sandbox cannot reach Google Fonts, so the build was done in a throw-away copy with the three `next/font/google` imports stubbed. **No stub is in the repo or in any patch.**
+* The CDNs (`cdn.jsdelivr.net`, `cdn.simpleicons.org`) are unreachable from the sandbox, so I could not check what they currently serve.
+* The GitHub REST API was rate-limited, so repo "About" fields, topics and your profile fields are **not verified** (cloning via `github.com` worked, so repo visibility and languages are).
+* I had no access to the live site, Search Console, Bing Webmaster Tools or PageSpeed Insights.
+
+---
+
+## 2. SEO-relevant map of the app **[V]**
+
+| File | What it does for SEO |
+|---|---|
+| `app/layout.tsx` | Root metadata (`metadataBase`, title template `%s \| Nitrajsinh Solanki`, OG/Twitter defaults, `icons`, viewport/theme colour), `<html lang="en-IN">`, loads fonts (Syne 400/600/700/800, DM Mono 300/400/500, DM Sans) |
+| `lib/site.ts` | `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, falls back to `https://nitrajsinh-solanki.vercel.app`), `SITE_NAME`, `SOCIAL` links, `abs()` helper |
+| `lib/seo.ts` | `pageMetadata()` – builds per-page title, description, canonical, Open Graph and Twitter metadata |
+| `lib/schema.ts`, `lib/profile.ts` | JSON-LD builders (`breadcrumb()`, Person/WebSite nodes) and the profile data they use |
+| `app/components/JsonLd.tsx` | Renders `<script type="application/ld+json">` |
+| `app/sitemap.ts` / `app/robots.ts` / `app/manifest.ts` | Generated `sitemap.xml`, `robots.txt`, web manifest |
+| `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` | Machine-readable site summaries |
+| `app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx` | Generated 1200×630 share images |
+| `app/icon.svg`, `app/apple-icon.tsx` | Favicon and 180×180 Apple icon (see **F-01**: the Apple icon is not being linked) |
+| `app/projects/data.ts`, `app/projects/stats.ts` | Single data source for the 11 projects and the counts shown across the site |
+| `app/projects/[slug]/page.tsx` | Project detail template (11 static pages), `SoftwareApplication` + `SoftwareSourceCode` JSON-LD |
+| `app/projects/ProjectsClient.tsx` | `/projects` listing (client component with category filter) |
+| `app/not-found.tsx` | 404 page (`noindex`) |
+| `public/google2da5ac569292214b.html` | Google Search Console HTML-file verification |
+| `public/Nitrajsinh_Solanki_Resume.pdf` | Resume linked from `/resume` |
+| `next.config.ts` | `experimental.inlineCss`, security headers, AVIF/WebP image formats |
+| `vercel.json` | Only `main` deploys; every other branch is **not** deployed (so no preview duplicates) |
+| `.github/workflows/portfolio-validation.yml` | Lint + production build on pull requests to `main` that touch `nitrajsinh-solanki/**` |
+
+Stack: Next.js **16.2.6**, React **19.2.4**, Tailwind CSS 4, TypeScript 5, ESLint 9. No runtime dependencies other than Next/React.
+
+---
+
+## 3. What is already good **[V]** — keep it
+
+* Every page is **statically prerendered** (36 static routes in the build output), so Googlebot receives complete HTML without needing JavaScript.
+* One `<h1>` per page, a sensible h2 structure, `lang="en-IN"`, viewport, theme colour.
+* **Unique** title (44–60 chars) and meta description (136–152 chars) on all 15 indexable URLs; none ends with an ellipsis.
+* Exactly one **self-referencing absolute canonical** per page, matching `og:url`.
+* Complete Open Graph + Twitter card tags with a **generated image on every page** (I rendered and visually inspected the home and the longest project title: no overflow).
+* A coherent JSON-LD graph (WebSite, Person, ProfilePage, CollectionPage, SoftwareApplication, SoftwareSourceCode, BreadcrumbList) using stable `@id`s.
+* `sitemap.xml` lists exactly the 15 indexable URLs; `robots.txt` has an absolute `Sitemap:` line and blocks nothing.
+* The 404 page is `noindex` (two `robots` tags are emitted, but both say `noindex`, so they do not conflict).
+* Security headers are set; `X-Powered-By` is off; profile photo uses `next/image` with `priority`.
+* `vercel.json` prevents non-`main` branches from being deployed, which avoids duplicate preview sites being crawled.
+
+## 4. What commit #20 already fixed **[V]**
+
+| Item | Status in the built output |
+|---|---|
+| `<br>` gluing the hero/heading words together | Fixed |
+| Meta descriptions cut mid-sentence with "…" | Fixed (separate `seoDescription` per project) |
+| 404 page sending conflicting robots directives | Fixed (both tags are `noindex`) |
+| Duplicate resume PDF | Fixed (one PDF in `public/`) |
+| `codeRepository` pointing at a profile instead of a repo | Fixed (only real repo URLs are emitted) |
+| Project count drifting between pages | Guarded in `stats.ts`/`data.ts` (but see **F-05**: two labels still hard-code a number) |
+| Per-project dates in the sitemap | Infrastructure added (`PAGE_UPDATED` + per-project `updated`); all dates are currently equal on purpose, see **F-06** |
+| Apple icon | A route was added, **but it is not linked** (see **F-01**) |
+
+The older `SEO-IMPROVEMENT-PLAN.md` was written *before* #20, so parts of it are now stale. I did not modify it; use this guide as the current source of truth.
+
+---
+
+## 5. Page inventory **[V]** (baseline, `main` @ `1b75d64`)
+
+### 5.1 Metadata
+
+| Route | `<title>` | Len | Meta description length | Words (visible) |
+|---|---|---:|---:|---:|
+| `/` | Nitrajsinh Solanki \| Full-Stack Developer in Gujarat, India | 59 | 150 | 1916 |
+| `/about` | About — Full-Stack Developer in Gujarat \| Nitrajsinh Solanki | 60 | 141 | 310 |
+| `/projects` | Projects — Full-Stack, AI & Blockchain \| Nitrajsinh Solanki | 59 | 137 | 593 |
+| `/resume` | Resume — Full-Stack Developer \| Nitrajsinh Solanki | 50 | 147 | 422 |
+| `/projects/biomap` | BioMap — Scientific Explorer Platform \| Nitrajsinh Solanki | 58 | 141 | 308 |
+| `/projects/floris-restaurant` | Floris Restaurant & Banquet Website \| Nitrajsinh Solanki | 56 | 144 | 293 |
+| `/projects/hourbit` | HourBit — All-in-One Productivity Suite \| Nitrajsinh Solanki | 60 | 139 | 313 |
+| `/projects/ice-saathi` | Aman Sales — Ice Saathi Platform \| Nitrajsinh Solanki | 53 | 152 | 298 |
+| `/projects/ice-saathi-delivery-app` | Aman Sales Delivery Partner App \| Nitrajsinh Solanki | 52 | 144 | 311 |
+| `/projects/library-inventory-system` | Library & Book Store Inventory System \| Nitrajsinh Solanki | 58 | 138 | 324 |
+| `/projects/math-genius-ai` | Math Genius AI — Learning Platform \| Nitrajsinh Solanki | 55 | 145 | 292 |
+| `/projects/meeting-insights-generator` | Meeting Insights Generator \| Nitrajsinh Solanki | 47 | 136 | 305 |
+| `/projects/moodify` | Moodify — AI Music Streaming App \| Nitrajsinh Solanki | 53 | 151 | 345 |
+| `/projects/nft-marketplace-aptos` | NFT Marketplace on Aptos Blockchain \| Nitrajsinh Solanki | 56 | 140 | 306 |
+| `/projects/rust-file-server` | Rust Simple File Server \| Nitrajsinh Solanki | 44 | 150 | 278 |
+
+Titles and descriptions are within the recommended display limits (about 60 / 160 characters). Two titles are exactly at the limit (`/about`, `/projects/hourbit`); do not lengthen them.
+
+### 5.2 Structure, structured data and internal links
+
+| Route | H1 | H2 count | JSON-LD `@type`s | Inbound internal links (baseline) |
+|---|---|---:|---|---:|
+| `/` | Nitrajsinh Solanki | 7 | WebSite, Person | 15 |
+| `/about` | About Nitrajsinh Solanki | 4 | ProfilePage, Person, BreadcrumbList | 14 |
+| `/projects` | My Work & Projects | 12 | CollectionPage, BreadcrumbList | 14 |
+| `/resume` | Nitrajsinh Solanki: Resume | 4 | BreadcrumbList | 14 |
+| `/projects/biomap` | BioMap — Scientific Explorer Platform | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 4 |
+| `/projects/floris-restaurant` | Floris Restaurant & Banquet Website | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+| `/projects/hourbit` | HourBit — All-in-One Productivity Suite | 5 | SoftwareApplication, BreadcrumbList | 2 |
+| `/projects/ice-saathi` | Aman Sales — Ice Saathi Platform | 6 | SoftwareApplication, BreadcrumbList | 3 |
+| `/projects/ice-saathi-delivery-app` | Aman Sales Delivery Partner App | 6 | SoftwareApplication, BreadcrumbList | 3 |
+| `/projects/library-inventory-system` | Library & Book Store Inventory System | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+| `/projects/math-genius-ai` | Math Genius AI — Learning Platform | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+| `/projects/meeting-insights-generator` | Meeting Insights Generator | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+| `/projects/moodify` | Moodify — AI Music Streaming App | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+| `/projects/nft-marketplace-aptos` | NFT Marketplace on Aptos Blockchain | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 4 |
+| `/projects/rust-file-server` | Rust Simple File Server | 6 | SoftwareApplication, SoftwareSourceCode, BreadcrumbList | 3 |
+
+"Inbound internal links" counts distinct pages that link to the route. The four top-level pages are linked from every page through the navigation; each **project page is reachable from only 2–4 pages** at baseline.
+
+### 5.3 Internal-link graph for project pages — before vs. after the tested fix **[T]**
+
+| Project page | Inbound internal links before | After |
+|---|---:|---:|
+| `/projects/biomap` | 4 | 9 |
+| `/projects/floris-restaurant` | 3 | 5 |
+| `/projects/hourbit` | 2 | 2 |
+| `/projects/ice-saathi` | 3 | 4 |
+| `/projects/ice-saathi-delivery-app` | 3 | 5 |
+| `/projects/library-inventory-system` | 3 | 11 |
+| `/projects/math-genius-ai` | 3 | 8 |
+| `/projects/meeting-insights-generator` | 3 | 5 |
+| `/projects/moodify` | 3 | 8 |
+| `/projects/nft-marketplace-aptos` | 4 | 5 |
+| `/projects/rust-file-server` | 3 | 4 |
+
+`/projects/hourbit` stays at 2: it is the only `personal` project, and the related-projects ranking gives same-category peers a +2 bonus, so no other page ever selects it (it does share technologies with several projects). See **F-09** for the follow-up.
+
+---
+
+## 6. Findings register
+
+Severity: **P1** = real defect, cheap to fix, do first · **P2** = quality/consistency · **P3** = polish or needs your input.
+"Step" points to the numbered step in [Part 2](#part-2).
+
+| ID | Sev | Finding | Tags | Step |
+|---|---|---|---|---|
+| F-01 | P1 | `<link rel="apple-touch-icon">` is missing on every page | [V][T] | 1.1 |
+| F-02 | P1 | `programmingLanguage` in `SoftwareSourceCode` JSON-LD is wrong on all 8 pages that emit it | [V][T] | 1.2 |
+| F-03 | P1 | `/projects` emits 11 microdata `SoftwareApplication` items with invalid `applicationCategory` | [V][T] | 1.3 |
+| F-04 | P1 | 7 of 11 project pages show the literal text `localhost:3000` | [V][T] | 1.4 |
+| F-05 | P1 | Stale number: the Tech Stack label says "10 real projects" but there are 11 (the "5 challenges" vs "7 projects" wording is a clarity point, not an error) | [V][T] | 1.5 / D-03 |
+| F-06 | P3 | All 15 sitemap `lastmod` values are identical (`2026-10-19`). `sitemap.ts` says this is deliberate (one release touched every route), so it is not a defect, but it must not become the habit | [V][O] | 3 |
+| F-07 | P2 | `/projects` ships the full project dataset (a 55.5 KB JS chunk) to the browser | [V][T] | 1.6 |
+| F-08 | P2 | 46 icon images from two third-party CDNs on the home page; 3 of the brands no longer exist in `simple-icons` | [V][T] | 2 |
+| F-09 | P2 | Thin internal linking: project pages get 2–4 inbound links; Services lists projects as plain text | [V][T] | 1.7 |
+| F-10 | P2 | No project page has a real image/screenshot (only CSS placeholders) | [V][O] | 4 |
+| F-11 | P2 | Project pages are thin (278–345 visible words each) | [V][O] | 4 |
+| F-12 | P2 | Positioning is inconsistent: "MERN Stack Developer" vs "Full-Stack Developer"; "Engineer Intern" vs "Developer Intern" | [V][O] | D-01/D-02 |
+| F-13 | P2 | Facts that disagree between sources: Services says "Android and iOS" but the project data and profile say Android only; education still flagged "current" after May 2026; CGPA 7.43 (site) vs 7.90 (GitHub profile README); name order differs on GitHub | [V][O] | D-04…D-06 |
+| F-14 | P3 | Personal email is published in JSON-LD and in `llms.txt`/`llms-full.txt` | [V][O] | D-07 |
+| F-15 | P3 | Home navigation "About" is a `#about` hash link, not the `/about` page | [V][O] | D-12 |
+| F-16 | P3 | `SoftwareApplication` markup can never qualify for the software rich result (no price/rating) | [N] | — |
+| F-17 | P3 | OG images ask for font-weight 800 but no font file is loaded, so titles render in regular weight | [V] | 5 |
+| F-18 | P3 | Tech icons use alt text such as "React.js logo" next to a visible "React.js" label (redundant for screen readers) | [V] | 5 |
+| F-19 | P3 | Same facts are typed in several places (education in `About.tsx` and `lib/profile.ts`; project names in `Services.tsx` and `ProjectsPreview.tsx`) | [V] | 5 |
+| F-20 | P3 | Favicon is a text-based SVG only; Google recommends a raster/ICO fallback of a multiple of 48 px | [N] | 5 |
+| F-21 | P3 | Static pages (`/about`, `/resume`) still download about 188 KB of gzipped JavaScript | [V] | 5 |
+| F-22 | P3 | Resume PDF is untagged (not screen-reader friendly) | [V] | 5 |
+| F-23 | P2 | Off-site: none of the 8 project repo READMEs link to the portfolio, and the GitHub profile README links to the home page but to no project page | [V][O] | see doc 06 |
+
+### F-01 · No `apple-touch-icon` link **[V][T]**
+
+* **Evidence.** `app/apple-icon.tsx` builds a valid 180×180 PNG at `/apple-icon`, but no page contains `rel="apple-touch-icon"`.
+* **Root cause.** In Next 16.2.6's `resolve-metadata.js`, file-based icons (`icon.*`, `apple-icon.*`) are merged **only if `metadata.icons` is not defined**. `app/layout.tsx` defines `icons`, so both file conventions are silently ignored.
+* **Why it matters.** Used by iOS "Add to Home Screen" and some link/bookmark UIs. It is **not** a ranking factor; it is a polish item.
+* **Fix [T].** Add one line to `icons` in `app/layout.tsx`:
+  `apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }]` → the tag appears on every page.
+
+### F-02 · Wrong `programmingLanguage` values **[V][T]**
+
+* **Evidence.** The code uses `project.tech.slice(0, 3)`. For BioMap that outputs `["Next.js 14","TypeScript","MongoDB"]`; the audit flags all **8** pages that emit `SoftwareSourceCode`.
+* **Why it matters.** schema.org defines this property as the computer language. Wrong values make the entity less trustworthy to validators and consumers of the markup. It does not produce a visible rich result.
+* **Fix [T].** Add an optional `languages?: string[]` field to each project and output it. Values below were **measured from the real repositories**:
+
+| Project slug | `languages` |
+|---|---|
+| library-inventory-system | `["TypeScript"]` |
+| biomap | `["TypeScript"]` |
+| nft-marketplace-aptos | `["TypeScript", "Move"]` |
+| moodify | `["TypeScript"]` |
+| math-genius-ai | `["TypeScript"]` |
+| meeting-insights-generator | `["JavaScript"]` |
+| rust-file-server | `["Rust"]` |
+| floris-restaurant | `["JavaScript"]` |
+| ice-saathi, ice-saathi-delivery-app, hourbit | *(no public repo — omit the field)* |
+
+### F-03 · Invalid microdata on `/projects` **[V][T]**
+
+* **Evidence.** Each of the 11 cards has `itemScope itemType="https://schema.org/SoftwareApplication"` and `itemProp="applicationCategory"` on the **badge text** (e.g. `🏆 $90 · 3rd Place`). They carry no URL and duplicate the JSON-LD `ItemList` already on the page.
+* **Fix [T].** Remove the `itemScope`/`itemType`/`itemProp` attributes from `ProjectCard`. The page keeps its JSON-LD `CollectionPage` + `ItemList`.
+
+### F-04 · `localhost:3000` shown to visitors **[V][T]**
+
+* **Evidence.** The fake browser bar on project pages without a live URL prints `localhost:3000` (7 of 11 pages).
+* **Fix [T].** Show the live URL, else the repository URL, else the page's own URL.
+
+### F-05 · Stale numbers **[V][T]/[O]**
+
+* `components/TechStack.tsx` has the hard-coded text "across **10** real projects" in an `aria-label`; the data has **11** (`STATS.total`). **[T]** fixed by using `STATS.total`.
+* `WorkHistory`, the About page and `lib/profile.ts` say you competed in **5** hackathon/bounty challenges, while `STATS.hackathon` is **7** projects. These are different quantities (competitions vs. submissions), and your GitHub profile README makes the same distinction ("5 hackathon wins & bounties" and "Hackathon & Bounty Projects (7)"), so this is **not an error**. A first-time reader could still see it as a mismatch; consider wording such as "7 projects across 5 challenges" (decision **D-03**).
+
+### F-06 · Identical sitemap dates **[V][O]**
+
+All 15 `<lastmod>` values are `2026-10-19`. A comment in `app/sitemap.ts` explains why: the last release changed metadata and semantics on every indexable route, and the file says to keep dates aligned with real changes and never stagger them just to make them differ. **I agree with that rule, so this is not a bug.**
+
+The risk is only the *habit*: Google's sitemap documentation says it uses `lastmod` only when the value is consistently and verifiably accurate **[N: re-read the current wording]**, so stamping every URL with the same date at every release would eventually make the field useless. The remedy is a **policy** (Step 3), not code. The audit reports it as a `WARN` purely so you notice if it stays identical release after release.
+
+### F-07 · Whole dataset shipped to the browser on `/projects` **[V][T]**
+
+* **Evidence.** `ProjectsClient.tsx` (a client component) imports `./data`, so a 55.5 KB chunk containing every `longDescription`, `seoDescription` and `caseStudy` is sent to `/projects` visitors (no other route loads it). The content is already in the HTML.
+* **Fix [T].** Map the data on the server in `projects/page.tsx` and pass only the card fields as a prop. Afterwards **no chunk** contains the long text.
+
+### F-08 · Third-party icon images **[V][T]**
+
+* **Evidence.** The home page loads 46 `<img>` tags (41 unique) from `cdn.jsdelivr.net` (devicon) and `cdn.simpleicons.org`.
+* **New finding.** In the current `simple-icons` package (16.35.0), **`authjs`, `assemblyai` and `openweathermap` do not exist**. `TechStack` hides any icon that fails to load (`onError → return null`), so if the CDN no longer serves them these three logos vanish silently. **[N]** Please look at the live Tech Stack section.
+* **Fix [T].** Self-host the icons (`scripts/self-host-icons.mjs`) → **0 third-party images**, 43 local SVGs, 164 KB in total.
+
+### F-09 · Internal linking **[V][T]**
+
+* Project pages link to each other only through "Previous/Next" (a chain). The **Services** section names the projects but does not link them.
+* **Fix [T].** A "Related projects" block (3 links) on every project page and links from Services to the project pages → inbound links per project page rise from **2–4 to 2–11** (HourBit stays at 2 because it is the only `personal` project; to raise it, either link it from the home "Featured projects"/Services, or change the ranking so each page also links to the least-linked project).
+
+### F-10 / F-11 · Images and content depth **[V][O]**
+
+`app/projects/[slug]/page.tsx` already supports `project.image` (rendered with `next/image` at 1200×630 and emitted as JSON-LD `image`), but **no project defines it**. Pages have 278–345 visible words. Both need *your* material (screenshots, accurate details, client approvals). Templates and a checklist are in [Part 3](#part-3).
+
+### F-12 – F-15 · Consistency and privacy **[V][O]**
+
+These are your decisions; see [Part 8](#part-8) (D-01 … D-12). I will not change claims about your experience on your behalf.
+
+### F-16 · Rich-result eligibility **[N]**
+
+Google's software-app rich result expects price information and a rating or review. A portfolio cannot honestly provide either, so these pages will not get that result no matter what. The `SoftwareApplication` markup is still useful as an accurate description of the entity; do **not** invent ratings or reviews to chase the result (it violates Google's structured-data policies).
+
+### F-17 – F-22 · Polish items **[V]**
+
+Details and fixes are in Step 5 of the runbook.
+
+### F-23 · No links from GitHub to the portfolio **[V]**
+
+I cloned all 8 public project repositories and your profile README repository. **0 of the 8 project READMEs mention `nitrajsinh-solanki.vercel.app`**; the profile README mentions it 5 times but never links a `/projects/<slug>` page. GitHub is a high-trust, frequently crawled site, so these are the cheapest high-value links you can create, and they also help visitors find the case studies. The step-by-step is in [Part 6](#part-6) §2.
+
+---
+
+## 7. Baseline metrics **[V]** (production build, home page unless stated)
+
+| Metric | Baseline |
+|---|---|
+| Static routes prerendered | 36 (15 indexable URLs + metadata/image routes) |
+| Home HTML | ≈ 347 KB raw / ≈ 56 KB gzipped, about 1,916 visible words |
+| Inline CSS (`experimental.inlineCss`) | ≈ 54 KB, repeated in every page's HTML |
+| JavaScript for `/` | ≈ 733 KB raw / ≈ 215 KB gzipped |
+| JavaScript for `/about`, `/resume` | ≈ 188 KB gzipped (static content pages) |
+| Third-party image requests on `/` | 46 (2 hosts) |
+| `/projects` extra JS chunk with full data | 55.5 KB raw |
+
+**[N] Not measured:** Core Web Vitals (LCP/INP/CLS), Lighthouse scores, field data. The sandbox has no browser or network to PageSpeed. Use the commands in [Part 5](#part-5) §6 and record real numbers **before** you change anything.
+
+---
+
+## 8. Raw audit output
+
+Produced by the audit script in Appendix A (see [Part 7](#part-7)). The complete baseline output is in Appendix C.
+
+**Baseline — pristine `main` @ `1b75d64`: 10 FAIL, 21 WARN**
+
+```text
+
+Pages built: 15 | indexable: 15 | sitemap URLs: 15
+Result: 10 FAIL, 21 WARN
+Summary by check:
+  FAIL APPLE_TOUCH_ICON         x1
+  FAIL MICRODATA_CATEGORY       x1
+  FAIL PROGRAMMING_LANGUAGE     x8
+  WARN NO_CONTENT_IMAGE         x11
+  WARN PLACEHOLDER_TEXT         x7
+  WARN SITEMAP_SAME_LASTMOD     x1
+  WARN STALE_COUNT              x1
+  WARN THIRD_PARTY_IMAGES       x1
+```
+
+**After all tested fixes: 0 FAIL, 12 WARN** (the remaining warnings need your content or dates)
+
+```text
+
+Pages built: 15 | indexable: 15 | sitemap URLs: 15
+Result: 0 FAIL, 12 WARN
+Summary by check:
+  WARN NO_CONTENT_IMAGE         x11
+  WARN SITEMAP_SAME_LASTMOD     x1
+```
+
+---
+
+## 9. What I could not verify **[N]**
+
+* Whether Google has indexed all 15 URLs, which queries you appear for, and your click/impression data (needs Search Console).
+* Real-user and lab performance numbers (needs PageSpeed Insights / Lighthouse).
+* Whether `https://cdn.simpleicons.org/authjs/…` (and the other two removed brands) currently returns an image.
+* Repository "About" fields (description, website, topics) and your GitHub/LinkedIn profile text.
+* Redirect behaviour on the live domain (trailing slash, `www`, `http`), HSTS and other headers added by Vercel.
+* Whether the `hourbit` live URL (`…/dashboard/today`) is reachable without logging in.
+
+---
+
+<a id="part-2"></a>
+
+# Part 2 — Implementation runbook
+
+Do these steps **in order**. Each step says what changes, gives the code, and tells you how to verify it. Everything marked **[T]** was applied to a scratch copy of `main`, linted, built, and checked with `scripts/seo-audit.py`.
+
+| Phase | What | Time | Needs from you |
+|---|---|---|---|
+| 0 | Prepare and record the baseline | 10 min | nothing |
+| 1 | Make the seven tested code edits (7 files) | 20–30 min | nothing |
+| 2 | Self-host the tech icons | 20 min | a look at 3 logos |
+| 3 | Sitemap `lastmod` policy | 10 min, then ongoing | honesty about dates |
+| 4 | Content and images | hours–days | screenshots, facts, approvals |
+| 5 | Optional polish | 1–2 h | choices |
+| 6 | Put the audit in CI | 5 min | nothing |
+| 7 | Deploy and verify on the live site | 30 min | Search Console access |
+
+> **Do in parallel (no code):** the off-site work in [Part 6](#part-6) — especially adding links from each GitHub repo README to its project page (F-23) — and your answers to [Part 8](#part-8).
+
+---
+
+## Phase 0 · Prepare
+
+```bash
+git checkout main && git pull
+git checkout -b seo/quick-wins
+cd nitrajsinh-solanki
+npm ci
+mkdir -p scripts
+#   save Appendix A of this file as  scripts/seo-audit.py
+#   save Appendix B of this file as  scripts/self-host-icons.mjs   (only needed in Phase 2)
+npm run build                                      # baseline build
+python3 scripts/seo-audit.py                       # expect: 10 FAIL, 21 WARN
+```
+
+> **If your local build cannot download Google Fonts**, the build fails before it starts. That is a network problem, not a code problem; Vercel and GitHub Actions can fetch them.
+
+Record the numbers (and, if you can, a PageSpeed Insights run of `/` and one project page) so you can show a before/after.
+
+**Branch/CI/deploy behaviour to expect:** `vercel.json` disables deployments for every branch except `main`, so none of these branches create a preview site. The GitHub workflow *Portfolio validation* runs lint and build on pull requests to `main` that touch `nitrajsinh-solanki/**`.
+
+---
+
+## Phase 1 · Make seven small code edits (all tested)
+
+Seven files change (about 80 lines added, 50 removed). Each edit below shows the exact code. Do them in any order, then run Phase 1.8. Everything here was applied to a scratch copy of `main`, linted, built and audited with the result **0 FAIL**.
+
+### 1.1 Link the Apple icon (F-01) **[T]** — `app/layout.tsx`
+
+Add one line to the existing `icons` object:
+
+```ts
+icons: {
+  icon: [{ url: "/icon.svg?v=3", type: "image/svg+xml", sizes: "any" }],
+  shortcut: [{ url: "/icon.svg?v=3", type: "image/svg+xml" }],
+  apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],   // ← new
+},
+```
+
+*Why it is needed:* when `metadata.icons` exists, Next ignores `app/apple-icon.tsx` (and `app/icon.svg`) entirely. *Verify:* the built `index.html` contains `<link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" type="image/png"/>`.
+
+### 1.2 Correct `programmingLanguage` (F-02) **[T]** — `app/projects/data.ts` and `app/projects/[slug]/page.tsx`
+
+1. In the `Project` interface add:
+
+```ts
+/** Real programming languages of the public repo (schema.org programmingLanguage). Omit when there is no repo. */
+languages?: string[];
+```
+
+2. Add a `languages` line to each project that has a public repo (values were measured from the repos):
+
+| slug | add |
+|---|---|
+| `library-inventory-system` | `languages: ["TypeScript"],` |
+| `biomap` | `languages: ["TypeScript"],` |
+| `nft-marketplace-aptos` | `languages: ["TypeScript", "Move"],` |
+| `moodify` | `languages: ["TypeScript"],` |
+| `math-genius-ai` | `languages: ["TypeScript"],` |
+| `meeting-insights-generator` | `languages: ["JavaScript"],` |
+| `rust-file-server` | `languages: ["Rust"],` |
+| `floris-restaurant` | `languages: ["JavaScript"],` |
+
+3. In `app/projects/[slug]/page.tsx` replace
+
+```ts
+programmingLanguage: project.tech.slice(0, 3),
+```
+with
+```ts
+programmingLanguage: project.languages,
+```
+
+*Maintenance rule:* when you add a new project with a repo, add its `languages` too (the audit fails if a non-language such as "Next.js" or "MongoDB" slips in). *Verify:* `audit` code `PROGRAMMING_LANGUAGE` disappears.
+
+### 1.3 Remove the invalid microdata (F-03) **[T]** — `app/projects/ProjectsClient.tsx`
+
+Delete these attributes from `ProjectCard` (the JSON-LD `CollectionPage`/`ItemList` on the page stays):
+
+* on `<article>`: `itemScope` and `itemType="https://schema.org/SoftwareApplication"`
+* on the badge `<span>`: `itemProp="applicationCategory"`
+* on the `<h2>`: `itemProp="name"`
+* on the description `<p>`: `itemProp="description"`
+
+*Verify:* React writes this attribute in camelCase, so count it case-sensitively: `grep -o 'itemScope' .next/server/app/projects.html | wc -l` → `0` (it is `11` before the fix). A lower-case `grep itemscope` would wrongly print `0` even before the fix. The audit code `MICRODATA_CATEGORY` disappears too.
+
+### 1.4 Remove the `localhost:3000` text (F-04) **[T]** — `app/projects/[slug]/page.tsx`
+
+Add next to the other derived values:
+
+```ts
+const displayUrl = (live ?? repoUrl ?? abs(path)).replace(/^https?:\/\//, "");
+```
+
+and use it in the fake browser bar instead of the two `… ?? "localhost:3000"` expressions:
+
+```tsx
+<span className="block min-w-0 max-w-full truncate font-mono text-[9px] opacity-70"
+      style={{ color: project.accentColor }} title={displayUrl}>
+  {displayUrl}
+</span>
+```
+
+*Verify:* `grep -l "localhost:3000" .next/server/app/projects/*.html` prints nothing.
+
+### 1.5 Fix the stale "10 projects" label (F-05) **[T]** — `app/components/TechStack.tsx`
+
+```tsx
+// before
+aria-label="Nitrajsinh Solanki tech stack — all technologies used across 10 real projects including hackathons, client work and internship"
+// after (STATS is already imported in this file)
+aria-label={`Nitrajsinh Solanki tech stack — all technologies used across ${STATS.total} real projects including hackathons, client work and internship`}
+```
+
+The "5 challenges" vs "7 projects" wording is **not** touched by the patch: they are different counts (competitions vs submissions) and both appear to be correct; see decision **D-03** if you want it phrased more clearly.
+
+### 1.6 Stop shipping the whole dataset to `/projects` (F-07) **[T]** — `app/projects/page.tsx`, `app/projects/ProjectsClient.tsx`
+
+`page.tsx` (a server component) now builds the small card objects and passes them down:
+
+```tsx
+import { PROJECTS, STATS } from "./data";
+import ProjectsClient, { type Project } from "./ProjectsClient";
+// …metadata unchanged…
+export default function ProjectsPage() {
+  // Map on the server so only the fields the cards need are sent to the browser.
+  const projects: Project[] = PROJECTS.map((p) => ({
+    id: p.id, slug: p.slug, title: p.title, shortTitle: p.shortTitle, category: p.category,
+    badge: p.badge, badgeColor: p.badgeColor, description: p.description, tech: p.tech,
+    github: p.links.find((l) => l.icon === "github")?.href,
+    live: p.links.find((l) => l.icon === "live")?.href,
+    demo: p.links.find((l) => l.icon === "demo")?.href,
+    gradientFrom: p.gradientFrom, gradientTo: p.gradientTo, accentColor: p.accentColor, iconPath: p.iconPath,
+  }));
+  return <ProjectsClient projects={projects} />;
+}
+```
+
+In `ProjectsClient.tsx`: delete `import { PROJECTS as SOURCE } from "./data";`, delete the module-level `const PROJECTS: Project[] = SOURCE.map(…)`, and change the component signature (the alias keeps every existing reference working):
+
+```tsx
+export default function ProjectsClient({ projects: PROJECTS }: { projects: Project[] }) {
+```
+
+*Verify:* search the client chunks for a long sentence from `data.ts` — it must not be found:
+
+```bash
+grep -l "Book cover images are stored on Supabase" .next/static/chunks/*.js   # prints nothing
+```
+
+### 1.7 Internal links between project pages and from Services (F-09) **[T]**
+
+**a) "Related projects" block** — `app/projects/[slug]/page.tsx`. Add after `nextProject`:
+
+```ts
+// Up to 3 related projects: same category first, then shared technologies (deterministic order).
+const related = PROJECTS
+  .filter((p) => p.slug !== project.slug)
+  .map((p) => ({ p, score: (p.category === project.category ? 2 : 0) + p.tech.filter((t) => project.tech.includes(t)).length }))
+  .sort((a, b) => b.score - a.score || Number(a.p.id) - Number(b.p.id))
+  .slice(0, 3)
+  .map(({ p }) => p);
+```
+
+and render it directly above the existing `{/* ── Prev / Next navigation ── */}` block:
+
+```tsx
+{related.length > 0 && (
+  <section aria-labelledby="related-projects" className="mt-10 border-t border-[#E3E0D8] pt-6 sm:mt-16 sm:pt-8">
+    <h2 id="related-projects" className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#686D76]">
+      Related projects
+    </h2>
+    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
+      {related.map((r) => (
+        <li key={r.slug}>
+          <Link href={`/projects/${r.slug}`}
+                className="block h-full rounded-lg border border-[#E3E0D8] bg-white p-4 transition-colors hover:border-[#4F46E5]">
+            <span className="block text-sm font-semibold text-[#17191D]">{r.shortTitle}</span>
+            <span className="mt-1 block text-[12.5px] leading-snug text-[#555963]">{r.badge}</span>
+          </Link>
+        </li>
+      ))}
+    </ul>
+  </section>
+)}
+```
+
+> **Gotcha I hit while testing:** the line `const path = "/projects/" + project.slug;` appears **twice** in this file (once in `generateMetadata`, once in the page component). Put `related` in the **page component**, otherwise the build fails with `Cannot find name 'related'`.
+
+**b) Link the project names in Services** — `app/components/Services.tsx`. Add `import Link from "next/link";`, give every `projects` entry a `slug` (`library-inventory-system`, `biomap`, `moodify`, `floris-restaurant`, `ice-saathi`, `ice-saathi-delivery-app` for "Aman Sales Delivery App", `nft-marketplace-aptos`, `math-genius-ai`, `meeting-insights-generator`, `rust-file-server`), and replace the name `<span>` with:
+
+```tsx
+<Link href={`/projects/${project.slug}`}
+      className="min-w-0 break-words text-[12.5px] leading-snug underline-offset-2 hover:underline"
+      style={{ color: "#555963" }}>
+  {project.name}
+</Link>
+```
+
+### 1.8 Verify Phase 1
+
+```bash
+cd nitrajsinh-solanki
+npm run lint
+npm run build
+python3 scripts/seo-audit.py
+```
+
+**Expected:** `0 FAIL`, `13 WARN` = `NO_CONTENT_IMAGE ×11` + `SITEMAP_SAME_LASTMOD ×1` + `THIRD_PARTY_IMAGES ×1`. Those three groups are handled by Phases 4, 3 and 2.
+
+Then open `npm run dev` and eyeball: a project page (related block, URL bar text), `/projects` (filter buttons still work), the home Services section (names are links). Commit:
+
+```bash
+git add -A && git commit -m "SEO: link apple icon, fix JSON-LD languages, remove invalid microdata and placeholder text, trim /projects bundle, add related-project links"
+```
+
+---
+
+## Phase 2 · Self-host the tech icons (F-08) **[T]**
+
+**Why:** removes 46 requests to two third-party hosts from the home page (faster, more reliable, no third-party requests). The script also reveals that three brands no longer exist in the current `simple-icons` release.
+
+```bash
+cd nitrajsinh-solanki
+npm i -D devicon@2.17.0 simple-icons          # temporary: only needed to copy the SVGs
+```
+
+**2.1 Point the helpers at local files** — `app/components/TechStack.tsx`:
+
+```ts
+// before
+const DI = (name: string, variant = "original") =>
+  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${name}/${name}-${variant}.svg`;
+const SI = (slug: string, hex = "ffffff") =>
+  `https://cdn.simpleicons.org/${slug}/${hex}`;
+
+// after
+const DI = (name: string, variant = "original") => `/tech-icons/${name}-${variant}.svg`;
+const SI = (slug: string, hex = "ffffff") => `/tech-icons/si-${slug}-${hex.toLowerCase()}.svg`;
+```
+
+**2.2 Decide what to do with the three removed brands.** In the `SKILLS` array these entries use icons that no longer exist in `simple-icons`:
+
+| Skill | Current icon call | Options |
+|---|---|---|
+| NextAuth | `SI("authjs","17191D")` | (a) delete the `icon:` property (the card then shows the name only), **or** (b) keep the call and add your own `public/tech-icons/si-authjs-17191d.svg` |
+| AssemblyAI | `SI("assemblyai","17191D")` | same |
+| OpenWeather API | `SI("openweathermap","E96E50")` | same |
+
+The component already tolerates a missing icon (`icon?: string`). This is what I tested (option a):
+
+```ts
+// remove only the `icon: …` part of these three entries, e.g.
+{ name: "NextAuth", cat: "Auth & Security", projects: 1 },
+```
+
+Option (b) is also supported: the script treats a file you placed in `public/tech-icons/` as "found". Do not use a logo you have no right to use.
+
+**2.3 Run the script** (it reads `TechStack.tsx`, so run it *after* 2.1–2.2):
+
+```bash
+node scripts/self-host-icons.mjs
+# expected: devicon: 20 unique | simple-icons: 18 unique | written: 38 -> public/tech-icons/
+#           All icons found.
+```
+
+(If you took option (a), the numbers are as above: 38 files, ≈164 KB.) The script exits with code 1 and lists anything it cannot find.
+
+**2.4 Clean up and verify**
+
+```bash
+npm uninstall devicon simple-icons            # keep package.json lean; SVGs are now committed
+npm run build && python3 scripts/seo-audit.py
+# THIRD_PARTY_IMAGES must be gone → 0 FAIL, 12 WARN
+git add public/tech-icons app/components/TechStack.tsx package.json package-lock.json
+git commit -m "Self-host tech-stack icons"
+```
+
+Open the Tech Stack section in `npm run dev` and confirm every logo renders, including dark mode. (Black logos use a baked-in dark fill; `iconFilter="invert(1)"` entries in the data still apply.)
+
+---
+
+## Phase 3 · Sitemap `lastmod` policy (F-06)
+
+**Situation:** all 15 URLs say `2026-10-19`. `app/sitemap.ts` explains this is intentional (the last release touched every route) and tells you to keep dates aligned with real changes. That is the right rule; this phase just makes it explicit so future releases do not stamp every URL. Google says it relies on `lastmod` only if it is consistently accurate **[N: re-read the current wording in Google's sitemap documentation]**.
+
+**Rule — a page's date changes only when its *content* changes:**
+
+| Change | Bump `lastmod`? |
+|---|---|
+| New/rewritten copy, new screenshots, changed facts, new links that matter | **Yes** |
+| Structured-data change that alters meaning (new `image`, corrected languages) | **Yes** |
+| CSS/layout only, typo fix, dependency bump, comment change | **No** |
+
+**How:** the four top-level pages live in the `PAGE_UPDATED` record at the top of `app/sitemap.ts` (`"/"`, `"/about"`, `"/projects"`, `"/resume"`); each project page uses `updated: "YYYY-MM-DD"` in `app/projects/data.ts`. Use the **real** date the content changed, not the date you happen to be editing. Do not auto-generate dates at build time (every deploy would stamp every URL, which is exactly the signal Google discounts). Do not use git history on Vercel (clones can be shallow) **[N]**.
+
+**Applying it to this work:** Phase 1 changes the visible content of the 11 project pages (related links, URL bar), `/projects` (markup) and `/` (Services links), and adds an icon link site-wide. If you consider that a real change on every route, keeping a single shared date is correct. If you consider `/about` and `/resume` unchanged, leave their old date. Either choice is fine; just do not invent differences. The audit prints `SITEMAP_SAME_LASTMOD` as a `WARN` while the dates are equal — expected, and not a reason to change them.
+
+---
+
+## Phase 4 · Content and images (F-10, F-11)
+
+This is where most future ranking and click-through value comes from, and it needs *your* material. Follow [Part 3](#part-3). The code is already in place:
+
+```ts
+// app/projects/data.ts — add to a project once you have a real screenshot
+image: "/projects/biomap-home.webp",
+```
+
+The project template then renders it with `next/image` (1200×630, `alt="<title> screenshot"`) **and** emits it as JSON-LD `image`. After adding images the audit's `NO_CONTENT_IMAGE` warning disappears for that page.
+
+---
+
+## Phase 5 · Optional polish (F-17 … F-22) — *not built or tested; apply only if you want them*
+
+| Item | What to do | Effort |
+|---|---|---|
+| F-18 redundant icon alt | In `TechStack.tsx`, set `alt=""` on the logo `<img>` (the visible label already names the tool); keep `aria-hidden`/no extra text | 5 min |
+| F-17 OG title weight | Load a bold font file for `ImageResponse`: Next's `opengraph-image` docs show `readFile(join(process.cwd(), 'assets/Font.ttf'))` passed as `fonts: [{ name, data, style: 'normal', weight: 800 }]`. Use a font whose licence allows embedding (Syne is on Google Fonts under the OFL) | 30 min |
+| F-20 favicon fallback | Export `app/icon.svg` to 48×48 and 192×192 PNG, put them in `public/`, and add them to `metadata.icons.icon` next to the SVG; then check Google's current favicon guidelines **[N]** | 20 min |
+| F-19 single source of truth | Stop retyping facts: have `About.tsx` read education from `lib/profile.ts`; derive the Services project list from `PROJECTS` (title/slug/badge) | 1–2 h |
+| F-21 JS weight | Inspect with Next's bundle analyzer (see [Part 5](#part-5) §5) before changing anything | 1 h |
+| F-22 resume PDF | Re-export the PDF as a **tagged** PDF (e.g. Word → *Save as PDF → Document structure tags for accessibility*), keep the same file name/URL, confirm with `pdfinfo` → `Tagged: yes` | 15 min |
+
+---
+
+## Phase 6 · Run the audit in CI
+
+Add one step to `.github/workflows/portfolio-validation.yml` **after** "Build production app" (the job already runs from `nitrajsinh-solanki/`):
+
+```yaml
+      - name: SEO audit (post-build)
+        run: python3 scripts/seo-audit.py
+```
+
+* It fails the pull request on any `FAIL`; `WARN`s are informational.
+* Do **not** add `--strict` until the three warning groups (images, lastmod, third-party) are cleared, otherwise every PR fails.
+* `python3` is preinstalled on `ubuntu-latest`; the script needs no packages.
+
+---
+
+## Phase 7 · Deploy and verify on the live site **[N]**
+
+After merging to `main`, wait for the Vercel deployment, then:
+
+```bash
+SITE=https://nitrajsinh-solanki.vercel.app
+curl -s $SITE | grep -o '<link[^>]*apple-touch-icon[^>]*>'      # tag is present
+curl -s $SITE/sitemap.xml | head -30                              # URLs + lastmod
+curl -s $SITE/robots.txt
+curl -sI $SITE/about/ | grep -iE '^HTTP|^location'                # trailing slash should 308 → /about
+curl -s $SITE/projects/biomap | grep -o 'programmingLanguage[^]]*]'
+```
+
+Then in Google Search Console: **URL Inspection → Test live URL → Request indexing** for `/`, `/projects`, and one changed project page; re-submit `sitemap.xml`. Test one project URL in the Rich Results Test and the Schema Markup Validator. Details in [Part 7](#part-7).
+
+---
+
+## Rollback
+
+Every change is confined to the seven patched files plus `public/tech-icons/`. To undo: revert the pull request (`git revert -m 1 <merge-commit>`); nothing else (database, environment variables, DNS) is touched by Phases 1–3 and 6.
+
+---
+
+<a id="part-3"></a>
+
+# Part 3 — On-page SEO and content
+
+This is the part where *your* knowledge matters most. The code can already express good SEO; what the site now needs is **specific, truthful, well-presented content**.
+
+> **Ground rules (from your own theme plan):** do not change claims about your experience, awards or clients without your approval; do not hide content; do not add fake reviews, ratings or testimonials. Everything below respects that.
+
+---
+
+## 1. What to realistically aim for
+
+A personal portfolio has three SEO jobs, in this order of difficulty:
+
+1. **Own your name.** Searching "Nitrajsinh Solanki" should return the portfolio first, with a clean title, snippet and sitelinks. This is the easiest and the most valuable. **[N]** Check how it looks today (see [Part 7](#part-7) §1).
+2. **Be credible to a reader who lands from a CV, LinkedIn or a recruiter's link.** That is mostly content depth, screenshots, working links and consistent facts.
+3. **Appear for long-tail project/technology queries** (for example the specific thing a project does). Plausible for distinctive projects; slow and uncertain.
+
+Ranking for generic, competitive terms such as "full stack developer" is not a realistic short-term goal for any personal site, so do not size your effort around it **[N]**. I have no keyword-volume data and I will not invent any: after 4–8 weeks, Search Console → *Performance → Queries* shows the real queries; adjust then.
+
+## 2. Query-intent map (hypotheses to validate)
+
+| Intent | Example queries | Best target page | Status today |
+|---|---|---|---|
+| Name / brand | "Nitrajsinh Solanki", "Nitrajsinh Solanki portfolio", "… developer" | `/` (and `/about`) | Title/H1/JSON-LD all carry the exact name **[V]** |
+| Role + place | "full-stack developer Gujarat", "…India" | `/`, `/about` | Present in titles and meta **[V]**; competitive **[N]** |
+| Resume | "Nitrajsinh Solanki resume" | `/resume` | Page + PDF exist **[V]** |
+| Specific project | "Aptos NFT marketplace", "Rust file server", "AI music streaming app", "library inventory system Next.js" | `/projects/<slug>` | Pages exist, thin (278–345 words) **[V]** |
+| Client work | "Floris restaurant banquet website", "Ice Saathi Aman Sales" | the matching project page | Pages exist **[V]** |
+| Skills + proof | "Next.js MongoDB project", "Flutter delivery partner app" | project pages, home tech stack | Mentioned in copy **[V]** |
+
+Treat this table as a hypothesis list. Delete rows Search Console never shows; add rows it does.
+
+## 3. Titles and descriptions
+
+Current titles are 44–60 characters and descriptions 136–152 characters, all unique **[V]** (table in [Part 1](#part-1) §5.1). They are already good; the aim is **not to churn them**.
+
+Formulas to reuse when you add projects:
+
+| Element | Formula | Limits |
+|---|---|---|
+| Title (project) | `<Project name> — <what it is> \| Nitrajsinh Solanki` | ≤ 60 characters; name first |
+| Description | `<What it is> for <who>. Built with <2–3 key techs>. <One real outcome: award, users, live URL>.` | 120–155 characters; a complete sentence; no trailing "…" |
+| Title (page) | `<Page topic> — <short qualifier> \| Nitrajsinh Solanki` | ≤ 60 |
+
+Rules: every title and description unique; no keyword lists; no claims you cannot back up; if a project has an award, say it exactly as on the badge. The audit fails on duplicates, missing values and trailing ellipses and warns on lengths.
+
+**Two titles sit exactly at 60 characters** (`/about`, `/projects/hourbit`). If you edit them, do not make them longer.
+
+## 4. Headings
+
+* Exactly one `<h1>` per page (the audit enforces it); no skipped levels (warns).
+* Home `<h1>` is the person's name — correct for an entity page. The role phrase belongs in the visible hero label and first paragraph; make that label match the title (see §8).
+* `/projects` `<h1>` is "My Work & Projects". Optional improvement **[O]**: "Projects by Nitrajsinh Solanki" (adds the name; same meaning).
+* Headings should describe the section's content ("Case study: how roles are enforced"), not repeat keywords.
+
+## 5. Project pages — the biggest content lever
+
+Each project page has about 280–345 visible words. That is enough to exist, not enough to be the best answer for a project-specific query. Aim for **600–900 words of original, specific content** on your strongest pages first (awards or live clients: Library Inventory System, BioMap, Ice Saathi), then the rest.
+
+### 5.1 Template
+
+| Section | What to write | Where it goes in the code |
+|---|---|---|
+| Summary | What it is, who it is for, outcome, in 2–3 sentences | `description` / `longDescription` |
+| Screenshots | 1–3 real screens with captions | `image` (see §6) |
+| Problem | The real constraint or user need | `caseStudy.challenge` |
+| Approach | The decision path: why this architecture/library over alternatives | `caseStudy.approach` |
+| My contribution | Exactly what *you* built (solo vs team) | `caseStudy.contribution` |
+| One hard problem | A concrete technical story with a detail only the builder would know | extend `longDescription` or `caseStudy.approach` |
+| Result | Real numbers only: prize, users, endpoints, response times | `caseStudy.outcome` |
+| What I would improve | Honest limitation and next step | new optional field (add to `Project` + template) |
+| Links | Live demo, repository | `links` |
+
+The existing `caseStudy` object (challenge / approach / contribution / outcome) already maps to four of these headings; the work is to make each answer **specific** instead of general.
+
+### 5.2 Quality bar
+
+* Only facts you can verify. If a number is an estimate, say so.
+* Explain *why*, not only *what* ("JWT in an httpOnly cookie because…").
+* No text written to repeat keywords; no AI-generated filler; write like you would explain it to an interviewer.
+* Client work: confirm you may show names, screenshots and metrics before publishing.
+
+## 6. Images
+
+The template already renders `project.image` with `next/image` at 1200×630 and `alt="<title> screenshot"`, and adds it to JSON-LD **[V]**. No project sets it yet.
+
+| Topic | Guidance |
+|---|---|
+| Content | Real screenshots (or a short composite) of the working product; avoid mock-ups that are not the real UI |
+| Format and weight | WebP at the 1200×630 ratio the template renders (or a larger image with the same ratio), ideally ≤ 150 KB |
+| Location and naming | `public/projects/<slug>-<screen>.webp`, e.g. `biomap-explorer.webp` (descriptive, lower-case, hyphens) |
+| Alt text | Describe what is visible and useful, ≤ 125 characters: `BioMap explorer showing six scientific data layers on a world map` — no "image of", no keyword lists |
+| Conversion | `cwebp -q 80 input.png -o public/projects/biomap-explorer.webp` (from the `webp` package) or use Squoosh |
+| Hook-up | In `app/projects/data.ts`: `image: "/projects/biomap-explorer.webp",` |
+| Several screens per project | Needs a small template extension (`images?: {src, alt, caption}[]`); worthwhile once you have more than one good screenshot |
+
+Do not put text that matters only inside an image. Do not hot-link images from other sites (the page would depend on them).
+
+## 7. Internal linking
+
+Current structure **[V]**: every page links to the four top-level pages; the home links to 3 featured projects; `/projects` links to all 11; project pages link only to the previous/next project.
+
+After the Phase 1 patch **[T]** each project page has a "Related projects" block and the Services section links its projects, raising inbound links per project page from 2–4 to 2–11 (full table in [Part 1](#part-1) §5.3).
+
+Next improvements, in order of value:
+
+1. Link projects **from the text where you mention them** (About, Work History, the home Services text) with descriptive anchors ("the BioMap scientific explorer"), not "click here".
+2. Make sure **every** project is linked from at least three pages. HourBit is the weakest (2): feature it on the home, or add it to the Services list if it fits.
+3. Keep the breadcrumb trail (Home → Projects → Project) — it exists in markup and JSON-LD **[V]**.
+4. If you add writing later, link each article to the project it explains and back.
+
+Home navigation currently points "About" at the `#about` section instead of the `/about` page; see decision **D-12**.
+
+## 8. One consistent identity (entity SEO)
+
+Search engines connect your pages, GitHub, LinkedIn and resume by repeated, identical facts. Today **[V]** the site uses several variants:
+
+| Fact | Variants found |
+|---|---|
+| Role label | Hero shows **"MERN Stack Developer"**; titles, OG image, JSON-LD, meta and the resume PDF all use **"Full-Stack Developer"** (the PDF lists MERN as a *skill*: "Full-Stack Developer (MERN, Next.js, Flutter, Angular, .NET)") |
+| Internship title | **"Full Stack Engineer Intern"** (`lib/profile.ts` → JSON-LD) vs **"Full Stack Developer Intern"** (About page) |
+| Hackathons | "5 hackathon/bounty challenges" (Work History, About, profile) and "7 hackathon projects" (`STATS`) — different counts and both correct, but easy to misread (D-03) |
+| Projects | "10 real projects" label (fixed by the patch) vs 11 |
+| CGPA | **7.43** on the site (`About.tsx`, `lib/profile.ts`) vs **7.90** in the GitHub profile README (D-06) |
+| Name | "Nitrajsinh Solanki" on the site vs "Solanki Nitrajsinh Rajusinh" in the GitHub profile README (D-06) |
+| Education status | `current: true` and "Graduating May 2026" although May 2026 has passed (D-05) |
+
+Pick one answer per row (decisions D-01 … D-06), then keep it in **one** place and import it everywhere. Suggested `lib/identity.ts`:
+
+```ts
+// lib/identity.ts — the single source for how you describe yourself
+export const IDENTITY = {
+  name: "Nitrajsinh Solanki",
+  role: "Full-Stack Developer",          // ← your decision D-01
+  internTitle: "Full Stack Developer Intern", // ← your decision D-02
+  location: "Gujarat, India",
+} as const;
+```
+
+Then use `IDENTITY.role` in `Hero.tsx`, `lib/seo.ts`, `lib/profile.ts` and the OG images. (`Hero.tsx` currently imports only `STATS`, not `lib/profile`; a tiny constants file like this adds no meaningful weight.) Keep the same wording on GitHub, LinkedIn, the resume header and conference/hackathon profiles.
+
+## 9. Optional new content (only if genuinely useful)
+
+In priority order:
+
+1. **Deepen three project pages** (§5) — highest return.
+2. **Two to four technical write-ups** based on real work (for example how role-based access was built across 3 roles in the library system; lessons from the Rust file server). Publish on your own site under a `/writing` route so the authority accrues to your domain, or on dev.to/Hashnode with a `rel=canonical` pointing back to you. Each must teach something; thin posts hurt more than none.
+3. **A short "Now / Currently building" note** on `/about` that you update when it changes (also gives you an honest reason to update `lastmod`).
+
+**Do not:** create city/keyword "doorway" pages; add FAQ markup (Google restricts that rich result to a few site types **[N: confirm current rules]**); invent testimonials, ratings or review markup; buy links or use link exchanges; copy text from other sites.
+
+## 10. Copy checklist before every release
+
+* [ ] Role label, intern title, counts and dates match the identity decisions
+* [ ] Every claim has evidence on the page or in a linked repo
+* [ ] Title ≤ 60, description 120–155, both unique
+* [ ] One `<h1>`; no skipped heading levels
+* [ ] Every image has meaningful alt text (or `alt=""` if purely decorative)
+* [ ] Links open the intended page (live demos work **today**)
+* [ ] `python3 scripts/seo-audit.py` shows 0 FAIL
+
+---
+
+<a id="part-4"></a>
+
+# Part 4 — Structured data (JSON-LD)
+
+Structured data does **not** raise rankings by itself. Its job is to state facts about you and your projects unambiguously so search engines (and other consumers of the markup) connect the pages, the person and the repositories correctly. Wrong markup is worse than none, which is why the fixes here are mostly corrections.
+
+---
+
+## 1. What is emitted today **[V]**
+
+| Page | JSON-LD `@type`s |
+|---|---|
+| `/` | `WebSite`, `Person` |
+| `/about` | `ProfilePage`, `Person`, `BreadcrumbList` |
+| `/projects` | `CollectionPage` (with `ItemList` of the 11 projects), `BreadcrumbList` |
+| `/resume` | `BreadcrumbList` |
+| `/projects/<slug>` (8 with a public repo) | `SoftwareApplication`, `SoftwareSourceCode`, `BreadcrumbList` |
+| `/projects/<slug>` (3 without a public repo: `ice-saathi`, `ice-saathi-delivery-app`, `hourbit`) | `SoftwareApplication`, `BreadcrumbList` |
+
+All nodes use stable absolute `@id`s (for example the person is `https://nitrajsinh-solanki.vercel.app/#person`) and the software nodes point back to that same person as `author`. Markup is produced by `lib/schema.ts` (helpers such as `breadcrumb()`), `lib/profile.ts` (the person data) and the page files, and rendered by `app/components/JsonLd.tsx`.
+
+The `Person` node currently contains: `name`, `givenName`, `familyName`, `url`, `image`, `email`, `description`, `jobTitle` ("Full Stack Engineer Intern"), `worksFor` (an `Organization` with only a `name`: "VeloxCore Private Limited"), `alumniOf`, `address`, `knowsAbout`, `award`, and `sameAs` (GitHub, LinkedIn, X, Medium).
+
+## 2. Principles
+
+1. **Describe what is visible.** Every property must be true and match the page's visible content.
+2. **One entity, one `@id`.** Reference it from other nodes instead of copying it.
+3. **Absolute URLs everywhere**, on the canonical host.
+4. **No self-awarded ratings or reviews.** Do not add `aggregateRating`, `Review` or testimonials about yourself; that violates Google's structured-data policies **[N: confirm wording]**.
+5. **Prefer JSON-LD** (what you already use) over microdata. Mixing both for the same thing creates conflicts, which is exactly what happened on `/projects` (F-03).
+6. **Keep the data in one place** (`data.ts`, `profile.ts`) so markup and visible text cannot drift.
+
+## 3. Review by type
+
+| Type | Status | Action |
+|---|---|---|
+| `WebSite` (home) | Good **[V]** | Nothing. A `SearchAction` is pointless (the site has no search) and Google has been retiring the sitelinks search box **[N: verify]**. |
+| `Person` | Good, with two decisions | (a) **`email`** is published in the markup (D-07); (b) **`jobTitle`** says "Engineer Intern" while the About page says "Developer Intern" (D-02). Optionally add a `url` to `worksFor` **only if** the company site is public and you are happy to link it. |
+| `ProfilePage` (`/about`) | Fine **[V]** | Harmless; Google's profile-page feature targets creator profiles, so do not expect a visible result **[N]**. |
+| `CollectionPage` + `ItemList` (`/projects`) | Good **[V]** | Keep; the invalid microdata duplicate is removed by the Phase 1 patch **[T]**. |
+| `SoftwareApplication` | Valid entity, not rich-result eligible **[N]** | Keep as an entity description. Optional additions (not built or tested): `operatingSystem` (`"Web"` or `"Android"`), `dateModified: project.updated`. See D-13 for the HourBit `url`. |
+| `SoftwareSourceCode` | **Wrong `programmingLanguage` (F-02)** | Fixed by Phase 1.2 **[T]**. Optional (not tested): `targetProduct: { "@id": abs(path + "#app") }` to link code to its application. |
+| `BreadcrumbList` | Good **[V]** | Positions are sequential (the audit checks it). |
+
+Why `SoftwareApplication` cannot get a rich result: Google's software-app feature expects price information and a rating or review. You cannot honestly supply those for a portfolio piece, so do not try. Keep the markup accurate and move on.
+
+## 4. What a project page emits after the fix **[T]**
+
+Real output of the fixed build for `/projects/biomap` (abridged only by the line wrapping of the tool):
+
+```json
+[
+  {
+    "@context": "https://schema.org",
+    "@graph": [
+      {
+        "@type": "SoftwareApplication",
+        "@id": "https://nitrajsinh-solanki.vercel.app/projects/biomap#app",
+        "name": "BioMap — Scientific Explorer Platform",
+        "description": "Scientific web app unifying biodiversity maps, chemistry data, NASA space media, environmental monitoring, and educational resources — powered by 6 major public APIs.",
+        "url": "https://biomap-nitrajsinh-solankis-projects.vercel.app",
+        "mainEntityOfPage": "https://nitrajsinh-solanki.vercel.app/projects/biomap",
+        "applicationCategory": "WebApplication",
+        "author": {
+          "@type": "Person",
+          "@id": "https://nitrajsinh-solanki.vercel.app/#person",
+          "name": "Nitrajsinh Solanki",
+          "url": "https://nitrajsinh-solanki.vercel.app"
+        },
+        "keywords": "Next.js 14, TypeScript, MongoDB, Tailwind CSS, Leaflet, OpenStreetMap, GBIF API, PubChem API, NASA Images API, iNaturalist API, Wikipedia API, JWT",
+        "award": "$70 4th Place, StackUp May 2025 Challenge"
+      },
+      {
+        "@type": "SoftwareSourceCode",
+        "name": "BioMap — Scientific Explorer Platform (source code)",
+        "codeRepository": "https://github.com/Nitrajsinh-Solanki/biomap",
+        "programmingLanguage": [
+          "TypeScript"
+        ],
+        "author": {
+          "@type": "Person",
+          "@id": "https://nitrajsinh-solanki.vercel.app/#person",
+          "name": "Nitrajsinh Solanki",
+          "url": "https://nitrajsinh-solanki.vercel.app"
+        }
+      }
+    ]
+  },
+  {
+    "@context": "https://schema.org",
+    "@type": "BreadcrumbList",
+    "itemListElement": [
+      {
+        "@type": "ListItem",
+        "position": 1,
+        "name": "Home",
+        "item": "https://nitrajsinh-solanki.vercel.app/"
+      },
+      {
+        "@type": "ListItem",
+        "position": 2,
+        "name": "Projects",
+        "item": "https://nitrajsinh-solanki.vercel.app/projects"
+      },
+      {
+        "@type": "ListItem",
+        "position": 3,
+        "name": "BioMap — Scientific Explorer Platform",
+        "item": "https://nitrajsinh-solanki.vercel.app/projects/biomap"
+      }
+    ]
+  }
+]```
+
+Note `programmingLanguage` is now `["TypeScript"]`, taken from the project's `languages` field instead of the first three tech tags.
+
+The person node, with the email redacted here:
+
+```json
+{
+  "@type": "Person",
+  "@id": "https://nitrajsinh-solanki.vercel.app/#person",
+  "name": "Nitrajsinh Solanki",
+  "givenName": "Nitrajsinh",
+  "familyName": "Solanki",
+  "url": "https://nitrajsinh-solanki.vercel.app",
+  "image": "https://nitrajsinh-solanki.vercel.app/profile.jpg",
+  "email": "<your email, currently published here>",
+  "description": "Full-stack developer in Gujarat, India. Next.js, React, ASP.NET Core, Angular, Flutter.",
+  "jobTitle": "Full Stack Engineer Intern",
+  "worksFor": {
+    "@type": "Organization",
+    "name": "VeloxCore Private Limited"
+  },
+  "alumniOf": {
+    "@type": "CollegeOrUniversity",
+    "name": "Government Engineering College, Patan"
+  },
+  "address": {
+    "@type": "PostalAddress",
+    "addressRegion": "Gujarat",
+    "addressCountry": "IN"
+  },
+  "knowsAbout": [
+    "Next.js",
+    "React",
+    "TypeScript",
+    "Node.js",
+    "ASP.NET Core",
+    "Angular",
+    "Flutter",
+    "MongoDB",
+    "REST API design",
+    "Aptos blockchain",
+    "Rust",
+    "Google Gemini AI"
+  ],
+  "award": [
+    "3rd Place ($90), StackUp Hackathon: Library & Book Store Inventory System",
+    "4th Place ($70), StackUp May 2025 Challenge: BioMap",
+    "$60 Bounty, StackUp Bounty Challenge: Aptos NFT Marketplace",
+    "$20 Merit Prize, StackUp Hackathon: Moodify",
+    "$10 Merit Prize, StackUp Hackathon: Math Genius AI",
+    "First submission to complete all objectives, StackUp Rust Bounty Challenge"
+  ],
+  "sameAs": [
+    "https://github.com/Nitrajsinh-Solanki",
+    "https://www.linkedin.com/in/nitrajsinh-solanki-647b11293",
+    "https://x.com/Nitrajsinh_S",
+    "https://medium.com/@nrsolanki2005"
+  ]
+}```
+
+## 5. Adding a new project: structured-data checklist
+
+1. Add the project to `app/projects/data.ts`; set `updated` to the real date.
+2. If it has a **public** GitHub repo, add the exact repo URL as a `github` link (the code only emits `SoftwareSourceCode` for `https://github.com/<owner>/<repo>`) **and** a `languages` array containing real programming languages only (`"TypeScript"`, `"Rust"`, …, never `"Next.js"` or `"MongoDB"`).
+3. If there is no public repo, omit `languages` and do not link a profile page as a repo.
+4. Add `image` once you have a real screenshot (it is emitted in JSON-LD automatically).
+5. Run `npm run build && python3 scripts/seo-audit.py`; the audit fails on invalid languages, relative URLs, broken breadcrumbs and invalid JSON.
+
+## 6. Do not add
+
+* `FAQPage`, `HowTo`, `Review`, `AggregateRating`, `Product`/`Offer` for your own work, or any markup for content that is not on the page.
+* Hidden text or hidden JSON-LD-only claims.
+* `sameAs` URLs you do not control or that do not link back to you (every `sameAs` profile should link to the portfolio, so the connection is two-way).
+
+## 7. Validate in three layers
+
+1. **Automatic (every build):** `python3 scripts/seo-audit.py` — parses every JSON-LD block, checks `@context`/`@type`, sequential breadcrumb positions, absolute URLs, real repository URLs and valid programming languages.
+2. **Public validators (after deploy):** paste a project URL into Google's **Rich Results Test** (confirms Google can parse the page) and the **Schema Markup Validator** at validator.schema.org (checks schema.org conformance). Expect "no eligible rich result" for software pages; that is normal.
+3. **Search Console (weeks later):** the *Breadcrumbs* enhancement report should show valid items for the 14 pages that carry breadcrumbs **[N]**.
+
+Dump a page's JSON-LD locally:
+
+```bash
+python3 - <<'PY'
+import re, json
+html = open(".next/server/app/projects/biomap.html", encoding="utf8").read()
+for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
+    print(json.dumps(json.loads(block), indent=2, ensure_ascii=False))
+PY
+```
+
+## 8. Privacy: the email in the markup (D-07)
+
+`Person.email` and the `llms.txt` / `llms-full.txt` files publish your email address in machine-readable form, where address-harvesting bots look first. Options, from most to least private:
+
+| Option | Effect |
+|---|---|
+| Remove `email` from the `Person` node and from the `llms*.txt` routes; keep the visible contact link/form | Least spam exposure; search engines lose nothing |
+| Keep the visible address only on `/about`/`Contact` | Moderate |
+| Keep everything as is | Most convenient, most harvestable |
+
+This is your call; the code lives in `lib/profile.ts` (the node) and `app/llms.txt/route.ts` / `app/llms-full.txt/route.ts`.
+
+---
+
+<a id="part-5"></a>
+
+# Part 5 — Technical SEO and performance
+
+---
+
+## 1. Crawling and indexing controls — current state **[V]**
+
+`robots.txt` as built:
+
+```text
+User-Agent: *
+Allow: /
+
+Sitemap: https://nitrajsinh-solanki.vercel.app/sitemap.xml
+```
+
+* The whole site is crawlable; the only `noindex` page is the 404.
+* `sitemap.xml` lists the 15 indexable URLs, each with `<lastmod>` (ISO datetime), `<changefreq>` and `<priority>`. Google has said it ignores `changefreq` and `priority` **[N: confirm]**; they are harmless.
+* Every page has one absolute, self-referencing canonical that matches `og:url` (the audit enforces this).
+* `vercel.json` allows deployments only from `main`, so there are no preview sites competing with the real one.
+* Unknown project slugs call `notFound()`, so they return a 404 page rather than an empty "soft 404". **[N]** Confirm with `curl -sI <site>/projects/does-not-exist` → `HTTP/2 404`.
+
+## 2. URL policy and the domain decision
+
+**Trailing slashes.** Next's documented default redirects `/about/` to `/about`, and your `next.config.ts` does not override it, so the canonical (no slash) is consistent. **[N]** Verify on the live site with `curl -sI https://nitrajsinh-solanki.vercel.app/about/`.
+
+**The site origin** comes from `NEXT_PUBLIC_SITE_URL` (falling back to `https://nitrajsinh-solanki.vercel.app`). Because it is a `NEXT_PUBLIC_` variable it is **baked in at build time**: change it in Vercel, then **redeploy**.
+
+**`*.vercel.app` vs. your own domain.** Everything you build now accrues to whatever host you use. A domain you own lets you keep that value for life, put the same address on your CV, GitHub and LinkedIn, and avoid dependence on a platform subdomain. If you intend to buy one, **do it early** — moving later means redirects and re-verification.
+
+Migration checklist (when you decide; **[N] untested here**):
+
+1. Add the domain in Vercel and set DNS as instructed; wait for HTTPS.
+2. In Vercel → Project → Environment Variables, set `NEXT_PUBLIC_SITE_URL=https://<new-domain>` for Production; **redeploy**.
+3. Redirect the old host permanently to the new one. In `vercel.json` (check Vercel's current `redirects`/`has` documentation before relying on this):
+
+```json
+{
+  "$schema": "https://openapi.vercel.sh/vercel.json",
+  "git": { "deploymentEnabled": { "main": true, "*": false } },
+  "redirects": [
+    {
+      "source": "/(.*)",
+      "has": [{ "type": "host", "value": "nitrajsinh-solanki.vercel.app" }],
+      "destination": "https://<new-domain>/$1",
+      "permanent": true
+    }
+  ]
+}
+```
+
+4. Verify: `curl -sI https://nitrajsinh-solanki.vercel.app/projects/biomap` → a `308` with `location: https://<new-domain>/projects/biomap`.
+5. In Search Console add the new site (a **Domain property** via a DNS TXT record is the most robust), submit its sitemap, keep the old property to watch the transition. The existing `public/google2da5ac569292214b.html` verifies only the old URL-prefix property.
+6. Update the links on GitHub, LinkedIn, X, Medium, the resume PDF, repository "website" fields and `.env.example`.
+
+## 3. Icons and manifest
+
+| File / config | Purpose | Status |
+|---|---|---|
+| `app/icon.svg` via `metadata.icons.icon` | Browser favicon | Works; text-based SVG (F-20) |
+| `app/apple-icon.tsx` → `/apple-icon` | iOS home-screen icon | **Not linked** until Phase 1.1 (F-01) |
+| `app/manifest.ts` | Web app manifest | Present; SVG icon only |
+
+F-20 (favicon fallback) **[N]**: Google's favicon guidance asks for a crawlable icon in a supported format and recommends a size that is a multiple of 48 px; SVG is supported. A text-based SVG can render differently depending on installed fonts. Cheap insurance: export `icon.svg` to 48×48 and 192×192 PNGs, add them to `metadata.icons.icon`, and check Google's current favicon documentation before changing anything. Favicons in search results update slowly (days to weeks).
+
+## 4. Rendering model — keep it this way
+
+All 15 pages are prerendered HTML; client components only add interaction. Preserve this:
+
+* New content components must render their text on the server (no content that appears only after `useEffect`).
+* Do not hide text in the initial HTML. Today `MotionEnhancer.tsx` is a progressive enhancement: the server HTML is fully visible, and only after JavaScript runs does it add `motion-ready`, which fades in below-the-fold `[data-reveal]` blocks as they scroll into view (`opacity: 0` until observed; it is skipped when the visitor prefers reduced motion). The text is always in the HTML, so indexing is safe. **[N]** Confirm once in Search Console → URL Inspection → *View tested page* → screenshot that Google sees the full page. Your theme plan also forbids hiding the hero heading behind an animation; keep to that.
+* Use `<Link>` (not `<a href="/…">`) for internal navigation in any new component so Next can prefetch.
+
+## 5. Performance — baseline, fixes, and how to measure
+
+### 5.1 Baseline **[V]** (production build)
+
+| Metric | Value |
+|---|---|
+| Home HTML | ≈ 347 KB / ≈ 56 KB gzipped |
+| Inline CSS (every page) | ≈ 54 KB (from `experimental.inlineCss`) |
+| JS for `/` | ≈ 733 KB raw / ≈ 215 KB gzipped |
+| JS for `/about`, `/resume` | ≈ 188 KB gzipped |
+| Third-party image requests on `/` | 46 (jsDelivr, simpleicons) |
+| Extra chunk on `/projects` | 55.5 KB raw (full project dataset) |
+| Fonts | Syne 400/600/700/800, DM Mono 300/400/500, DM Sans — all via `next/font` (self-hosted at build) |
+
+### 5.2 Fixed and tested **[T]**
+
+* Third-party icons → local SVGs (Phase 2): 46 external requests → 0.
+* `/projects` no longer ships the long project text to the browser (Phase 1.6).
+
+### 5.3 Candidates, in order of expected value (measure first **[N]**)
+
+1. **Find out what the ~188 KB of JavaScript on static pages is made of.** Next 16.1+ ships an analyzer (documented in `node_modules/next/dist/docs/01-app/02-guides/package-bundling.md`):
+
+   ```bash
+   npx next experimental-analyze
+   ```
+
+   Look for components that are client components only because of one small interaction (theme toggle, motion), and for modules imported by the root layout that every page pays for.
+2. **Fonts:** 7 static font files plus a variable file are requested. After checking which weights the CSS actually uses (`grep -rn "font-weight\|font-\[" app`), drop unused weights.
+3. **`experimental.inlineCss`:** it avoids a render-blocking CSS request but repeats ~54 KB in every HTML response. Keep it unless a Lighthouse comparison with it off is better.
+4. **`<style jsx>` in `Hero.tsx`** (one block): moving those rules into `globals.css` removes a bit of runtime. Low priority.
+5. **Images:** only `profile.jpg` (≈62 KB) exists and is served through `next/image` as AVIF/WebP with `priority` — good. When you add project screenshots keep each ≤ 150 KB and let `next/image` handle sizes.
+
+### 5.4 Measure (do this *before* and *after* each change)
+
+Targets are Google's "good" Core Web Vitals thresholds: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**, evaluated on mobile.
+
+```bash
+# Lab data (repeat 3×, take the median); needs Chrome installed
+npx lighthouse https://nitrajsinh-solanki.vercel.app \
+  --only-categories=performance,seo,accessibility,best-practices \
+  --output=html --output-path=./lighthouse-home.html
+npx lighthouse https://nitrajsinh-solanki.vercel.app/projects/biomap \
+  --only-categories=performance,seo --output=html --output-path=./lighthouse-biomap.html
+```
+
+Also run **PageSpeed Insights** for `/` and one project page, for the same two URLs each time. Field data (real users) appears in Search Console's *Core Web Vitals* report only when there is enough traffic; a new portfolio may have none **[N]**, so rely on lab data and do not chase small score differences.
+
+## 6. Headers and security **[V]** (from `next.config.ts`)
+
+`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (camera/microphone/geolocation off); `X-Powered-By` is removed. HSTS is normally added by Vercel on its own domains **[N: confirm with `curl -sI`]**. A Content-Security-Policy is optional and not an SEO matter.
+
+## 7. `llms.txt` / `llms-full.txt`
+
+The site serves both. I know of no evidence that major search engines use them for ranking **[N]**; they cost nothing and can help AI assistants summarise you accurately. Keep them truthful and in sync with the site (they are generated from the same data), and decide about the email address in them (D-07).
+
+## 8. Technical checklist before each release
+
+* [ ] `npm run lint` and `npm run build` pass
+* [ ] `python3 scripts/seo-audit.py` → 0 FAIL
+* [ ] `NEXT_PUBLIC_SITE_URL` is correct for Production (canonicals and sitemap show the right host)
+* [ ] No new third-party scripts, fonts or image hosts without a reason
+* [ ] New components render their text on the server
+* [ ] Live demos linked from project pages still work
+
+---
+
+<a id="part-6"></a>
+
+# Part 6 — Off-site and entity SEO
+
+Search engines decide who "Nitrajsinh Solanki" is by comparing **many sources** — your site, GitHub, LinkedIn, X, Medium, your resume, hackathon pages — and checking that they agree and link to each other. This is also where a new personal site gets most of its early authority. Everything here is free and under your control.
+
+> Verified facts below come from cloning your public repositories and profile README ([V]). Items I could not see (LinkedIn text, repo "About" fields, X/Medium bios) are marked **[N]**.
+
+---
+
+## 1. The entity map
+
+| Source | URL | Linked from the site (`sameAs`) | Links back to the portfolio |
+|---|---|---|---|
+| Portfolio | `https://nitrajsinh-solanki.vercel.app` | — | — |
+| GitHub profile | `github.com/Nitrajsinh-Solanki` | Yes **[V]** | Profile README links the home page 5× **[V]**, project pages 0× **[V]** |
+| GitHub project repos (8 public) | see §2 | Linked from project pages | **0 of 8** READMEs mention the portfolio **[V]** |
+| LinkedIn | `linkedin.com/in/nitrajsinh-solanki-647b11293` | Yes **[V]** | **[N]** |
+| X | `x.com/Nitrajsinh_S` | Yes **[V]** | **[N]** |
+| Medium | `medium.com/@nrsolanki2005` | Yes **[V]** | **[N]** |
+
+Goal: every profile above links to the portfolio, the portfolio links to every profile, and all of them state the **same name, role and key facts**.
+
+## 2. GitHub — the quickest win
+
+### 2.1 Project READMEs → project pages (F-23)
+
+None of the 8 project READMEs link to your portfolio. Add this block near the top of each README (replace `<slug>`):
+
+```md
+> **Case study:** why and how this was built — https://nitrajsinh-solanki.vercel.app/projects/<slug>
+> Built by [Nitrajsinh Solanki](https://nitrajsinh-solanki.vercel.app) · [GitHub](https://github.com/Nitrajsinh-Solanki)
+```
+
+| Repository | Project page slug | README today (lines) |
+|---|---|---|
+| `Nitrajsinh-Solanki/library-inventory-system` | `library-inventory-system` | 256 |
+| `Nitrajsinh-Solanki/biomap` | `biomap` | 289 |
+| `Nitrajsinh-Solanki/aptos4-bounty-nft` | `nft-marketplace-aptos` | 386 |
+| `Nitrajsinh-Solanki/hackathon_may_stackup` | `moodify` | 267 |
+| `Nitrajsinh-Solanki/hackathon-feb` | `math-genius-ai` | 219 |
+| `Nitrajsinh-Solanki/Meeting-Genius` | `meeting-insights-generator` | 190 |
+| `Nitrajsinh-Solanki/simple-file-server` | `rust-file-server` | 26 |
+| `Nitrajsinh-Solanki/floris-restaurant` | `floris-restaurant` | 16 |
+
+Notes:
+
+* The two shortest READMEs (`simple-file-server`, `floris-restaurant`) deserve a few more lines: what it does, how to run it, a screenshot.
+* Repository names do not match project names (`hackathon_may_stackup` is Moodify, `hackathon-feb` is Math Genius AI). **Do not rename them** (links in your README, hackathon platforms and the site would break); fix discoverability with the "About" fields instead (§2.2).
+* The Moodify link on the site and in the profile README uses a lower-case owner (`github.com/nitrajsinh-solanki/…`). GitHub treats it as the same account, but use the same casing everywhere (`Nitrajsinh-Solanki`).
+* None of the 8 repositories has a `LICENSE` file **[V]**. Without one, the code is "all rights reserved" by default. Adding one (for example MIT) is your choice (D-17); it is not an SEO factor.
+
+### 2.2 Repository "About" panel **[N: could not read these via the API]**
+
+For each repo (⚙️ next to *About*):
+
+| Field | What to put |
+|---|---|
+| Description | The project's `seoDescription` from `data.ts` (one clear sentence, ≤ 350 chars) |
+| Website | `https://nitrajsinh-solanki.vercel.app/projects/<slug>` (or the live demo if it has one, and put the case-study link in the README) |
+| Topics | 5–8 accurate topics, e.g. `nextjs`, `typescript`, `mongodb`, `hackathon`; for Rust `rust`, `file-server`; for the Aptos project `aptos`, `move`, `nft-marketplace`, `blockchain` |
+
+### 2.3 Profile README (`Nitrajsinh-Solanki/Nitrajsinh-Solanki`) — verified contents **[V]**
+
+* It exists, is public, and is 402 lines long, with the portfolio link in several places.
+* **Inconsistencies with the site (decide, then fix whichever is wrong — D-05, D-06):**
+  * CGPA **7.90** here vs **7.43** on the site.
+  * Name written **"Solanki Nitrajsinh Rajusinh"** here vs **"Nitrajsinh Solanki"** on the site.
+  * "Graduating May 2026" (that date has passed).
+  * Role "Full Stack Engineer Intern" here (matches the site's JSON-LD) vs "Full Stack Developer Intern" on the About page.
+* **Add** a "Case study" link for each project in its table row, pointing to `…/projects/<slug>` (currently 0).
+* Pin your 6 strongest repositories on the profile page, and set the profile's *Website* to the portfolio, *Location* to the same place the site states, and *Bio* to the same role phrase as the site title.
+* It relies on several external image/badge services (capsule-render, shields.io, readme-typing-svg). They are fine, but if one is down the README looks broken; keep the factual text in plain Markdown.
+
+## 3. LinkedIn, X, Medium **[N]**
+
+| Profile | Do this |
+|---|---|
+| LinkedIn | Headline = the same role phrase as the site title; *Contact info → Website* = portfolio; **Featured** section → 3 project pages (not just repos); custom URL already short; same spelling of your name as the site |
+| X | Bio includes the role phrase and the portfolio link (`sameAs` already points here, so it must link back) |
+| Medium | Bio links to the portfolio. If you publish write-ups here, use *Import a story* (sets the canonical to the original) or publish on your own site first and cross-post, so authority accrues to you |
+
+## 4. Other sources of genuine links
+
+Ordered by effort-to-value; all are legitimate and none involves buying or trading links.
+
+1. **Client sites** (Floris restaurant; Aman Sales / Ice Saathi): with the client's agreement, add a small "Website by Nitrajsinh Solanki" credit in the footer linking to the matching project page. This is a natural, relevant link and a trust signal.
+2. **Hackathon / bounty platform pages** (StackUp and similar): wherever you can edit a submission or profile, add the portfolio and case-study link.
+3. **College or alumni pages / department news** that mention your awards.
+4. **Write-ups** (see [Part 3](#part-3) §9) shared on communities where they are on-topic (dev.to, Hashnode, relevant subreddits/Discords); one real article beats ten directory listings.
+5. **Open-source contributions**: a merged PR links your profile from a respected repository.
+
+Do **not**: buy links, join link-exchange schemes, spam comments/forums, submit to bulk "web directories", or create dozens of low-effort profiles. These can hurt, and a new site gains nothing from them.
+
+## 5. Name consistency
+
+People search names in different orders. Decide your **display name** (the site uses "Nitrajsinh Solanki") and use it on every profile and in the resume. If "Solanki Nitrajsinh Rajusinh" is also a real form of your name, state it once on the About page ("also written…") and consider adding it to the `Person` JSON-LD as `alternateName` — only if it is accurate (D-06).
+
+## 6. Check how you appear (brand SERP)
+
+1. Open a private window and search `Nitrajsinh Solanki` and `Nitrajsinh Solanki portfolio`. Note where the portfolio ranks, what title/snippet/favicon show, and which other results appear (GitHub, LinkedIn…).
+2. Repeat monthly (see [Part 7](#part-7)). Good outcome: the portfolio first with sitelinks, followed by your GitHub and LinkedIn.
+3. Share a project URL in LinkedIn and X to see the share card. If you change an image or title and the old preview persists, refresh it with LinkedIn's **Post Inspector** and Facebook's **Sharing Debugger**; X has no public validator now, so check by composing a post **[N]**. The home `og:image` URL carries a content hash, which helps bust caches.
+
+## 7. Effort and sequence
+
+| Order | Task | Time |
+|---|---|---|
+| 1 | Add the case-study block to 8 repo READMEs + 8 "About" panels | 45 min |
+| 2 | Fix and extend the profile README; set GitHub bio/website/pins | 30 min |
+| 3 | LinkedIn headline, website, Featured links | 20 min |
+| 4 | Ask the two clients about a footer credit | one message each |
+| 5 | Bing Webmaster Tools + Search Console (see `07`) | 20 min |
+| 6 | First write-up (optional) | a few hours |
+
+Expect these to matter mainly for **brand and long-tail queries** over weeks to months; none of it is a guarantee **[N]**.
+
+---
+
+<a id="part-7"></a>
+
+# Part 7 — Measurement and maintenance
+
+SEO is a loop: **measure → change one thing → measure again**. This file is the measuring and upkeep manual. All the "what will Google do" statements are **[N]** unless noted; nothing here can be guaranteed.
+
+---
+
+## 1. Set up Search Console (free, 20 minutes)
+
+1. Open Google Search Console → **Add property → URL prefix** → `https://nitrajsinh-solanki.vercel.app/`.
+2. Verification: the repository already contains the HTML-file token `public/google2da5ac569292214b.html`. If the property verifies, you are done. **Never delete that file** (it keeps the property verified).
+3. **Sitemaps** → submit `sitemap.xml`. Status should become *Success* with 15 discovered URLs.
+4. **URL Inspection** → paste `https://nitrajsinh-solanki.vercel.app/` → *Test live URL* → *View tested page* → check the screenshot shows the full page (confirms Google renders the fade-in sections) → *Request indexing*. Repeat for `/projects`, `/about`, and the three most important project pages. Requests are rate-limited, so do not spam them.
+5. **Indexing → Pages**: goal **15 indexed, 0 errors** (the 404 is intentionally excluded).
+6. **Settings → Users**: add a second owner/backup email so you cannot lose access.
+7. If you later move to a custom domain, create a **Domain property** (DNS TXT) — see [Part 5](#part-5) §2.
+
+### Reading the Pages report
+
+| Status Google shows | Meaning | What to do |
+|---|---|---|
+| Discovered – currently not indexed | Google knows the URL but has not crawled it yet | Wait a few days; add internal/external links; check the page is in the sitemap |
+| Crawled – currently not indexed | Crawled, judged not worth indexing yet | Improve depth/uniqueness (see `03`); add links; be patient (weeks) |
+| Duplicate, Google chose a different canonical | It treats two URLs as the same page | Check `curl` of both; make sure canonicals are self-referencing |
+| Alternate page with proper canonical tag | Normal for variants (e.g. a trailing-slash URL) | Nothing |
+| Page with redirect | The URL redirects | Normal for `/about/` → `/about` |
+| Not found (404) | The URL does not exist | Normal for the 404 test; fix links that point to it |
+| Soft 404 | Page looks empty but returns 200 | Return a real 404 or add content |
+| Blocked by robots.txt / Excluded by `noindex` | You told it not to index | Only the 404 page should show `noindex` |
+
+## 2. Bing Webmaster Tools (10 minutes)
+
+Sign in at Bing Webmaster Tools and **import the site from Google Search Console** (the import option avoids a second verification), then check that the sitemap was picked up. Bing's data also feeds several other search engines and assistants.
+
+## 3. Analytics
+
+No analytics or tracking script is present in the built HTML **[V]**, so Search Console is currently your only data source. Options if you want visitor behaviour (your decision D-16):
+
+| Option | Notes |
+|---|---|
+| Search Console only | Zero cost, no consent banner needed; shows queries, impressions, clicks, indexing |
+| Vercel Web Analytics / Plausible / Umami | Privacy-friendly, lightweight; still read your region's rules about cookies/consent **[N: not legal advice]** |
+| Google Analytics | Heavier and needs consent handling; not necessary for a portfolio |
+
+## 4. What to track
+
+| Metric | Where | Healthy sign | Cadence |
+|---|---|---|---|
+| Indexed pages | Search Console → Pages | 15 of 15 | weekly for the first month, then monthly |
+| Brand impressions/clicks | Performance → filter query *contains* "nitrajsinh" | rising; portfolio is #1 | weekly → monthly |
+| Average position and CTR for the brand query | Performance | position ≈ 1; CTR high | monthly |
+| Top queries and pages | Performance → Queries / Pages | new, relevant long-tail queries appearing | monthly; feeds the intent map in `03` |
+| Core Web Vitals | Search Console → Experience (may say "not enough data") + PageSpeed Insights lab runs | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 | after every performance change |
+| External links | Search Console → Links | GitHub/LinkedIn/clients appear | monthly |
+| Breadcrumb enhancement | Search Console → Enhancements | valid items, 0 errors | monthly |
+| Audit result | `python3 scripts/seo-audit.py` | 0 FAIL | every build (CI) |
+
+### Honest expectations **[N]**
+
+* New or changed URLs are typically crawled within days to a couple of weeks; indexing is not guaranteed.
+* Brand queries ("Nitrajsinh Solanki") usually respond first, often within weeks, if the name is not heavily contested.
+* Non-brand queries take months and depend on content quality, links and competition. Do not judge success in the first month.
+* Only change one meaningful thing at a time when you want to learn its effect; Google needs days to re-evaluate.
+
+## 5. Release checklist (copy into each pull request)
+
+```md
+- [ ] npm run lint && npm run build pass
+- [ ] python3 scripts/seo-audit.py → 0 FAIL (note any new WARN)
+- [ ] Titles ≤ 60, descriptions 120–155, both unique (audit checks)
+- [ ] New/changed project: `updated` date set to the real change date; `languages` set if it has a repo
+- [ ] Facts (role, intern title, counts, dates) match the identity decisions
+- [ ] Live demo links tested today
+- [ ] After deploy: curl the page, run URL Inspection on changed URLs, re-submit sitemap if URLs were added/removed
+```
+
+## 6. The audit tool
+
+`scripts/seo-audit.py` (Appendix A) reads the **prerendered HTML** in `.next/server/app` after `npm run build`. It uses only the Python standard library and never touches the network.
+
+```bash
+cd nitrajsinh-solanki
+npm run build
+python3 scripts/seo-audit.py             # report; exit 1 if any FAIL
+python3 scripts/seo-audit.py --json      # machine-readable
+python3 scripts/seo-audit.py --strict    # WARN also fails (use once warnings are cleared)
+```
+
+How well it works **[T]**: on pristine `main` it reports **10 FAIL / 21 WARN**; with the fixes in this guide **0 FAIL / 12 WARN**. I also deliberately broke a built copy 12 ways (missing canonical, second `<h1>`, description ending in "…", dead internal link, `<img>` without alt, invalid JSON-LD, removed apple-touch-icon, duplicate title, page removed from the sitemap, `Disallow: /`, a framework name in `programmingLanguage`, `localhost:3000` text) and it flagged all 12.
+
+**Limits:** it checks the generated HTML, not what a browser or Google renders; it cannot judge content quality; the `STALE_COUNT` check only understands the phrase "across N real projects"; the language allowlist (`PROGRAMMING_LANGUAGES` at the top of the file) must be extended if you add a language. It is a regression net, not a substitute for Search Console.
+
+### Check codes
+
+| Code | Severity | Meaning | Typical fix |
+|---|---|---|---|
+| `APPLE_TOUCH_ICON` | FAIL | No `apple-touch-icon` link on the home page | Phase 1.1 (add `apple` to `metadata.icons`) |
+| `BREADCRUMB_POS` | FAIL | Breadcrumb positions are not 1,2,3… | Use the `breadcrumb()` helper |
+| `BROKEN_ANCHOR` | FAIL | `#id` link with no matching `id` on the page | Fix the id or the link |
+| `BROKEN_LINK` | FAIL | Internal link to a route that is not built | Fix the href or add the page |
+| `CANONICAL_COUNT` | FAIL | Not exactly one canonical link | Use `pageMetadata()` so there is exactly one |
+| `CANONICAL_HOST` | FAIL | Canonical host differs from the site origin | Check `NEXT_PUBLIC_SITE_URL` |
+| `CANONICAL_NOT_SELF` | FAIL | Canonical points to a different page | Fix the `path` passed to `pageMetadata()` |
+| `CANONICAL_OG_MISMATCH` | WARN | Canonical differs from `og:url` | Build both from the same path |
+| `CANONICAL_RELATIVE` | FAIL | Canonical is not an absolute URL | Check `metadataBase` / `SITE_URL` |
+| `CODE_REPO` | FAIL | `codeRepository` is not `https://github.com/<owner>/<repo>` | Only emit real repo URLs |
+| `DESC_ELLIPSIS` | FAIL | Description ends with `…`/`...` (cut mid-sentence) | Write a complete sentence (see `seoDescription`) |
+| `DESC_LONG` | WARN | Description > 160 characters | Shorten to 120–155 |
+| `DESC_MISSING` | FAIL | No meta description | Set `description` |
+| `DESC_SHORT` | WARN | Description < 70 characters | Expand to 120–155 |
+| `DUPLICATE_DESC` | FAIL | Two pages share a description | Make descriptions unique |
+| `DUPLICATE_TITLE` | FAIL | Two pages share a title | Make titles unique |
+| `FAVICON` | FAIL | No favicon link | Add `icons.icon` in the layout |
+| `FEW_INBOUND` | WARN | Fewer than 2 pages link to this page | Add contextual links (Phase 1.7) |
+| `H1_COUNT` | FAIL | Not exactly one `<h1>` | Keep exactly one per page |
+| `HEADING_BR` | FAIL | A `<br>` glues words together in a heading | Add a space around the `<br>` |
+| `HEADING_SKIP` | WARN | Heading level jumps (e.g. h2 → h4) | Use the next level |
+| `IMG_ALT` | FAIL | `<img>` without an `alt` attribute | Add descriptive alt, or `alt=""` if decorative |
+| `JSONLD_CONTEXT` | FAIL | JSON-LD block lacks `@context` | Add `"@context": "https://schema.org"` |
+| `JSONLD_INVALID` | FAIL | JSON-LD is not valid JSON | Fix the object passed to `<JsonLd>` |
+| `JSONLD_RELATIVE_URL` | FAIL | A JSON-LD URL is relative | Wrap it with `abs()` |
+| `JSONLD_TYPE` | FAIL | A JSON-LD node has no `@type` | Add the type |
+| `LANG_MISSING` | FAIL | `<html>` has no `lang` | Set `lang` in `app/layout.tsx` |
+| `MANIFEST` | WARN | No web-manifest link | Check `app/manifest.ts` |
+| `MICRODATA_CATEGORY` | FAIL | Microdata `applicationCategory` is not a category | Remove the microdata (Phase 1.3) |
+| `NOOPENER` | WARN | `target="_blank"` link without `rel="noopener"` | Add `rel="noopener noreferrer"` |
+| `NOT_IN_SITEMAP` | FAIL | Indexable page missing from `sitemap.xml` | Add it in `app/sitemap.ts` |
+| `NO_CONTENT_IMAGE` | WARN | Project page has no real image | Phase 4: add `image` in `data.ts` |
+| `NO_JSONLD` | WARN | No JSON-LD on an indexable page | Add the page's `<JsonLd>` |
+| `OG_IMAGE_MISSING` | FAIL | `og:image` URL has no built file/route | Add/fix `opengraph-image.tsx` |
+| `OG_IMAGE_RELATIVE` | FAIL | `og:image` is not absolute | Check `metadataBase` |
+| `OG_MISSING` | FAIL | Missing an `og:` tag | Use `pageMetadata()` |
+| `PLACEHOLDER_TEXT` | FAIL" if bad != "localhost:3000" else "WARN | Visible `localhost:3000`, lorem ipsum, TODO, `undefined`… | Replace the placeholder (Phase 1.4) |
+| `PROGRAMMING_LANGUAGE` | FAIL | `programmingLanguage` has a non-language (e.g. Next.js, MongoDB) | Use the `languages` field (Phase 1.2) |
+| `PROGRAMMING_LANGUAGE_EMPTY` | WARN | `SoftwareSourceCode` has no `programmingLanguage` | Add `languages` for projects with a repo |
+| `ROBOTS_BLOCKS_ALL` | FAIL | robots.txt disallows `/` | Remove the `Disallow: /` rule |
+| `ROBOTS_CONFLICT` | FAIL | A page has both an indexing and a `noindex` robots tag | Remove the conflicting tag |
+| `ROBOTS_MISSING` | FAIL | robots.txt was not generated | Check `app/robots.ts` |
+| `ROBOTS_NO_SITEMAP` | FAIL | robots.txt has no absolute `Sitemap:` line | Add `sitemap:` in `app/robots.ts` |
+| `SITEMAP_DEAD_URL` | FAIL | Sitemap lists a URL with no page | Remove it or build the page |
+| `SITEMAP_HOST` | FAIL | Sitemap URL on a different host | Check `NEXT_PUBLIC_SITE_URL` |
+| `SITEMAP_LASTMOD_FORMAT` | FAIL | `lastmod` is not an ISO date | Fix the date |
+| `SITEMAP_MISSING` | FAIL | sitemap.xml was not generated | Check `app/sitemap.ts` builds; run `npm run build` |
+| `SITEMAP_NOINDEX` | FAIL | Sitemap lists a `noindex` page | Remove it from the sitemap |
+| `SITEMAP_NO_LASTMOD` | WARN | Some sitemap URLs lack `<lastmod>` | Provide a date |
+| `SITEMAP_SAME_LASTMOD` | WARN | All sitemap dates are equal | Informational; see Phase 3 |
+| `SOFTWAREAPP_FIELD` | WARN | `SoftwareApplication` lacks name/description/category | Fill the field |
+| `STALE_COUNT` | WARN | Text says "across N real projects" but N ≠ project pages | Use `STATS.total` (Phase 1.5) |
+| `THIRD_PARTY_IMAGES` | WARN | Images load from other hosts | Phase 2 (self-host icons) |
+| `TITLE_LONG` | WARN | Title > 65 characters (may be truncated) | Shorten to ≤ 60 |
+| `TITLE_MISSING` | FAIL | Page has no `<title>` | Set `title` in the page metadata |
+| `TITLE_SHORT` | WARN | Title < 15 characters | Make it descriptive |
+| `TWITTER_CARD` | FAIL | Missing `twitter:card` | Use `pageMetadata()` |
+| `VIEWPORT_MISSING` | FAIL | No viewport meta | Export `viewport` from the layout |
+
+## 7. Monthly upkeep routine (30 minutes)
+
+1. Search Console: Pages (any new errors?), Performance (top queries, new impressions), Links.
+2. Search your name in a private window (brand SERP).
+3. Click through every live-demo and repository link on the 11 project pages.
+4. Update at least one thing that is genuinely new (a project detail, "currently building", a write-up) and set its `updated` date honestly.
+5. Run the audit; fix any new FAIL.
+
+## 8. Troubleshooting
+
+| Symptom | Likely cause | Check / fix |
+|---|---|---|
+| A page is "Crawled – currently not indexed" for weeks | Thin or similar to others; few links | Deepen it (`03` §5), add internal and external links |
+| Google shows the wrong or an old title/snippet | Not recrawled yet, or it rewrote the snippet | URL Inspection → Request indexing; make the description a clear sentence that matches the page |
+| Favicon shows a default globe | Slow favicon refresh, or the SVG did not render | Wait; provide the PNG fallbacks (`05` §3); check `/icon.svg` opens |
+| Wrong site name in results | Site-name signals unclear | Make sure the `WebSite` JSON-LD `name` and the home `<title>` agree; allow weeks **[N]** |
+| `programmingLanguage` / schema errors reappear | A new project added with tech tags instead of languages | `05`/`04` §5 checklist; the audit fails the build |
+| Social preview shows an old image | Platform cache | LinkedIn Post Inspector / Facebook Sharing Debugger re-scrape |
+| Audit fails only in CI | Different `NEXT_PUBLIC_SITE_URL` or build env | Compare the env vars between Vercel and GitHub Actions |
+
+---
+
+<a id="part-8"></a>
+
+# Part 8 — Decisions only you can make
+
+I did not change any claim about your experience, education, awards or clients, and I did not guess. Each item below gives the **evidence I found**, the **options**, and **my recommendation**. Once you answer, the code changes are small (the file to edit is listed).
+
+> Fill in the **Your answer** column and keep this file; it becomes your record of what is true and where it is used.
+
+| ID | Topic | My recommendation | Your answer |
+|---|---|---|---|
+| D-01 | Role label | "Full-Stack Developer" everywhere; MERN as a skill | |
+| D-02 | Intern job title | "Full Stack Engineer Intern" (matches PDF, JSON-LD, GitHub) | |
+| D-03 | "5 challenges" vs "7 projects" wording | Say "7 projects across 5 challenges" | |
+| D-04 | "Android and iOS" claim | Say Android unless an iOS build exists | |
+| D-05 | Education status after May 2026 | Update to what is true today, everywhere | |
+| D-06 | CGPA and name form | Verify CGPA against your marksheet; one name form | |
+| D-07 | Email in JSON-LD and `llms*.txt` | Remove from machine-readable files | |
+| D-08 | Custom domain | Decide early; migrate before the site grows | |
+| D-09 | Screenshots and client permission | Get written OK for client work | |
+| D-10 | Sitemap date policy | Accept "real dates only" | |
+| D-11 | Resume PDF | Re-export tagged; keep the URL | |
+| D-12 | Home nav "About" target | Keep the anchor, add a visible "Full bio" link | |
+| D-13 | HourBit live URL | Link the public landing page, not a dashboard deep link | |
+| D-14 | Keep `llms.txt`/`llms-full.txt` | Keep (after D-07) | |
+| D-15 | Publish technical write-ups | Yes, 2–4, only if you will maintain them | |
+| D-16 | Analytics | Search Console only to start | |
+| D-17 | Licences on public repos | Optional; choose deliberately | |
+
+---
+
+## D-01 · Role label
+
+* **Evidence [V]:** Hero label says **"MERN Stack Developer"**. Titles, OG image, JSON-LD, meta and the resume all say **"Full-Stack Developer"**. The resume header is `Full-Stack Developer | MERN, Next.js, Flutter, Angular, .NET` — exactly the pattern recommended here.
+* **Why:** a single, consistent headline strengthens the entity signal; MERN is one skill among several (you also list Flutter, Angular, .NET).
+* **Recommendation:** "Full-Stack Developer" as the headline; list MERN in the skills line.
+* **Edit:** `app/components/Hero.tsx` (label), optionally via `lib/identity.ts` ([Part 3](#part-3) §8).
+
+## D-02 · Intern job title
+
+* **Evidence [V]:** "Full Stack **Engineer** Intern" appears in the resume PDF (twice), `lib/profile.ts` (→ JSON-LD `jobTitle`) and the GitHub profile README. The About page says "Full Stack **Developer** Intern".
+* **Recommendation:** use the exact title on your offer letter/LinkedIn. If that is "Engineer", change the About page; four of five places already agree.
+* **Edit:** `app/components/About.tsx` and/or `app/about/page.tsx`.
+
+## D-03 · "5 challenges" vs "7 projects"
+
+* **Evidence [V]:** WorkHistory, About and `lib/profile.ts` say you competed in **5** hackathon/bounty challenges; `STATS.hackathon` is **7** projects. Your GitHub README says "5 hackathon wins & bounties" and "Hackathon & Bounty Projects (7)". These are different counts and both appear correct.
+* **Risk:** a quick reader sees "5" and "7" and suspects a typo.
+* **Recommendation:** one sentence that explains it: "7 projects across 5 StackUp challenges". Only if it is true.
+* **Edit:** `app/components/WorkHistory.tsx`, `app/about/page.tsx`, `lib/profile.ts`.
+
+## D-04 · "Android and iOS"
+
+* **Evidence [V]:** `Services.tsx` says "Cross-platform mobile apps for **Android and iOS**". The project data says the delivery app is "built in Flutter for **Android**", lists tech `Android`, and `lib/profile.ts` says "Flutter (Android)".
+* **Recommendation:** unless you shipped an iOS build, rewrite to "Flutter mobile apps (shipped on Android)". Overstated claims are the first thing a technical interviewer tests.
+* **Edit:** `app/components/Services.tsx` line with that sentence.
+
+## D-05 · Education status
+
+* **Evidence [V]:** `About.tsx` sets `current: true` with period "2022 – May 2026"; the GitHub README says "Graduating May 2026". Today is October 2026.
+* **Recommendation:** if you have graduated, drop `current`, show "2022 – 2026", and update the README. If not, update the expected date everywhere.
+* **Edit:** `app/components/About.tsx`, `lib/profile.ts`, GitHub profile README.
+
+## D-06 · CGPA and name form
+
+* **Evidence [V]:** CGPA **7.43** on the site (`About.tsx`, `lib/profile.ts`) and in the resume PDF; **7.90** in the GitHub profile README. The README also writes your name as **"Solanki Nitrajsinh Rajusinh"** while the site and PDF say "Nitrajsinh Solanki".
+* **Recommendation:** check your marksheet, correct whichever source is wrong, and choose one display name. If both name orders are real, say so once on the About page and add `alternateName` to the `Person` JSON-LD.
+* **Edit:** GitHub profile README (and `lib/profile.ts` if the site number is wrong).
+
+## D-07 · Email in machine-readable files
+
+* **Evidence [V]:** `Person.email` in the JSON-LD on `/` and `/about`, and the address in `llms.txt` / `llms-full.txt`; it is also in the resume PDF header.
+* **Options:** remove from JSON-LD and `llms*.txt` (recommended) · keep (more spam exposure). Search engines do not need it.
+* **Edit:** `lib/profile.ts` (the `email` field in the node), `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`.
+
+## D-08 · Custom domain
+
+* Using `*.vercel.app` is fine today, but the longer the site lives there, the more a later move costs. See [Part 5](#part-5) §2 for the migration checklist. Decide before you invest in links and write-ups.
+
+## D-09 · Screenshots and client permission
+
+* Floris Restaurant and Aman Sales (Ice Saathi platform and delivery app) are client work. Before publishing screenshots, metrics or footer credits, get the client's OK (a message is enough). Never show real customer data or admin pages with private information.
+
+## D-10 · Sitemap dates
+
+* Accept the rule already written in `app/sitemap.ts`: dates follow real content changes; never stagger or auto-stamp them (see Phase 3 of the runbook).
+
+## D-11 · Resume PDF
+
+* **Evidence [V]:** the PDF is generated by ReportLab, is **untagged** (`Tagged: no`), 2 pages, metadata subject "Resume: Full-Stack Developer (MERN, Next.js, Flutter, Angular, .NET)". Its content is consistent with the site (CGPA 7.43, "Full Stack Engineer Intern").
+* **Recommendation:** re-export a tagged PDF (accessibility and better text extraction), keep the same file name and URL, update it whenever the facts in D-05/D-06 change.
+
+## D-12 · "About" in the home navigation
+
+* **Evidence [V]:** the home nav's "About" jumps to the `#about` section; the `/about` page is linked from inside that section and from the footer.
+* **Options:** (a) keep as is (smooth one-page feel); (b) point to `/about`; (c) keep the anchor and add a visible "Full bio →" link in the nav. Option (c) keeps your design and gives the full page a prominent internal link.
+
+## D-13 · HourBit live link
+
+* **Evidence [V]:** the link and `SoftwareApplication.url` are `https://hourbit-web.vercel.app/dashboard/today`, a dashboard path (also used in your GitHub README). **[N]** I could not test whether it works without logging in.
+* **Recommendation:** open it in a private window. If it redirects to a login, link the public landing page instead so visitors and crawlers land on something meaningful.
+* **Edit:** the `links` entry for `hourbit` in `app/projects/data.ts`, and the GitHub README.
+
+## D-14 · `llms.txt` and `llms-full.txt`
+
+* Harmless and cheap; I know of no evidence that search engines rank on them **[N]**. Keep them, after deciding D-07 and keeping them accurate.
+
+## D-15 · Technical write-ups
+
+* Valuable only if genuinely useful and maintained (see [Part 3](#part-3) §9). Three or four strong pieces are better than ten thin ones. Decide where they live (`/writing` on your domain is best for authority).
+
+## D-16 · Analytics
+
+* **Evidence [V]:** none installed. Search Console is enough to start. Add a privacy-friendly tool later if you want to know how visitors behave.
+
+## D-17 · Licences
+
+* **Evidence [V]:** none of the 8 public repositories has a `LICENSE` file, so the default is "all rights reserved". If you want others to be able to learn from or reuse the code, choose a licence (MIT is common); if not, leave it. It is not an SEO factor.
+
+---
+
+<a id="appendix-a"></a>
+
+# Appendix A — `scripts/seo-audit.py`
+
+Save this exactly as `nitrajsinh-solanki/scripts/seo-audit.py`. Python 3 standard library only; it never uses the network. Usage and every check code are explained in [Part 7](#part-7) §6.
+
+````python
+#!/usr/bin/env python3
+"""
+Post-build SEO audit for the Next.js portfolio (no third-party dependencies).
+
+Usage (from the `nitrajsinh-solanki/` app folder, after `npm run build`):
+
+    python3 scripts/seo-audit.py                # human-readable report
+    python3 scripts/seo-audit.py --json         # machine-readable report
+    python3 scripts/seo-audit.py --strict       # treat WARN as FAIL (CI gate)
+
+Exit codes: 0 = no FAIL, 1 = at least one FAIL (or WARN with --strict).
+
+It reads the prerendered output in `.next/server/app` and the `public/` folder.
+It never touches the network.
+"""
+import argparse
+import collections
+import glob
+import html as htmllib
+import json
+import os
+import re
+import sys
+from html.parser import HTMLParser
+from urllib.parse import urlparse
+
+ap = argparse.ArgumentParser()
+ap.add_argument("--root", default=".next/server/app", help="prerendered app dir")
+ap.add_argument("--public", default="public", help="public dir")
+ap.add_argument("--json", action="store_true")
+ap.add_argument("--strict", action="store_true")
+args = ap.parse_args()
+
+ROOT = args.root
+if not os.path.isdir(ROOT):
+    sys.exit(f"Build output not found at {ROOT}. Run `npm run build` first.")
+
+# ---------------------------------------------------------------- findings
+findings = []  # (severity, page, code, message)
+
+
+def add(sev, page, code, msg):
+    findings.append((sev, page, code, msg))
+
+
+# schema.org `programmingLanguage` must name languages, not frameworks/databases/tools.
+PROGRAMMING_LANGUAGES = {
+    "javascript", "typescript", "rust", "dart", "c#", "c", "c++", "java", "kotlin", "swift",
+    "python", "go", "php", "ruby", "move", "sql", "html", "css", "shell", "bash", "solidity",
+}
+VALID_APP_CATEGORIES = re.compile(
+    r"^(Web|Business|Mobile|Game|Utilities|Multimedia|Education|Health|Finance|Social|Developer|Travel|"
+    r"Lifestyle|Entertainment|Productivity)[A-Za-z]*(Application)?$"
+)
+
+# ---------------------------------------------------------------- parsing
+
+
+class Page(HTMLParser):
+    def __init__(self):
+        super().__init__(convert_charrefs=True)
+        self.metas, self.links, self.imgs, self.anchors = [], [], [], []
+        self.title, self._in_title = "", False
+        self.headings, self._h = [], None
+        self.ld, self._in_ld, self._ld_buf = [], False, ""
+        self.ids = set()
+        self.itemtypes, self.itemprops = [], []
+        self.text, self._skip = [], 0
+        self.html_lang = None
+        self._cur_prop = None
+        self.app_category_text = []
+
+    def handle_starttag(self, tag, a):
+        a = dict(a)
+        if "id" in a:
+            self.ids.add(a["id"])
+        if tag == "html":
+            self.html_lang = a.get("lang")
+        if tag == "title":
+            self._in_title = True
+        elif tag == "meta":
+            self.metas.append(a)
+        elif tag == "link":
+            self.links.append(a)
+        elif tag == "img":
+            self.imgs.append(a)
+        elif tag == "a":
+            self.anchors.append(a)
+        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
+            self._h = [tag, ""]
+        elif tag == "br" and self._h is not None:
+            self._h[1] += "\u2417"  # sentinel for <br>
+        if tag in ("script", "style"):
+            self._skip += 1
+            if tag == "script" and a.get("type") == "application/ld+json":
+                self._in_ld, self._ld_buf = True, ""
+        for k, v in a.items():
+            if k.lower() == "itemtype":
+                self.itemtypes.append(v)
+        if a.get("itemprop") == "applicationCategory" or a.get("itemProp") == "applicationCategory":
+            self._cur_prop = "applicationCategory"
+            self.app_category_text.append("")
+
+    def handle_endtag(self, tag):
+        if tag == "title":
+            self._in_title = False
+        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._h:
+            self.headings.append(tuple(self._h))
+            self._h = None
+        if tag in ("script", "style"):
+            self._skip -= 1
+            if tag == "script" and self._in_ld:
+                self.ld.append(self._ld_buf)
+                self._in_ld = False
+        if self._cur_prop and tag in ("span", "div", "p"):
+            self._cur_prop = None
+
+    def handle_data(self, d):
+        if self._in_title:
+            self.title += d
+        if self._h is not None:
+            self._h[1] += d
+        if self._in_ld:
+            self._ld_buf += d
+        if self._cur_prop:
+            self.app_category_text[-1] += d
+        if not self._skip:
+            self.text.append(d)
+
+
+def meta(p, key, val):
+    for m in p.metas:
+        if m.get(key) == val:
+            return m.get("content")
+    return None
+
+
+def norm(u):
+    u = (u or "").strip()
+    return u[:-1] if u.endswith("/") and urlparse(u).path == "/" else u
+
+
+# ---------------------------------------------------------------- discover pages
+pages = {}  # route -> file
+for f in glob.glob(ROOT + "/**/*.html", recursive=True):
+    rel = os.path.relpath(f, ROOT)[:-5]
+    if rel.startswith("_"):
+        continue
+    route = "/" if rel == "index" else "/" + rel
+    pages[route] = f
+
+# metadata/file routes produced by the build (.body files) + public files
+file_routes = set()
+for f in glob.glob(ROOT + "/**/*.body", recursive=True):
+    file_routes.add("/" + os.path.relpath(f, ROOT)[:-5])
+for f in glob.glob(ROOT + "/*.txt") + glob.glob(ROOT + "/*.xml") + glob.glob(ROOT + "/*.webmanifest"):
+    file_routes.add("/" + os.path.basename(f))
+if os.path.isdir(args.public):
+    for f in glob.glob(args.public + "/**/*", recursive=True):
+        if os.path.isfile(f):
+            file_routes.add("/" + os.path.relpath(f, args.public))
+
+parsed = {}
+for route, f in pages.items():
+    p = Page()
+    with open(f, encoding="utf8") as fh:
+        raw = fh.read()
+    p.feed(raw)
+    parsed[route] = (p, raw)
+
+# ---------------------------------------------------------------- sitemap / robots
+sm_path = os.path.join(ROOT, "sitemap.xml.body")
+sm_urls, sm_lastmods = [], []
+if os.path.exists(sm_path):
+    sm = open(sm_path, encoding="utf8").read()
+    for loc, rest in re.findall(r"<url>\s*<loc>(.*?)</loc>(.*?)</url>", sm, re.S):
+        sm_urls.append(loc)
+        m = re.search(r"<lastmod>(.*?)</lastmod>", rest)
+        sm_lastmods.append(m.group(1) if m else None)
+else:
+    add("FAIL", "sitemap.xml", "SITEMAP_MISSING", "sitemap.xml was not generated")
+
+rb_path = os.path.join(ROOT, "robots.txt.body")
+if os.path.exists(rb_path):
+    rb = open(rb_path, encoding="utf8").read()
+    if not re.search(r"(?im)^sitemap:\s*https?://", rb):
+        add("FAIL", "robots.txt", "ROBOTS_NO_SITEMAP", "robots.txt has no absolute Sitemap: line")
+    if re.search(r"(?im)^disallow:\s*/\s*$", rb):
+        add("FAIL", "robots.txt", "ROBOTS_BLOCKS_ALL", "robots.txt disallows the whole site")
+else:
+    add("FAIL", "robots.txt", "ROBOTS_MISSING", "robots.txt was not generated")
+
+site_origin = None
+home = parsed.get("/")
+if home:
+    c = [l.get("href") for l in home[0].links if l.get("rel") == "canonical"]
+    if c:
+        u = urlparse(c[0])
+        site_origin = f"{u.scheme}://{u.netloc}"
+
+# ---------------------------------------------------------------- per-page checks
+indexable = {}
+for route, (p, raw) in sorted(parsed.items()):
+    pg = route
+    title = htmllib.unescape(p.title.strip())
+    desc = htmllib.unescape(meta(p, "name", "description") or "")
+    robots = [m.get("content", "") for m in p.metas if m.get("name") == "robots"]
+    noindex = any("noindex" in r for r in robots)
+    if noindex and any(r.startswith("index") for r in robots):
+        add("FAIL", pg, "ROBOTS_CONFLICT", f"conflicting robots meta tags: {robots}")
+    if noindex:
+        continue
+    indexable[route] = True
+
+    # --- title
+    if not title:
+        add("FAIL", pg, "TITLE_MISSING", "no <title>")
+    elif len(title) > 65:
+        add("WARN", pg, "TITLE_LONG", f"title is {len(title)} chars (may be truncated): {title}")
+    elif len(title) < 15:
+        add("WARN", pg, "TITLE_SHORT", f"title is only {len(title)} chars: {title}")
+
+    # --- description
+    if not desc:
+        add("FAIL", pg, "DESC_MISSING", "no meta description")
+    else:
+        if desc.rstrip().endswith(("…", "...")):
+            add("FAIL", pg, "DESC_ELLIPSIS", "meta description ends with an ellipsis (cut mid-sentence)")
+        if len(desc) > 160:
+            add("WARN", pg, "DESC_LONG", f"meta description is {len(desc)} chars")
+        if len(desc) < 70:
+            add("WARN", pg, "DESC_SHORT", f"meta description is only {len(desc)} chars")
+
+    # --- canonical / og
+    canon = [l.get("href") for l in p.links if l.get("rel") == "canonical"]
+    ogurl = meta(p, "property", "og:url")
+    if len(canon) != 1:
+        add("FAIL", pg, "CANONICAL_COUNT", f"{len(canon)} canonical links (need exactly 1)")
+    elif not canon[0].startswith("http"):
+        add("FAIL", pg, "CANONICAL_RELATIVE", f"canonical is not absolute: {canon[0]}")
+    elif norm(canon[0]) != norm(ogurl):
+        add("WARN", pg, "CANONICAL_OG_MISMATCH", f"canonical {canon[0]} != og:url {ogurl}")
+    if canon and canon[0].startswith("http") and (urlparse(canon[0]).path.rstrip("/") or "/") != route:
+        add("FAIL", pg, "CANONICAL_NOT_SELF", f"canonical points elsewhere: {canon[0]}")
+    if canon and site_origin and not canon[0].startswith(site_origin):
+        add("FAIL", pg, "CANONICAL_HOST", f"canonical host differs from site origin {site_origin}")
+    for prop in ("og:title", "og:description", "og:image", "og:type", "og:site_name"):
+        if not meta(p, "property", prop):
+            add("FAIL", pg, "OG_MISSING", f"missing {prop}")
+    img = meta(p, "property", "og:image")
+    if img and not img.startswith("http"):
+        add("FAIL", pg, "OG_IMAGE_RELATIVE", f"og:image is not absolute: {img}")
+    elif img:
+        ipath = urlparse(img).path.rstrip("/")
+        if ipath not in file_routes:
+            add("FAIL", pg, "OG_IMAGE_MISSING", f"og:image has no built file/route: {ipath}")
+    if not meta(p, "name", "twitter:card"):
+        add("FAIL", pg, "TWITTER_CARD", "missing twitter:card")
+    if not p.html_lang:
+        add("FAIL", pg, "LANG_MISSING", "<html> has no lang attribute")
+    if not meta(p, "name", "viewport"):
+        add("FAIL", pg, "VIEWPORT_MISSING", "missing viewport meta")
+
+    # --- icons (site-wide, report once on home)
+    if route == "/":
+        rels = [(l.get("rel") or "") for l in p.links]
+        if not any("apple-touch-icon" in r for r in rels):
+            add("FAIL", pg, "APPLE_TOUCH_ICON", "no <link rel=\"apple-touch-icon\"> (explicit `icons` in layout.tsx overrides app/apple-icon.*)")
+        if not any(r in ("icon", "shortcut icon") for r in rels):
+            add("FAIL", pg, "FAVICON", "no favicon <link rel=\"icon\">")
+        if not any(r == "manifest" for r in rels):
+            add("WARN", pg, "MANIFEST", "no web manifest link")
+
+    # --- headings
+    h1 = [h for h in p.headings if h[0] == "h1"]
+    if len(h1) != 1:
+        add("FAIL", pg, "H1_COUNT", f"{len(h1)} <h1> elements (need exactly 1)")
+    prev = 0
+    for tag, text in p.headings:
+        lvl = int(tag[1])
+        if prev and lvl > prev + 1:
+            add("WARN", pg, "HEADING_SKIP", f"heading level jumps h{prev} -> h{lvl}: {text.strip()[:50]!r}")
+        prev = lvl
+        if re.search(r"\S\u2417\S", text):
+            add("FAIL", pg, "HEADING_BR", f"<br> glues words in <{tag}>: {text.replace(chr(0x2417), '<br>')[:60]!r}")
+
+    # --- images
+    for im in p.imgs:
+        if "alt" not in im:
+            add("FAIL", pg, "IMG_ALT", f"<img> without alt: {im.get('src', '')[:80]}")
+    ext = [im["src"] for im in p.imgs if im.get("src", "").startswith("http")]
+    if ext:
+        hosts = sorted({urlparse(u).netloc for u in ext})
+        add("WARN", pg, "THIRD_PARTY_IMAGES", f"{len(ext)} images load from third-party hosts: {hosts}")
+    if route.startswith("/projects/") and not [im for im in p.imgs if im.get("alt")]:
+        add("WARN", pg, "NO_CONTENT_IMAGE", "project page has no real <img> (only CSS placeholders)")
+
+    # --- visible placeholder text
+    body_text = re.sub(r"\s+", " ", " ".join(p.text))
+    for bad in ("localhost:3000", "lorem ipsum", "TODO", "undefined", "[object Object]"):
+        if bad in body_text:
+            add("FAIL" if bad != "localhost:3000" else "WARN", pg, "PLACEHOLDER_TEXT", f"visible text contains {bad!r}")
+
+    # --- structured data
+    types = []
+    if not p.ld and route != "/resume":
+        add("WARN", pg, "NO_JSONLD", "no JSON-LD on this page")
+    for blob in p.ld:
+        try:
+            data = json.loads(blob)
+        except Exception as e:  # noqa: BLE001
+            add("FAIL", pg, "JSONLD_INVALID", f"invalid JSON-LD: {e}")
+            continue
+        nodes = data["@graph"] if isinstance(data, dict) and "@graph" in data else [data]
+        if isinstance(data, dict) and "@context" not in data:
+            add("FAIL", pg, "JSONLD_CONTEXT", "JSON-LD block has no @context")
+        for n in nodes:
+            t = n.get("@type")
+            types.append(t)
+            if not t:
+                add("FAIL", pg, "JSONLD_TYPE", "JSON-LD node without @type")
+            if t == "BreadcrumbList":
+                pos = [i.get("position") for i in n.get("itemListElement", [])]
+                if pos != list(range(1, len(pos) + 1)):
+                    add("FAIL", pg, "BREADCRUMB_POS", f"breadcrumb positions not sequential: {pos}")
+            if t == "SoftwareSourceCode":
+                repo = n.get("codeRepository", "")
+                if not re.match(r"^https://github\.com/[^/]+/[^/]+/?$", repo):
+                    add("FAIL", pg, "CODE_REPO", f"codeRepository is not a repository URL: {repo}")
+                langs = n.get("programmingLanguage", [])
+                langs = langs if isinstance(langs, list) else [langs]
+                bad = [l for l in langs if str(l).strip().lower() not in PROGRAMMING_LANGUAGES]
+                if bad:
+                    add("FAIL", pg, "PROGRAMMING_LANGUAGE", f"programmingLanguage contains non-languages: {bad}")
+                if not langs:
+                    add("WARN", pg, "PROGRAMMING_LANGUAGE_EMPTY", "SoftwareSourceCode has no programmingLanguage")
+            if t == "SoftwareApplication":
+                for req in ("name", "description", "applicationCategory"):
+                    if not n.get(req):
+                        add("WARN", pg, "SOFTWAREAPP_FIELD", f"SoftwareApplication missing {req}")
+            for key in ("url", "item", "mainEntityOfPage", "image"):
+                v = n.get(key)
+                if isinstance(v, str) and v.startswith("/"):
+                    add("FAIL", pg, "JSONLD_RELATIVE_URL", f"{t}.{key} is relative: {v}")
+
+    # --- microdata sanity (applicationCategory must look like a category, not a badge)
+    for txt in p.app_category_text:
+        txt = txt.strip()
+        if txt and not VALID_APP_CATEGORIES.match(txt):
+            add("FAIL", pg, "MICRODATA_CATEGORY", f"microdata applicationCategory is not a category: {txt!r}")
+            break
+
+    # --- stale numbers like "across 10 real projects"
+    m = re.search(r"across (\d+) real projects", raw)
+    if m:
+        n_proj = len([r for r in pages if r.startswith("/projects/")])
+        if int(m.group(1)) != n_proj:
+            add("WARN", pg, "STALE_COUNT", f"text says {m.group(1)} projects but {n_proj} project pages exist")
+
+    # --- links
+    for a in p.anchors:
+        href = a.get("href", "")
+        if a.get("target") == "_blank" and "noopener" not in (a.get("rel") or ""):
+            add("WARN", pg, "NOOPENER", f"target=_blank without rel=noopener: {href[:70]}")
+        if href.startswith("#") and len(href) > 1:
+            if href[1:] not in p.ids:
+                add("FAIL", pg, "BROKEN_ANCHOR", f"in-page anchor {href} has no matching id")
+        elif href.startswith("/") and not href.startswith("//"):
+            path = urlparse(href).path.rstrip("/") or "/"
+            if path.startswith("/_next"):
+                continue
+            if path not in pages and path not in file_routes:
+                add("FAIL", pg, "BROKEN_LINK", f"internal link has no built target: {href}")
+
+# ---------------------------------------------------------------- duplicates
+seen_t, seen_d = collections.defaultdict(list), collections.defaultdict(list)
+for route in indexable:
+    p = parsed[route][0]
+    seen_t[htmllib.unescape(p.title.strip())].append(route)
+    seen_d[htmllib.unescape(meta(p, "name", "description") or "")].append(route)
+for t, routes in seen_t.items():
+    if len(routes) > 1 and t:
+        add("FAIL", ", ".join(routes), "DUPLICATE_TITLE", f"same <title> on {len(routes)} pages: {t}")
+for d, routes in seen_d.items():
+    if len(routes) > 1 and d:
+        add("FAIL", ", ".join(routes), "DUPLICATE_DESC", f"same meta description on {len(routes)} pages")
+
+# ---------------------------------------------------------------- sitemap vs pages
+sm_paths = {urlparse(u).path.rstrip("/") or "/" for u in sm_urls}
+for route in indexable:
+    if route not in sm_paths:
+        add("FAIL", route, "NOT_IN_SITEMAP", "indexable page is missing from sitemap.xml")
+for path in sm_paths:
+    if path not in pages:
+        add("FAIL", path, "SITEMAP_DEAD_URL", "sitemap lists a URL that has no built page")
+    elif path not in indexable:
+        add("FAIL", path, "SITEMAP_NOINDEX", "sitemap lists a noindex page")
+if site_origin:
+    for u in sm_urls:
+        if not u.startswith(site_origin):
+            add("FAIL", u, "SITEMAP_HOST", f"sitemap URL host differs from {site_origin}")
+if sm_urls:
+    if any(d is None for d in sm_lastmods):
+        add("WARN", "sitemap.xml", "SITEMAP_NO_LASTMOD", "some sitemap URLs have no <lastmod>")
+    elif len(set(sm_lastmods)) == 1:
+        add("WARN", "sitemap.xml", "SITEMAP_SAME_LASTMOD",
+            f"all {len(sm_urls)} URLs share one lastmod ({sm_lastmods[0][:10]}); Google ignores lastmod when it looks automated")
+    for d in sm_lastmods:
+        if d and not re.match(r"^\d{4}-\d{2}-\d{2}", d):
+            add("FAIL", "sitemap.xml", "SITEMAP_LASTMOD_FORMAT", f"bad lastmod {d}")
+
+# ---------------------------------------------------------------- internal link graph
+inbound = collections.defaultdict(set)
+for route, (p, _) in parsed.items():
+    for a in p.anchors:
+        href = a.get("href", "")
+        if href.startswith("/") and not href.startswith("//"):
+            path = urlparse(href).path.rstrip("/") or "/"
+            if path in pages and path != route:
+                inbound[path].add(route)
+for route in indexable:
+    n = len(inbound.get(route, ()))
+    if route != "/" and n < 2:
+        add("WARN", route, "FEW_INBOUND", f"only {n} internal page(s) link here")
+
+# ---------------------------------------------------------------- report
+order = {"FAIL": 0, "WARN": 1, "INFO": 2}
+findings.sort(key=lambda f: (order[f[0]], f[2], f[1]))
+fails = [f for f in findings if f[0] == "FAIL"]
+warns = [f for f in findings if f[0] == "WARN"]
+
+if args.json:
+    print(json.dumps({
+        "pages": sorted(pages), "indexable": sorted(indexable),
+        "fail": len(fails), "warn": len(warns),
+        "findings": [dict(severity=s, page=p, code=c, message=m) for s, p, c, m in findings],
+    }, indent=2))
+else:
+    by_code = collections.Counter((s, c) for s, _, c, _ in findings)
+    for s, p, c, m in findings:
+        print(f"{s:4s}  {c:24s} {p:40s} {m}")
+    print()
+    print(f"Pages built: {len(pages)} | indexable: {len(indexable)} | sitemap URLs: {len(sm_urls)}")
+    print(f"Result: {len(fails)} FAIL, {len(warns)} WARN")
+    if by_code:
+        print("Summary by check:")
+        for (s, c), n in sorted(by_code.items(), key=lambda x: (order[x[0][0]], x[0][1])):
+            print(f"  {s:4s} {c:24s} x{n}")
+
+sys.exit(1 if fails or (args.strict and warns) else 0)
+````
+
+---
+
+<a id="appendix-b"></a>
+
+# Appendix B — `scripts/self-host-icons.mjs`
+
+Used once in Phase 2 of [Part 2](#part-2). Save as `nitrajsinh-solanki/scripts/self-host-icons.mjs`. Needs Node 18+ and `npm i -D devicon@2.17.0 simple-icons` while it runs.
+
+````js
+#!/usr/bin/env node
+/**
+ * Self-host the tech-stack icons that TechStack.tsx currently loads from
+ * cdn.jsdelivr.net (devicon) and cdn.simpleicons.org (simple-icons).
+ *
+ * Run from the app folder (nitrajsinh-solanki/):
+ *   npm i -D devicon@2.17.0 simple-icons
+ *   node scripts/self-host-icons.mjs
+ *
+ * It scans app/components/TechStack.tsx for DI("name"[, "variant"]) and
+ * SI("slug"[, "hex"]) calls, copies each SVG into public/tech-icons/, and
+ * (for simple-icons) bakes the colour in, exactly like the CDN URL did.
+ * Exit code 1 if any icon cannot be found.
+ */
+import fs from "node:fs";
+import path from "node:path";
+
+const root = process.cwd();
+const srcFile = path.join(root, "app/components/TechStack.tsx");
+const outDir = path.join(root, "public/tech-icons");
+const diDir = path.join(root, "node_modules/devicon/icons");
+const siDir = path.join(root, "node_modules/simple-icons/icons");
+
+for (const [label, dir] of [["devicon", diDir], ["simple-icons", siDir]]) {
+  if (!fs.existsSync(dir)) {
+    console.error(`Missing ${label}. Run: npm i -D devicon@2.17.0 simple-icons`);
+    process.exit(1);
+  }
+}
+
+const src = fs.readFileSync(srcFile, "utf8");
+const di = new Map();
+const si = new Map();
+for (const m of src.matchAll(/\bDI\(\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?\s*\)/g)) {
+  const variant = m[2] ?? "original";
+  di.set(`${m[1]}-${variant}`, { name: m[1], variant });
+}
+for (const m of src.matchAll(/\bSI\(\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?\s*\)/g)) {
+  const hex = (m[2] ?? "ffffff").toLowerCase();
+  si.set(`si-${m[1]}-${hex}`, { slug: m[1], hex });
+}
+
+fs.mkdirSync(outDir, { recursive: true });
+const missing = [];
+let written = 0;
+
+for (const [key, { name, variant }] of di) {
+  const from = path.join(diDir, name, `${name}-${variant}.svg`);
+  if (!fs.existsSync(from)) {
+    if (!fs.existsSync(path.join(outDir, `${key}.svg`))) missing.push(`devicon: ${name}/${name}-${variant}.svg  (or add public/tech-icons/${key}.svg yourself)`);
+    continue;
+  }
+  fs.copyFileSync(from, path.join(outDir, `${key}.svg`));
+  written++;
+}
+for (const [key, { slug, hex }] of si) {
+  const from = path.join(siDir, `${slug}.svg`);
+  if (!fs.existsSync(from)) {
+    if (!fs.existsSync(path.join(outDir, `${key}.svg`))) missing.push(`simple-icons: ${slug}.svg  (or add public/tech-icons/${key}.svg yourself)`);
+    continue;
+  }
+  let svg = fs.readFileSync(from, "utf8");
+  if (!/\sfill=/.test(svg.split(">")[0])) svg = svg.replace("<svg ", `<svg fill="#${hex}" `);
+  fs.writeFileSync(path.join(outDir, `${key}.svg`), svg);
+  written++;
+}
+
+console.log(`devicon: ${di.size} unique | simple-icons: ${si.size} unique | written: ${written} -> public/tech-icons/`);
+if (missing.length) {
+  console.error("\nNOT FOUND (pick another icon, or keep this one on the CDN):");
+  for (const m of missing) console.error("  - " + m);
+  process.exit(1);
+}
+console.log("All icons found.");
+````
+
+---
+
+<a id="appendix-c"></a>
+
+# Appendix C — raw audit output
+
+**Pristine `main` @ `1b75d64` — 10 FAIL, 21 WARN**
+
+```text
+FAIL  APPLE_TOUCH_ICON         /                                        no <link rel="apple-touch-icon"> (explicit `icons` in layout.tsx overrides app/apple-icon.*)
+FAIL  MICRODATA_CATEGORY       /projects                                microdata applicationCategory is not a category: '🏆 $90 · 3rd Place'
+FAIL  PROGRAMMING_LANGUAGE     /projects/biomap                         programmingLanguage contains non-languages: ['Next.js 14', 'MongoDB']
+FAIL  PROGRAMMING_LANGUAGE     /projects/floris-restaurant              programmingLanguage contains non-languages: ['React 19', 'Vite', 'Tailwind CSS']
+FAIL  PROGRAMMING_LANGUAGE     /projects/library-inventory-system       programmingLanguage contains non-languages: ['Next.js', 'MongoDB']
+FAIL  PROGRAMMING_LANGUAGE     /projects/math-genius-ai                 programmingLanguage contains non-languages: ['Next.js', 'Google Gemini AI']
+FAIL  PROGRAMMING_LANGUAGE     /projects/meeting-insights-generator     programmingLanguage contains non-languages: ['React', 'Vite', 'Node.js']
+FAIL  PROGRAMMING_LANGUAGE     /projects/moodify                        programmingLanguage contains non-languages: ['Next.js 15', 'React 19', 'MongoDB']
+FAIL  PROGRAMMING_LANGUAGE     /projects/nft-marketplace-aptos          programmingLanguage contains non-languages: ['Aptos Blockchain', 'Move Language', 'Aptos CLI']
+FAIL  PROGRAMMING_LANGUAGE     /projects/rust-file-server               programmingLanguage contains non-languages: ['Cargo', 'walkdir']
+WARN  NO_CONTENT_IMAGE         /projects/biomap                         project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/floris-restaurant              project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/hourbit                        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/ice-saathi                     project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/ice-saathi-delivery-app        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/library-inventory-system       project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/math-genius-ai                 project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/meeting-insights-generator     project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/moodify                        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/nft-marketplace-aptos          project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/rust-file-server               project page has no real <img> (only CSS placeholders)
+WARN  PLACEHOLDER_TEXT         /projects/ice-saathi-delivery-app        visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/library-inventory-system       visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/math-genius-ai                 visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/meeting-insights-generator     visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/moodify                        visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/nft-marketplace-aptos          visible text contains 'localhost:3000'
+WARN  PLACEHOLDER_TEXT         /projects/rust-file-server               visible text contains 'localhost:3000'
+WARN  SITEMAP_SAME_LASTMOD     sitemap.xml                              all 15 URLs share one lastmod (2026-10-19); Google ignores lastmod when it looks automated
+WARN  STALE_COUNT              /                                        text says 10 projects but 11 project pages exist
+WARN  THIRD_PARTY_IMAGES       /                                        46 images load from third-party hosts: ['cdn.jsdelivr.net', 'cdn.simpleicons.org']
+
+Pages built: 15 | indexable: 15 | sitemap URLs: 15
+Result: 10 FAIL, 21 WARN
+Summary by check:
+  FAIL APPLE_TOUCH_ICON         x1
+  FAIL MICRODATA_CATEGORY       x1
+  FAIL PROGRAMMING_LANGUAGE     x8
+  WARN NO_CONTENT_IMAGE         x11
+  WARN PLACEHOLDER_TEXT         x7
+  WARN SITEMAP_SAME_LASTMOD     x1
+  WARN STALE_COUNT              x1
+  WARN THIRD_PARTY_IMAGES       x1
+```
+
+**After all tested fixes — 0 FAIL, 12 WARN**
+
+```text
+WARN  NO_CONTENT_IMAGE         /projects/biomap                         project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/floris-restaurant              project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/hourbit                        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/ice-saathi                     project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/ice-saathi-delivery-app        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/library-inventory-system       project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/math-genius-ai                 project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/meeting-insights-generator     project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/moodify                        project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/nft-marketplace-aptos          project page has no real <img> (only CSS placeholders)
+WARN  NO_CONTENT_IMAGE         /projects/rust-file-server               project page has no real <img> (only CSS placeholders)
+WARN  SITEMAP_SAME_LASTMOD     sitemap.xml                              all 15 URLs share one lastmod (2026-10-19); Google ignores lastmod when it looks automated
+
+Pages built: 15 | indexable: 15 | sitemap URLs: 15
+Result: 0 FAIL, 12 WARN
+Summary by check:
+  WARN NO_CONTENT_IMAGE         x11
+  WARN SITEMAP_SAME_LASTMOD     x1
+```
-- 
2.43.0