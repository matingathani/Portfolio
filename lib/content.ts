import { SiteContent } from "./types";

export const content: SiteContent = {
  name: "Matin Gathani",
  role: "Data, AI & Software Engineer",
  summary:
    "Software and data engineer. I've had 28 pull requests merged into Cloudflare's developer toolkit, built a student-matching platform for ASU's capstone program, and engineered NLP pipelines that move data reliably end to end. Studying MSc Artificial Intelligence (Financial Analytics) at Imperial Business School.",
  recruiterIntro:
    "Hi, I'm Matin Gathani. I build across the stack and the data pipeline: 28 merged pull requests to Cloudflare's open-source toolkit (Wrangler, Miniflare, Vite plugin), full-stack platform delivery, and production ML and NLP work. I'm studying MSc Artificial Intelligence (Financial Analytics) at Imperial Business School and looking for software, data and analytics roles.",
  hero: {
    currently: "MSc at Imperial Business School · Open to internships and graduate roles",
    headline: "I build and fix the tools developers rely on.",
    intro:
      "I'm Matin Gathani, a software and data engineer. I've had 28 pull requests merged into Cloudflare's developer toolkit, built a student-matching platform for ASU's capstone program, and I'm now studying AI and financial analytics at Imperial in London.",
  },
  lookingFor:
    "I'm looking for internships and graduate roles in software engineering, data and applied AI, where I can ship clean, tested code. Email is the quickest way to reach me.",
  why:
    "I like fixing the small things that quietly break someone's day: a command that prints the wrong thing, a crash on a large output, a test that only fails on Windows. Open source taught me how maintainers think. Tutoring taught me to explain hard ideas plainly. Now I'm adding machine learning and financial analytics to that toolkit at Imperial.",
  highlights: [
    {
      title: "Cloudflare developer toolkit",
      detail: "28 merged fixes to Wrangler, Miniflare and the Vite plugin",
    },
    {
      title: "ASU Capstone platform",
      detail: "Student and sponsor matching, 5th at the Capstone Showcase",
    },
    {
      title: "Teaching",
      detail: "Tutored 180+ students across 300+ sessions in Java, C++ and Assembly",
    },
  ],
  aboutIntro: [
    "I'm Matin. I finished my B.S. in Computer Science at Arizona State University in May 2026 with a 3.74 GPA, and I'm now studying MSc Artificial Intelligence (Financial Analytics) at Imperial Business School in London.",
    "The work I'm proudest of is the unglamorous kind: 28 merged fixes to Cloudflare's developer toolkit, including a Workflows crash I traced to a SQLite size limit, and a capstone platform that kept running through a malware incident.",
    "I also tutored 180+ students in Java, C++ and Assembly, and I still write code and documentation with that reader in mind.",
  ],
  impactMetrics: [
    { label: "Merged OSS fixes", value: 28, suffix: "" },
    { label: "Students mentored", value: 180, suffix: "+" },
    { label: "Code defects diagnosed", value: 1000, suffix: "+" },
    { label: "Records processed", value: 10000, suffix: "+" },
  ],
  skillProficiencies: [
    { name: "Python", value: 95 },
    { name: "SQL", value: 90 },
    { name: "Power BI", value: 87 },
    { name: "Excel", value: 85 },
    { name: "JavaScript / TypeScript", value: 80 },
    { name: "Java", value: 75 },
    { name: "Docker", value: 72 },
    { name: "PostgreSQL", value: 70 },
    { name: "C++", value: 55 },
    { name: "AWS", value: 45 },
  ],
  expertise: [
    {
      title: "Data & Analytics",
      description:
        "Turning messy data into decisions: SQL modelling, Power BI dashboards, Python pipelines, and the analytics coursework behind an Imperial MSc.",
      tags: ["Power BI", "SQL", "Python", "Pandas", "Excel"],
    },
    {
      title: "Open-Source Engineering",
      description:
        "28 merged bug fixes to Cloudflare's developer toolkit (Wrangler CLI, Miniflare and the Vite plugin), plus ongoing work across the ecosystem.",
      tags: ["TypeScript", "Node.js", "Cloudflare Workers", "Vitest", "Git"],
    },
    {
      title: "AI & Full-Stack Delivery",
      description:
        "Production NLP pipelines and full-stack platforms, Next.js and TypeScript front to back, with CI/CD, monitoring and incident response.",
      tags: ["Next.js", "NLP", "LLMs", "Docker", "CI/CD"],
    },
  ],
  toolkit: [
    "Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "React", "Next.js", "Node.js", "Docker",
    "Power BI", "Excel", "Pandas", "NumPy", "NLP", "PostgreSQL", "AWS", "REST APIs", "Git", "CI/CD",
  ],
  skillLevels: [
    {
      level: "Advanced",
      skills: ["C++", "Python", "SQL", "Power BI", "Excel", "Tableau"],
    },
    {
      level: "Intermediate",
      skills: [
        "JavaScript / TypeScript",
        "Java",
        "Docker",
        "GitHub Actions CI/CD",
        "PostgreSQL",
        "MySQL",
      ],
    },
    {
      level: "Basic",
      skills: ["AWS (EC2, S3, Lambda)"],
    },
  ],
  languages: [
    { name: "Gujarati", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
  contact: {
    email: "mg3246@imperial.ac.uk",
    phone: "4805722372",
    location: "Tempe, AZ · London, UK",
    linkedin: "https://www.linkedin.com/in/matin-gathani-185a7a192",
    github: "https://github.com/matingathani",
  },
  education: [
    {
      school: "Imperial Business School",
      location: "London, United Kingdom",
      dates: "Sep 2026 - Jan 2028",
      degree: "MSc Artificial Intelligence (Financial Analytics)",
      modules: [
        "Advanced Machine Learning",
        "Generative AI and Large Language Models",
        "Causal Modelling for Business Analytics",
      ],
    },
    {
      school: "Arizona State University",
      location: "Tempe, AZ",
      dates: "Aug 2022 - May 2026",
      degree: "B.S. in Computer Science",
      gpa: "3.74",
    },
  ],
  experience: [
    {
      role: "Open-Source Contributor",
      company: "Cloudflare",
      location: "Remote",
      dates: "Mar 2026 - Present",
      problem:
        "Cloudflare's developer toolkit (Wrangler CLI, Miniflare, Vite plugin) had reliability gaps - CLI crashes on file-handling errors, a Workflows crash on large step outputs, output-polluting log lines, and flaky Windows CI.",
      action:
        "Contributed 28 merged bug fixes across the toolkit. Traced a Cloudflare Workflows crash on large data outputs to a SQLite size limit and shipped a fix that kept workflows from failing. Removed two command-line bugs that broke automation scripts - a stray success message polluting stdout in `kv bulk get` and an AI-skills prompt corrupting shell autocomplete. Resolved recurring CLI crashes (EMFILE on the assets watcher, source-map failures on truncated error chunks, unhandled rejections on hot reload) and stabilized unreliable Windows CI tests.",
      impact:
        "28 merged PRs improving the reliability of tools used across Cloudflare's developer ecosystem, plus clearer error messages for D1, DO migrations, and _routes.json misconfiguration.",
      tools: ["TypeScript", "Node.js", "Wrangler", "Miniflare", "Vitest", "Cloudflare Workers"],
    },
    {
      role: "Export Market Research",
      company: "Family Stainless Steel Manufacturing Business",
      location: "Ahmedabad, India",
      dates: "May 2026 - Aug 2026",
      problem: "Exploring export markets for a family stainless steel manufacturing business.",
      action:
        "Conducted market research and export buyer analysis, identifying target buyers across Germany, UAE, Singapore, and the US using trade data and competitive benchmarking.",
      impact: "Identified target buyers across four export markets: Germany, UAE, Singapore and the US.",
      tools: ["Market research", "Trade data analysis", "Competitive benchmarking"],
    },
    {
      role: "Software Engineering Specialist",
      company: "ASU Industry Capstone · Arizona State University",
      location: "Tempe, AZ",
      dates: "Jan 2025 - Dec 2025",
      problem:
        "A live production platform serving an industry sponsor - an AI-matching system pairing students with sponsor capstone projects for hundreds of concurrent users - was hit by a crypto-mining malware injection via the Docker build pipeline, while the team also lacked CI/CD, had no uptime monitoring, and was blocked by a high-severity CVE in the xlsx dependency that failed the security audit.",
      action:
        "Built the full-stack platform (Next.js, TypeScript, MySQL) with 8+ backend API features and structured error handling. Detected and contained the malware attack: identified the injection vector, hardened the Dockerfile with targeted COPY exclusions and /tmp cleanup, wrote automated malware detection scripts, and authored a security incident response runbook. Built a 24/7 monitoring and auto-recovery daemon (systemd service, 60-second health checks, automatic container restart on failure). Designed and shipped a GitHub Actions CI/CD pipeline - build → push to GHCR → SSH webhook deploy - cutting deployment time from ~15 min manual to ~2 min automated. Automated Excel catalogue generation with Python data pipelines, cutting data-prep from hours to minutes. Integrated Microsoft Graph API for transactional email, and replaced the vulnerable xlsx library with ExcelJS across all API routes and admin scripts.",
      impact:
        "Placed 5th at ASU's Capstone Showcase. Server recovered from an active malware attack with zero data loss and no recurrence after hardening; deployment went from manual SSH sessions to fully automated; CI lint gate unblocked for clean merges.",
      tools: ["Next.js", "TypeScript", "Docker", "GitHub Actions", "MySQL", "Python", "Microsoft Graph API"],
    },
    {
      role: "Engineering Tutor",
      company: "Arizona State University",
      location: "Tempe, AZ",
      dates: "Aug 2024 - May 2026",
      problem:
        "Students struggled with debugging, testing, and performance issues across Java, C++, and Assembly projects.",
      action:
        "Mentored 180+ CS students across 300+ tutoring sessions, diagnosing 1,000+ code defects and reinforcing data structures, algorithms, and time-space complexity. Implemented JUnit-based testing workflows and debugging best practices.",
      impact:
        "Improved project quality and exam performance by 25%, increased test coverage by 20%, and reduced runtime failures across GitHub-hosted student projects.",
      tools: ["Java", "C++", "Assembly", "JUnit", "Git/GitHub"],
    },
    {
      role: "Data Intern",
      company: "Musikaar",
      location: "Ahmedabad, India",
      dates: "May 2024 - Aug 2024",
      problem:
        "Manual HR data workflows and unstable NLP pipelines reduced throughput and reliability for HRMS datasets.",
      action:
        "Engineered Python-based ML and NLP pipelines, designed preprocessing/tokenization workflows, and built responsive HTML/CSS interfaces for AI integrations. Authored technical and testing documentation to streamline onboarding.",
      impact:
        "Reduced manual processing effort by 40% across 10,000+ records and improved model accuracy and stability by 20%. Delivered 3+ production-ready AI integrations and 15+ pages of documentation.",
      tools: ["Python", "NLP", "Tokenization", "HTML", "CSS", "Documentation"],
    },
  ],
  projects: [
    {
      slug: "cloudflare-developer-toolkit-fixes",
      name: "Cloudflare Developer Toolkit Fixes",
      dates: "Mar 2026 - Present",
      category: "Backend",
      overview:
        "28 merged bug fixes to Cloudflare's open-source developer toolkit - Wrangler CLI, Miniflare, and the Vite plugin.",
      responsibilities: [
        "Traced and fixed a Cloudflare Workflows crash on large step outputs (SQLITE_TOOBIG).",
        "Removed output-polluting log lines and shell autocomplete corruption from the CLI.",
        "Stabilized flaky Windows CI and hardened file-handling error paths.",
      ],
      techStack: ["TypeScript", "Node.js", "Wrangler", "Miniflare", "Vitest"],
      challenges: [
        "Reproducing environment-specific failures (Windows CI, headless containers, EMFILE limits).",
        "Landing focused fixes in a large monorepo with strict review standards.",
      ],
      results: ["28 merged pull requests improving reliability across the Cloudflare developer ecosystem."],
      architecture: [
        "Fixes span Wrangler command handlers, the Miniflare local runtime, and the Vite plugin's module resolution.",
        "Each change ships with regression tests in the workers-sdk Vitest suites.",
      ],
      features: [
        "Clearer error messages for D1 migrations, Durable Object migrations, and _routes.json.",
        "Safer defaults for logging, hot reload, and asset watching.",
      ],
      contributions: [
        "Authored 28 merged PRs plus open work on Miniflare Set-Cookie handling and signal exit codes.",
      ],
    },
    {
      slug: "capstone-sponsor-web-platform",
      name: "Capstone Sponsor Web Platform",
      dates: "Jan 2025 - Dec 2025",
      category: "Full-stack",
      overview:
        "Industry-sponsored AI-matching platform (Next.js, TypeScript, MySQL) pairing students with sponsor capstone projects for hundreds of concurrent users. Placed 5th at ASU's Capstone Showcase.",
      responsibilities: [
        "Built 8+ backend API features with structured error handling.",
        "Contained a crypto-mining malware attack on the Docker build pipeline and hardened the image.",
        "Shipped a GitHub Actions CI/CD pipeline and a 24/7 monitoring/auto-recovery daemon.",
      ],
      techStack: ["Next.js", "TypeScript", "MySQL", "Docker", "GitHub Actions", "Python"],
      challenges: [
        "Recovering a live platform from an active malware injection with zero data loss.",
        "Replacing a high-severity xlsx CVE across every API route and admin script.",
      ],
      results: [
        "5th at ASU's Capstone Showcase; deployment time cut from ~15 min to ~2 min.",
      ],
      architecture: [
        "Next.js app on a hardened Docker image, deployed build → GHCR → SSH webhook.",
        "systemd health-check daemon with 60-second checks and automatic container restart.",
      ],
      features: [
        "AI-matching between students and sponsor projects.",
        "Python-automated Excel catalogue generation, cutting data-prep from hours to minutes.",
      ],
      contributions: [
        "Led the security incident response and CI/CD build-out.",
        "Owned the data pipeline and Microsoft Graph API email integration.",
      ],
    },
    {
      slug: "medical-record-management-system",
      name: "Medical Record Management System",
      dates: "Aug 2023 - Dec 2023",
      category: "Full-stack",
      overview:
        "Containerized full-stack platform for managing and visualizing simulated patient records with role-based access.",
      responsibilities: [
        "Built a containerized full-stack web platform using JavaScript, SQL, and Docker.",
        "Optimized relational database schemas and complex SQL queries to reduce latency and improve reporting.",
      ],
      techStack: ["JavaScript", "SQL", "Docker"],
      challenges: [
        "Balancing data visibility with role-based access controls.",
        "Optimizing queries for reporting performance.",
      ],
      results: ["Managed and visualized 1,000+ simulated patient records with improved query latency."],
      architecture: [
        "Full-stack web app with authenticated roles and a SQL-backed data layer.",
        "Containerized services for repeatable local development and testing.",
      ],
      features: [
        "Role-based access patterns to control record visibility.",
        "Reporting views with optimized SQL queries.",
      ],
      contributions: [
        "Implemented schema updates and performance-focused SQL queries.",
        "Built UI flows for record creation and visualization.",
      ],
    },
    {
      slug: "rest-api-based-data-integration-system",
      name: "REST API-Based Data Integration System",
      dates: "Jan 2025 - May 2025",
      category: "Backend",
      overview:
        "Built a data integration system focused on reliable ingestion and retrieval using REST APIs and structured validation.",
      responsibilities: [
        "Developed and validated 5 RESTful API endpoints for data ingestion and retrieval using Postman and JSON.",
        "Added structured error handling, response validation, and status code management to strengthen API robustness.",
      ],
      techStack: ["REST APIs", "Postman", "JSON"],
      challenges: [
        "Ensuring consistent response schemas for multiple clients.",
        "Maintaining reliable error handling and validation across endpoints.",
      ],
      results: ["Reliable service-to-service communication with validated API responses."],
      architecture: [
        "Client integrations send requests to a REST API gateway with validation and error handling.",
        "Normalized JSON payloads flow through a processing layer and into structured data stores.",
      ],
      features: [
        "Validated ingestion endpoints with consistent schema responses.",
        "Robust status code handling and error messaging.",
      ],
      contributions: [
        "Designed the API response contract and validation logic.",
        "Implemented endpoint tests in Postman for regression coverage.",
      ],
    },
  ],
  skills: [
    {
      title: "Analytics & BI",
      skills: [
        "Power BI",
        "Excel",
        "SQL",
        "Pandas",
        "NumPy",
        "Data Cleaning & Transformation",
        "Causal Modelling",
      ],
      proof: "Advanced Power BI, Excel, and SQL; causal modelling coursework at Imperial. Built Python-driven analytics pipelines in the capstone.",
    },
    {
      title: "AI & ML",
      skills: [
        "Python",
        "NLP",
        "LLMs",
        "Generative AI",
        "Model Training & Evaluation",
        "Feature Engineering",
        "Tokenization",
      ],
      proof: "Production ML/NLP pipeline work at Musikaar; Generative AI and Advanced ML coursework at Imperial.",
    },
    {
      title: "Backend, APIs, Testing",
      skills: [
        "RESTful APIs",
        "Node.js",
        "PostgreSQL",
        "MySQL",
        "API Integration & Validation",
        "Unit & Integration Testing",
        "Debugging",
      ],
      proof: "Built and validated API endpoints in the capstone platform and data integration system.",
    },
    {
      title: "Open Source & DevOps",
      skills: ["Cloudflare Workers", "Wrangler", "Docker", "Git", "GitHub Actions", "CI/CD", "Linux"],
      proof: "28 merged fixes to Cloudflare's workers-sdk; shipped GitHub Actions CI/CD for the capstone platform.",
    },
    {
      title: "Frontend & Full-stack",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Responsive Web Design"],
      proof: "Built the full-stack capstone platform and responsive UI for AI integrations.",
    },
    {
      title: "Product & Practices",
      skills: [
        "Code Reviews",
        "Technical Documentation",
        "Secure API Practices",
        "Input Validation",
        "Incident Response",
        "Agile",
      ],
      proof: "Authored a security incident runbook and ML workflow docs; led code review cadence in the capstone.",
    },
  ],
  testimonials: [
    {
      quote:
        "Matin has been an exceptional tutor, helping me understand complex algorithms and debugging techniques. His patience and clear explanations made a huge difference in my coursework.",
      author: "Student",
      role: "Computer Science Student",
      company: "ASU",
    },
    {
      quote:
        "Working with Matin on our capstone project was seamless. He delivered high-quality code, conducted thorough reviews, and maintained excellent documentation throughout the project.",
      author: "Team Member",
      role: "Capstone Project Team",
      company: "ASU",
    },
    {
      quote:
        "Matin's work on our NLP pipelines significantly improved our data processing efficiency. His attention to detail and technical documentation was outstanding.",
      author: "Supervisor",
      role: "Data Team Lead",
      company: "Musikaar",
    },
  ],
  recentAiTraining: {
    title: "NLP & ML pipeline training",
    description: "Trained and evaluated ML models for HRMS data: preprocessing, tokenization, and production NLP pipelines. Improved model stability and accuracy on real-world HR datasets.",
    date: "2024",
    modelType: "NLP / classification",
    metrics: "~20% accuracy improvement, 40% reduction in manual processing",
  },
  achievements: [
    {
      title: "Cloudflare OSS",
      description: "28 merged fixes to Wrangler, Miniflare & the Vite plugin",
      date: "2026",
      category: "other",
      icon: "🛠️",
    },
    {
      title: "Imperial College London",
      description: "MSc Artificial Intelligence (Financial Analytics), 2026 intake",
      date: "2026",
      category: "other",
      icon: "🎓",
    },
    {
      title: "NSBE 2026 Convention",
      description: "National convention, Baltimore - professional portfolio showcase",
      date: "Mar 2026",
      category: "other",
      icon: "🤝",
    },
    {
      title: "ASU Capstone Showcase",
      description: "5th place",
      date: "2025",
      category: "award",
      icon: "🏆",
    },
    {
      title: "IBM Data Science",
      description: "Professional Certificate (Coursera)",
      date: "2026",
      category: "certification",
      icon: "📜",
    },
    {
      title: "Mathematics for Machine Learning",
      description: "Specialisation, Imperial College London via Coursera",
      date: "2026",
      category: "certification",
      icon: "📐",
    },
    {
      title: "Dean's List",
      description: "Arizona State University - 2022, 2024, 2025, 2026",
      date: "2026",
      category: "award",
      icon: "🌟",
    },
  ],
};
