# Nitrajsinh Solanki — Developer Portfolio

Personal portfolio for **Nitrajsinh Solanki**, a full-stack developer from Gujarat, India. It presents selected software projects, project case studies, technical skills, experience, education, and a downloadable resume.

**Live website:** https://nitrajsinh-solanki.vercel.app

## Tech stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Next.js Metadata API, sitemap, robots, and JSON-LD structured data

## Local development

Requires Node.js 22 or the version configured for CI.

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

Validate before deploying:

```bash
npm run lint
npm run build
```

## Repository structure

- `app/` — routes, UI components, project pages, and metadata routes
- `app/projects/data.ts` — project descriptions, technology lists, links, and case studies
- `lib/` — site identity, profile data, SEO helpers, and structured-data builders
- `public/` — portfolio assets and resume PDF

The portfolio links to live projects and source repositories where those links are public.
