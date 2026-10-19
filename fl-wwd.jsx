/* ─────────────────────────────────────────────
   ForwardLine — What We Do page (website)
   Section-snap scroll (matches the home page feel).
   Each FLSection here is sized to fit one viewport
   so the rail tracks crisply.
   ───────────────────────────────────────────── */

function FLWhatWeDo() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';

  const intake = useFLIntake();
  const isCurrentFull = intake.currentBooked >= intake.currentTotal;
  const featuredQ      = isCurrentFull ? intake.nextQuarter : intake.currentQuarter;
  const featuredBooked = isCurrentFull ? intake.nextBooked  : intake.currentBooked;
  const featuredTotal  = isCurrentFull ? intake.nextTotal   : intake.currentTotal;

  const tracker = useSnapTracker();
  const railVisible = !isMobile && tracker.index >= 1;

  /* Each snap section fills the visible area below the fixed strip. */
  const sectionMinH = `calc(100vh - ${FL_STRIP_H}px)`;

  return (
    <div style={{ background: FL_IVORY, fontFamily: FL_BODY, color: FL_NAVY }}>

      {/* ── 1. Editorial intro ── */}
      <FLSection
        id="fl-wwd-intro"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY,
          display: 'flex', flexDirection: 'column',
        }}
      >
        <FLNav active="What We Do" />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: isMobile ? '48px 24px' : '40px 40px',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <FLEyebrow className="fl-reveal fl-r1">We Help You Close</FLEyebrow>
                <h1 className="fl-reveal fl-r2" style={{
                  margin: 0, fontFamily: FL_DISPLAY,
                  fontSize: isMobile ? 44 : 76,
                  lineHeight: 1.02, fontWeight: 500, color: FL_NAVY, letterSpacing: -1,
                }}>
                  The gap between<br />
                  where you are<br />
                  <span style={{ fontStyle: 'italic' }}>and where you<br />could be.</span>
                </h1>
              </div>
              <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: isMobile ? 0 : 14 }}>
                <p style={{ margin: 0, fontSize: 16, color: FL_INK, lineHeight: 1.8, fontFamily: FL_BODY }}>
                  Most businesses stop growing — not because of effort, but because they're focused on the wrong problem. There are invisible systems keeping you from the next stage: the meeting that should not exist, the role that quietly does two jobs, the system everybody uses but nobody knows why.
                </p>
                <p style={{ margin: 0, fontSize: 14.5, color: FL_GRAPHITE, lineHeight: 1.8, fontFamily: FL_BODY }}>
                  ForwardLine is structured outside attention — designed to surface those failures, prioritise them, and put a working plan in your hands. We sit alongside your leadership team, following a plan that puts your business back on the road to growth.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
                  <span style={{ width: 56, height: 1, background: FL_NAVY }} />
                  <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_NAVY }}>Diagnose · Plan · Execute · Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 2. Discovery Call — the entry-point service ──
           Lead with this: a single two-hour call that ends with an
           actionable written plan. Designed to be the first step for
           most clients, before any longer engagement. */}
      <FLSection
        id="fl-wwd-discovery"
        style={{
          minHeight: sectionMinH,
          background: FL_LINEN,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '60px 24px' : '40px 40px',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.05fr',
          gap: isMobile ? 32 : 72,
          alignItems: 'center',
        }}>
          <div className="fl-reveal fl-r1" style={{ position: 'relative' }}>
            <FLPhoto src={FL_IMG.signature} style={{ height: isMobile ? 240 : 460 }} />
            {!isMobile && (
              <div style={{
                position: 'absolute', bottom: -22, left: -22,
                background: FL_NAVY, color: FL_IVORY_2,
                padding: '18px 22px', maxWidth: 240,
              }}>
                <div style={{ fontFamily: FL_DISPLAY, fontSize: 44, lineHeight: 1, color: FL_SAND_2, fontWeight: 500 }}>2 hrs</div>
                <div style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', marginTop: 6, color: 'rgba(244,239,227,.7)' }}>
                  One focused conversation about your business
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="fl-reveal fl-r2" style={{
              display:'inline-flex', alignItems:'center', gap:12, alignSelf:'flex-start',
              padding:'8px 0', borderTop:`1px solid ${FL_GOLD}`, borderBottom:`1px solid ${FL_GOLD}`,
            }}>
              <span style={{ color: FL_GOLD, fontSize: 8, letterSpacing: 4, transform:'translateY(-1px)' }}>◆</span>
              <FLEyebrow color={FL_NAVY} style={{ letterSpacing: 4.5, fontWeight: 600 }}>Start Here</FLEyebrow>
              <span style={{ color: FL_GOLD, fontSize: 8, letterSpacing: 4, transform:'translateY(-1px)' }}>◆</span>
            </div>
            <h2 className="fl-reveal fl-r3" style={{
              margin: 0, fontFamily: FL_DISPLAY,
              fontSize: isMobile ? 32 : 48,
              lineHeight: 1.05, fontWeight: 500, color: FL_NAVY, letterSpacing: -0.5,
            }}>
              A two-hour call.<br />
              <span style={{ fontStyle: 'italic' }}>An action plan you can use on Monday.</span>
            </h2>
            <p className="fl-reveal fl-r4" style={{
              margin: 0, fontSize: 14.5, color: FL_GRAPHITE,
              lineHeight: 1.8, fontFamily: FL_BODY,
            }}>
              Before the quarter, before anything else — sit down with us for one focused conversation. You walk us through the business. Help us understand the numbers, the systems, the people and the known bottlenecks. By the end of the call you'll know exactly what to fix first, and how. A written plan lands in your inbox the next day.
            </p>
            <div className="fl-reveal fl-r5" style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
              {[
                { t: 'Two focused hours.',           d: 'In person where possible, or over a call.' },
                { t: 'The business on paper.',       d: 'Numbers, systems, people, known bottlenecks — laid on the table.' },
                { t: 'A written plan the next day.', d: 'A short, actionable document you can hand to your team.' },
              ].map((p, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 18, padding: '12px 0',
                  borderTop: `1px solid ${FL_SAND}`,
                  borderBottom: i === 2 ? `1px solid ${FL_SAND}` : 'none',
                }}>
                  <span style={{ fontFamily: FL_DISPLAY, fontSize: 18, color: FL_GOLD, fontWeight: 500, minWidth: 26 }}>0{i + 1}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontFamily: FL_DISPLAY, fontSize: 18, fontWeight: 600, color: FL_NAVY }}>{p.t}</span>
                    <span style={{ fontSize: 13, color: FL_GRAPHITE, lineHeight: 1.6 }}>{p.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="fl-reveal fl-r6" style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <FLButton href={flGo('button', 'wwd')} variant="filled">See how we fix it →</FLButton>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 3. The Quarter — process ── */}
      <FLSection
        id="fl-wwd-process"
        style={{
          minHeight: sectionMinH,
          background: FL_NAVY, color: FL_IVORY_2,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '72px 24px' : '60px 40px',
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(167,138,78,.08), transparent 50%), radial-gradient(circle at 80% 100%, rgba(196,184,163,.06), transparent 50%)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between', marginBottom: isMobile ? 36 : 48,
            flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 18 : 0,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 620 }}>
              <FLEyebrow className="fl-reveal fl-r1" color="rgba(244,239,227,.7)">Ready To Go Further</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 36 : 52, lineHeight: 1.05, fontWeight: 500, color: FL_IVORY_2, letterSpacing: -0.5 }}>
                When you want<br />
                <span style={{ fontStyle: 'italic', color: FL_SAND_2 }}>the next level.</span>
              </h2>
            </div>
            {!isMobile && (
              <p className="fl-reveal fl-r3" style={{ margin: 0, maxWidth: 380, fontSize: 13.5, color: 'rgba(244,239,227,.7)', lineHeight: 1.8, fontFamily: FL_BODY }}>
                When there's further to go, this is how we take you there: a full quarter of execution. Each phase has a defined output, so you always know where we are and what comes next. No surprises, no scope creep. We set out to deliver what is most valuable — that's a promise.
              </p>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? 28 : 0,
            position: 'relative',
          }}>
            {!isMobile && (
              <div style={{ position: 'absolute', top: 30, left: 24, right: 24, height: 1, background: 'rgba(244,239,227,.15)' }} />
            )}
            {[
              { n: '01', wk: 'Week 1 – 2',  t: 'Diagnose', d: 'Leadership interviews, operational shadowing and a top-to-bottom systems audit. A candid map of how the business actually runs.' },
              { n: '02', wk: 'Week 3 – 4',  t: 'Plan',     d: 'Your bottlenecks ranked by impact. We co-author a quarterly roadmap with milestones, executable tasks and a measurable end state.' },
              { n: '03', wk: 'Week 5 – 11', t: 'Execute',  d: 'Weekly working sessions, real-time adjustments and direct access. We ship alongside your team, working together to reach success.' },
              { n: '04', wk: 'Week 12',     t: 'Review',   d: 'A measurable review of the quarter — what was achieved, what improved, and how much closer the business is to the goal we set. A formal handover, and a decision: continue with a second quarter, or operate independently from here.' },
            ].map((p, i) => (
              <div key={p.n} className={`fl-reveal fl-r${(i % 4) + 2}`} style={{
                position: 'relative',
                padding: isMobile ? '0' : (i === 0 ? '0 28px 0 0' : i === 3 ? '0 0 0 28px' : '0 28px'),
                borderLeft: (!isMobile && i > 0) ? '1px solid rgba(244,239,227,.15)' : 'none',
                borderTop: (isMobile && i > 0) ? '1px solid rgba(244,239,227,.15)' : 'none',
                paddingTop: (isMobile && i > 0) ? 28 : undefined,
              }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: i <= 1 ? FL_SAND_2 : FL_NAVY,
                  border: `1px solid ${FL_SAND_2}`,
                  marginBottom: 22,
                }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: FL_DISPLAY, fontSize: 52, fontWeight: 500, color: FL_SAND_2, lineHeight: 1, letterSpacing: -1 }}>{p.n}</span>
                </div>
                <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_SAND, display: 'block', marginBottom: 8 }}>{p.wk}</span>
                <h3 style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: 28, fontWeight: 600, color: FL_IVORY_2, marginBottom: 10 }}>{p.t}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(244,239,227,.7)', lineHeight: 1.7 }}>{p.d}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: isMobile ? 40 : 56, paddingTop: 24, borderTop: '1px solid rgba(244,239,227,.15)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 24, flexWrap: 'wrap',
          }}>
            <span style={{ fontFamily: FL_DISPLAY, fontStyle: 'italic', fontSize: isMobile ? 18 : 20, color: 'rgba(244,239,227,.7)', maxWidth: 420 }}>
              The quarter is where we execute together.
            </span>
            <FLButton href="#/contact" variant="sand">Reserve Your Quarter →</FLButton>
          </div>
        </div>
      </FLSection>

      {/* ── 4. Included grid ── */}
      <FLSection
        id="fl-wwd-included"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '64px 24px' : '40px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 28 : 72, alignItems: 'start', marginBottom: isMobile ? 32 : 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FLEyebrow className="fl-reveal fl-r1">Included</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 30 : 44, lineHeight: 1.05, fontWeight: 500, color: FL_NAVY, letterSpacing: -0.4 }}>
                What's included in <span style={{ fontStyle: 'italic' }}>every</span> engagement.
              </h2>
            </div>
            <p className="fl-reveal fl-r3" style={{ margin: 0, fontSize: 14.5, color: FL_GRAPHITE, lineHeight: 1.8, paddingTop: isMobile ? 0 : 8 }}>
              No add-ons, no tiering. The same considered package for every client — because the work that moves a business is the same work, regardless of size.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 0, borderTop: `1px solid ${FL_LINEN}`, borderLeft: `1px solid ${FL_LINEN}`,
          }}>
            {[
              { n: 'i.',   t: 'Weekly Working Sessions', d: '90 minutes, every week, with the same consultant. Agendas shared 24h ahead.' },
              { n: 'ii.',  t: 'Written Diagnostic',      d: 'A written diagnostic of how the business runs today.' },
              { n: 'iii.', t: 'Bottleneck Map',          d: 'Every constraint ranked. Visual, single-page.' },
              { n: 'iv.',  t: 'Quarterly Roadmap',       d: 'Milestones, executable tasks and metrics. An executable plan — not a fluffy document or one-off PDF.' },
              { n: 'v.',   t: 'Direct Line',             d: 'Phone, email and WhatsApp access between sessions. We answer same-day.' },
              { n: 'vi.',  t: 'Closing Scorecard',       d: 'A measurable review of what shifted, what did not, and what is next.' },
            ].map((it, i) => (
              <div key={it.n} className={`fl-reveal fl-r${(i % 6) + 1}`} style={{
                padding: isMobile ? '24px' : '26px 28px',
                borderRight: `1px solid ${FL_LINEN}`, borderBottom: `1px solid ${FL_LINEN}`,
                display: 'flex', flexDirection: 'column', gap: 10, background: FL_IVORY_2,
              }}>
                <span style={{ fontFamily: FL_DISPLAY, fontStyle: 'italic', fontSize: 20, color: FL_SAND, fontWeight: 500 }}>{it.n}</span>
                <h3 style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: 21, fontWeight: 600, color: FL_NAVY, lineHeight: 1.2 }}>{it.t}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: FL_GRAPHITE, lineHeight: 1.7 }}>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </FLSection>

      <FLFooter />

      {/* Imperial section rail — appears past the intro */}
      <FLSectionRail
        count={Math.max(1, tracker.count || 6)}
        currentIndex={tracker.index}
        progress={tracker.progress}
        visible={railVisible}
      />
    </div>
  );
}

window.FLWhatWeDo = FLWhatWeDo;
