/* ─────────────────────────────────────────────
   ForwardLine — shared tokens, primitives, nav
   (website build — routing-aware)
   ───────────────────────────────────────────── */

const FL_NAVY     = '#181E30';
const FL_NAVY_2   = '#222A40';
const FL_INK      = '#2E2E2E';
const FL_GRAPHITE = '#6E6A66';
const FL_STONE    = '#A9A39A';
const FL_SAND     = '#C4B8A3';
const FL_SAND_2   = '#D8CCBB';
const FL_IVORY    = '#F4EFE3';
const FL_IVORY_2  = '#FAF6EC';
const FL_LINEN    = '#EBE3D2';
const FL_GOLD     = '#A78A4E';

/* Slightly darker than the page-ivory — rail outlines read against ivory */
const FL_RAIL_STROKE = '#A89B82';

const FL_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const FL_CAPS    = "'Cinzel', 'Cormorant Garamond', serif";
const FL_BODY    = "'Lora', Georgia, serif";

/* Height of the fixed utility strip (quarter intake) and the promo banner
   stacked beneath it. FL_STRIP_H is the live total — App() applies it as
   body padding-top / scroll-padding-top at runtime, so toggling
   FL_PROMO.enabled never leaves a stale gap in index.html. */
const FL_UTILITY_H = 32;
const FL_PROMO_H   = 53;

/* ─────────────────────────────────────────────
   Promo banner — single source of truth
   Set enabled:false to pull the banner from every page instantly.
   landingUrl: the new offer's landing page (go.forwardline.co.za).
   Wording matches that page's hero. *Short fields are the phone version.
   ───────────────────────────────────────────── */
const FL_PROMO = {
  enabled:       true,
  landingUrl:    'https://go.forwardline.co.za/?utm_source=forwardline-site&utm_medium=banner&utm_campaign=site-banner',
  badge:         'New Service',
  badgeShort:    'New',
  headline:      'Your ads get clicks. Where are the meetings?',
  headlineShort: 'Clicks but no meetings?',
  cta:           'See how we fix it',
  ctaShort:      'See how',
};

/* Utility strip is currently hidden (App() no longer renders FLUtilityStrip),
   so the promo banner is the sole fixed top bar. FL_STRIP_H — the runtime
   body padding-top / scroll-padding-top / snap reference — is therefore just
   the banner height. Restore `FL_UTILITY_H +` here if the strip comes back. */
const FL_STRIP_H = (FL_PROMO.enabled ? FL_PROMO_H : 0);

/* ─────────────────────────────────────────────
   Intake / availability — single source of truth
   ───────────────────────────────────────────── */
const FL_INTAKE = {
  currentQuarter:       'Q3 2026',
  currentQuarterMonths: 'Jul — Sep',
  currentBooked:        5,
  currentTotal:         5,
  nextQuarter:          'Q4 2026',
  nextQuarterMonths:    'Oct — Dec',
  nextBooked:           2,
  nextTotal:            5,
};

function flIntake() { return FL_INTAKE; }
function useFLIntake() { return flIntake(); }

function flSpotsPhrase(booked, total) {
  const left = total - booked;
  if (left <= 0)       return 'Full';
  if (left === 1)      return '1 spot left';
  if (left === 2)      return '2 spots remaining';
  if (booked === 0)    return `${total} spots open`;
  return `${left} of ${total} spots open`;
}
/* Compact 'X spot(s) left' / 'Full' — for headlines that pair with the
   booked-bars below (so the same intake numbers drive both copies). */
function flLeftPhrase(booked, total) {
  const left = total - booked;
  if (left <= 0)  return 'Full';
  if (left === 1) return '1 spot left';
  return `${left} spots left`;
}
/* 'X / Y spots taken' / 'Full' — used in CTA progress bars. Linked to
   flLeftPhrase so when one updates the other follows automatically. */
function flTakenPhrase(booked, total) {
  if (booked >= total) return 'Full';
  return `${booked}/${total} spots taken`;
}
function flShortPhrase(booked, total) {
  const left = total - booked;
  if (left <= 0)  return 'Full';
  if (left === 1) return '1 left';
  return `${left} / ${total}`;
}
function flStatusLabel(booked, total) {
  if (booked >= total) return 'Full';
  return 'Now Open';
}
function flFillPercent(booked, total) {
  if (total === 0) return '0%';
  return `${Math.round((booked / total) * 100)}%`;
}

const FL_IMG = {
  hero:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80&auto=format&fit=crop',
  signature:  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80&auto=format&fit=crop',
  handshake:  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80&auto=format&fit=crop',
  kanban:     'https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=1400&q=80&auto=format&fit=crop',
  typewriter: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80&auto=format&fit=crop',
  office:     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80&auto=format&fit=crop',
  meeting:    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=80&auto=format&fit=crop',
  desk:       'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1400&q=80&auto=format&fit=crop',
  papers:     'https://images.unsplash.com/photo-1568000750475-865d68dd9c4e?w=1400&q=80&auto=format&fit=crop',
  contact:    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&q=80&auto=format&fit=crop',
};

/* ── Responsive breakpoint hook ── */
function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'lg';
    const w = window.innerWidth;
    if (w < 480)  return 'xs';
    if (w < 768)  return 'sm';
    if (w < 1024) return 'md';
    return 'lg';
  };
  const [bp, setBp] = React.useState(get);
  React.useEffect(() => {
    const h = () => setBp(get());
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return bp;
}

/* ── Viewport-height hook — for sizing snap sections ── */
function useViewportHeight() {
  const [vh, setVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  React.useEffect(() => {
    const h = () => setVh(window.innerHeight);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return vh;
}

/* ── Snap tracker ──
   Returns {index, progress, count} for the currently active section.
   Reads any element matching `selector` (default: section[data-snap]).
   `progress` is 0..1 within the active section, measured against an
   upper-third reference line — feels right against mandatory snap. */
function useSnapTracker(selector = 'section[data-fl-section]') {
  const [state, setState] = React.useState({ index: 0, progress: 0, count: 0 });
  React.useEffect(() => {
    let raf = 0;
    const measure = () => {
      const sections = Array.from(document.querySelectorAll(selector));
      const count = sections.length;
      if (!count) { setState(s => (s.count === 0 ? s : { index: 0, progress: 0, count: 0 })); return; }
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      /* End-of-page short-circuit. When the user has scrolled to the
         very bottom of the document (e.g. into the footer), the last
         section's rect.top can still be positive — especially when
         the section is shorter than the viewport — and the
         (snapTop - r.top) / h calc clamps to 0. Force the rail full
         in that case so the progress reads correctly at journey's end. */
      if (window.scrollY + vh >= docH - 4) {
        setState(prev => {
          if (prev.index === count - 1 && prev.progress === 1 && prev.count === count) return prev;
          return { index: count - 1, progress: 1, count };
        });
        return;
      }
      const refY = vh * 0.35; // reference line for "active" detection
      // Progress is measured against the snap-line (top of the visible
      // area, just below the fixed strip). That way, when a section is
      // snapped to the top, progress is exactly 0 — the fill rests on
      // the diamond above it and doesn't overshoot.
      const snapTop = FL_STRIP_H;
      let idx = 0;
      let prog = 0;
      for (let i = count - 1; i >= 0; i--) {
        const r = sections[i].getBoundingClientRect();
        if (r.top <= refY + 0.5) {
          idx = i;
          const h = Math.max(1, r.height);
          prog = Math.min(1, Math.max(0, (snapTop - r.top) / h));
          break;
        }
      }
      setState(prev => {
        if (prev.index === idx && prev.count === count && Math.abs(prev.progress - prog) < 0.005) return prev;
        return { index: idx, progress: prog, count };
      });
    };
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    /* Re-measure shortly after mount in case sections render late */
    const t = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 250);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t); clearTimeout(t2);
    };
  }, [selector]);
  return state;
}

/* ── Reveal host ──
   Wrap a <section> in this to auto-add `is-in` when it enters viewport.
   Descendant elements with .fl-reveal (+ .fl-rN delay) animate in. */
function useRevealOnEnter(ref, opts = {}) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    let done = false;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !done) {
          done = true;
          el.classList.add('is-in');
          obs.disconnect();
          break;
        }
      }
    }, { threshold: opts.threshold ?? 0.22 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

/* Drop-in wrapper that does both: marks itself a snap section AND
   becomes a reveal host. */
function FLSection({ id, snap = true, revealThreshold = 0.22, style, children, ...rest }) {
  const ref = React.useRef(null);
  useRevealOnEnter(ref, { threshold: revealThreshold });
  const dataAttrs = {
    'data-fl-section': 'true',
    ...(snap ? { 'data-snap': 'true' } : {}),
  };
  return (
    <section
      ref={ref}
      id={id}
      className="fl-reveal-host"
      style={style}
      {...dataAttrs}
      {...rest}
    >
      {children}
    </section>
  );
}

/* ── Section rail — imperial column ──
   SVG: diamond cap, double-line vertical body, segment dividers with
   center-diamond markers, navy fill that grows past + within current.
   Hidden until past the first section. */
function FLSectionRail({ count = 6, currentIndex = 0, progress = 0, visible = false }) {
  // Geometry
  const W       = 18;
  const capH    = 18;   // height of each triangular cap (top points up, bottom points down)
  const segH    = 56;
  const bodyH   = segH * count;
  const H       = capH * 2 + bodyH;

  const innerX1 = 4;
  const innerX2 = W - 4;
  const innerW  = innerX2 - innerX1;

  // Fill grows through past segments + smoothly through current.
  // The progress passed in is already clamped so the fill rests exactly
  // on the diamond when a section is snapped to the top.
  const fillRaw = currentIndex * segH + Math.max(0, Math.min(1, progress)) * segH;
  const fillH   = Math.max(0, Math.min(bodyH, fillRaw));

  const stroke    = FL_RAIL_STROKE;
  const strokeIn  = '#BFB196';   // inner double-line, a touch lighter
  const bg        = FL_IVORY;
  const navy      = FL_NAVY;

  const cx = W / 2;
  const bodyTop = capH;
  const bodyBot = capH + bodyH;

  // Divider y-positions (between segments)
  const dividers = Array.from({ length: count - 1 }, (_, i) => bodyTop + (i + 1) * segH);

  return (
    <div className={`fl-rail-wrap${visible ? ' is-visible' : ''}`} aria-hidden="true">
      <svg
        className="fl-rail-svg"
        width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      >
        <defs>
          {/* Clip the fill to the inner body rectangle so corners stay clean */}
          <clipPath id="fl-rail-body-clip">
            <rect x={innerX1 + 1} y={bodyTop + 1} width={innerW - 2} height={bodyH - 2} />
          </clipPath>
        </defs>

        {/* ── Top triangle cap (points up, base flush with body) ── */}
        <path d={`M ${cx} 0 L ${W - 0.5} ${capH} L 0.5 ${capH} Z`}
              fill={bg} stroke={stroke} strokeWidth="1" />
        <path d={`M ${cx} 4.2 L ${W - 3} ${capH - 0.8} L 3 ${capH - 0.8} Z`}
              fill="none" stroke={strokeIn} strokeWidth="0.7" />

        {/* ── Body outer (double-line) ── */}
        <rect x="0.5" y={bodyTop} width={W - 1} height={bodyH}
              fill={bg} stroke={stroke} strokeWidth="1" />
        <rect x={innerX1} y={bodyTop + 0.5} width={innerW} height={bodyH - 1}
              fill="none" stroke={strokeIn} strokeWidth="0.7" />

        {/* ── Navy fill ── */}
        <g clipPath="url(#fl-rail-body-clip)">
          <rect
            className="fl-rail-fill"
            x={innerX1 + 1}
            y={bodyTop + 1}
            width={innerW - 2}
            height={fillH}
            fill={navy}
          />
        </g>

        {/* ── Segment dividers + center diamond markers ── */}
        {dividers.map((y, i) => {
          const passed = fillRaw >= (i + 1) * segH - 0.5;
          const markerFill = passed ? FL_SAND_2 : stroke;
          const markerStroke = passed ? FL_SAND_2 : stroke;
          return (
            <g key={i}>
              <line
                x1={innerX1} x2={innerX2} y1={y} y2={y}
                stroke={passed ? 'rgba(216,204,187,.55)' : strokeIn}
                strokeWidth="0.7"
              />
              <path
                d={`M ${cx} ${y - 2.4} L ${cx + 2.4} ${y} L ${cx} ${y + 2.4} L ${cx - 2.4} ${y} Z`}
                fill={markerFill}
                stroke={markerStroke}
                strokeWidth="0.5"
                style={{ transition: 'fill .4s ease, stroke .4s ease' }}
              />
            </g>
          );
        })}

        {/* ── Bottom triangle cap (points down, base flush with body) ── */}
        <path d={`M 0.5 ${bodyBot} L ${W - 0.5} ${bodyBot} L ${cx} ${H} Z`}
              fill={bg} stroke={stroke} strokeWidth="1" />
        <path d={`M 3 ${bodyBot + 0.8} L ${W - 3} ${bodyBot + 0.8} L ${cx} ${H - 4.2} Z`}
              fill="none" stroke={strokeIn} strokeWidth="0.7" />
      </svg>
    </div>
  );
}

/* ── Logo (links home) ── */
function FLLogo({ color = FL_NAVY, size = 22 }) {
  return (
    <a href="#/" style={{ display:'flex', alignItems:'center', gap:10, color, textDecoration:'none' }}>
      <svg width={size * 1.35} height={size} viewBox="0 0 32 24" fill="none" style={{ display:'block' }}>
        <path d="M2 22 L2 16 L9 16 L9 10 L16 10 L16 4 L26 4"
          stroke={color} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
        <path d="M22 1 L29 4 L26 9"
          stroke={color} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
      </svg>
      <span style={{ fontFamily: FL_DISPLAY, fontWeight: 600, fontSize: size, letterSpacing: 0.2, color, lineHeight: 1 }}>
        ForwardLine
      </span>
    </a>
  );
}

/* ── Ornamental divider ── */
function FLDivider({ color = FL_SAND, mark = FL_NAVY, width = '100%' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, width, justifyContent:'center' }}>
      <div style={{ flex:1, height:1, background:color }} />
      <span style={{ color: mark, fontSize: 9, letterSpacing: 4, transform:'translateY(-1px)' }}>◆</span>
      <div style={{ flex:1, height:1, background:color }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Analytics helpers (GA4 / gtag)
   Thin, safe wrappers — no-op if gtag isn't loaded
   (e.g. blocked by an extension) so the UI never breaks.
   ───────────────────────────────────────────── */
function flTrack(name, params) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  } catch (e) { /* analytics must never break the page */ }
}
/* Reusable tool tracker — for the future tools section.
   Usage from any tool: flTrackTool('roi-calculator', 'open')
   GA then ranks tools by tool_name under the tool_interaction event. */
function flTrackTool(toolName, action) {
  flTrack('tool_interaction', { tool_name: toolName, tool_action: action || 'open' });
}

/* ── Button — <a> or <button type=submit> ── */
function FLButton({ children, variant = 'filled', href, onClick, style: extra = {}, type, disabled, track, ...rest }) {
  const base = {
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
    padding:'14px 28px', fontSize:11, fontFamily: FL_CAPS,
    letterSpacing: 2.6, textTransform:'uppercase', fontWeight:500,
    cursor: disabled ? 'default' : 'pointer',
    textDecoration:'none', borderRadius:0,
    transition:'opacity .2s ease',
    opacity: disabled ? 0.55 : 1,
  };
  const flVariants = {
    filled:   { background: FL_NAVY,    color: FL_IVORY_2, border: `1px solid ${FL_NAVY}` },
    outline:  { background:'transparent', color: FL_NAVY,  border: `1px solid ${FL_NAVY}` },
    ghost:    { background:'transparent', color: FL_IVORY_2, border:'1px solid rgba(244,239,227,.5)' },
    sand:     { background: FL_SAND_2,  color: FL_NAVY,    border: `1px solid ${FL_SAND_2}` },
    whatsapp: { background:'transparent', color:'#1B7A47', border:'1px solid #1B7A47' },
  };
  const s = { ...base, ...flVariants[variant], ...extra };

  /* Every CTA flows through here, so one handler tracks them all.
     Label comes from `track` if given, else the button text (arrow
     and trailing whitespace stripped). */
  const ctaLabel = track
    || (typeof children === 'string' ? children.replace(/[→\s]+$/, '').trim() : 'Button');
  const handleClick = (e) => {
    if (!disabled) {
      flTrack('cta_click', {
        cta_label:   ctaLabel,
        cta_variant: variant,
        page_path:   (typeof window !== 'undefined' && window.location.hash) || '#/',
      });
    }
    if (onClick) onClick(e);
  };

  if (type === 'submit') {
    return <button type="submit" disabled={disabled} onClick={handleClick} style={s} {...rest}>{children}</button>;
  }
  return <a href={href || '#/contact'} onClick={handleClick} style={s} {...rest}>{children}</a>;
}

/* ── Eyebrow label ── */
function FLEyebrow({ children, color = FL_GRAPHITE, style: extra = {} }) {
  return (
    <span style={{ fontFamily: FL_CAPS, fontSize:15, letterSpacing:4, textTransform:'uppercase', color, fontWeight:500, ...extra }}>
      {children}
    </span>
  );
}

/* ── Photo block with optional overlay ── */
function FLPhoto({ src, alt = '', overlay = 0, style: extra = {}, children }) {
  return (
    <div style={{
      position:'relative', overflow:'hidden', background: FL_SAND,
      backgroundImage: `url(${src})`, backgroundSize:'cover',
      backgroundPosition:'center', ...extra,
    }} aria-label={alt}>
      {overlay > 0 && <div style={{ position:'absolute', inset:0, background:`rgba(24,30,48,${overlay})` }} />}
      {children}
    </div>
  );
}

/* ── Utility strip — FIXED at top, sitewide ──
   Q3 2026 status shows current intake (full).
   Q4 2026 "Now Open" becomes an underlined "Reserve your spot" link
   when there's availability — anchors to the contact page. */
function FLUtilityStrip() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';
  const intake = useFLIntake();

  const currentFull = intake.currentBooked >= intake.currentTotal;
  const nextFull    = intake.nextBooked    >= intake.nextTotal;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: FL_UTILITY_H,
        background: FL_NAVY,
        color: FL_SAND_2,
        padding: isMobile ? '0 24px' : '0 40px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        fontFamily: FL_CAPS,
        fontSize:10,
        letterSpacing:3,
        textTransform:'uppercase',
        zIndex: 100,
        borderBottom: `1px solid rgba(216,204,187,.18)`,
      }}
    >
      <span style={{ opacity:.92 }}>Growth Consultancy</span>
      {!isMobile && (
        <span style={{ display:'flex', gap:24, alignItems:'center' }}>
          <span style={{ opacity: currentFull ? 0.78 : 0.92 }}>
            {intake.currentQuarter} — {currentFull ? 'Full' : flShortPhrase(intake.currentBooked, intake.currentTotal)}
          </span>
          <span style={{ opacity:.55 }}>·</span>
          {nextFull ? (
            <span style={{ opacity:.78 }}>{intake.nextQuarter} — Full</span>
          ) : (
            <span style={{ display:'inline-flex', gap:8, alignItems:'center' }}>
              <span style={{ opacity:.92 }}>{intake.nextQuarter} —</span>
              <a
                href="#/contact"
                style={{
                  color: 'rgba(216,204,187,.85)',
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1,
                  textDecorationColor: 'rgba(216,204,187,.45)',
                  fontWeight: 500,
                  letterSpacing: 3,
                }}
              >
                Reserve your spot
              </a>
            </span>
          )}
        </span>
      )}
    </div>
  );
}

/* ── Promo banner ──
   Stacked directly beneath the utility strip — same fixed-header family,
   but visually its own segment (gold, bolder) so it reads as an
   announcement, not routine intake status. Whole bar is a link out to
   the launch landing page. Rendered from App() on every in-app page;
   standalone landing pages live outside this SPA so they never see it. */
function FLPromoBanner() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';
  if (!FL_PROMO.enabled) return null;

  const badgeText    = isMobile ? FL_PROMO.badgeShort : FL_PROMO.badge;
  const headlineText = isMobile ? FL_PROMO.headlineShort : FL_PROMO.headline;
  const ctaText      = isMobile ? FL_PROMO.ctaShort : FL_PROMO.cta;

  return (
    <a
      href={FL_PROMO.landingUrl}
      onClick={() => flTrack('promo_banner_click', { destination: FL_PROMO.landingUrl })}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: FL_PROMO_H,
        background: `linear-gradient(90deg, #B6975C 0%, ${FL_GOLD} 100%)`,
        color: FL_NAVY,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? 6 : 20,
        padding: isMobile ? '0 6px' : '0 40px',
        textDecoration: 'none',
        zIndex: 99,
        borderBottom: `1px solid rgba(24,30,48,.25)`,
        overflow: 'hidden',
      }}
    >
      <span style={{
        fontFamily: FL_CAPS, fontSize: isMobile ? 12 : 12, letterSpacing: isMobile ? 0 : 2,
        textTransform: 'uppercase', background: FL_NAVY, color: FL_SAND_2,
        padding: isMobile ? '3px 4px' : '4px 9px', flexShrink: 0, fontWeight: 600,
      }}>
        {badgeText}
      </span>
      <span style={{
        fontFamily: FL_BODY, fontWeight: 700, fontSize: isMobile ? 14 : 17,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1, minWidth: 0,
      }}>
        {headlineText}
      </span>
      <span style={{
        fontFamily: FL_CAPS, fontSize: isMobile ? 13 : 13, letterSpacing: isMobile ? 0 : 2,
        textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: 3,
        flexShrink: 0, fontWeight: 600,
      }}>
        {ctaText} →
      </span>
    </a>
  );
}

/* ── Navigation ── */
function FLNav({ active = 'Home', onDark = false }) {
  const [open, setOpen] = React.useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';
  const fg     = onDark ? FL_IVORY_2 : FL_NAVY;
  const muted  = onDark ? 'rgba(244,239,227,.65)' : FL_GRAPHITE;
  const border = onDark ? 'rgba(244,239,227,.15)' : FL_SAND_2;
  const navBg  = onDark ? 'transparent' : FL_IVORY;
  const links  = [
    { id:'Home',       label:'Home',       href:'#/' },
    { id:'What We Do', label:'What We Do', href:'#/wwd' },
    { id:'Free Tools', label:'Free Tools', href:'#/tools' },
    { id:'Contact',    label:'Contact',    href:'#/contact' },
  ];
  return (
    <>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: isMobile ? '18px 24px' : '22px 40px',
        borderBottom: `1px solid ${border}`,
        background: navBg, position:'relative', zIndex:10,
      }}>
        <FLLogo color={fg} size={22} />

        {!isMobile && (
          <div style={{ display:'flex', gap:36, alignItems:'center' }}>
            {links.map(l => {
              const active_ = l.id === active;
              return (
                <a key={l.id} href={l.href} style={{
                  fontFamily: FL_CAPS, fontSize:11, letterSpacing:3, textTransform:'uppercase',
                  textDecoration:'none', color: active_ ? fg : muted,
                  fontWeight: active_ ? 600 : 400, paddingBottom:4,
                  borderBottom: active_ ? `1px solid ${onDark ? FL_SAND_2 : FL_NAVY}` : '1px solid transparent',
                }}>{l.label}</a>
              );
            })}
          </div>
        )}

        {!isMobile && (
          <FLButton href="#/contact" variant={onDark ? 'ghost' : 'filled'}>Book a Call →</FLButton>
        )}

        {isMobile && (
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{
            background:'none', border:'none', cursor:'pointer', padding:8,
            display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end',
          }}>
            <span style={{ width:22, height:1.5, background:fg, display:'block' }} />
            <span style={{ width:22, height:1.5, background:fg, display:'block' }} />
            <span style={{ width: open ? 22 : 15, height:1.5, background:fg, display:'block', transition:'width .2s' }} />
          </button>
        )}
      </div>

      {isMobile && open && (
        <div style={{
          background: onDark ? FL_NAVY_2 : FL_IVORY,
          borderBottom: `1px solid ${border}`,
          padding:'8px 24px 20px',
        }}>
          {links.map(l => (
            <a key={l.id} href={l.href} onClick={() => setOpen(false)} style={{
              display:'block', fontFamily: FL_CAPS, fontSize:11, letterSpacing:3,
              textTransform:'uppercase', textDecoration:'none',
              color: l.id === active ? fg : muted,
              padding:'14px 0', borderBottom:`1px solid ${border}`,
            }}>{l.label}</a>
          ))}
          <div style={{ paddingTop:16 }}>
            <FLButton href="#/contact" variant={onDark ? 'ghost' : 'filled'} onClick={() => setOpen(false)}>
              Book a Call →
            </FLButton>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Footer ── */
function FLFooter() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';

  /* Some footer links deep-anchor into a section of another page.
     The hash-router resets scroll on route change, so an inline anchor
     like #fl-wwd-process wouldn't survive. This handler navigates to
     the right route first, then scrolls the target into view on the
     next tick once the route has rendered. */
  const handleDeepLink = (e, route, targetId) => {
    e.preventDefault();
    const goScroll = () => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (window.location.hash === route || (route === '#/' && (window.location.hash === '' || window.location.hash === '#/'))) {
      goScroll();
    } else {
      window.location.hash = route;
      /* Wait for the router's 180ms fade + render before scrolling */
      setTimeout(goScroll, 280);
    }
  };

  return (
    <footer style={{ background: FL_NAVY, color: FL_IVORY_2, padding: isMobile ? '36px 24px 20px' : '40px 40px 22px' }}>
      <div style={{
        display:'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr 1fr',
        gap: isMobile ? 28 : 48,
        paddingBottom: 28, borderBottom:'1px solid rgba(244,239,227,.12)',
      }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <FLLogo color={FL_IVORY_2} size={22} />
          <p style={{ fontFamily: FL_BODY, fontSize:13, lineHeight:1.7, color:'rgba(244,239,227,.65)', maxWidth:300, margin:0 }}>
            A growth consultancy for owners and general managers ready to move past the ceiling they hit.
          </p>
        </div>
        {[
          { title:'Navigate',   items:[['Home','#/',null],['What We Do','#/wwd',null],['Free Tools','#/tools',null],['Contact','#/contact',null]] },
          { title:'Engagement', items:[['The Quarter','#/wwd',null],['Process','#/wwd','fl-wwd-process'],["What's Included",'#/wwd','fl-wwd-included']] },
          { title:'Reach Us',   items:[['forwardlinesa@gmail.com','mailto:forwardlinesa@gmail.com',null],['Facebook','https://www.facebook.com/ForwardLineSA/',null]] },
        ].map(col => (
          <div key={col.title} style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <FLEyebrow color={FL_SAND_2} style={{ fontSize:10, letterSpacing:3.5 }}>{col.title}</FLEyebrow>
            {col.items.map(([label, href, target]) => (
              <a
                key={label}
                href={href}
                onClick={target ? (e => handleDeepLink(e, href, target)) : undefined}
                style={{ fontFamily: FL_BODY, fontSize:13, color:'rgba(244,239,227,.7)', textDecoration:'none' }}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:16, fontFamily: FL_CAPS, fontSize:10, letterSpacing:3,
        color:'rgba(244,239,227,.5)', textTransform:'uppercase',
        flexWrap:'wrap', gap:12,
      }}>
        <span>© 2026 ForwardLine Consultancy</span>
        {!isMobile && <span>Find and Fix Business Growth Blockers</span>}
        <span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('fl-open-consent')); }}
            style={{ color: 'inherit', textDecoration: 'none', letterSpacing: 'inherit' }}
          >
            Privacy
          </a>
          {' · Terms'}
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FLConsent — "The Calling Card"
   A premium cookie-consent notice that slides up from the
   bottom-right like a placed piece of correspondence. Wired to
   Google Consent Mode v2: analytics stays cookieless until the
   visitor accepts. Choice is remembered in localStorage and the
   card can be re-opened from the footer's "Privacy" link.
   ───────────────────────────────────────────── */
const FL_CONSENT_KEY = 'fl-analytics-consent';

function flStoreConsent(value) {            // value: 'granted' | 'denied'
  try { localStorage.setItem(FL_CONSENT_KEY, value); } catch (e) {}
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: value });
      if (value === 'granted') {
        /* Re-send a pageview for the current route now that cookies
           are allowed, so this visit is counted with full fidelity. */
        window.gtag('event', 'page_view', {
          page_location: window.location.href,
          page_path:     window.location.hash || '#/',
        });
      }
    }
  } catch (e) {}
}

/* On/off toggle — navy when on, sand track when off. */
function FLToggle({ on, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      style={{
        width: 40, height: 22, borderRadius: 11, border: 'none',
        background: on ? FL_NAVY : FL_SAND,
        position: 'relative', cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1, transition: 'background .2s ease',
        flexShrink: 0, padding: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 18, height: 18, borderRadius: '50%', background: FL_IVORY_2,
        boxShadow: '0 1px 2px rgba(24,30,48,.3)', transition: 'left .2s ease',
      }} />
    </button>
  );
}

function FLConsent() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';

  const [visible, setVisible]   = React.useState(false);
  const [leaving, setLeaving]   = React.useState(false);   // drives slide-out
  const [expanded, setExpanded] = React.useState(false);
  const [analyticsOn, setAnalyticsOn] = React.useState(true);

  const readStored = () => {
    try { return localStorage.getItem(FL_CONSENT_KEY); } catch (e) { return null; }
  };

  /* First visit → reveal after a beat (lets the page settle first).
     Returning visitor with a saved choice → stay hidden. The entrance
     is a CSS keyframe (below), so it never depends on a JS frame
     callback landing at the right moment. */
  React.useEffect(() => {
    if (!readStored()) {
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  /* Footer "Privacy" link re-opens the card with current choice loaded. */
  React.useEffect(() => {
    const open = () => {
      setExpanded(true);
      setAnalyticsOn(readStored() !== 'denied');
      setLeaving(false);
      setVisible(true);
    };
    window.addEventListener('fl-open-consent', open);
    return () => window.removeEventListener('fl-open-consent', open);
  }, []);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => { setVisible(false); setLeaving(false); setExpanded(false); }, 400);
  };

  const choose = (value) => { flStoreConsent(value); dismiss(); };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy preferences"
      style={{
        position: 'fixed', zIndex: 200,
        bottom: isMobile ? 16 : 24,
        right:  isMobile ? 16 : 24,
        left:   isMobile ? 16 : 'auto',
        width:  isMobile ? 'auto' : 380,
        maxWidth: 'calc(100vw - 32px)',
        background: FL_IVORY_2,
        border: `1px solid ${FL_SAND}`,
        boxShadow: '0 2px 6px rgba(24,30,48,.10), 0 18px 50px rgba(24,30,48,.22)',
        padding: '24px 24px 22px',
        animation: leaving
          ? 'flConsentOut .38s cubic-bezier(.4,0,1,1) forwards'
          : 'flConsentIn .55s cubic-bezier(.22,.61,.36,1) both',
        fontFamily: FL_BODY, color: FL_NAVY,
      }}
    >
      <style>{`
        @keyframes flConsentIn  { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flConsentOut { from { opacity: 1; transform: translateY(0); }    to { opacity: 0; transform: translateY(22px); } }
      `}</style>

      {/* Eyebrow + diamond divider — the "letterhead" */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
        <FLEyebrow color={FL_GRAPHITE} style={{ fontSize: 10, letterSpacing: 3.5 }}>A Note on Privacy</FLEyebrow>
        <FLDivider color={FL_SAND} mark={FL_GOLD} />
      </div>

      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: FL_INK }}>
        We use a quiet bit of analytics to understand how owners find and move through
        ForwardLine — which pages and tools matter most. Nothing intrusive, and entirely
        your call.
      </p>

      {/* Customize panel */}
      {expanded && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${FL_LINEN}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: FL_NAVY }}>Necessary</span>
              <span style={{ fontSize: 12.5, color: FL_GRAPHITE, lineHeight: 1.5 }}>Required for the site to work.</span>
            </div>
            <FLToggle on={true} disabled onChange={() => {}} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: FL_NAVY }}>Analytics</span>
              <span style={{ fontSize: 12.5, color: FL_GRAPHITE, lineHeight: 1.5 }}>Helps us see which pages and tools matter most.</span>
            </div>
            <FLToggle on={analyticsOn} onChange={setAnalyticsOn} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {expanded ? (
          <FLButton variant="filled" track="Consent · Save Choices"
            onClick={(e) => { e.preventDefault(); choose(analyticsOn ? 'granted' : 'denied'); }}
            style={{ width: '100%', padding: '12px 20px' }}>
            Save Choices
          </FLButton>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <FLButton variant="filled" track="Consent · Accept"
              onClick={(e) => { e.preventDefault(); choose('granted'); }}
              style={{ flex: 1, padding: '12px 20px' }}>
              Accept
            </FLButton>
            <FLButton variant="outline" track="Consent · Necessary Only"
              onClick={(e) => { e.preventDefault(); choose('denied'); }}
              style={{ flex: 1, padding: '12px 20px' }}>
              Necessary Only
            </FLButton>
          </div>
        )}
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
              color: FL_GRAPHITE, textDecoration: 'underline', textUnderlineOffset: 3,
              paddingTop: 2,
            }}
          >
            Customize
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  flTrack, flTrackTool, FLConsent,
  FL_NAVY, FL_NAVY_2, FL_INK, FL_GRAPHITE, FL_STONE,
  FL_SAND, FL_SAND_2, FL_IVORY, FL_IVORY_2, FL_LINEN, FL_GOLD,
  FL_RAIL_STROKE, FL_STRIP_H, FL_UTILITY_H, FL_PROMO_H, FL_PROMO,
  FL_DISPLAY, FL_CAPS, FL_BODY, FL_IMG,
  FL_INTAKE, flIntake, useFLIntake, flSpotsPhrase, flLeftPhrase, flTakenPhrase, flShortPhrase, flStatusLabel, flFillPercent,
  useBreakpoint, useViewportHeight, useSnapTracker, useRevealOnEnter,
  FLLogo, FLDivider, FLButton, FLEyebrow, FLPhoto, FLSection, FLSectionRail,
  FLUtilityStrip, FLPromoBanner, FLNav, FLFooter,
});
