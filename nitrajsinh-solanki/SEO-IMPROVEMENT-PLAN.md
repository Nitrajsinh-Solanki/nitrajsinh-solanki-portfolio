# SEO Improvement Plan

| | |
|---|---|
| **Site** | [https://nitrajsinh-solanki.vercel.app](https://nitrajsinh-solanki.vercel.app) |
| **Code** | `nitrajsinh-solanki/` (Next.js 16.2.6 App Router, React 19, Tailwind 4) |
| **Audited commit** | `7c45a84` on `main` — “Improve homepage text-to-code ratio” (2026-10-18) |
| **Prepared** | 2026-10-19 |
| **Branch scope** | Documentation only. No application code is changed by this plan. |

## How to read this document

Claims are tagged by evidence:

| Tag | Meaning |
|---|---|
| **[V] Verified** | Reproduced from repository source or a production build run on 2026-10-19. |
| **[T] Tested** | Fix was applied to a scratch copy, rebuilt, and checked. |
| **[I] Needs your input** | Only the owner can confirm the answer; see [Section 10](#10-decisions-needed-from-you). |
| **[N] Not verifiable from the repo** | Measure with the tool named in the plan. |

---

## 1. TL;DR

1. **The on-page basics are already in good shape** [V]: unique titles/descriptions, canonicals, Open Graph, JSON-LD, sitemap, robots, image alt text, and one `h1` per page. Rewriting these from scratch is not the best next step. See [Section 3](#3-what-is-already-in-place-do-not-redo).
2. **A scripted audit of a local production build reports 30 failed checks** [V]. These group into: descriptions ending with “…” (12 of 15 pages), no image on any of the 11 project pages, invalid `codeRepository` schema on two pages, three headings whose words are glued together by `<br>`, 46 third-party icon requests, and identical sitemap `lastmod` values. See [Appendix A](#appendix-a-audit-script-and-baseline).
3. **The biggest unknowns are not fixed by code alone.** Search indexing, the shared `vercel.app` domain, name disambiguation, and inbound links require Search Console, owner decisions, and external profile updates. See [Section 5](#5-measure-first-no-code) and [Section 8](#8-off-site-and-entity-plan).
4. **Public facts conflict** [V]: the portfolio says CGPA 7.43, while the GitHub profile README says 7.90. GitHub uses “Solanki Nitrajsinh Rajusinh”, while the site does not. Resolve factual inconsistencies before adding more entity signals. See [Section 10](#10-decisions-needed-from-you).
5. **Set realistic goals.** Aim to rank for the owner’s name, get all 15 indexable URLs discovered and indexed, and improve long-tail project visibility. Broad terms such as “full stack developer Gujarat” are competitive; no ranking is guaranteed. See [Section 12](#12-success-metrics-and-timeline).

## 2. Scope, method and limits

### What was done

- Reviewed SEO-related repository files: `lib/site.ts`, `lib/seo.ts`, `lib/schema.ts`, `lib/profile.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `next.config.ts`, `vercel.json`, pages/components, `public/`, and the CI workflow.
- Built the application and parsed generated HTML for 15 intended indexable URLs: home, about, projects, resume, and 11 project pages. Also inspected sitemap, robots, manifest, and `llms.txt` output.
- Searched the web for the name and domain.
- Tested proposed code fixes in a scratch copy only; no application fixes are included in this documentation-only change.

### Limits

| Limit | Consequence |
|---|---|
| The audit environment could not fetch `*.vercel.app`. | The audit reflects a local build of `main`, not verified live production output. |
| No access to Search Console, Bing Webmaster Tools, analytics, or Vercel. | Indexing, queries, rankings, backlinks, and Core Web Vitals field data remain **[N]**. |
| Google Fonts was blocked in the build sandbox. | The local build stubbed three `next/font/google` imports; metadata and HTML checks are unaffected, but font-loading performance was not audited. |
| The search tool is not Google. | Failure to find the portfolio in a search is not evidence it is missing from Google. Check Search Console. |
| No repository credentials were available in the original audit sandbox. | The original audit did not push a branch. This plan is documentation; implementation changes should follow the rollout plan. |

## 3. What is already in place (do not redo)

All items below were verified in source and generated HTML [V].

| Area | Evidence |
|---|---|
| Unique title and meta description per page | 15/15 pages. Titles are 44–60 characters. Template: `%s | Nitrajsinh Solanki` in `app/layout.tsx`. |
| Canonical URL | Exactly one absolute canonical per page, derived from `SITE_URL` in `lib/site.ts`. |
| Open Graph and Twitter cards | Every page. Each project has a generated image at `/projects/<slug>/opengraph-image`. |
| JSON-LD | Home: `WebSite` + `Person`; About: `ProfilePage` + `Person` + breadcrumb; Projects: `CollectionPage` + `ItemList` + breadcrumb; project pages: `SoftwareApplication` (+ `SoftwareSourceCode`) + breadcrumb. JSON parses and `<` is escaped. |
| Sitemap and robots | 15 sitemap URLs; robots allows crawling and references sitemap. |
| Headings | Exactly one `h1` per page. |
| Image alt text | 47/47 home-page images have `alt`. |
| Rendering | Server-rendered content; reveal animations are progressive enhancement and do not hide content before JavaScript (`MotionEnhancer.tsx`). |
| Preview URL protection | `vercel.json` deploys only `main`, avoiding indexable preview URLs. |
| Locale and metadata | `lang="en-IN"`, viewport, theme colour, web manifest, branded SVG favicon. |
| Resume PDF | Includes title, author, subject, and keywords metadata. |
| Other files | `llms.txt` and `llms-full.txt` exist. No reliable evidence was found that they improve Google rankings. |
| Search Console file | `public/google2da5ac569292214b.html` exists; actual property verification is **[N]**. |

## 4. Findings at a glance

Priority: **P0** measure first/no code; **P1** first implementation PR; **P2** polish; **P3** longer-term. Impact is an estimate, not a promise.

| ID | Priority | Finding | Estimated impact | Evidence / input |
|---|---|---|---|---|
| M1–M5 | P0 | Indexing, query performance, speed, and rich-result status are unknown. | Decisive | [N], no owner decision needed |
| C4 | P1 | All 11 project pages have zero real images. | High | [V], owner permission needed |
| C6 | P1 | Public name variants and facts differ; `ALTERNATE_NAMES` is empty. | High | [V][I] |
| C7 | P1 | Positioning is inconsistent (“MERN Stack Developer” vs “Full-Stack Developer”; “Engineer Intern” vs “Developer Intern”). | Medium | [V][I] |
| C3 | P1 | 12 of 15 meta descriptions end in a cut-off “…” | Low–medium, mainly click-through | [V][T] |
| C2 | P1 | `SoftwareSourceCode.codeRepository` points to the GitHub profile on two pages. | Low–medium data quality | [V][T][I] |
| C1 | P1 | Three headings join text across `<br>` in text-only extraction. | Low | [V][T] |
| C5 | P1 | Duplicate resume PDF has identical SHA-256. | Low | [V] |
| C8 | P1 | Every sitemap URL has the same hand-edited `lastmod`. | Low | [V][T] |
| O1 | P1 | Site uses shared `vercel.app` domain. | Potentially high over time | [V][I] |
| O2 | P1 | Backlinks from owner’s profiles/repos are incomplete or unverified. | Potentially high | [N] |
| C9 | P2 | 46 images load from two third-party hosts (41 unique icons). | Low–medium speed/reliability | [V] |
| C10 | P2 | 404 page emits contradictory robots directives. | Low | [V][T] |
| C11 | P2 | `app/apple-icon.svg` is unsupported; no apple-touch-icon is emitted. | Low | [V] |
| C12 | P2 | Project pages have few contextual internal links. | Low | [V] |
| C13 | P2 | Structured-data refinements need validation and owner facts. | Low | [V][N][I] |
| C14 | P2 | Repo hygiene: unused starter SVGs, duplicate verification file, generic READMEs. | Low–medium | [V] |
| C15 | P2 | Performance baseline is unmeasured; home HTML is about 355 KB and JS is about 215 KB gzip. | Unknown until measured | [V][N] |
| CT | P3 | No long-form case studies/blog. | Potentially high long-term | [V][I] |

## 5. Measure first (no code)

Collect a baseline before changes so improvements can be attributed to actual work. Track outcomes in [Section 12](#12-success-metrics-and-timeline).

### M1. Google Search Console: confirm indexing [N]

1. Confirm a property exists for `https://nitrajsinh-solanki.vercel.app/`. The verification file `public/google2da5ac569292214b.html` is present [V], but property verification is unknown.
2. Open **Sitemaps**, submit `sitemap.xml`, and record discovered URLs (expected: 15).
3. Use **URL Inspection** on `/`, `/about`, `/projects`, and `/projects/biomap`. Request indexing for eligible URLs that are not indexed.
4. In **Pages**, record indexed URL count and exclusion reasons. “Discovered – currently not indexed” or “Crawled – currently not indexed” for project pages may indicate that richer unique project content is needed (C4 and CT).
5. In **Performance**, filter queries containing `nitrajsinh` and `solanki`; record impressions, clicks, and average position.

### M2. Bing Webmaster Tools [N]

Add the site by importing it from Search Console. `BING_SITE_VERIFICATION` is empty in `.env.example` [V] and can remain empty if import-based verification is used.

### M3. Speed baseline [N]

Run PageSpeed Insights on mobile and desktop for `/`, `/projects`, and `/projects/biomap`. Record LCP, INP, CLS, and Lighthouse Performance/SEO scores. CrUX field data appears only with sufficient traffic. Do not make speculative speed changes before measuring (see C15).

### M4. Structured-data validation [N]

Run the Rich Results Test and Schema Markup Validator at `validator.schema.org` for `/`, `/about`, `/projects/biomap`, and `/projects/ice-saathi`. Record errors/warnings, especially for `SoftwareApplication` (C13).

### M5. Query baseline [N]

In a private browsing window, record where the site appears, or whether it appears, for these hypotheses. Replace them with real Search Console queries after 2–4 weeks.

| Type | Query |
|---|---|
| Brand | `Nitrajsinh Solanki` |
| Brand | `Nitrajsinh Solanki portfolio` |
| Brand + role | `Nitrajsinh Solanki full stack developer` |
| Brand variant | `Solanki Nitrajsinh Rajusinh` — only if approved in D1 |
| Project long-tail | `Aptos NFT marketplace Move auctions royalties` |
| Project long-tail | `HTTP file server from scratch in Rust no framework` |
| Project long-tail | `library management system Next.js Gemini AI roles` |
| Broad and competitive | `full stack developer Gujarat` |

## 6. Code tasks

Before editing Next.js APIs, read the installed version’s docs in `node_modules/next/dist/docs/`; the repository’s `AGENTS.md` notes breaking changes for this Next.js version.

Tasks are independent unless stated. Implementation PRs should run `npm run lint && npm run build` and the audit script in Appendix A.

### C1. Headings glued by `<br>` — P1 [V][T]

**Problem.** Three headings put a line break between words without whitespace, so text-only extraction can yield a joined token:

| Heading | Current text content | Source |
|---|---|---|
| Home `h1` | `NitrajsinhSolanki` | `app/components/Hero.tsx:91` |
| Services `h2` | `Services &Expertise` | `app/components/Services.tsx:151` |
| Services CTA `h3` | `Got a project in mind?Let's build it together.` | `app/components/Services.tsx:346` |

Browsers display a line break and Googlebot’s rendered view may be fine, but simple crawlers and text extractors can glue tokens together.

**Fix:** include `{" "}` immediately before each `<br />`, for example:

```tsx
<span style={{ color: "#17191D" }}>Nitrajsinh</span>{" "}
<br />
<span style={{ color: "#4F46E5" }}>Solanki</span>
```

The Hero edit was built and checked in a scratch copy [T]. Apply the equivalent one-token fix to the two Services headings.

**Done when:** the audit reports no heading with a `<br>` lacking surrounding whitespace.

### C2. Invalid `codeRepository` project schema — P1 [V][T]

**Problem.** `app/projects/[slug]/page.tsx` treats the first link with `icon: "github"` as a source repository. For `ice-saathi` and `ice-saathi-delivery-app`, that link is the GitHub profile URL (`https://github.com/Nitrajsinh-Solanki`), not a repo [V]. The page incorrectly emits `SoftwareSourceCode.codeRepository` and a “View Source Code” button to the profile.

**Fix:** only accept real repository URLs:

```tsx
const GITHUB_REPO = /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/;
const repoUrl = project.links.find(
  (link) => link.icon === "github" && GITHUB_REPO.test(link.href)
)?.href;
```

In scratch testing [T], the two affected pages no longer emit `SoftwareSourceCode`; real repositories such as BioMap still do. Since the button is conditional on `repoUrl`, it disappears for those two projects.

**Owner decision D8:** the sidebar “Links” list may still link to the profile for these projects. Decide whether to relabel it “GitHub profile”, remove it if the repos are private, or replace it with the actual repository.

**Done when:** the audit finds no `codeRepository` value that is not a repo URL.

### C3. Meta descriptions cut off with “…” — P1 [V][T]

**Problem.** `truncate()` in `lib/seo.ts` hard-cuts descriptions at 158 characters and appends an ellipsis. Twelve of 15 descriptions end mid-thought. Project descriptions are written for the page body (149–194 characters) and reused as metadata. A meta description is not a direct ranking factor; it can affect snippet appeal, and Google may rewrite it.

**Fix:**
1. Add a dedicated `seoDescription` field to the `Project` interface in `app/projects/data.ts`. Target 120–155 characters, a complete sentence, no trailing ellipsis; use it for meta, Open Graph and Twitter.
2. In `generateMetadata` in `app/projects/[slug]/page.tsx`, use `description: project.seoDescription`. Keep the existing `description` for page content and JSON-LD.
3. Replace the descriptions in About, Projects, and Resume with the suggested copy in [Section 7](#7-proposed-meta-descriptions).
4. Keep `truncate()` as a safety net and add a development warning to `pageMetadata` when `desc.length > 160`.

Suggested strings in Section 7 were drafted from current `data.ts` and `profile.ts` facts and measured at 136–152 characters. Owner should confirm accuracy before publication.

**Done when:** the audit finds no description ending with an ellipsis.

### C4. Add real images to project pages — P1 [V]

**Problem.** None of the 11 project entries sets the optional `image` field [V], so project pages contain no real `<img>`. The hero is a CSS-gradient placeholder. The template already supports `project.image` using `next/image` and schema image metadata.

**Fix:**
1. Capture one genuine screenshot per project: use live apps (BioMap, Floris, Ice Saathi, HourBit) where possible; otherwise use frames from demos or local runs.
2. Export WebP at 1200×630 and target ≤150 KB to `public/projects/<slug>.webp`.
3. Set `image: "/projects/<slug>.webp"` for each project in `data.ts`.
4. Add per-project `imageAlt?: string` describing the actual screenshot and use `alt={project.imageAlt ?? project.title + " screenshot"}` in `app/projects/[slug]/page.tsx`.
5. Optionally use these images in `pageMetadata({ image })` so social previews show the real UI.

**Owner decision D10:** confirm that screenshots of Aman Sales and Floris client work may be shown publicly.

**Done when:** the audit finds an image on every project page.

### C5. Delete duplicate resume PDF — P1 [V]

`public/Nitrajsinh_Solanki_Resume (5).pdf` is byte-identical to `Nitrajsinh_Solanki_Resume.pdf` (same SHA-256 prefix `4065207e…2c1fb3`) and is unreferenced [V]. Remove the duplicate:

```bash
git rm "nitrajsinh-solanki/public/Nitrajsinh_Solanki_Resume (5).pdf"
```

If the exact old URL has been shared, add a 301 redirect. Redirect syntax was not tested: parentheses require careful escaping in Next.js redirect source patterns.

### C6. Name variants and `alternateName` — P1 [V][I]

`ALTERNATE_NAMES` in `lib/site.ts` is empty [V]. It is already wired to three outputs: `Person.alternateName` in JSON-LD, a sentence on `/about`, and `llms.txt`.

The GitHub profile README uses “Solanki Nitrajsinh Rajusinh”, and a GEC Patan directory lists “NITRAJSINH SOLANKI”. If the formal version is genuinely used publicly, add it:

```ts
// lib/site.ts
export const ALTERNATE_NAMES: string[] = ["Solanki Nitrajsinh Rajusinh"];
```

**Decision D1:** include only spelling variants the owner actually uses and wants associated publicly.

### C7. Make positioning consistent — P1 [V][I]

The site currently mixes these labels:

| What | Value | Location |
|---|---|---|
| Hero role label | “MERN Stack Developer” | `Hero.tsx`, hard-coded `displayed` |
| Title, description, schema | “Full-Stack Developer” | `layout.tsx`, `lib/profile.ts` |
| Intern title | “Full Stack Engineer Intern” | `lib/profile.ts` (two places), `WorkHistory.tsx:44` |
| Intern title | “Full Stack Developer Intern” | `About.tsx:141` |

**Fix after decisions D5 and D9:** update the hard-coded role in `Hero.tsx`, plus `About.tsx:141` and `WorkHistory.tsx:44`, to match the agreed wording and `profile.role.title`. Keep large profile data modules out of the homepage bundle; do not import `profile.ts` into Hero.

**Related consistency guard:** `stats.ts` hard-codes project category and live totals which are intended to match `PROJECTS`. They match now (11 total; 7 hackathon, 3 client, 1 personal, 4 live) [V], but are not enforced. Replace the final `export { STATS } from "./stats";` in `data.ts` with an import and assertion:

```ts
import { STATS } from "./stats";

const countBy = (category: ProjectCategory) =>
  PROJECTS.filter((p) => p.category === category).length;
const liveCount = PROJECTS.filter((p) =>
  p.links.some((l) => l.icon === "live")
).length;

if (
  PROJECTS.length !== STATS.total ||
  countBy("hackathon") !== STATS.hackathon ||
  countBy("client") !== STATS.client ||
  countBy("personal") !== STATS.personal ||
  liveCount !== STATS.live
) {
  throw new Error("app/projects/stats.ts is out of sync with PROJECTS in data.ts");
}

export { STATS };
```

This guard passed with correct values and failed in scratch testing when `total` was changed to 12 [T].

### C8. Honest sitemap `lastmod` — P1 [V][T]

**Problem.** All 15 sitemap URLs share `2026-10-15`, from a hand-edited `LAST_UPDATED` in `lib/site.ts` [V]. Google uses `lastmod` only when it is consistently trustworthy; identical dates for all pages can appear automated.

**Fix:** track update dates per static page and per project. Add `updated: string` (ISO `YYYY-MM-DD`) to the project type/data, then derive the sitemap dates:

```ts
import type { MetadataRoute } from "next";
import { PROJECTS } from "./projects/data";
import { abs } from "@/lib/site";

const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-10-15",
  "/about": "2026-10-15",
  "/projects": "2026-10-15",
  "/resume": "2026-10-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(PAGE_UPDATED).map(([path, date]) => ({
      url: abs(path),
      lastModified: new Date(date),
    })),
    ...PROJECTS.map((project) => ({
      url: abs("/projects/" + project.slug),
      lastModified: new Date(project.updated),
    })),
  ];
}
```

The pattern built and emitted per-URL `lastmod` in scratch testing [T]. Dates must be changed only when the corresponding page content actually changes. Since project content lives in one file, its git history cannot serve as a per-project timestamp.

**Done when:** the audit confirms more than one unique `lastmod` value after dates are set appropriately.

### C9. Self-host tech-stack icons — P2 [V]

**Problem.** The homepage loads 46 `<img>` elements from `cdn.jsdelivr.net` (22) and `cdn.simpleicons.org` (24), covering 41 unique icons [V]. They are lazy-loaded and have dimensions plus an `onError` fallback; this is not a broken image defect, but creates external origins and dependencies.

**Measure M3 first.** If speed is a concern, download each used SVG to `public/tech/` after checking the relevant license files. The tested URL extraction was:

```bash
npm run build
grep -o 'src="https://cdn[^"]*"' .next/server/app/index.html \
  | sed 's/src="//;s/"$//' | sort -u > /tmp/icons.txt
mkdir -p public/tech
while read -r url; do
  case "$url" in
    *jsdelivr*)    f="di-$(basename "$url")" ;;
    *simpleicons*) f="si-$(echo "$url" | sed 's#.*simpleicons.org/##; s#/#-#g').svg" ;;
  esac
  curl -fsSL "$url" -o "public/tech/$f"
done < /tmp/icons.txt
```

Update `TechStack.tsx` helpers to use local paths, then confirm all expected assets exist and no homepage images come from third-party hosts. Devicon and Simple Icons are open-source projects, but brand trademarks remain with their owners.

**Done when:** no homepage `img` sources point to third-party hosts.

### C10. 404 robots directives — P2 [V][T]

The built 404 contains Next.js `noindex` plus inherited `index, follow` [V]. The restrictive directive wins, but the metadata is contradictory.

Add `app/not-found.tsx` with explicit noindex metadata and links home / to projects:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4">
        <Link href="/projects" className="underline">Browse projects</Link> or{" "}
        <Link href="/" className="underline">go home</Link>.
      </p>
    </main>
  );
}
```

Scratch testing showed both emitted robots tags state `noindex`, removing the contradiction [T].

### C11. apple-touch-icon — P2 [V]

`app/apple-icon.svg` is not among the supported Next.js apple-icon formats listed in the installed docs (JPEG/PNG), so no `apple-touch-icon` link is emitted [V]. Export a 180×180 `app/apple-icon.png` from the existing icon artwork and remove the SVG. The manifest currently lists SVG icons; 192/512 PNGs may help installability but are not an SEO factor.

### C12. Contextual internal links on project pages — P2 [V]

All projects are discoverable from `/projects`, so crawl paths exist. Individual project pages mostly link to previous/next, all projects, and social profiles; the custom footer does not link to About or Resume.

Add About / Resume / Projects links in the project-page footer. Also add a “More projects” section with 2–3 related projects sharing technology, linking with descriptive project-title anchor text.

### C13. Structured-data refinements — P2 [V][N][I]

1. **ProfilePage dates.** `profilePageGraph()` in `lib/schema.ts` has no `dateCreated` or `dateModified`. Use C8’s per-page `updated` value for `dateModified`; the original publish date for `dateCreated` requires owner confirmation.
2. **Employer URL.** `Person.worksFor` names “VeloxCore Private Limited” but has no URL and none is in the repo [V]. Add a URL only if the employer has a confirmed public site.
3. **SoftwareApplication eligibility [N].** Google’s software-app rich result may require offers/price plus ratings or reviews. Validate with M4. Never invent a rating or review. If validation reports errors and the rich result is not appropriate, consider `CreativeWork` while retaining valid author/keywords/image fields; only add a zero-price Offer to apps that are genuinely free to use (HourBit’s description says “Free”).

### C14. Repository hygiene and backlinks — P2 [V]

- Remove unused create-next-app assets `public/next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, and `window.svg` after confirming no references in `app/`, `lib/`, or config.
- Delete the unserved root-level `google2da5ac569292214b.html` duplicate (it differs only by a trailing newline). Keep `public/google2da5ac569292214b.html` as long as that verification method is in use.
- Replace the nested app’s default `README.md` with a concise description, live-site link, tech stack, and local run instructions. Do likewise for public project repos, linking to their related case-study pages. A good README can serve as a legitimate backlink and useful documentation.

### C15. Performance — measure before optimising [V][N]

Build facts [V]: home HTML is about 355 KB (including about 55 KB inline CSS; visible text about 12 KB); 12 script files total roughly 732 KB raw / 215 KB gzip; 47 images, 46 lazy-loaded. The hero portrait is already marked priority and served as AVIF/WebP. Whether users are affected is **[N]**; use M3. If measurements indicate a problem, examine C9 first, then the large inline `<style jsx global>` in `Hero.tsx`. Avoid blind optimisation.

## 7. Proposed meta descriptions

These drafts are based on current `data.ts` and `profile.ts` facts; the owner should verify each sentence before it ships.

| Page | Proposed description | Chars |
|---|---|---:|
| `/about` | Nitrajsinh Solanki is a full-stack developer from Gujarat, India: Full Stack Engineer Intern at VeloxCore and StackUp hackathon prize winner. | 141 |
| `/projects` | 11 projects by Nitrajsinh Solanki: StackUp hackathon winners, Aptos blockchain apps, AI tools and live client platforms. $250+ in prizes. | 137 |
| `/resume` | Resume of Nitrajsinh Solanki: Full Stack Engineer Intern at VeloxCore with Next.js, ASP.NET Core, Angular and Flutter skills, education and awards. | 147 |
| `library-inventory-system` | Role-based library system (Admin, Librarian, User) with borrowing, automatic fines, email OTP and Gemini AI. 3rd place, StackUp Hackathon. | 138 |
| `biomap` | BioMap unifies biodiversity maps, chemistry data and NASA media from 6 public APIs in one Next.js app. 4th place, StackUp May 2025 Challenge. | 141 |
| `nft-marketplace-aptos` | NFT marketplace on Aptos built with Move smart contracts: auctions, royalties, offers, batch transfers and creator tips. $60 StackUp bounty. | 140 |
| `moodify` | Moodify is an AI music app that recommends tracks by location and weather with Gemini and streams from Jamendo, Deezer and Audius. StackUp merit prize. | 151 |
| `math-genius-ai` | Math Genius AI is a learning platform with adaptive quizzes, handwriting recognition, an AI tutor and PDF reports. StackUp Hackathon merit prize. | 145 |
| `meeting-insights-generator` | Multimodal GenAI app that transcribes meeting audio, summarizes it, fetches Pexels visual highlights and reads summaries back as speech. | 136 |
| `rust-file-server` | HTTP file server written from scratch in Rust with a custom request parser over raw TCP and no web framework. First to finish the StackUp Rust bounty. | 150 |
| `floris-restaurant` | Production website for Floris Restaurant & Banquet in Patan: a React 19 and Vite single-page site with menu, gallery and booking call to action. | 144 |
| `ice-saathi` | Next.js platform for Aman Sales, a wholesale ice distributor in Gandhidham: customers, subscriptions, billing, deliveries and the API for a Flutter app. | 152 |
| `ice-saathi-delivery-app` | Flutter app for Aman Sales delivery partners with OTP login, live GPS tracking, order management and FCM push notifications for new assignments. | 144 |
| `hourbit` | HourBit is a free Next.js productivity suite: work-hours tracker with leave prediction, brain quiz, diary, typing test and expense tracker. | 139 |

The home page description (150 characters, with no ellipsis) was already in good shape [V].

## 8. Off-site and entity plan

On-page code cannot answer whether the site has authoritative links or whether search engines associate the right public profiles with this person. “Solanki” is common; the audit’s non-Google search was only a hint, not proof of Google visibility. Verify with Search Console (M1 and M5).

### O1. Custom domain — P1 [V] feasibility, [I] decision

**Why:** a custom domain provides a stable hostname the owner controls. A `vercel.app` site can still be indexed; a custom domain is a long-term branding and ownership choice, not evidence of a current indexing block.

**Feasibility:** the current host is configured in one place: the default of `NEXT_PUBLIC_SITE_URL` in `lib/site.ts`. Canonicals, Open Graph, JSON-LD, sitemap, robots, and `llms.txt` derive from it.

Once a domain is owned (D6):

1. Add it in Vercel → Project → Domains and make it primary.
2. Set `NEXT_PUBLIC_SITE_URL=https://<new-domain>` in Vercel Production and redeploy.
3. Redirect the old host permanently. Merge any rule into existing `vercel.json`; host matching syntax must be confirmed in Vercel docs before deployment.
4. Add the new domain in Search Console (DNS verification for a Domain property), submit the sitemap, and retain the old property while old URLs leave the index.
5. Keep URL paths unchanged.
6. Update profile links from O2 after the domain is final, so they are edited only once.

### O2. Make profiles link back — P1 [N]

The site’s JSON-LD declares GitHub, LinkedIn, X, and Medium in `sameAs` [V]. Keep those declarations aligned with actual profile links.

| Profile / location | Action | Status in audit |
|---|---|---|
| GitHub profile README (`Nitrajsinh-Solanki/Nitrajsinh-Solanki`) | Confirm portfolio URL is current; link top three case studies. | Check |
| This portfolio repo | Set GitHub Website field, add topics, and replace generic README (C14). | Do |
| Each public project repo | Set Website to the case-study URL or live app; add a case-study link to README. Candidate repos: `library-inventory-system`, `biomap`, `aptos4-bounty-nft`, `hackathon_may_stackup`, `hackathon-feb`, `Meeting-Genius`, `simple-file-server`, `floris-restaurant`. Public status is [N]. | Do |
| LinkedIn | Add site in Contact info; feature portfolio and top three projects; align headline with D5. | Check |
| X (`@Nitrajsinh_S`) and Medium | Add portfolio URL to bio. | Check |
| StackUp | Link portfolio; relevant hackathon-result pages that name the owner can be useful mentions. | Check |
| SoftVibe Services | Confirm identity/relationship first (D7). | Decide |

Use one consistent bio once D5 is decided:

> Nitrajsinh Solanki: full-stack developer from Gujarat, India. {role} at VeloxCore. {2–4 core technologies}. Portfolio: {URL}

## 9. Content plan — CT, P3 [I]

There is no blog route in the current build [V]. Portfolio pages are short and have similar structure. Original case studies can target specific queries and offer other sites something substantive to link to.

Potential topics, based on existing project data; publish only details the owner can truthfully confirm:

1. Role-based access in a library system: NextAuth, JWT and email OTP.
2. Combining six public APIs in one Next.js app (BioMap).
3. A file server from scratch in Rust: parsing HTTP over raw TCP.
4. An NFT marketplace in Move on Aptos: auctions and royalties.
5. Background location and FCM push in a Flutter delivery app.

Suggested implementation: create `app/blog/[slug]/page.tsx` with MDX or typed data; add posts and truthful `lastModified` dates to the sitemap; add `Article` JSON-LD with `headline`, `datePublished`, `dateModified`, `image`, and author `{ "@id": PERSON_ID }` (exported by `lib/schema.ts`). Link each post to its project page and repository with descriptive anchors. Publish first-party content first. If importing to Medium, verify that its import UI sets the original canonical URL. Do not pad posts to reach arbitrary word counts.

## 10. Decisions needed from you

The code should not guess these personal or business facts.

| ID | Question | Why it matters |
|---|---|---|
| **D1** | Which spellings of your name should be public? Should the formal name be added to `ALTERNATE_NAMES`? | GitHub README uses “Solanki Nitrajsinh Rajusinh”; site does not. |
| **D2** | Which CGPA is correct: 7.43 or 7.90? Correct the wrong public source. | Portfolio says 7.43 (`lib/profile.ts`, `About.tsx`); GitHub profile README says 7.90. |
| **D3** | Are you currently a student or a graduate? | Portfolio says “2022 – May 2026” and B.E. at GEC Patan; profile snippets may be stale. Current date is 2026-10-19. |
| **D4** | Do you want to publish a city? | `LOCATION.city` is empty, so only Gujarat, India is shown. This is a privacy choice. |
| **D5** | Choose a headline: “Full-Stack Developer”, “MERN Stack Developer”, or wording that mentions .NET/Angular/Next.js. | Aligns hero, titles, bio, and LinkedIn. |
| **D6** | Do you want a custom domain, and if so, which one? | Determines O1 and the timing for profile-link updates. |
| **D7** | Is “Nitrajsinh Solanki, Co-founder • Full-Stack Developer” at `softvibe-services.vercel.app` you? | The site does not mention it; identity is unconfirmed. |
| **D8** | For the Ice Saathi pages, should GitHub links be relabelled “GitHub profile”, removed, or updated to real repositories? | Current entries target the profile root; repos may be private. |
| **D9** | Is the correct title “Full Stack Engineer Intern” or “Full Stack Developer Intern”? | Align to LinkedIn and the offer letter. |
| **D10** | May Aman Sales and Floris work be represented publicly in project screenshots? | Required before publishing client-work images. |
| **D11** | Do you want a blog, and what canonical policy should apply to Medium cross-posts? | Determines CT content implementation. |
| **D12** | What was the real first-publication date for the ProfilePage, and does VeloxCore have a public URL? | Needed for structured-data dates and optional employer URL. |

## 11. Rollout plan

Search/performance measurement (M1–M5) and off-site work (O2, after D6) can proceed in parallel.

| Work item | Suggested branch | Scope | Dependencies |
|---|---|---|---|
| 1. Quick fixes | `seo/quick-fixes` | C1, C2, C3, C5, C8, C7 stats guard, C10, C11, C14 | Nothing except D8 for sidebar label |
| 2. Entity consistency | `seo/entity-consistency` | C6, C7, C13, project READMEs | D1–D5, D9, D12 |
| 3. Project media/internal links | `seo/project-media` | C4, C12 | D10 and owner-provided screenshots |
| 4. Self-host icons | `perf/self-host-icons` | C9 | M3 indicates speed is an issue |
| 5. Case studies | `content/case-studies` | CT | D11 |

Each implementation PR should run `npm run lint && npm run build`, then the Appendix A audit. The repository workflow `.github/workflows/portfolio-validation.yml` validates lint and build for pull requests to `main` that touch `nitrajsinh-solanki/**`. `vercel.json` disables non-`main` deployments, so a branch should not create an indexable preview URL; merging to `main` triggers production deployment.

## 12. Success metrics and timeline

Record the baseline before implementation. Targets below are goals, not predictions.

| Metric | Tool | Baseline | 4 weeks | 12 weeks |
|---|---|---|---|---|
| Indexed URLs out of 15 | Search Console → Pages | Fill in | 15/15 | 15/15 |
| Position for `Nitrajsinh Solanki` | Search Console → Performance | Fill in | Top 3 target | #1 target |
| Impressions for queries containing `nitrajsinh` | Search Console | Fill in | Rising | Rising |
| Clicks from non-brand queries | Search Console | Fill in | Any | Growing |
| Rich Results Test errors | Rich Results Test | Fill in | 0 target | 0 target |
| Mobile Core Web Vitals | PageSpeed Insights / CrUX | Fill in | Pass target | Pass target |
| Audit failures | `seo-audit.py` | 30 | 0 excluding owner-decision items | 0 |
| Profiles that link back | Manual check (O2) | Fill in | All listed profiles | All listed profiles |

Indexing often takes days to weeks; ranking changes from content and links may take months and are not guaranteed. Judge progress from Search Console trends, not a single-day check.

## 13. Deliberately not recommended

| Do not | Why |
|---|---|
| Repeat “Full-Stack Developer in Gujarat” in every heading/paragraph. | Keyword stuffing reads poorly and can be treated as spam. |
| Add invented star ratings, reviews, testimonials, or awards. | Risks violating structured-data policies and a manual action. |
| Buy backlinks, join link exchanges, or submit to directory farms. | Spam risk and low value. |
| Add `meta keywords`, or tune sitemap `priority`/`changefreq`. | Google ignores them. |
| Add `LocalBusiness`/`ProfessionalService` schema for a personal portfolio. | No appropriate rich result; unnecessary risk. |
| Add `hreflang`. | There is only one language. |
| Create thin “developer in {city}” pages. | Doorway pages offer little user value. |
| Publish AI-generated filler. | Thin content can weaken quality signals; write only about work actually done. |
| Change existing URL paths. | Could break inbound links and indexed URLs. |
| Block or selectively allow AI crawlers by default. | Existing allow-all policy is a legitimate choice; revisit only if requirements change. |

---

## Appendix A: Audit script and baseline

The script below checks generated HTML. Save it outside `app/`, for example as `scripts/seo-audit.py`, then run:

```bash
cd nitrajsinh-solanki
npm run build
python3 scripts/seo-audit.py .next/server/app
```

It exits with code 1 if checks fail. The baseline was audited against a local build of `7c45a84`; Google Fonts were stubbed in the sandbox. That does not affect these HTML/metadata checks. Re-run in an environment that can build the app normally.

```python
#!/usr/bin/env python3
"""Post-build SEO audit. Usage: python3 seo-audit.py .next/server/app"""
import sys, re, json, glob, os, html
from urllib.parse import urlparse

root = sys.argv[1] if len(sys.argv) > 1 else ".next/server/app"
pages = ["index.html", "about.html", "projects.html", "resume.html"] + sorted(glob.glob(root + "/projects/*.html"))
pages = [p if p.startswith(root) else os.path.join(root, p) for p in pages]
fails = 0

def check(ok, page, msg):
    global fails
    if not ok:
        fails += 1
        print(f"FAIL  {os.path.relpath(page, root):44s} {msg}")

for p in pages:
    with open(p, encoding="utf8") as f:
        h = f.read()
    title = html.unescape((re.search(r"<title>(.*?)</title>", h) or [0, ""])[1])
    desc = html.unescape((re.search(r'<meta name="description" content="(.*?)"', h) or [0, ""])[1])
    canon = re.findall(r'<link rel="canonical" href="(.*?)"', h)
    ogurl = re.findall(r'<meta property="og:url" content="(.*?)"', h)
    robots = re.findall(r'<meta name="robots" content="(.*?)"', h)
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", h, re.S)

    check(10 <= len(title) <= 65, p, f"title length {len(title)}: {title}")
    check(70 <= len(desc) <= 160, p, f"description length {len(desc)}")
    check(not desc.endswith("…"), p, "description ends with an ellipsis (cut mid-sentence)")
    check(len(canon) == 1, p, f"{len(canon)} canonical tags")
    check(canon[:1] == ogurl[:1] or [c.rstrip('/') for c in canon] == [o.rstrip('/') for o in ogurl], p, "canonical != og:url")
    check(not (len(robots) > 1 and any(r.startswith("index") for r in robots) and any("noindex" in r for r in robots)), p, "conflicting robots tags")
    check(len(h1s) == 1, p, f"{len(h1s)} h1 elements")
    for tag, inner in re.findall(r"<(h[1-6])[^>]*>(.*?)</\1>", h, re.S):
        visible = re.sub(r"<(?!BR>)[^>]+>", "", re.sub(r"<br[^>]*>", "<BR>", inner))
        check(not re.search(r"\S<BR>\S", visible), p, f"<{tag}> has a <br> with no space around it: {html.unescape(visible)[:60]!r}")
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
    for b in blocks:
        try:
            json.loads(b)
        except Exception as e:
            check(False, p, f"invalid JSON-LD: {e}")
    check(len(blocks) >= 1 or p.endswith("not-found.html"), p, "no JSON-LD")
    check(not re.search(r"<img(?![^>]*\balt=)", h), p, "img without alt")
    if "/projects/" in p:
        check("<img" in h.split("<main")[1] if "<main" in h else False, p, "project page has no image (add a real screenshot)")
        src = re.findall(r'"codeRepository":"(.*?)"', h)
        check(all(re.match(r"^https://github\.com/[^/]+/[^/]+/?$", s) for s in src), p, f"codeRepository is not a repo URL: {src}")

home = open(os.path.join(root, "index.html"), encoding="utf8").read()
ext = [u for u in re.findall(r'<img[^>]*src="(https?://[^"]+)"', home)]
check(len(ext) == 0, os.path.join(root, "index.html"), f"{len(ext)} images load from third-party hosts: {sorted({urlparse(u).netloc for u in ext})}")

sm = open(os.path.join(root, "sitemap.xml.body"), encoding="utf8").read()
locs = re.findall(r"<loc>(.*?)</loc>", sm)
lastmods = set(re.findall(r"<lastmod>(.*?)</lastmod>", sm))
check(len(lastmods) > 1, os.path.join(root, "sitemap.xml"), f"every URL has the same lastmod ({next(iter(lastmods))})")
print(f"\n{len(pages)} pages, {len(locs)} sitemap URLs, {fails} failure(s)")
sys.exit(1 if fails else 0)
```

### Baseline on `7c45a84`: 30 failures

| Check | Failures | Addressed by |
|---|---:|---|
| Description ends with “…” | 12 | C3 |
| Project page has no image | 11 | C4 |
| `<br>` glues words in a heading | 3 | C1 |
| `codeRepository` is not a repo URL | 2 | C2 |
| Third-party image hosts on home | 1 check (46 image requests) | C9 |
| Identical sitemap `lastmod` | 1 | C8 |
| **Total failed checks** | **30** | |

The total excludes items awaiting owner decisions or third-party measurements where applicable. Keep the baseline and rerun results with dates when implementing each work item.
