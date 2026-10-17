import { SITE, BLVD, bookUrl, PROMO, GROUPS, CATEGORIES, GUIDES, SERVICES, ADDONS, QUICK_BOOK, EXPERIENCE, TESTIMONIALS, MEMBERSHIP, GALLERY, FAQ } from './data.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n) => `$${Number(n).toFixed(n % 1 ? 2 : 0)}`;
const catById = (id) => CATEGORIES.find((c) => c.id === id);
const inCat = (id) => SERVICES.filter((s) => s.cat === id || (s.altCats || []).includes(id));

// ---------- icons ----------
const ICONS = {
  wax: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 34 32 16l4 4-18 18H14v-4Z"/><path d="M29 19l4 4"/><path d="M10 38h28"/><path d="M36 10c0 3-2 4-2 4s-2-1-2-4 2-4 2-4 2 1 2 4Z"/></svg>',
  face: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M24 6c-9 0-14 7-14 16 0 10 7 18 14 18s14-8 14-18c0-9-5-16-14-16Z"/><path d="M17 24h2M29 24h2"/><path d="M20 31c2 2 6 2 8 0"/><path d="M10 22c3-2 6-6 7-11M38 22c-3-2-6-6-7-11"/></svg>',
  clear: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M24 4 28 16h12l-10 7 4 12-10-7-10 7 4-12-10-7h12Z"/><path d="M8 40h32"/></svg>',
  drop: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M24 5s-13 14-13 24a13 13 0 0 0 26 0C37 19 24 5 24 5Z"/><path d="M17 30a7 7 0 0 0 7 7"/></svg>',
  suite: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 42V18L24 6l16 12v24"/><path d="M18 42V28h12v14"/><path d="M8 42h32"/></svg>',
  plan: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="8" y="8" width="32" height="32" rx="4"/><path d="M16 20h16M16 28h10"/><path d="M14 8V4M34 8V4"/></svg>',
  results: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="18"/><path d="M15 25l6 6 12-13"/></svg>',
  products: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 6h12v8H18z"/><path d="M14 14h20v26a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V14Z"/><path d="M14 24h20"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7L12 2z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2 0 3.5 1.1 4.3 2.2.8-1.1 2.3-2.2 4.3-2.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
};
export const icon = (n) => ICONS[n] || '';

const stars = (label = 'Five star rating') => `<span class="stars" role="img" aria-label="${esc(label)}">${ICONS.star.repeat(5)}</span>`;

// ---------- booking link ----------
// A real link (works without JS, opens the booking page) that main.js upgrades
// into an in-page booking dialog.
export const bookLink = (path, label, cls = 'btn btn-primary', extra = '') =>
  `<a href="${esc(bookUrl(path))}" class="${cls} js-book" data-book-path="${esc(path)}" target="_blank" rel="noopener" ${extra}>${label}<span class="sr-only"> (opens the online booking page in a new tab)</span></a>`;

// ---------- layout ----------
const navLinks = [
  ['/#about', 'About'],
  ['/services', 'Services'],
  ['/#for-him', 'For Him'],
  ['/#membership', 'Membership'],
  ['/#reviews', 'Reviews'],
  ['/gallery', 'Gallery'],
  ['/#contact', 'Contact'],
];

export function head({ title, description, canonical, image = '/assets/taylor-steam-facial.jpg', schema = [], noindex = false }) {
  const url = SITE.url + canonical;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
  <link rel="canonical" href="${esc(url)}">
  <meta name="theme-color" content="#f8dde6">
  <link rel="icon" href="/assets/tme-logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/tme-logo.png">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(SITE.url + image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(SITE.url + image)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="preload" as="image" href="/assets/marble-pink-gold.jpg">
  <link rel="stylesheet" href="/styles.css">
${schema.map((s) => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>`;
}

export function header(current = '') {
  const link = ([href, label]) => {
    const active = current && href.startsWith('/' + current) ? ' aria-current="page"' : '';
    return `<li><a href="${href}"${active}>${label}</a></li>`;
  };
  return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" id="site-header">
  <div class="nav-container">
    <a href="/" class="nav-logo" aria-label="${esc(SITE.name)} home">
      <img src="/assets/tme-logo.png" alt="" width="64" height="65">
      <span class="nav-wordmark"><span class="nav-wordmark-script">Taylor Made</span><span class="nav-wordmark-caps">Esthetics</span></span>
    </a>
    <nav class="nav-primary" aria-label="Primary">
      <ul class="nav-links">${navLinks.map(link).join('')}</ul>
    </nav>
    <div class="nav-actions">
      <a href="${SITE.phoneHref}" class="nav-phone">${ICONS.phone}<span>${SITE.phone}</span></a>
      ${bookLink(BLVD.menu, 'Book Now', 'btn btn-primary btn-sm nav-book')}
      <button class="nav-hamburger" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <nav aria-label="Mobile">
      <ul class="mobile-links">${navLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul>
    </nav>
    <div class="mobile-menu-cta">
      ${bookLink(BLVD.menu, 'Book an Appointment', 'btn btn-primary')}
      <a href="${SITE.phoneHref}" class="btn btn-outline">Call ${SITE.phone}</a>
    </div>
  </div>
</header>`;
}

export function footer() {
  const a = SITE.address;
  return `<footer class="site-footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/tme-logo.png" alt="" width="88" height="90" class="footer-logo">
        <p class="footer-script">Your glow. Your confidence. Your self care.</p>
        <p>Licensed esthetician in a private suite at Pearland Town Center. Facials, waxing, sugaring and corrective skincare for women and men.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer">
        <h2 class="footer-heading">Explore</h2>
        <ul>
          <li><a href="/#about">About Taylor</a></li>
          <li><a href="/services">All services</a></li>
          <li><a href="/#membership">VIP Membership</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/accessibility">Accessibility</a></li>
        </ul>
      </nav>
      <div class="footer-services">
        <h2 class="footer-heading">Popular</h2>
        <ul>
          <li><a href="/services/hydrafacial">HydraFacial</a></li>
          <li><a href="/services/brazilian-wax">Brazilian Wax</a></li>
          <li><a href="/services/luxury-facial">Luxury Facial</a></li>
          <li><a href="/services/sugar-brazilian">Sugar Brazilian</a></li>
          <li><a href="/services#him-facials">Men's facials</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h2 class="footer-heading">Visit</h2>
        <address>
          ${esc(a.street)}<br>${esc(a.landmark)}<br>${esc(a.city)}, ${esc(a.region)} ${esc(a.zip)}<br>
          <a href="${SITE.phoneHref}">${SITE.phone}</a><br>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
        </address>
        <ul class="social-links" aria-label="Social media">
          <li><a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram (opens in a new tab)">${ICONS.instagram}</a></li>
          <li><a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook (opens in a new tab)">${ICONS.facebook}</a></li>
          <li><a href="${SITE.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok (opens in a new tab)">${ICONS.tiktok}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}. All rights reserved.</p>
      <p class="footer-tagline">Self-care isn't selfish. It's necessary.</p>
    </div>
  </div>
</footer>
<nav class="mobile-book-bar" aria-label="Quick booking">
  ${bookLink(BLVD.menu, 'Book Now', 'mobile-book-link')}
  <a href="${SITE.phoneHref}" class="mobile-call-link" aria-label="Call ${SITE.phone}">${ICONS.phone}</a>
</nav>
${bookingModal()}
${promoPopup()}
<script src="/main.js" defer></script>
</body>
</html>`;
}

function bookingModal() {
  return `<div class="bk-modal" id="booking-modal" hidden>
  <div class="bk-backdrop" data-bk-close></div>
  <div class="bk-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">
    <div class="bk-bar">
      <h2 id="booking-title" class="bk-title">Book your appointment</h2>
      <a class="bk-newtab" id="booking-newtab" href="${esc(bookUrl())}" target="_blank" rel="noopener">Open in a new tab<span class="sr-only"> (opens the online booking page)</span></a>
      <button type="button" class="bk-close" data-bk-close aria-label="Close booking">${ICONS.close}</button>
    </div>
    <div class="bk-frame-wrap">
      <p class="bk-loading" id="booking-loading">Loading online booking&hellip;</p>
      <iframe id="booking-frame" title="Taylor Made Esthetics online booking" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" data-src=""></iframe>
    </div>
  </div>
</div>`;
}

function promoPopup() {
  if (!PROMO.enabled) return '';
  return `<div class="promo-modal" id="promo-modal" data-promo-id="${esc(PROMO.id)}" hidden>
  <div class="promo-backdrop" data-promo-close></div>
  <div class="promo-dialog gold-frame" role="dialog" aria-modal="true" aria-labelledby="promo-title" aria-describedby="promo-body">
    <button type="button" class="promo-close" data-promo-close aria-label="Close offer">${ICONS.close}</button>
    <div class="promo-media"><img src="/${esc(PROMO.image)}" alt="${esc(PROMO.imageAlt)}" width="880" height="1138" loading="lazy"></div>
    <div class="promo-content">
      <p class="eyebrow">${esc(PROMO.eyebrow)}</p>
      <h2 id="promo-title" class="promo-title">${esc(PROMO.title)}</h2>
      <p class="promo-highlight">${esc(PROMO.highlight)}</p>
      <p id="promo-body" class="promo-body">${esc(PROMO.body)}</p>
      ${bookLink(PROMO.cta.path, esc(PROMO.cta.label), 'btn btn-primary btn-block')}
      <button type="button" class="promo-dismiss" data-promo-close>No thanks</button>
      <p class="promo-fine">${esc(PROMO.fine)}</p>
    </div>
  </div>
</div>`;
}

// ---------- shared blocks ----------
export function serviceCard(s, { number } = {}) {
  const cat = catById(s.cat);
  const direct = s.blvd.includes('/s_');
  return `<article class="service-card${s.featured ? ' featured' : ''}">
  ${s.badge ? `<span class="service-badge">${esc(s.badge)}</span>` : ''}
  ${number ? `<span class="service-number" aria-hidden="true">${String(number).padStart(2, '0')}</span>` : ''}
  <h3 class="service-name"><a href="/services/${s.slug}">${esc(s.name)}</a></h3>
  <p class="service-desc">${esc(s.short)}</p>
  <div class="service-foot">
    <span class="service-price">${s.from ? '<span class="service-from">from</span> ' : ''}${money(s.price)}</span>
    <div class="service-actions">
      ${bookLink(s.blvd, direct ? 'Book' : 'Book', 'btn btn-primary btn-sm')}
      <a href="/services/${s.slug}" class="service-more">Details<span class="sr-only"> about ${esc(s.name)}</span></a>
    </div>
  </div>
</article>`;
}

export function sectionHeader({ label, title, subtitle, as = 'h2', id }) {
  return `<div class="section-header">
  ${label ? `<p class="eyebrow">${label}</p>` : ''}
  <${as} class="section-title"${id ? ` id="${id}"` : ''}>${title}</${as}>
  ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
</div>`;
}

export function faqBlock(items, { title = 'Questions, answered', id = 'faq' } = {}) {
  return `<section class="section faq" id="${id}" aria-labelledby="${id}-title">
  <div class="container narrow">
    ${sectionHeader({ label: 'FAQ', title, id: `${id}-title` })}
    <div class="faq-list">
      ${items.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-answer"><p>${esc(f.a)}</p></div></details>`).join('\n')}
    </div>
  </div>
</section>`;
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  '@id': SITE.url + '/#business',
  name: SITE.name,
  image: SITE.url + '/assets/taylor-steam-facial.jpg',
  logo: SITE.url + '/assets/tme-logo.png',
  url: SITE.url + '/',
  telephone: '+1-346-219-3881',
  email: SITE.email,
  priceRange: '$$',
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.zip, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: ['Pearland TX', 'Friendswood TX', 'Manvel TX', 'Alvin TX', 'South Houston TX'],
  openingHoursSpecification: SITE.hours.filter((h) => h.opens).map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schemaDays, opens: h.opens, closes: h.closes })),
  sameAs: Object.values(SITE.social),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Skincare and waxing services',
    itemListElement: CATEGORIES.map((c) => ({ '@type': 'OfferCatalog', name: c.plural, url: `${SITE.url}/services#${c.id}` })),
  },
});

// ---------- HOME ----------
export function homePage() {
  const a = SITE.address;
  const groupBlock = (g) => {
    const cats = CATEGORIES.filter((c) => c.group === g.id);
    const anchor = g.id === 'him' ? 'for-him' : 'for-her';
    return `<section class="section services-group" id="${anchor}" aria-labelledby="${anchor}-title">
  <div class="container">
    ${sectionHeader({ label: 'Services', title: g.title, subtitle: g.subtitle, id: `${anchor}-title` })}
    <div class="tabs" data-tabs>
      <div class="tab-list" role="tablist" aria-label="${esc(g.label)} service categories">
        ${cats.map((c, i) => `<button class="tab" role="tab" type="button" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(c.label)}</button>`).join('\n        ')}
      </div>
      ${cats.map((c, i) => `<div class="tab-panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}"${i === 0 ? '' : ' hidden'}>
        <p class="tab-blurb">${esc(c.blurb)} <a href="/services#${c.id}">See all ${esc(c.plural.toLowerCase())}</a></p>
        <div class="services-grid">
          ${inCat(c.id).slice(0, 6).map((s, n) => serviceCard(s, { number: n + 1 })).join('\n')}
        </div>
        ${inCat(c.id).length > 6 ? `<p class="tab-more"><a href="/services#${c.id}" class="btn btn-outline">All ${inCat(c.id).length} ${esc(c.plural.toLowerCase())}</a></p>` : ''}
      </div>`).join('\n')}
    </div>
    <p class="addons-note">${esc(ADDONS[g.id])}</p>
  </div>
</section>`;
  };

  const hoursRows = SITE.hours.map((h) => `<tr><th scope="row">${esc(h.days)}</th><td>${h.opens ? `${h.open} to ${h.close}` : 'Closed'}</td></tr>`).join('');

  return `${head({
    title: 'Pearland Skincare and Body Waxing | Taylor Made Esthetics',
    description: 'Taylor Made Esthetics is a licensed esthetician in Pearland Town Center offering facials, HydraFacial, Brazilian waxing, sugaring and men\'s grooming in a private suite. Book online in seconds.',
    canonical: '/',
    schema: [businessSchema(), faqSchema(FAQ)],
  })}
<body class="home">
${header('')}
<main id="main" tabindex="-1">

  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-content">
        <p class="hero-script">Welcome to Taylor Made Esthetics</p>
        <h1 class="hero-title" id="hero-title">Pearland Skincare and Body Waxing</h1>
        <p class="hero-location">${esc(a.landmark)}, ${esc(a.city)}, ${esc(a.region)}</p>
        <p class="hero-desc">Luxury facials, HydraFacial, Brazilian waxing and sugaring in a private suite, tailored to your skin by a licensed esthetician. Where healthy skin meets confidence.</p>
        <div class="hero-ctas">
          ${bookLink(BLVD.menu, 'Book an Appointment', 'btn btn-primary btn-lg')}
          <a href="#quick-book" class="btn btn-outline btn-lg">Explore Services</a>
        </div>
        <ul class="hero-trust" aria-label="Highlights">
          <li>${stars('Rated five stars on Google')}<span>5-star rated on Google</span></li>
          <li><span class="trust-dot" aria-hidden="true"></span><span>Licensed esthetician</span></li>
          <li><span class="trust-dot" aria-hidden="true"></span><span>Private treatment suite</span></li>
        </ul>
      </div>
      <div class="hero-media">
        <div class="arch gold-frame">
          <video class="hero-video" muted loop playsinline preload="metadata" poster="/assets/hero-facial-poster.jpg" aria-label="A client receiving a facial: a brush applies a creamy mask across her face while she rests with a towel wrap." data-autoplay>
            <source src="/assets/hero-facial.mp4" type="video/mp4">
          </video>
          <button type="button" class="video-toggle" data-video-toggle aria-label="Pause video" aria-pressed="false">${ICONS.pause}${ICONS.play}</button>
        </div>
        <div class="hero-badge gold-frame">
          <span class="hero-badge-script">Taylor Made</span>
          <span class="hero-badge-caps">Where healthy skin meets confidence</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section quick-book" id="quick-book" aria-labelledby="quick-book-title">
    <div class="container">
      <div class="quick-book-panel gold-frame">
        <h2 class="quick-book-title" id="quick-book-title"><span class="script">Book in seconds</span> Choose where to start</h2>
        <ul class="quick-book-grid">
          ${QUICK_BOOK.map((q) => `<li class="quick-book-item">
            <span class="quick-book-icon">${icon(q.icon)}</span>
            <h3 class="quick-book-label"><a href="/${q.href}">${esc(q.label)}</a></h3>
            <p class="quick-book-sub">${esc(q.sub)}</p>
            ${bookLink(q.path, 'Book now', 'quick-book-link')}
          </li>`).join('\n')}
        </ul>
      </div>
    </div>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      ${Array(2).fill(['Facials', 'HydraFacial', 'Brazilian Wax', 'Sugaring', 'Brows & Lashes', 'Men\'s Grooming', 'Pearland, TX'].map((w) => `<span>${w}</span><span class="marquee-heart">${ICONS.heart}</span>`).join('')).join('')}
    </div>
  </div>

  <section class="section about" id="about" aria-labelledby="about-title">
    <div class="container about-grid">
      <div class="about-media">
        <div class="arch arch-photo gold-frame">
          <img src="/assets/taylor-arch.jpg" alt="Taylor, a licensed esthetician with blonde curls and black scrubs, smiling on a pink velvet sofa in her Pearland suite." width="515" height="575" loading="lazy">
        </div>
        <div class="about-thumbs">
          <img src="/assets/taylor-facial-massage.jpg" alt="Taylor gently massaging a client's face during a facial, with a pink ring light beside the bed." width="900" height="1125" loading="lazy">
          <img src="/assets/taylor-facial-treatment.jpg" alt="Taylor applying product to a client's cheeks with both hands during a facial." width="900" height="1125" loading="lazy">
        </div>
      </div>
      <div class="about-content panel">
        <p class="eyebrow">The esthetician</p>
        <h2 class="section-title" id="about-title">Meet <em>Taylor</em></h2>
        <p class="about-lead">Your skin's new best friend.</p>
        <p>Hi! I'm Taylor, owner and licensed esthetician at Taylor Made Esthetics. I specialize in corrective skincare, helping transform your complexion with treatments tailored just for you.</p>
        <h3 class="about-sub">What I do</h3>
        <p>My passion is healing your skin while empowering you with the knowledge to maintain results at home. I love making every session fun, relaxing and effective, so you leave feeling confident and cared for.</p>
        <h3 class="about-sub">Why I love this work</h3>
        <p>Building genuine connections with my guests is what makes my job so rewarding. Your skin's health and happiness is my top priority, and I can't wait to be part of your healthy skin journey.</p>
        <div class="about-ctas">
          ${bookLink(BLVD.menu, 'Book with Taylor')}
          <a href="/gallery" class="btn btn-outline">See the suite</a>
        </div>
      </div>
    </div>
  </section>

  ${GROUPS.map(groupBlock).join('\n')}

  <section class="section experience" id="experience" aria-labelledby="experience-title">
    <div class="container">
      ${sectionHeader({ label: 'Why Taylor Made', title: 'The <em>Experience</em>', subtitle: 'This isn\'t just a facial. It\'s a plan for your skin, in a room that is only yours for the hour.', id: 'experience-title' })}
      <ul class="experience-grid">
        ${EXPERIENCE.map((e) => `<li class="experience-card panel"><span class="experience-icon">${icon(e.icon)}</span><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="section membership" id="membership" aria-labelledby="membership-title">
    <div class="container">
      <div class="membership-panel gold-frame">
        <div class="membership-content">
          <p class="eyebrow">Exclusive</p>
          <h2 class="section-title" id="membership-title">VIP <em>Membership</em></h2>
          <p class="membership-desc">Join the Taylor Made Esthetics membership and enjoy member pricing on every visit.</p>
          <ul class="membership-perks">
            ${MEMBERSHIP.perks.map((p) => `<li><span class="perk-check" aria-hidden="true">&#10003;</span>${esc(p)}</li>`).join('')}
          </ul>
          ${bookLink(MEMBERSHIP.path, 'Become a VIP')}
        </div>
        <div class="membership-media">
          <video class="membership-video" muted loop playsinline preload="metadata" poster="/assets/vip-facial-poster.jpg" aria-label="An esthetician smoothing a sheet mask over a client's face by candlelight." data-autoplay>
            <source src="/assets/vip-facial.mp4" type="video/mp4">
          </video>
          <button type="button" class="video-toggle" data-video-toggle aria-label="Pause video" aria-pressed="false">${ICONS.pause}${ICONS.play}</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section reviews" id="reviews" aria-labelledby="reviews-title">
    <div class="container">
      ${sectionHeader({ label: 'Reviews', title: 'Rated 5 Stars on <em>Google</em>', subtitle: 'Real words from the people who sit in the chair.', id: 'reviews-title' })}
      <div class="reviews-grid">
        <div class="google-card panel">
          ${stars('Five out of five stars')}
          <p class="google-score"><strong>5.0</strong> on Google</p>
          <p class="google-note">Clients mention the private suite, the skin analysis and results they can see.</p>
          <a class="btn btn-outline" href="${esc(SITE.googleMaps)}" target="_blank" rel="noopener">Read reviews on Google<span class="sr-only"> (opens in a new tab)</span></a>
          <a class="reviews-leave" href="${esc(SITE.googleMaps)}" target="_blank" rel="noopener">Leave a review<span class="sr-only"> (opens in a new tab)</span></a>
        </div>
        <div class="testimonials panel" data-testimonials>
          <div class="testimonial-track" aria-live="polite">
            ${TESTIMONIALS.map((t, i) => `<figure class="testimonial${i === 0 ? ' is-active' : ''}"${i === 0 ? '' : ' hidden'}>
              ${stars('Five star review')}
              <blockquote><p>${esc(t.text)}</p></blockquote>
              <figcaption>${esc(t.author)}</figcaption>
            </figure>`).join('\n')}
          </div>
          <div class="testimonial-controls">
            <button type="button" class="t-btn" data-t-prev aria-label="Previous review">&larr;</button>
            <span class="t-count"><span data-t-index>1</span> / ${TESTIMONIALS.length}</span>
            <button type="button" class="t-btn" data-t-next aria-label="Next review">&rarr;</button>
          </div>
        </div>
      </div>
      <div class="reviews-widget">
        <script src="https://elfsightcdn.com/platform.js" async></script>
        <div class="elfsight-app-${SITE.elfsightApp}" data-elfsight-app-lazy></div>
      </div>
    </div>
  </section>

  ${faqBlock(FAQ)}

  <section class="section contact" id="contact" aria-labelledby="contact-title">
    <div class="container contact-grid">
      <div class="contact-info panel">
        <p class="eyebrow">Visit</p>
        <h2 class="section-title" id="contact-title">Book Your <em>Glow</em></h2>
        <div class="contact-items">
          <div class="contact-item"><span class="contact-icon">${ICONS.pin}</span><div><h3>Location</h3><p>${esc(a.street)}<br>${esc(a.landmark)}<br>${esc(a.city)}, ${esc(a.region)} ${esc(a.zip)}</p><a href="${esc(SITE.googleMaps)}" target="_blank" rel="noopener">Get directions<span class="sr-only"> (opens Google Maps in a new tab)</span></a></div></div>
          <div class="contact-item"><span class="contact-icon">${ICONS.clock}</span><div><h3>Hours</h3><table class="hours"><tbody>${hoursRows}</tbody></table></div></div>
          <div class="contact-item"><span class="contact-icon">${ICONS.phone}</span><div><h3>Contact</h3><p><a href="${SITE.phoneHref}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p></div></div>
        </div>
        ${bookLink(BLVD.menu, 'Book an Appointment', 'btn btn-primary btn-lg')}
      </div>
      <div class="contact-map gold-frame">
        <iframe src="${esc(SITE.mapEmbed)}" width="100%" height="100%" style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map showing Taylor Made Esthetics at Pearland Town Center"></iframe>
      </div>
    </div>
  </section>

</main>
${footer()}`;
}

// ---------- SERVICES INDEX ----------
export function servicesIndexPage() {
  return `${head({
    title: 'Facials, Waxing & Skincare Services in Pearland, TX | Taylor Made Esthetics',
    description: 'Every service at Taylor Made Esthetics with prices: facials, HydraFacial, Brazilian and body waxing, sugaring, brows and lashes, spa packages and men\'s grooming in Pearland, TX. Book any service online.',
    canonical: '/services',
    schema: [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: SITE.url + '/services' }] }],
  })}
<body class="services-page">
${header('services')}
<main id="main" tabindex="-1">
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Services</li></ol></nav>
      <p class="hero-script">Our menu</p>
      <h1 class="page-title" id="page-title">Skincare and Waxing Services in Pearland, TX</h1>
      <p class="page-lead">Every service is listed with its price and books directly online. Not sure where to start? <a href="/#contact">Call or text Taylor</a> and she will point you to the right one.</p>
      <nav class="jump-nav" aria-label="Service categories">
        ${GROUPS.map((g) => `<div class="jump-group"><span class="jump-label">${esc(g.label)}</span>${CATEGORIES.filter((c) => c.group === g.id).map((c) => `<a href="#${c.id}">${esc(c.label)}</a>`).join('')}</div>`).join('')}
      </nav>
    </div>
  </section>
  ${GROUPS.map((g) => `<section class="section services-group-all" aria-labelledby="g-${g.id}">
    <div class="container">
      <h2 class="section-title" id="g-${g.id}">${g.title}</h2>
      ${CATEGORIES.filter((c) => c.group === g.id).map((c) => `<div class="cat-block" id="${c.id}">
        <div class="cat-head">
          <h3 class="cat-title">${esc(c.plural)}</h3>
          <p class="cat-blurb">${esc(c.blurb)}</p>
          ${bookLink(c.blvd, `Book ${esc(c.label.toLowerCase())}`, 'btn btn-outline btn-sm')}
        </div>
        <div class="services-grid">
          ${inCat(c.id).map((s, n) => serviceCard(s, { number: n + 1 })).join('\n')}
        </div>
      </div>`).join('\n')}
      <p class="addons-note">${esc(ADDONS[g.id])}</p>
    </div>
  </section>`).join('\n')}
  ${ctaBand()}
</main>
${footer()}`;
}

function ctaBand(title = 'Ready when you are', text = 'Pick a time that works, confirm in a few taps, and walk into a private suite that is ready for you.') {
  return `<section class="section cta-band" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-panel gold-frame">
      <p class="hero-script">${esc(title)}</p>
      <h2 class="section-title" id="cta-title">Book your appointment <em>online</em></h2>
      <p>${esc(text)}</p>
      <div class="hero-ctas">
        ${bookLink(BLVD.menu, 'Book an Appointment', 'btn btn-primary btn-lg')}
        <a href="${SITE.phoneHref}" class="btn btn-outline btn-lg">Call ${SITE.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

// ---------- SERVICE DETAIL ----------
export function servicePage(s) {
  const cat = catById(s.cat);
  const group = GROUPS.find((g) => g.id === cat.group);
  const guide = GUIDES[cat.guide];
  const related = inCat(s.cat).filter((x) => x.slug !== s.slug).slice(0, 3);
  const direct = s.blvd.includes('/s_');
  const title = `${s.name} in Pearland, TX | Taylor Made Esthetics`;
  const description = `${s.short} ${money(s.price)} at Taylor Made Esthetics, a private esthetics suite in Pearland Town Center. Book online.`.slice(0, 158);
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      serviceType: cat.plural,
      description: s.long,
      provider: { '@id': SITE.url + '/#business' },
      areaServed: { '@type': 'City', name: 'Pearland' },
      url: `${SITE.url}/services/${s.slug}`,
      offers: { '@type': 'Offer', price: s.price, priceCurrency: 'USD', url: bookUrl(s.blvd), availability: 'https://schema.org/InStock' },
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE.url + '/services' },
      { '@type': 'ListItem', position: 3, name: cat.plural, item: `${SITE.url}/services#${cat.id}` },
      { '@type': 'ListItem', position: 4, name: s.name, item: `${SITE.url}/services/${s.slug}` },
    ] },
    faqSchema(guide.faq),
  ];
  const list = (items) => `<ul class="check-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  return `${head({ title, description, canonical: `/services/${s.slug}`, schema })}
<body class="service-page">
${header('services')}
<main id="main" tabindex="-1">
  <section class="page-hero service-hero" aria-labelledby="page-title">
    <div class="container service-hero-grid">
      <div>
        <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li><a href="/services#${cat.id}">${esc(cat.plural)}</a></li><li aria-current="page">${esc(s.name)}</li></ol></nav>
        <p class="hero-script">${esc(group.label)} &middot; ${esc(cat.label)}</p>
        <h1 class="page-title" id="page-title">${esc(s.name)} in Pearland, TX</h1>
        <p class="page-lead">${esc(s.short)}</p>
        <div class="service-hero-meta">
          <span class="service-price-lg">${s.from ? '<span class="service-from">from</span> ' : ''}${money(s.price)}</span>
          <span class="service-location">${ICONS.pin}Pearland Town Center</span>
        </div>
        <div class="hero-ctas">
          ${bookLink(s.blvd, direct ? `Book ${esc(s.name)}` : `Book ${esc(cat.label.toLowerCase())}`, 'btn btn-primary btn-lg')}
          <a href="${SITE.phoneHref}" class="btn btn-outline btn-lg">Call to book</a>
        </div>
        ${direct ? '' : `<p class="service-note">Choose this from the ${esc(cat.label.toLowerCase())} menu when you book, or call and Taylor will set it up for you.</p>`}
      </div>
      <aside class="service-side panel" aria-label="Quick facts">
        <h2 class="side-title">Good to know</h2>
        <dl class="facts">
          <div><dt>Price</dt><dd>${money(s.price)}</dd></div>
          <div><dt>Category</dt><dd><a href="/services#${cat.id}">${esc(cat.plural)}</a></dd></div>
          <div><dt>Where</dt><dd>Private suite, ${esc(SITE.address.landmark)}</dd></div>
          <div><dt>Best for</dt><dd>${esc(s.bestFor)}</dd></div>
        </dl>
      </aside>
    </div>
  </section>

  <section class="section service-body" aria-labelledby="about-service">
    <div class="container service-columns">
      <div class="service-main panel">
        <h2 id="about-service">About the ${esc(s.name)}</h2>
        <p class="service-long">${esc(s.long)}</p>
        <h2>What to expect</h2>
        ${list(guide.expect)}
        <h2>Before your appointment</h2>
        ${list(guide.prep)}
        <h2>Aftercare</h2>
        ${list(guide.after)}
        ${guide.faq.map((f) => `<h2>${esc(f.q)}</h2><p>${esc(f.a)}</p>`).join('\n')}
        <div class="service-inline-cta">
          ${bookLink(s.blvd, 'Book this service', 'btn btn-primary')}
          <a href="/services" class="btn btn-outline">All services</a>
        </div>
      </div>
      <aside class="service-related" aria-labelledby="related-title">
        <h2 id="related-title" class="related-title">More ${esc(cat.plural.toLowerCase())}</h2>
        <div class="related-list">
          ${related.map((r) => `<a class="related-card panel" href="/services/${r.slug}"><span class="related-name">${esc(r.name)}</span><span class="related-price">${money(r.price)}</span></a>`).join('\n')}
          <a class="related-all" href="/services#${cat.id}">See all ${esc(cat.plural.toLowerCase())}${ICONS.arrow}</a>
        </div>
        <div class="related-card panel related-contact">
          <p class="eyebrow">Questions?</p>
          <p>Call or text <a href="${SITE.phoneHref}">${SITE.phone}</a> and Taylor will help you choose.</p>
        </div>
      </aside>
    </div>
  </section>
  ${ctaBand('Pearland, TX', `Taylor Made Esthetics is inside ${SITE.address.landmark} at ${SITE.address.street}. Free parking, private suite, and online booking that takes seconds.`)}
</main>
${footer()}`;
}

// ---------- GALLERY ----------
export function galleryPage() {
  return `${head({
    title: 'Gallery | Taylor Made Esthetics, Pearland TX',
    description: 'A look inside the Taylor Made Esthetics suite in Pearland Town Center: facials in progress, client results and the private treatment room.',
    canonical: '/gallery',
  })}
<body class="gallery-page">
${header('gallery')}
<main id="main" tabindex="-1">
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Gallery</li></ol></nav>
      <p class="hero-script">Inside the suite</p>
      <h1 class="page-title" id="page-title">The Gallery</h1>
      <p class="page-lead">Treatments in progress, happy clients and the private room where it all happens.</p>
    </div>
  </section>
  <section class="section" aria-label="Photos and videos">
    <div class="container">
      <ul class="gallery-grid">
        ${GALLERY.map((g, i) => g.type === 'video'
          ? `<li class="gallery-item gold-frame"><div class="gallery-video"><video controls preload="none" playsinline poster="/${g.poster}" width="${g.w}" height="${g.h}" aria-label="${esc(g.alt)}"><source src="/${g.src}" type="video/mp4"></video></div>${g.caption ? `<p class="gallery-caption">${esc(g.caption)}</p>` : ''}</li>`
          : `<li class="gallery-item gold-frame"><button type="button" class="gallery-open" data-lightbox="/${g.src}" data-alt="${esc(g.alt)}" aria-label="View larger: ${esc(g.alt)}"><img src="/${g.src}" alt="${esc(g.alt)}" width="${g.w}" height="${g.h}" loading="${i < 2 ? 'eager' : 'lazy'}"></button></li>`).join('\n')}
      </ul>
    </div>
  </section>
  ${ctaBand()}
  <div class="lightbox" id="lightbox" hidden>
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-dialog" role="dialog" aria-modal="true" aria-label="Enlarged photo">
      <button type="button" class="lightbox-close" data-lightbox-close aria-label="Close enlarged photo">${ICONS.close}</button>
      <img id="lightbox-img" src="" alt="">
    </div>
  </div>
</main>
${footer()}`;
}

// ---------- ACCESSIBILITY STATEMENT ----------
export function accessibilityPage() {
  return `${head({
    title: 'Accessibility Statement | Taylor Made Esthetics',
    description: 'Taylor Made Esthetics is committed to a website that everyone can use. Read what we do to meet WCAG 2.2 AA and how to reach us if something is in your way.',
    canonical: '/accessibility',
  })}
<body class="text-page">
${header('accessibility')}
<main id="main" tabindex="-1">
  <section class="page-hero" aria-labelledby="page-title">
    <div class="container narrow">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Accessibility</li></ol></nav>
      <h1 class="page-title" id="page-title">Accessibility Statement</h1>
      <p class="page-lead">We want every client to be able to learn about our services and book an appointment, whatever device or assistive technology they use.</p>
    </div>
  </section>
  <section class="section">
    <div class="container narrow panel prose">
      <h2>Our commitment</h2>
      <p>Taylor Made Esthetics aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA on this website. These guidelines explain how to make web content more usable for people with disabilities, and more pleasant for everyone.</p>
      <h2>What we have done</h2>
      <ul>
        <li>Every page can be used with a keyboard alone, with a visible focus indicator and a skip link to the main content.</li>
        <li>Text and background colors meet the recommended contrast ratios.</li>
        <li>Images carry text descriptions, and videos have descriptions and a pause control. Background videos do not play if your device asks for reduced motion.</li>
        <li>Headings, landmarks and link text are structured so screen readers can move through a page quickly.</li>
        <li>The booking window and offer window are announced as dialogs, keep keyboard focus inside while open, and close with the Escape key.</li>
        <li>Pages reflow on small screens and at 400% zoom without sideways scrolling.</li>
      </ul>
      <h2>Online booking</h2>
      <p>Appointments are booked through Boulevard, a third-party booking system that opens inside this site. If any part of the booking process is hard to use, call or text <a href="${SITE.phoneHref}">${SITE.phone}</a> and we will book it for you.</p>
      <h2>Tell us if something is in your way</h2>
      <p>If you find a part of this site that does not work for you, let us know and we will fix it or offer the information another way.</p>
      <ul>
        <li>Phone or text: <a href="${SITE.phoneHref}">${SITE.phone}</a></li>
        <li>Email: <a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul>
      <p>This statement was last reviewed on October 16, 2026.</p>
    </div>
  </section>
</main>
${footer()}`;
}

// ---------- 404 ----------
export function notFoundPage() {
  return `${head({ title: 'Page not found | Taylor Made Esthetics', description: 'That page could not be found.', canonical: '/404', noindex: true })}
<body class="text-page">
${header('')}
<main id="main" tabindex="-1">
  <section class="page-hero"><div class="container narrow">
    <p class="hero-script">Oops</p>
    <h1 class="page-title">We couldn't find that page</h1>
    <p class="page-lead">The link may be old or mistyped. Try the <a href="/services">services menu</a> or head back <a href="/">home</a>.</p>
    <div class="hero-ctas">${bookLink(BLVD.menu, 'Book an Appointment', 'btn btn-primary btn-lg')}</div>
  </div></section>
</main>
${footer()}`;
}

export { SERVICES, CATEGORIES, SITE };
