/* ─────────────────────────────────────────────
   ForwardLine — Home page (website)

   Layout strategy:
   - Six snap sections, each min-height: calc(100vh - 32px)
   - Fixed utility strip lives in App shell (not here)
   - FLSection auto-marks data-snap + .fl-reveal-host
   - .fl-reveal + .fl-rN children stagger in on entry
   ───────────────────────────────────────────── */

/* ── Testimonial rotator ──
   Two quotes from past clients. Auto-advances every 7s with a
   gentle crossfade; pause on hover; manual dots for control.

   COPY-LENGTH RULE — keep each quote short enough to fit ~4 lines on
   desktop (roughly 220 characters max). The slot grows to fit its
   text, so a longer quote won't overlap — but it CAN push the whole
   section past one viewport and break the scroll-snap. Stay at or
   under Andre's length below; if a quote is longer, trim it. */
const FL_TESTIMONIALS = [
  {
    initial: 'R',
    name: 'Ronald',
    location: 'Client · South Africa',
    quote: 'He asks the right questions, helps you see opportunities you may have overlooked, and unlocks things you didn\u2019t even realize were holding you back.',
  },
  {
    initial: 'A',
    name: 'Andre',
    location: 'Client · South Africa',
    quote: 'What truly sets Hancke apart is his ability to fully invest himself in your business. Your vision and success become his own, and he approaches every challenge with a level of strategic thinking that is truly unique.',
  },
];

function FLTestimonialRotator({ isMobile }) {
  const [idx, setIdx] = React.useState(0);
  /* Rotation interval — long enough to read calmly, short enough to
     not feel like waiting. The crossfade itself is generous (below)
     so the *change* feels considered, not abrupt. */
  const ROT_MS = 9500;
  /* Quote/attribution crossfade — slow & soft. Matches the rest of
     the page's eased motion vocabulary. */
  const FADE_MS = 1600;
  const FADE_EASE = 'cubic-bezier(.55,.05,.45,.95)';

  /* Reset the timer every time `idx` changes — so manual clicks
     don't fight the rotation, and the carousel never gets stuck. */
  React.useEffect(() => {
    const id = setTimeout(() => {
      setIdx(i => (i + 1) % FL_TESTIMONIALS.length);
    }, ROT_MS);
    return () => clearTimeout(id);
  }, [idx]);

  return (
    <div
      style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        textAlign:'center', gap: isMobile ? 18 : 22,
        paddingBottom: isMobile ? 30 : 30,
      }}
    >
      <FLEyebrow className="fl-reveal fl-r1" color="rgba(216,204,187,.78)">
        People who’ve worked with Hancke
      </FLEyebrow>

      <span className="fl-reveal fl-r2" style={{
        fontFamily: FL_DISPLAY, fontSize: isMobile ? 80 : 110,
        lineHeight:0.5, color: FL_SAND_2, fontStyle:'italic', fontWeight:500,
      }}>"</span>

      {/* Quote slot — all quotes are stacked in a single CSS-grid cell
          (every child at grid-area 1/1). They overlap for the crossfade,
          but the cell auto-sizes to the TALLEST quote, so a longer quote
          can never overflow and collide with the attribution below.
          Never give this slot a fixed height: it must grow with content. */}
      <div className="fl-reveal fl-r3" style={{
        display:'grid', width:'100%', maxWidth:880,
      }}>
        {FL_TESTIMONIALS.map((row, i) => (
          <p
            key={i}
            aria-hidden={i !== idx}
            style={{
              gridArea:'1 / 1', margin:0,
              fontFamily: FL_DISPLAY,
              fontSize: isMobile ? 26 : 38,
              lineHeight:1.32, color: FL_IVORY_2, fontWeight:500, letterSpacing:-0.3,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity ${FADE_MS}ms ${FADE_EASE}, transform ${FADE_MS}ms ${FADE_EASE}`,
              pointerEvents: i === idx ? 'auto' : 'none',
            }}
          >
            {row.quote}
          </p>
        ))}
      </div>

      {/* Attribution — also crossfades with the quote. Same grid-cell
          stacking as the quote slot so it sizes to its tallest row
          (a longer name can't clip). No fixed height here either. */}
      <div className="fl-reveal fl-r4" style={{
        display:'grid', marginTop:8, minWidth: 280,
      }}>
        {FL_TESTIMONIALS.map((row, i) => (
          <div key={i}
            aria-hidden={i !== idx}
            style={{
              gridArea:'1 / 1',
              display:'flex', alignItems:'center', justifyContent:'center', gap:14,
              opacity: i === idx ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ${FADE_EASE}`,
              pointerEvents: i === idx ? 'auto' : 'none',
            }}
          >
            <div style={{
              width:48, height:48, borderRadius:'50%',
              background: FL_NAVY_2, border:`1px solid ${FL_SAND}`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <span style={{ fontFamily: FL_DISPLAY, fontSize:20, fontWeight:600, color: FL_SAND_2 }}>{row.initial}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:2, textAlign:'left' }}>
              <span style={{ fontFamily: FL_DISPLAY, fontSize:17, fontWeight:600, color: FL_IVORY_2 }}>{row.name}</span>
              <span style={{ fontFamily: FL_CAPS, fontSize:9.5, letterSpacing:2.5, textTransform:'uppercase', color:'rgba(216,204,187,.7)' }}>
                {row.location}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator — each marker fills with a slow sand line
          while it is active, hinting at the wait until the next quote.
          Inactive markers are short hairlines with a centered gold dot. */}
      <div className="fl-reveal fl-r4" style={{
        display:'flex', alignItems:'center', gap:18, marginTop:6,
      }}>
        <span style={{
          fontFamily: FL_CAPS, fontSize:9.5, letterSpacing:3,
          textTransform:'uppercase', color:'rgba(216,204,187,.55)',
          minWidth: 28, textAlign:'right',
        }}>
          {String(idx + 1).padStart(2, '0')}
        </span>

        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          {FL_TESTIMONIALS.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIdx(i)}
                style={{
                  appearance:'none', background:'transparent', border:0,
                  padding:'10px 0', cursor:'pointer', lineHeight:0,
                  display:'flex', alignItems:'center',
                }}
              >
                <span style={{
                  position:'relative', display:'block',
                  width: active ? 56 : 18, height: 1,
                  background: 'rgba(216,204,187,.22)',
                  transition: 'width 900ms cubic-bezier(.5,0,.2,1)',
                }}>
                  {/* Centered gold dot — quiet anchor on each marker */}
                  <span style={{
                    position:'absolute', top:'50%', left:'50%',
                    transform:'translate(-50%,-50%)',
                    width: active ? 4 : 3, height: active ? 4 : 3,
                    borderRadius:'50%',
                    background: active ? FL_SAND_2 : 'rgba(216,204,187,.55)',
                    transition: 'all 600ms ease',
                  }} />
                  {/* Sand-coloured progress fill — restarts when idx changes */}
                  {active && (
                    <span
                      key={idx}
                      style={{
                        position:'absolute', top:0, left:0, height:'100%',
                        background: `linear-gradient(90deg, ${FL_SAND_2}, ${FL_GOLD})`,
                        animation: `flTestiFill ${ROT_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <span style={{
          fontFamily: FL_CAPS, fontSize:9.5, letterSpacing:3,
          textTransform:'uppercase', color:'rgba(216,204,187,.55)',
          minWidth: 28, textAlign:'left',
        }}>
          {String(FL_TESTIMONIALS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Local keyframes — scoped style tag is fine, React keeps it in DOM. */}
      <style>{`
        @keyframes flTestiFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function FLHome() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';
  const isXs     = bp === 'xs';
  const isMd     = bp === 'md';

  const heroSize   = isXs ? 36 : isMobile ? 48 : isMd ? 60 : 84;
  const h2Size     = isMobile ? 34 : isMd ? 40 : 50;

  const intake = useFLIntake();
  const isCurrentFull = intake.currentBooked >= intake.currentTotal;
  const isNextFull    = intake.nextBooked    >= intake.nextTotal;
  const isBothFull    = isCurrentFull && isNextFull;
  const featuredQ      = isCurrentFull ? intake.nextQuarter : intake.currentQuarter;
  const featuredBooked = isCurrentFull ? intake.nextBooked  : intake.currentBooked;
  const featuredTotal  = isCurrentFull ? intake.nextTotal   : intake.currentTotal;
  const featuredPhrase = flSpotsPhrase(featuredBooked, featuredTotal);

  /* Headline phrasing for the CTA — links the "X spots left" copy
     directly to the same intake numbers driving the bar captions. */
  const ctaIntakeLine = isBothFull
    ? `Both ${intake.currentQuarter} and ${intake.nextQuarter} are full. Join the waitlist for priority access when our next quarter opens.`
    : isCurrentFull
      ? `${intake.currentQuarter} is full · ${intake.nextQuarter}: ${flLeftPhrase(intake.nextBooked, intake.nextTotal)}. We close intake the moment the quarter fills — no exceptions.`
      : `${intake.currentQuarter}: ${flLeftPhrase(intake.currentBooked, intake.currentTotal)} · ${intake.nextQuarter}: ${flLeftPhrase(intake.nextBooked, intake.nextTotal)}. We close intake the moment the quarter fills — no exceptions.`;

  /* Track which snap section we're on, and progress within it */
  const tracker = useSnapTracker();
  const railVisible = !isMobile && tracker.index >= 1;

  /* Section height: viewport minus fixed utility strip */
  const sectionMinH = `calc(100vh - ${FL_STRIP_H}px)`;

  return (
    <div style={{ background: FL_IVORY, fontFamily: FL_BODY, color: FL_NAVY }}>

      {/* ── Section 1 — Hero ── */}
      <FLSection
        id="fl-sec-hero"
        style={{
          position:'relative',
          minHeight: sectionMinH,
          display:'flex',
          flexDirection:'column',
        }}
      >
        <FLPhoto src={FL_IMG.hero} overlay={0.55} style={{ position:'absolute', inset:0 }} />
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', flex:1, minHeight:0 }}>
          <FLNav active="Home" onDark />
          <div style={{
            flex:1,
            padding: isMobile ? '40px 24px' : '28px 40px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            gap: isMobile ? 22 : 20,
            textAlign:'center',
          }}>
            <FLEyebrow className="fl-reveal fl-r1" color="rgba(244,239,227,.78)" style={{ fontSize: isMobile ? 12 : 15, letterSpacing: isMobile ? 3 : 4 }}>
              For South African IT companies and MSPs running ads
            </FLEyebrow>
            <h1 className="fl-reveal fl-r2" style={{
              margin:0, fontFamily: FL_DISPLAY, color: FL_IVORY_2,
              fontSize: heroSize, lineHeight:1.02, fontWeight:500,
              letterSpacing:-1, maxWidth:1000,
            }}>
              We turn your ad clicks into
              <span style={{ fontStyle:'italic', fontWeight:400 }}> booked meetings.</span>
            </h1>
            <div className="fl-reveal fl-r3" style={{ width:120 }}>
              <FLDivider color="rgba(244,239,227,.35)" mark={FL_SAND_2} width="120px" />
            </div>
            <p className="fl-reveal fl-r4" style={{
              margin:0, fontFamily: FL_DISPLAY,
              fontSize: isMobile ? 21 : 26,
              fontStyle:'italic', color:'rgba(244,239,227,.85)',
              maxWidth:640, lineHeight:1.5, fontWeight:400,
            }}>
              We build the page, sales video and form. Our AI caller Susie phones each lead within 5 minutes.
            </p>
            <p className="fl-reveal fl-r4" style={{
              margin:0, fontFamily: FL_BODY, fontSize: isMobile ? 14 : 15,
              color:'rgba(244,239,227,.78)', maxWidth:560, lineHeight:1.6,
            }}>
              Double your meetings in 90 days, or your monthly fee stops. <span style={{ fontStyle:'italic' }}>If you qualify.</span>
            </p>
            <div className="fl-reveal fl-r5" style={{ display:'flex', gap:14, marginTop:4, flexWrap:'wrap', justifyContent:'center' }}>
              <FLButton href={flGo('button', 'home-hero')} variant="sand">Book my call →</FLButton>
              <FLButton href="#/wwd"     variant="ghost">See how it works</FLButton>
            </div>
          </div>
          {!isMobile && (
            <div className="fl-reveal fl-r6" style={{
              display:'flex', justifyContent:'center', alignItems:'center',
              padding:'18px 40px', borderTop:'1px solid rgba(244,239,227,.18)',
              color:'rgba(244,239,227,.7)', fontFamily: FL_CAPS,
              fontSize:12, letterSpacing:3, textTransform:'uppercase', textAlign:'center',
            }}>
              <span>We filled in the contact forms of 10 SA IT companies running ads. 7 never called back.</span>
            </div>
          )}
        </div>
      </FLSection>

      {/* ── Section 2 — Manifesto ── */}
      <FLSection
        id="fl-sec-manifesto"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding: isMobile ? '72px 24px' : '56px 40px',
        }}
      >
        <div style={{
          maxWidth:880, margin:'0 auto',
          display:'flex', flexDirection:'column', alignItems:'center', gap:22,
          textAlign:'center',
        }}>
          <FLEyebrow className="fl-reveal fl-r1">After the click</FLEyebrow>
          <h2 className="fl-reveal fl-r2" style={{
            margin:0, fontFamily: FL_DISPLAY,
            fontSize: isMobile ? 28 : 46,
            lineHeight:1.22, fontWeight:500, color: FL_NAVY, letterSpacing:-0.2,
          }}>
            Whose job is
            <span style={{ color: FL_GRAPHITE, fontStyle:'italic' }}> your page?</span>
          </h2>
          <p className="fl-reveal fl-r3" style={{
            margin:0, fontSize: isMobile ? 18 : 20, color: FL_GRAPHITE,
            lineHeight:1.75, maxWidth:780, fontFamily: FL_BODY,
          }}>
            Some IT companies have a marketing team and a leader who chases every lead.<br />
            Yours may not. Worldwide, 58% of MSPs have little or no marketing experience.<br />
            Your agency runs the ads. Your techs run the tickets.<br />
            So who phones the lead at 4pm on a Tuesday?
          </p>
          <div className="fl-reveal fl-r4" style={{ width:80 }}>
            <FLDivider width="80px" />
          </div>
          <p className="fl-reveal fl-r4" style={{
            margin:0, fontFamily: FL_DISPLAY, fontStyle:'italic',
            fontSize: isMobile ? 22 : 28, lineHeight:1.35, fontWeight:500,
            color: FL_NAVY, maxWidth:780,
          }}>
            Ask your agency one question. When did you last change our landing page?
          </p>
          <p className="fl-reveal fl-r5" style={{
            margin:0, fontSize:12, color: FL_GRAPHITE, fontFamily: FL_BODY, lineHeight:1.6,
          }}>
            ConnectWise survey of 1,000 MSPs, global.
          </p>
        </div>
      </FLSection>

      {/* ── Section 3 — Four value props (the microwave) ── */}
      <FLSection
        id="fl-sec-values"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY_2,
          display:'flex',
          alignItems:'center',
          padding: isMobile ? '72px 24px' : '64px 40px',
        }}
      >
        <div style={{ maxWidth:1200, margin:'0 auto', width:'100%' }}>
          <div style={{
            display:'flex',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent:'space-between',
            marginBottom: isMobile ? 32 : 40,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 16 : 0,
          }}>
            <div style={{ display:'flex', flexDirection:'column', gap:14, maxWidth:640 }}>
              <FLEyebrow className="fl-reveal fl-r1">The microwave</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{
                margin:0, fontFamily: FL_DISPLAY,
                fontSize: isMobile ? 32 : 46,
                lineHeight:1.05, fontWeight:500, color: FL_NAVY, letterSpacing:-0.5,
              }}>
                Cold leads don’t trust you yet.<br /><span style={{ fontStyle:'italic' }}>So we warm them up.</span>
              </h2>
            </div>
            {!isMobile && (
              <p className="fl-reveal fl-r3" style={{
                margin:0, fontSize:17, color: FL_GRAPHITE,
                lineHeight:1.8, maxWidth:400, fontFamily: FL_BODY,
              }}>
                Ad leads come fast. They don’t know you. They don’t trust you. We built a system that warms them up. We call it the microwave.
              </p>
            )}
          </div>
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? '1fr' : isMd ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap:24,
          }}>
            {[
              { n:'01', t:'The page.',     d:'One job: get the booking.', img: FL_IMG.signature },
              { n:'02', t:'The video.',    d:'They see your face and hear what you do.', img: FL_IMG.kanban },
              { n:'03', t:'The form.',     d:'A few questions show who’s serious.', img: FL_IMG.desk },
              { n:'04', t:'Susie’s call.', d:'She phones each lead within 5 minutes and offers a meeting.', img: FL_IMG.handshake },
            ].map((card, i) => (
              <div
                key={card.n}
                className={`fl-reveal fl-r${i + 3}`}
                style={{
                  display:'flex', flexDirection:'column',
                  background: FL_IVORY, border:`1px solid ${FL_LINEN}`,
                }}
              >
                <FLPhoto src={card.img} style={{ height:160 }} />
                <div style={{ padding:'22px 24px 24px', display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:14 }}>
                    <span style={{ fontFamily: FL_DISPLAY, fontSize:32, color: FL_SAND, fontWeight:500, lineHeight:1 }}>{card.n}</span>
                    <h3 style={{ margin:0, fontFamily: FL_DISPLAY, fontSize:25, fontWeight:600, color: FL_NAVY, lineHeight:1.2 }}>{card.t}</h3>
                  </div>
                  <p style={{ margin:0, fontSize:16, color: FL_GRAPHITE, lineHeight:1.7, fontFamily: FL_BODY }}>{card.d}</p>
                  <a href="#/wwd" style={{
                    marginTop:4, fontFamily: FL_CAPS, fontSize:12,
                    letterSpacing:3, textTransform:'uppercase',
                    color: FL_NAVY, textDecoration:'none',
                    borderBottom:`1px solid ${FL_NAVY}`,
                    alignSelf:'flex-start', paddingBottom:2,
                  }}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FLSection>

      {/* ── Section 4 — Editorial split ── */}
      <FLSection
        id="fl-sec-editorial"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY,
          display:'flex',
          alignItems:'center',
          padding: isMobile ? '64px 24px' : '40px 40px',
        }}
      >
        <div style={{
          maxWidth:1200, margin:'0 auto', width:'100%',
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 72,
          alignItems:'center',
        }}>
          <div className="fl-reveal fl-r1" style={{ position:'relative' }}>
            <FLPhoto src={FL_IMG.typewriter} style={{ height: isMobile ? 260 : 400 }} />
            {!isMobile && (
              <div style={{
                position:'absolute', bottom:-22, right:-22,
                background: FL_NAVY, color: FL_IVORY_2,
                padding:'22px 26px', maxWidth:280,
              }}>
                <div style={{ fontFamily: FL_DISPLAY, fontSize: 20, lineHeight:1.3, color: FL_SAND_2, fontWeight:500, fontStyle:'italic' }}>
                  6.1% vs 14.1%
                </div>
                <div style={{ fontFamily: FL_CAPS, fontSize:9.5, letterSpacing:3, textTransform:'uppercase', marginTop:10, color:'rgba(244,239,227,.65)' }}>
                  Typical page vs top 25%
                </div>
              </div>
            )}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <FLEyebrow className="fl-reveal fl-r2">Why double</FLEyebrow>
            <h2 className="fl-reveal fl-r3" style={{
              margin:0, fontFamily: FL_DISPLAY,
              fontSize: h2Size, lineHeight:1.08, fontWeight:500,
              color: FL_NAVY, letterSpacing:-0.4,
            }}>
              Some pages get <span style={{ fontStyle:'italic' }}>twice</span> the response.
            </h2>
            <p className="fl-reveal fl-r4" style={{
              margin:0, fontSize:18, color: FL_GRAPHITE,
              lineHeight:1.8, fontFamily: FL_BODY,
            }}>
              The typical professional services page turns 6.1% of visitors into leads.<br />
              The top 25% turn 14.1% or more.
            </p>
            <p className="fl-reveal fl-r5" style={{
              margin:0, fontSize:18, color: FL_NAVY,
              lineHeight:1.8, fontFamily: FL_BODY,
            }}>
              That gap is why we aim for double. It’s a gap between pages, so we back it with a guarantee.
            </p>
            <p className="fl-reveal fl-r5" style={{
              margin:0, fontSize:12, color: FL_GRAPHITE, fontFamily: FL_BODY, lineHeight:1.6,
            }}>
              Unbounce Conversion Benchmark Report 2024, professional services.
            </p>
          </div>
        </div>
      </FLSection>

      {/* ── Section 5 — Word From A Client + Stats Frieze ──
           Combined viewport: testimonial above a thin gold rule, then a
           four-number frieze beneath. Navy bg, old-money pacing.
           Spacing kept tight so the whole section reliably fits one
           viewport on typical desktop screens. */}
      <FLSection
        id="fl-sec-resonance"
        style={{
          minHeight: sectionMinH,
          background: FL_NAVY,
          color: FL_IVORY_2,
          display:'flex',
          alignItems:'center',
          padding: isMobile ? '60px 24px' : '40px 40px',
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(167,138,78,.10), transparent 55%), radial-gradient(circle at 80% 100%, rgba(196,184,163,.07), transparent 55%)`,
        }}
      >
        <div style={{ maxWidth:1180, margin:'0 auto', width:'100%' }}>
          {/* Testimonial — auto-rotating carousel */}
          <FLTestimonialRotator isMobile={isMobile} />

          {/* Frieze rule */}
          <div className="fl-reveal fl-r5" style={{
            display:'flex', alignItems:'center', gap:18, marginBottom: isMobile ? 22 : 22,
          }}>
            <div style={{ flex:1, height:1, background:'rgba(216,204,187,.25)' }} />
            <span style={{
              fontFamily: FL_CAPS, fontSize:13, letterSpacing:4,
              textTransform:'uppercase', color:'rgba(216,204,187,.75)',
            }}>By The Numbers</span>
            <div style={{ flex:1, height:1, background:'rgba(216,204,187,.25)' }} />
          </div>

          {/* Numerals frieze */}
          <div className="fl-reveal fl-r6" style={{
            display:'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? 22 : 32,
            alignItems:'start',
          }}>
            {[
              { n:'10',    t:'SA IT companies running ads whose forms we filled in' },
              { n:'7',     t:'never called back' },
              { n:'2',     t:'of those 7 sent only an auto-reply' },
              { n:'5 min', t:'how fast Susie phones your lead' },
            ].map((s, i) => (
              <div key={i} style={{
                display:'flex', flexDirection:'column', gap:6,
                paddingLeft: (!isMobile && i > 0) ? 20 : 0,
                borderLeft:  (!isMobile && i > 0) ? '1px solid rgba(244,239,227,.14)' : 'none',
              }}>
                <span style={{
                  fontFamily: FL_DISPLAY,
                  fontSize: isMobile ? 48 : 68,
                  lineHeight:1, fontWeight:500, color: FL_SAND_2, letterSpacing:-2,
                }}>{s.n}</span>
                <span style={{
                  fontFamily: FL_BODY, fontSize:15,
                  color:'rgba(244,239,227,.7)', lineHeight:1.55, maxWidth:240,
                }}>{s.t}</span>
              </div>
            ))}
          </div>

          {/* Note on the form test — small print under the numerals */}
          <p className="fl-reveal fl-r6" style={{
            margin: isMobile ? '22px 0 0' : '18px 0 0',
            fontFamily: FL_BODY, fontSize:13, lineHeight:1.65,
            color:'rgba(244,239,227,.55)',
          }}>
            Our message was a business enquiry from ForwardLine, not a request for IT support. So some may have ranked it low. It still shows what happens to a form nobody owns.
          </p>
        </div>
      </FLSection>

      {/* ── Section 6 — Final CTA ── */}
      <FLSection
        id="fl-sec-cta"
        style={{
          position:'relative',
          minHeight: sectionMinH,
          display:'flex',
          alignItems:'center',
          padding: isMobile ? '80px 24px' : '60px 40px',
          overflow:'hidden',
        }}
      >
        <FLPhoto src={FL_IMG.office} overlay={0.78} style={{ position:'absolute', inset:0 }} />
        <div style={{
          position:'relative', maxWidth:880, margin:'0 auto', textAlign:'center',
          display:'flex', flexDirection:'column', alignItems:'center',
          gap: isMobile ? 22 : 24, color: FL_IVORY_2,
        }}>
          <FLEyebrow className="fl-reveal fl-r1" color="rgba(244,239,227,.7)">
            Ready When You Are
          </FLEyebrow>
          <h2 className="fl-reveal fl-r2" style={{
            margin:0, fontFamily: FL_DISPLAY,
            fontSize: isMobile ? 38 : 64,
            lineHeight:1.05, fontWeight:500, color: FL_IVORY_2, letterSpacing:-0.6,
          }}>
            Who phones your <span style={{ fontStyle:'italic' }}>next lead?</span>
          </h2>
          <p className="fl-reveal fl-r3" style={{
            margin:0, fontFamily: FL_DISPLAY, fontStyle:'italic',
            fontSize: isMobile ? 20 : 24,
            color:'rgba(244,239,227,.78)', maxWidth:640, lineHeight:1.55,
          }}>
            A short call. We show you where your clicks drop off.
          </p>
          <div className="fl-reveal fl-r5" style={{
            display:'flex', gap:14, marginTop:14, flexWrap:'wrap', justifyContent:'center',
          }}>
            <FLButton href={flGo('button', 'home-cta')} variant="sand">Book my call →</FLButton>
          </div>
        </div>
      </FLSection>

      <FLFooter />

      {/* Section rail — visible past hero only */}
      <FLSectionRail
        count={Math.max(1, tracker.count || 6)}
        currentIndex={tracker.index}
        progress={tracker.progress}
        visible={railVisible}
      />
    </div>
  );
}

window.FLHome = FLHome;
