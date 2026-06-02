/**
 * Site-wide content + contact info. Edit values here to update the whole site.
 */
export const site = {
  name: "Nik Farees",
  role: "Software Engineer",
  domain: "fareeslab.dev",
  url: "https://fareeslab.dev",

  heroCopy:
    "I build backend systems and web apps that hold up in production. Mostly Laravel and Next.js, shipped with Docker and a CI/CD pipeline behind them.",

  // Small badges shown in the hero.
  badges: ["Laravel", "Next.js", "Docker", "MySQL", "Filament"],

  // Terminal typing effect lines (hero, right column).
  terminalLines: [
    "fareeslab.dev",
    "> building backend systems...",
    "> deploying web applications...",
    "> ready.",
  ],

  about:
    "Nik Farees is a Software Engineer who builds practical, maintainable web applications and gets them into production. Most of his work is backend engineering against database-driven systems, with enough frontend and Docker-based deployment to take a project from an empty repo to a running service.",

  aboutLead:
    "A backend-leaning engineer who ships maintainable software and keeps it running in production.",

  experience: [
    {
      title: "Software Developer",
      company: "Latitude Innovation Sdn. Bhd.",
      period: "Mar 2026 – Present",
      detail:
        "Built and shipped backend features across 6+ production systems with Laravel, Filament, Docker, and MySQL. Set up GitHub Actions CI/CD across 3+ repositories, which took manual deployment steps to zero.",
    },
    {
      title: "Web Developer (Intern)",
      company: "Latitude Innovation Sdn. Bhd.",
      period: "Sep 2025 – Feb 2026",
      detail:
        "Built the real-time auction backend that held up for 100+ concurrent users and cut post-launch issues by 30%. Configured DNS, server environments, and SMTP for 10+ client websites.",
    },
    {
      title: "Lecturer Assistant",
      company: "Universiti Kuala Lumpur (MIIT)",
      period: "Oct 2023 – Mar 2024",
      detail:
        "Supported weekly lectures and labs for 50+ students with 1-on-1 debugging and programming help. Prepared lab exercises and graded assignments over 6 months.",
    },
  ],

  education: [
    {
      degree: "Bachelor of IT (Hons) in Software Engineering",
      institution: "Universiti Kuala Lumpur (MIIT)",
      period: "Sep 2022 – Feb 2026",
      result: "CGPA 3.81",
    },
    {
      degree: "Foundation in Computer Technology",
      institution: "Universiti Kuala Lumpur (MIIT)",
      period: "Aug 2021 – Aug 2022",
      result: "CGPA 3.93",
    },
  ],

  certifications: [
    { name: "Google Project Management", issuer: "Coursera" },
    { name: "Azure AI Fundamentals", issuer: "Microsoft Certified" },
    { name: "CompTIA Cloud+", issuer: "CompTIA" },
    { name: "IT Essentials", issuer: "Cisco" },
    { name: "Top Coders 2024: Python Programming", issuer: "Competition" },
    { name: "SwiftUI / iOS", issuer: "Certification" },
  ],

  // Shown together under the "Achievements" tab — two labelled groups.
  awards: [
    { title: "Dean's List Award", detail: "Semesters 1–6" },
    { title: "Best Student Award", detail: "Foundation in Information Technology" },
    { title: "GreenCity AR Competition — Silver Award", detail: "Augmented Reality green-city prototype" },
    // Trimmed to keep the portfolio tech-focused. Uncomment to show:
    // { title: "Best Student Award", detail: "Kursus Kejurulatihan Silat" },
    // { title: "Black Belt Taekwondo · Red Belt Silat", detail: "Martial arts achievements" },
  ],

  activities: [
    { title: "MARA Mentorship Program", detail: "Direct access to CEOs and senior executives across industries" },
    { title: "Innovation TVET Competition", detail: "Built and pitched a tech solution to a real-world problem" },
    { title: "Debate Bootcamp", detail: "Structured argumentation and public speaking practice" },
    // Trimmed (entrepreneurship-leaning). Uncomment to show:
    // { title: "Online Business Challenge", detail: "Developed and presented an online business model" },
    // { title: "Program Usahawan Peranti SPACE", detail: "Entrepreneurship development program" },
  ],

  contact: {
    email: "nfarees.faizal@gmail.com",
    github: "https://github.com/NikFarees",
    githubLabel: "github.com/NikFarees",
    linkedin: "https://www.linkedin.com/in/nikfarees/",
    linkedinLabel: "linkedin.com/in/nikfarees",
    phone: "+601175112905",
    phoneLabel: "+60 11-7511 2905",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Background", href: "#background" },
] as const;
