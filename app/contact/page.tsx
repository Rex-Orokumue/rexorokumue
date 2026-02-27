'use client';

import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(
      'service_7e1i37k', // replace with your EmailJS service ID
      'template_siqqnie', // replace with your EmailJS template ID
      formRef.current,
      'DE7aMA3WIbqg8QlGM' // replace with your EmailJS public key
    )
    .then(() => {
      setMessageSent(true);
      formRef.current?.reset();
    }, (error) => {
      console.error(error.text);
      alert('Failed to send message, try again later.');
    });
  };

  return (
    <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold">Contact Me</h1>
      <p className="mt-6 text-gray-600">
        Interested in working together or learning more about my tools? Reach out!
      </p>

      <form ref={formRef} onSubmit={sendEmail} className="mt-8 flex flex-col gap-4">
        <input 
          type="text" 
          name="user_name"
          placeholder="Your Name" 
          className="px-4 py-3 border rounded-lg"
          required
        />
        <input 
          type="email" 
          name="user_email"
          placeholder="Your Email" 
          className="px-4 py-3 border rounded-lg"
          required
        />
        <textarea 
          name="message"
          placeholder="Message" 
          className="px-4 py-3 border rounded-lg"
          rows={5}
          required
        />
        <button className="px-6 py-3 bg-black text-white rounded-lg">
          Send Message
        </button>
      </form>

      {messageSent && (
        <p className="mt-4 text-green-600 font-semibold">
          Your message has been sent! ✅
        </p>
      )}

      <p className="mt-6 text-gray-500">
        Or connect with me on LinkedIn, GitHub, TikTok.
      </p>
    </main>
  );
}