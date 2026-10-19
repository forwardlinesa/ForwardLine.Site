/* ─────────────────────────────────────────────
   ForwardLine — Contact page (website)
   Wired to Formspree for form submissions
   ───────────────────────────────────────────── */

function FLField({ label, hint, height = 52, type = 'text', textarea = false, placeholder = '', name, required = false }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_GRAPHITE, fontWeight: 500 }}>
        {label}
        {hint && <span style={{ textTransform: 'none', letterSpacing: 0.5, color: FL_STONE, fontFamily: FL_BODY, fontStyle: 'italic', marginLeft: 6 }}>— {hint}</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          style={{
            minHeight: height, padding: '14px 16px', resize: 'vertical',
            background: 'transparent', border: `1px solid ${FL_SAND}`,
            fontFamily: FL_BODY, fontSize: 15, color: FL_NAVY,
            borderRadius: 0, outline: 'none',
          }}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          style={{
            height: height, padding: '0 16px',
            background: 'transparent', border: `1px solid ${FL_SAND}`,
            fontFamily: FL_BODY, fontSize: 15, color: FL_NAVY,
            borderRadius: 0, outline: 'none',
          }}
        />
      )}
    </label>
  );
}

function FLContact() {
  const bp = useBreakpoint();
  const isMobile = bp === 'sm' || bp === 'xs';
  const [stage, setStage]   = React.useState('Founder-led');
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error

  const intake = useFLIntake();
  const isCurrentFull = intake.currentBooked >= intake.currentTotal;
  const featuredQ      = isCurrentFull ? intake.nextQuarter       : intake.currentQuarter;
  const featuredMonths = isCurrentFull ? intake.nextQuarterMonths : intake.currentQuarterMonths;
  const featuredBooked = isCurrentFull ? intake.nextBooked        : intake.currentBooked;
  const featuredTotal  = isCurrentFull ? intake.nextTotal         : intake.currentTotal;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.target);
    data.append('_stage', stage);
    try {
      const res = await fetch('https://formspree.io/f/xbdbpdkq', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        /* GA4 recommended conversion event — your primary goal.
           Mark this as a "Key Event" in the GA dashboard. */
        flTrack('generate_lead', {
          role:    stage,
          quarter: data.get('quarter') || featuredQ,
        });
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (_) {
      setStatus('error');
    }
  }

  return (
    <div style={{ background: FL_IVORY, fontFamily: FL_BODY, color: FL_NAVY }}>
      <FLNav active="Contact" />

      {/* ── Header photo ── */}
      <section style={{ position: 'relative', height: isMobile ? 260 : 360 }}>
        <FLPhoto src={FL_IMG.kanban} overlay={0.7} style={{ position: 'absolute', inset: 0 }} />
        <div style={{
          position: 'relative', zIndex: 1, height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center',
          padding: '0 24px', gap: 22,
        }}>
          <FLEyebrow color="rgba(244,239,227,.78)">Begin the Conversation</FLEyebrow>
          <h1 style={{
            margin: 0, fontFamily: FL_DISPLAY,
            fontSize: isMobile ? 32 : 60,
            lineHeight: 1.08, fontWeight: 500, color: FL_IVORY_2, letterSpacing: -0.5, maxWidth: 880,
          }}>
            The first conversation costs nothing.<br />
            <span style={{ fontStyle: 'italic', color: FL_SAND_2 }}>The missed opportunity might.</span>
          </h1>
          <FLDivider color="rgba(244,239,227,.3)" mark={FL_SAND_2} width="120px" />
        </div>
      </section>

      {/* ── Main grid ── */}
      <section style={{ padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
          gap: isMobile ? 56 : 80, alignItems: 'start',
        }}>

          {/* LEFT — direct lines */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Direct lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FLEyebrow>Direct Lines</FLEyebrow>
              <a href="mailto:forwardlinesa@gmail.com"
                onClick={() => flTrack('contact_click', { method: 'email', location: 'contact_page' })}
                style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                padding: '18px 22px', border: `1px solid ${FL_NAVY}`, color: FL_NAVY,
                textDecoration: 'none', fontFamily: FL_CAPS, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <svg width="20" height="16" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="1" y="1" width="22" height="16" />
                    <path d="M1 2 L12 11 L23 2" />
                  </svg>
                  forwardlinesa@gmail.com
                </span>
              </a>
              <a href="tel:+27630977801"
                onClick={() => flTrack('contact_click', { method: 'phone', location: 'contact_page' })}
                style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                padding: '18px 22px', border: `1px solid ${FL_NAVY}`, color: FL_NAVY,
                textDecoration: 'none', fontFamily: FL_CAPS, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 3 L9 3 L11 8 L8 10 C9.5 13 11 14.5 14 16 L16 13 L21 15 L21 19 C21 20 20 21 19 21 C10 21 3 14 3 5 C3 4 4 3 5 3 Z" />
                  </svg>
                  063 097 7801
                </span>
                <span style={{ fontFamily: FL_BODY, fontSize: 13, textTransform: 'none', letterSpacing: 0, color: FL_GRAPHITE, fontStyle: 'italic' }}>Mon – Fri · SAST</span>
              </a>
              <a href="https://wa.me/27630977801"
                target="_blank" rel="noopener"
                onClick={() => flTrack('contact_click', { method: 'whatsapp', location: 'contact_page' })}
                style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                padding: '18px 22px', border: `1px solid ${FL_NAVY}`, color: FL_NAVY,
                textDecoration: 'none', fontFamily: FL_CAPS, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.11.82.83-3.04-.19-.31a8.06 8.06 0 0 1-1.24-4.29c0-4.47 3.63-8.1 8.1-8.1Zm-2.4 4.03c-.15 0-.4.06-.6.28-.2.22-.79.77-.79 1.87 0 1.1.81 2.17.92 2.32.11.15 1.57 2.4 3.86 3.36.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.33-.54 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.2-.15-.43-.26-.22-.11-1.33-.66-1.53-.73-.2-.08-.36-.11-.51.11-.15.22-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.11-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39l-.44-.01Z"/>
                  </svg>
                  063 097 7801
                </span>
                <span style={{ fontFamily: FL_BODY, fontSize: 13, textTransform: 'none', letterSpacing: 0, color: FL_GRAPHITE, fontStyle: 'italic' }}>WhatsApp</span>
              </a>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <a href="https://www.facebook.com/ForwardLineSA/" target="_blank" rel="noopener"
                  onClick={() => flTrack('social_click', { network: 'facebook', location: 'contact_page' })}
                  style={{
                  flex: 1, padding: '14px 16px', border: `1px solid ${FL_SAND}`, color: FL_NAVY,
                  textDecoration: 'none', fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                  textAlign: 'center', background: FL_IVORY_2,
                }}>Facebook</a>
              </div>
            </div>
          </aside>

          {/* RIGHT — application form */}
          <div style={{ padding: isMobile ? '32px 24px' : '40px 44px', background: FL_IVORY_2, border: `1px solid ${FL_LINEN}` }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '60px 0', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, border: `1px solid ${FL_NAVY}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke={FL_NAVY} strokeWidth="1.8">
                    <path d="M2 10 L9 17 L22 3" strokeLinecap="square" />
                  </svg>
                </div>
                <h2 style={{ margin: 0, fontFamily: FL_DISPLAY, fontSize: 36, fontWeight: 500, color: FL_NAVY }}>Application Received</h2>
                <p style={{ margin: 0, fontFamily: FL_BODY, fontSize: 15, color: FL_GRAPHITE, lineHeight: 1.75, maxWidth: 400 }}>
                  Thank you. We will read your application and come back to you within one business day to schedule the call.
                </p>
                <button onClick={() => setStatus('idle')} style={{ marginTop: 8, fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_GRAPHITE, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <a href={flGo('link', 'contact')} onClick={() => flTrack('cta_click', { cta_label: 'Running ads link', page_path: '#/contact' })} style={{ textDecoration: 'none' }}>
                    <FLEyebrow style={{ fontSize: 12, letterSpacing: 2.5, lineHeight: 1.8, textDecoration: 'underline', textUnderlineOffset: 4 }}>Running ads? See how we turn clicks into meetings →</FLEyebrow>
                  </a>
                </div>
                <h2 style={{ margin: '14px 0 8px', fontFamily: FL_DISPLAY, fontSize: isMobile ? 28 : 38, fontWeight: 500, color: FL_NAVY, lineHeight: 1.1, letterSpacing: -0.3 }}>
                  Tell us a little about your business.
                </h2>
                <p style={{ margin: '0 0 32px', fontSize: 14, color: FL_GRAPHITE, lineHeight: 1.75, fontFamily: FL_BODY, maxWidth: 520 }}>
                  Tell us where the business is and where it is stuck. We will come back to you within one business day to schedule a call.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 22 }}>
                  <FLField label="Full Name"  name="name"    placeholder="e.g. Helena Marsh"      required />
                  <FLField label="Company"    name="company" placeholder="e.g. Marsh & Co." />
                  <FLField label="Email"      name="email"   type="email" placeholder="helena@example.com" required />
                  <FLField label="Phone"      name="phone"   type="tel" placeholder="+27…" required />
                </div>

                <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 22 }}>
                  {/* Stage selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_GRAPHITE }}>Your role</span>
                    <div style={{ display: 'flex', gap: 0, border: `1px solid ${FL_SAND}`, flexWrap: 'wrap' }}>
                      {['Founder-led', 'GM / COO', 'Leadership Team', 'Other'].map((s, i, arr) => (
                        <div key={s} onClick={() => setStage(s)} style={{
                          flex: 1, minWidth: isMobile ? '50%' : undefined,
                          padding: '14px 12px', textAlign: 'center',
                          borderRight: i < arr.length - 1 ? `1px solid ${FL_SAND}` : 'none',
                          fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                          color: stage === s ? FL_IVORY_2 : FL_NAVY,
                          background: stage === s ? FL_NAVY : 'transparent',
                          cursor: 'pointer', transition: 'all .15s ease',
                        }}>{s}</div>
                      ))}
                    </div>
                  </div>

                  <FLField
                    label="What is your main challenge right now?"
                    hint="2–3 sentences is plenty"
                    name="challenge"
                    textarea height={140}
                    placeholder="Margins are tightening, the leadership team feels stretched, and we cannot tell whether it is a strategy problem or an operations problem…"
                    required
                  />
                </div>

                {status === 'error' && (
                  <p style={{ margin: '16px 0 0', fontFamily: FL_BODY, fontSize: 13, color: '#B94040', lineHeight: 1.6 }}>
                    Something went wrong. Please try emailing us directly at forwardlinesa@gmail.com
                  </p>
                )}

                <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingTop: 24, borderTop: `1px solid ${FL_LINEN}`, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: FL_DISPLAY, fontStyle: 'italic', fontSize: 16, color: FL_GRAPHITE, maxWidth: 360 }}>
                    We respond within one business day.
                  </span>
                  <FLButton type="submit" disabled={status === 'sending'} variant="filled">
                    {status === 'sending' ? 'Sending…' : 'Send Application →'}
                  </FLButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Reassurance band ── */}
      <section style={{ background: FL_LINEN, padding: '48px 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 16, fontFamily: FL_CAPS, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: FL_GRAPHITE,
          flexWrap: 'wrap',
        }}>
          {['◆ One business day reply', 'Direct line to the team', 'No-obligation first call', 'Confidential by default'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <FLFooter />
    </div>
  );
}

window.FLContact = FLContact;
