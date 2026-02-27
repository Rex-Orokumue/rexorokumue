export default function WhatIDo () {
    return(
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
    );
}