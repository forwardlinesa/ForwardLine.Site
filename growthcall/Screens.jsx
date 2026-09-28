/* ForwardLine: The MSP Meeting Machine landing page (test build, noindex).
   Every claim on this page comes from the offer doc (forwardline-offer-v2-draft3.md).
   One CTA label for the whole page: MM_CTA. Change it here and it changes everywhere. */

const MM_CTA = "Get my leak audit";
const MM_FORMSPREE = "https://formspree.io/f/xbdbpdkq";
const MM_SUBJECT = "MSP Meeting Machine - leak audit request";

function mmGoToForm() {
  const el = document.getElementById("audit");
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: "smooth" });
}
window.mmGoToForm = mmGoToForm;

/* Shared section shell: max width, gutters, vertical rhythm. */
function MMSection({ id, band = "page", children, narrow, style }) {
  const bands = {
    page: { background: "var(--surface-page)", color: "var(--text-body)" },
    alt: { background: "var(--cream-light)", color: "var(--text-body)" },
    dark: { background: "var(--navy)", color: "var(--text-on-dark)" },
  };
  return (
    <section id={id} className={band === "dark" ? "fl-on-dark" : undefined} style={{
      ...bands[band],
      borderTop: band === "alt" ? "1px solid var(--border-subtle)" : "none",
      borderBottom: band === "alt" ? "1px solid var(--border-subtle)" : "none",
    }}>
      <div style={{
        maxWidth: narrow ? "var(--container-narrow)" : "var(--container-max)",
        margin: "0 auto", padding: "var(--section-y) var(--gutter)", ...style,
      }}>
        {children}
      </div>
    </section>
  );
}

/* Section heading: small eyebrow + h2. Eyebrows stay navy/cream: gold is for the CTA only. */
function MMHeading({ eyebrow, title, lead, dark, maxWidth = "24ch" }) {
  const { Eyebrow } = window.ForwardLineDesignSystem_ce48fd;
  return (
    <div style={{ marginBottom: "var(--space-7)" }}>
      <Eyebrow color={dark ? "var(--neutral-200)" : "var(--text-muted)"}>{eyebrow}</Eyebrow>
      <h2 style={{ marginTop: "0.8rem", maxWidth, color: dark ? "var(--text-on-dark)" : undefined }}>{title}</h2>
      {lead && (
        <p style={{
          fontSize: "var(--text-lead)", maxWidth: "52ch", margin: "1rem 0 0",
          color: dark ? "var(--neutral-200)" : "var(--text-muted)",
        }}>{lead}</p>
      )}
    </div>
  );
}

function MMCtaButton({ size = "lg", style }) {
  const { Button } = window.ForwardLineDesignSystem_ce48fd;
  return <Button variant="primary" size={size} onClick={mmGoToForm} style={style}>{MM_CTA}</Button>;
}


/* ------------------------------------------------------------------ */
/* 1. Sticky header                                                    */
/* ------------------------------------------------------------------ */
function MMHeader() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "rgba(24,30,48,0.94)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border-on-dark)",
    }}>
      <div style={{
        maxWidth: "var(--container-max)", margin: "0 auto",
        padding: "0.5rem var(--gutter)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", flexShrink: 1, minWidth: 0 }}>
          <img src="./assets/ForwardLine-Logo-Cream.svg" alt="ForwardLine" style={{ height: "clamp(2.75rem, 6vw, 4rem)", maxWidth: "100%" }} />
        </a>
        <MMCtaButton size="sm" />
      </div>
    </header>
  );
}
window.MMHeader = MMHeader;


/* ------------------------------------------------------------------ */
/* VSL slot                                                            */
/* ------------------------------------------------------------------ */
/*
  VslSlot: the hero video.

  >>> TO ADD THE VIDEO: paste the URL into VSL_SRC just below. <<<
      - A YouTube or Vimeo link works (watch, share or embed link).
      - A direct file works too (.mp4 / .webm), e.g. "./assets/vsl.mp4".
  Optional: set VSL_POSTER to a 16:9 image (e.g. "./assets/vsl-poster.jpg").
  Leave VSL_POSTER empty to keep the built-in navy/cream poster.

  Nothing video-related loads until the visitor clicks play.
  While VSL_SRC is empty, clicking play only shows a "Video coming soon" note.
*/
const VSL_SRC = "";      // <- put the video URL here
const VSL_POSTER = "";   // <- optional poster image
const VSL_RUNTIME = "3 min";

/* Turn a YouTube / Vimeo / file URL into something we can play. */
function vslEmbed(src) {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return { kind: "iframe", url: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` };
  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "iframe", url: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  return { kind: "file", url: src };
}

function VslSlot({ src = VSL_SRC, poster = VSL_POSTER, runtime = VSL_RUNTIME }) {
  const [playing, setPlaying] = React.useState(false);
  const [note, setNote] = React.useState(false);

  const onPlay = () => {
    if (!src) { setNote(true); return; }
    setPlaying(true);
  };

  const frame = {
    position: "relative", width: "100%", aspectRatio: "16 / 9",
    background: "var(--navy)", border: "1px solid var(--border-on-dark)",
    boxShadow: "var(--shadow-raised)", overflow: "hidden",
  };

  if (playing && src) {
    const e = vslEmbed(src);
    return (
      <div style={frame}>
        {e.kind === "iframe" ? (
          <iframe src={e.url} title="How we double your meetings"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        ) : (
          <video src={e.url} controls autoPlay playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#000" }} />
        )}
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={onPlay} aria-label="Play video: how we double your meetings"
        className="mm-vsl" style={{ ...frame, display: "block", padding: 0, cursor: "pointer", textAlign: "left" }}>
        {poster ? (
          <img src={poster} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #1F2740 0%, var(--navy) 60%)",
          }}>
            {/* thin cream frame lines */}
            <div style={{ position: "absolute", inset: "6%", border: "1px solid rgba(250,246,236,0.14)" }} />
            <img src="./assets/ForwardLine-Logo-Cream.svg" alt="" style={{
              position: "absolute", top: "8%", left: "8%", height: "24%", opacity: 0.95,
            }} />
            <div style={{
              position: "absolute", left: "10%", right: "10%", bottom: "12%",
              fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--cream-light)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)", lineHeight: 1.2,
            }}>
              Watch: how we double your meetings
            </div>
          </div>
        )}
        {/* play button */}
        <span className="mm-play" style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "clamp(4rem, 9vw, 5.5rem)", aspectRatio: "1", borderRadius: "var(--radius-pill)",
          background: "var(--cream-light)", display: "grid", placeItems: "center",
          boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
          transition: "transform var(--duration-base) var(--ease-standard)",
        }}>
          <svg viewBox="0 0 24 24" width="38%" height="38%" aria-hidden="true">
            <path d="M7 4.5v15l12.5-7.5z" fill="var(--navy)" />
          </svg>
        </span>
        {/* runtime tag */}
        <span style={{
          position: "absolute", top: "10%", right: "10%",
          fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.04em",
          color: "var(--navy)", background: "var(--cream-light)", padding: "0.25rem 0.55rem",
        }}>{runtime}</span>
      </button>
      <p aria-live="polite" style={{
        margin: "0.6rem 0 0", minHeight: "1.4em", fontSize: "var(--text-xs)", color: "var(--neutral-200)",
      }}>
        {note ? "Video coming soon." : ""}
      </p>
    </div>
  );
}
window.VslSlot = VslSlot;


/* ------------------------------------------------------------------ */
/* 2. Hero                                                             */
/* ------------------------------------------------------------------ */
function MMHero() {
  const { Eyebrow } = window.ForwardLineDesignSystem_ce48fd;
  return (
    <section id="top" className="fl-on-dark" style={{ background: "var(--navy)", color: "var(--text-on-dark)" }}>
      <div className="mm-hero" style={{
        maxWidth: "var(--container-max)", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: "clamp(1.5rem, 5vw, 4.5rem)", alignItems: "center",
      }}>
        <div>
          <Eyebrow color="var(--neutral-200)">The MSP Meeting Machine</Eyebrow>
          <h1 className="mm-h1" style={{ color: "var(--text-on-dark)", margin: "0.75rem 0 1rem" }}>
            <span>Double your meetings.</span> <span>Same ad spend. 90 days.</span>
          </h1>
          <p className="mm-sub" style={{ color: "var(--neutral-200)", maxWidth: "40ch", margin: "0 0 1.5rem" }}>
            Your ads bring the clicks. Leads die after that. We fix everything after the click, without touching your ads.
          </p>
          <MMCtaButton />
          <p style={{ margin: "0.9rem 0 0", fontSize: "var(--text-xs)", color: "var(--neutral-300)" }}>
            For IT MSPs spending R10k+ a month on Google or Meta ads.
          </p>
        </div>
        <VslSlot />
      </div>
    </section>
  );
}
window.MMHero = MMHero;


/* ------------------------------------------------------------------ */
/* 3. Where leads die  +  4. The fix                                   */
/* ------------------------------------------------------------------ */
const MM_LEAKS = [
  {
    where: "On the page",
    leak: "The page is unclear. It asks them to read too much. They see no clear next step, so they leave.",
    fixTitle: "A page built to book",
    fix: "We build a clear page on your subdomain. One message. One next step. A short form qualifies each lead.",
  },
  {
    where: "After they book",
    leak: "Nobody calls fast enough. The lead goes cold before anyone speaks to them.",
    fixTitle: "Susie calls in 5 minutes",
    fix: "Susie is our AI voice agent. She calls every lead within 5 minutes. She books the meeting and chases no-shows.",
  },
  {
    where: "In sales",
    leak: "The lead arrives unprepped. It takes several calls to reach a yes or no.",
    fixTitle: "A video that preps them",
    fix: "A short video answers the big questions before the call. Your lead arrives prepped and ready to decide.",
  },
];

function MMLeakNumber({ n, dark }) {
  return (
    <span style={{
      display: "inline-grid", placeItems: "center", width: "2.25rem", height: "2.25rem",
      border: `1.5px solid ${dark ? "var(--border-on-dark)" : "var(--border-strong)"}`,
      fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem",
      color: dark ? "var(--cream-light)" : "var(--navy)",
    }}>{n}</span>
  );
}

function MMLeaks() {
  return (
    <MMSection id="leaks" band="alt">
      <MMHeading eyebrow="Where leads die" title="You pay for the click. Then the lead leaks out." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "var(--space-5)" }}>
        {MM_LEAKS.map((l, i) => (
          <div key={l.where} style={{
            background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
            padding: "var(--space-6)", boxShadow: "var(--shadow-sm)",
          }}>
            <MMLeakNumber n={i + 1} />
            <h3 style={{ margin: "1rem 0 0.5rem" }}>{l.where}</h3>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>{l.leak}</p>
          </div>
        ))}
      </div>
    </MMSection>
  );
}
window.MMLeaks = MMLeaks;

function MMFix() {
  return (
    <MMSection id="fix">
      <MMHeading eyebrow="The fix" title="One fix for each leak." />
      <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--border-subtle)" }}>
        {MM_LEAKS.map((l, i) => (
          <div key={l.fixTitle} style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "0.75rem var(--space-6)", padding: "var(--space-6) 0",
            borderBottom: "1px solid var(--border-subtle)", alignItems: "start",
          }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <MMLeakNumber n={i + 1} />
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Leak: {l.where.toLowerCase()}
                </div>
                <h3 style={{ margin: "0.2rem 0 0" }}>{l.fixTitle}</h3>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "var(--text-lead)", lineHeight: 1.5 }}>{l.fix}</p>
          </div>
        ))}
      </div>
    </MMSection>
  );
}
window.MMFix = MMFix;


/* ------------------------------------------------------------------ */
/* 5. The numbers: two stories                                         */
/* ------------------------------------------------------------------ */
/* Model from the offer doc: same MSP, R15,000/month ad spend, 750 visitors.
   Cost per held meeting = ad spend / meetings held. */
const MM_STORIES = [
  { key: "without", label: "Without us", meetings: 4, cost: "R3,750" },
  { key: "conservative", label: "With us: conservative", meetings: 10, cost: "R1,500" },
  { key: "strong", label: "With us: strong", meetings: 20, cost: "R750" },
];

function MMNumbers() {
  const max = 20;
  const cell = { padding: "0.8rem clamp(0.35rem, 1.5vw, 0.75rem)", textAlign: "right", borderBottom: "1px solid var(--border-on-dark)", whiteSpace: "nowrap" };
  const head = { ...cell, fontWeight: 600, color: "var(--cream-light)", whiteSpace: "normal", verticalAlign: "bottom", lineHeight: 1.3 };
  return (
    <MMSection id="numbers" band="dark">
      <MMHeading dark eyebrow="The numbers" title="Same ad spend. Two stories."
        lead="One MSP. R15,000 a month on ads. 750 visitors a month. Here is what happens after the click." />

      {/* Bar comparison: meetings held per month */}
      <div role="img" aria-label="Meetings held per month: 4 without us, 10 with us (conservative), 20 with us (strong)."
        style={{ display: "grid", gap: "1.4rem", marginBottom: "var(--space-7)" }}>
        <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--neutral-200)" }}>
          Meetings held per month
        </div>
        {MM_STORIES.map((s) => {
          const us = s.key !== "without";
          return (
            <div key={s.key} className="mm-bar-row" title={`${s.label}: ${s.meetings} meetings held, ${s.cost} per held meeting`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.45rem" }}>
                <span style={{ fontWeight: 600, color: us ? "var(--cream-light)" : "var(--neutral-200)" }}>{s.label}</span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--neutral-200)", whiteSpace: "nowrap" }}>{s.cost} per meeting</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ flex: 1, height: "clamp(1.6rem, 3vw, 2.2rem)", background: "rgba(250,246,236,0.06)" }}>
                  <div className="mm-bar" style={{
                    width: `${(s.meetings / max) * 100}%`, height: "100%",
                    background: us ? "var(--cream-light)" : "var(--neutral-300)",
                    opacity: us ? 1 : 0.55,
                  }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--cream-light)",
                  fontSize: "clamp(1.9rem, 4.5vw, 3rem)", lineHeight: 1, minWidth: "2.2ch", textAlign: "right",
                }}>{s.meetings}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The two-stories table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(0.8125rem, 2.5vw, var(--text-sm))", color: "var(--neutral-200)" }}>
          <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            Two stories: the same MSP with and without ForwardLine
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ ...head, textAlign: "left" }}><span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Measure</span></th>
              <th scope="col" style={head}>Without us</th>
              <th scope="col" style={head}>With us<br /><span style={{ fontWeight: 400, color: "var(--neutral-200)" }}>conservative</span></th>
              <th scope="col" style={head}>With us<br /><span style={{ fontWeight: 400, color: "var(--neutral-200)" }}>strong</span></th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ad spend", "R15,000", "R15,000", "R15,000"],
              ["Visitors", "750", "750", "750"],
              ["Meetings held", "4", "10", "20"],
              ["Cost per held meeting", "R3,750", "R1,500", "R750"],
            ].map(([k, ...v], ri) => (
              <tr key={k}>
                <th scope="row" style={{ ...cell, textAlign: "left", fontWeight: 400, whiteSpace: "normal" }}>{k}</th>
                {v.map((x, i) => (
                  <td key={i} style={{
                    ...cell,
                    color: ri >= 2 && i > 0 ? "var(--cream-light)" : undefined,
                    fontWeight: ri >= 2 ? 600 : 400,
                  }}>{x}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ margin: "1.5rem 0 0", fontSize: "var(--text-xs)", color: "var(--neutral-300)", maxWidth: "70ch" }}>
        This is a model built on industry benchmarks. It is not a client result.
      </p>
      <div style={{ marginTop: "var(--space-6)" }}>
        <MMCtaButton />
      </div>
    </MMSection>
  );
}
window.MMNumbers = MMNumbers;


/* ------------------------------------------------------------------ */
/* 6. What you get                                                     */
/* ------------------------------------------------------------------ */
function MMList({ title, items }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 1rem" }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.85rem" }}>
        {items.map(([h, b]) => (
          <li key={h} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.75rem", alignItems: "start" }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, marginTop: "0.6rem", background: "var(--navy)" }} />
            <span>
              <strong style={{ fontWeight: 600, color: "var(--navy)" }}>{h}</strong>
              {b && <span style={{ color: "var(--text-muted)" }}> {b}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MMWhatYouGet() {
  return (
    <MMSection id="get" band="alt">
      <MMHeading eyebrow="What you get" title="We build it. We run it. You take the meetings." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "var(--space-7) var(--space-6)" }}>
        <MMList title="What we build" items={[
          ["Your landing page.", "On your subdomain. We build and host it. Your main site stays as it is."],
          ["A qualifier form.", "It sorts good leads from poor fits."],
          ["Your video (VSL).", "It preps each lead before the call."],
          ["Susie, your AI voice agent.", "She calls, books and chases no-shows."],
          ["Tracking and a baseline.", "We measure where you start."],
          ["Your leak map.", "It shows where your leads drop off."],
        ]} />
        <MMList title="What we do each month" items={[
          ["Susie runs.", "She calls every lead within 5 minutes."],
          ["Page updates.", "We improve the page about every 2 weeks."],
          ["A monthly report.", null],
          ["A quarterly review call.", null],
          ["Win/loss calls.", "We learn why leads say yes or no."],
        ]} />
        <MMList title="What you do" items={[
          ["Add one DNS record.", "It takes about 5 minutes."],
          ["Ask your agency to change each ad's link.", null],
          ["Give feedback within 3 working days.", null],
        ]} />
      </div>
    </MMSection>
  );
}
window.MMWhatYouGet = MMWhatYouGet;


/* ------------------------------------------------------------------ */
/* 7. Guarantee + price                                                */
/* ------------------------------------------------------------------ */
function MMGuaranteePrice() {
  const [open, setOpen] = React.useState(false);
  const card = {
    background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", boxShadow: "var(--shadow-card)",
  };
  return (
    <MMSection id="price">
      <MMHeading eyebrow="Guarantee and price" title="You pay for results. Here is the deal." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "var(--space-5)", alignItems: "stretch" }}>
        {/* Guarantee */}
        <div style={{ ...card, background: "var(--navy)", color: "var(--text-on-dark)", border: "1px solid var(--navy)" }}>
          <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--neutral-200)" }}>
            The guarantee
          </div>
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
            lineHeight: 1.2, color: "var(--cream-light)", margin: "0.8rem 0 1.2rem",
          }}>
            Double your meetings in 90 days. If we don't, you pay nothing until we do.
          </p>
          <p style={{ margin: 0, color: "var(--neutral-200)", fontSize: "var(--text-sm)" }}>
            How we measure it: held meetings per 1,000 ad visitors, against your own baseline.
          </p>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mm-measure"
            style={{
              background: "none", border: "none", padding: 0, marginTop: "0.8rem", cursor: "pointer",
              color: "var(--cream-light)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
              fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "0.2em",
            }}>
            {open ? "Hide the detail" : "See how it works"}
          </button>
          {open && (
            <ul id="mm-measure" style={{ margin: "0.9rem 0 0", paddingLeft: "1.1rem", color: "var(--neutral-200)", fontSize: "var(--text-sm)", display: "grid", gap: "0.45rem" }}>
              {/* [TODO] Check these lines against rules.md section 4 and the offer doc before going live. */}
              <li>We set up tracking first. It gives us your baseline.</li>
              <li>We count held meetings, not bookings.</li>
              <li>We count per 1,000 ad visitors. A change in ad spend can't skew the score.</li>
              <li>Your target is 2x your baseline within 90 days.</li>
            </ul>
          )}
        </div>

        {/* Price */}
        <div style={card}>
          <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            The MSP Meeting Machine
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", flexWrap: "wrap", margin: "0.8rem 0 0.4rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(2.5rem, 5vw, 3.25rem)", color: "var(--navy)", lineHeight: 1 }}>
              R12,500
            </span>
            <span style={{ color: "var(--text-muted)" }}>/ month</span>
          </div>
          <p style={{ margin: "0 0 1rem" }}>
            Setup R35,000. <strong style={{ fontWeight: 600, color: "var(--navy)" }}>We waive it on a 12-month term.</strong>
          </p>
          <p style={{ margin: "0 0 1.2rem", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
            Excl VAT. Excl ad spend and agency fee.
          </p>
          <p style={{
            margin: "0 0 1.5rem", padding: "0.9rem 1rem", background: "var(--cream-light)",
            borderLeft: "3px solid var(--navy)", fontSize: "var(--text-sm)",
          }}>
            Doubling meetings the usual way means doubling ad spend.
          </p>
          <MMCtaButton style={{ width: "100%" }} />
        </div>
      </div>
    </MMSection>
  );
}
window.MMGuaranteePrice = MMGuaranteePrice;


/* ------------------------------------------------------------------ */
/* 8. Who it's for / not for                                           */
/* ------------------------------------------------------------------ */
function MMFit() {
  const col = (title, items, yes) => (
    <div style={{
      padding: "clamp(1.5rem, 4vw, 2.25rem)",
      background: yes ? "var(--surface-card)" : "transparent",
      border: `1px solid ${yes ? "var(--border-subtle)" : "var(--border-strong)"}`,
    }}>
      <h3 style={{ margin: "0 0 1rem" }}>{title}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
        {items.map((t) => (
          <li key={t} style={{ display: "grid", gridTemplateColumns: "1.5rem 1fr", alignItems: "start" }}>
            <span aria-hidden="true" style={{ color: yes ? "var(--navy)" : "var(--text-muted)", fontWeight: 700 }}>{yes ? "✓" : "×"}</span>
            <span style={{ color: yes ? "var(--ink)" : "var(--text-muted)" }}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <MMSection id="fit" band="alt">
      <MMHeading eyebrow="Who it's for" title="Built for one kind of business." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "var(--space-5)" }}>
        {col("This is for you if", [
          "You run an IT MSP in South Africa.",
          "You run Google or Meta ads.",
          "You spend R10k or more a month on ads.",
          "You have someone to take booked meetings.",
        ], true)}
        {col("This is not for you if", [
          "You spend under R10k a month on ads.",
          "You have no one to take the meetings.",
        ], false)}
      </div>
    </MMSection>
  );
}
window.MMFit = MMFit;


/* ------------------------------------------------------------------ */
/* 9. FAQ                                                              */
/* ------------------------------------------------------------------ */
function MMFaq() {
  const items = [
    {
      q: "Do you touch our ads?",
      a: "No. Your agency keeps running your ads. We fix everything after the click: the page, the follow-up and the sales prep. Your agency only changes each ad's link to point to the new page.",
    },
    {
      q: "What do we need to do?",
      a: "Three things. Add one DNS record, which takes about 5 minutes. Ask your agency to change each ad's link. Give us feedback within 3 working days.",
    },
    {
      q: "What if you miss the 2x?",
      a: "You pay nothing until we hit it. We measure held meetings per 1,000 ad visitors against your own baseline. When that number doubles, we've hit it.",
    },
    {
      q: "Who is Susie?",
      a: "Susie is our AI voice agent. She calls every new lead within 5 minutes. She books the meeting and chases no-shows.",
    },
    {
      q: "Do you change our main website?",
      a: "No. We build and host the new page on a subdomain, like go.yourcompany.co.za. Your main site stays as it is.",
    },
    {
      q: "What is the leak audit?",
      a: "A call with Hancke from ForwardLine. We look at what happens after your ad click. You see where your leads leak and what we would fix.",
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <MMSection id="faq" narrow>
      <MMHeading eyebrow="Questions" title="Straight answers." />
      <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
                  padding: "1.25rem 0", textAlign: "left",
                }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.25rem", color: "var(--navy)", lineHeight: 1.25 }}>
                  {it.q}
                </span>
                <span aria-hidden="true" style={{ color: "var(--navy)", fontSize: "1.4rem", lineHeight: 1, flexShrink: 0 }}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p style={{ margin: 0, padding: "0 0 1.4rem", color: "var(--text-muted)", maxWidth: "62ch" }}>{it.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </MMSection>
  );
}
window.MMFaq = MMFaq;


/* ------------------------------------------------------------------ */
/* 10. Final CTA + 3-step form                                         */
/* ------------------------------------------------------------------ */
const MM_CONFETTI = [
  { x: "8%", y: "9%", size: 15, r: -15, o: 0.9 },
  { x: "86%", y: "13%", size: 11, r: 20, o: 0.7 },
  { x: "92%", y: "54%", size: 17, r: 8, o: 0.8 },
  { x: "5%", y: "58%", size: 12, r: 30, o: 0.6 },
  { x: "15%", y: "87%", size: 10, r: -10, o: 0.7 },
  { x: "80%", y: "90%", size: 14, r: 15, o: 0.85 },
  { x: "48%", y: "5%", size: 9, r: 0, o: 0.6 },
  { x: "35%", y: "93%", size: 11, r: -20, o: 0.75 },
];

function MMThanksModal({ name, onClose }) {
  const { Button } = window.ForwardLineDesignSystem_ce48fd;
  const first = (name || "").trim().split(/\s+/)[0];
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return ReactDOM.createPortal(
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(24,30,48,0.72)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
    }}>
      <div role="dialog" aria-modal="true" aria-labelledby="mm-thanks-title" onClick={(e) => e.stopPropagation()} style={{
        position: "relative", overflow: "hidden", background: "#fff", color: "var(--ink)",
        boxShadow: "var(--shadow-raised)", padding: "clamp(2.2rem, 5vw, 3.5rem)",
        maxWidth: "460px", width: "100%", textAlign: "center",
      }}>
        {MM_CONFETTI.map((c, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute", left: c.x, top: c.y, color: "var(--navy)",
            fontSize: c.size, transform: `rotate(${c.r}deg)`, opacity: c.o * 0.35, pointerEvents: "none",
          }}>&#9670;</span>
        ))}
        <div id="mm-thanks-title" style={{
          position: "relative", fontFamily: "var(--font-display)", fontWeight: 600,
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "var(--navy)", lineHeight: 1.15,
        }}>
          Thanks{first ? `, ${first}` : ""}. We've got it.
        </div>
        {/* [TODO] Confirm who calls and how fast before going live. */}
        <p style={{ position: "relative", color: "var(--text-muted)", fontSize: "var(--text-lead)", margin: "1rem 0 1.8rem" }}>
          Hancke from ForwardLine will call you within one working day. Keep your phone close.
        </p>
        <Button variant="primary" size="lg" onClick={onClose} style={{ position: "relative" }}>Done</Button>
      </div>
    </div>,
    document.body
  );
}

/* Native select / radio styled to match the DS Input. */
const mmFieldLabel = { display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--navy)", marginBottom: "0.4rem", fontFamily: "var(--font-body)" };

function MMSelect({ label, name, value, onChange, options, required }) {
  const id = "mm-" + name;
  return (
    <label htmlFor={id} style={{ display: "block" }}>
      <span style={mmFieldLabel}>{label}</span>
      <select id={id} name={name} value={value} required={required} onChange={(e) => onChange(name, e.target.value)}
        className="mm-select"
        style={{
          width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "1rem",
          color: value ? "var(--ink)" : "var(--text-muted)", background: "#fff",
          padding: "0.7rem 2.2rem 0.7rem 0.85rem", border: "1.5px solid var(--border-strong)",
          borderRadius: "var(--radius-sm)", appearance: "none", WebkitAppearance: "none",
        }}>
        <option value="" disabled>Choose one</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function MMChoice({ label, name, value, onChange, options }) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend style={{ ...mmFieldLabel, padding: 0 }}>{label}</legend>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {options.map((o, i) => {
          const on = value === o;
          return (
            <label key={o} className="mm-choice" style={{
              display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer",
              padding: "0.65rem 0.85rem", fontSize: "0.9375rem",
              border: `1.5px solid ${on ? "var(--navy)" : "var(--border-strong)"}`,
              background: on ? "rgba(24,30,48,0.04)" : "#fff", borderRadius: "var(--radius-sm)",
            }}>
              <input type="radio" name={name} value={o} checked={on} required={i === 0}
                onChange={() => onChange(name, o)} style={{ accentColor: "var(--navy)", margin: 0 }} />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const MM_STEPS = ["You", "Your business", "Your leads"];

function MMForm() {
  const { Input, Button } = window.ForwardLineDesignSystem_ce48fd;
  const [step, setStep] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [thanks, setThanks] = React.useState(false);
  const [v, setV] = React.useState({
    name: "", mobile: "", email: "",
    company: "", ad_spend: "", meetings_taken_by: "",
    speed_to_lead: "", meetings_per_month: "",
  });
  const formRef = React.useRef(null);
  const set = (k, val) => setV((s) => ({ ...s, [k]: val }));
  const bind = (k) => ({ name: k, value: v[k], onChange: (e) => set(k, e.target.value) });

  const next = () => {
    if (!formRef.current.reportValidity()) return;
    setStep((s) => s + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < 2) { next(); return; }
    if (!formRef.current.reportValidity()) return;
    setBusy(true); setError(false);
    const data = new FormData();
    Object.entries(v).forEach(([k, val]) => data.append(k, val));
    data.append("page", window.location.href);
    data.append("_subject", MM_SUBJECT);
    const gotcha = formRef.current.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) data.append("_gotcha", gotcha.value);
    try {
      const res = await fetch(MM_FORMSPREE, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error("Formspree " + res.status);
      setSent(true); setThanks(true);
    } catch (err) {
      setError(true);
    }
    setBusy(false);
  };

  return (
    <div style={{ background: "#fff", padding: "clamp(1.5rem, 4vw, 2.25rem)", border: "1px solid var(--border-on-dark)", boxShadow: "var(--shadow-raised)", color: "var(--ink)" }}>
      {sent ? (
        <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.6rem", color: "var(--navy)" }}>We've got it.</div>
          <p style={{ color: "var(--text-muted)", margin: "0.6rem 0 0" }}>Hancke from ForwardLine will call you within one working day.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate={false} aria-label="Leak audit request">
          {/* progress */}
          <div style={{ marginBottom: "1.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              <span>
                Step {step + 1} of 3
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} style={{
                    background: "none", border: "none", padding: 0, marginLeft: "0.75rem", cursor: "pointer",
                    font: "inherit", color: "var(--navy)", textDecoration: "underline", textUnderlineOffset: "0.15em",
                  }}>Back</button>
                )}
              </span>
              <span style={{ fontWeight: 600, color: "var(--navy)" }}>{MM_STEPS[step]}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }} aria-hidden="true">
              {MM_STEPS.map((s, i) => (
                <span key={s} style={{ height: 4, background: i <= step ? "var(--navy)" : "var(--border-subtle)" }} />
              ))}
            </div>
          </div>

          {/* honeypot for Formspree */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

          <div style={{ display: "grid", gap: "1.1rem" }}>
            {step === 0 && (<>
              <Input label="Your name" id="mm-name" placeholder="Name and surname" autoComplete="name" required {...bind("name")} />
              <Input label="Mobile" id="mm-mobile" type="tel" inputMode="tel" placeholder="082 123 4567" autoComplete="tel"
                minLength={9} required {...bind("mobile")} />
              <Input label="Work email" id="mm-email" type="email" placeholder="you@company.co.za" autoComplete="email" required {...bind("email")} />
            </>)}
            {step === 1 && (<>
              <Input label="Company name" id="mm-company" placeholder="Your MSP" autoComplete="organization" required {...bind("company")} />
              <MMSelect label="Monthly ad spend" name="ad_spend" value={v.ad_spend} onChange={set} required
                options={["Under R10k", "R10k to R20k", "R20k to R50k", "R50k+"]} />
              <MMSelect label="Who takes the booked meetings?" name="meetings_taken_by" value={v.meetings_taken_by} onChange={set} required
                options={["Me, the owner", "A salesperson or sales team", "Someone else on the team", "No one yet"]} />
            </>)}
            {step === 2 && (<>
              {/* [TODO] Swap for the questions in form-questions-msp.md. */}
              <MMChoice label="A lead fills in your form. How fast do you call?" name="speed_to_lead" value={v.speed_to_lead} onChange={set}
                options={["Within 5 minutes", "Within the hour", "Same day", "Next day or later", "Not sure"]} />
              <MMSelect label="Sales meetings from ads each month?" name="meetings_per_month" value={v.meetings_per_month} onChange={set} required
                options={["0 to 2", "3 to 5", "6 to 10", "More than 10", "Not sure"]} />
            </>)}
          </div>

          {error && (
            <p role="alert" style={{ margin: "1rem 0 0", fontSize: "var(--text-sm)", color: "#8A2E1F" }}>
              That didn't send. Try again, or WhatsApp us on <a href="https://wa.me/27630977801">063 097 7801</a>.
            </p>
          )}

          <div style={{ marginTop: "1.5rem" }}>
            {step < 2 ? (
              <Button variant="secondary" size="lg" type="submit" style={{ width: "100%" }}>Next</Button>
            ) : (
              <Button variant="primary" size="lg" type="submit" disabled={busy} style={{ width: "100%" }}>
                {busy ? "Sending..." : MM_CTA}
              </Button>
            )}
          </div>

          <MMConsent />
        </form>
      )}
      {thanks && <MMThanksModal name={v.name} onClose={() => setThanks(false)} />}
    </div>
  );
}

/* [TODO] Legal check on this wording (POPIA). */
function MMConsent() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginTop: "1rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
      We use your details to contact you about your audit.{" "}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mm-privacy" style={{
        background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit",
        color: "var(--navy)", textDecoration: "underline", textUnderlineOffset: "0.15em",
      }}>How we handle your data</button>
      {open && (
        <p id="mm-privacy" style={{ margin: "0.7rem 0 0", textAlign: "left" }}>
          ForwardLine keeps your details safe and uses them only to talk to you about our service.
          We never sell them. Under POPIA you can ask us to see, fix or delete your details at any
          time. Email <a href="mailto:forwardlinesa@gmail.com">forwardlinesa@gmail.com</a>.
        </p>
      )}
    </div>
  );
}

function MMFinal() {
  return (
    <section id="audit" className="fl-on-dark" style={{ background: "var(--navy)", color: "var(--text-on-dark)" }}>
      <div style={{
        maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--section-y) var(--gutter)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center",
      }}>
        <div>
          <MMHeading dark eyebrow="Your leak audit" title="Find out where your leads leak." maxWidth="18ch"
            lead="Tell us about your ads and your team. We show you where leads die after the click and what we would fix." />
          <ul style={{ listStyle: "none", margin: "-1.5rem 0 0", padding: 0, display: "grid", gap: "0.6rem", color: "var(--neutral-200)" }}>
            {["Double your meetings in 90 days.", "We don't touch your ads or your agency.", "Takes 3 short steps."].map((t) => (
              <li key={t} style={{ display: "grid", gridTemplateColumns: "1.4rem 1fr" }}>
                <span aria-hidden="true" style={{ color: "var(--cream-light)" }}>{"✓"}</span>{t}
              </li>
            ))}
          </ul>
        </div>
        <MMForm />
      </div>
    </section>
  );
}
window.MMFinal = MMFinal;


/* ------------------------------------------------------------------ */
/* 11. Footer                                                          */
/* ------------------------------------------------------------------ */
function MMFooter() {
  return (
    <footer style={{ background: "var(--navy)", borderTop: "1px solid var(--border-on-dark)" }}>
      <div style={{
        maxWidth: "var(--container-max)", margin: "0 auto", padding: "1.4rem var(--gutter)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem 1.5rem", flexWrap: "wrap",
        fontSize: "var(--text-xs)", color: "var(--neutral-300)",
      }}>
        <img src="./assets/ForwardLine-Logo-Cream.svg" alt="ForwardLine" style={{ height: 28 }} />
        <span>
          <a href="mailto:forwardlinesa@gmail.com" style={{ color: "var(--neutral-200)" }}>forwardlinesa@gmail.com</a>
          {"  ·  "}&copy; 2026 ForwardLine. South Africa.
        </span>
      </div>
    </footer>
  );
}
window.MMFooter = MMFooter;


function MMMeetingMachinePage() {
  return (
    <div style={{ background: "var(--surface-page)", overflowX: "clip" }}>
      <MMHeader />
      <main>
        <MMHero />
        <MMLeaks />
        <MMFix />
        <MMNumbers />
        <MMWhatYouGet />
        <MMGuaranteePrice />
        <MMFit />
        <MMFaq />
        <MMFinal />
      </main>
      <MMFooter />
    </div>
  );
}
window.MMMeetingMachinePage = MMMeetingMachinePage;

if (typeof module !== "undefined") { module.exports = { MMMeetingMachinePage, VslSlot }; }
