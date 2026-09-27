"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CodeXml as Github,
  BriefcaseBusiness as Linkedin,
  Sun,
  Moon,
  Monitor,
  Volume2,
  VolumeX,
  Code2,
  Zap,
  Layers,
  Gamepad2,
  Mail,
  Download,
  Sparkles,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
const sections = ["Home", "Experience", "Work", "Play", "Connect"];
const links = {
  github: "https://github.com/sirdiwakar",
  linkedin: "https://www.linkedin.com/in/adarsh-diwakar-919b791b9/",
  food: "https://food-delivery-frontend-qful.onrender.com/",
  multiVendor: "https://github.com/sirdiwakar/MultiVendor_Ecommerce",
};
function Reaction({ beep }: { beep: () => void }) {
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef(0);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function hit() {
    beep();
    if (phase === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("early");
    } else if (phase === "go") {
      setResult(Math.round(performance.now() - start.current));
      setPhase("done");
    } else {
      setPhase("wait");
      timer.current = setTimeout(
        () => {
          start.current = performance.now();
          setPhase("go");
        },
        1500 + Math.random() * 2500,
      );
    }
  }
  return (
    <button className={"reaction " + phase} onClick={hit}>
      <Zap size={34} />
      <strong>
        {phase === "idle"
          ? "How fast are you?"
          : phase === "wait"
            ? "Wait for green…"
            : phase === "go"
              ? "NOW!"
              : phase === "early"
                ? "A little too eager!"
                : result + " ms"}
      </strong>
      <span>
        {phase === "idle"
          ? "Tap to start"
          : phase === "wait"
            ? "Patience, engineer."
            : phase === "go"
              ? "Tap!"
              : "Tap to try again"}
      </span>
    </button>
  );
}
function Memory({ beep }: { beep: () => void }) {
  const [cards, setCards] = useState([
    "⚡",
    "◆",
    "⌘",
    "✦",
    "⚡",
    "⌘",
    "✦",
    "◆",
  ]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  useEffect(() => {
    if (open.length === 2) {
      const t = setTimeout(() => {
        if (cards[open[0]] === cards[open[1]])
          setMatched((m) => [...m, ...open]);
        setOpen([]);
      }, 650);
      return () => clearTimeout(t);
    }
  }, [open, cards]);
  function reset() {
    setCards((c) => [...c].sort(() => Math.random() - 0.5));
    setMatched([]);
    setOpen([]);
    setMoves(0);
  }
  return (
    <div className="memory">
      <div className="game-status">
        <span>
          {matched.length === 8 ? "Perfect match!" : moves + " moves"}
        </span>
        <button onClick={reset}>Restart ↻</button>
      </div>
      <div className="memory-grid">
        {cards.map((c, i) => (
          <button
            key={i}
            aria-label={
              open.includes(i) || matched.includes(i)
                ? c
                : "Reveal card " + (i + 1)
            }
            className={open.includes(i) || matched.includes(i) ? "flipped" : ""}
            onClick={() => {
              if (
                open.length < 2 &&
                !open.includes(i) &&
                !matched.includes(i)
              ) {
                beep();
                setOpen([...open, i]);
                if (open.length === 1) setMoves((m) => m + 1);
              }
            }}
          >
            {open.includes(i) || matched.includes(i) ? c : "?"}
          </button>
        ))}
      </div>
    </div>
  );
}
function Bug({ beep }: { beep: () => void }) {
  const [score, setScore] = useState(0);
  const [bug, setBug] = useState(4);
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return (
    <div className="bug-game">
      <div className="game-status">
        <span>{score} bugs squashed</span>
        <span>{left}s</span>
      </div>
      <div className="bug-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            disabled={!left}
            aria-label={"Debug slot " + (i + 1)}
            onClick={() => {
              if (i === bug) {
                beep();
                setScore((s) => s + 1);
                setBug((b) => (b + 1 + Math.floor(Math.random() * 8)) % 9);
              }
            }}
          >
            {left > 0 && i === bug ? "🐛" : "·"}
          </button>
        ))}
      </div>
      {!left && (
        <button
          className="start-game"
          onClick={() => {
            setScore(0);
            setLeft(20);
          }}
        >
          {score ? "Play again" : "Start debugging"} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [sound, setSound] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const arcade = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => {
    try {
      setTheme(localStorage.getItem("adarsh-theme") || "dark");
    } catch { }
  }, []);
  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
    (document.documentElement.dataset.theme =
      theme === "system" ? (m.matches ? "dark" : "light") : theme);
    apply();
    m.addEventListener("change", apply);
    try {
      localStorage.setItem("adarsh-theme", theme);
    } catch { }
    return () => m.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-25% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((e) => obs.observe(e));
    const rev = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            rev.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => rev.observe(e));
    const scroll = () =>
      setProgress(
        window.scrollY / (document.documentElement.scrollHeight - innerHeight),
      );
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      obs.disconnect();
      rev.disconnect();
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  function beep(force = false) {
    if (!sound && !force) return;
    try {
      audio.current ??= new AudioContext();
      audio.current.resume();
      const o = audio.current.createOscillator(),
        g = audio.current.createGain();
      o.connect(g);
      g.connect(audio.current.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(680, audio.current.currentTime);
      o.frequency.exponentialRampToValueAtTime(
        1000,
        audio.current.currentTime + 0.07,
      );
      g.gain.setValueAtTime(0.035, audio.current.currentTime);
      g.gain.exponentialRampToValueAtTime(
        0.001,
        audio.current.currentTime + 0.12,
      );
      o.start();
      o.stop(audio.current.currentTime + 0.13);
    } catch { }
  }
  return (
    <SidebarProvider>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      <a className="skip-link" href="#experience">
        Skip to experience
      </a>
      <Sidebar side="right" collapsible="none" className="right-rail">
        <a className="rail-logo" href="#home" aria-label="Home">
          ad<span>.</span>
        </a>
        <nav aria-label="Section navigation">
          {sections.map((s, i) => (
            <a
              onClick={() => beep()}
              href={"#" + s.toLowerCase()}
              key={s}
              className={active === s.toLowerCase() ? "active" : ""}
              aria-current={active === s.toLowerCase() ? "location" : undefined}
            >
              <span className="nav-number">0{i + 1}</span>
              <span className="nav-label">{s}</span>
            </a>
          ))}
        </nav>
        <div className="rail-tools">
          <RadioGroup
            value={theme}
            onValueChange={(v) => {
              setTheme(v);
              beep();
            }}
            aria-label="Color theme"
            className="theme-options"
          >
            {[
              ["light", Sun],
              ["dark", Moon],
              ["system", Monitor],
            ].map(([v, Icon]) => (
              <label
                title={v === "system" ? "Follow device theme" : v + " mode"}
                key={v as string}
              >
                <RadioGroupItem value={v as string} aria-label={v + " mode"} />
                {typeof Icon !== "string" && <Icon size={17} />}
              </label>
            ))}
          </RadioGroup>
          <button
            className="sound-button"
            aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
            aria-pressed={sound}
            onClick={() => {
              setSound(!sound);
              if (!sound) beep(true);
            }}
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
        </div>
      </Sidebar>
      <main>
        <header className="topbar">
          <a className="wordmark" href="#home">
            ADARSH DIWAKAR<span>ENGINEER / BUILDER</span>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adarsh2218diwakar@gmail.com" className="availability" target="_blank" rel="noopener noreferrer">
            <i /> Let’s build something <ArrowUpRight size={16} />
          </a>
        </header>
        <section id="home" className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="small-line" /> A LITTLE LOGIC. A LOT OF
              CURIOSITY.
            </div>
            <h1>
              I build things
              <br />
              that <span className="serif">just work.</span>
              <span className="lime-dot">*</span>
            </h1>
            <p className="hero-description">
              Hey, I’m Adarsh. A software engineer turning complex problems into
              thoughtful products.
              <br />
              <span>Serious about systems. Playful about everything else.</span>
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#work" onClick={() => beep()}>
                Explore my work <ArrowUpRight size={19} />
              </a>
              <a
                className="text-link"
                href="/Adarsh-Diwakar-Resume.pdf"
                download
              >
                Résumé <Download size={16} />
              </a>
            </div>
            <div className="hero-social">
              <a href={links.github} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} /> LinkedIn
              </a>
              <span>Bangalore, India ↗</span>
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-ring" />
            <span className="orbit-label">
              ALWAYS BUILDING · ALWAYS LEARNING ·
            </span>
            <div className="portrait-frame">
              <img src="/adarsh.png" alt="Adarsh Diwakar" />
              <div className="portrait-caption">
                <span>THE HUMAN BEHIND THE CODE</span>
                <strong>
                  Adarsh Diwakar <Sparkles size={20} />
                </strong>
              </div>
            </div>
            <div className="floating-label label-one">
              <Code2 size={18} />
              <span>engineer by craft</span>
            </div>
            <div className="floating-label label-two">
              <span className="lime">✦</span> curious by default
            </div>
            <div className="portrait-coordinate">
              12.9716° N &nbsp; 77.5946° E
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#experience">
              <ArrowDown size={16} /> SCROLL TO DISCOVER
            </a>
            <span>GOOD SYSTEMS. GOOD EXPERIENCES.</span>
            <span>01 / 05</span>
          </div>
        </section>
        <div className="skill-ribbon" aria-label="Primary technologies">
          <div>
            {[
              "Java",
              "Spring Boot",
              "Hibernate ORM",
              "Flyway",
              "AWS",
              "React",
              "PostgreSQL",
              "Redis",
              "Kafka",
              "Docker",
              "Kubernetes",
              "Java",
              "Spring Boot",
              "Hibernate ORM",
              "Flyway",
              "AWS",
              "React",
              "PostgreSQL",
              "Redis",
              "Kafka",
              "Docker",
              "Kubernetes",
            ].map((s, i) => (
              <span key={i}>
                {s}
                <b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <section id="experience" className="section">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">01 / THE JOURNEY</div>
              <h2>
                Built with purpose.
                <br />
                <span className="serif">Backed by experience.</span>
              </h2>
            </div>
            <p>
              From event pipelines to the details people see.
              <br />I like owning the whole problem.
            </p>
          </div>
          <div className="stats reveal">
            <div>
              <strong>
                2<span>+</span>
              </strong>
              <p>Years building products</p>
            </div>
            <div>
              <strong>69</strong>
              <p>Features delivered</p>
            </div>
            <div>
              <strong>18</strong>
              <p>Database migrations</p>
            </div>
            <div>
              <strong>
                75<span>%</span>
              </strong>
              <p>Lower p95 latency · 1.8s → 450ms</p>
            </div>
          </div>
          <div className="experience-row reveal">
            <div className="job-meta">
              <span className="job-period">OCT 2025 — PRESENT</span>
              <h3>Fullstory</h3>
              <span>Software Engineer · Remote</span>
            </div>
            <div className="job-detail">
              <h4>Making analytics work, end to end.</h4>
              <p>
                Owned the Reporter analytics service—from schemas and event
                ingestion to reporting APIs. Built identity resolution with
                Redis-backed caching and dedicated workers for asynchronous
                analytics.
              </p>
              <div className="impact">
                <Zap size={17} />
                <span>
                  Turned memory-heavy CSV exports into a row-by-row streaming
                  pipeline.
                </span>
              </div>
              <div className="tags">
                <span>Python</span>
                <span>FastAPI</span>
                <span>Redis Streams</span>
                <span>PostgreSQL</span>
              </div>
            </div>
            <span className="job-index">01</span>
          </div>
          <div className="experience-row reveal">
            <div className="job-meta">
              <span className="job-period">JUL 2024 — SEP 2025</span>
              <h3>
                Accolite ×<br />
                Bounteous
              </h3>
              <span>Software Engineer · Bengaluru</span>
            </div>
            <div className="job-detail">
              <h4>Less waiting. More throughput.</h4>
              <p>
                Built microservices serving ~15K requests a day. Reworked slow
                reporting queries with composite indexes and removed N+1
                patterns across tables of ~20M records.
              </p>
              <div className="impact">
                <Layers size={17} />
                <span>Kafka pipelines handling ~500K events per day.</span>
              </div>
              <div className="tags">
                <span>Java / Spring Boot</span>
                <span>Kafka</span>
                <span>MySQL</span>
                <span>Redis</span>
              </div>
            </div>
            <span className="job-index">02</span>
          </div>
          <div className="education reveal">
            <span>THE FOUNDATION</span>
            <p>B.E. Computer Science · Army Institute of Technology, Pune</p>
            <strong>9.0 / 10 CGPA</strong>
            <span>2020 — 2024</span>
          </div>
        </section>
        <section id="work" className="section work-section">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">02 / SELECTED WORK</div>
              <h2>
                Ideas into <span className="serif">real things.</span>
              </h2>
            </div>
            <a
              className="text-link"
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="project-grid">
            <a
              href={links.food}
              target="_blank"
              rel="noreferrer"
              className="project-card reveal"
            >
              <div className="project-visual food-visual">
                <div className="mini-browser">
                  <div className="browser-bar">
                    <i />
                    <i />
                    <i />
                    <span>food delivery / storefront</span>
                  </div>
                  <div className="food-content">
                    <span className="food-brand">
                      fresh<span>.</span>
                    </span>
                    <div className="food-title">
                      Good food.
                      <br />
                      <em>Great mood.</em>
                    </div>
                    <div className="food-chips">
                      <span>Browse</span>
                      <span>Order</span>
                      <span>Enjoy ↗</span>
                    </div>
                    <div className="order-line">
                      <span>YOUR NEXT FAVOURITE MEAL</span>
                      <ArrowUpRight />
                    </div>
                  </div>
                </div>
                <span className="project-preview-label">
                  STOREFRONT CONCEPT
                </span>
              </div>
              <div className="project-info">
                <div>
                  <span className="eyebrow">FULL-STACK / COMMERCE</span>
                  <h3>Food Delivery Platform</h3>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <p>
                From the first craving to checkout. A MERN platform with a
                customer storefront, admin portal, and Stripe & Razorpay
                payments.
              </p>
              <div className="tags">
                <span>React</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>Payments</span>
              </div>
            </a>
            <a
              href={links.multiVendor}
              target="_blank"
              rel="noreferrer"
              className="project-card reveal"
            >
              <div className="project-visual commerce-visual">
                <div className="commerce-panel">
                  <div className="commerce-head">
                    <span>market / seller studio</span>
                    <Layers size={19} />
                  </div>
                  <div className="commerce-title">
                    One marketplace.
                    <br />
                    <span>Many possibilities.</span>
                  </div>
                  <div className="commerce-bars">
                    {[35, 52, 42, 70, 58, 86, 100].map((h, i) => (
                      <i key={i} style={{ height: h + "%" }} />
                    ))}
                  </div>
                  <div className="commerce-bottom">
                    <span>SELLERS</span>
                    <span>WALLETS</span>
                    <span>REAL-TIME CHAT</span>
                  </div>
                </div>
                <span className="project-preview-label">
                  SELLER DASHBOARD CONCEPT
                </span>
              </div>
              <div className="project-info">
                <div>
                  <span className="eyebrow">FULL-STACK / MARKETPLACE</span>
                  <h3>Multi-Vendor E-commerce</h3>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <p>
                A shared home for customers, sellers, and admins—with seller
                wallets, Stripe payouts, live chat, and analytics.
              </p>
              <div className="tags">
                <span>React</span>
                <span>Socket.IO</span>
                <span>Stripe</span>
                <span>Redux Toolkit</span>
              </div>
            </a>
          </div>
          <div className="competitive reveal">
            <span className="competitive-icon">⌘</span>
            <div>
              <strong>A soft spot for hard problems.</strong>
              <p>
                Codeforces Expert · 1607 max &nbsp; / &nbsp; CodeChef 4★ · 1709
                max &nbsp; / &nbsp; Google Kick Start · Global rank 1131
              </p>
            </div>
            <span className="serif">keep solving ↗</span>
          </div>
        </section>
        <section id="play" className="section play-section">
          <div className="section-heading reveal">
            <div>
              <div className="eyebrow">03 / NOT ALL WORK</div>
              <h2>
                Take a little <span className="serif">play break.</span>
              </h2>
            </div>
            <div className="arcade-arrows">
              <button
                aria-label="Previous games"
                onClick={() =>
                  arcade.current?.scrollBy({ left: -430, behavior: "smooth" })
                }
              >
                <ArrowLeft />
              </button>
              <button
                aria-label="Next games"
                onClick={() =>
                  arcade.current?.scrollBy({ left: 430, behavior: "smooth" })
                }
              >
                <ArrowRight />
              </button>
            </div>
          </div>
          <p className="play-intro">
            A few tiny games. Because curiosity should be fun.
          </p>
          <div ref={arcade} className="arcade-track">
            <article className="game-card">
              <div className="game-heading">
                <span>01 / REFLEX TEST</span>
                <Zap size={18} />
              </div>
              <h3>Beat the clock.</h3>
              <p>Wait for green. Tap as fast as you can.</p>
              <Reaction beep={() => beep()} />
              <div className="game-footer">
                <span>ONE TAP. ALL INSTINCT.</span>
                <span>↗</span>
              </div>
            </article>
            <article className="game-card">
              <div className="game-heading">
                <span>02 / MEMORY MATCH</span>
                <Layers size={18} />
              </div>
              <h3>Cache it in your head.</h3>
              <p>Eight cards. Four pairs. Zero cache misses?</p>
              <Memory beep={() => beep()} />
              <div className="game-footer">
                <span>YOUR BRAIN IS THE DATABASE.</span>
                <span>↗</span>
              </div>
            </article>
            <article className="game-card">
              <div className="game-heading">
                <span>03 / BUG HUNT</span>
                <Gamepad2 size={18} />
              </div>
              <h3>Ship it bug-free.</h3>
              <p>Squash as many bugs as you can in 20 seconds.</p>
              <Bug beep={() => beep()} />
              <div className="game-footer">
                <span>FINALLY, DEBUGGING IS FUN.</span>
                <span>↗</span>
              </div>
            </article>
          </div>
          <div className="arcade-hint">
            <span>← SCROLL TO EXPLORE →</span>
            <span>SOUND {sound ? "ON" : "OFF"} · TOGGLE ON THE RIGHT</span>
          </div>
        </section>
        <section id="connect" className="section connect-section">
          <div className="eyebrow reveal">04 / WHAT’S NEXT?</div>
          <h2 className="reveal">
            Something great
            <br />
            starts with <span className="serif">hello.</span>
            <span className="lime-dot">*</span>
          </h2>
          <div className="contact-row reveal">
            <p>
              Have an interesting problem, a role in mind,
              <br />
              or just a good game recommendation?
            </p>
            <a
              className="primary-btn"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=adarsh2218diwakar@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let’s talk <ArrowUpRight size={20} />
            </a>
          </div>
          <a className="email-link" href="https://mail.google.com/mail/?view=cm&fs=1&to=adarsh2218diwakar@gmail.com" target="_blank" rel="noopener noreferrer">
            adarsh2218diwakar@gmail.com <ArrowUpRight size={20} />
          </a>
          <footer>
            <span>© {new Date().getFullYear()} Adarsh Diwakar</span>
            <span>BUILT WITH LOGIC & A LITTLE PLAY.</span>
            <div>
              <a href={links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="#home">Back to top ↑</a>
            </div>
          </footer>
        </section>
      </main>
    </SidebarProvider>
  );
}
