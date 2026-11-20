# Jagadish Pampatwar — portfolio site

A one-page static site built with [Astro](https://astro.build). It ships no JavaScript, and fonts are self-hosted. The approved design is in `template/index.html` and the build spec is in `HANDOFF.md`.

## Edit the content

**All text lives in one file: `src/data/profile.ts`.** The components hold no copy.

| To change… | Edit in `profile.ts` |
|---|---|
| Hero sentence, title, email | `lede`, `title`, `email` |
| Jobs on the rail line | `stops` (oldest first; mark the current job `current: true`). The line resizes to fit any number of stops. |
| Transflo case study | `caseStudy` (`facts`, `start`, `change`, `result`) |
| Transflo diagram | put the image in `public/`, then set `caseStudy.diagram = { src: '/transflo.png', alt: '…', width, height }` |
| Transflo metrics (instead of, or with, the diagram) | `caseStudy.metrics = [{ label: 'Hosting cost', value: '…' }]` |
| Other CSX systems table | `systems[].summary` |
| "What I work on" | `work` |
| LinkedIn, "Open to" | `linkedin`, `openTo` |
| Domain (canonical, sitemap, Open Graph URLs) | `siteUrl` |
| Nav labels, headings, button text | `ui` |

Empty fields show a bracketed placeholder on the page, and `npm run build` prints a warning listing each one.

**Résumé PDF:** save it as `public/resume.pdf`. The site doesn't show a phone number, so remove it from the PDF too unless you want it public.

**Share image:** `public/og.png` (1200×630) shows the name, title and rails. After changing the name or title, regenerate it:

```bash
npm i -D playwright && npx playwright install chromium
```

```bash
npm run og
```

Facts must come from the résumé. Don't add numbers, clients, titles or dates that aren't in it.

## Run locally

Requires Node 18.20+ (Node 20 or 22 recommended).

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321.

## Build

```bash
npm run build
```

```bash
npm run preview
```

The output goes to `dist/`: `index.html`, `robots.txt`, `sitemap.xml`, `og.png` and the fonts.

## Deploy to Vercel

**From GitHub (recommended):** push this folder to a GitHub repo, then on vercel.com choose **Add New → Project**, import the repo and click **Deploy**. Vercel detects Astro automatically: build command `npm run build`, output directory `dist`. Every push to `main` redeploys.

**From the command line:**

```bash
npx vercel
```

```bash
npx vercel --prod
```

After adding a custom domain in Vercel (Project → Settings → Domains), set `siteUrl` in `src/data/profile.ts` to that domain and redeploy, so the canonical URL, sitemap and share links point to it.

## Structure

```
src/data/profile.ts       all content
src/styles/global.css     design tokens + styles (copied from template/index.html)
src/layouts/Base.astro    <head>: meta, Open Graph, Person JSON-LD, canonical, fonts
src/components/           Nav, Hero, RouteMap, CaseStudy, WorkAreas, Contact, Footer
src/pages/index.astro     the page
src/pages/robots.txt.ts   robots.txt
src/pages/sitemap.xml.ts  sitemap.xml
scripts/og.mjs            renders public/og.png
```

The only animation is the rail line drawing once on load (1.4s), and only when the visitor hasn't asked for reduced motion. Please keep it that way. See "Don'ts" in `HANDOFF.md` before adding anything.
