import { SiteContent } from "./types";

export const content: SiteContent = {
  name: "Matin Gathani",
  role: "Software + Data + AI Engineer",
  summary:
    "AI/ML-focused software engineer with production experience in NLP pipelines, REST API integrations, and full-stack delivery. I care about clean abstractions, testing, and performance, and I enjoy building systems that move data reliably end-to-end.",
  recruiterIntro:
    "Hi - I'm Matin Gathani, a CS student focused on AI/ML pipelines and backend systems. I've built production ML/NLP workflows, integrated REST APIs, and delivered full-stack features on team projects. I'm looking for software/AI internship opportunities where I can contribute clean, tested, and well-documented code.",
  impactMetrics: [
    { label: "Students mentored", value: 180, suffix: "+" },
    { label: "Code defects diagnosed", value: 1000, suffix: "+" },
    { label: "Records processed", value: 10000, suffix: "+" },
    { label: "Features delivered", value: 10, suffix: "+" },
  ],
  skillProficiencies: [
    { name: "Python", value: 94 },
    { name: "Java", value: 90 },
    { name: "C++", value: 88 },
    { name: "JavaScript", value: 89 },
    { name: "SQL", value: 87 },
    { name: "HTML5", value: 92 },
    { name: "CSS3", value: 86 },
    { name: "React", value: 85 },
    { name: "Docker", value: 83 },
    { name: "Git", value: 91 },
  ],
  contact: {
    email: "mgathan1@asu.edu",
    phone: "4805722372",
    location: "Tempe, AZ",
    linkedin: "https://www.linkedin.com/in/matin-gathani-185a7a192",
    github: "https://github.com/matingathani",
  },
  education: {
    school: "Arizona State University",
    location: "Tempe, AZ",
    dates: "Aug 2022 - May 2026",
    degree: "B.S. in Computer Science",
    gpa: "3.74",
  },
  experience: [
    {
      role: "Engineering Tutor",
      company: "Arizona State University",
      location: "Tempe, AZ",
      dates: "Aug 2024 - Present",
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
    {
      role: "Software Engineer",
      company: "ASU Industry Capstone · Arizona State University",
      location: "Tempe, AZ",
      dates: "Jan 2025 - Dec 2025",
      problem:
        "Live production platform serving an industry sponsor was hit by a crypto-mining malware injection via the Docker build pipeline, while the team also lacked a CI/CD system, had no uptime monitoring, and was blocked by a high-severity CVE in the xlsx dependency that failed the security audit.",
      action:
        "Detected and contained the malware attack: identified the injection vector, hardened the Dockerfile with targeted COPY exclusions and /tmp cleanup, wrote automated malware detection scripts, and authored a security incident response runbook. Built a 24/7 monitoring and auto-recovery daemon (systemd service, 60-second health checks, automatic container restart on failure). Designed and shipped a GitHub Actions CI/CD pipeline — build → push to GHCR → SSH webhook deploy — cutting deployment time from ~15 min manual to ~2 min automated. Integrated Microsoft Graph API for transactional email (project approval notifications, CC routing, HTML templates). Replaced the vulnerable xlsx library with ExcelJS across all API routes and admin scripts, and eliminated all TypeScript any types across the codebase to unblock a CI lint gate that had been blocking merges.",
      impact:
        "Server recovered from active malware attack with zero data loss; no recurrence after hardening. Deployment pipeline went from manual SSH sessions to fully automated. CI lint gate unblocked, enabling clean merges. Email system enabled sponsor communication workflows that previously required manual intervention.",
      tools: ["Next.js", "TypeScript", "Docker", "GitHub Actions", "MySQL", "Microsoft Graph API"],
    },
  ],
  projects: [
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
      slug: "capstone-sponsor-web-platform",
      name: "Capstone Sponsor Web Platform",
      dates: "Jan 2025 - Dec 2025",
      category: "Full-stack",
      overview:
        "Industry-sponsored web platform delivered by an Agile capstone team with RESTful API integrations.",
      responsibilities: [
        "Implemented 10+ frontend and backend features across a multi-member Agile team.",
        "Integrated RESTful APIs to support real-time data exchange and delivered 20+ code reviews.",
      ],
      techStack: ["REST APIs", "Git", "GitHub", "Agile"],
      challenges: [
        "Coordinating across sprints while maintaining code quality and documentation.",
        "Aligning delivery with sponsor requirements and milestones.",
      ],
      results: ["100% on-time milestone delivery across six sprints."],
      architecture: [
        "Frontend and backend services integrated with REST APIs for synchronized updates.",
        "Team workflows enforced through GitHub reviews and release checkpoints.",
      ],
      features: [
        "End-to-end feature delivery with API integration checkpoints.",
        "Documentation-ready handoff for sponsor review cycles.",
      ],
      contributions: [
        "Led code reviews and coordinated API integration tasks.",
        "Shipped features across UI and backend layers.",
      ],
    },
  ],
  skills: [
    {
      title: "Programming, AI, Data",
      skills: [
        "Python",
        "Java",
        "C++",
        "OOP",
        "Data Structures & Algorithms",
        "Pandas",
        "NumPy",
        "Model Training & Evaluation",
        "Feature Engineering",
        "NLP",
      ],
      proof: "Applied in ML/NLP pipeline work at Musikaar and in tutoring sessions across core CS courses.",
    },
    {
      title: "Backend, APIs, Testing",
      skills: [
        "RESTful APIs",
        "API Integration & Validation",
        "Postman",
        "Unit & Integration Testing",
        "Debugging",
        "Performance Optimization",
      ],
      proof: "Built and validated API endpoints in the data integration system and capstone sponsor platform.",
    },
    {
      title: "Data & Databases",
      skills: ["SQL", "Database Design", "Query Optimization", "Data Cleaning & Transformation"],
      proof: "Optimized SQL queries and schemas in the medical record management platform.",
    },
    {
      title: "DevOps & Tooling",
      skills: ["Git", "GitHub", "Docker", "CI/CD", "Linux", "Shell Scripting"],
      proof: "Managed 150+ commits and structured GitHub workflows for capstone delivery.",
    },
    {
      title: "Product & Practices",
      skills: [
        "UX/UI Design",
        "Code Refactoring",
        "Code Reviews",
        "Technical Documentation",
        "Secure API Practices",
        "Input Validation",
      ],
      proof: "Documented ML workflows at Musikaar and led code review cadence in capstone.",
    },
    {
      title: "Frontend & Full-stack",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Web Design"],
      proof: "Built responsive UI for AI integrations and a full-stack medical record system.",
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
      title: "Engineering Tutor",
      description: "Mentored 180+ students across 300+ sessions",
      date: "2024 - Present",
      category: "other",
      icon: "🎓",
    },
    {
      title: "Data Intern",
      description: "Improved processing efficiency by 40%",
      date: "2024",
      category: "other",
      icon: "💼",
    },
    {
      title: "Capstone Project",
      description: "100% on-time milestone delivery",
      date: "2025",
      category: "other",
      icon: "🚀",
    },
  ],
};
