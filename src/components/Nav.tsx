'use client';

import { useRef, useState } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = ['Studio', 'Work', 'Services', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[4vw] py-4">
      {/* Logo */}
      <span className="text-foreground font-medium text-sm tracking-widest uppercase">
        SOHub
      </span>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="hidden md:flex items-center gap-2 bg-foreground text-white text-eyebrow px-5 py-2.5 rounded-full hover:opacity-80 transition-opacity duration-200">
          Chat with SOHub
        </button>
        <button
          onClick={toggleMenu}
          className="bg-foreground text-white text-eyebrow px-5 py-2.5 rounded-full hover:opacity-80 transition-opacity duration-200"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={`nav-menu absolute top-full right-[4vw] mt-2 bg-white rounded-2xl shadow-xl p-8 w-64 origin-top-right transition-all duration-400 ${menuOpen ? 'nav-menu-open' : 'nav-menu-closed'}`}
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-foreground text-2xl font-medium hover:translate-x-2 transition-transform duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] inline-block"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
