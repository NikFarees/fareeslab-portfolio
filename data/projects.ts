/**
 * Project data. Add a new object to this array and a card + detail page appear
 * automatically (the detail route is generated from `slug`).
 */
export type ProjectCategory = "Client Project" | "Personal Project";
export type Visibility = "Private" | "Public";

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string; // short, shown on the card
  overview: string; // longer, shown on the detail page
  role: string;
  contribution: string[]; // bullet points on the detail page
  stack: string[];
  visibility: Visibility;
  // Only set links for public projects. Private projects omit them entirely.
  links?: { github?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "online-auction-platform",
    category: "Client Project",
    title: "Online Auction Platform",
    description:
      "A real-time auction platform with live bidding, built to handle 100+ concurrent users with all transactional data secured in MySQL.",
    overview:
      "A production auction platform engineered for one of Malaysia's largest online auctions. The system handles real-time bidding under heavy concurrent load, keeping bids consistent and every transaction recorded reliably. The backend was built for resilience during live auction events where many users compete on the same lots simultaneously.",
    role: "Backend Software Developer",
    contribution: [
      "Engineered the real-time bidding backend supporting 100+ concurrent users during live auctions.",
      "Modelled and secured all transactional and bid data in MySQL for consistency under load.",
      "Reduced post-launch issues by ~30% through testing and hardening of backend services.",
      "Containerised the stack with Docker for reproducible deployment.",
    ],
    stack: ["Laravel", "Filament", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "school-donation-system",
    category: "Client Project",
    title: "School Donation Management System",
    description:
      "A donation (Sumbangan) management system built from scratch — backend features, plus CI/CD and staging/production environments set up end-to-end.",
    overview:
      "A school donation (Sumbangan) management system started from a fresh project and taken to production. Beyond backend feature work, this project covered the full delivery pipeline: GitHub Actions CI/CD, plus separate staging and production server environments configured from the ground up.",
    role: "Backend Software Developer",
    contribution: [
      "Bootstrapped the project from scratch and developed backend features end-to-end.",
      "Set up the GitHub Actions CI/CD pipeline, cutting manual deployment steps to zero.",
      "Configured separate staging and production server environments.",
      "Built the admin interface for managing donations and records with Filament.",
    ],
    stack: ["Laravel", "Filament", "GitHub Actions", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "air-conditioning-service-system",
    category: "Client Project",
    title: "Air-Conditioning Service Management System",
    description:
      "An internal system for managing air-conditioning service jobs — backend features and an admin interface with an automated deployment workflow.",
    overview:
      "An internal service-management system for air-conditioning operations, one of three related internal systems delivered. It streamlines how service jobs are tracked and managed day to day, backed by an admin interface and an automated CI/CD workflow. Collectively these systems reduced admin task time by ~25%.",
    role: "Backend Software Developer",
    contribution: [
      "Delivered backend features for tracking and managing air-conditioning service jobs.",
      "Built the admin interface for operational and content management with Filament.",
      "Set up the CI/CD workflow for automated, repeatable deployments.",
      "Helped reduce admin task time by ~25% and resolved logged issues via GitHub Issues.",
    ],
    stack: ["Laravel", "Filament", "GitHub Actions", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "gym-management-system",
    category: "Client Project",
    title: "Gym Management System",
    description:
      "An internal gym management system with backend features, an admin panel, and a CI/CD-driven deployment workflow.",
    overview:
      "An internal gym management system, one of three related internal systems delivered. It centralises gym operations behind a clean admin panel and ships through an automated deployment pipeline. Collectively these systems reduced admin task time by ~25%.",
    role: "Backend Software Developer",
    contribution: [
      "Delivered backend features for the gym's day-to-day operations.",
      "Built the admin panel for managing members and operational data with Filament.",
      "Set up the CI/CD workflow for automated deployments.",
      "Helped reduce admin task time by ~25% and resolved logged issues via GitHub Issues.",
    ],
    stack: ["Laravel", "Filament", "GitHub Actions", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "car-service-warranty-system",
    category: "Client Project",
    title: "Car Service & Warranty Management System",
    description:
      "An internal system for managing car service jobs and warranty records, with backend features, an admin interface, and CI/CD.",
    overview:
      "An internal car service and warranty management system, one of three related internal systems delivered. It tracks service jobs and warranty records in one place, backed by an admin interface and an automated CI/CD workflow. Collectively these systems reduced admin task time by ~25%.",
    role: "Backend Software Developer",
    contribution: [
      "Delivered backend features for managing car service jobs and warranty records.",
      "Built the admin interface for operational and content management with Filament.",
      "Set up the CI/CD workflow for automated deployments.",
      "Helped reduce admin task time by ~25% and resolved logged issues via GitHub Issues.",
    ],
    stack: ["Laravel", "Filament", "GitHub Actions", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "pennywise",
    category: "Personal Project",
    title: "PennyWise",
    description:
      "A personal daily finance tracker — log income, recurring bills, expenses, debts, and investments with a running daily balance and an AI assistant.",
    overview:
      "PennyWise is a personal daily financial tracker, built end-to-end as a solo project. Users log income (with Malaysian statutory deductions like EPF, SOCSO, and EIS auto-calculated), set recurring bills, record daily expenses, and track debts, investments, and an emergency fund — all tied together by a running daily balance with carry-forward overspend logic. A built-in AI assistant lets users log entries and ask questions in natural language.",
    role: "Full-Stack Developer",
    contribution: [
      "Built the full stack solo — Next.js App Router frontend, Supabase Postgres backend, and Server Actions for every mutation.",
      "Designed the database schema with row-level security (RLS) so each user can only access their own data.",
      "Implemented daily budgeting with carry-forward overspend logic and Malaysian statutory deduction (EPF/SOCSO/EIS) calculations.",
      "Built an AI assistant (Google Gemini) with a propose-then-confirm tool-use flow for logging entries and answering questions in natural language.",
      "Hardened auth and security: Cloudflare Turnstile CAPTCHA, optional TOTP MFA, Upstash rate limiting, and a strict Content-Security-Policy.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Gemini AI"],
    visibility: "Public",
    links: {
      github: "https://github.com/NikFarees/pocket-balance",
      live: "https://pennywise.fareeslab.dev",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
