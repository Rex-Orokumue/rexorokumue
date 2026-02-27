export default function Projects() {
  return (
    <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center">My Projects</h1>

      <div className="mt-12 grid md:grid-cols-3 gap-8">

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold">AI Resume Optimizer</h3>
          <p className="mt-4 text-gray-600">
            Helps Nigerian job seekers optimize their CVs using AI suggestions. 
          </p>
          <p className="mt-2 text-sm text-gray-400">Next.js · Tailwind · AI</p>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold">AI Invoice Tool</h3>
          <p className="mt-4 text-gray-600">
            Simplifies invoice creation for freelancers and small businesses.
          </p>
          <p className="mt-2 text-sm text-gray-400">Next.js · PDF Export · Automation</p>
        </div>

        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-semibold">Creator Monetization Platform</h3>
          <p className="mt-4 text-gray-600">
            Allows creators to monetize audiences with AI-powered tools.
          </p>
          <p className="mt-2 text-sm text-gray-400">SaaS Architecture · Payments · AI</p>
        </div>

      </div>
    </main>
  );
}