import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-center gap-6">
      <Link href="/" className="font-semibold hover:text-blue-600">Home</Link>
      <Link href="/about" className="font-semibold hover:text-blue-600">About</Link>
      <Link href="/projects" className="font-semibold hover:text-blue-600">Projects</Link>
      <Link href="/logs" className="font-semibold hover:text-blue-600">Build Logs</Link>
      <Link href="/contact" className="font-semibold hover:text-blue-600">Contact</Link>
    </nav>
  );
}