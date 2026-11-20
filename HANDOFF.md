# Handoff: Jagadish Pampatwar portfolio ("editorial dark")

Build a one-page portfolio for **Jagadish Pampatwar**, Enterprise Java & AI Solutions Architect (19+ years, at CSX Transportation since 2012). The design is final and approved.

## Inputs

| File | What it is |
|---|---|
| `template/index.html` | **The approved design, fully working.** Standalone HTML/CSS/JS. Open it in a browser. It is the visual and behavioural source of truth: match it exactly. |
| `HANDOFF.md` | This spec. |
| `resume.docx` / `resume.pdf` | Jagadish's résumé. **The only source of facts.** |

Live reference: https://claude.ai/artifact/8ufBcxaZhsLVdnGCbSTe44

## Stack

Ask once before scaffolding. Default to the first option if there's no answer.

1. **Astro (static)**, the default: zero JS by default, best SEO, and the small script stays a plain `<script>`.
2. React + Vite (static build)
3. Angular (standalone components, prerendered)

Static output only, with no backend. Deploy to Vercel, Netlify or GitHub Pages (ask which).

## Structure

All copy lives in **one data file** (`src/data/profile.ts`). Components hold no hard-coded text.

```ts
export const profile = {
  name, role: 'Java architect. Cloud and AI solutions.', openTo: 'Open to architect roles',
  headline: ['Architecting systems', 'that ', 'stay running.'],   // last part in the accent colour
  lede, email: 'jagadish.pampatwar@gmail.com', resumeUrl: '/resume.pdf', linkedin: '', github: '',
  howIArchitect: [{ n: '01', title: 'Modernize', line: '…', tag: 'JAVA' }, /* 4 rows */],
  coreStack: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Azure OpenAI'],
  work: [{ theme: 'sand' | 'steel', label, index, big: [line1, line2], flow: [a, b, end], name, kicker, title, text, tags: [], details: [] }],
  about: { heading: [l1, l2], paragraphs: [], focus, education: { degree, school } },
  toolkit: [{ label: '01 / Architect', title, text, tags: [] }, /* 3 */],
  experience: [{ when, company, role, desc?, tags?, where }],          // newest first
  principles: [{ n, title, text }],                                   // 3
  contact: { heading: ['Big systems', 'start with a', 'conversation.'], lede },
};
```

Components in page order: `Header`, `Hero` (with `HowIArchitectCard`), `StackStrip`, `SelectedWork` (`CaseCard` ×2), `About`, `Toolkit`, `Experience`, `Principles`, `Contact` (with `NoteForm`), `Footer`.

## Design tokens (copy exactly from the template's `:root`)

```
--bg #0f1012   --bg2 #141518   --ink #f0eee8   --dim #a19e97   --faint #6f6c66
--line rgba(240,238,232,.10)   --line2 rgba(240,238,232,.18)
--acc #f2c275 (amber, the ONE accent)   --acc-ink #1c1609
--sand #ece3d3 / ink #2b2418 / dim #6b5f4b      (case card 1)
--steel #d3dbe6 / ink #1d2533 / dim #56627a     (case card 2)
--ease cubic-bezier(.22,1,.36,1)   --max 1180px
```

- **Fonts:** Manrope 500/600 for headings, DM Sans 400/500 for text. Self-host them (`@fontsource/manrope`, `@fontsource/dm-sans`) or use Google Fonts. No third font.
- **Headings:** two-tone. Line one is in ink, line two in `--dim` (`.h2 .dim`). Weight 500, letter-spacing −0.035em (hero −0.05em).
- **Labels:** 12px DM Sans, uppercase, letter-spacing .12em, `--dim`. The number is in amber: `01 / Selected work`.
- **Radius:** 14px on cards, 6px on the main button, 5px on tags.
- **Layout:** max width 1180px, side padding 40px (22px under 640px), section padding 130px.

## Motion: exactly these, nothing more

1. **Reveal:** elements with `.rv` fade up 18px once when 15% visible (0.8–0.9s, `--ease`).
2. **Hero card cycle:** the "How I architect" card highlights one row every 3.2s and updates the `01 / 04` counter. It pauses while hovered (hovering a row selects it) and while the tab is hidden.
3. **Case flow chips:** when a case card is revealed, its three chips light left to right, 450ms apart, once. The last chip fills solid.
4. **Hover feedback:** underlines draw on `.arrow-link`, arrows nudge 2px, case and principle cards lift 3px, experience company names turn amber, and the header gains a hairline after 8px of scroll.

Rules:
- **Content is visible without JS.** The `js` class on `<html>` enables the hidden "before" states.
- **`prefers-reduced-motion: reduce`:** no reveals, no cycling, chips start lit. Hover colour changes may stay.
- No canvas, no 3D, no parallax, no pinned or horizontal scroll sections, no marquees, no counters. The client explicitly rejected heavier motion as "AI slop".

## Content rules

- Facts come **only** from the résumé. Don't invent metrics, clients, team sizes or dates.
- The $1M is "approximately", so write "about" or "~". Never "over" or "more than".
- **No phone number** on the site, only email.
- The headline, lede, case-card lines, principles and contact copy are drafted in Jagadish's voice. Keep them unless the user edits them.
- "Open to architect roles" assumes he's looking. Confirm with the user, and remove it if not.

**Placeholders to list in your final summary if still empty:**
- `/public/resume.pdf` (three links point to it)
- LinkedIn URL and GitHub URL (add them to the hero bar beside Email, matching the reference site)
- optional: a headshot (the design doesn't need one)

## Form

The note form has no backend. It validates the required fields, then opens a `mailto:` with the name, email and message filled in, and tells the user that's what happens. If the user gives you a form service (Formspree, Netlify Forms), post to it instead and show success **only after** a 2xx response.

## Don'ts

- No new sections, no testimonials, no skill bars, no stat counters, no icons beyond the one glyph in the hero card.
- No second accent colour, no gradients behind text, no glass blur except the sticky header.
- Don't change the copy tone into marketing ("passionate", "cutting-edge", "rockstar").

## Accessibility and quality

- Semantic HTML: `header`, `nav`, `main`, `section` + `aria-labelledby`, `ol` for experience and the hero rows, `dl` for facts, `details/summary` for "Explore the engineering", real `<label>`s on form fields.
- Visible focus (2px amber outline). Contrast ≥ 4.5:1: the tokens already pass on `--bg`, and pastel cards use their own ink.
- Works at 360px: nav links hide (keep "Let's talk ↗"), grids stack, no sideways scroll.
- SEO: title, meta description, Open Graph and Twitter card (a 1200×630 share image: name plus headline on `--bg`), `Person` JSON-LD (name, jobTitle, email, address locality, sameAs LinkedIn), canonical, `robots.txt`, `sitemap.xml`.
- Lighthouse ≥ 95 in all four categories.

## Acceptance checklist

- [ ] It matches `template/index.html` side by side at 1440px and 390px.
- [ ] All copy comes from `profile.ts`. Editing a job there updates the page.
- [ ] Every fact matches the résumé. No phone number.
- [ ] Only the four motions above. Reduced motion shows the final state with nothing moving.
- [ ] With JS disabled, all content is visible.
- [ ] Keyboard: every link, `details` toggle and form field is reachable with a visible focus ring.
- [ ] Lighthouse ≥ 95 ×4.
- [ ] README covers editing content, running locally, building and deploying.
- [ ] The final message lists the placeholders still waiting on the user.
