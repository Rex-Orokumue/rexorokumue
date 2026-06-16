// app/data/promptLabData.ts
// Real ChatGPT/AI work samples for the Prompt Lab page.
// REAL content only — excerpts of actual conversations Rex had with ChatGPT.

export type PromptCategory = 'strategy' | 'content' | 'coding' | 'design';

export interface PromptExample {
  category: PromptCategory;
  categoryLabel: string;
  title: string;
  prompt: string;
  output: string;          // real output (may be an excerpt of a longer reply)
  excerpt?: boolean;       // true if `output` is trimmed
  why: string;             // the teaching note — why the prompt/approach works
  link?: { href: string; label: string };
  image?: string;          // path under /public for a generated/screenshot image
  imageAlt?: string;
}

export const promptLab = {
  intro:
    'I use ChatGPT and Claude every day — not as a vending machine for answers, but as a strategist, engineer, and writing partner I think out loud with. Below are real, unedited samples across strategy, content, design, and code.',

  // The strongest proof for a tutor role: live teaching footage
  teachVideo: {
    href: 'https://youtube.com/playlist?list=PLdDJ18rc81OxngnEM7Q961AG1vMQ6cRKL',
    label: 'Watch me teach live →',
    note: 'I run the live training sessions for E-Technix — covering digital, web, mobile, and data skills (not AI-specific). Real proof that I can teach.',
  },

  // "What I can teach" — framing for the tutor role
  teach: [
    'Treating AI as a thinking partner — conversation, push-back, and iteration over one-shot prompts',
    'Asking for the honest critique (the "brutal reality check"), not just validation',
    'Prompting with real constraints to get actionable engineering & business plans',
    'Locking output to a strict format (templates, schemas, CMS-ready HTML)',
    'Turning long AI replies into shipped work — published posts, real product roadmaps',
  ],

  examples: [
    {
      category: 'strategy',
      categoryLabel: 'strategy',
      title: 'Pressure-testing a product idea (tech serials platform)',
      prompt:
        'What do you think about running a tech serials website? And maybe building an app for it where users can follow up with weekly serials?',
      output:
        `This is actually a very strong idea — but only if you approach it the right way. Let's break it down properly, no hype.\n\n` +
        `You're not just building a "tech serials website." You're building an addictive, episodic learning + storytelling platform for tech — tech concepts told like Netflix series, weekly drops people wait for, cliffhangers → curiosity → retention.\n\n` +
        `⚠️ Reality check: most people fail at this because they treat it like a blog (boring), have no consistency (audience dies), or build the app too early (waste money). Treat it like a media company first, not a tech product.\n\n` +
        `The smart way to start — don't overcomplicate:\n` +
        `• Phase 1 (0–30 days): prove demand on Instagram/TikTok/Shorts with 30–60s episodic content.\n` +
        `• Phase 2 (30–60 days): own your audience — simple website, collect emails/WhatsApp.\n` +
        `• Phase 3 (after traction): THEN build the app, accounts, notifications.\n\n` +
        `Honest take: 8.5/10 if executed right, 3/10 if treated like a normal blog.`,
      excerpt: true,
      why:
        'I bring a raw idea and explicitly invite the downside — "no hype." Asking the model to argue against the idea (reality checks, failure modes, a numeric verdict) gets you a decision-grade answer instead of flattery.',
    },
    {
      category: 'content',
      categoryLabel: 'content',
      title: 'Iterating a 1-year content strategy (with push-back)',
      prompt:
        "Build me a content plan and strategy ASAP. Let's make it detailed as it is what I will be executing for one year.",
      output:
        `If you tied this entirely to Zolarux, you'd unconsciously filter your thoughts, hold back opinions, and turn content into subtle marketing — that kills authenticity. Build a personal media asset first; let Zolarux benefit later.\n\n` +
        `NEW POSITIONING: not "founder talking about his startup" but "a curious mind explaining the internet, tech, and digital life in a way people actually understand."\n\n` +
        `Refined content pillars (startup-independent): How the Internet Actually Works · Digital Life Realities · Tech Stories & Breakdowns · Building & Learning in Public.\n\n` +
        `Example series: "Nobody Explains This About the Internet" — (1) what actually happens when you send money (2) why your OTP fails (3) why apps crash (4) what "server down" really means.\n\n` +
        `Weekly structure: 4 short videos + 1 opinion video + 1 written episode.`,
      excerpt: true,
      why:
        'This was a back-and-forth, not one prompt. I challenged an earlier plan for being too startup-centric, and the model re-architected the entire positioning. The skill is steering across turns — feeding constraints and corrections until the output fits reality.',
    },
    {
      category: 'coding',
      categoryLabel: 'coding · architecture',
      title: 'Phasing a real app build (EduPanion phonics tool)',
      prompt:
        'If I want to build a phonics assessment tool for learners using Flutter, how will I go about it? Add the AI plan into the roadmap too.',
      output:
        `Offline-first Flutter app, Supabase now, custom backend later, AI-ready:\n\n` +
        `• Phase 0 — Planning: define assessment structure & data models; every data access in Flutter goes through a Backend Interface (Supabase now → custom backend later).\n` +
        `• Phase 1 — Offline-first phonics engine (Hive/SQLite), rule-based scoring & weakness tagging; works with zero internet.\n` +
        `• Phase 2 — Hybrid layer: swap the Backend Interface to SupabaseBackend; sync local data when online.\n` +
        `• Phase 3 — AI diagnostic layer: start rule-based (hard-coded suggestions from patterns), upgrade to an LLM/ML model later.\n` +
        `• Phase 4 — Custom backend (Node/NestJS + Postgres): implement the same interface, no Flutter rewrite.\n\n` +
        `Key principle: backend abstraction first → migration-proof; offline-first → works anywhere; rule-based AI first → low cost, high impact.`,
      excerpt: true,
      why:
        'I gave the model my real constraints — Flutter, offline-first, no budget for a backend yet, AI later. Constraints turn a vague "how do I build an app" into a phased, migration-proof engineering roadmap I could actually execute (this became EduPanion).',
    },
    {
      category: 'content',
      categoryLabel: 'content · publish-ready',
      title: 'Generating a publish-ready blog post to my exact CMS format',
      prompt:
        'Help me write a blog post for Zolarux. Follow this: [pasted my full admin CMS schema — categories, HTML body conventions, blockquote/aside/hr usage, slug + excerpt fields].',
      output:
        `Title: Why Buying From Small Vendors Online Feels Risky — And What Needs to Change\n` +
        `Slug: why-buying-from-small-vendors-online-feels-risky\n` +
        `Excerpt: Millions buy from small vendors on Instagram and WhatsApp every day — but trust is still broken. Here's why, and what a safer system should look like.\n\n` +
        `Body (HTML, matching my CMS): opens with a hesitation hook ("Hope this person is actually real"), a <blockquote> pull-quote, <h2> sections (The Problem Is Bigger Than "Scammers" / Why Honest Vendors Also Lose / What Needs to Change), <ul> lists, and an <aside> highlight — every tag matching the conventions I supplied. Came out paste-ready, no reformatting.`,
      excerpt: true,
      why:
        'I handed it my actual CMS code and HTML conventions, so the output dropped straight into my publishing pipeline — correct slug, excerpt, category, and HTML tags. When you constrain the format precisely, you remove the cleanup step entirely.',
      link: { href: '/blog', label: 'see my AI-assisted blog →' },
    },
    {
      category: 'design',
      categoryLabel: 'design · image generation',
      title: 'Generating an on-brand social flyer (Zolarux “Hello June”)',
      prompt:
        'We just entered a new month — June 1st. Help me design a flyer we can post on our social platforms.',
      output:
        `For a June 1st flyer, I'd avoid the generic "Happy New Month" design every brand posts. Since Zolarux is a trust-focused brand, use the new month to reinforce your positioning.\n\n` +
        `Headline: "Hello June 👋 — A New Month. A New Opportunity to Trade Safely."\n` +
        `Layout: white background, soft brand-blue (#4064D7) gradient corners, logo + "JUNE 2026" top, giant "HELLO / JUNE" (JUNE in blue), handshake + shield + payment icons, four feature boxes (Buyer Protection · Verified Vendors · Secure Payments · Trusted Transactions), then CTA.\n` +
        `Avoid: fireworks, balloons, flowers, generic "Happy New Month" graphics.`,
      excerpt: true,
      image: '/prompt-lab/zolarux-june.png',
      imageAlt: 'Zolarux "Hello June" social flyer generated with ChatGPT',
      why:
        'I gave it the brand positioning and explicitly told it what NOT to do ("avoid the generic template"). It returned full art direction — exact hex codes, layout, and what to leave out — then generated the image. Steering taste, not just asking for "a flyer."',
    },
    {
      category: 'design',
      categoryLabel: 'design · image generation',
      title: 'Brand-matched hero banner from a reference site (E-Technix)',
      prompt:
        'I want a banner image as the hero for this post [pasted the full programme post copy]. Get the design style from https://e-technix.com.',
      output:
        `Produced a hero banner matching the E-Technix brand: dark tech-blue background, the programme title "What the Programme Looks Like", the duration/delivery/outcome strip, and Phase 1 (Foundation) → Phase 2 (Specialisation) laid out as numbered blocks — ready to post.`,
      excerpt: true,
      image: '/prompt-lab/etechnix-banner.png',
      imageAlt: 'E-Technix programme banner generated with ChatGPT',
      why:
        'I handed it the exact post copy and pointed it at our live site for the visual language. Giving a real reference (brand colors, layout, tone) makes generated assets actually match the brand instead of looking generic.',
    },
  ] as PromptExample[],

  // "Prompt patterns" — representative prompt STRUCTURES (not verbatim transcripts).
  // Honest framing: these show the way Rex prompts (constraints, tradeoffs, no fluff).
  patternsIntro:
    'Beyond the samples above, these are the prompt structures I reach for. Notice the pattern: real context, hard constraints, a demand for tradeoffs, and an explicit "no fluff" instruction. That instruction discipline is the core of what I teach.',
  patterns: [
    {
      label: 'startup strategy',
      prompt:
        'Act as a brutally honest startup advisor. Zolarux started as buyer protection and evolved into trust infrastructure for social commerce in Nigeria (₦2M+ processed, now seeking ₦7.4M for a marketplace pilot). Tell me: what is real vs wishful thinking, whether this is truly scalable or just an operational service, the biggest existential risk, and a "pivot or double down" call. No encouragement — only clarity.',
    },
    {
      label: 'positioning',
      prompt:
        'Help me define what Zolarux is NOT, as much as what it is. Compare the marketplace model vs the infrastructure model in plain terms, show where Zolarux fits and where it doesn’t, surface hidden contradictions in my current direction, and give me the cleanest 1–2 sentence positioning statement.',
    },
    {
      label: 'execution systems',
      prompt:
        'Design a weekly execution system for someone building a startup solo in Nigeria with limited money and a high-distraction environment. I want a realistic (not idealistic) weekly structure, what to prioritise when everything feels urgent, a "minimum viable productive week", and rules to prevent burnout. No motivational talk — only operational structure.',
    },
    {
      label: 'creator systems',
      prompt:
        'Build a content engine for "The Tech Serial" that can run for 6 months without burnout. Constraints: no heavy editing, consistent weekly output, content that feels like a series. Give me a repeatable episode template, a weekly production pipeline, an idea-generation method, and how to repurpose one idea into multiple posts. Think like a system designer, not a content coach.',
    },
    {
      label: 'technical SOP',
      prompt:
        'My iPhone XS isn’t detected by iTunes even though the PC chimes on connect. Don’t just give steps — structure it like a diagnostic system: break down failure points (hardware, drivers, cable, mode), rank them by likelihood, give a step-by-step elimination process, and tell me exactly when to stop troubleshooting. Think like a technician, not a support article.',
    },
    {
      label: 'decision frameworks',
      prompt:
        'Build me a decision framework that separates reversible vs irreversible decisions, prevents emotional decision-making, gives me a default rule set for common choices, and helps me act faster under uncertainty. Keep it simple enough to use daily.',
    },
  ],

  // "Published with AI" — verifiable, on-site
  published:
    'Every post on my blog — and several of my LinkedIn posts — were drafted with ChatGPT and Claude, then edited by me.',

  // Private work kept private
  privateNote:
    'Business proposals, reports, and client documents generated with ChatGPT are kept private — available on request.',
};
