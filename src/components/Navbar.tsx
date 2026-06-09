'use client';

import { usePathname } from 'next/dist/client/components/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const menus = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src= "/favicon.ico" alt="Logo" className="h-20 w-auto">
            </img>
            {/* <Link href="/" className="text-2xl font-bold text-blue-400">
              Full-Stack Dev
            </Link> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`transition-colors duration-200 ${
                    pathname === menu.href
                      ? "text-blue-400 font-semibold"
                      : "hover:text-blue-400"
                  }`}
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200" href="/contact">
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-3 pt-2 space-y-1">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 hover:text-blue-400 transition-colors ${
                  pathname === menu.href ? "bg-slate-800 text-blue-400" : ""
                }`}
              >
                {menu.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
              Let's Talk
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
