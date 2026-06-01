/**
 * Site-wide content + contact info. Edit values here to update the whole site.
 */
export const site = {
  name: "Nik Farees",
  role: "Software Engineer",
  domain: "fareeslab.dev",
  url: "https://fareeslab.dev",

  heroCopy:
    "Building reliable backend systems, scalable web applications, and deployment-ready digital products with Laravel, Next.js, Docker, and modern engineering workflows.",

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
    "Nik Farees is a Software Engineer focused on building practical, maintainable, and deployment-ready web applications. His work combines backend engineering, modern frontend frameworks, database-driven systems, Docker-based workflows, and production-focused problem solving.",

  aboutLead:
    "A backend-leaning engineer who ships maintainable, production-ready software.",

  experience: [
    {
      title: "Software Developer",
      company: "Latitude Innovation Sdn. Bhd.",
      period: "Mar 2026 – Present",
      detail:
        "Built and shipped backend features across 6+ production systems using Laravel, Filament, Docker, and MySQL. Configured GitHub Actions CI/CD pipelines across 3+ repositories, cutting manual deployment steps to zero.",
    },
    {
      title: "Web Developer (Intern)",
      company: "Latitude Innovation Sdn. Bhd.",
      period: "Sep 2025 – Feb 2026",
      detail:
        "Engineered the real-time auction backend supporting 100+ concurrent users, reducing post-launch issues by 30%. Configured DNS, server environments, and SMTP for 10+ client websites.",
    },
    {
      title: "Lecturer Assistant",
      company: "Universiti Kuala Lumpur (MIIT)",
      period: "Oct 2023 – Mar 2024",
      detail:
        "Supported weekly lectures and labs for 50+ students, providing 1-on-1 debugging and programming guidance. Prepared lab exercises and graded assignments across 6 months.",
    },
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
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
