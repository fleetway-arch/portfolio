import { useEffect, useState } from "react";

const navItems = [
  { label: "Projects", href: "/", sub: "Selected work" },
  { label: "Skills", href: "/skills", sub: "Skills snapshot" },
  { label: "Experience", href: "/experience", sub: "Experience timeline" },
  { label: "About", href: "/about", sub: "About me" },
];

const projects = [
  {
    name: "Groupie Tracker",
    tag: "Go · APIs",
    tint: "crimson",
    image: "/images/groupie_image.jpeg",
    description:
      "A concert discovery app that explores artist and location data with filtering, structured responses, and a clean information layout.",
    summary: "Searchable music data and a polished information view.",
    link: "https://github.com/fleetway-arch/groupie-tracker",
    highlights: [
      "Structured API data into a browsable experience",
      "Kept the layout readable while exposing useful filtering context",
      "Balanced technical depth with a clean visual presentation",
    ],
  },
  {
    name: "Net Cat",
    tag: "Go · Networking",
    tint: "teal",
    image: "/images/net_cat.jpeg",
    description:
      "A concurrent chat tool built in Go with live messaging, multiple client handling, and a focus on reliable networking behavior.",
    summary: "Real-time communication and multi-client coordination.",
    link: "https://github.com/fleetway-arch/net-cat",
    highlights: [
      "Handled concurrent clients without losing clarity in the code",
      "Focused on predictable socket behavior and message flow",
      "Kept the interface minimal so the networking behavior stayed central",
    ],
  },
  {
    name: "YuGidle",
    tag: "Game · UI",
    tint: "violet",
    image: "/images/yugidle.jpeg",
    description:
      "A playful word game inspired by Wordle, built around Yu-Gi-Oh! cards with fast feedback and a game loop that keeps the experience moving.",
    summary: "Interactive gameplay with responsive state changes.",
    link: "https://github.com/IronBeagle404/yugidle",
    highlights: [
      "Built a game loop with fast feedback and clear state changes",
      "Kept the interaction playful without making the logic fragile",
      "Used a clean data flow for card-driven gameplay decisions",
    ],
  },
  {
    name: "Portfolio Refresh",
    tag: "Design · Layout",
    tint: "moss",
    image: "/images/ascii-art.jpeg",
    description:
      "The site redesign you are viewing now: a React portfolio with a clearer hierarchy, usable navigation, and responsive content sections.",
    summary: "Cleaner structure, better spacing, and stronger flow.",
    highlights: [
      "Migrated the portfolio from static HTML to reusable React components",
      "Made the portfolio useful on both desktop and mobile",
      "Kept shared navigation and visual patterns consistent across pages",
    ],
  },
];

const skillCards = [
  ["⚙️", "Technical skill", "Backend development", "Servers, APIs, and application logic.", ["Go", "REST APIs", "Server architecture", "Concurrency basics"]],
  ["🗄️", "Technical skill", "Databases", "Storage, querying, and structure.", ["SQL", "Schema design", "Query optimization", "Data modeling"]],
  ["🎨", "Technical skill", "Frontend development", "Interfaces that stay readable on every screen.", ["HTML and CSS", "JavaScript", "Responsive design", "Component structure"]],
  ["🛠️", "Technical skill", "Tools and workflows", "Reliable development habits and delivery.", ["Git", "Linux", "Docker", "Testing habits"]],
  ["👥", "Professional skill", "Team collaboration", "Communication, feedback, and shared goals.", ["Code reviews", "Agile teamwork", "Clear communication", "Pair problem solving"]],
  ["🧠", "Professional skill", "Problem solving", "Debugging, planning, and trade-off thinking.", ["Algorithmic thinking", "Debugging", "System design", "Performance tuning"]],
  ["🏁", "Challenge", "Jehanne d'Hack CTF", "Participation in a cybersecurity challenge and hands-on problem solving.", ["CTF challenges", "Security mindset", "Research"], true],
  ["📚", "Training", "Learning through practice", "A space for workshops, tutorials, and other training experiences.", ["Technical practice", "Continuous learning", "New technologies"], true],
];

const skillTints = {
  "Technical skill": "teal",
  "Professional skill": "violet",
  Challenge: "crimson",
  Training: "crimson",
};

function Header({ currentPage }) {
  return (
    <header className="site-header">
      <div className="site-brand">
        <a href="/" className="site-title"><span className="site-title-first">Angelique</span> Oluwabusayomi</a>
        <span className="site-kicker">Portfolio</span>
        <span className="site-version" aria-hidden="true">v.2026</span>
      </div>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="nav-link" aria-current={currentPage === item.href ? "page" : undefined}>
            <span className="nav-label">{item.label}</span>
            <span className="nav-sub" aria-hidden="true">{item.sub}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}

function Layout({ currentPage, children }) {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <Header currentPage={currentPage} />
      <main className="page-shell">{children}</main>
    </>
  );
}

function Hero({ eyebrow, title, text, stats, boot, children }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="slash-bar hero-bar"><span className="slash-bar-body">{eyebrow}</span></p>
        <h1>{title}</h1>
        <p className="hero-text">{text}</p>
        {children}
      </div>
      <div className="terminal">
        <div className="terminal-boot" aria-hidden="true">
          {boot.map((line) => <p key={line}>{line}</p>)}
        </div>
        <ul className="terminal-stats">
          {stats.map(([value, label]) => (
            <li className="terminal-row" key={label}>
              <span className="terminal-value">{value}</span>
              <span className="terminal-label">{label}</span>
            </li>
          ))}
        </ul>
        <p className="terminal-caret" aria-hidden="true">&gt;</p>
      </div>
    </section>
  );
}

function Home() {
  const [selected, setSelected] = useState(projects[0]);
  return (
    <>
      <Hero
        eyebrow="Backend-focused developer"
        boot={["ANGELIQUE.SYS // portfolio unit initializing", "go runtime ............. done", "loading projects [4] ... done", "rendering interface .... done"]}
        title="Practical web builds with clear structure and strong delivery."
        text="This portfolio highlights projects, skills, and experience in a format that is easy to scan, responsive on mobile, and ready for real use."
        stats={[["4", "featured projects"], ["Go", "backend foundation"], ["SQL", "data modeling and APIs"], ["UI", "responsive front ends"]]}
      >
        <div className="hero-actions">
          <a href="#projects" className="button button-primary">Browse projects</a>
          <a href="/skills" className="button button-secondary">View skills</a>
        </div>
      </Hero>
      <section className="content-section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Projects that show both technical depth and usability.</h2>
          <p>Select a card to update the project detail panel. The first project is selected by default, so the page feels useful immediately.</p>
        </div>
        <div className="project-layout">
          <div className="project-grid" aria-label="Project list">
            {projects.map((project) => (
              <button type="button" className={`project-card notched${selected.name === project.name ? " is-active" : ""}`} data-tint={project.tint} key={project.name} onClick={() => setSelected(project)} aria-pressed={selected.name === project.name}>
                <img className="project-image" src={project.image} alt={`${project.name} project preview`} width="736" height="460" loading="lazy" decoding="async" />
                <div className="project-card-body">
                  <span className="project-tag">{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
              </button>
            ))}
          </div>
          <aside className="project-details" data-tint={selected.tint} translate="yes">
            <p className="eyebrow">Project spotlight</p>
            <h2>{selected.name}</h2>
            <p className="detail-description">{selected.description}</p>
            <div className="detail-difficulties">
              <strong>What this project highlights</strong>
              <ul>{selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </div>
            <div className="detail-actions">
              {selected.link && <a href={selected.link} className="button button-primary" target="_blank" rel="noreferrer">View project</a>}
              <a href="/skills" className="button button-secondary">See skills</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Skills() {
  return (
    <>
      <Hero
        eyebrow="Skills snapshot"
        boot={["ANGELIQUE.SYS // skills.index", "mounting toolchain ..... done"]}
        title="Balanced across backend systems, product thinking, and delivery."
        text="The focus is on the skills that show up in real projects: readable code, data handling, responsive UI, and dependable collaboration."
        stats={[["Go", "primary language"], ["SQL", "data design"], ["UI", "responsive layouts"]]}
      />
      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Core strengths</p>
          <h2>Skills, challenges, and experiences in one place.</h2>
          <p>Each card shows something I can do, have practiced, or have taken part in.</p>
        </div>
        <div className="skills-grid">
          {skillCards.map(([icon, type, title, description, tags, featured]) => (
            <article className={`skill-card notched${featured ? " skill-card-featured" : ""}`} data-tint={skillTints[type]} key={title}>
              <div className="skill-card-heading">
                <span className="skill-icon" aria-hidden="true">{icon}</span>
                <div>
                  <span className="skill-card-type">{type}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
              <ul className="skill-list">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="summary-box"><p>I build with a backend-first mindset, but I care just as much about making the result easy to understand, easy to use, and easy to maintain.</p></div>
      </section>
    </>
  );
}

const experiences = [
  ["2026", "Portfolio redesign and refinement", "Current portfolio", "Reworked the site structure, clarified navigation, and tightened the visual system so the portfolio feels like a real product instead of a rough draft.", ["HTML", "CSS", "React", "UI design"]],
  ["September 2025 – now", "Animation with children", "Ongoing role", "Leading creative activities and educational animation programs for children, fostering engagement, learning, and personal growth through structured and interactive experiences.", ["Leadership", "Communication", "Creative planning", "Child development"]],
  ["August 2025", "Animation with children", "Mairie of Sotteville", "Delivered organized animation programs for children at the local municipal office, creating engaging activities that encourage participation, learning, and community connection.", ["Program coordination", "Activity design", "Community engagement", "Adaptability"]],
  ["February 2025", "BAFA certification", "Professional qualification", "Earned BAFA certification (Brevet d'Aptitude aux Fonctions d'Animateur) with specialization in working with people with disabilities and special care needs, enabling inclusive and adaptive program delivery.", ["Special care support", "Inclusive design", "Accessibility", "Adaptability"]],
];

function Experience() {
  return (
    <>
      <Hero eyebrow="Experience timeline" boot={["ANGELIQUE.SYS // timeline.log", "reading milestones ..... done"]} title="A path built around projects, iteration, and stronger delivery." text="This timeline keeps the story honest and useful: what has been built, what was learned, and how the portfolio has improved over time." stats={[["Projects", "hands-on work"], ["Learning", "continuous growth"], ["Teams", "clear collaboration"]]} />
      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Milestones</p>
          <h2>Work that shows momentum, not just a list of dates.</h2>
          <p>Each entry describes a phase of growth that shaped the portfolio and the way projects are built today.</p>
        </div>
        <div className="timeline">
          {experiences.map(([period, title, company, description, tags]) => (
            <article className="experience-item" key={title + period}>
              <div className="experience-content">
                <div className="experience-period">{period}</div>
                <div className="experience-title">{title}</div>
                <div className="experience-company">{company}</div>
                <div className="experience-description">{description}</div>
                <div className="experience-skills">{tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="summary-box"><p>The thread through every stage is the same: build something useful, make it easier to understand, and leave the next person with a cleaner starting point.</p></div>
      </section>
    </>
  );
}

const facts = ["I start with structure, then refine visuals once the flow is clear.", "I prefer readable code and interfaces that stay simple under pressure.", "I enjoy improving existing work instead of only building from scratch.", "I like working on projects that combine backend logic with clean presentation."];

function About() {
  return (
    <>
      <Hero eyebrow="About me" boot={["ANGELIQUE.SYS // operator profile", "BAFA cert: special care  verified"]} title="Focused on building software that is practical, readable, and reliable." text="I like shipping projects that solve a clear problem and stay easy to maintain after the first launch." stats={[["Clear", "structure first"], ["Practical", "real project focus"], ["Usable", "mobile-friendly delivery"]]} />
      <section className="content-section about-stack">
        <div className="about-grid">
          <section className="about-card notched"><p className="eyebrow">Who I am</p><h2>Builder first, optimist second, and usually the person cleaning up the details.</h2><p>My best work comes from taking an idea, breaking it into small pieces, and making sure each piece is understandable before it is styled or shipped.</p><p>I care about backend structure, data handling, and the front-end experience that makes a project feel finished instead of just functional.</p></section>
          <section className="about-card about-card-accent notched" data-tint="violet"><p className="eyebrow">What I value</p><ul className="value-list"><li><strong>Clarity:</strong> code and layouts should make sense fast.</li><li><strong>Reliability:</strong> a feature should keep working after handoff.</li><li><strong>Consistency:</strong> details matter across pages and devices.</li><li><strong>Growth:</strong> every project should sharpen the next one.</li></ul></section>
        </div>
        <section className="about-card notched" data-tint="teal"><p className="eyebrow">How I work</p><div className="facts-list">{facts.map((fact, index) => <div className="fact-item" key={fact}><span className="fact-number">0{index + 1}</span><p>{fact}</p></div>)}</div></section>
        <section className="about-cta"><h2>Next steps</h2><p>If you want the full picture, the projects, skills, and experience pages work together as one portfolio instead of disconnected pieces.</p><div className="cta-buttons"><a href="/" className="button button-accent">Browse projects</a><a href="/experience" className="button button-secondary">See experience</a></div></section>
      </section>
      <section className="content-section contact-section">
        <article className="contact-photo-card notched"><img src="/images/Image_me.jpg" alt="Photo of Angelique Oluwabusayomi" className="contact-photo" width="1200" height="1800" loading="lazy" decoding="async" /></article>
        <article className="contact-info-card"><p className="eyebrow">Contact</p><h2>My information</h2><ul className="contact-info-list"><li><span className="contact-label">Full name</span><span>Angelique Oluwabusayomi</span></li><li><span className="contact-label">Email</span><a href="mailto:bozebuzze@gmail.com">bozebuzze@gmail.com</a></li><li><span className="contact-label">Phone</span><a href="tel:+33766102666">0766102666</a></li><li><span className="contact-label">Location</span><span>France, 76520, Franqueville-Saint-Pierre</span></li><li><span className="contact-label">LinkedIn / GitHub</span><a href="https://www.linkedin.com/in/oluwabusayomi-angelique-0a8916334" target="_blank" rel="noreferrer">www.linkedin.com/in/oluwabusayomi-angelique-0a8916334</a><a href="https://github.com/fleetway-arch" target="_blank" rel="noreferrer">github.com/fleetway-arch</a></li></ul></article>
      </section>
    </>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, "") || "/");

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname.replace(/\/$/, "") || "/");
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a");
      if (link?.origin === window.location.origin && link.getAttribute("href")?.startsWith("/") && !link.target) {
        event.preventDefault();
        window.history.pushState({}, "", link.getAttribute("href"));
        handleNavigation();
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("popstate", handleNavigation);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const page = path === "/skills" ? <Skills /> : path === "/experience" ? <Experience /> : path === "/about" ? <About /> : <Home />;
  return <Layout currentPage={path}>{page}</Layout>;
}
