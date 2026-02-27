export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* HERO */}
      <section className="px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Rex Orokumue
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          AI-First Product Builder (Web + Mobile)
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg">
            Hire Me
          </button>
          <button className="px-6 py-3 border border-black rounded-lg">
            AI Builder Course
          </button>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">What I Do</h2>
        <p className="mt-6 text-gray-600 leading-relaxed">
          I build AI-powered tools and digital products that solve real-world
          problems. From job-seeker tools to creator platforms, I focus on
          execution, speed, and scalable systems.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">
            Featured Projects
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">

            <div className="p-6 border rounded-lg bg-white">
              <h3 className="text-xl font-semibold">
                AI Resume Optimizer
              </h3>
              <p className="mt-4 text-gray-600">
                A tool helping Nigerian job seekers optimize their CVs using AI.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Next.js · AI Integration · Tailwind
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-white">
              <h3 className="text-xl font-semibold">
                AI Invoice Tool
              </h3>
              <p className="mt-4 text-gray-600">
                A simple invoice generator for freelancers and small businesses.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Next.js · PDF Export · Automation
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-white">
              <h3 className="text-xl font-semibold">
                Creator Monetization Platform
              </h3>
              <p className="mt-4 text-gray-600">
                A system for creators to monetize audiences with digital tools.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                SaaS Architecture · Payments · AI
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BUILD IN PUBLIC */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">
          Building in Public
        </h2>
        <p className="mt-6 text-gray-600">
          I document my entire journey — decisions, mistakes, iterations, and
          progress — to stay accountable and grow openly.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center bg-black text-white">
        <h2 className="text-3xl font-semibold">
          Let’s Build Something Powerful
        </h2>
        <div className="mt-8">
          <button className="px-8 py-3 bg-white text-black rounded-lg">
            Work With Me
          </button>
        </div>
      </section>

    </main>
  );
}