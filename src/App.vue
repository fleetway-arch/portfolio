<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const navItems = [
  { label: "Projects", href: "/", sub: "Selected work" },
  { label: "Skills", href: "/skills", sub: "Skills snapshot" },
  { label: "Experience", href: "/experience", sub: "Experience timeline" },
  { label: "About", href: "/about", sub: "About me" },
];

const projects = [
  { name: "Mini SIEM", tag: "Security · Full stack", tint: "crimson", image: "/images/mini-siem.svg", description: "A multi-tenant security event dashboard: a Go and MongoDB API with JWT auth, team invitations and password reset by email, and a Vue 3 + TypeScript interface for browsing events, alerts, and watched IP addresses.", summary: "SOC-style event and alert monitoring, end to end.", link: "https://github.com/fleetway-arch/mini-SIEM", highlights: ["Isolated each company's data and tested tenant isolation in the API", "Built auth flows with JWT, invitations, and password reset over SMTP", "Shipped a hardened Docker production stack behind nginx with HTTPS"] },
  { name: "Groupie Tracker", tag: "Go · APIs", tint: "crimson", image: "/images/groupie_image.jpeg", description: "A concert discovery app that explores artist and location data with filtering, structured responses, and a clean information layout.", summary: "Searchable music data and a polished information view.", link: "https://github.com/fleetway-arch/groupie-tracker", highlights: ["Structured API data into a browsable experience", "Kept the layout readable while exposing useful filtering context", "Balanced technical depth with a clean visual presentation"] },
  { name: "Net Cat", tag: "Go · Networking", tint: "teal", image: "/images/net_cat.jpeg", description: "A concurrent chat tool built in Go with live messaging, multiple client handling, and a focus on reliable networking behavior.", summary: "Real-time communication and multi-client coordination.", link: "https://github.com/fleetway-arch/net-cat", highlights: ["Handled concurrent clients without losing clarity in the code", "Focused on predictable socket behavior and message flow", "Kept the interface minimal so the networking behavior stayed central"] },
  { name: "YuGidle", tag: "Game · UI", tint: "violet", image: "/images/yugidle.jpeg", description: "A playful word game inspired by Wordle, built around Yu-Gi-Oh! cards with fast feedback and a game loop that keeps the experience moving.", summary: "Interactive gameplay with responsive state changes.", link: "https://github.com/IronBeagle404/yugidle", highlights: ["Built a game loop with fast feedback and clear state changes", "Kept the interaction playful without making the logic fragile", "Used a clean data flow for card-driven gameplay decisions"] },
  { name: "Portfolio Refresh", tag: "Design · Layout", tint: "moss", image: "/images/ascii-art.jpeg", description: "The site redesign you are viewing now: a Vue portfolio with a clearer hierarchy, usable navigation, and responsive content sections.", summary: "Cleaner structure, better spacing, and stronger flow.", highlights: ["Migrated the portfolio from static HTML to reusable Vue components", "Made the portfolio useful on both desktop and mobile", "Kept shared navigation and visual patterns consistent across pages"] },
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
const skillTints = { "Technical skill": "teal", "Professional skill": "violet", Challenge: "crimson", Training: "crimson" };
const experiences = [
  ["2026", "Portfolio redesign and refinement", "Current portfolio", "Reworked the site structure, clarified navigation, and tightened the visual system so the portfolio feels like a real product instead of a rough draft.", ["HTML", "CSS", "Vue", "UI design"]],
  ["September 2025 – now", "Animation with children", "Ongoing role", "Leading creative activities and educational animation programs for children, fostering engagement, learning, and personal growth through structured and interactive experiences.", ["Leadership", "Communication", "Creative planning", "Child development"]],
  ["August 2025", "Animation with children", "Mairie of Sotteville", "Delivered organized animation programs for children at the local municipal office, creating engaging activities that encourage participation, learning, and community connection.", ["Program coordination", "Activity design", "Community engagement", "Adaptability"]],
  ["February 2025", "BAFA certification", "Professional qualification", "Earned BAFA certification (Brevet d'Aptitude aux Fonctions d'Animateur) with specialization in working with people with disabilities and special care needs, enabling inclusive and adaptive program delivery.", ["Special care support", "Inclusive design", "Accessibility", "Adaptability"]],
];
const facts = ["I start with structure, then refine visuals once the flow is clear.", "I prefer readable code and interfaces that stay simple under pressure.", "I enjoy improving existing work instead of only building from scratch.", "I like working on projects that combine backend logic with clean presentation."];
const terminalCommands = [
  "portfolio.shell // initializing visual systems",
  "scan projects --status=featured ........ done",
  "hydrate routes / /skills /experience /about",
  "compile interface --target=responsive ...... done",
  "check accessibility --contrast=AA .......... pass",
  "load assets --cache=warm ................... ready",
  "observe interaction --mode=quiet ........... active",
];

const path = ref(normalizePath(window.location.pathname));
const selected = ref(projects[0]);
const terminalLine = ref(0);
const page = computed(() => path.value === "/skills" || path.value === "/experience" || path.value === "/about" ? path.value : "/");
const hero = computed(() => ({
  "/": { eyebrow: "Backend-focused developer", boot: ["ANGELIQUE.SYS // portfolio unit initializing", "go runtime ............. done", "loading projects [5] ... done", "rendering interface .... done"], title: "Practical web builds with clear structure and strong delivery.", text: "This portfolio highlights projects, skills, and experience in a format that is easy to scan, responsive on mobile, and ready for real use.", stats: [["5", "featured projects"], ["Go", "backend foundation"], ["SQL", "data modeling and APIs"], ["UI", "responsive front ends"]] },
  "/skills": { eyebrow: "Skills snapshot", boot: ["ANGELIQUE.SYS // skills.index", "mounting toolchain ..... done"], title: "Balanced across backend systems, product thinking, and delivery.", text: "The focus is on the skills that show up in real projects: readable code, data handling, responsive UI, and dependable collaboration.", stats: [["Go", "primary language"], ["SQL", "data design"], ["UI", "responsive layouts"]] },
  "/experience": { eyebrow: "Experience timeline", boot: ["ANGELIQUE.SYS // timeline.log", "reading milestones ..... done"], title: "A path built around projects, iteration, and stronger delivery.", text: "This timeline keeps the story honest and useful: what has been built, what was learned, and how the portfolio has improved over time.", stats: [["Projects", "hands-on work"], ["Learning", "continuous growth"], ["Teams", "clear collaboration"]] },
  "/about": { eyebrow: "About me", boot: ["ANGELIQUE.SYS // operator profile", "BAFA cert: special care  verified"], title: "Focused on building software that is practical, readable, and reliable.", text: "I like shipping projects that solve a clear problem and stay easy to maintain after the first launch.", stats: [["Clear", "structure first"], ["Practical", "real project focus"], ["Usable", "mobile-friendly delivery"]] },
}[page.value]));

function normalizePath(value) { return value.replace(/\/$/, "") || "/"; }
function navigate(event) {
  const link = event.target.closest("a");
  if (!link || link.origin !== window.location.origin || !link.getAttribute("href")?.startsWith("/") || link.target) return;
  event.preventDefault();
  window.history.pushState({}, "", link.getAttribute("href"));
  path.value = normalizePath(window.location.pathname);
  window.scrollTo(0, 0);
}
function handlePopState() { path.value = normalizePath(window.location.pathname); }
let terminalTimer;
onMounted(() => {
  document.addEventListener("click", navigate);
  window.addEventListener("popstate", handlePopState);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    terminalTimer = window.setInterval(() => {
      terminalLine.value = (terminalLine.value + 1) % terminalCommands.length;
    }, 3200);
  }
});
onUnmounted(() => {
  document.removeEventListener("click", navigate);
  window.removeEventListener("popstate", handlePopState);
  if (terminalTimer) window.clearInterval(terminalTimer);
});
</script>

<template>
  <div class="page-bg" aria-hidden="true"></div>
  <aside class="ambient-terminal" aria-hidden="true">
    <div class="ambient-terminal-header"><span>SYS//FEED</span><span>LIVE</span></div>
    <div class="ambient-terminal-rule"></div>
    <div class="ambient-terminal-lines">
      <p v-for="(command, index) in terminalCommands" :key="command" :class="{ 'is-current': index === terminalLine }">
        <span class="ambient-terminal-prompt">&gt;</span>{{ command }}
      </p>
    </div>
    <div class="ambient-terminal-caret">&gt;_</div>
  </aside>
  <header class="site-header">
    <div class="site-brand">
      <a href="/" class="site-title"><span class="site-title-first">Angelique</span> Oluwabusayomi</a>
      <span class="site-kicker">Portfolio</span><span class="site-version" aria-hidden="true">v.2026</span>
    </div>
    <nav class="site-nav" aria-label="Primary navigation">
      <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-link" :aria-current="page === item.href ? 'page' : undefined"><span class="nav-label">{{ item.label }}</span><span class="nav-sub" aria-hidden="true">{{ item.sub }}</span></a>
    </nav>
  </header>
  <main class="page-shell" :key="page">
    <section class="hero">
      <div class="hero-copy"><p class="slash-bar hero-bar"><span class="slash-bar-body">{{ hero.eyebrow }}</span></p><h1>{{ hero.title }}</h1><p class="hero-text">{{ hero.text }}</p>
        <div v-if="page === '/'" class="hero-actions"><a href="#projects" class="button button-primary">Browse projects</a><a href="/skills" class="button button-secondary">View skills</a></div>
      </div>
      <div class="terminal"><div class="terminal-boot" aria-hidden="true"><p v-for="line in hero.boot" :key="line">{{ line }}</p></div><ul class="terminal-stats"><li v-for="stat in hero.stats" :key="stat[1]" class="terminal-row"><span class="terminal-value">{{ stat[0] }}</span><span class="terminal-label">{{ stat[1] }}</span></li></ul><p class="terminal-caret" aria-hidden="true">&gt;</p></div>
    </section>

    <section v-if="page === '/'" class="content-section" id="projects">
      <div class="section-heading"><p class="eyebrow">Selected work</p><h2>Projects that show both technical depth and usability.</h2><p>Select a card to update the project detail panel. The first project is selected by default, so the page feels useful immediately.</p></div>
      <div class="project-layout"><div class="project-grid" aria-label="Project list"><button v-for="project in projects" :key="project.name" type="button" class="project-card notched" :class="{ 'is-active': selected.name === project.name }" :data-tint="project.tint" :aria-pressed="selected.name === project.name" @click="selected = project"><img class="project-image" :src="project.image" :alt="`${project.name} project preview`" width="736" height="460" loading="lazy" decoding="async"><div class="project-card-body"><span class="project-tag">{{ project.tag }}</span><h3>{{ project.name }}</h3><p>{{ project.summary }}</p></div></button></div>
        <aside class="project-details" :data-tint="selected.tint" translate="yes"><p class="eyebrow">Project spotlight</p><h2>{{ selected.name }}</h2><p class="detail-description">{{ selected.description }}</p><div class="detail-difficulties"><strong>What this project highlights</strong><ul><li v-for="highlight in selected.highlights" :key="highlight">{{ highlight }}</li></ul></div><div class="detail-actions"><a v-if="selected.link" :href="selected.link" class="button button-primary" target="_blank" rel="noreferrer">View project</a><a href="/skills" class="button button-secondary">See skills</a></div></aside>
      </div>
    </section>

    <section v-else-if="page === '/skills'" class="content-section"><div class="section-heading"><p class="eyebrow">Core strengths</p><h2>Skills, challenges, and experiences in one place.</h2><p>Each card shows something I can do, have practiced, or have taken part in.</p></div><div class="skills-grid"><article v-for="card in skillCards" :key="card[2]" class="skill-card notched" :class="{ 'skill-card-featured': card[5] }" :data-tint="skillTints[card[1]]"><div class="skill-card-heading"><span class="skill-icon" aria-hidden="true">{{ card[0] }}</span><div><span class="skill-card-type">{{ card[1] }}</span><h3>{{ card[2] }}</h3><p>{{ card[3] }}</p></div></div><ul class="skill-list"><li v-for="tag in card[4]" :key="tag">{{ tag }}</li></ul></article></div><div class="summary-box"><p>I build with a backend-first mindset, but I care just as much about making the result easy to understand, easy to use, and easy to maintain.</p></div></section>

    <section v-else-if="page === '/experience'" class="content-section"><div class="section-heading"><p class="eyebrow">Milestones</p><h2>Work that shows momentum, not just a list of dates.</h2><p>Each entry describes a phase of growth that shaped the portfolio and the way projects are built today.</p></div><div class="timeline"><article v-for="experience in experiences" :key="experience[0] + experience[1]" class="experience-item"><div class="experience-content"><div class="experience-period">{{ experience[0] }}</div><div class="experience-title">{{ experience[1] }}</div><div class="experience-company">{{ experience[2] }}</div><div class="experience-description">{{ experience[3] }}</div><div class="experience-skills"><span v-for="tag in experience[4]" :key="tag" class="skill-tag">{{ tag }}</span></div></div></article></div><div class="summary-box"><p>The thread through every stage is the same: build something useful, make it easier to understand, and leave the next person with a cleaner starting point.</p></div></section>

    <template v-else>
      <section class="content-section about-stack"><div class="about-grid"><section class="about-card notched"><p class="eyebrow">Who I am</p><h2>Builder first, optimist second, and usually the person cleaning up the details.</h2><p>My best work comes from taking an idea, breaking it into small pieces, and making sure each piece is understandable before it is styled or shipped.</p><p>I care about backend structure, data handling, and the front-end experience that makes a project feel finished instead of just functional.</p></section><section class="about-card about-card-accent notched" data-tint="violet"><p class="eyebrow">What I value</p><ul class="value-list"><li><strong>Clarity:</strong> code and layouts should make sense fast.</li><li><strong>Reliability:</strong> a feature should keep working after handoff.</li><li><strong>Consistency:</strong> details matter across pages and devices.</li><li><strong>Growth:</strong> every project should sharpen the next one.</li></ul></section></div><section class="about-card notched" data-tint="teal"><p class="eyebrow">How I work</p><div class="facts-list"><div v-for="(fact, index) in facts" :key="fact" class="fact-item"><span class="fact-number">0{{ index + 1 }}</span><p>{{ fact }}</p></div></div></section><section class="about-cta"><h2>Next steps</h2><p>If you want the full picture, the projects, skills, and experience pages work together as one portfolio instead of disconnected pieces.</p><div class="cta-buttons"><a href="/" class="button button-accent">Browse projects</a><a href="/experience" class="button button-secondary">See experience</a></div></section></section>
      <section class="content-section contact-section"><article class="contact-photo-card notched"><img src="/images/Image_me.jpg" alt="Photo of Angelique Oluwabusayomi" class="contact-photo" width="1200" height="1800" loading="lazy" decoding="async"></article><article class="contact-info-card"><p class="eyebrow">Contact</p><h2>My information</h2><ul class="contact-info-list"><li><span class="contact-label">Full name</span><span>Angelique Oluwabusayomi</span></li><li><span class="contact-label">Email</span><a href="mailto:bozebuzze@gmail.com">bozebuzze@gmail.com</a></li><li><span class="contact-label">Phone</span><a href="tel:+33766102666">0766102666</a></li><li><span class="contact-label">Location</span><span>France, 76520, Franqueville-Saint-Pierre</span></li><li><span class="contact-label">LinkedIn / GitHub</span><a href="https://www.linkedin.com/in/oluwabusayomi-angelique-0a8916334" target="_blank" rel="noreferrer">www.linkedin.com/in/oluwabusayomi-angelique-0a8916334</a><a href="https://github.com/fleetway-arch" target="_blank" rel="noreferrer">github.com/fleetway-arch</a></li></ul></article></section>
    </template>
  </main>
</template>
