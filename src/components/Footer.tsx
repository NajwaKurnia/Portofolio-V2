import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Branding */}
          <div className="md:text-left">
            <img src="/favicon.ico" alt="Logo" className="h-10 w-auto" />
            <p className="text-sm text-gray-400">Designed & Developed by Najwa</p>
          </div>

          {/* Center - Links */}
          <div className="flex justify-center gap-8">
            <Link href="/" 
            className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"> 
              Instagram
            </Link>
            <Link
              href="https://linkedin.com/in/najwakurnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/NajwaKurnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              GitHub
            </Link>
          </div>

          {/* Right - Copyright */}
          <div className="md:text-right text-sm text-gray-400">
            © {currentYear} Najwa Kurnia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
