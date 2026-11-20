import type { APIRoute } from 'astro';
import { profile } from '../data/profile';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', profile.siteUrl).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
