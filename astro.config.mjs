// @ts-check
import { defineConfig } from 'astro/config';

// Canonical, sitemap and Open Graph URLs come from `siteUrl` in src/data/profile.ts.
// Static output: no adapter needed on Vercel.
export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
