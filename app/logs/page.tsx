export default function BuildLogs() {
  return (
    <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Build Logs</h1>
      <p className="mt-6 text-gray-600 leading-relaxed">
        This is where I document every step of building my AI-first product portfolio. 
        From Day 1 to today, you’ll see decisions, mistakes, fixes, and progress. 
        Transparency is key to growth.
      </p>

      <div className="mt-12 space-y-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Day 1 – Project Setup</h3>
          <p className="text-gray-600">Created Next.js project, added TypeScript, Tailwind, and structured homepage.</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Day 2 – Multi-page Setup</h3>
          <p className="text-gray-600">Added About, Projects, Logs, Contact pages and navigation bar.</p>
        </div>
        {/* Future days can be added here */}
      </div>
    </main>
  );
}