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
| LinkedIn / GitHub (hero bar, contact section, form error, JSON-LD) | `linkedin`, `github` |
| "Open to architect roles" dot | `openTo` (set to `''` to hide it) |
| Domain for canonical, sitemap and share URLs | `siteUrl` |
| Section labels, nav, button text, form messages | the `*Section`, `header`, `contact.form` blocks |

`npm run build` warns about any placeholder that is still empty.

Rules (from `HANDOFF.md`): facts come only from the résumé. The $1M is always "about" or "~". No phone number, and **no email address**: Jagadish doesn't want it shown. People reach him through the note form or LinkedIn.

**Résumé PDF:** save it as `public/resume.pdf` (three links point to it). Remove the phone number from the PDF too, unless you want it public.

**Share image:** `public/og.png` (1200×630) shows the name and headline. Regenerate it after changing either:

```bash
npm i -D playwright && npx playwright install chromium
```

```bash
npm run og
```

**Note form:** the "Drop me a note" form sends through [Web3Forms](https://web3forms.com), which is free and needs no backend. The code is in `src/components/NoteForm.astro` and `src/scripts/site.ts`. Its messages (validation, sending, success, error) are in `contact.form` in `profile.ts`.

### Set up the contact form (one time)

1. Go to **https://web3forms.com**, enter **Jagadish's email address** and create an access key. Web3Forms emails the key, and every message from the form goes to that address.
2. **Locally:** copy the example env file and paste the key into it:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` so the line reads `PUBLIC_WEB3FORMS_KEY=your-key-here`. `.env` is git-ignored, so the key never gets committed.
3. **On Vercel:** go to Project → **Settings → Environment Variables**, add `PUBLIC_WEB3FORMS_KEY` with the same key for Production (and Preview if you use it), then **redeploy**. The key is read at build time, so the variable only takes effect on the next deploy.
4. **Test it:** after deploying, send one message from the live site and check that it arrives.

Without a key the build still works (it prints a warning), but the form will show its error message ("…reach out on LinkedIn").

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
src/scripts/site.ts     the four motions + note form (Web3Forms)
src/layouts/Base.astro  <head>: meta, Open Graph, Twitter card, Person JSON-LD, canonical, fonts
src/components/         Header, Hero, HowIArchitectCard, StackStrip, SelectedWork, CaseCard,
                        About, Toolkit, Experience, Principles, Contact, NoteForm, Footer
src/pages/              index.astro, robots.txt.ts, sitemap.xml.ts
scripts/og.mjs          renders public/og.png
```

## Motion

There are exactly four motions: reveal on scroll, the hero card cycling, the case flow chips, and hover feedback. With `prefers-reduced-motion: reduce`, nothing moves and the final state shows. Don't add more (see "Don'ts" in `HANDOFF.md`).
