# Jagadish Pampatwar — portfolio ("editorial dark")

A one-page static site built with [Astro](https://astro.build). Fonts (Manrope, DM Sans) are self-hosted. One small inline script runs the motion and the note form, and every piece of content is visible without it.
The approved design is in `template/index.html` and the spec is in `HANDOFF.md`.

## Edit the content

**All text lives in `src/data/profile.ts`.** Components hold no copy.

| To change… | Edit in `profile.ts` |
|---|---|
| A job | `experience` (newest first; `desc` and `tags` are optional) |
| Headline (last part shows in amber) | `hero.headline` |
| Hero sentence (`b: true` = brighter text) | `hero.lede` |
| "How I architect" card rows | `howIArchitect.rows` |
| Case cards | `work` (`theme: 'sand' \| 'steel'`, `flow` = the three chips, `details` = "Explore the engineering") |
| About, toolkit, principles, contact | `about`, `toolkit`, `principles`, `contact` |
| LinkedIn / GitHub (shown in the hero bar and JSON-LD) | `linkedin`, `github` |
| "Open to architect roles" dot | `openTo` (set to `''` to hide it) |
| Domain for canonical, sitemap and share URLs | `siteUrl` |
| Section labels, nav, button text, form messages | the `*Section`, `header`, `contact.form` blocks |

`npm run build` warns about any placeholder that is still empty.

Rules (from `HANDOFF.md`): facts come only from the résumé. The $1M is always "about" or "~". No phone number.

**Résumé PDF:** save it as `public/resume.pdf` (three links point to it). Remove the phone number from the PDF too, unless you want it public.

**Share image:** `public/og.png` (1200×630) shows the name and headline. Regenerate it after changing either:

```bash
npm i -D playwright && npx playwright install chromium
```

```bash
npm run og
```

**Note form:** it has no backend. It validates, then opens the visitor's email app with the note filled in (`src/scripts/site.ts`). To use a form service such as Formspree, post to it in that file and show success only after a 2xx response.

## Run locally

Requires Node 18.20+ (20 or 22 recommended).

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

The output goes to `dist/`: `index.html` (CSS and JS inlined), `robots.txt`, `sitemap.xml`, `og.png` and the fonts.

## Deploy to Vercel

**From GitHub (recommended):** push this folder to a GitHub repo, then on vercel.com choose **Add New → Project**, import the repo and click **Deploy**. Vercel detects Astro (build `npm run build`, output `dist`). Every push to `main` redeploys.

**From the command line:**

```bash
npx vercel
```

```bash
npx vercel --prod
```

After adding a custom domain (Project → Settings → Domains), set `siteUrl` in `src/data/profile.ts` to it and redeploy.

## Structure

```
src/data/profile.ts     all content
src/styles/global.css   tokens + styles from template/index.html (fixes are marked "fix (not in template)")
src/scripts/site.ts     the four motions + note form
src/layouts/Base.astro  <head>: meta, Open Graph, Twitter card, Person JSON-LD, canonical, fonts
src/components/         Header, Hero, HowIArchitectCard, StackStrip, SelectedWork, CaseCard,
                        About, Toolkit, Experience, Principles, Contact, NoteForm, Footer
src/pages/              index.astro, robots.txt.ts, sitemap.xml.ts
scripts/og.mjs          renders public/og.png
```

## Motion

There are exactly four motions: reveal on scroll, the hero card cycling, the case flow chips, and hover feedback. With `prefers-reduced-motion: reduce`, nothing moves and the final state shows. Don't add more (see "Don'ts" in `HANDOFF.md`).
