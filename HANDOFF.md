# Handoff: Jagadish Pampatwar portfolio site (design "B2")

You are building a one-page portfolio website for **Jagadish Pampatwar**, an Enterprise Java and AI Solutions Architect (19+ years; at CSX Transportation since 2012). The design is final. Your job is to turn it into a production site, filling the content from his résumé.

## Inputs in this folder

| File | What it is |
|---|---|
| `template/index.html` | **The approved design**, as one standalone HTML/CSS file. Open it in a browser. This is the visual source of truth: match it exactly. |
| `HANDOFF.md` | This note: spec, rules, acceptance checklist. |
| `resume.docx` / `resume.pdf` | *(the user will add)* Jagadish's résumé. **The only source for facts.** |

Design canvas (for reference only): https://claude.ai/artifact/1kXQHZK7zs2mmnhcGUHmk4 (artboard "B2 · Final")

## Stack

Ask the user once before scaffolding, and default to the first option if they don't answer:

1. **Astro (static)** – best fit for a content page: zero JS by default, great SEO. *(default)*
2. React + Vite (static build)
3. Angular (standalone components, static prerender)

The site needs no backend. It's a static build, deployed to Vercel, Netlify or GitHub Pages (ask which).

## Structure

Put all content in **one data file** (`src/data/profile.ts` or `profile.json`) so the components hold no hard-coded copy:

```ts
export const profile = {
  name: 'Jagadish Pampatwar',
  title: 'Enterprise Java and AI solutions architect',
  lede: '…',                       // hero sentence
  email: 'jagadish.pampatwar@gmail.com',
  linkedin: '',                    // TODO from user
  resumeUrl: '/resume.pdf',
  location: 'Jacksonville, Florida',
  openTo: '',                      // TODO from user
  education: ['…', '…'],
  stops: [{ years, org, role, place, current? }],   // career, OLDEST first
  caseStudy: { title, facts: [{label, value}], start, change, result, diagram? },
  systems: [{ name, summary }],
  work: [{ title, body }],
};
```

Components, in page order (one each):
`Nav` → `Hero` → `RouteMap` (career) → `CaseStudy` (+ systems table) → `WorkAreas` → `Contact` → `Footer` (with terminus).

## Design tokens (keep exactly)

```
--paper #F6F7F5   page background        --green #1F5F4A   the ONE accent
--white #FFFFFF   case study + contact   --green-dark #123B2E  hover
--ink   #1B2430   text, rails            --rule  #D3D8DC   hairlines
--muted #4E5661   secondary text         --tie   #9AA0A6   rail ties (decor only)
```

- **Fonts:** Literata (serif: name, headings, body) and Archivo at `font-stretch: 75–85%` (nav, dates, labels, table, buttons). Load both from Google Fonts or self-host with `@fontsource`. **No third font.**
- **Type scale:** name `clamp(64px, 11vw, 160px)`, section headings `clamp(36px, 4.6vw, 60px)`, hero lede 22px, body 18–19px, labels 15–17px.
- **Layout:** max width 1200px, side gutter 40px (20px on phones), section padding 112px (72px on phones).
- **Radius:** 4px on buttons and placeholders only. Markers are circles.

## The signature element: the rail line

The career section draws his jobs as **stops on a railway line** (a nod to 13 years at a freight railroad). Two rails with ties, six circular stops, and CSX as the filled green "current" stop.

- On page load, the track draws left to right once (1.4s). **Only under `prefers-reduced-motion: no-preference`.** No other animation anywhere on the page.
- On narrow screens the line scrolls sideways inside its own box (`min-width: 1000px`). Don't squash or stack it.
- The footer repeats the rails as a static divider that ends in a green buffer stop ("end of the line"). This one is never animated.

## Content rules

- **Facts come only from the résumé.** Don't invent numbers, clients, titles or dates.
- The $1M Transflo figure is "approximately", so always say "about" or "roughly".
- Leave the phone number **off** the public site. Email only.
- The hero sentence, case-study paragraphs and contact line are drafted in his voice. Keep them unless the user edits them.
- These placeholders need real content from the user. List them in your final summary if they're still empty:
  - LinkedIn URL
  - résumé PDF (put at `/public/resume.pdf`)
  - "Open to" (full-time or contract, on site or remote)
  - Transflo before/after diagram or 2–3 real metrics
  - one line each for the PTC Operations Portal, Fleet Management System and Engineering & Track Management
  - optional: a headshot (the design doesn't need one)

## Don'ts (these make it look AI-generated; the client rejected them)

- No small ALL-CAPS labels above headings, no `01 / 02` numbering, no middle-dot lists (`A · B · C`).
- No `→` arrows on links or buttons, no emoji, no icon soup.
- No big-number stat blocks ("$1M" with a tiny caption), no grid of identical cards with shadows.
- No gradient backgrounds, no dark mode toggle, no fade-in-on-scroll on sections.
- Don't color or italicize one word in a headline.
- Don't add sections the design doesn't have (testimonials, blog, skills bars, "services").

## Accessibility and quality floor

- Semantic HTML: `nav`, `main`, `section` + `aria-labelledby`, `ol` for the career stops (`aria-current="step"` on CSX), `dl` for facts and contact, a real `table` for systems.
- Visible focus ring (3px green outline) on every link and button. Text contrast is at least 4.5:1, and all the tokens above already pass.
- Works at 360px width: nav wraps, rail line scrolls, table scrolls, no horizontal page scroll.
- SEO: `<title>`, meta description, Open Graph tags (title, description, a 1200×630 share image: rails + name, plain), `Person` JSON-LD (name, jobTitle, email, address locality, sameAs LinkedIn), canonical URL, `robots.txt`, `sitemap.xml`.
- Lighthouse: Performance, Accessibility, Best Practices and SEO all ≥ 95. Use `font-display: swap` and preconnect.

## Acceptance checklist

- [ ] Side by side with `template/index.html` at 1440px and 390px, it looks the same.
- [ ] All copy lives in the data file. Changing a job there updates the rail line.
- [ ] Every fact matches the résumé. Phone number is not on the site.
- [ ] The track draws once on load, and doesn't with reduced motion turned on.
- [ ] Keyboard: Tab reaches every link with a visible focus ring, in logical order.
- [ ] Lighthouse ≥ 95 in all four categories.
- [ ] README explains how to edit content, run locally, build and deploy.
- [ ] Final message lists any placeholders still waiting on the user.
