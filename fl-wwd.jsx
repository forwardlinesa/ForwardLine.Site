/* ─────────────────────────────────────────────
   ForwardLine — What We Do page (website)
   Section-snap scroll (matches the home page feel).
   Each FLSection here is sized to fit one viewport
   so the rail tracks crisply.
   ───────────────────────────────────────────── */

/* FAQ — same wording as the FAQPage JSON-LD and the static copy in
   index.html. Change all three together. */
const FL_FAQ = [
  { q: 'What does ForwardLine do?', a: 'We turn ad clicks into booked meetings for South African IT companies and MSPs. We build the page, sales video and form. Our AI caller Susie phones each lead within 5 minutes.' },
  { q: 'Who is it for?', a: 'IT companies and MSPs in South Africa that spend R10,000 or more a month on ads. Someone on your team takes the meetings.' },
  { q: 'My ads get clicks but no new clients. Can you help?', a: 'Often the ad is fine and the leak comes after the click. We fix the page, the video, the form and the call. Your agency keeps the ads.' },
  { q: 'What is a VSL?', a: 'VSL means video sales letter. It’s a short sales video on your page. It answers the questions a first sales call usually covers.' },
  { q: 'Do you write my sales video script?', a: 'You answer our questions in order. You send the answers as a voice note, text or a call. We review them and help you fix the script. You get this after signing.' },
  { q: 'Who is Susie?', a: 'Susie is our AI caller. She phones each lead within 5 minutes, says she’s AI, asks a few questions and books the meeting in your calendar.' },
  { q: 'How do you turn cold leads into warm leads?', a: 'Cold leads don’t know you yet. The page and video show them who you are. The form shows who’s serious. Then Susie phones them.' },
  { q: 'Do you build done-for-you sales funnels?', a: 'Yes. We build a VSL funnel: page, sales video, form and call. You take the meetings.' },
  { q: 'Is this conversion rate optimisation?', a: 'Yes. CRO and pipeline automation are the trade names. We keep testing your page and we automate the first call.' },
  { q: 'Do I keep my agency?', a: 'Yes. They run the ads. We take over after the click.' },
  { q: 'What does “if you qualify” mean?', a: 'Your page turns under about 3% of visitors into leads today, and you run at least R10,000 a month in ads. We check this on the call. We agree your starting number before we begin.' },
  { q: 'What does it cost?', a: 'Our first MSP partners pay R9,375 a month excl VAT with no setup fee, on a 12-month term. It’s below our cost. We do it for the proof. After that it’s R12,500 a month plus a once-off setup fee, excl VAT. Your ad spend stays separate.' },
  { q: 'What do you need from me?', a: 'One DNS record, which takes about 5 minutes. We help on a screen share. Your agency points the ads to the new page.' },
];

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
                <FLEyebrow className="fl-reveal fl-r1">What we do</FLEyebrow>
                <h1 className="fl-reveal fl-r2" style={{
                  margin: 0, fontFamily: FL_DISPLAY,
                  fontSize: isMobile ? 44 : 76,
                  lineHeight: 1.02, fontWeight: 500, color: FL_NAVY, letterSpacing: -1,
                }}>
                  Your agency’s job<br />
                  <span style={{ fontStyle: 'italic' }}>ends at the click.</span>
                </h1>
              </div>
              <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: isMobile ? 0 : 14 }}>
                <p style={{ margin: 0, fontSize: 16, color: FL_INK, lineHeight: 1.8, fontFamily: FL_BODY }}>
                  Your sales team starts at the meeting. Everything in between is nobody’s job. We make it ours.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
                  <span style={{ width: 56, height: 1, background: FL_NAVY }} />
                  <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_NAVY }}>Page · Video · Form · Call</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 2. First step of the new offer (the Leak Snapshot call) ──
           A short call: their own page, where clicks drop off, how fast
           leads get called back, then how we fix it. CTA goes to the
           landing page (go.forwardline.co.za). */}
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
                <div style={{ fontFamily: FL_DISPLAY, fontSize: 44, lineHeight: 1, color: FL_SAND_2, fontWeight: 500 }}>5 min</div>
                <div style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', marginTop: 6, color: 'rgba(244,239,227,.7)' }}>
                  Susie phones each lead within 5 minutes
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
              A short call.<br />
              <span style={{ fontStyle: 'italic' }}>We show you where your clicks drop off.</span>
            </h2>
            <p className="fl-reveal fl-r4" style={{
              margin: 0, fontSize: 14.5, color: FL_GRAPHITE,
              lineHeight: 1.8, fontFamily: FL_BODY,
            }}>
              It’s for South African IT companies and MSPs that spend R10,000 or more a month on ads. We open your page and show you where the clicks drop off. We check how fast your leads get a call back. Then we show you how we fix it. Your agency keeps the ads. We take over after the click.
            </p>
            <div className="fl-reveal fl-r5" style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
              {[
                { t: 'Your page, on screen.',  d: 'We show you where your clicks drop off.' },
                { t: 'Your callback speed.',   d: 'We check how fast your leads get a call back.' },
                { t: 'How we fix it.',         d: 'Page, video, form and a call from Susie within 5 minutes.' },
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
              <FLButton href={flGo('button', 'what-we-do-section')} variant="filled">Book my call →</FLButton>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 3. The four steps — process (ID kept for footer deep link) ── */}
      <FLSection
        id="fl-wwd-process"
        style={{
          minHeight: sectionMinH,
          background: FL_NAVY, color: FL_IVORY_2,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '72px 24px' : '40px 40px',
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(167,138,78,.08), transparent 50%), radial-gradient(circle at 80% 100%, rgba(196,184,163,.06), transparent 50%)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between', marginBottom: isMobile ? 36 : 36,
            flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 18 : 0,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 620 }}>
              <FLEyebrow className="fl-reveal fl-r1" color="rgba(244,239,227,.7)">The four steps</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 36 : 52, lineHeight: 1.05, fontWeight: 500, color: FL_IVORY_2, letterSpacing: -0.5 }}>
                From click<br />
                <span style={{ fontStyle: 'italic', color: FL_SAND_2 }}>to booked meeting.</span>
              </h2>
            </div>
            {!isMobile && (
              <p className="fl-reveal fl-r3" style={{ margin: 0, maxWidth: 380, fontSize: 13.5, color: 'rgba(244,239,227,.7)', lineHeight: 1.8, fontFamily: FL_BODY }}>
                We take over after the click: page, video, form and call.
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
              { n: '01', wk: 'The page',  t: 'A page with one job.', d: 'Your ads land on a page built for them. It asks for one thing: the booking. We write, build and host it. Your main site stays as it is.' },
              { n: '02', wk: 'The video', t: 'Answer the questions. You have your script.', d: 'We give you the questions in order. Send your answers as a voice note, or talk us through them on a call. We review it, ask a few questions and help you fix it. Your leads watch the video before they talk to you. So they arrive knowing what you do.' },
              { n: '03', wk: 'The form',  t: 'A few questions show who’s serious.', d: 'Your form asks a few short questions before anyone books. The answers show who’s a real buyer.' },
              { n: '04', wk: 'The call',  t: 'Your lead’s phone rings 5 minutes after the form.', d: 'Our AI caller Susie makes that call. She says she’s AI. She asks a few questions. Then she books the meeting in your calendar.' },
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
                <h3 style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: 22, fontWeight: 600, color: FL_IVORY_2, lineHeight: 1.2, marginBottom: 10 }}>{p.t}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(244,239,227,.7)', lineHeight: 1.7 }}>{p.d}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: isMobile ? 40 : 36, paddingTop: 24, borderTop: '1px solid rgba(244,239,227,.15)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 24, flexWrap: 'wrap',
          }}>
            <span style={{ fontFamily: FL_DISPLAY, fontStyle: 'italic', fontSize: isMobile ? 18 : 20, color: 'rgba(244,239,227,.7)', maxWidth: 420 }}>
              You take the meetings.
            </span>
            <FLButton href="#/contact" variant="sand">Book my call →</FLButton>
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
                What <span style={{ fontStyle: 'italic' }}>you</span> get
              </h2>
            </div>
            <p className="fl-reveal fl-r3" style={{ margin: 0, fontSize: 14.5, color: FL_GRAPHITE, lineHeight: 1.8, paddingTop: isMobile ? 0 : 8 }}>
              Six parts. One job: turn your clicks into booked meetings.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 0, borderTop: `1px solid ${FL_LINEN}`, borderLeft: `1px solid ${FL_LINEN}`,
          }}>
            {[
              { n: 'i.',   t: 'The page',          d: 'A page we write, build and host on your subdomain' },
              { n: 'ii.',  t: 'The form',          d: 'A short form that shows who’s serious' },
              { n: 'iii.', t: 'The video',         d: 'A sales video, from your answers to our questions' },
              { n: 'iv.',  t: 'The call',          d: 'Susie, who phones each lead within 5 minutes' },
              { n: 'v.',   t: 'Lead emails',       d: 'An email with the lead’s details for every booking' },
              { n: 'vi.',  t: 'Report and tweaks', d: 'A monthly report and page tweaks' },
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

      {/* ── 5. "I already pay an agency." ── */}
      <FLSection
        id="fl-wwd-agency"
        style={{
          minHeight: sectionMinH,
          background: FL_LINEN,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '64px 24px' : '40px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 28 : 80, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <FLEyebrow className="fl-reveal fl-r1">Your agency</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{
                margin: 0, fontFamily: FL_DISPLAY,
                fontSize: isMobile ? 40 : 64,
                lineHeight: 1.05, fontWeight: 500, color: FL_NAVY, letterSpacing: -0.8,
              }}>
                <span style={{ fontStyle: 'italic' }}>“I already pay an agency.”</span>
              </h2>
            </div>
            <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: isMobile ? 0 : 14 }}>
              <p style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 24 : 30, lineHeight: 1.3, fontWeight: 500, color: FL_NAVY }}>
                Good. Keep them. They bring the clicks.
              </p>
              <p style={{ margin: 0, fontSize: 16, color: FL_INK, lineHeight: 1.8, fontFamily: FL_BODY }}>
                We take over after the click: page, video, form and call.
              </p>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 6. Our first MSP partners — the shared-risk guarantee ── */}
      <FLSection
        id="fl-wwd-partners"
        style={{
          minHeight: sectionMinH,
          background: FL_NAVY, color: FL_IVORY_2,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '72px 24px' : '60px 40px',
          backgroundImage: `radial-gradient(circle at 20% 0%, rgba(167,138,78,.08), transparent 50%), radial-gradient(circle at 80% 100%, rgba(196,184,163,.06), transparent 50%)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 28 : 80, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <FLEyebrow className="fl-reveal fl-r1" color="rgba(244,239,227,.7)">The guarantee</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 36 : 52, lineHeight: 1.05, fontWeight: 500, color: FL_IVORY_2, letterSpacing: -0.5 }}>
                Who has this worked for?<br />
                <span style={{ fontStyle: 'italic', color: FL_SAND_2 }}>You’d be one of the first.</span>
              </h2>
            </div>
            <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: isMobile ? 0 : 14 }}>
              <p style={{ margin: 0, fontSize: 16, color: 'rgba(244,239,227,.8)', lineHeight: 1.8, fontFamily: FL_BODY }}>
                We’re new to working with IT companies, and we say so.<br />
                We’re looking for our first MSP partners.
              </p>
              <div style={{ padding: '18px 0 18px 22px', borderLeft: `1px solid ${FL_GOLD}` }}>
                <p style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 21 : 24, lineHeight: 1.4, fontWeight: 500, color: FL_IVORY_2 }}>
                  So we share the risk. If you qualify and we miss double your agreed starting number in 90 days, your monthly fee stops until we hit it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 7. Who builds it ── */}
      <FLSection
        id="fl-wwd-hancke"
        style={{
          minHeight: sectionMinH,
          background: FL_IVORY,
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '64px 24px' : '40px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 28 : 80, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <FLEyebrow className="fl-reveal fl-r1">Meet Hancke</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 36 : 52, lineHeight: 1.05, fontWeight: 500, color: FL_NAVY, letterSpacing: -0.5 }}>
                You talk to the person<br />
                <span style={{ fontStyle: 'italic' }}>who builds it.</span>
              </h2>
            </div>
            <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: isMobile ? 0 : 14 }}>
              <p style={{ margin: 0, fontSize: 16, color: FL_INK, lineHeight: 1.8, fontFamily: FL_BODY }}>
                I’m Hancke. I started on an IT helpdesk. Then I worked as a developer and IT administrator.
              </p>
              <p style={{ margin: 0, fontSize: 16, color: FL_INK, lineHeight: 1.8, fontFamily: FL_BODY }}>
                I know what a Tuesday full of tickets looks like. I haven’t run an MSP.
              </p>
              <p style={{ margin: 0, fontFamily: FL_DISPLAY, fontStyle: 'italic', fontSize: isMobile ? 22 : 26, lineHeight: 1.35, fontWeight: 500, color: FL_NAVY }}>
                I build the part you don’t have time for.
              </p>
            </div>
          </div>
        </div>
      </FLSection>

      {/* ── 8. FAQ — last section, so it scrolls through to the footer ── */}
      <FLSection
        id="fl-wwd-faq"
        style={{
          background: FL_LINEN,
          padding: isMobile ? '64px 24px' : '80px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 28 : 72, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FLEyebrow className="fl-reveal fl-r1">FAQ</FLEyebrow>
              <h2 className="fl-reveal fl-r2" style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 30 : 44, lineHeight: 1.05, fontWeight: 500, color: FL_NAVY, letterSpacing: -0.4 }}>
                Questions <span style={{ fontStyle: 'italic' }}>before you book?</span>
              </h2>
              <p className="fl-reveal fl-r3" style={{ margin: 0, fontSize: 14.5, color: FL_GRAPHITE, lineHeight: 1.8 }}>
                Here are short, straight answers.
              </p>
            </div>
            <div className="fl-reveal fl-r3" style={{ display: 'flex', flexDirection: 'column' }}>
              {FL_FAQ.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 0',
                  borderTop: `1px solid ${FL_SAND}`,
                  borderBottom: i === FL_FAQ.length - 1 ? `1px solid ${FL_SAND}` : 'none',
                }}>
                  <h3 style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: isMobile ? 20 : 22, fontWeight: 600, color: FL_NAVY, lineHeight: 1.25 }}>{f.q}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, color: FL_GRAPHITE, lineHeight: 1.75 }}>{f.a}</p>
                </div>
              ))}
            </div>
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
