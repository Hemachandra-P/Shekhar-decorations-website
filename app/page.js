'use client';

import { useEffect, useMemo, useState } from 'react';

const PHONE = '7386243888';
const phoneHref = `tel:+91${PHONE}`;
const whatsappHref = `https://wa.me/91${PHONE}`;

const content = {
  en: {
    tagline: 'Your Vision, Our Expertise',
    nav: ['Home', 'About', 'Services', 'Gallery', 'Contact'],
    heroEyebrow: 'Wedding & Event Decoration • Srikakulam & Andhra Pradesh',
    heroTitle: 'Elegant spaces for\nmoments worth remembering.',
    heroText: 'Shekhar Events creates beautiful wedding, reception, engagement and celebration decorations with a personal touch.',
    galleryBtn: 'View Our Work',
    contactBtn: 'Talk to Us',
    servicesEyebrow: 'What We Do', servicesTitle: 'Designed around your celebration',
    services: [
      ['01', 'Wedding Decoration', 'Elegant stage, entrance and venue styling for your special day.'],
      ['02', 'Reception & Stage', 'Sophisticated backdrops, floral details and memorable stage concepts.'],
      ['03', 'Engagement Events', 'Beautiful setups designed around your family, theme and celebration.'],
      ['04', 'Special Celebrations', 'Decorations for birthdays, housewarmings and other occasions.'],
    ],
    aboutEyebrow: 'About Shekhar Events', aboutTitle: 'Every celebration deserves its own atmosphere.',
    aboutText: 'Based in Srikakulam, Shekhar Events brings creative decoration ideas to weddings and celebrations across Andhra Pradesh. We focus on elegant presentation, thoughtful details and a setup that feels special from the moment guests arrive.',
    aboutPoints: ['Elegant and clean designs', 'Custom concepts for every event', 'Service across Andhra Pradesh', 'Attention to detail from setup to finish'],
    galleryEyebrow: 'Our Work', galleryTitle: 'Real celebrations. Real decorations.',
    galleryText: 'Explore selected event work. New photographs can be added anytime through the private admin gallery.',
    contactEyebrow: 'Let’s Create Something Beautiful', contactTitle: 'Planning a celebration?',
    contactText: 'Call or WhatsApp us with your event date, venue and requirements. We will discuss a decoration concept that suits your occasion.',
    call: 'Call Us', whatsapp: 'WhatsApp', location: 'Service Area', locationValue: 'Srikakulam & anywhere in Andhra Pradesh',
    footer: 'Your celebration • Our decoration • Your memories', rights: '© 2026 Shekhar Events. All rights reserved.',
    featured: 'Featured Decoration',
    openPhoto: 'Open photo',
  },
  te: {
    tagline: 'మీ ఆలోచన • మా నైపుణ్యం',
    nav: ['హోమ్', 'మా గురించి', 'సేవలు', 'గ్యాలరీ', 'సంప్రదించండి'],
    heroEyebrow: 'వివాహ & వేడుకల అలంకరణ • శ్రీకాకుళం & ఆంధ్రప్రదేశ్',
    heroTitle: 'మరచిపోలేని క్షణాలకు\nఅందమైన అలంకరణలు.',
    heroText: 'వివాహాలు, రిసెప్షన్లు, ఎంగేజ్‌మెంట్లు మరియు ఇతర వేడుకలకు ప్రత్యేకమైన, అందమైన అలంకరణలను షేఖర్ ఈవెంట్స్ అందిస్తుంది.',
    galleryBtn: 'మా పనిని చూడండి', contactBtn: 'మాతో మాట్లాడండి',
    servicesEyebrow: 'మా సేవలు', servicesTitle: 'మీ వేడుకకు ప్రత్యేకమైన అలంకరణ',
    services: [
      ['01', 'వివాహ అలంకరణ', 'మీ ప్రత్యేక రోజుకు అందమైన స్టేజ్, ప్రవేశ ద్వారం మరియు వేదిక అలంకరణ.'],
      ['02', 'రిసెప్షన్ & స్టేజ్', 'అందమైన బ్యాక్‌డ్రాప్‌లు, పూల అలంకరణలు మరియు ప్రత్యేకమైన స్టేజ్ డిజైన్లు.'],
      ['03', 'ఎంగేజ్‌మెంట్ వేడుకలు', 'మీ కుటుంబం, థీమ్ మరియు వేడుకకు సరిపోయే అందమైన అలంకరణ.'],
      ['04', 'ఇతర శుభకార్యాలు', 'పుట్టినరోజులు, గృహప్రవేశం మరియు ఇతర ప్రత్యేక సందర్భాలకు అలంకరణ.'],
    ],
    aboutEyebrow: 'షేఖర్ ఈవెంట్స్ గురించి', aboutTitle: 'ప్రతి వేడుకకు ప్రత్యేకమైన అందం ఉండాలి.',
    aboutText: 'శ్రీకాకుళం కేంద్రంగా షేఖర్ ఈవెంట్స్ ఆంధ్రప్రదేశ్ అంతటా వివాహాలు మరియు ఇతర వేడుకలకు అందమైన అలంకరణలను అందిస్తుంది. అతిథులు వచ్చిన మొదటి క్షణం నుంచే వేడుక ప్రత్యేకంగా కనిపించేలా ప్రతి వివరాన్నీ శ్రద్ధగా రూపొందిస్తాం.',
    aboutPoints: ['అందమైన మరియు సొగసైన డిజైన్లు', 'ప్రతి వేడుకకు అనుగుణమైన కస్టమ్ డిజైన్లు', 'ఆంధ్రప్రదేశ్ అంతటా సేవలు', 'చివరి వివరాల వరకు ప్రత్యేక శ్రద్ధ'],
    galleryEyebrow: 'మా పని', galleryTitle: 'నిజమైన వేడుకలు. నిజమైన అలంకరణలు.',
    galleryText: 'మా ఈవెంట్ అలంకరణలలో కొన్నింటిని చూడండి. కొత్త ఫోటోలను ప్రైవేట్ అడ్మిన్ గ్యాలరీ ద్వారా ఎప్పుడైనా జోడించవచ్చు.',
    contactEyebrow: 'అందమైన వేడుకను కలిసి సృష్టిద్దాం', contactTitle: 'మీ వేడుకను ప్లాన్ చేస్తున్నారా?',
    contactText: 'మీ వేడుక తేదీ, వేదిక మరియు అవసరాలను కాల్ లేదా వాట్సాప్ ద్వారా మాతో పంచుకోండి. మీ వేడుకకు సరిపోయే అలంకరణ గురించి మాట్లాడుకుందాం.',
    call: 'కాల్ చేయండి', whatsapp: 'వాట్సాప్', location: 'సేవా ప్రాంతం', locationValue: 'శ్రీకాకుళం & ఆంధ్రప్రదేశ్ అంతటా',
    footer: 'మీ వేడుక • మా అలంకరణ • మీ జ్ఞాపకం', rights: '© 2026 Shekhar Events. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',
    featured: 'ప్రత్యేక అలంకరణ',
    openPhoto: 'ఫోటో తెరవండి',
  }
};

const localGallery = Array.from({ length: 15 }, (_, i) => ({
  id: `local-${i + 1}`,
  url: `/events/event-${String(i + 1).padStart(2, '0')}.webp`,
  title: `Shekhar Events decoration ${i + 1}`,
}));

export default function Home() {
  const [lang, setLang] = useState('en');
  const [menu, setMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [photos, setPhotos] = useState(localGallery);
  const [selected, setSelected] = useState(null);
  const t = content[lang];

  useEffect(() => setVisible(true), []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/photos', { cache: 'no-store' })
  .then(async (r) => {
    const data = await r.json();

    if (!r.ok) {
      throw new Error(data.error || 'Failed to load photos');
    }

    return data;
  })
  .then(({ photos }) => {
    if (!cancelled && Array.isArray(photos)) {
      setPhotos(photos);
    }
  })
  .catch((error) => {
    console.error('Gallery loading error:', error);
  });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  const featuredPhotos = useMemo(() => photos.slice(0, 6), [photos]);

  return (
    <main>
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-glow glow-a" /><div className="ambient-glow glow-b" /><div className="ambient-glow glow-c" />
        <div className="bokeh bokeh-a" /><div className="bokeh bokeh-b" /><div className="bokeh bokeh-c" /><div className="bokeh bokeh-d" />
        <div className="light-swoop swoop-one" /><div className="light-swoop swoop-two" />
        <div className="hanging-lights top-lights">{Array.from({ length: 11 }, (_, i) => <span key={i} />)}</div>
        <div className="hanging-lights side-lights">{Array.from({ length: 7 }, (_, i) => <span key={i} />)}</div>
        <div className="sparkle-field">{Array.from({ length: 30 }, (_, i) => <i key={i} className={`sparkle sparkle-${i + 1}`}>✦</i>)}</div>
        <div className="floating-decor decor-one">❋</div><div className="floating-decor decor-two">✧</div><div className="floating-decor decor-three">◇</div><div className="floating-decor decor-four">✦</div>
      </div>

      <header className="header">
        <div className="nav-wrap">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Shekhar Events home">
            <img src="/shekar-events-logo.png" alt="Shekhar Events logo" />
            <span><b>SHEKHAR EVENTS</b><small>{t.tagline}</small></span>
          </button>
         <nav className={menu ? 'nav open' : 'nav'}>
  {t.nav.map((x, i) => (
    <button
      key={x}
      onClick={() =>
        scrollTo(['home', 'about', 'services', 'gallery', 'contact'][i])
      }
    >
      {x}
    </button>
  ))}

  <a className="mobile-admin-link" href="/admin">
    🔐 Admin
  </a>
</nav>
          <div className="actions">
            <div className="lang"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><span>/</span><button className={lang === 'te' ? 'active' : ''} onClick={() => setLang('te')}>TE</button></div>
            <a className="admin-link" href="/admin" aria-label="Admin">Admin</a>
            <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className={visible ? 'eyebrow reveal' : 'eyebrow'}>{t.heroEyebrow}</div>
          <h1 className={visible ? 'reveal delay1' : 'reveal'}>{t.heroTitle.split('\n').map((s, i) => <span key={i}>{s}</span>)}</h1>
          <p className={visible ? 'hero-text reveal delay2' : 'hero-text'}>{t.heroText}</p>
          <div className={visible ? 'hero-buttons reveal delay3' : 'hero-buttons'}>
            <button className="btn primary" onClick={() => scrollTo('gallery')}>{t.galleryBtn}<span>↗</span></button>
            <a className="btn ghost" href={whatsappHref} target="_blank" rel="noreferrer">{t.contactBtn}</a>
          </div>
          <div className="hero-meta"><span>✦ Elegant</span><span>✦ Personalised</span><span>✦ Memorable</span></div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img className="hero-photo" src={featuredPhotos[0]?.url} alt={featuredPhotos[0]?.title || 'Shekhar Events decoration'} />
            <div className="hero-photo-overlay" />
            <div className="hero-photo-label"><span>✦</span><div><b>{t.featured}</b><small>SHEKHAR EVENTS</small></div></div>
            <div className="hero-logo-orbit"><span /><span /><img src="/shekar-events-logo.png" alt="Shekhar Events logo" /></div>
          </div>
        </div>
        <div className="scroll-note">SCROLL <span>↓</span></div>
      </section>

      <section id="services" className="services section">
        <div className="section-heading"><div><div className="eyebrow">{t.servicesEyebrow}</div><h2>{t.servicesTitle}</h2></div><p>✦</p></div>
        <div className="service-grid">{t.services.map(([n, title, text]) => <article className="service" key={n}><span className="service-num">{n}</span><div><h3>{title}</h3><p>{text}</p></div><span className="arrow">↗</span></article>)}</div>
      </section>

      <section id="about" className="about section">
        <div className="about-card about-brand-card">
          <div className="about-logo-halo"><img src="/shekar-events-logo.png" alt="Shekhar Events emblem" /></div>
          <div className="about-badge"><span>✦</span><b>SHEKHAR EVENTS</b><small>{t.tagline}</small></div>
        </div>
        <div className="about-copy"><div className="eyebrow">{t.aboutEyebrow}</div><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="points">{t.aboutPoints.map((p) => <div key={p}><span>✓</span>{p}</div>)}</div><a className="text-btn" href={phoneHref}>{t.call} <span>→</span></a></div>
      </section>

      <section id="gallery" className="gallery section">
        <div className="gallery-heading"><div><div className="eyebrow">{t.galleryEyebrow}</div><h2>{t.galleryTitle}</h2></div><p>{t.galleryText}</p></div>
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <button className={`gallery-item item-${(i % 6) + 1}`} key={photo.id} onClick={() => setSelected(photo)} aria-label={`${t.openPhoto}: ${photo.title}`}>
              <img src={photo.url} alt={photo.title} loading={i < 4 ? 'eager' : 'lazy'} />
              <span className="gallery-shade" /><span className="gallery-caption"><small>✦ SHEKHAR EVENTS</small><b>{photo.title}</b></span>
            </button>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="contact-inner">
          <div><div className="eyebrow">{t.contactEyebrow}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
          <div className="contact-actions">
            <a className="contact-card" href={phoneHref}><span>☎</span><div><small>{t.call}</small><b>+91 {PHONE}</b></div><i>↗</i></a>
            <a className="contact-card" href={whatsappHref} target="_blank" rel="noreferrer"><span>◉</span><div><small>{t.whatsapp}</small><b>+91 {PHONE}</b></div><i>↗</i></a>
            <div className="location-card"><span>⌖</span><div><small>{t.location}</small><b>{t.locationValue}</b></div></div>
          </div>
        </div>
      </section>

      <footer><div className="footer-brand"><img src="/shekar-events-logo.png" alt="" /> <span>SHEKHAR EVENTS</span></div><p>{t.footer}</p><small>{t.rights}</small></footer>
      <div className="mobile-contact"><a href={phoneHref} aria-label="Call">☎</a><a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">◉</a></div>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          <img src={selected.url} alt={selected.title} onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-title">{selected.title}</div>
        </div>
      )}
    </main>
  );
}
