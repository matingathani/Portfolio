export const resume = {
  name: "Matin Gathani",
  title: "AI / Software Engineering Student with Real Production Experience",
  contact: {
    phone: "4805722372",
    email: "mgathan1@asu.edu",
    linkedin: "https://www.linkedin.com/in/matin-gathani-185a7a192",
    github: "https://github.com/matingathani",
    location: "Tempe, AZ",
  },
  summary:
    "AI/ML-focused Project Intern and Engineering Tutor with a strong foundation in computer science and a minor in data science. Early-career professional experience developing machine learning models for HRMS using Python, NLP, and tokenization, as well as integrating APIs and improving data processing workflows.",
  education: {
    school: "Arizona State University",
    location: "Tempe, AZ",
    dates: "Aug 2022 – May 2026",
    degree: "B.S. in Computer Science",
    gpa: "3.74",
  },
  experience: [
    {
      role: "Engineering Tutor",
      company: "Arizona State University",
      location: "Tempe, AZ",
      dates: "Aug 2024 – Present",
      problem: "Students struggled with debugging, testing, and performance issues across Java, C++, and Assembly projects.",
      action:
        "Mentored 180+ CS students across 300+ tutoring sessions, diagnosing 1,000+ code defects and reinforcing data structures, algorithms, and time–space complexity. Implemented JUnit-based testing workflows and debugging best practices.",
      impact:
        "Improved project quality and exam performance by 25%, increased test coverage by 20%, and reduced runtime failures across GitHub-hosted student projects.",
      tools: ["Java", "C++", "Assembly", "JUnit", "Git/GitHub"],
    },
    {
      role: "Data Intern",
      company: "Musikaar",
      location: "Ahmedabad, India",
      dates: "May 2024 – Aug 2024",
      problem: "Manual HR data workflows and unstable NLP pipelines reduced throughput and reliability for HRMS datasets.",
      action:
        "Engineered Python-based ML and NLP pipelines, designed preprocessing/tokenization workflows, and built responsive HTML/CSS interfaces for AI integrations. Authored technical and testing documentation to streamline onboarding.",
      impact:
        "Reduced manual processing effort by 40% across 10,000+ records and improved model accuracy and stability by 20%. Delivered 3+ production-ready AI integrations and 15+ pages of documentation.",
      tools: ["Python", "NLP", "Tokenization", "HTML", "CSS", "Documentation"],
    },
    {
      role: "Capstone Sponsor Integration",
      company: "Arizona State University",
      location: "Tempe, AZ",
      dates: "Jan 2025 – Dec 2025",
      problem: "An industry-sponsored capstone required production-grade delivery with consistent collaboration and technical governance.",
      action:
        "Established Git/GitHub workflows, managed 150+ commits, and conducted 20+ code reviews. Built frontend and backend features and integrated RESTful APIs across a multi-member Agile team.",
      impact:
        "Delivered 10+ features and achieved 100% on-time milestone delivery across six sprints with clear documentation and review discipline.",
      tools: ["Git", "GitHub", "REST APIs", "Agile", "Code Reviews"],
    },
  ],
  skills: {
    programmingAiData: [
      "Python",
      "Java",
      "C++",
      "Object-Oriented Programming (OOP)",
      "Data Structures & Algorithms",
      "Pandas",
      "NumPy",
      "Machine Learning Model Training & Evaluation",
      "Feature Engineering",
      "Natural Language Processing (NLP)",
    ],
    backendApisTesting: [
      "RESTful APIs",
      "API Integration & Response Validation",
      "Postman",
      "Unit Testing",
      "Integration Testing",
      "Debugging",
      "Performance Optimization",
      "Exception Handling",
    ],
    dataDatabases: ["SQL", "Database Design", "Query Optimization", "Data Cleaning & Transformation"],
    devOpsTooling: [
      "Git",
      "GitHub",
      "Docker",
      "Containerization",
      "CI/CD",
      "Linux Kernel",
      "Shell Scripting",
    ],
    softwarePractices: [
      "UX Design",
      "UI Design",
      "Code Refactoring",
      "Code Reviews",
      "Technical Documentation",
      "Authentication & Authorization Basics",
      "Secure API Practices",
      "Input Validation",
    ],
    businessTools: ["Power BI", "Power Automate", "Excel (Data Analysis)", "PowerPoint", "Workflow"],
    frontendFullstack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Responsive Web Design",
      "Frontend–Backend Integration",
    ],
  },
  projects: [
    {
      slug: "rest-api-based-data-integration-system",
      name: "REST API-Based Data Integration System",
      dates: "Jan 2025 – May 2025",
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
    },
    {
      slug: "medical-record-management-system",
      name: "Medical Record Management System",
      dates: "Aug 2023 – Dec 2023",
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
    },
    {
      slug: "capstone-sponsor-web-platform",
      name: "Capstone Sponsor Web Platform",
      dates: "Jan 2025 – Dec 2025",
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
    },
  ],
  recruiterIntro:
    "Hi — I’m Matin Gathani, a CS student focused on AI/ML pipelines and backend systems. I’ve built production ML/NLP workflows, integrated REST APIs, and delivered full‑stack features on team projects. I’m looking for software/AI internship opportunities where I can contribute clean, tested, and well‑documented code."
};

export type Resume = typeof resume;
