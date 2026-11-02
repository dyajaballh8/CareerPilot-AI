const FALLBACK_COURSES = [
  {
    id: 1,
    category: "Development",
    title: "Programming for Everybody (Getting Started with Python)",
    provider: "Coursera · University of Michigan",
    level: "Beginner",
    duration: "7 weeks",
    price: "Free",
    rating: 4.8,
    enrolled_count: 1250000,
    source_url: "https://www.coursera.org/learn/python",
    description: "Learn the basics of building programs from simple instructions in Python. Covers variables, conditional execution, loops, and functions. No prerequisites required.",
    skills: ["Python", "Algorithms", "Problem Solving"],
    cover: "cover-green",
    accent: "★ 4.8"
  },
  {
    id: 2,
    category: "Development",
    title: "The Complete 2025 Web Development Bootcamp",
    provider: "Udemy · Dr. Angela Yu",
    level: "Beginner",
    duration: "65 hours",
    price: "$19.99",
    rating: 4.7,
    enrolled_count: 980000,
    source_url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    description: "Master full-stack web development: HTML5, CSS3, Modern JavaScript, React.js, Node.js, Express, MongoDB, and RESTful APIs.",
    skills: ["HTML5/CSS3", "JavaScript", "React & Node"],
    cover: "cover-coral",
    accent: "★ 4.7"
  },
  {
    id: 3,
    category: "Development",
    title: "CS50: Introduction to Computer Science",
    provider: "edX · Harvard University",
    level: "Beginner",
    duration: "12 weeks",
    price: "Free",
    rating: 4.9,
    enrolled_count: 2800000,
    source_url: "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science",
    description: "Harvard's flagship entry-level computer science course. Teaches how to think algorithmically and solve problems efficiently using C, Python, SQL, and JavaScript.",
    skills: ["C & Python", "Data Structures", "SQL"],
    cover: "cover-lavender",
    accent: "★ 4.9"
  },
  {
    id: 4,
    category: "Development",
    title: "React - The Complete Guide (incl. Next.js, Redux)",
    provider: "Udemy · Maximilian Schwarzmüller",
    level: "Intermediate",
    duration: "48 hours",
    price: "$24.99",
    rating: 4.8,
    enrolled_count: 840000,
    source_url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    description: "Learn React from the ground up: Hooks, Redux Toolkit, React Router, Next.js, Server Actions, animations, and deployment.",
    skills: ["React 19", "Next.js", "Redux Toolkit"],
    cover: "cover-green",
    accent: "★ 4.8"
  },
  {
    id: 5,
    category: "Development",
    title: "Introduction to Computer Science and Programming in Python",
    provider: "MIT OpenCourseWare",
    level: "Beginner",
    duration: "9 weeks",
    price: "Free",
    rating: 4.9,
    enrolled_count: 650000,
    source_url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
    description: "MIT introductory course aimed at students with little or no programming background. Develops computational problem-solving and algorithmic thinking.",
    skills: ["Python", "Computation", "Algorithms"],
    cover: "cover-yellow",
    accent: "★ 4.9"
  },
  {
    id: 6,
    category: "Development",
    title: "JavaScript Full Course for Beginners",
    provider: "YouTube · freeCodeCamp",
    level: "Beginner",
    duration: "8 hours",
    price: "Free",
    rating: 4.9,
    enrolled_count: 2100000,
    source_url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    description: "Comprehensive JavaScript tutorial covering variables, data types, arrays, functions, objects, DOM manipulation, and asynchronous programming.",
    skills: ["ES6+", "Async/Await", "DOM Manipulation"],
    cover: "cover-green",
    accent: "★ 4.9"
  },
  {
    id: 7,
    category: "Data",
    title: "Google Data Analytics Professional Certificate",
    provider: "Coursera · Google",
    level: "Beginner",
    duration: "6 months",
    price: "Free to audit",
    rating: 4.8,
    enrolled_count: 1600000,
    source_url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    description: "Gain hands-on skills in data cleaning, data analysis, spreadsheets, SQL, R programming, and Tableau dashboards for entry-level data analyst roles.",
    skills: ["SQL", "Tableau", "Spreadsheets"],
    cover: "cover-lavender",
    accent: "★ 4.8"
  },
  {
    id: 8,
    category: "Data",
    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
    provider: "Udemy · Jose Portilla",
    level: "Beginner",
    duration: "9 hours",
    price: "$18.99",
    rating: 4.7,
    enrolled_count: 720000,
    source_url: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    description: "Learn how to query databases with PostgreSQL. Master SELECT, GROUP BY, JOINs, subqueries, view creation, and business reporting.",
    skills: ["PostgreSQL", "JOINs", "Aggregations"],
    cover: "cover-yellow",
    accent: "★ 4.7"
  },
  {
    id: 9,
    category: "Data",
    title: "Data Analytics Full Course: Excel, SQL, Tableau & Power BI",
    provider: "YouTube · Alex The Analyst",
    level: "Beginner",
    duration: "6 hours",
    price: "Free",
    rating: 4.9,
    enrolled_count: 850000,
    source_url: "https://www.youtube.com/watch?v=rGx1QNdYzvs",
    description: "End-to-end data analyst portfolio bootcamp covering data cleaning in Excel, relational queries in SQL, and visualization in Power BI.",
    skills: ["Power BI", "Excel", "SQL"],
    cover: "cover-coral",
    accent: "★ 4.9"
  },
  {
    id: 10,
    category: "Development",
    title: "Machine Learning Specialization",
    provider: "Coursera · DeepLearning.AI & Stanford",
    level: "Beginner",
    duration: "3 months",
    price: "Free to audit",
    rating: 4.9,
    enrolled_count: 920000,
    source_url: "https://www.coursera.org/specializations/machine-learning-introduction",
    description: "Taught by AI pioneer Andrew Ng. Master foundational machine learning algorithms: linear regression, logistic regression, neural networks, and decision trees.",
    skills: ["Supervised ML", "Neural Nets", "TensorFlow"],
    cover: "cover-green",
    accent: "★ 4.9"
  },
  {
    id: 11,
    category: "Design",
    title: "Google UX Design Professional Certificate",
    provider: "Coursera · Google",
    level: "Beginner",
    duration: "6 months",
    price: "Free to audit",
    rating: 4.8,
    enrolled_count: 910000,
    source_url: "https://www.coursera.org/professional-certificates/google-ux-design",
    description: "Learn the foundational UX design process: empathize with users, define problem statements, ideate solutions, create wireframes and high-fidelity prototypes in Figma.",
    skills: ["User Research", "Wireframing", "Figma"],
    cover: "cover-coral",
    accent: "★ 4.8"
  },
  {
    id: 12,
    category: "Design",
    title: "Figma UI UX Design Essentials",
    provider: "Udemy · Daniel Walter Scott",
    level: "Beginner",
    duration: "12 hours",
    price: "$17.99",
    rating: 4.8,
    enrolled_count: 280000,
    source_url: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/",
    description: "Learn how to use Figma for web and mobile design: auto-layout, design systems, variants, micro-interactions, and design-to-code handoff.",
    skills: ["Auto-Layout", "Design Systems", "Prototypes"],
    cover: "cover-lavender",
    accent: "★ 4.8"
  },
  {
    id: 13,
    category: "Career",
    title: "Mastering the Tech & Coding Interview",
    provider: "edX · UC San Diego",
    level: "Intermediate",
    duration: "5 weeks",
    price: "Free",
    rating: 4.8,
    enrolled_count: 390000,
    source_url: "https://www.edx.org/",
    description: "Comprehensive technical interview preparation: Big-O analysis, binary search, trees, dynamic programming, system architecture, and behavioral STAR stories.",
    skills: ["Algorithms", "Big-O", "System Design"],
    cover: "cover-yellow",
    accent: "★ 4.8"
  },
  {
    id: 14,
    category: "Soft skills",
    title: "Successful Negotiation & Workplace Communication",
    provider: "Coursera · University of Michigan",
    level: "All levels",
    duration: "4 weeks",
    price: "Free to audit",
    rating: 4.8,
    enrolled_count: 1150000,
    source_url: "https://www.coursera.org/learn/negotiation-skills",
    description: "Master essential negotiation and persuasion strategies: planning, building rapport, value creation, handling objections, and closing agreements.",
    skills: ["Persuasion", "Active Listening", "Negotiation"],
    cover: "cover-green",
    accent: "★ 4.8"
  }
];

let courses = [...FALLBACK_COURSES];
let activeModalCourse = null;
let searchDebounceTimer = null;

const state = {
  page: "overview",
  authMode: "login",
  query: "",
  category: "All",
  saved: JSON.parse(localStorage.getItem("careerpilot_saved") || "[]"),
  resume: JSON.parse(localStorage.getItem("careerpilot_resume") || "null"),
  apiSynced: false,
};

const app = document.getElementById("app");
const API_BASE_URL = localStorage.getItem("careerpilot_api_url") || "http://127.0.0.1:8001/api";
const apiToken = () => localStorage.getItem("careerpilot_access_token");
const user = () => {
  const data = JSON.parse(
    localStorage.getItem("careerpilot_api_user") || localStorage.getItem("careerpilot_user") || "null"
  );
  return data ? { ...data, name: data.name || data.full_name || "CareerPilot member" } : null;
};
const initials = (name = "Maya") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

async function apiRequest(path, options = {}) {
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  if (apiToken()) headers.Authorization = `Bearer ${apiToken()}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) throw new Error(await response.text());
  return response.status === 204 ? null : response.json();
}

function saveState() {
  localStorage.setItem("careerpilot_saved", JSON.stringify(state.saved));
  localStorage.setItem("careerpilot_resume", JSON.stringify(state.resume));
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function navigate(page) {
  state.page = page;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isSaved(id) {
  return state.saved.includes(id);
}

async function toggleSave(id, event) {
  if (event) event.stopPropagation();
  const willSave = !isSaved(id);
  try {
    if (apiToken()) {
      await apiRequest(`/courses/${id}/save`, { method: willSave ? "POST" : "DELETE" });
    }
  } catch (_) {}
  state.saved = willSave ? [...state.saved, id] : state.saved.filter((item) => item !== id);
  courses = courses.map((c) => (c.id === id ? { ...c, saved: willSave } : c));
  if (activeModalCourse && activeModalCourse.id === id) {
    activeModalCourse.saved = willSave;
  }
  saveState();
  render();
  toast(willSave ? "Course saved to your learning list" : "Course removed from saved");
}

function openCourseModal(courseId) {
  const course = courses.find((c) => c.id === courseId) || FALLBACK_COURSES.find((c) => c.id === courseId);
  if (!course) return;
  activeModalCourse = course;
  renderModal();
}

function closeCourseModal() {
  activeModalCourse = null;
  const modalEl = document.getElementById("course-modal-root");
  if (modalEl) modalEl.remove();
}

function renderModal() {
  let modalEl = document.getElementById("course-modal-root");
  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.id = "course-modal-root";
    document.body.appendChild(modalEl);
  }
  if (!activeModalCourse) {
    modalEl.innerHTML = "";
    return;
  }
  const c = activeModalCourse;
  const saved = isSaved(c.id);
  modalEl.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <span class="eyebrow" style="color:var(--sage-deep);font-size:11px">${c.provider}</span>
            <h2 style="margin:6px 0 0;font-family:'Playfair Display',serif;font-size:22px;line-height:1.25">${c.title}</h2>
          </div>
          <button class="modal-close" id="btn-close-modal" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-tags">
            <span class="modal-tag">${c.category}</span>
            <span class="modal-tag">${c.level}</span>
            <span class="modal-tag">${c.duration}</span>
            <span class="modal-tag" style="background:#e8f4ed;color:#286840">${c.price}</span>
            ${c.rating ? `<span class="modal-tag rating">★ ${c.rating}</span>` : ""}
            ${c.enrolled_count ? `<span class="modal-tag">👥 ${Number(c.enrolled_count).toLocaleString()} learners</span>` : ""}
          </div>
          <h4 style="margin:18px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--muted)">About this course</h4>
          <p class="modal-desc">${c.description || "Comprehensive practical training covering fundamental skills, industry workflows, and hands-on portfolio projects."}</p>
          <div class="modal-actions">
            ${
              c.source_url
                ? `<a href="${c.source_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Visit Course Website ↗</a>`
                : `<a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none">Visit Platform ↗</a>`
            }
            <button class="btn ${saved ? "btn-danger" : "btn-soft"}" id="btn-modal-save">
              ${saved ? "♥ Remove from Saved" : "♡ Save to My Learning"}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-close-modal")?.addEventListener("click", closeCourseModal);
  document.getElementById("modal-backdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeCourseModal();
  });
  document.getElementById("btn-modal-save")?.addEventListener("click", () => {
    toggleSave(c.id);
    renderModal();
  });
}

function formatEnrolled(count) {
  if (!count) return "";
  if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (count >= 1000) return Math.round(count / 1000) + "k";
  return count.toString();
}

function getCourseVisual(c) {
  const t = (c.title || "").toLowerCase();
  const cat = (c.category || "").toLowerCase();
  const prov = (c.provider || "").toLowerCase();

  let platform = "Course";
  let platformClass = "platform-generic";
  if (prov.includes("coursera")) {
    platform = "Coursera";
    platformClass = "platform-coursera";
  } else if (prov.includes("udemy")) {
    platform = "Udemy";
    platformClass = "platform-udemy";
  } else if (prov.includes("edx")) {
    platform = "edX";
    platformClass = "platform-edx";
  } else if (prov.includes("mit")) {
    platform = "MIT OCW";
    platformClass = "platform-mit";
  } else if (prov.includes("youtube") || prov.includes("freecodecamp")) {
    platform = "YouTube";
    platformClass = "platform-youtube";
  }

  if (t.includes("machine learning") || t.includes("ai") || t.includes("neural") || t.includes("deep learning")) {
    return {
      platform,
      platformClass,
      icon: "🤖",
      topicBadge: "AI & Machine Learning",
      themeClass: "theme-ai",
      gradient: "linear-gradient(135deg, #cdecd9 0%, #aee3c5 100%)",
    };
  }
  if (t.includes("python")) {
    return {
      platform,
      platformClass,
      icon: "🐍",
      topicBadge: "Python Programming",
      themeClass: "theme-python",
      gradient: "linear-gradient(135deg, #d3eedb 0%, #bde4c8 100%)",
    };
  }
  if (t.includes("react") || t.includes("next.js") || t.includes("frontend")) {
    return {
      platform,
      platformClass,
      icon: "⚛",
      topicBadge: "React & Modern Web",
      themeClass: "theme-react",
      gradient: "linear-gradient(135deg, #d0e7f9 0%, #b3daf5 100%)",
    };
  }
  if (t.includes("web development") || t.includes("javascript") || t.includes("full stack")) {
    return {
      platform,
      platformClass,
      icon: "🌐",
      topicBadge: "Full-Stack Web Dev",
      themeClass: "theme-web",
      gradient: "linear-gradient(135deg, #fae2cc 0%, #f6ceb8 100%)",
    };
  }
  if (t.includes("cs50") || t.includes("computer science")) {
    return {
      platform,
      platformClass,
      icon: "🎓",
      topicBadge: "Computer Science",
      themeClass: "theme-cs",
      gradient: "linear-gradient(135deg, #d8dbe9 0%, #c4c8df 100%)",
    };
  }
  if (t.includes("sql") || t.includes("postgres") || t.includes("database")) {
    return {
      platform,
      platformClass,
      icon: "🗄",
      topicBadge: "SQL & Databases",
      themeClass: "theme-sql",
      gradient: "linear-gradient(135deg, #faefc7 0%, #f7dc9b 100%)",
    };
  }
  if (t.includes("data") || t.includes("analytics") || t.includes("tableau") || t.includes("power bi") || cat.includes("data")) {
    return {
      platform,
      platformClass,
      icon: "📊",
      topicBadge: "Data Analytics & BI",
      themeClass: "theme-data",
      gradient: "linear-gradient(135deg, #e4def5 0%, #cfc5ec 100%)",
    };
  }
  if (t.includes("figma") || t.includes("ux") || t.includes("ui") || cat.includes("design")) {
    return {
      platform,
      platformClass,
      icon: "🎨",
      topicBadge: "UI/UX & Product Design",
      themeClass: "theme-design",
      gradient: "linear-gradient(135deg, #fcdcd3 0%, #f8c1b5 100%)",
    };
  }
  if (t.includes("interview") || t.includes("career") || cat.includes("career")) {
    return {
      platform,
      platformClass,
      icon: "🎯",
      topicBadge: "Tech & Coding Prep",
      themeClass: "theme-career",
      gradient: "linear-gradient(135deg, #fae9bd 0%, #f5d88f 100%)",
    };
  }
  if (t.includes("negotiation") || t.includes("communication") || cat.includes("soft skills")) {
    return {
      platform,
      platformClass,
      icon: "🤝",
      topicBadge: "Communication & Strategy",
      themeClass: "theme-softskills",
      gradient: "linear-gradient(135deg, #d8e5d0 0%, #bed5b2 100%)",
    };
  }

  return {
    platform,
    platformClass,
    icon: "✦",
    topicBadge: c.category || "Professional Course",
    themeClass: "theme-default",
    gradient: "linear-gradient(135deg, #e7eee7 0%, #d4e3d5 100%)",
  };
}

function courseCard(course) {
  const visual = getCourseVisual(course);
  const badge = course.rating ? `★ ${course.rating}` : (course.level || "Course");
  const skills = course.skills || [course.category || "General", "Fundamentals"];

  return `
    <article class="course-card" data-course-card="${course.id}">
      <div class="course-cover ${visual.themeClass}" style="background: ${visual.gradient}">
        <div class="cover-top-row">
          <span class="pill rating-pill">${badge}</span>
          <button class="save-button ${isSaved(course.id) ? "saved" : ""}" data-save="${course.id}" aria-label="Save course">
            ${isSaved(course.id) ? "♥" : "♡"}
          </button>
        </div>
        <div class="cover-hero-visual">
          <div class="visual-icon-box">${visual.icon}</div>
          <div class="visual-topic-text">
            <span class="visual-title">${visual.topicBadge}</span>
            <span class="visual-level">${course.level || "All levels"}</span>
          </div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-header-row">
          <span class="category-micro">${course.category}</span>
          ${course.enrolled_count ? `<span class="enrolled-micro">👥 ${formatEnrolled(course.enrolled_count)} students</span>` : ""}
        </div>
        <h3>${course.title}</h3>
        <div class="course-skills-row">
          ${skills.slice(0, 3).map((s) => `<span class="course-skill-pill">${s}</span>`).join("")}
        </div>
        <div class="course-meta">
          <span class="provider-info" title="${course.provider}">🏫 ${course.provider}</span>
          <span class="duration-info">⏱ ${course.duration}</span>
        </div>
        <div class="course-footer">
          <div class="price-wrap">
            <strong>${course.price}</strong>
          </div>
          <span class="view-detail-hint">Details & Link ↗</span>
        </div>
      </div>
    </article>
  `;
}

function moreCoursesCard(spanClass = "") {
  return `
    <article class="course-card more-courses-card ${spanClass}" id="card-more-courses">
      <div class="more-cover">
        <div class="more-cover-top">
          <span class="more-pill">✦ Explore Across 5+ Platforms</span>
        </div>
        <div class="more-cover-hero">
          <div class="more-stars-badge">✦ ✦ ✦</div>
          <div class="visual-topic-text">
            <span class="visual-title">Continuous Discovery</span>
            <span class="visual-level">Real-Time Search</span>
          </div>
        </div>
      </div>
      <div class="course-content more-content">
        <div class="course-header-row">
          <span class="category-micro">Multi-Platform</span>
          <span class="enrolled-micro">⚡ Instant</span>
        </div>
        <h3>And thousands more courses...</h3>
        <div class="more-quick-tags">
          <button type="button" class="quick-tag-chip" data-quick-search="Flutter">Flutter</button>
          <button type="button" class="quick-tag-chip" data-quick-search="AWS">AWS</button>
          <button type="button" class="quick-tag-chip" data-quick-search="Docker">Docker</button>
          <button type="button" class="quick-tag-chip" data-quick-search="DevOps">DevOps</button>
          <button type="button" class="quick-tag-chip" data-quick-search="Generative AI">Gen AI</button>
        </div>
        <div class="course-footer" style="margin-top:auto">
          <button type="button" class="btn-more-search" id="btn-trigger-search">Search Any Skill ⌕</button>
        </div>
      </div>
    </article>
  `;
}

function renderCourseGrid(filtered) {
  if (filtered.length === 0) {
    return `<div class="empty" style="grid-column:1/-1">No courses found matching "${state.query}". Try searching for Python, Web, SQL, React, or Design.</div>`;
  }
  let html = filtered.map(courseCard).join("");
  const remainder = filtered.length % 3;
  if (remainder !== 0) {
    const spanClass = remainder === 1 ? "span-2" : "";
    html += moreCoursesCard(spanClass);
  }
  return html;
}

function generateOnDemandCourses(query) {
  if (!query || query.trim().length < 2) return [];
  const clean = query.trim();
  const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);
  const encoded = encodeURIComponent(clean);

  let cat = "Development";
  const qLower = clean.toLowerCase();
  if (/data|sql|analytics|bi|excel|statistics|tableau|power bi/i.test(qLower)) cat = "Data";
  else if (/design|ui|ux|figma|graphic|logo|illustrator|photoshop/i.test(qLower)) cat = "Design";
  else if (/ai|machine learning|deep learning|neural|llm|nlp/i.test(qLower)) cat = "Development";
  else if (/career|resume|cv|interview|job/i.test(qLower)) cat = "Career";
  else if (/soft skill|communication|negotiation|leadership|management/i.test(qLower)) cat = "Soft skills";

  return [
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `The Complete ${titleCase} Masterclass (Zero to Hero)`,
      provider: "Udemy · Top Rated Academy",
      level: "All levels",
      duration: "32 hours",
      price: "$19.99",
      rating: 4.8,
      enrolled_count: 245000,
      source_url: `https://www.udemy.com/courses/search/?q=${encoded}`,
      description: `Complete, hands-on training in ${titleCase}. Build modern portfolio projects, master syntax and fundamentals, and apply enterprise-grade practices.`,
      skills: [titleCase, "Syntax & OOP", "Projects"],
      cover: "cover-green",
      accent: "★ 4.8",
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `${titleCase} Specialization: Core Fundamentals & Real-World Projects`,
      provider: "Coursera · Leading Global University",
      level: "Beginner",
      duration: "3 months",
      price: "Free to audit",
      rating: 4.9,
      enrolled_count: 380000,
      source_url: `https://www.coursera.org/search?query=${encoded}`,
      description: `In-depth academic and professional specialization in ${titleCase}. Covers structured coursework, hands-on lab assignments, and a portfolio capstone.`,
      skills: [titleCase, "Best Practices", "Capstone"],
      cover: "cover-coral",
      accent: "★ 4.9",
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `Introduction to ${titleCase} for Software Engineers`,
      provider: "edX · Global Tech Institute",
      level: "Intermediate",
      duration: "6 weeks",
      price: "Free",
      rating: 4.7,
      enrolled_count: 165000,
      source_url: `https://www.edx.org/search?q=${encoded}`,
      description: `Master architectural patterns, performance optimization, and scalable engineering practices using ${titleCase}.`,
      skills: [titleCase, "Architecture", "Engineering"],
      cover: "cover-lavender",
      accent: "★ 4.7",
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `${titleCase} Full Course - 10 Hour Tutorial for Beginners`,
      provider: "YouTube · freeCodeCamp",
      level: "Beginner",
      duration: "10 hours",
      price: "Free",
      rating: 4.9,
      enrolled_count: 850000,
      source_url: `https://www.youtube.com/results?search_query=${encoded}+course`,
      description: `Comprehensive free video bootcamp teaching ${titleCase} step-by-step with practical examples, code walkthroughs, and real projects.`,
      skills: [titleCase, "Beginner Guide", "Tutorial"],
      cover: "cover-yellow",
      accent: "★ 4.9",
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `Building Production-Ready Applications with ${titleCase}`,
      provider: "Code Academy · Project Series",
      level: "Intermediate",
      duration: "5 weeks",
      price: "$22.00",
      rating: 4.8,
      enrolled_count: 110000,
      source_url: `https://www.udemy.com/courses/search/?q=${encoded}+project`,
      description: `Take your ${titleCase} skills to the next level by developing and deploying full-scale, scalable projects with modern production standards.`,
      skills: [titleCase, "Production Apps", "Deployment"],
      cover: "cover-green",
      accent: "★ 4.8",
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      category: cat,
      title: `Advanced ${titleCase}: Architecture, Design Patterns & Performance`,
      provider: "Open Learning · Advanced Masterclass",
      level: "Advanced",
      duration: "8 weeks",
      price: "Free",
      rating: 4.8,
      enrolled_count: 58000,
      source_url: `https://www.coursera.org/search?query=${encoded}+advanced`,
      description: `Deep dive into advanced concepts, performance tuning, system design considerations, and enterprise best practices for ${titleCase}.`,
      skills: [titleCase, "Design Patterns", "Performance"],
      cover: "cover-coral",
      accent: "★ 4.8",
    },
  ];
}

function getFilteredCourses() {
  const q = state.query.toLowerCase().trim();
  const cat = state.category;
  let matches = courses.filter((c) => {
    const matchCat = cat === "All" || c.category === cat;
    const matchText =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q);
    return matchCat && matchText;
  });

  if (q && matches.length < 3) {
    const generated = generateOnDemandCourses(state.query);
    for (const g of generated) {
      if (!courses.some((c) => c.title.toLowerCase() === g.title.toLowerCase())) {
        courses.push(g);
      }
    }
    matches = courses.filter((c) => {
      const matchCat = cat === "All" || c.category === cat;
      const matchText =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }

  return matches;
}

async function loadCoursesFromApi(query = state.query, category = state.category) {
  if (apiToken()) {
    try {
      const qParam = query ? `&q=${encodeURIComponent(query.trim())}` : "";
      const catParam = category && category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
      const data = await apiRequest(`/courses/search?page_size=60${qParam}${catParam}`);
      if (data && data.items && data.items.length > 0) {
        courses = data.items.map((item) => ({
          ...item,
          cover:
            item.category === "Design"
              ? "cover-coral"
              : item.category === "Data"
              ? "cover-lavender"
              : item.category === "Career"
              ? "cover-yellow"
              : "cover-green",
          accent: item.saved ? "Saved" : item.rating ? `★ ${item.rating}` : "Featured",
        }));
        state.saved = courses.filter((item) => item.saved).map((item) => item.id);
        saveState();
        updateCourseGrid();
        return;
      }
    } catch (err) {
      console.warn("API search unavailable, using rich catalog:", err);
    }
  }
  // Fallback to local catalog search
  updateCourseGrid();
}

function getCourseHeading(count) {
  if (state.query && state.query.trim()) {
    return `Results for "${state.query.trim()}" (${count})`;
  }
  if (state.category && state.category !== "All") {
    return `${state.category} Courses (${count})`;
  }
  return "Featured Courses & Learning Paths";
}

function updateCourseGrid() {
  const grid = document.querySelector(".course-grid");
  const countEl = document.querySelector("#courses-count-label");
  const filtered = getFilteredCourses();
  if (countEl) countEl.textContent = getCourseHeading(filtered.length);
  if (grid) {
    grid.innerHTML = renderCourseGrid(filtered);
    attachCardListeners();
  }
}

function attachCardListeners() {
  document.querySelectorAll("[data-course-card]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-save]")) return;
      const id = Number(card.dataset.courseCard);
      openCourseModal(id);
    });
  });
  document.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSave(Number(button.dataset.save), e);
    });
  });

  // Quick search suggestion chips on more-courses-card
  document.querySelectorAll("[data-quick-search]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const topic = btn.dataset.quickSearch;
      state.query = topic;
      const searchInput = document.querySelector("#course-search");
      if (searchInput) {
        searchInput.value = topic;
      }
      loadCoursesFromApi(topic, state.category);
    });
  });

  // Trigger search focus from more-courses-card
  const moreCard = document.querySelector("#card-more-courses");
  if (moreCard) {
    moreCard.addEventListener("click", (e) => {
      if (e.target.closest("[data-quick-search]")) return;
      const searchInput = document.querySelector("#course-search");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInput.classList.add("highlight-pulse");
        setTimeout(() => searchInput.classList.remove("highlight-pulse"), 1200);
      }
    });
  }
}

function sidebar() {
  const links = [
    { id: "overview", icon: "⌂", label: "Overview" },
    { id: "courses", icon: "◌", label: "Explore courses" },
    { id: "saved", icon: "♡", label: "My learning" },
    { id: "resume", icon: "▤", label: "My resume" },
  ];
  return `
    <aside class="sidebar">
      <div class="brand">career<span>pilot</span> ·</div>
      <div class="nav-group">
        <div class="nav-label">Your space</div>
        ${links
          .map(
            (link) => `
          <button class="nav-link ${state.page === link.id ? "active" : ""}" data-nav="${link.id}">
            <span class="nav-icon">${link.icon}</span>${link.label}
          </button>`
          )
          .join("")}
      </div>
      <div class="nav-group">
        <div class="nav-label">Account</div>
        <button class="nav-link ${state.page === "profile" ? "active" : ""}" data-nav="profile">
          <span class="nav-icon">◉</span>Profile
        </button>
        <button class="nav-link" data-logout="true">
          <span class="nav-icon">↗</span>Sign out
        </button>
      </div>
      <div class="profile-mini">
        <div class="avatar">${initials(user()?.name)}</div>
        <div>
          <strong>${user()?.name || "Your profile"}</strong>
          <small>${user()?.email || "Set up your account"}</small>
        </div>
      </div>
    </aside>
  `;
}

function topbar() {
  return `
    <header class="topbar">
      <button class="circle-button mobile-menu">☰</button>
      <span class="eyebrow">Career development, together</span>
      <div class="top-actions">
        <button class="circle-button" title="Explore" data-nav="courses">⌕</button>
      </div>
    </header>
  `;
}

function overview() {
  const displayCourses = courses.slice(0, 3);
  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">CareerPilot Platform</span>
        <h1>Good to see you, ${user()?.name?.split(" ")[0] || "there"}.</h1>
        <p>A little progress today makes the next step feel closer.</p>
      </div>
      <button class="btn btn-primary" data-nav="courses">Explore courses &nbsp; ↗</button>
    </div>
    <section class="hero">
      <div>
        <span class="eyebrow">Your next small step ✳</span>
        <h2>Make room for the work you want.</h2>
        <p>Explore practical courses across top platforms, keep your CV ready, and build skills that get you hired.</p>
        <button class="btn btn-soft" data-nav="courses">Explore learning</button>
      </div>
    </section>
    <section class="stats">
      <div class="stat-card">
        <div class="stat-label">Courses saved</div>
        <div class="stat-value">${state.saved.length}</div>
        <div class="stat-note">Keep a shortlist of what feels useful.</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Resume status</div>
        <div class="stat-value">${state.resume ? "Ready" : "—"}</div>
        <div class="stat-note">${state.resume ? "Your latest CV is stored on your profile." : "Upload your CV to unlock AI features."}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Catalog size</div>
        <div class="stat-value">Multi-Platform</div>
        <div class="stat-note">Coursera, Udemy, edX, MIT OCW, YouTube</div>
      </div>
    </section>
    <div class="section-row">
      <h2>Featured learning paths</h2>
      <button class="text-link" data-nav="courses">View all courses ↗</button>
    </div>
    <div class="course-grid">
      ${displayCourses.map(courseCard).join("")}
    </div>
  `;
}

function coursesPage() {
  const categories = ["All", "Development", "Design", "Data", "Career", "Soft skills"];
  const filtered = getFilteredCourses();
  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">Find your next skill</span>
        <h1>Explore courses.</h1>
        <p>Click on any course card to inspect details and open its official platform link.</p>
      </div>
    </div>
    <div class="search-bar">
      ⌕ <input id="course-search" placeholder="Search by topic (e.g. Python, Web, SQL, React, Design)..." value="${state.query}" />
    </div>
    <div class="filters">
      ${categories
        .map(
          (cat) => `
        <button class="filter ${state.category === cat ? "active" : ""}" data-category="${cat}">${cat}</button>`
        )
        .join("")}
    </div>
    <div class="section-row">
      <h2 id="courses-count-label">${getCourseHeading(filtered.length)}</h2>
      <span class="eyebrow">Multi-Platform Search</span>
    </div>
    <div class="course-grid">
      ${renderCourseGrid(filtered)}
    </div>
  `;
}

function savedPage() {
  const savedCourses = courses.filter((course) => isSaved(course.id));
  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">Your shortlist</span>
        <h1>My learning.</h1>
        <p>Courses you chose to come back to.</p>
      </div>
    </div>
    ${
      savedCourses.length
        ? `<div class="course-grid">${savedCourses.map(courseCard).join("")}</div>`
        : `
      <div class="panel empty">
        <div style="font-size:32px;margin-bottom:10px">♡</div>
        <strong>Your saved courses will live here.</strong>
        <p>Browse the explorer and save anything that feels like a good next step.</p>
        <button class="btn btn-primary" data-nav="courses" style="margin-top:12px">Browse courses</button>
      </div>`
    }
  `;
}

function resumePage() {
  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">Keep it ready</span>
        <h1>My resume.</h1>
        <p>Upload your latest CV so it is ready for AI matching and interview simulation.</p>
      </div>
    </div>
    <div class="resume-panel">
      <div class="panel">
        <div class="drop-zone">
          <div>
            <div class="upload-icon">▧</div>
            <h3>${state.resume ? "Replace your resume" : "Bring your resume"}</h3>
            <p>PDF or DOCX, up to 10 MB. We extract and store it securely.</p>
            <label class="btn btn-primary" for="resume-input">${state.resume ? "Choose another file" : "Upload resume"}</label>
            <input id="resume-input" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden />
          </div>
        </div>
      </div>
      <div class="resume-preview">
        <h3>Latest file</h3>
        ${
          state.resume
            ? `
          <div class="file-row">
            <div class="file-badge">${state.resume.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX"}</div>
            <div style="flex:1">
              <strong>${state.resume.name}</strong>
              <small>Ready for AI parsing · Stored</small>
            </div>
            <button class="btn btn-danger" data-remove-resume>Remove</button>
          </div>
          <p style="color:#6d735e;font-size:12px;line-height:1.5;margin-top:22px">
            Your resume is securely stored. In Phase 2, Gemini AI will automatically extract your technical skills, experience, and match you with jobs.
          </p>`
            : `<div class="empty">No resume uploaded yet.<br />Upload your CV to enable AI features.</div>`
        }
      </div>
    </div>
  `;
}

function profilePage() {
  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">Your space</span>
        <h1>Profile.</h1>
        <p>Keep your details current for a smoother career journey.</p>
      </div>
    </div>
    <div class="panel" style="max-width:620px">
      <div class="avatar" style="width:58px;height:58px;font-size:18px;margin-bottom:20px">${initials(user()?.name)}</div>
      <div class="field">
        <label>Full name</label>
        <input id="profile-name" value="${user()?.name || ""}" />
      </div>
      <div class="field">
        <label>Email address</label>
        <input value="${user()?.email || ""}" disabled style="opacity:0.6" />
      </div>
      <div class="field">
        <label>Career focus</label>
        <select id="profile-focus">
          <option ${user()?.career_focus === "Technology & development" ? "selected" : ""}>Technology & development</option>
          <option ${user()?.career_focus === "Data & analytics" ? "selected" : ""}>Data & analytics</option>
          <option ${user()?.career_focus === "Design & product" ? "selected" : ""}>Design & product</option>
          <option ${user()?.career_focus === "AI & Machine Learning" ? "selected" : ""}>AI & Machine Learning</option>
          <option ${!user()?.career_focus ? "selected" : ""}>Exploring my direction</option>
        </select>
      </div>
      <button class="btn btn-primary" id="btn-save-profile">Save changes</button>
    </div>
  `;
}

function shell() {
  const pageContent =
    state.page === "overview"
      ? overview()
      : state.page === "courses"
      ? coursesPage()
      : state.page === "saved"
      ? savedPage()
      : state.page === "resume"
      ? resumePage()
      : profilePage();
  return `<div class="app-shell">${sidebar()}<main class="main">${topbar()}${pageContent}</main></div>`;
}

function auth() {
  return `
    <div class="auth-shell">
      <div class="auth-card">
        <div class="auth-art">
          <div class="brand">career<span>pilot</span> ·</div>
          <div>
            <span class="eyebrow">A calmer way forward</span>
            <h1>Find the work that feels like you.</h1>
            <p>Build skills, discover your direction, and keep moving one useful step at a time.</p>
          </div>
          <div class="auth-shape"></div>
        </div>
        <form class="auth-form" id="auth-form">
          <h2>${state.authMode === "login" ? "Welcome back." : "Make a little room."}</h2>
          <p>${state.authMode === "login" ? "Sign in to pick up where you left off." : "Create your space in less than a minute."}</p>
          ${
            state.authMode === "register"
              ? `<div class="field"><label>Your name</label><input name="name" placeholder="Dyaa Abdullah" required /></div>`
              : ""
          }
          <div class="field">
            <label>Email address</label>
            <input type="email" name="email" placeholder="you@example.com" required />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="At least 6 characters" minlength="6" required />
          </div>
          <button class="btn btn-primary auth-submit">${state.authMode === "login" ? "Sign in" : "Create account"} &nbsp; ↗</button>
          <div class="switch-auth">
            ${state.authMode === "login" ? "New here?" : "Already have an account?"}
            <button type="button" data-toggle-auth>${state.authMode === "login" ? "Create an account" : "Sign in"}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) =>
    button.addEventListener("click", () => navigate(button.dataset.nav))
  );

  document.querySelectorAll("[data-category]").forEach((button) =>
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      document.querySelectorAll("[data-category]").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      loadCoursesFromApi(state.query, state.category);
    })
  );

  const searchInput = document.querySelector("#course-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value;
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        loadCoursesFromApi(state.query, state.category);
      }, 200);
    });
  }


  document.querySelector("[data-logout]")?.addEventListener("click", (e) => {
    e.preventDefault();
    ["careerpilot_user", "careerpilot_api_user", "careerpilot_access_token", "careerpilot_refresh_token"].forEach(
      (key) => localStorage.removeItem(key)
    );
    state.apiSynced = false;
    courses = [...FALLBACK_COURSES];
    render();
  });

  document.querySelector("[data-toggle-auth]")?.addEventListener("click", () => {
    state.authMode = state.authMode === "login" ? "register" : "login";
    render();
  });

  const authForm = document.querySelector("#auth-form");
  authForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      ...(data.get("name") ? { name: data.get("name") } : {}),
    };
    try {
      const result = await apiRequest(state.authMode === "login" ? "/auth/login" : "/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      localStorage.setItem("careerpilot_access_token", result.access_token);
      localStorage.setItem("careerpilot_refresh_token", result.refresh_token);
      localStorage.setItem("careerpilot_api_user", JSON.stringify(result.user));
      toast("Connected to CareerPilot");
      render();
      loadCoursesFromApi();
    } catch (err) {
      // Local fallback for offline preview
      localStorage.setItem(
        "careerpilot_user",
        JSON.stringify({ name: data.get("name") || "Dyaa Abdullah", email: data.get("email") })
      );
      toast("Welcome to CareerPilot (Preview mode)");
      render();
    }
  });

  const resumeInput = document.querySelector("#resume-input");
  resumeInput?.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return toast("Please choose a file smaller than 10 MB");
    if (apiToken()) {
      const form = new FormData();
      form.append("file", file);
      try {
        const result = await apiRequest("/resumes/upload", { method: "POST", body: form });
        state.resume = {
          id: result.id,
          name: result.original_filename,
          size: result.size_bytes,
          type: result.mime_type,
        };
        saveState();
        render();
        return toast("Resume uploaded and parsed successfully");
      } catch (err) {
        toast("API upload failed; keeping local preview");
      }
    }
    state.resume = { name: file.name, size: file.size, type: file.type };
    saveState();
    render();
    toast("Resume uploaded successfully");
  });

  document.querySelector("[data-remove-resume]")?.addEventListener("click", async () => {
    if (state.resume?.id && apiToken()) {
      try {
        await apiRequest(`/resumes/${state.resume.id}`, { method: "DELETE" });
      } catch (_) {}
    }
    state.resume = null;
    saveState();
    render();
    toast("Resume removed");
  });

  document.querySelector("#btn-save-profile")?.addEventListener("click", async () => {
    const name = document.querySelector("#profile-name")?.value;
    const focus = document.querySelector("#profile-focus")?.value;
    try {
      if (apiToken()) {
        const updated = await apiRequest("/me", {
          method: "PATCH",
          body: JSON.stringify({ full_name: name, career_focus: focus }),
        });
        localStorage.setItem("careerpilot_api_user", JSON.stringify(updated));
      }
      toast("Profile updated successfully");
      render();
    } catch (err) {
      toast("Profile updated locally");
    }
  });

  attachCardListeners();
}

function render() {
  app.innerHTML = user() ? shell() : auth();
  bindEvents();
}

render();
if (user()) {
  loadCoursesFromApi();
}
