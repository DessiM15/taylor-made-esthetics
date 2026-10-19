// Pulls the latest Google reviews (via the Elfsight reviews service the old
// widget used) into build/reviews.json. Run: node build/fetch-reviews.mjs
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const PLACE = 'ChIJaWoQw9HtQIYRZee-ySU6ZFw';
const url = `https://service-reviews-ultimate.elfsight.com/data/reviews?uris%5B%5D=${PLACE}&filter_content=with_content&min_rating=4&page=1&page_length=50`;
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.taylormadeesthetics.net/', Origin: 'https://www.taylormadeesthetics.net' } });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const body = await res.json();
const rows = (body.result && body.result.data) || [];
if (!rows.length) throw new Error('No reviews in response; check the endpoint before overwriting.');
const out = rows.map((r) => ({ name: r.reviewer_name, rating: r.rating, date: new Date(r.published_at * 1000).toISOString().slice(0, 10), text: (r.text || '').trim(), url: r.url }));
writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)), 'reviews.json'), JSON.stringify(out, null, 1));
console.log(`Saved ${out.length} reviews.`);
