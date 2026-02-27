// app/components/Hero.tsx
export default function Hero() {
  return (
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
  );
}