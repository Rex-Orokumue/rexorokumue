import NavBar from './components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Rex Orokumue Portfolio',
  description: 'AI-first product builder portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <NavBar />
        {children}
      </body>
    </html>
  );
}