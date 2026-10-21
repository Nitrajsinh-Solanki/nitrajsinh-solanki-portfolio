<div align="center">

# Nitrajsinh Solanki

### Full-Stack Developer · Gujarat, India

A personal portfolio showcasing software projects, engineering experience, technical skills, and selected case studies.

<p>
  <a href="https://nitrajsinh-solanki.vercel.app"><strong>Explore the live portfolio →</strong></a>
  &nbsp;·&nbsp;
  <a href="https://nitrajsinh-solanki.vercel.app/projects">Projects</a>
  &nbsp;·&nbsp;
  <a href="https://nitrajsinh-solanki.vercel.app/about">About</a>
  &nbsp;·&nbsp;
  <a href="https://nitrajsinh-solanki.vercel.app/resume">Resume</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-111111?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel)](https://vercel.com/)

</div>

---

## ✦ About the project

This repository contains the source for [nitrajsinh-solanki.vercel.app](https://nitrajsinh-solanki.vercel.app), a responsive developer portfolio built with the Next.js App Router. It brings project demos and case studies together with experience, education, skills, services, and contact information in one place.

The interface uses a warm, editorial visual style with light and dark themes. The codebase also includes dedicated metadata and discovery routes so the site can be navigated by people, search engines, and compatible AI tools.

## Highlights

| Area | What it includes |
| --- | --- |
| **Project showcase** | A browsable project collection, individual case-study pages, technology details, and available repository or demo links. |
| **Developer profile** | About, education, experience, skills, and service sections. |
| **Theme & interaction** | Responsive layouts, persistent light/dark theme preference, and motion enhancements. |
| **Resume & contact** | A resume page, downloadable resume asset, and contact section. |
| **Search & sharing** | Page metadata, canonical URLs, Open Graph and X/Twitter metadata, and generated social preview images. |
| **Technical SEO** | XML sitemap, robots rules, JSON-LD structured data, and project-specific metadata. |
| **Content discovery** | `/llms.txt` and `/llms-full.txt` endpoints, alongside human-friendly pages. |
| **Local assets** | Self-hosted technology icons to avoid relying on third-party icon CDNs at runtime. |

## Built with

- **Framework:** Next.js App Router
- **UI:** React, TypeScript, Tailwind CSS
- **Typography:** Syne, DM Sans, and DM Mono through `next/font`
- **Deployment:** Vercel
- **Quality checks:** ESLint, a production build, and a post-build SEO audit

## Explore the site

| Route | Purpose |
| --- | --- |
| [`/`](https://nitrajsinh-solanki.vercel.app/) | Home, profile overview, skills, featured projects, services, and experience |
| [`/about`](https://nitrajsinh-solanki.vercel.app/about) | Developer profile and background |
| [`/projects`](https://nitrajsinh-solanki.vercel.app/projects) | Project collection |
| [`/projects/[slug]`](https://nitrajsinh-solanki.vercel.app/projects) | Individual project details and case studies |
| [`/resume`](https://nitrajsinh-solanki.vercel.app/resume) | Resume page |
| `/sitemap.xml` · `/robots.txt` | Search engine discovery |
| `/llms.txt` · `/llms-full.txt` | AI-oriented site discovery |

## Run locally

### Prerequisites

- **Node.js 22** (the version used by CI)
- npm, included with Node.js

### 1. Clone the repository

```bash
git clone https://github.com/Nitrajsinh-Solanki/nitrajsinh-solanki-portfolio.git
cd nitrajsinh-solanki-portfolio/nitrajsinh-solanki
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables (optional)

Copy the example environment file:

```bash
cp .env.example .env.local
```

Available values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL used to generate absolute site URLs. Defaults to the production portfolio URL. |
| `GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification token. |
| `BING_SITE_VERIFICATION` | Optional Bing Webmaster verification token. |

Only add verification tokens after verifying domain ownership in the relevant webmaster console. Keep private values out of commits.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate before deploying

Run these commands from the `nitrajsinh-solanki/` app directory:

```bash
npm run lint
npm run build
python3 scripts/seo-audit.py
```

The SEO audit runs against the generated production output, so run it **after** `npm run build`. Use `python3 scripts/seo-audit.py --json` for machine-readable output or `--strict` to make warnings fail the audit. GitHub Actions also runs lint, the production build, and the post-build SEO audit for its configured validation events.

## Repository layout

```text
.
├── .github/
│   └── workflows/              # Portfolio validation workflow
├── README.md                   # Project overview and setup guide
└── nitrajsinh-solanki/
    ├── app/
    │   ├── components/          # Portfolio sections and shared UI
    │   ├── projects/            # Project data, listing, and detail pages
    │   ├── about/               # About route
    │   ├── resume/              # Resume route
    │   ├── sitemap.ts            # Generated sitemap
    │   └── robots.ts             # Robots rules
    ├── lib/                     # Site identity, profile, schema, and SEO helpers
    ├── public/                  # Images, icons, and resume PDF
    ├── scripts/                 # SEO audit and icon maintenance tools
    ├── package.json
    └── .env.example
```

## Connect

- **Portfolio:** [nitrajsinh-solanki.vercel.app](https://nitrajsinh-solanki.vercel.app)
- **GitHub:** [Nitrajsinh-Solanki](https://github.com/Nitrajsinh-Solanki)
- **LinkedIn:** [Nitrajsinh Solanki](https://www.linkedin.com/in/nitrajsinh-solanki-647b11293)
- **X:** [@Nitrajsinh_S](https://x.com/Nitrajsinh_S)
- **Medium:** [@nrsolanki2005](https://medium.com/@nrsolanki2005)

---

<div align="center">
  <sub>Designed and built by Nitrajsinh Solanki · Next.js, React, and TypeScript</sub>
</div>
