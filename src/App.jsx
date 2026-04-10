import { useState, useEffect, useRef } from "react";

const DATA = {
  meta: { siteTitle: "ESWARAN S" },
  hero: {
    name: "ESWARAN S",
    tagline: "CYBER SECURITY",
    subTagline: "BREAKER. DEFENDER. BUILDER.",
    description: "BCA Student @ HITS · Cyber Security Specialization · CTF Competitor · Pentester in Training",
    cta: { primary: { label: "VIEW PROJECTS", href: "#projects" }, secondary: { label: "CONTACT ME", href: "#contact" } },
  },
  about: {
    summary: "I'm a BCA student specializing in Cyber Security at Hindustan Institute of Technology & Science, Chennai. I break things to understand how to protect them — from CTF competitions to real-world VAPT tools.",
    details: ["CGPA: 9.23 / 10", "Specialization: Cyber Security", "Class Representative", "Project Trainee @ HTC Global Services"],
    education: { degree: "Bachelor of Computer Applications (BCA)", institution: "Hindustan Institute of Technology & Science", year: "2023 – 2026" },
    links: [
      { label: "LINKEDIN", url: "https://linkedin.com/in/eswarans06" },
      { label: "GITHUB", url: "https://github.com/EswaranS-06" },
      { label: "TRYHACKME", url: "https://tryhackme.com/p/RaymenRex" },
    ],
  },
  projects: [
    {
      id: 1, title: "WEB VAPT DOCUMENT AUTOMATION TOOL", stack: ["Python", "JWT", "REST APIs"], status: "COMPLETED",
      description: "Web-based automation tool to streamline VAPT documentation processes.",
      highlights: ["Create, Edit, Export and Mail reports from the web interface", "JWT-based authentication system", "REST API endpoint security testing & validation"],
    },
    {
      id: 2, title: "REAL-TIME ML-BASED LOG ANOMALY DETECTION", stack: ["Python", "ML", "NLP", "REST APIs"], status: "IN PROGRESS",
      description: "End-to-end pipeline ingesting raw system logs, NLP preprocessing, and ML-based real-time anomaly scoring.",
      highlights: ["Raw system log ingestion with NLP preprocessing", "ML-based real-time anomaly scoring engine", "Security insight dashboards for rapid threat detection"],
    },
  ],
  skills: {
    categories: [
      { name: "PROGRAMMING", items: ["Python", "Bash"] },
      { name: "SECURITY TOOLS", items: ["Wireshark", "Burp Suite", "Metasploit", "Nmap", "Snort"] },
      { name: "NETWORKING", items: ["TCP/IP", "DNS", "HTTP/HTTPS", "OSI Model"] },
      { name: "OPERATING SYSTEMS", items: ["Linux", "Windows"] },
      { name: "DATABASE", items: ["PostgreSQL"] },
      { name: "SOFT SKILLS", items: ["Problem-Solving", "Creativity", "Adaptability", "Teamwork"] },
    ],
  },
  certifications: [
    { name: "Sumologic Fundamentals", issuer: "Sumo Logic", path: "./src/images/sample_cert.png" },
    { name: "Jr Penetration Tester Path", issuer: "TryHackMe", path: "./src/images/sample_cert.png" },
    { name: "Pre-Security Path", issuer: "TryHackMe" },
    { name: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild" },
    { name: "Networking Basics", issuer: "Cisco NetAcad" },
  ],
  achievements: [
    { title: "TCS HACKQUEST CTF", description: "Cleared 2 rounds. Solved JS deobfuscation, DoH traffic analysis, Base64 decoding, and API security testing challenges." },
    { title: "PEC CAPTURE THE FLAG — 5TH PLACE", description: "Demonstrated skills in cryptography, OSINT, steganography, and reverse engineering." },
    { title: "CYBERTRON CTF — RANK #34", description: "Secured 4430 points in a 30-hour Jeopardy-style CTF event." },
  ],
  writeups: [],
  blogs: [],
  contact: {
    email: "eswaransk06@gmail.com",
    phone: "+91-79042 77715",
    location: "Chennai, India",
    links: [
      { label: "EMAIL ME", url: "mailto:eswaransk06@gmail.com", primary: true },
      { label: "LINKEDIN ↗", url: "https://linkedin.com/in/eswarans06" },
      { label: "GITHUB ↗", url: "https://github.com/EswaranS-06" },
    ],
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimBlock({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        opacity: visible ? 1 : 0, 
        transform: visible ? "translateY(0)" : "translateY(40px)", 
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` 
      }}
    >
      {children}
    </div>
  );
}

function GlitchText({ text, className = "" }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 150); }, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`glitch-wrapper ${className}`}>
      {text}
      {glitch && (
        <>
          <span className="glitch-layer glitch-red">{text}</span>
          <span className="glitch-layer glitch-cyan">{text}</span>
        </>
      )}
    </span>
  );
}

function TypeWriter({ text, speed = 60, onDone }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(id); onDone && onDone(); }
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return <span>{displayed}<span className="typewriter-cursor">&nbsp;</span></span>;
}

function CyclingLogo({ names }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  
  useEffect(() => {
    if (index >= names.length) return;

    // Transition to reversing
    if (subIndex === names[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    // Transition to next index
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % names.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, names]);

  return (
    <>
      {names[index].substring(0, subIndex)}
      <span className="cursor-blink">_</span>
    </>
  );
}

function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 40);
    return () => clearInterval(id);
  }, [visible, target]);
  return (
    <div ref={ref} className="counter-container">
      <div className="counter-number">{count}+</div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

function NavBar({ active, onHomeClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["ABOUT", "PROJECTS", "SKILLS", "CERTS", "WRITEUPS", "CONTACT"];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="nav-logo" onClick={() => { onHomeClick && onHomeClick(); closeMenu(); }} style={{ cursor: 'pointer' }}>
        <CyclingLogo names={["REX", "Raymen_Rex", "Eswaran S"]} />
      </div>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map(l => (
          <a 
            key={l} 
            href={onHomeClick ? "#" : `#${l.toLowerCase()}`}
            onClick={(e) => {
              closeMenu();
              if (onHomeClick) {
                e.preventDefault();
                onHomeClick();
                setTimeout(() => {
                  const el = document.getElementById(l.toLowerCase());
                  if (el) el.scrollIntoView();
                }, 100);
              }
            }}
            className={`nav-link ${active === l ? "active" : ""}`}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [phase, setPhase] = useState(0);
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-overlay" />
      <div className="hero-scanline-overlay" />

      <div className="hero-content">
        <div className="hero-prefix">
          {"> HELLO WORLD. I AM —"}
        </div>

        <h1 className="hero-title">
          <GlitchText text="ESWARAN" />
          {/* <br /> */}
          <span className="outline"> . S</span>
        </h1>

        <div className="hero-tagline">
          CYBER SECURITY
        </div>

        <div className="hero-subtagline">
          {phase >= 0 ? <TypeWriter text="BREAKER. DEFENDER. BUILDER." speed={55} onDone={() => setPhase(1)} /> : ""}
        </div>

        <p className="hero-description">
          BCA Student @ HITS · Cyber Security Specialization · CTF Competitor · Pentester in Training
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            VIEW PROJECTS
          </a>
          <a href="#contact" className="btn-secondary">
            CONTACT ME
          </a>
        </div>

        <div className="hero-bg-text">
          SEC
        </div>
      </div>

      <div className="hero-stats">
        {[["5+", "CERTS"], ["3", "CTF WINS"], ["2", "PROJECTS"]].map(([n, l]) => (
          <div key={l} className="hero-stat-item">
            <div className="hero-stat-number">{n}</div>
            <div className="hero-stat-label">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// ABOUT ME</div>
        </AnimBlock>
        <div className="about-grid">
          <div>
            <AnimBlock delay={0.1}>
              <h2 className="section-title">
                ABOUT<br /><span className="red">ME.</span>
              </h2>
            </AnimBlock>
            <AnimBlock delay={0.2}>
              <p className="about-summary">{DATA.about.summary}</p>
            </AnimBlock>
            <AnimBlock delay={0.3}>
              <ul className="about-details">
                {DATA.about.details.map((d, i) => (
                  <li key={i} className="about-detail-item">
                    <span className="bullet">›</span>{d}
                  </li>
                ))}
              </ul>
            </AnimBlock>
            <AnimBlock delay={0.4}>
              <div className="about-links">
                {DATA.about.links.map(l => (
                  <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="about-link">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </AnimBlock>
          </div>

          <div className="about-education-col">
            <AnimBlock delay={0.15}>
              <div className="about-sub-title">EDUCATION</div>
              <div className="edu-item">
                <div className="edu-degree">{DATA.about.education.degree}</div>
                <div className="edu-inst">{DATA.about.education.institution}</div>
                <div className="edu-year">{DATA.about.education.year}</div>
              </div>
            </AnimBlock>
            <AnimBlock delay={0.25}>
              <div className="about-sub-title">ACHIEVEMENTS</div>
              {DATA.achievements.map((a, i) => (
                <div key={i} className="achieve-item">
                  <div className="achieve-title">{a.title}</div>
                  <div className="achieve-desc">{a.description}</div>
                </div>
              ))}
            </AnimBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// PROJECTS</div>
          <h2 className="section-title">
            WHAT I'VE <span className="red">BUILT.</span>
          </h2>
        </AnimBlock>
        <div className="projects-grid">
          {DATA.projects.map((p, i) => (
            <AnimBlock key={p.id} delay={i * 0.15}>
              <div className="project-card">
                <div className="project-indicator" />
                <div className="project-number">0{i + 1}</div>

                <span className={`project-status ${p.status === "COMPLETED" ? "completed" : "in-progress"}`}>
                  {p.status}
                </span>

                <h3 className="project-title">{p.title}</h3>

                <div className="project-stack">
                  {p.stack.map(s => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>

                <p className="project-desc">{p.description}</p>

                <ul className="project-highlights">
                  {p.highlights.map((h, hi) => (
                    <li key={hi} className="highlight-item">
                      <span className="bullet">›</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// SKILLS</div>
          <h2 className="section-title">
            TECHNICAL <span className="red">ARSENAL.</span>
          </h2>
        </AnimBlock>
        <div className="skills-grid">
          {DATA.skills.categories.map((cat, i) => (
            <AnimBlock key={cat.name} delay={i * 0.1}>
              <div className="skill-category">
                <div className="skill-cat-name">{cat.name}</div>
                <div className="skill-items">
                  {cat.items.map(item => (
                    <span key={item} className="skill-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certs({ onCertClick }) {
  return (
    <section id="certs" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// CERTIFICATIONS</div>
          <h2 className="section-title">
            EARNED <span className="red">CERTS.</span>
          </h2>
        </AnimBlock>
        {DATA.certifications.map((cert, i) => (
          <AnimBlock key={i} delay={i * 0.08}>
            <div 
              className={`cert-item ${cert.path ? 'clickable' : ''}`}
              onClick={() => cert.path && onCertClick()}
            >
              <div className="cert-info">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              {cert.path && (
                <span className="view-cert-btn">VIEW_CERT [{'>'}]</span>
              )}
            </div>
          </AnimBlock>
        ))}
      </div>
    </section>
  );
}

function CertPage({ onBack }) {
  return (
    <div className="cert-page-wrapper">
      <NavBar onHomeClick={onBack} />
      
      <main className="section-padding" style={{ paddingTop: '100px' }}>
        <div className="section-container">
          <AnimBlock>
            <div className="section-tag">// CERTIFICATE_COLLECTION</div>
            <h2 className="section-title">
              ALL <span className="red">CERTIFICATIONS.</span>
            </h2>
            <button onClick={onBack} className="back-btn">
              [<span className="red-text">!</span>] BACK_TO_DASHBOARD
            </button>
          </AnimBlock>

          <div className="cert-list">
            {DATA.certifications.map((cert, i) => (
              <AnimBlock key={i} delay={i * 0.1}>
                <div className="full-cert-card">
                  <div className="cert-card-header">
                    <div>
                      <h3 className="cert-card-title">{cert.name}</h3>
                      <p className="cert-card-issuer">{cert.issuer}</p>
                    </div>
                    {cert.path && <span className="status-badge">VERIFIED</span>}
                  </div>
                  
                  {cert.path ? (
                    <div className="cert-image-container">
                      {/* Note: Path will need to be relative to the public/src folder correctly. 
                          In Vite, usually we import images or use /src/path if it's in public. 
                          Since the user used ./src/images/..., we'll try to use it as is if it's served. */}
                      <img 
                        src={cert.path.replace('./src', '/src')} 
                        alt={cert.name} 
                        className="cert-display-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/800x600/000000/e8000d?text=CERTIFICATE+NOT+FOUND";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="cert-no-image">
                      <p>// NO IMAGE ACCESS AVAILABLE FOR THIS CERTIFICATION</p>
                    </div>
                  )}
                </div>
              </AnimBlock>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Writeups() {
  return (
    <section id="writeups" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// CTF WRITEUPS & BLOGS</div>
          <h2 className="section-title">
            WRITE<span className="red">UPS.</span>
          </h2>
        </AnimBlock>
        <AnimBlock delay={0.1}>
          <div className="empty-placeholder">
            <div className="empty-icon">[ ]</div>
            <p className="empty-text">// WRITEUPS COMING SOON — STAY TUNED</p>
            <p className="empty-text mt-2">// BLOGS COMING SOON — STAY TUNED</p>
          </div>
        </AnimBlock>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <AnimBlock>
          <div className="section-tag">// CONTACT</div>
        </AnimBlock>
        <AnimBlock delay={0.1}>
          <h2 className="section-title contact-title">
            WANT TO WORK<br /><span className="red">TOGETHER?</span><br />LET'S TALK.
          </h2>
        </AnimBlock>
        <div className="contact-grid">
          <AnimBlock delay={0.2}>
            <div>
              {[["EMAIL", DATA.contact.email], ["PHONE", DATA.contact.phone], ["LOCATION", DATA.contact.location]].map(([label, value]) => (
                <div key={label} className="contact-info-item">
                  <span className="contact-label">{label}</span>
                  <span className="contact-value">{value}</span>
                </div>
              ))}
            </div>
          </AnimBlock>
          <AnimBlock delay={0.3}>
            <div className="contact-links">
              {DATA.contact.links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`contact-btn ${link.primary ? "primary" : "secondary"}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </AnimBlock>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-copy">
        © {new Date().getFullYear()} <span className="red-text">ESWARAN S</span>. ALL RIGHTS RESERVED.
      </p>
      <p className="footer-tech">
        BUILT WITH <span className="red-text">REACT</span> · DATA-DRIVEN
      </p>
    </footer>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const goToCertPage = () => {
    setCurrentPage("cert");
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  if (currentPage === "cert") {
    return <CertPage onBack={goToHome} />;
  }

  return (
    <div className="full-height">
      <NavBar onHomeClick={null} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certs onCertClick={goToCertPage} />
      <Writeups />
      <Contact />
      <Footer />
    </div>
  );
}
