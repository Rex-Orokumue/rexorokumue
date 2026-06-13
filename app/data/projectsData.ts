// app/data/projectsData.ts
// Single source of truth for all project pages and the projects listing

export type Status = 'live' | 'building' | 'design';

export interface ScreenBug {
  title: string;
  what: string;   // what went wrong
  fix: string;    // how you fixed it
}

export interface Screenshot {
  src: string;
  caption: string;
  description: string;
  device: 'phone' | 'desktop';
  bugs?: ScreenBug[];  // optional — add when you have screen-level bugs to document
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ArchLayer {
  label: string;
  items: string[];
  color: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: Status;
  liveUrl?: string;
  repoUrl?: string;
  heroImage: string;
  category: string;
  tech: string[];
  chips: string[];

  problem: {
    headline: string;
    body: string;
  };

  role: {
    summary: string;
    owned: string[];
  };

  architecture: {
    overview: string;
    layers: ArchLayer[];
    decisions: { title: string; reason: string }[];
  };

  screenshots: Screenshot[];

  challenges: Challenge[];

  outcomes: {
    headline: string;
    metrics: { value: string; label: string; sub?: string }[];
    body: string;
  };

  nextSteps: string[];
}

export const projects: Project[] = [
  // ── 1. ZOLARUX MARKETPLACE ───────────────────────────────────────────────
  {
    slug:        'zolarux-marketplace',
    name:        'Zolarux Marketplace',
    tagline:     'Trust-first social commerce for the Nigerian market.',
    description: 'A buyer-protection marketplace where every transaction is escrow-backed. Vendors are verified before listing. Buyers are protected until delivery is confirmed.',
    status:      'live',
    liveUrl:     'https://zolarux.com.ng',
    heroImage:   '/zolarux-marketplace.jpeg',
    category:    'Mobile · Web · FinTech',
    tech:        ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Firebase', 'Next.js', 'Vercel'],
    chips:       ['Flutter', 'Supabase', 'PostgreSQL', 'Next.js', 'REST API'],

    problem: {
      headline: 'Nigerian social commerce has a trust problem.',
      body: 'Millions of Nigerians buy and sell through WhatsApp, Instagram, and Facebook daily. But there is no protection layer. Buyers send money and hope for the best. Vendors deal with chargebacks and fraud. Disputes have no structured resolution. The entire ecosystem runs on blind trust — and it fails regularly. Zolarux was built to change that.',
    },

    role: {
      summary: 'I designed and built the entire platform solo — from the first Figma wireframe to production deployment. Every line of code, every database schema, every UX decision was mine.',
      owned: [
        'End-to-end system architecture — database schema, API design, auth strategy',
        'Flutter mobile app — buyer flows, vendor flows, escrow payment UI',
        'Next.js web platform — product listings, vendor storefronts, buyer dashboard',
        'Supabase backend — PostgreSQL schema, Row-Level Security, real-time subscriptions',
        'Vendor onboarding — multi-step verification with document upload and review',
        'Escrow payment flow — fund holding, release triggers, dispute escalation',
        'Production deployment — Vercel, CI/CD, environment management',
      ],
    },

    architecture: {
      overview: 'Flutter handles all client surfaces. Supabase provides the backend — PostgreSQL for relational data, RLS for security, and real-time for live order updates. Firebase handles push notifications. Next.js powers the web platform. Everything communicates through a REST API layer.',
      layers: [
        { label: 'Mobile & Web Clients', items: ['Flutter (Android)', 'Next.js (Web)'], color: '#3B82F6' },
        { label: 'API & Auth', items: ['Supabase Auth', 'JWT tokens', 'Row-Level Security'], color: '#8B5CF6' },
        { label: 'Database', items: ['PostgreSQL', 'Supabase Realtime', 'Storage (documents)'], color: '#10B981' },
        { label: 'Services', items: ['Firebase (push notifications)', 'Vercel (deployment)', 'GitHub Actions (CI/CD)'], color: '#F59E0B' },
      ],
      decisions: [
        { title: 'Supabase over a custom backend', reason: 'RLS lets me enforce data access rules at the database level — a vendor can only see their own orders, a buyer can only see their own transactions. This security model would have taken weeks to replicate in custom middleware.' },
        { title: 'Flutter for cross-platform', reason: 'One codebase for Android, iOS, web, and desktop. As a solo engineer, maintaining separate codebases was not viable.' },
        { title: 'Escrow at the application layer', reason: 'Rather than integrating a third-party escrow service, I built the holding logic into the platform. This gave me full control over dispute rules and release conditions.' },
      ],
    },

    screenshots: [
      {
        src: '/zolarux-marketplace.jpeg',
        caption: 'Marketplace Home',
        description: 'The buyer\'s entry point — the "Buy With Protection" banner immediately communicates the core value proposition. Product categories and featured listings are surfaced below.',
        device: 'phone',
        // Add screen-level bugs here when ready. Example:
        // bugs: [
        //   {
        //     title: 'Banner not rendering on first load',
        //     what: 'The "Buy With Protection" banner was flashing blank on the first app launch before showing the content.',
        //     fix: 'The issue was the widget building before the Supabase session was resolved. Fixed by wrapping the banner in a FutureBuilder that waits for auth state before rendering.',
        //   },
        // ],
      },
      {
        src: '/zolarux-admin.png',
        caption: 'Admin Control Center',
        description: 'The operations dashboard showing platform health — vendor verification rates, product activation, and order pipeline — all in real time.',
        device: 'desktop',
      },
    ],

    challenges: [
      {
        title: 'Designing escrow logic without a financial services background',
        problem: 'I needed to build a system that holds funds, releases them on condition, and handles disputes — without ever having built financial software before.',
        solution: 'I studied double-entry bookkeeping and broke the escrow flow into three discrete states: HELD, RELEASED, DISPUTED. Each state has explicit triggers and guards. The EscrowPay Engine formalises this further with atomic transactions and idempotency keys to prevent double-processing.',
      },
      {
        title: 'Building vendor trust without a legal entity',
        problem: 'Convincing vendors to trust a new platform with no track record is hard. Convincing buyers to trust vendors on that platform is even harder.',
        solution: 'Made verification visible. Every verified vendor has a badge. Every product listing shows verification status. The "Buy With Protection" banner on every page anchors the entire experience around safety. Trust is a design decision, not just a policy.',
      },
      {
        title: 'Row-Level Security at scale',
        problem: 'Getting RLS policies right in PostgreSQL is genuinely difficult. Early in development, I had policies that were too restrictive — the admin dashboard couldn\'t read vendor data it needed to.',
        solution: 'Separated user roles at the database level with distinct policies for buyer, vendor, and service_role. Admin queries use the service role key server-side only, keeping it off the client entirely.',
      },
    ],

    outcomes: {
      headline: 'Live and processing real transactions.',
      metrics: [
        { value: '27+',  label: 'Verified Vendors', sub: '100% verification rate' },
        { value: '140+', label: 'Active Products',  sub: 'Live on the platform' },
        { value: '100+', label: 'Transactions',     sub: '₦2M+ processed since 2021' },
        { value: '99%',  label: 'Satisfaction',     sub: 'Completed-transaction buyers' },
      ],
      body: 'Zolarux has been building since 2021 and went public nationally in February 2025 after a full revamp. Built solo — the platform is live, escrow-backed transactions are processing, and growth is steady.',
    },

    nextSteps: [
      'Complete the EscrowPay Engine — formalise the financial layer with double-entry ledger and atomic transactions',
      'Launch iOS app',
      'Integrate local Nigerian payment gateways (Paystack, Flutterwave)',
      'Build vendor analytics dashboard — sales trends, conversion rates, review management',
      'Introduce a buyer review system to further build vendor accountability',
    ],
  },

  // ── 2. ZOLARUX ADMIN CONTROL CENTER ─────────────────────────────────────
  {
    slug:        'zolarux-admin',
    name:        'Zolarux Admin Control Center',
    tagline:     'Real-time operations dashboard for the Zolarux ecosystem.',
    description: 'A cross-platform admin dashboard for monitoring and managing the Zolarux marketplace — available on mobile, web, and Windows desktop from a single Flutter codebase.',
    status:      'live',
    heroImage:   '/zolarux-admin.png',
    category:    'Cross-Platform · Internal Tool · Flutter',
    tech:        ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Real-time'],
    chips:       ['Flutter', 'Firebase', 'Firestore', 'Dart', 'RBAC'],

    problem: {
      headline: 'Operating a marketplace blind is not an option.',
      body: 'As Zolarux grew, managing vendors, orders, disputes, and platform health from inside the database or app itself became impossible. I needed a dedicated operations layer — something that gave me real-time visibility into everything happening on the platform, with the ability to act on it immediately.',
    },

    role: {
      summary: 'Designed and built the entire Admin Control Center as a companion application to Zolarux. Built cross-platform from a single Flutter codebase.',
      owned: [
        'Full Flutter application — mobile, web, and Windows desktop targets',
        'Real-time Firestore integration for live platform data',
        'Vendor verification workflow — review, approve, flag, suspend',
        'Order pipeline management — view, escalate, resolve',
        'Platform health dashboard — vendor rates, product activation, dispute metrics',
        'Role-based access control — admin vs. support agent permissions',
        'Dispute resolution tooling — structured escalation and resolution flows',
      ],
    },

    architecture: {
      overview: 'Firebase Firestore provides the real-time data layer. Flutter renders the same codebase across mobile, web, and Windows. Role-based access is enforced at both the UI layer and Firestore security rules level.',
      layers: [
        { label: 'Client Surfaces', items: ['Flutter Mobile', 'Flutter Web', 'Flutter Windows'], color: '#3B82F6' },
        { label: 'Real-time Layer', items: ['Firebase Firestore', 'Firestore Security Rules'], color: '#F59E0B' },
        { label: 'Auth & Access', items: ['Firebase Auth', 'Role-Based Access Control'], color: '#8B5CF6' },
        { label: 'Backend', items: ['Supabase (shared with marketplace)', 'PostgreSQL'], color: '#10B981' },
      ],
      decisions: [
        { title: 'Flutter for all three platforms', reason: 'Building three separate admin apps was not feasible solo. Flutter\'s multi-target support let me write once and deploy to mobile, browser, and Windows with minimal platform-specific code.' },
        { title: 'Firebase Firestore for real-time', reason: 'The admin dashboard needs live data — vendor status changes, new orders, dispute escalations. Firestore\'s real-time listeners made this trivial to implement compared to polling.' },
        { title: 'Separate app from the marketplace', reason: 'Keeping admin functionality in a separate application prevents accidental exposure of admin routes to regular users and keeps the codebase concerns clean.' },
      ],
    },

    screenshots: [
      {
        src: '/zolarux-admin.png',
        caption: 'Operations Overview',
        description: 'The main dashboard showing platform health at a glance — 27 vendors, 82 products, vendor verification at 100%, and order completion pipeline. Built on Windows desktop.',
        device: 'desktop',
      },
    ],

    challenges: [
      {
        title: 'Keeping three platform targets in sync',
        problem: 'Flutter\'s multi-platform support is powerful but each target has quirks — Windows has different window management, web has different navigation patterns, mobile has different gesture handling.',
        solution: 'Used responsive layout breakpoints and platform detection to conditionally render navigation (sidebar on desktop/web, bottom nav on mobile). Shared all business logic and state management across targets.',
      },
      {
        title: 'Real-time performance with large datasets',
        problem: 'Listening to entire Firestore collections in real time gets expensive and slow as data grows.',
        solution: 'Implemented scoped listeners — only subscribe to documents that are actively relevant to the current view. Paginate historical data separately from live updates.',
      },
    ],

    outcomes: {
      headline: 'Internal operations tool — live and in daily use.',
      metrics: [
        { value: '3',  label: 'Platforms',       sub: 'Mobile · Web · Windows' },
        { value: '1',  label: 'Codebase',        sub: 'All platforms from one Flutter project' },
        { value: '4',  label: 'Admin modules',   sub: 'Vendors · Orders · Disputes · Health' },
        { value: 'RT', label: 'Real-time data',  sub: 'Firestore live listeners' },
      ],
      body: 'The Admin Control Center is an internal operations tool built exclusively for the Zolarux team. It provides real-time visibility into vendor verification, order pipeline, and platform health — all from a single Flutter codebase across mobile, web, and Windows. Not a public product; no external user metrics.',
    },

    nextSteps: [
      'Revenue analytics — transaction volume, GMV, fee tracking',
      'Automated vendor risk scoring dashboard',
      'Bulk vendor actions — approve, suspend, message multiple vendors',
      'Platform-wide announcement system',
    ],
  },

  // ── 3. EDUPANION ─────────────────────────────────────────────────────────
  {
    slug:        'edupanion',
    name:        'EduPanion',
    tagline:     'Phonics & Literacy Assessment Tool for Nigerian classrooms.',
    description: 'A mobile assessment platform that helps Nigerian classroom teachers evaluate and track student literacy progress across six levels — from Nursery through Senior Secondary School.',
    status:      'building',
    heroImage:   '/edupanion-screenshot.jpeg',
    category:    'Mobile · EdTech · Flutter',
    tech:        ['Flutter', 'Dart', 'Firebase', 'Offline-first'],
    chips:       ['Flutter', 'Dart', 'Firebase', 'Offline-first', 'EdTech'],

    problem: {
      headline: 'Nigerian teachers have no structured tool for tracking student literacy.',
      body: 'Phonics and literacy assessment in Nigerian classrooms happens informally — verbal tests, handwritten notes, and teacher memory. There is no systematic way to track a student\'s reading level over time, identify students falling behind, or generate reports for parents and school administrators. Teachers are doing their best with nothing. EduPanion was built to give them something.',
    },

    role: {
      summary: 'Sole designer and developer. Built the full Flutter application from concept to working product — including the assessment engine, teacher dashboard, and offline-first data layer.',
      owned: [
        'Full Flutter mobile application — teacher-facing interface',
        'Assessment engine — structured phonics tests across six levels',
        'Student management — add students, assign to classes, track over time',
        'Classroom management — multiple classes, terms, and academic years',
        'Progress dashboards — per-student and per-class literacy trends',
        'Offline-first data architecture — works without internet connection',
        'Report generation — term summaries for parents and administration',
      ],
    },

    architecture: {
      overview: 'Flutter handles the full mobile experience. An offline-first architecture using local storage ensures the app works reliably in low-connectivity classrooms. Firebase syncs data when connectivity is available.',
      layers: [
        { label: 'Client', items: ['Flutter (Android)', 'Offline-first local storage'], color: '#3B82F6' },
        { label: 'Sync Layer', items: ['Firebase Firestore', 'Background sync when online'], color: '#F59E0B' },
        { label: 'Auth', items: ['Firebase Auth', 'Teacher accounts'], color: '#8B5CF6' },
        { label: 'Data', items: ['Local SQLite / Hive', 'Firebase Firestore (cloud backup)'], color: '#10B981' },
      ],
      decisions: [
        { title: 'Offline-first architecture', reason: 'Many Nigerian classrooms have unreliable internet. An app that requires connectivity would be unusable in the environments it was built for. All assessment data is stored locally first and synced when a connection is available.' },
        { title: 'Six assessment levels', reason: 'The Nigerian curriculum spans Nursery through Senior Secondary — each stage has distinct phonics and literacy expectations. The app\'s level structure maps directly to curriculum stages teachers already know.' },
        { title: 'Teacher-centred UX', reason: 'Teachers are busy. The app needed to be operable with minimal training — clear navigation, simple assessment flows, and reports that generate themselves.' },
      ],
    },

    screenshots: [
      {
        src: '/edupanion-screenshot.jpeg',
        caption: 'Teacher Dashboard',
        description: 'The main teacher view showing active classes (JSS 3, Primary 5, and more), student count, total assessments run, and class average. Recent assessments and students not yet tested are surfaced immediately.',
        device: 'phone',
        bugs: [
          {
            title: 'Short name for the bug',
            what: 'What went wrong and what you saw.',
            fix: 'What caused it and exactly how you fixed it.',
          },
        ],
      },
    ],

    challenges: [
      {
        title: 'Designing offline sync without conflicts',
        problem: 'If a teacher uses the app on two devices or shares an account with a colleague, local data could conflict when syncing to Firebase.',
        solution: 'Each assessment record has a unique ID generated client-side. Sync is append-only for assessment records — nothing is overwritten, only added. Conflict resolution is handled by timestamp ordering.',
      },
      {
        title: 'Making assessment feel fast in the classroom',
        problem: 'Teachers running assessments need to move quickly between students. Any friction in the flow means assessments get skipped.',
        solution: 'Designed the assessment flow as a single continuous screen — no navigation between steps. One tap to start, one tap per response, one tap to complete. The entire assessment for one student takes under 2 minutes.',
      },
    ],

    outcomes: {
      headline: 'Built — preparing for release.',
      metrics: [
        { value: '6',    label: 'Assessment levels', sub: 'Nursery to SS3' },
        { value: '100%', label: 'Offline capable',   sub: 'No internet needed' },
        { value: '3',    label: 'Platforms targeted', sub: 'Android, iOS, web' },
        { value: '< 2m', label: 'Per-student assessment', sub: 'Designed for classroom speed' },
      ],
      body: 'EduPanion is a complete Flutter application pending final polish and Play Store release. No users yet — built from an idea to solve a real problem in Nigerian classrooms. The app is functionally complete; the next step is Play Store submission and finding the first pilot school.',
    },

    nextSteps: [
      'Pilot deployment with partner schools in Nigeria',
      'iOS build and App Store submission',
      'School administrator portal — view all classes, all teachers, school-wide literacy trends',
      'PDF report export for parent-teacher meetings',
      'WhatsApp integration — send progress reports directly to parents',
    ],
  },

  // ── 4. ESCROWPAY ENGINE ──────────────────────────────────────────────────
  {
    slug:        'escrowpay-engine',
    name:        'EscrowPay',
    tagline:     'Standalone escrow engine — working backend, frontend in progress.',
    description: 'A standalone escrow engine built to power Zolarux and potentially other platforms. The Node.js/Express/PostgreSQL backend is built and working; the frontend has not been started yet.',
    status:      'building',
    heroImage:   '/escrowpay-engine.jpeg',
    category:    'FinTech · Backend · Infrastructure',
    tech:        ['Node.js', 'PostgreSQL', 'Supabase', 'REST API', 'Express'],
    chips:       ['Node.js', 'PostgreSQL', 'Supabase', 'REST API', 'Double-entry Ledger'],

    problem: {
      headline: 'Escrow without a proper financial engine is just a promise.',
      body: 'The current Zolarux escrow flow works — but it is application-level logic sitting on top of a general-purpose database. As transaction volume grows, this approach will hit limits: no audit trail, no double-entry integrity, no idempotency guarantees, no atomic multi-step operations. EscrowPay is a standalone escrow engine built to replace this with a proper financial infrastructure layer — one that could eventually power escrow for any Nigerian social commerce platform, not just Zolarux. The backend is complete; a frontend and public release are still ahead.',
    },

    role: {
      summary: 'Sole architect and engineer. Backend is built and functional — Node.js/Express API, PostgreSQL schema, and core escrow logic. Frontend work has not begun.',
      owned: [
        'System architecture — ledger design, engine separation, API contract',
        'PostgreSQL schema — 5 core tables with double-entry integrity',
        'Node.js/Express backend — REST API, request validation, error handling',
        'Escrow engine implementation — fund holding, release triggers, dispute states',
        'Wallet service — balance tracking, atomic credit/debit operations',
        'Idempotency strategy — preventing double-processing under network failures',
      ],
    },

    architecture: {
      overview: 'Four distinct engines handle separate concerns: the Ledger Engine maintains the double-entry record, the Escrow Engine manages fund states, the Wallet Service tracks balances, and the Atomic Transaction layer ensures all-or-nothing operations. 7 transaction invariants enforce financial correctness.',
      layers: [
        { label: 'API Layer',       items: ['REST API', 'Express.js', 'Request validation'],                                    color: '#3B82F6' },
        { label: 'Engine Layer',    items: ['Ledger Engine', 'Escrow Engine', 'Wallet Service', 'Atomic Transactions'],         color: '#F59E0B' },
        { label: 'Integrity Layer', items: ['Idempotency keys', '7 transaction invariants', 'Double-entry validation'],         color: '#EF4444' },
        { label: 'Data Layer',      items: ['PostgreSQL', '5 core tables', 'Supabase'],                                         color: '#10B981' },
      ],
      decisions: [
        { title: 'Double-entry bookkeeping', reason: 'Every financial transaction has two sides — a debit and a credit. Double-entry ensures the books always balance. If they don\'t, something has gone wrong and the system knows it immediately.' },
        { title: 'Idempotency keys on all write operations', reason: 'Networks fail. Mobile apps retry. Without idempotency, a retry means charging twice. Every payment operation accepts an idempotency key — the same key always produces the same result, never a duplicate charge.' },
        { title: 'Atomic transactions at the database level', reason: 'An escrow operation touches multiple tables — the buyer\'s wallet, the escrow hold record, and the ledger entry. If any step fails, all steps must roll back. PostgreSQL transactions enforce this guarantee.' },
      ],
    },

    screenshots: [
      {
        src: '/escrowpay-engine.jpeg',
        caption: 'System Architecture Card',
        description: 'The technical architecture overview showing the four engine layers, core tables, and transaction invariants. Backend is built; frontend and public release are pending.',
        device: 'desktop',
      },
    ],

    challenges: [
      {
        title: 'Designing financial invariants without a finance background',
        problem: 'Financial systems have strict correctness requirements that general software engineering doesn\'t prepare you for. Getting them wrong means money disappearing or appearing from nowhere.',
        solution: 'Studied double-entry bookkeeping principles and worked backwards from the invariants — what must always be true regardless of how the system is used. Defined 7 non-negotiable invariants before writing a single line of code.',
      },
    ],

    outcomes: {
      headline: 'Working backend — frontend not yet built, no users yet.',
      metrics: [
        { value: '5', label: 'Core tables',            sub: 'Schema implemented' },
        { value: '4', label: 'Processing engines',     sub: 'Backend logic built' },
        { value: '7', label: 'Transaction invariants', sub: 'Correctness rules enforced' },
        { value: '0', label: 'Users',                  sub: 'Pre-launch — no frontend yet' },
      ],
      body: 'The EscrowPay backend is functionally complete — Node.js/Express API, PostgreSQL schema, escrow state machine, wallet service, and idempotency layer are all built and working. The frontend has not been started. No users yet. Next step is building the frontend and integrating with Zolarux as the primary payment backend.',
    },

    nextSteps: [
      'Build the frontend — transaction dashboard and payment UI',
      'Integrate with Zolarux marketplace as the live payment backend',
      'End-to-end testing across buyer, vendor, and dispute flows',
      'Open-source the engine for other Nigerian social commerce platforms',
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}