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
  subtitle?: string; // optional one-liner shown under the title on card + detail page
  overview: string; // longer, shown on the detail page
  role: string;
  contribution: string[]; // bullet points on the detail page
  stack: string[];
  visibility: Visibility;
  // Place images in public/image/projects/<slug>/. main is shown on the card and at top of detail page.
  images?: { main: string; gallery?: string[] };
  // Only set links for public projects. Private projects omit them entirely.
  links?: { github?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "online-auction-platform",
    category: "Client Project",
    title: "Online Auction Platform",
    description:
      "A real-time vehicle auction platform. Live bidding runs over WebSockets so 100+ bidders can compete on the same lot at once without the price going stale.",
    overview:
      "A production auction platform for one of Malaysia's larger online vehicle auctions. Bids travel over a WebSocket layer (Socket.IO on the client, a Ratchet/Pawl socket server on the backend) so every participant sees the current price the moment it changes. The Laravel API handles authentication, payments, and the auction lifecycle, while a separate Next.js portal gives bidders the public-facing experience. The hard part is keeping bids consistent when many people fight over one lot in the final seconds, so the backend is built around that.",
    role: "Backend Software Developer",
    contribution: [
      "Built the real-time bidding backend on a Socket.IO + Ratchet/Pawl socket layer, holding bids consistent for 100+ concurrent users during live events.",
      "Developed the Laravel API with Sanctum token auth, plus Razorpay payment processing and webhook handling for deposits and settlements.",
      "Integrated the GVIS vehicle-data service and ran the auction lifecycle (parallel and bank auctions) through scheduled cron jobs for lot expiry and event checks.",
      "Cut post-launch issues by about 30% by testing and hardening the bidding and payment paths before each event.",
    ],
    stack: ["Laravel", "Sanctum", "Socket.IO", "Next.js", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "school-donation-system",
    category: "Client Project",
    title: "School Donation Management System",
    description:
      "A school donation (Sumbangan) system built from an empty repo to production. Schools post needs, sponsors donate, and admins allocate donations against requests.",
    overview:
      "A donation management system for schools, started from a fresh project and taken all the way to production. Schools register and submit requests for what they need, sponsors register and donate cash or items, and admins match donations to the right requests. Every status change runs through an approval workflow with rejection reasons, and an activity log records who did what. I also owned the delivery pipeline: GitHub Actions CI/CD with separate staging and production servers set up from nothing.",
    role: "Backend Software Developer",
    contribution: [
      "Started the project from an empty repo and built the school, sponsor, request, donation, and allocation domain end to end.",
      "Built approval workflows (with rejection reasons) and an activity audit log so every record change is traceable.",
      "Set up three role-scoped Filament panels for schools, sponsors, and admins, each seeing only what it should.",
      "Configured GitHub Actions CI/CD with separate staging and production servers, taking manual deploy steps to zero.",
    ],
    stack: ["Laravel", "Filament", "GitHub Actions", "MySQL", "Redis", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "air-conditioning-service-system",
    category: "Client Project",
    title: "Air-Conditioning Service Management System",
    description:
      "A multi-vendor air-conditioning service platform. Each vendor sees only its own data, and a service job moves from quotation to approval to a scheduled technician on site.",
    overview:
      "A service-management platform for air-conditioning operations, part of a suite of internal tools I built for the same client. It is multi-tenant: many vendors and branches share one app but each sees only its own customers and jobs. A service order runs a full lifecycle (roughly 47 states) from request to quotation, customer approval, technician assignment, on-site work with photo evidence, then invoicing. Access is governed by role-based permissions, and technician commission is snapshotted when a job closes.",
    role: "Backend Software Developer",
    contribution: [
      "Built multi-tenant isolation so each vendor and branch only accesses its own service orders, customers, and pricing.",
      "Modelled the full service-order lifecycle: quotation, customer approval, technician scheduling and check-ins, and photo-evidence gates before a job can complete.",
      "Set up role-based access control with Filament Shield and Spatie Permission, plus commission and profit snapshots per closed job.",
      "Helped cut admin task time by about 25% across the internal systems and tracked fixes through GitHub Issues.",
    ],
    stack: ["Laravel", "Filament", "Filament Shield", "MySQL", "Redis", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "gym-management-system",
    category: "Client Project",
    title: "Gym Management System",
    description:
      "A gym management system wired to HIKVision door hardware. Members' faces and cards sync to the access controllers, so membership status decides who actually gets through the door.",
    overview:
      "A gym management system built as part of the same internal toolset. What makes it more than a CRUD admin is the HIKVision integration: member records sync to physical face and card access controllers, so a lapsed membership locks the door automatically and every entry is logged. On top of that it handles multi-branch operations, Razorpay payments, and a trainer credit system where members buy session credits and spend them on a specific trainer or a general class.",
    role: "Backend Software Developer",
    contribution: [
      "Integrated HIKVision access control: queued jobs push member face and card data to the door controllers, pull access logs back, and fire alerts on unauthorized entry.",
      "Built a trainer credit and session system where credits are either tied to one trainer or usable for general classes, with strict matching on redemption.",
      "Added Razorpay payment processing and normalized member IC/passport and phone numbers to E.164 on save.",
      "Built multi-branch support so one system runs multiple locations with branch-scoped member records and access profiles.",
    ],
    stack: ["Laravel", "Filament", "HIKVision API", "Razorpay", "MySQL", "Docker"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "car-service-warranty-system",
    category: "Client Project",
    title: "Car Service & Warranty Management System",
    description:
      "A car service and warranty system for a dealer network, synced both ways with Autocount ERP so sales orders, stock, and outstanding balances stay in step.",
    overview:
      "A car service and warranty management system for a dealer network, the third in the same internal suite. The core of it is a two-way Autocount ERP integration: sales orders, items, stock, and debtor balances sync between the app and Autocount on a schedule, and a sales order pushes across when it moves from draft to approved. It also runs a dealer and customer reward-points scheme with redemptions, all behind a Livewire and Filament admin.",
    role: "Backend Software Developer",
    contribution: [
      "Built a two-way Autocount ERP integration: queued jobs and scheduled Artisan commands sync sales orders, items, stock, and outstanding balances, with sync logs for every run.",
      "Modelled the service and warranty records plus a dealer/customer reward-points system with point transactions and redemptions.",
      "Built reactive admin screens with Livewire on top of Filament for day-to-day operations.",
      "Set up GitHub Actions CI/CD that auto-deploys to separate staging and production servers on push.",
    ],
    stack: ["Laravel", "Filament", "Livewire", "MySQL", "Docker", "GitHub Actions"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "nfe-productivity-module",
    category: "Client Project",
    title: "Pembangunan Modul Productivity NFE",
    description:
      "A real-time NFE curriculum builder. Companies build training modules together, fields auto-save as they type, and a live presence bar shows who else is in the same module.",
    overview:
      "A production single-page app for designing Non-Formal Education (NFE) training modules. Companies log in and build structured curricula: programme details, ISCED level, hours, and per-topic content covering learning outcomes, WIL activities, dimension splits (PQCDSM, Flex, Moral), and methodology weighting. A compliance checker validates topic count, total hours, and percentage balances against a V.A.R.I.F checklist before a module can be submitted. Admins get a cross-company view, a paginated activity log, and user management. Fields auto-save with debounce, Supabase Realtime keeps collaborators in sync without reloads, and a presence bar shows who is currently online.",
    role: "Software Developer",
    contribution: [
      "Built the whole frontend as a modular vanilla-JS SPA (NFEApp, UIManager, ModuleManager, TopicManager, DashboardManager, RealtimeManager, PresenceManager) with no framework.",
      "Built the Supabase data layer: PostgreSQL schema for modules, topics, activity log, and user profiles, with email/password auth and Realtime subscriptions for live editing.",
      "Implemented two-tier access control at the application level: company users are scoped to their own modules, admins reach every company's data, the activity log, and user management.",
      "Deployed two Vercel Edge Functions. One serves Supabase credentials at runtime to keep secrets out of source. The other handles privileged admin user CRUD behind JWT and role checks.",
      "Built a compliance checker against the V.A.R.I.F validation criteria: minimum 5 topics, 80+ hours, dimension splits that sum to 100%, and full topic completion before submission.",
      "Implemented auto-save (1.2s debounce on module fields, immediate on topic fields) with 'syncing → synced' feedback, and made realtime updates skip DOM writes on a field while it is being edited to avoid clobbering input.",
      "Hardened security: XSS escaping on user content, a CORS origin allowlist on the edge functions, X-Frame-Options and X-Content-Type-Options headers, and the service-role key kept server-side.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "Vercel"],
    visibility: "Private",
    // No links — private client work.
  },
  {
    slug: "fareeslab-portfolio",
    category: "Personal Project",
    title: "FareesLab",
    subtitle: "Developer Portfolio",
    description:
      "A developer portfolio with an interactive in-browser terminal. Visitors can navigate a simulated filesystem and run commands to find their way around the site.",
    overview:
      "A personal portfolio built to be more than a static resume. The centrepiece is an in-browser terminal with a simulated filesystem, so visitors can navigate directories and run commands to discover content through a CLI instead of just scrolling. Around it sits a minimal typographic design with Framer Motion scroll animations, a sound-wired keyboard, and a statically generated project detail system. The whole thing runs from a self-hosted Docker container behind Cloudflare.",
    role: "Full-Stack Developer",
    contribution: [
      "Built an interactive browser terminal with a simulated filesystem, a command parser, and a navigable directory tree.",
      "Designed and built the UI: typographic hierarchy, Framer Motion reveal animations, and a layout that works from mobile up to desktop.",
      "Wired custom audio: synthesised key-click sounds on terminal input and a quack on the Linux Tux easter egg.",
      "Set up a data-driven project system where adding one entry to a single file generates both the homepage card and a static detail page.",
      "Built a self-hosted CI/CD pipeline: GitHub Actions builds a Docker image, pushes it to GHCR, then SSHes into a VPS to restart the container. Nginx and a Cloudflare Origin Certificate handle TLS.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Docker"],
    visibility: "Public",
    links: {
      github: "https://github.com/NikFarees/fareeslab-portfolio",
      live: "https://fareeslab.dev",
    },
  },
  {
    slug: "pennywise",
    category: "Personal Project",
    title: "PennyWise",
    subtitle: "Personal Finance Tracker",
    description:
      "A personal daily finance tracker. Log income, recurring bills, expenses, debts, and investments against a running daily balance, with an AI assistant for natural-language entry.",
    overview:
      "PennyWise is a personal daily finance tracker I built solo, end to end. Users log income (with Malaysian statutory deductions like EPF, SOCSO, and EIS worked out automatically), set recurring bills, record daily expenses, and keep tabs on debts, investments, and an emergency fund. A running daily balance ties it together and carries overspend forward day to day. A built-in AI assistant lets users log entries and ask questions in plain language, and it confirms each change before writing anything.",
    role: "Full-Stack Developer",
    contribution: [
      "Built the full stack solo: a Next.js App Router frontend, a Supabase Postgres backend, and Server Actions behind every mutation.",
      "Designed the schema with row-level security so each user can only ever touch their own rows.",
      "Implemented daily budgeting with carry-forward overspend logic and the EPF/SOCSO/EIS statutory deduction math.",
      "Built a Google Gemini AI assistant with a propose-then-confirm flow: it drafts the entry, the user approves, then a server action writes it.",
      "Hardened auth and security with Cloudflare Turnstile, optional TOTP MFA, Upstash rate limiting, and a strict Content-Security-Policy.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Gemini AI"],
    visibility: "Public",
    links: {
      github: "https://github.com/NikFarees/pocket-balance",
      live: "https://pennywise.fareeslab.dev",
    },
  },
  {
    slug: "driving-school-management-system",
    category: "Personal Project",
    title: "DriveFlow",
    subtitle: "Driving School Management System",
    description:
      "My final-year project: a management system for a real driving school in Kelantan, built solo in plain PHP. It runs the whole student journey across three roles, from license booking and lesson scheduling to a four-stage driving test and payments.",
    overview:
      "DriveFlow is the management system I built solo as my final-year project for KMSE, a driving school in Pasir Mas, Kelantan. It replaces their old mix of the MyDIIMS portal and paper logbooks with one site for students, instructors, and admins. A student books a license and a lesson package, then moves through a four-stage test track (computer test, QTI, circuit, on-road) while attendance and payments are tracked against that enrollment. Instructors mark attendance, set their unavailable slots, and record test scores. Admins schedule lessons with conflict checks, issue licenses, and watch live KPIs on a Chart.js dashboard. It is plain PHP 8.2 with no framework: every page starts from a role-specific header that opens the session, connects the database, and enforces access before rendering, so each role only ever reaches its own screens.",
    role: "Full-Stack Developer",
    contribution: [
      "Built the whole system solo in plain PHP 8.2 with no framework, where each page includes a role header that runs the session, opens the database, and enforces role-based access before anything renders.",
      "Modelled the full student journey across three roles: license booking, lesson packages, a four-stage test progression (computer test, QTI, circuit, on-road), and payments tied to each enrollment.",
      "Built the admin side: lesson scheduling with conflict detection, bulk rescheduling, test-session capacity, license issuance, and a Chart.js dashboard with live KPIs for revenue, attendance, and enrollment.",
      "Designed the MariaDB schema around readable business IDs (e.g. ST001010125) instead of auto-increment integers, with a central users table extended by per-role student, instructor, and administrator tables.",
      "Containerised the stack with Docker Compose and phpMyAdmin, plus a Python seed generator that produces around 100 students of realistic Kelantan demo data with linked lesson, test, and payment journeys.",
    ],
    stack: ["PHP", "MariaDB", "Bootstrap", "Chart.js", "Docker"],
    visibility: "Private",
    // No links — private repo, localhost only.
  },
  {
    slug: "3d-portfolio",
    category: "Personal Project",
    title: "3D Portfolio",
    subtitle: "Interactive 3D Room",
    description:
      "An isometric 3D room portfolio built with React Three Fiber. Every section is a clickable object in the room — the laptop opens projects, the picture opens the bio, the medals open achievements.",
    overview:
      "A portfolio reimagined as an isometric 3D room rendered with React Three Fiber. Instead of scrolling sections, visitors click objects in the scene: the framed picture opens an About Me modal, the laptop opens a projects gallery, the medals show achievements, the metal case and album cover work experience and education, and the coffee maker lists the tech stack. The room's lighting shifts through day, evening, and night phases based on the visitor's local time, and a wandering cat roams the scene and meows on click. Every object is swappable — it starts as a primitive placeholder and can be dropped for a real GLB model without touching scene code.",
    role: "Frontend Developer",
    contribution: [
      "Built the isometric 3D room in React Three Fiber and drei, with GSAP driving camera transitions between focused objects.",
      "Designed a time-of-day lighting system (day/evening/night) driven by the visitor's local clock, with a URL override for previewing any phase.",
      "Built a swappable-model architecture: every object renders a primitive placeholder that can be swapped for a real GLB without touching scene logic.",
      "Used Zustand to share state between the R3F canvas and the DOM overlays (modals, HUD) driving each interaction.",
      "Kept all portfolio content in flat data files, separate from scene code, so bio, projects, experience, and stack are editable without touching 3D logic.",
    ],
    stack: ["React Three Fiber", "Three.js", "TypeScript", "Vite", "GSAP", "Zustand"],
    visibility: "Public",
    links: {
      github: "https://github.com/NikFarees/3d-portfolio",
      live: "https://3d-portfolio.fareeslab.dev",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
