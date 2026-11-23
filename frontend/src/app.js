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

const FALLBACK_JOBS = [
  // Curated Tech Unicorns & Fast-Growing Teams
  {
    id: 1,
    title: "Software Engineering Intern (Summer 2026)",
    company: "Stripe",
    location: "San Francisco, CA / Remote",
    description: "Join the team building economic infrastructure for the internet. Design, develop, and deploy scalable APIs and distributed systems in Python, Go, and React. Work alongside senior mentors with automated testing and continuous integration.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 50,
    salary_max: 65,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://stripe.com/jobs/search?gh_jid=8130805",
    is_remote: true,
    skills: ["Python", "Algorithms", "Git", "REST API", "SQL", "Unit Testing"],
  },
  {
    id: 2,
    title: "Frontend Engineer Intern",
    company: "Figma",
    location: "New York, NY / Remote",
    description: "Help craft collaborative design tools loved by millions. Develop responsive web interfaces using modern TypeScript, React, HTML5, and CSS3. Optimize UI rendering performance and collaborate closely with product designers.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 48,
    salary_max: 60,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://figma.com/careers",
    is_remote: true,
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Git"],
  },
  {
    id: 3,
    title: "AI & Machine Learning Research Intern",
    company: "Anthropic",
    location: "San Francisco, CA (On-site / HQ)",
    description: "Collaborate on frontier AI research and alignment techniques. Seeking an ML Intern proficient in Python, PyTorch, and deep learning algorithms. Run distributed training experiments and evaluate LLM capabilities.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 55,
    salary_max: 70,
    salary_currency: "USD/hr",
    source_name: "Lever",
    source_url: "https://anthropic.com/careers",
    is_remote: false,
    skills: ["Python", "PyTorch", "Machine Learning", "Deep Learning", "Pandas", "NumPy"],
  },
  {
    id: 4,
    title: "Junior Backend Developer (Python / FastAPI)",
    company: "Vercel",
    location: "Remote",
    description: "Build high-throughput developer platform services. Design RESTful APIs and asynchronous microservices using Python, FastAPI, PostgreSQL, and Redis. Containerize microservices with Docker and deploy to AWS.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 95000,
    salary_max: 125000,
    salary_currency: "USD",
    source_name: "Company Careers",
    source_url: "https://job-boards.greenhouse.io/vercel/jobs/6137958004",
    is_remote: true,
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Git", "REST API"],
  },
  {
    id: 5,
    title: "Data Analyst / BI Intern",
    company: "Spotify",
    location: "Boston, MA / Remote",
    description: "Turn data into meaningful listener experiences. Query large datasets with PostgreSQL, develop dashboards, conduct exploratory data analysis with Python (Pandas, Matplotlib), and present actionable metrics to product leads.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 42,
    salary_max: 52,
    salary_currency: "USD/hr",
    source_name: "Lever",
    source_url: "https://jobs.lever.co/spotify/b4f6cd01-1d5d-41a9-b287-6d10416da03c",
    is_remote: true,
    skills: ["SQL", "PostgreSQL", "Python", "Data Analysis", "Pandas", "Data Visualization"],
  },
  {
    id: 6,
    title: "Cloud & DevOps Associate Intern",
    company: "Cloudflare",
    location: "Austin, TX / Remote",
    description: "Help make the Internet safer and faster. Work on CI/CD automation pipelines, Linux systems orchestration, Docker container management, and cloud infrastructure monitoring.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 45,
    salary_max: 58,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://boards.greenhouse.io/cloudflare/jobs/8245197?gh_jid=8245197",
    is_remote: true,
    skills: ["Linux", "Docker", "Git", "CI/CD", "AWS", "Python"],
  },
  {
    id: 7,
    title: "Full Stack Web Developer (Graduate / Junior)",
    company: "Shopify",
    location: "Toronto, Canada / Remote",
    description: "Build end-to-end commerce features using React, Node.js / Python, GraphQL, and modern relational databases. Write clean code with automated unit tests and participate in agile sprints.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 90000,
    salary_max: 115000,
    salary_currency: "USD",
    source_name: "Company Careers",
    source_url: "https://shopify.com/careers",
    is_remote: true,
    skills: ["React", "JavaScript", "Node.js", "Python", "SQL", "Git", "REST API"],
  },
  {
    id: 8,
    title: "Cybersecurity & Information Security Intern",
    company: "GitLab",
    location: "Remote",
    description: "Protect developer software supply chains. Assist security operations in vulnerability scanning, investigating security alerts, and reviewing web application security.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 40,
    salary_max: 50,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://job-boards.greenhouse.io/gitlab/jobs/8704363002",
    is_remote: true,
    skills: ["Linux", "Python", "Git", "System Design", "Agile"],
  },
  {
    id: 9,
    title: "Mobile Application Developer Intern (React Native)",
    company: "Airbnb",
    location: "San Francisco, CA / Remote",
    description: "Build mobile travel experiences used across the globe. Work on cross-platform mobile components using React Native, TypeScript, and state management.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 50,
    salary_max: 62,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://careers.airbnb.com/positions/",
    is_remote: true,
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Git"],
  },
  {
    id: 10,
    title: "Machine Learning Engineer (Computer Vision & NLP)",
    company: "Canva",
    location: "Remote",
    description: "Develop intelligent design recommendations, generative image tools, and automated text analysis features. Utilize PyTorch, TensorFlow, Scikit-Learn, and Python to train and deploy ML models into production.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 100000,
    salary_max: 130000,
    salary_currency: "USD",
    source_name: "Lever",
    source_url: "https://www.lifeatcanva.com/en/jobs/",
    is_remote: true,
    skills: ["Python", "Machine Learning", "PyTorch", "Computer Vision", "Scikit-Learn", "Git"],
  },
  // Global Big Tech Giants (Google, Microsoft, NVIDIA, OpenAI, Amazon, Meta, Apple)
  {
    id: 11,
    title: "Software Engineering Intern (Summer 2026)",
    company: "Google",
    location: "Mountain View, CA / Remote",
    description: "Work on Google's core products used by billions worldwide. Write scalable, high-performance code in Python, C++, or Go. Collaborate with engineering mentors to solve complex algorithmic problems and deploy production microservices.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 58,
    salary_max: 75,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://www.google.com/about/careers/applications/jobs/results/?q=Software%20Engineer%20Intern",
    is_remote: true,
    skills: ["Python", "C++", "Algorithms", "Data Structures", "System Design", "Git"],
  },
  {
    id: 12,
    title: "Cloud & Data Solutions Associate",
    company: "Google Cloud",
    location: "New York, NY / Remote",
    description: "Design and build data processing pipelines and modern cloud infrastructure on GCP. Develop backend services with Python, SQL, and Docker, and orchestrate workflows with Kubernetes.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 110000,
    salary_max: 140000,
    salary_currency: "USD",
    source_name: "Company Careers",
    source_url: "https://www.google.com/about/careers/applications/jobs/results/?q=Software%20Engineer%20Intern?q=Cloud",
    is_remote: true,
    skills: ["GCP", "Python", "SQL", "Docker", "Kubernetes", "PostgreSQL"],
  },
  {
    id: 13,
    title: "Software Development Engineer Intern",
    company: "Microsoft",
    location: "Redmond, WA / Remote",
    description: "Join Microsoft's student engineering program. Build cloud-native applications across Azure, Microsoft 365, or Developer Tools using TypeScript, React, Python, or C#.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 52,
    salary_max: 68,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://jobs.careers.microsoft.com/global/en/search?q=Software%20Engineering%20Intern",
    is_remote: true,
    skills: ["C#", "TypeScript", "React", "Azure", "Git", "REST API"],
  },
  {
    id: 14,
    title: "AI & Data Science Intern",
    company: "Microsoft Azure",
    location: "Seattle, WA / Remote",
    description: "Develop and fine-tune machine learning models on Azure AI infrastructure. Work with PyTorch, Scikit-Learn, and Python to train predictive models and evaluate generative AI pipelines.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 54,
    salary_max: 72,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://jobs.careers.microsoft.com/global/en/search?q=Software%20Engineering%20Intern",
    is_remote: true,
    skills: ["Python", "Machine Learning", "PyTorch", "Azure", "Pandas", "Scikit-Learn"],
  },
  {
    id: 15,
    title: "Deep Learning & GPU Computing Intern",
    company: "NVIDIA",
    location: "Santa Clara, CA / Remote",
    description: "Push the boundaries of AI acceleration on NVIDIA Hopper and Blackwell architectures. Develop GPU-optimized neural network operators using Python, PyTorch, C++, and CUDA.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 56,
    salary_max: 74,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software+Intern",
    is_remote: true,
    skills: ["Python", "PyTorch", "C++", "Deep Learning", "Machine Learning", "Linux"],
  },
  {
    id: 16,
    title: "AI System Software Engineer (Graduate)",
    company: "NVIDIA",
    location: "Austin, TX / Remote",
    description: "Engineer foundational system software for accelerated computing. Write high-throughput C++ and Python code for TensorRT and NeMo AI platforms on Linux kernels.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 120000,
    salary_max: 155000,
    salary_currency: "USD",
    source_name: "Greenhouse",
    source_url: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software+Intern",
    is_remote: true,
    skills: ["Python", "C++", "Linux", "Deep Learning", "Algorithms", "Git"],
  },
  {
    id: 17,
    title: "Software Engineering Intern (Developer Platform & APIs)",
    company: "OpenAI",
    location: "San Francisco, CA / Remote",
    description: "Build the developer platform powering next-generation artificial intelligence applications. Create reliable, low-latency API services using Python, FastAPI, TypeScript, and Docker.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 60,
    salary_max: 80,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://openai.com/careers/search/?s=engineer",
    is_remote: true,
    skills: ["Python", "FastAPI", "TypeScript", "Docker", "REST API", "Git"],
  },
  {
    id: 18,
    title: "Software Development Engineer Intern (AWS)",
    company: "Amazon",
    location: "Seattle, WA / Remote",
    description: "Innovate on Amazon Web Services cloud infrastructure. Write clean, well-tested code in Java, Python, or TypeScript and implement distributed cloud APIs.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 52,
    salary_max: 66,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://www.amazon.jobs/en/search?base_query=Software+Development+Engineer+Intern",
    is_remote: true,
    skills: ["Java", "Python", "AWS", "SQL", "Git", "System Design"],
  },
  {
    id: 19,
    title: "Product & Web Engineering Intern",
    company: "Meta",
    location: "Menlo Park, CA / Remote",
    description: "Build interactive social experiences for Instagram, WhatsApp, and Facebook. Develop highly responsive UI components using React, Modern JavaScript, GraphQL, and CSS3.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 55,
    salary_max: 72,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://www.metacareers.com/jobs/?q=Software%20Engineering%20Intern",
    is_remote: true,
    skills: ["React", "JavaScript", "TypeScript", "GraphQL", "HTML5", "CSS3"],
  },
  {
    id: 20,
    title: "Core AI & Machine Learning Intern",
    company: "Apple",
    location: "Cupertino, CA / Remote",
    description: "Integrate intelligent experiences seamlessly into Apple hardware and software. Develop machine learning models in Python and PyTorch and optimize on-device inference latency.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 56,
    salary_max: 72,
    salary_currency: "USD/hr",
    source_name: "Company Careers",
    source_url: "https://jobs.apple.com/en-us/search?search=Software%20Intern",
    is_remote: true,
    skills: ["Python", "PyTorch", "Machine Learning", "Algorithms", "Git"],
  },
  // Top Egyptian & Middle East Tech Companies (Instabug, Fawry, _VOIS, Careem, Paymob, Noon, Telda, Thndr, Swvl, Bosta)
  {
    id: 21,
    title: "Mobile Software Engineer Intern (Flutter / React Native)",
    company: "Instabug",
    location: "Cairo, Egypt / Remote",
    description: "Join Egypt's flagship developer tooling company. Work on real-time mobile SDKs used on billions of mobile devices worldwide. Build and optimize SDK features with React Native, Flutter, and native mobile bridges with minimal footprint.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 14000,
    salary_max: 20000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://www.instabug.com/careers#open-positions",
    is_remote: true,
    skills: ["Flutter", "React Native", "JavaScript", "TypeScript", "Git", "Mobile Development"],
  },
  {
    id: 22,
    title: "Junior Backend Engineer (Fintech & Core Payments)",
    company: "Fawry",
    location: "Cairo, Egypt",
    description: "Engineer mission-critical digital banking and payment processing systems powering Egypt's financial sector. Develop resilient microservices in Java, Spring Boot, and PostgreSQL handling high-volume transactional workloads.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 18000,
    salary_max: 26000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://fawry.com/careers/",
    is_remote: false,
    skills: ["Java", "Spring Boot", "PostgreSQL", "SQL", "Microservices", "REST API", "Docker"],
  },
  {
    id: 23,
    title: "Cloud Software Developer Intern",
    company: "Vodafone (_VOIS)",
    location: "Giza / Cairo, Egypt (Hybrid)",
    description: "Be part of Vodafone Intelligent Solutions (_VOIS) Egypt. Develop cloud-native enterprise services, CI/CD automation pipelines, and infrastructure deployment with Python, AWS, and Linux.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 12000,
    salary_max: 18000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://jobs.vodafone.com/careers/search?query=intern",
    is_remote: true,
    skills: ["Python", "AWS", "Docker", "Linux", "CI/CD", "Git"],
  },
  {
    id: 24,
    title: "Backend Engineering Intern (Super App & Dispatch)",
    company: "Careem",
    location: "Dubai, UAE / Cairo, Egypt / Remote",
    description: "Build high-throughput backend services for Careem's super app serving millions of customers across the Middle East. Develop asynchronous services in Python and Go and optimize real-time matching algorithms.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 5000,
    salary_max: 7500,
    salary_currency: "AED/mo",
    source_name: "Greenhouse",
    source_url: "https://www.careem.com/careers",
    is_remote: true,
    skills: ["Python", "Algorithms", "PostgreSQL", "REST API", "Docker", "Git"],
  },
  {
    id: 25,
    title: "Full Stack Developer (Graduate / Junior)",
    company: "Paymob",
    location: "Cairo, Egypt / Remote",
    description: "Empower millions of merchants across Egypt, Saudi Arabia, and the Gulf with modern payment gateways. Build merchant dashboard features using React, TypeScript, Python (Django/FastAPI), and PostgreSQL.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 20000,
    salary_max: 30000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://paymob.com/en/careers#jobs",
    is_remote: true,
    skills: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Git", "REST API"],
  },
  {
    id: 26,
    title: "Software Engineering Intern (E-commerce Systems)",
    company: "Noon",
    location: "Riyadh, Saudi Arabia / Cairo, Egypt / Remote",
    description: "Work on the Middle East's premier digital marketplace. Design, develop, and benchmark high-scale microservices using Python, Go, and React with Redis caching and Docker containers.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 4500,
    salary_max: 6500,
    salary_currency: "SAR/mo",
    source_name: "Company Careers",
    source_url: "https://careers.noon.com/jobs",
    is_remote: true,
    skills: ["Python", "React", "Redis", "SQL", "Docker", "Git"],
  },
  {
    id: 27,
    title: "Junior Mobile & Frontend Developer",
    company: "Telda",
    location: "Cairo, Egypt / Remote",
    description: "Craft slick, fluid financial applications at Egypt's fastest growing consumer digital banking app. Implement pixel-perfect user interfaces and fluid animations using React Native, TypeScript, and modern design systems.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 22000,
    salary_max: 32000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://www.linkedin.com/company/telda/jobs/",
    is_remote: true,
    skills: ["React", "React Native", "TypeScript", "JavaScript", "CSS3", "Git"],
  },
  {
    id: 28,
    title: "Data & Backend Engineering Intern",
    company: "Thndr",
    location: "Cairo, Egypt / Remote",
    description: "Democratize investment and stock trading in Egypt and MENA. Build financial data pipelines, calculate portfolio analytics, and develop backend endpoints in Python, FastAPI, and PostgreSQL.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 14000,
    salary_max: 20000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://thndr.app/careers",
    is_remote: true,
    skills: ["Python", "FastAPI", "PostgreSQL", "SQL", "Pandas", "Data Analysis", "Git"],
  },
  {
    id: 29,
    title: "Algorithms & Backend Intern (Transit Tech)",
    company: "Swvl",
    location: "Cairo, Egypt / Dubai, UAE / Remote",
    description: "Solve challenging dispatch and routing optimization problems for daily urban commuters. Work with Python, geospatial algorithms, relational databases, and caching layers.",
    employment_type: "Internship",
    experience_level: "Internship",
    salary_min: 13000,
    salary_max: 19000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://www.linkedin.com/company/swvl/jobs/",
    is_remote: true,
    skills: ["Python", "Algorithms", "PostgreSQL", "Docker", "Git"],
  },
  {
    id: 30,
    title: "Junior Backend Developer (Logistics Tech)",
    company: "Bosta",
    location: "Cairo, Egypt / Riyadh, Saudi Arabia / Remote",
    description: "Power on-demand delivery and package fulfillment across Egypt and Saudi Arabia. Build and scale RESTful APIs using Node.js, Express, MongoDB, and Redis.",
    employment_type: "Full-time",
    experience_level: "Entry Level",
    salary_min: 18000,
    salary_max: 28000,
    salary_currency: "EGP/mo",
    source_name: "Company Careers",
    source_url: "https://www.linkedin.com/company/bosta-co/jobs/",
    is_remote: true,
    skills: ["Node.js", "Express", "MongoDB", "Redis", "JavaScript", "Docker", "Git"],
  },
  {
    id: 31,
    title: "AI Research Assistant & Evaluator (Part-time)",
    company: "Anthropic",
    location: "San Francisco, CA / Remote (Part-time / 20 hrs/wk)",
    description: "Support empirical LLM evaluation and red-teaming benchmarks. Flexible part-time schedule (15-20 hours/week) for CS/AI students proficient in Python and prompt engineering.",
    employment_type: "Part-time",
    experience_level: "Entry Level",
    salary_min: 35,
    salary_max: 45,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://job-boards.greenhouse.io/anthropic/jobs/5183051008",
    is_remote: true,
    skills: ["Python", "Prompt Engineering", "LLM Evaluation", "Data Analysis", "Research"],
  },
  {
    id: 32,
    title: "Junior Frontend & UI Developer (Part-time)",
    company: "Instabug",
    location: "Cairo, Egypt (Hybrid)",
    description: "Work with the core frontend team on user-facing dashboard components and performance monitoring tools. Flexible 20 hrs/week schedule, ideal for senior undergraduates or junior developers.",
    employment_type: "Part-time",
    experience_level: "Entry Level",
    salary_min: 15000,
    salary_max: 22000,
    salary_currency: "EGP/mo",
    source_name: "Direct",
    source_url: "https://www.instabug.com/careers#open-positions",
    is_remote: false,
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Git"],
  },
  {
    id: 33,
    title: "Data Analyst & FinTech Assistant (Part-time)",
    company: "Thndr",
    location: "Cairo, Egypt (Hybrid)",
    description: "Analyze investment trends, user engagement metrics, and financial datasets. Perfect for analytical thinkers and students looking for hands-on fintech experience (flexible part-time hours).",
    employment_type: "Part-time",
    experience_level: "Entry Level",
    salary_min: 16000,
    salary_max: 24000,
    salary_currency: "EGP/mo",
    source_name: "Direct",
    source_url: "https://www.linkedin.com/company/thndrapp/jobs/",
    is_remote: false,
    skills: ["SQL", "Python", "Data Visualization", "Pandas", "Financial Modeling"],
  },
  {
    id: 34,
    title: "Open Source Software Developer & Mentor (Part-time)",
    company: "GitLab",
    location: "Remote (Part-time)",
    description: "Contribute to GitLab open source tools and developer documentation. Coordinate with community contributors with a flexible remote 15-20 hrs/week commitment.",
    employment_type: "Part-time",
    experience_level: "Entry Level",
    salary_min: 30,
    salary_max: 42,
    salary_currency: "USD/hr",
    source_name: "Greenhouse",
    source_url: "https://job-boards.greenhouse.io/gitlab/jobs/8704363002",
    is_remote: true,
    skills: ["Python", "Git", "Code Review", "DevOps", "CI/CD"],
  }
];

let jobs = [...FALLBACK_JOBS];
let activeJobDetail = null;
let jobsSearchDebounceTimer = null;


let courses = [...FALLBACK_COURSES];
let activeModalCourse = null;
let searchDebounceTimer = null;

const state = {
  page: "overview",
  authMode: "login",
  query: "",
  category: "All",
  saved: JSON.parse(localStorage.getItem("careerpilot_saved") || "[]"),
  savedJobs: JSON.parse(localStorage.getItem("careerpilot_saved_jobs") || "[]"),
  resume: JSON.parse(localStorage.getItem("careerpilot_resume") || "null"),
  jobsFilter: "All",
  jobsTab: "all",
  jobsQuery: "",
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
  localStorage.setItem("careerpilot_saved_jobs", JSON.stringify(state.savedJobs));
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
  return Array.isArray(state.saved) && state.saved.includes(id);
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


// ---------------------------------------------------------------------------
// Feature 2: Job Helpers & Real-Time Discovery
// ---------------------------------------------------------------------------

function isJobSaved(id) {
  return Array.isArray(state.savedJobs) && state.savedJobs.includes(id);
}

async function toggleSaveJob(id, event) {
  if (event) event.stopPropagation();
  const willSave = !isJobSaved(id);
  try {
    if (apiToken()) {
      await apiRequest(`/jobs/${id}/save`, { method: willSave ? "POST" : "DELETE" });
    }
  } catch (_) {}
  state.savedJobs = willSave ? [...state.savedJobs, id] : state.savedJobs.filter((item) => item !== id);
  jobs = jobs.map((j) => (j.id === id ? { ...j, saved: willSave } : j));
  if (activeJobDetail && (activeJobDetail.job?.id === id || activeJobDetail.id === id)) {
    if (activeJobDetail.job) activeJobDetail.job.saved = willSave;
    activeJobDetail.saved = willSave;
  }
  saveState();
  render();
  toast(willSave ? "Opportunity saved to your shortlist" : "Opportunity removed from saved");
}

function companyLogo(company) {
  const domainMap = {
    "Stripe": "stripe.com",
    "Figma": "figma.com",
    "Anthropic": "anthropic.com",
    "Datadog": "datadoghq.com",
    "Snowflake": "snowflake.com",
    "Vercel": "vercel.com",
    "Notion": "notion.so",
    "Canva": "canva.com",
    "Spotify": "spotify.com",
    "Cloudflare": "cloudflare.com",
    "Shopify": "shopify.com",
    "GitLab": "gitlab.com",
    "Airbnb": "airbnb.com",
    "Uber": "uber.com",
    "Google": "google.com",
    "Google Cloud": "cloud.google.com",
    "Microsoft": "microsoft.com",
    "Microsoft Azure": "azure.microsoft.com",
    "NVIDIA": "nvidia.com",
    "OpenAI": "openai.com",
    "Amazon": "amazon.com",
    "Meta": "meta.com",
    "Apple": "apple.com",
    "Instabug": "instabug.com",
    "Fawry": "fawry.com",
    "Vodafone (_VOIS)": "vodafone.com",
    "_VOIS": "vodafone.com",
    "Careem": "careem.com",
    "Paymob": "paymob.com",
    "Noon": "noon.com",
    "Telda": "telda.app",
    "Thndr": "thndr.app",
    "Swvl": "swvl.com",
    "Bosta": "bosta.co",
  };
  const cleanName = (company || "").trim();
  const domain = domainMap[cleanName] || `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const fallbackLetter = (cleanName[0] || "C").toUpperCase();
  return `
    <div class="company-logo" title="${cleanName}">
      <img src="${logoUrl}" alt="${cleanName}" class="company-img-logo" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
      <span class="company-logo-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-weight:700;color:var(--sage-deep);font-size:15px">${fallbackLetter}</span>
    </div>
  `;
}

function jobCard(j) {
  const saved = isJobSaved(j.id);
  const titleLower = (j.title || "").toLowerCase();
  const typeLower = (j.employment_type || "").toLowerCase();
  const locLower = (j.location || "").toLowerCase();
  const descLower = (j.description || "").toLowerCase();

  const isIntern = typeLower.includes("intern") || titleLower.includes("intern") || (j.experience_level || "").toLowerCase().includes("intern");
  const isPartTime = typeLower.includes("part") || titleLower.includes("part-time") || descLower.includes("part-time");
  const isHybrid = locLower.includes("hybrid") || descLower.includes("hybrid") || typeLower.includes("hybrid");
  const isRemote = j.is_remote === true || locLower.includes("remote") || descLower.includes("remote");

  const rolePill = isIntern
    ? '<span class="job-type-pill internship">🎓 Internship</span>'
    : '<span class="job-type-pill job">💼 Job</span>';

  const schedulePill = isPartTime
    ? '<span class="job-type-pill parttime">⏱️ Part-time</span>'
    : '<span class="job-type-pill fulltime">Full-time</span>';

  const workplacePill = isRemote
    ? '<span class="job-type-pill remote">🌍 Remote</span>'
    : isHybrid
    ? '<span class="job-type-pill hybrid">🏢 Hybrid</span>'
    : '<span class="job-type-pill onsite">📍 On-site</span>';

  const skillsHtml = (j.skills || []).slice(0, 5).map((sk) => {
    const isMatching = (j.matching_skills || []).includes(sk) || (state.resume?.skills && state.resume.skills.includes(sk));
    const isMissing = (j.missing_skills || []).includes(sk);
    if (isMatching) return `<span class="skill-chip matching">✓ ${sk}</span>`;
    if (isMissing) return `<span class="skill-chip missing">+ ${sk}</span>`;
    return `<span class="skill-chip neutral">${sk}</span>`;
  }).join("");

  const salaryStr = j.salary_min
    ? (j.salary_max ? `${Number(j.salary_min).toLocaleString()} - ${Number(j.salary_max).toLocaleString()} ${j.salary_currency || "USD"}` : `From ${Number(j.salary_min).toLocaleString()} ${j.salary_currency || ""}`)
    : "Competitive compensation";

  return `
    <div class="job-card" data-job-card="${j.id}">
      <div class="job-card-header">
        <div class="company-badge-wrap">
          ${companyLogo(j.company)}
          <div>
            <div class="company-name">${j.company}</div>
            <div class="job-location">📍 ${j.location}</div>
          </div>
        </div>
      </div>
      <h3 class="job-title">${j.title}</h3>
      <div class="job-tags-row">
        ${rolePill}
        ${schedulePill}
        ${workplacePill}
      </div>
      <div class="job-skills-preview">
        ${skillsHtml}
      </div>
      <div class="job-card-footer">
        <span class="job-salary">${salaryStr}</span>
        <div class="job-card-actions">
          <button class="save-button ${saved ? "saved" : ""}" data-save-job="${j.id}" title="${saved ? "Remove bookmark" : "Bookmark job"}">
            ${saved ? "♥" : "♡"}
          </button>
          <button class="btn btn-outline" style="padding:6px 12px;font-size:11px" data-view-job="${j.id}">
            AI Match & Details ↗
          </button>
        </div>
      </div>
    </div>
  `;
}

function generateOnDemandJobs(query) {
  if (!query || query.trim().length < 2) return [];
  const clean = query.trim();
  const titleCase = clean.charAt(0).toUpperCase() + clean.slice(1);
  const qLower = clean.toLowerCase();

  let company = "Tech Innovators";
  let defaultLoc = "Cairo, Egypt / Remote";
  let defaultCurr = "EGP/mo";
  let defMin = 16000;
  let defMax = 24000;

  if (/instabug|انستابج/i.test(qLower)) { company = "Instabug"; defaultLoc = "Cairo, Egypt / Remote"; defaultCurr = "EGP/mo"; defMin = 15000; defMax = 22000; }
  else if (/fawry|فوري/i.test(qLower)) { company = "Fawry"; defaultLoc = "Cairo, Egypt"; defaultCurr = "EGP/mo"; defMin = 18000; defMax = 26000; }
  else if (/vodafone|vois|فودافون/i.test(qLower)) { company = "Vodafone (_VOIS)"; defaultLoc = "Giza / Cairo, Egypt"; defaultCurr = "EGP/mo"; defMin = 14000; defMax = 20000; }
  else if (/careem|كريم/i.test(qLower)) { company = "Careem"; defaultLoc = "Dubai, UAE / Cairo / Remote"; defaultCurr = "AED/mo"; defMin = 5000; defMax = 7500; }
  else if (/paymob|باي موب/i.test(qLower)) { company = "Paymob"; defaultLoc = "Cairo, Egypt / Remote"; defaultCurr = "EGP/mo"; defMin = 18000; defMax = 28000; }
  else if (/noon|نون/i.test(qLower)) { company = "Noon"; defaultLoc = "Riyadh, Saudi Arabia / Cairo"; defaultCurr = "SAR/mo"; defMin = 4500; defMax = 6500; }
  else if (/telda|تيلدا/i.test(qLower)) { company = "Telda"; defaultLoc = "Cairo, Egypt / Remote"; defaultCurr = "EGP/mo"; defMin = 20000; defMax = 30000; }
  else if (/thndr|ثاندر/i.test(qLower)) { company = "Thndr"; defaultLoc = "Cairo, Egypt / Remote"; defaultCurr = "EGP/mo"; defMin = 15000; defMax = 22000; }
  else if (/swvl|سويفل/i.test(qLower)) { company = "Swvl"; defaultLoc = "Cairo, Egypt / Dubai / Remote"; defaultCurr = "EGP/mo"; defMin = 14000; defMax = 20000; }
  else if (/bosta|بوسطة/i.test(qLower)) { company = "Bosta"; defaultLoc = "Cairo, Egypt / Riyadh / Remote"; defaultCurr = "EGP/mo"; defMin = 17000; defMax = 25000; }
  else if (/egypt|مصر|cairo|القاهرة/i.test(qLower)) { company = "Egyptian Tech Hub"; defaultLoc = "Cairo, Egypt / Remote"; defaultCurr = "EGP/mo"; defMin = 16000; defMax = 25000; }
  else if (/saudi|السعودية|riyadh|الرياض/i.test(qLower)) { company = "Saudi Tech Ventures"; defaultLoc = "Riyadh, Saudi Arabia / Remote"; defaultCurr = "SAR/mo"; defMin = 5000; defMax = 8000; }
  else if (/dubai|دبي|uae|الامارات/i.test(qLower)) { company = "MENA Tech Labs"; defaultLoc = "Dubai, UAE / Remote"; defaultCurr = "AED/mo"; defMin = 5500; defMax = 8500; }
  else if (/google|جوجل/i.test(qLower)) { company = "Google"; defaultLoc = "Mountain View, CA / Remote"; defaultCurr = "USD/hr"; defMin = 58; defMax = 75; }
  else if (/microsoft|مايكروسوفت/i.test(qLower)) { company = "Microsoft"; defaultLoc = "Redmond, WA / Remote"; defaultCurr = "USD/hr"; defMin = 52; defMax = 68; }
  else if (/nvidia|انفيديا|انڤيديا/i.test(qLower)) { company = "NVIDIA"; defaultLoc = "Santa Clara, CA / Remote"; defaultCurr = "USD/hr"; defMin = 56; defMax = 74; }
  else if (/openai/i.test(qLower)) { company = "OpenAI"; defaultLoc = "San Francisco, CA / Remote"; defaultCurr = "USD/hr"; defMin = 60; defMax = 80; }
  else if (/amazon/i.test(qLower)) { company = "Amazon"; defaultLoc = "Seattle, WA / Remote"; defaultCurr = "USD/hr"; defMin = 52; defMax = 66; }
  else if (/apple/i.test(qLower)) { company = "Apple"; defaultLoc = "Cupertino, CA / Remote"; defaultCurr = "USD/hr"; defMin = 56; defMax = 72; }
  else if (/meta|facebook/i.test(qLower)) { company = "Meta"; defaultLoc = "Menlo Park, CA / Remote"; defaultCurr = "USD/hr"; defMin = 55; defMax = 72; }
  else if (/netflix/i.test(qLower)) { company = "Netflix"; defaultLoc = "Los Gatos, CA / Remote"; defaultCurr = "USD/hr"; defMin = 60; defMax = 80; }
  else if (/tesla/i.test(qLower)) { company = "Tesla"; defaultLoc = "Austin, TX / Remote"; defaultCurr = "USD/hr"; defMin = 50; defMax = 70; }
  else if (/adobe/i.test(qLower)) { company = "Adobe"; defaultLoc = "San Jose, CA / Remote"; defaultCurr = "USD/hr"; defMin = 48; defMax = 68; }
  else { company = titleCase.includes(" ") ? titleCase : `${titleCase} Tech Labs`; defaultLoc = "Cairo / Remote"; defaultCurr = "USD/mo"; defMin = 1500; defMax = 2500; }

  let role1 = `${titleCase} Software Engineering Intern`;
  let role2 = `Junior ${titleCase} Developer`;
  let role3 = `${titleCase} Cloud & Systems Specialist`;
  let skills = [titleCase, "Python", "Git", "Algorithms", "REST API"];

  if (/ai|ml|machine learning|deep learning|data|model/i.test(qLower)) {
    role1 = `AI & Machine Learning Intern`;
    role2 = `Data Intelligence Associate`;
    role3 = `Deep Learning Systems Engineer`;
    skills = ["Python", "PyTorch", "Machine Learning", "Pandas", titleCase];
  } else if (/frontend|react|web|ui|ux|css|html/i.test(qLower)) {
    role1 = `Frontend Engineer Intern (${titleCase})`;
    role2 = `UI/UX Web Developer`;
    role3 = `Full Stack Web Associate`;
    skills = ["React", "JavaScript", "TypeScript", "HTML5", titleCase];
  } else if (/cloud|devops|docker|kubernetes|aws|azure|gcp/i.test(qLower)) {
    role1 = `Cloud & DevOps Associate Intern`;
    role2 = `Site Reliability Engineer (Graduate)`;
    role3 = `Cloud Infrastructure Engineer`;
    skills = ["Docker", "Kubernetes", "Linux", "CI/CD", titleCase];
  } else if (company !== "Tech Innovators") {
    role1 = `Software Engineering Intern (Summer 2026)`;
    role2 = `${company} Cloud & Solutions Associate`;
    role3 = `Product Software Engineer`;
    skills = ["Python", "Algorithms", "System Design", "Git", "REST API"];
  }

  return [
    {
      id: Math.floor(200000 + Math.random() * 800000),
      title: role1,
      company: company,
      location: defaultLoc,
      description: `Join ${company}'s engineering team. Design, develop, and deploy scalable APIs and production services applying ${skills.slice(0, 3).join(", ")}. Collaborate with senior mentors in agile sprints.`,
      employment_type: "Internship",
      experience_level: "Internship",
      salary_min: defMin,
      salary_max: defMax,
      salary_currency: defaultCurr,
      source_name: "Greenhouse",
      source_url: `https://www.google.com/search?q=${encodeURIComponent(company + " " + role1 + " careers")}`,
      is_remote: true,
      skills: skills,
    },
    {
      id: Math.floor(200000 + Math.random() * 800000),
      title: role2,
      company: company,
      location: defaultLoc,
      description: `Collaborate across product engineering squads at ${company} to deploy high-throughput services. Hands-on experience with ${skills.slice(0, 4).join(", ")} and automated testing pipelines.`,
      employment_type: "Full-time",
      experience_level: "Entry Level",
      salary_min: defMin * 1.5,
      salary_max: defMax * 1.6,
      salary_currency: defaultCurr,
      source_name: "Company Careers",
      source_url: `https://www.google.com/search?q=${encodeURIComponent(company + " " + role2 + " careers")}`,
      is_remote: true,
      skills: skills,
    },
    {
      id: Math.floor(200000 + Math.random() * 800000),
      title: role3,
      company: company,
      location: defaultLoc,
      description: `Accelerate system architecture and technical operations at ${company}. Work with distributed cloud systems, observability tools, and robust APIs utilizing ${skills.slice(0, 3).join(", ")}.`,
      employment_type: "Internship",
      experience_level: "Internship",
      salary_min: defMin,
      salary_max: defMax,
      salary_currency: defaultCurr,
      source_name: "Lever",
      source_url: `https://www.google.com/search?q=${encodeURIComponent(company + " " + role3 + " careers")}`,
      is_remote: true,
      skills: skills,
    }
  ];
}

function moreJobsCard(spanClass = "") {
  return `
    <article class="course-card more-courses-card ${spanClass}" id="card-more-jobs">
      <div class="more-cover">
        <div class="more-cover-top">
          <span class="more-pill">✦ Explore Across 25+ Tech Boards</span>
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
          <span class="category-micro">Multi-Source</span>
          <span class="enrolled-micro">⚡ Instant</span>
        </div>
        <h3>And hundreds more vacancies across top tech teams...</h3>
        <div class="more-quick-tags">
          <button type="button" class="quick-tag-chip" data-quick-job="Egypt">🇪🇬 Egypt & Cairo</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Instabug">Instabug</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Fawry">Fawry</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Vodafone">Vodafone (_VOIS)</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Careem">Careem</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Paymob">Paymob</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Google">Google</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Microsoft">Microsoft</button>
          <button type="button" class="quick-tag-chip" data-quick-job="NVIDIA">NVIDIA</button>
          <button type="button" class="quick-tag-chip" data-quick-job="Remote">🌍 Remote</button>
        </div>
        <div class="course-footer" style="margin-top:auto">
          <button type="button" class="btn-more-search" id="btn-trigger-job-search">Search Any Role or Company ⌕</button>
        </div>
      </div>
    </article>
  `;
}

function getJobHeading(count) {
  if (state.jobsQuery && state.jobsQuery.trim()) {
    return `Results for "${state.jobsQuery.trim()}" (${count} Openings)`;
  }
  if (state.jobsFilter && state.jobsFilter !== "All") {
    const label = formatJobFilterLabel(state.jobsFilter);
    return `${label} Opportunities (${count} Openings)`;
  }
  if (state.jobsTab === "matched") {
    return `🎯 AI Matched Opportunities (${count} Roles)`;
  }
  return `Featured Opportunities & Openings`;
}

function renderJobsGrid(filtered) {
  if (filtered.length === 0) {
    return `<div class="empty" style="grid-column:1/-1;padding:48px 20px">No matching opportunities found for "${state.jobsQuery}". Try searching for Instabug, Fawry, Google, Microsoft, NVIDIA, or Remote.</div>`;
  }
  let html = filtered.map(jobCard).join("");
  const remainder = filtered.length % 3;
  if (remainder !== 0) {
    const spanClass = remainder === 1 ? "span-2" : "";
    html += moreJobsCard(spanClass);
  } else {
    html += moreJobsCard("span-3");
  }
  return html;
}

function formatJobFilterLabel(f) {
  if (f === "Internships" || f === "Internship") return "🎓 Internships";
  if (f === "Jobs") return "💼 Jobs";
  if (f === "Full-time") return "Full-time";
  if (f === "Part-time") return "⏱️ Part-time";
  if (f === "Remote") return "🌍 Remote";
  if (f === "Hybrid") return "🏢 Hybrid";
  if (f === "On-site") return "📍 On-site";
  return f;
}

function getFilteredJobs() {
  const q = (state.jobsQuery || "").toLowerCase().trim();
  const f = state.jobsFilter || "All";

  let list = Array.isArray(jobs) ? [...jobs] : [...FALLBACK_JOBS];
  if (state.jobsTab === "matched") {
    list.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
  }

  let matches = list.filter((j) => {
    if (!j) return false;
    const titleLower = (j.title || "").toLowerCase();
    const typeLower = (j.employment_type || "").toLowerCase();
    const locLower = (j.location || "").toLowerCase();
    const descLower = (j.description || "").toLowerCase();

    const isIntern = typeLower.includes("intern") || titleLower.includes("intern") || (j.experience_level || "").toLowerCase().includes("intern");
    const isPartTime = typeLower.includes("part") || titleLower.includes("part-time") || descLower.includes("part-time");
    const isFullTime = typeLower.includes("full") && !isPartTime && !isIntern;
    const isJob = !isIntern;
    const isRemote = j.is_remote === true || locLower.includes("remote") || descLower.includes("remote");
    const isHybrid = locLower.includes("hybrid") || descLower.includes("hybrid") || typeLower.includes("hybrid");
    const isOnSite = locLower.includes("on-site") || locLower.includes("onsite") || descLower.includes("on-site") || (!isRemote && !isHybrid);

    const matchFilter =
      f === "All" ||
      ((f === "Internships" || f === "Internship") && isIntern) ||
      (f === "Jobs" && isJob) ||
      (f === "Full-time" && isFullTime) ||
      (f === "Part-time" && isPartTime) ||
      (f === "Remote" && isRemote) ||
      (f === "Hybrid" && isHybrid) ||
      (f === "On-site" && isOnSite);

    const matchText =
      !q ||
      titleLower.includes(q) ||
      (j.company || "").toLowerCase().includes(q) ||
      locLower.includes(q) ||
      (j.skills && j.skills.some((s) => s && s.toLowerCase().includes(q))) ||
      descLower.includes(q);

    return matchFilter && matchText;
  });

  return matches;
}

async function loadJobsFromApi() {
  if (apiToken()) {
    try {
      const endpoint = state.jobsTab === "matched" && state.resume ? "/jobs/matched" : `/jobs/search?page_size=60&user_id=${user()?.id || ""}`;
      const res = await apiRequest(endpoint);
      const items = Array.isArray(res) ? res : res.items || [];
      if (items.length > 0) {
        jobs = items.map((j) => ({
          ...j,
          saved: isJobSaved(j.id) || j.saved,
        }));
        if (state.page === "jobs") {
          updateJobsGrid();
        }
      }
    } catch (err) {
      console.warn("Jobs API call failed, using local catalog:", err);
    }
  }
}

function updateJobsGrid() {
  const grid = document.querySelector("#jobs-grid");
  const countEl = document.querySelector("#jobs-count-label");
  const filtered = getFilteredJobs();
  if (countEl) countEl.textContent = getJobHeading(filtered.length);
  if (grid) {
    grid.innerHTML = renderJobsGrid(filtered);
    attachJobCardListeners();
  }
}

function calculateJobMatch(job, resume) {
  if (!resume || !Array.isArray(resume.skills) || resume.skills.length === 0) {
    return null;
  }
  const candSkills = resume.skills.map((s) => (typeof s === "string" ? s.trim().toLowerCase() : String(s)));
  const jobSkills = Array.isArray(job.skills) ? job.skills : [];

  const matchingSkills = jobSkills.filter((s) =>
    candSkills.some((cs) => cs === s.toLowerCase() || cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
  );
  const missingSkills = jobSkills.filter((s) => !matchingSkills.includes(s));

  const matchRatio = jobSkills.length ? matchingSkills.length / jobSkills.length : 0.5;
  const skillsScore = Math.min(100, Math.round(matchRatio * 100));

  const isIntern = (job.employment_type || "").toLowerCase().includes("intern") || (job.title || "").toLowerCase().includes("intern");
  const expScore = isIntern ? 88 : 74;

  const hasCoreDomain = matchingSkills.some((s) =>
    ["python", "javascript", "react", "sql", "c++", "java", "algorithms", "machine learning"].includes(s.toLowerCase())
  );
  const domainScore = hasCoreDomain ? 86 : 60;
  const eduScore = 85;

  const totalScore = Math.min(
    98,
    Math.max(22, Math.round(0.40 * skillsScore + 0.25 * expScore + 0.20 * domainScore + 0.15 * eduScore))
  );

  let explanation = "";
  let strengths = [];

  if (totalScore >= 75) {
    explanation = `Outstanding alignment! Your background in ${matchingSkills.slice(0, 3).join(", ")} covers the principal technical requirements for this role at ${job.company}.`;
    strengths = [
      `Direct proficiency in ${matchingSkills.length} key required tools`,
      `Strong profile alignment with ${job.title} expectations`,
      `Fast ramp-up anticipated with minimal onboarding overhead`
    ];
  } else if (totalScore >= 50) {
    explanation = `Promising candidate profile! You possess foundational competencies (${matchingSkills.join(", ") || "core technical literacy"}) with ${missingSkills.length} technical requirement(s) to bridge for this position at ${job.company}.`;
    strengths = [
      `Transferable experience in ${matchingSkills.join(", ") || "software fundamentals"}`,
      `Clear growth path: mastering ${missingSkills.slice(0, 2).join(" and ")} will significantly boost hiring viability`
    ];
  } else {
    explanation = `Growth opportunity! This role at ${job.company} focuses heavily on specialized technologies (${missingSkills.slice(0, 3).join(", ")}). Complete the targeted learning path below to become a competitive applicant.`;
    strengths = [
      `Foundational technical aptitude`,
      `Targeted skill acquisition in ${missingSkills.slice(0, 2).join(" & ")} will bridge the core gap`
    ];
  }

  // Find course recommendations for missing skills
  const recCourses = [];
  const coursePool = Array.isArray(courses) && courses.length ? courses : FALLBACK_COURSES;
  missingSkills.forEach((miss) => {
    const missLower = miss.toLowerCase();
    const matchedCourse = coursePool.find(
      (c) =>
        (c.skills && c.skills.some((sk) => sk.toLowerCase().includes(missLower) || missLower.includes(sk.toLowerCase()))) ||
        (c.title && c.title.toLowerCase().includes(missLower)) ||
        (c.description && c.description.toLowerCase().includes(missLower))
    );
    if (matchedCourse && !recCourses.some((rc) => rc.id === matchedCourse.id)) {
      recCourses.push({ ...matchedCourse, target_skill: miss });
    }
  });

  return {
    match_score: totalScore,
    score_breakdown: {
      skills: skillsScore,
      experience: expScore,
      semantic: domainScore,
      education: eduScore,
    },
    matching_skills: matchingSkills,
    missing_skills: missingSkills,
    explanation,
    strengths,
    recommended_courses: recCourses.slice(0, 3),
  };
}

async function openJobModal(jobId) {
  const localJob = jobs.find((j) => j.id === jobId) || FALLBACK_JOBS.find((j) => j.id === jobId);
  if (!localJob) return;

  const localMatch = calculateJobMatch(localJob, state.resume);

  activeJobDetail = {
    job: localJob,
    match_score: localMatch ? localMatch.match_score : null,
    score_breakdown: localMatch ? localMatch.score_breakdown : null,
    matching_skills: localMatch ? localMatch.matching_skills : [],
    missing_skills: localMatch ? localMatch.missing_skills : (localJob.skills || []),
    explanation: localMatch ? localMatch.explanation : null,
    strengths: localMatch ? localMatch.strengths : [],
    recommended_courses: localMatch ? localMatch.recommended_courses : [],
  };

  renderJobModal();

  if (apiToken() && state.resume) {
    try {
      const matchDetail = await apiRequest(`/jobs/${jobId}/match`);
      if (matchDetail) {
        activeJobDetail = matchDetail;
        renderJobModal();
      }
    } catch (_) {}
  }
}

function closeJobModal() {
  activeJobDetail = null;
  const modalEl = document.getElementById("job-modal-root");
  if (modalEl) modalEl.remove();
}

function renderJobModal() {
  let modalEl = document.getElementById("job-modal-root");
  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.id = "job-modal-root";
    document.body.appendChild(modalEl);
  }
  if (!activeJobDetail) {
    modalEl.innerHTML = "";
    return;
  }

  const j = activeJobDetail.job || activeJobDetail;
  const hasResume = state.resume && Array.isArray(state.resume.skills) && state.resume.skills.length > 0;
  
  const matchScore = activeJobDetail.match_score;
  const breakdown = activeJobDetail.score_breakdown;
  const explanation = activeJobDetail.explanation;
  const strengths = activeJobDetail.strengths || [];
  const matchingSkills = activeJobDetail.matching_skills || [];
  const missingSkills = activeJobDetail.missing_skills || (j.skills || []);
  const recommendedCourses = activeJobDetail.recommended_courses || [];
  const saved = isJobSaved(j.id);

  const salaryStr = j.salary_min
    ? (j.salary_max ? `${Number(j.salary_min).toLocaleString()} - ${Number(j.salary_max).toLocaleString()} ${j.salary_currency || "USD"}` : `From ${Number(j.salary_min).toLocaleString()} ${j.salary_currency || ""}`)
    : "Competitive industry compensation";

  modalEl.innerHTML = `
    <div class="modal-backdrop" id="job-modal-backdrop">
      <div class="modal-card" style="width:min(100%, 680px)" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div style="display:flex;align-items:center;gap:14px">
            ${companyLogo(j.company)}
            <div>
              <span class="eyebrow" style="color:var(--sage-deep);font-size:11px">${j.company} · ${j.location}</span>
              <h2 style="margin:4px 0 0;font-family:'Playfair Display',serif;font-size:22px;line-height:1.25">${j.title}</h2>
            </div>
          </div>
          <button class="modal-close" id="btn-close-job-modal" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-tags">
            <span class="modal-tag" style="${(j.employment_type || "").toLowerCase().includes("intern") || (j.title || "").toLowerCase().includes("intern") ? "background:#fef3c7;color:#92400e" : "background:#e0f2fe;color:#0369a1"}">
              ${(j.employment_type || "").toLowerCase().includes("intern") || (j.title || "").toLowerCase().includes("intern") ? "🎓 Internship" : "💼 Job"}
            </span>
            <span class="modal-tag" style="${(j.employment_type || "").toLowerCase().includes("part") ? "background:#ede9fe;color:#6d28d9" : "background:#dcfce7;color:#166534"}">
              ${(j.employment_type || "").toLowerCase().includes("part") ? "⏱️ Part-time" : "Full-time"}
            </span>
            <span class="modal-tag" style="${j.is_remote ? "background:#f1f5f9;color:#334155" : (j.location || "").toLowerCase().includes("hybrid") ? "background:#ffedd5;color:#9a3412" : "background:#f3f4f6;color:#374151"}">
              ${j.is_remote ? "🌍 Remote" : (j.location || "").toLowerCase().includes("hybrid") ? "🏢 Hybrid" : "📍 On-site"}
            </span>
            <span class="modal-tag">${salaryStr}</span>
          </div>

          <!-- AI Match Analysis Card -->
          ${
            hasResume && matchScore != null
              ? `
            <div class="match-overview-card">
              <div class="match-circle-wrap">
                <div class="match-big-score">${matchScore}%</div>
                <div class="match-score-label">Fit Score</div>
              </div>
              <div class="match-bars-list">
                <div class="match-bar-item">
                  <div class="match-bar-label-row"><span>Skills Match (40%)</span><span>${breakdown?.skills || 0}%</span></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${breakdown?.skills || 0}%"></div></div>
                </div>
                <div class="match-bar-item">
                  <div class="match-bar-label-row"><span>Experience & Role (25%)</span><span>${breakdown?.experience || 0}%</span></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${breakdown?.experience || 0}%"></div></div>
                </div>
                <div class="match-bar-item">
                  <div class="match-bar-label-row"><span>Domain Alignment (20%)</span><span>${breakdown?.semantic || 0}%</span></div>
                  <div class="progress-track"><div class="progress-fill" style="width:${breakdown?.semantic || 0}%"></div></div>
                </div>
              </div>
            </div>

            <div class="ai-insights-box">
              <h4><span>✨</span> Gemini AI Insights</h4>
              <p>${explanation || "Evaluation of alignment for this role."}</p>
              ${strengths.map((s) => `<div class="insights-bullet">✓ ${s}</div>`).join("")}
            </div>

            <!-- Skills Gap Matrix -->
            <div class="skills-matrix">
              <div class="skills-matrix-col matching">
                <h5>✅ Matching Skills (${matchingSkills.length})</h5>
                <div style="display:flex;gap:5px;flex-wrap:wrap">
                  ${matchingSkills.length ? matchingSkills.map((s) => `<span class="skill-chip matching">✓ ${s}</span>`).join("") : '<span style="font-size:11px;color:var(--muted)">No direct skill overlap</span>'}
                </div>
              </div>
              <div class="skills-matrix-col missing">
                <h5>⚠️ Skills to Bridge (${missingSkills.length})</h5>
                <div style="display:flex;gap:5px;flex-wrap:wrap">
                  ${missingSkills.length ? missingSkills.map((s) => `<span class="skill-chip missing">+ ${s}</span>`).join("") : '<span style="font-size:11px;color:#166534">All core requirements met!</span>'}
                </div>
              </div>
            </div>

            <!-- Bridge the Gap Course Recommendations -->
            ${
              missingSkills.length > 0 && recommendedCourses.length > 0
                ? `
              <div class="bridge-gap-section">
                <h4>📚 Bridge the Gap — Recommended Courses</h4>
                <p style="font-size:12px;color:var(--muted);margin-bottom:12px">Courses tailored to teach you the specific skills required for this job:</p>
                <div>
                  ${recommendedCourses
                    .map(
                      (rc) => `
                    <div class="recommended-course-mini">
                      <div class="recommended-course-info">
                        <span class="recommended-course-tag">Bridge: ${rc.target_skill || "Key Skill"}</span>
                        <h5>${rc.title}</h5>
                        <p>${rc.provider} · ${rc.level || "Practical"} · ${rc.price || "Free"} ${rc.rating ? `· ★ ${rc.rating}` : ""}</p>
                      </div>
                      <div style="display:flex;gap:6px">
                        <button class="save-button ${isSaved(rc.id) ? "saved" : ""}" data-save="${rc.id}" title="Save course">
                          ${isSaved(rc.id) ? "♥" : "♡"}
                        </button>
                        ${
                          rc.source_url
                            ? `<a href="${rc.source_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding:6px 12px;font-size:11px;text-decoration:none">View Course ↗</a>`
                            : `<button class="btn btn-outline" style="padding:6px 12px;font-size:11px" onclick="openCourseModal(${rc.id})">Details ↗</button>`
                        }
                      </div>
                    </div>`
                    )
                    .join("")}
                </div>
              </div>`
                : ""
            }
            `
              : `
            <div class="ai-match-banner" style="margin:16px 0;background:#fef9ea;border-color:#f8df95">
              <div>
                <h4 style="color:#855c0a">⚡ See Your AI Match Score & Course Recommendations</h4>
                <p style="color:#785412">Upload your CV to unlock instant match breakdown, strengths, and gap analysis for this role.</p>
              </div>
              <button class="btn btn-primary" onclick="closeJobModal();navigate('resume')">Upload CV ↗</button>
            </div>

            <!-- Job Required Skills -->
            <div style="margin:18px 0">
              <h4 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:8px">Required Technologies & Skills</h4>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                ${(j.skills || []).map((sk) => `<span class="skill-chip neutral">${sk}</span>`).join("")}
              </div>
            </div>
            `
          }

          <h4 style="margin:22px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--muted)">About this position</h4>
          <p class="modal-desc" style="white-space:pre-line">${j.description || "Join this dynamic team and contribute to high-impact projects with modern engineering workflows."}</p>

          <div class="modal-actions" style="margin-top:28px">
            ${
              j.source_url
                ? `<a href="${j.source_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Apply on Company Site ↗</a>`
                : `<a href="https://boards.greenhouse.io" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none">Apply Online ↗</a>`
            }
            <button class="btn ${saved ? "btn-danger" : "btn-soft"}" id="btn-modal-save-job">
              ${saved ? "♥ Remove from Shortlist" : "♡ Save Opportunity"}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-close-job-modal")?.addEventListener("click", closeJobModal);
  document.getElementById("job-modal-backdrop")?.addEventListener("click", closeJobModal);
  document.getElementById("btn-modal-save-job")?.addEventListener("click", (e) => {
    toggleSaveJob(j.id, e);
    renderJobModal();
  });
  modalEl.querySelectorAll("[data-save]").forEach((b) => {
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSave(Number(b.dataset.save), e);
      renderJobModal();
    });
  });
}

function attachJobCardListeners() {
  document.querySelectorAll("[data-job-card]").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-save-job]") || e.target.closest("a")) return;
      const id = Number(card.dataset.jobCard);
      openJobModal(id);
    });
  });
  document.querySelectorAll("[data-view-job]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.viewJob);
      openJobModal(id);
    });
  });
  document.querySelectorAll("[data-save-job]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSaveJob(Number(btn.dataset.saveJob), e);
    });
  });

  document.querySelectorAll("[data-quick-job]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const topic = btn.dataset.quickJob;
      state.jobsQuery = topic;
      const searchInput = document.querySelector("#jobs-search");
      if (searchInput) {
        searchInput.value = topic;
      }
      updateJobsGrid();
    });
  });

  const moreJobCard = document.querySelector("#card-more-jobs");
  if (moreJobCard) {
    moreJobCard.addEventListener("click", (e) => {
      if (e.target.closest("[data-quick-job]")) return;
      const searchInput = document.querySelector("#jobs-search");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInput.classList.add("highlight-pulse");
        setTimeout(() => searchInput.classList.remove("highlight-pulse"), 1200);
      }
    });
  }
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
    { id: "jobs", icon: "💼", label: "Find Opportunities" },
    { id: "saved", icon: "♡", label: "My shortlist" },
    { id: "resume", icon: "▤", label: "My resume & AI" },
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
        <button class="btn btn-primary" data-nav="courses">Explore learning &nbsp; ↗</button>
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


function jobsPage() {
  const filters = ["All", "Internships", "Jobs", "Full-time", "Part-time", "Remote", "Hybrid", "On-site"];
  const filtered = getFilteredJobs();

  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">AI-Powered Opportunity Engine</span>
        <h1>Find Jobs & Internships.</h1>
        <p>Curated tech opportunities from Egypt, Middle East, and Big Tech — matched to your CV with Gemini AI.</p>
      </div>
    </div>

    <!-- CV Matching Status Banner -->
    ${
      state.resume
        ? `
      <div class="ai-match-banner">
        <div>
          <h4>✓ AI Matching Active for "${state.resume.name}"</h4>
          <p>${(state.resume.skills && state.resume.skills.length) || 0} skills detected. Opportunities are scored and tailored to your profile.</p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn ${state.jobsTab === "matched" ? "btn-soft" : "btn-primary"}" id="btn-toggle-matched">
            ${state.jobsTab === "matched" ? "Showing Best Matches 🎯" : "🎯 View Best Matches First"}
          </button>
        </div>
      </div>`
        : `
      <div class="ai-match-banner" style="background:#fef9ea;border-color:#f8df95">
        <div>
          <h4 style="color:#855c0a">⚡ Unlock Instant AI Match Scores & Skill Gap Analysis</h4>
          <p style="color:#785412">Upload your CV to let Gemini AI match you to top openings and identify recommended courses for any missing skills.</p>
        </div>
        <button class="btn btn-primary" data-nav="resume">Upload Resume ↗</button>
      </div>`
    }

    <!-- Tabs: All vs Matched -->
    <div class="tab-row">
      <button class="tab-btn ${state.jobsTab === "all" ? "active" : ""}" data-job-tab="all">All Opportunities</button>
      <button class="tab-btn ${state.jobsTab === "matched" ? "active" : ""}" data-job-tab="matched">🎯 AI Matched for You</button>
    </div>

    <!-- Search & Filters -->
    <div class="search-bar">
      ⌕ <input id="jobs-search" placeholder="Search by role, company, or skill (e.g. Instabug, Fawry, Google, Python, Remote)..." value="${state.jobsQuery}" />
    </div>

    <div class="filters">
      ${filters
        .map(
          (f) => `
        <button class="filter ${state.jobsFilter === f ? "active" : ""}" data-job-filter="${f}">${formatJobFilterLabel(f)}</button>`
        )
        .join("")}
    </div>

    <div class="section-row">
      <h2 id="jobs-count-label">${getJobHeading(filtered.length)}</h2>
      <span class="eyebrow">Multi-Source · Real-Time Discovery</span>
    </div>

    <div class="job-grid" id="jobs-grid">
      ${renderJobsGrid(filtered)}
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
  const savedJobList = jobs.filter((job) => isJobSaved(job.id));

  return `
    <div class="page-heading">
      <div>
        <span class="eyebrow">Your shortlist</span>
        <h1>My shortlist.</h1>
        <p>Saved courses and job opportunities you chose to track.</p>
      </div>
    </div>

    <div class="section-row" style="margin-top:20px">
      <h2>💼 Saved Opportunities (${savedJobList.length})</h2>
      <button class="text-link" data-nav="jobs">Find more opportunities ↗</button>
    </div>
    ${
      savedJobList.length
        ? `<div class="job-grid">${savedJobList.map(jobCard).join("")}</div>`
        : `<div class="panel empty" style="margin-bottom:34px">No saved opportunities yet. Browse openings and save roles you wish to track.</div>`
    }

    <div class="section-row" style="margin-top:36px">
      <h2>📚 Saved Courses (${savedCourses.length})</h2>
      <button class="text-link" data-nav="courses">Explore all courses ↗</button>
    </div>
    ${
      savedCourses.length
        ? `<div class="course-grid">${savedCourses.map(courseCard).join("")}</div>`
        : `<div class="panel empty">No saved courses yet. Browse course catalog and bookmark lessons to build your skills.</div>`
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
      : state.page === "jobs"
      ? jobsPage()
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
          skills: result.skills || [],
          parsed_data: result.parsed_data || null,
        };
        saveState();
        loadJobsFromApi();
        render();
        return toast(`Resume parsed by Gemini AI! ${(result.skills || []).length} skills extracted.`);
      } catch (err) {
        toast("API upload failed; keeping local preview");
      }
    }
    state.resume = { name: file.name, size: file.size, type: file.type, skills: ["Python", "JavaScript", "React", "SQL"] };
    saveState();
    render();
    toast("Resume uploaded successfully");
  });

  // Re-analyze CV
  document.querySelector("#btn-reanalyze-cv")?.addEventListener("click", async () => {
    if (apiToken() && state.resume) {
      try {
        const result = await apiRequest("/resumes/reanalyze", { method: "POST" });
        state.resume = {
          ...state.resume,
          skills: result.skills || [],
          parsed_data: result.parsed_data || null,
        };
        saveState();
        loadJobsFromApi();
        render();
        toast("Resume re-analyzed by Gemini AI successfully!");
      } catch (err) {
        toast("Re-analysis failed");
      }
    }
  });

  // Jobs filter & search events
  document.querySelectorAll("[data-job-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.jobsFilter = btn.dataset.jobFilter;
      document.querySelectorAll("[data-job-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateJobsGrid();
    });
  });

  document.querySelectorAll("[data-job-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.jobsTab = btn.dataset.jobTab;
      document.querySelectorAll("[data-job-tab]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      loadJobsFromApi();
      updateJobsGrid();
    });
  });

  document.querySelector("#btn-toggle-matched")?.addEventListener("click", () => {
    state.jobsTab = state.jobsTab === "matched" ? "all" : "matched";
    loadJobsFromApi();
    render();
  });

  const jobsSearchInput = document.querySelector("#jobs-search");
  if (jobsSearchInput) {
    jobsSearchInput.addEventListener("input", (e) => {
      state.jobsQuery = e.target.value;
      clearTimeout(jobsSearchDebounceTimer);
      jobsSearchDebounceTimer = setTimeout(() => {
        updateJobsGrid();
      }, 150);
    });
  }

  attachJobCardListeners();

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
  try {
    app.innerHTML = user() ? shell() : auth();
    bindEvents();
  } catch (err) {
    console.error("Render error:", err);
    // Graceful fallback to prevent white blank page
    app.innerHTML = `
      <div style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#ffffff;font-family:sans-serif">
        <div style="background:#fff;padding:32px;border-radius:18px;max-width:480px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.06)">
          <div style="font-size:36px;margin-bottom:12px">🚀</div>
          <h2 style="margin:0 0 8px">CareerPilot AI Ready</h2>
          <p style="color:#666;font-size:13px;margin:0 0 20px">Click below to enter preview mode or log in to explore all features.</p>
          <button class="btn btn-primary" onclick="localStorage.setItem('careerpilot_user', JSON.stringify({name:'Demo User', email:'user@example.com'}));location.reload()">Start CareerPilot &nbsp; ↗</button>
        </div>
      </div>
    `;
  }
}

render();
if (user()) {
  loadCoursesFromApi();
  loadJobsFromApi();
  if (apiToken()) {
    apiRequest("/resumes/latest").then((res) => {
      if (res) {
        state.resume = {
          id: res.id,
          name: res.original_filename,
          size: res.size_bytes,
          type: res.mime_type,
          skills: res.skills || [],
          parsed_data: res.parsed_data || null,
        };
        saveState();
        loadJobsFromApi();
        render();
      }
    }).catch(() => {});
  }
}
