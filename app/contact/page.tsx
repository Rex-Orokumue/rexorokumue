export default function Contact() {
  return (
    <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <p className="mt-6 text-gray-600 leading-relaxed">
        Interested in working together or learning more about my tools? Reach out!
      </p>

      <form className="mt-8 flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="px-4 py-3 border rounded-lg"
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          className="px-4 py-3 border rounded-lg"
        />
        <textarea 
          placeholder="Message" 
          className="px-4 py-3 border rounded-lg"
          rows={5}
        />
        <button className="px-6 py-3 bg-black text-white rounded-lg">
          Send Message
        </button>
      </form>

      <p className="mt-6 text-gray-500">
        Or connect with me on LinkedIn, GitHub, TikTok.
      </p>
    </main>
  );
}