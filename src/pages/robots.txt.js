import { site } from '../config';

export async function GET(context) {
  const BASE = context.site?.href?.replace(/\/$/, '') || `https://${site.domain}`;

  const body = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
