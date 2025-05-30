// app/components/nav-bar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Menu', href: '/menu' },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/about' },
  { label: 'Chick-fil-A One', href: '/chick-fil-a-one' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsMenuHovered(true);
  };
  
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsMenuHovered(false);
    }, 200); // 200ms delay before hiding
  };  

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Chick-fil-A" width={40} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">

          <>
          <div 
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/menu"
              className={`
                text-[15px] font-medium text-red-500 border-b-2 border-dotted border-transparent
                group-hover:text-red-700 hover:transition-colors duration-500
                md:hover:border-b-2 md:hover:border-red-700
                ${pathname === '/menu' ? 'text-red-600' : 'text-gray-700'}
              `}
            >
              <span className="inline-flex items-center gap-1">
                Menu <span className="text-xs">▼</span>
              </span>
            </Link>
              
            {/* Dropdown stays open as long as you're inside this .group */}
            {isMenuHovered && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
                <ul className="py-2 text-sm text-gray-800">
                  <li>
                    <Link href="/menu/breakfast" className="block px-4 py-2 hover:bg-gray-100">
                      Breakfast
                    </Link>
                  </li>
                  <li>
                    <Link href="/menu/meal" className="block px-4 py-2 hover:bg-gray-100">
                      Meal
                    </Link>
                  </li>
                  <li>
                    <Link href="/menu/drinks" className="block px-4 py-2 hover:bg-gray-100">
                      Drinks
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
              
          {/* Other nav items */}
          {navItems
            .filter((item) => item.label !== 'Menu')
            .map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`
                  text-[15px] font-medium text-red-500 border-b-2 border-dotted border-transparent
                  hover:text-red-700 hover:transition-colors duration-500
                  md:hover:border-b-2 md:hover:border-red-700
                  ${pathname === href ? 'text-red-600' : 'text-gray-700'}
                `}
              >
                {label}
              </Link>
            ))}
        </>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/signin"
              className="bg-white text-[#d9232e] font-bold border border-[#d9232e] md:px-6 md:py-3 rounded-3xl hover:bg-[#ffe5e7] transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/order"
              className="bg-[#d9232e] font-bold text-white md:px-6 md:py-3 rounded-3xl hover:bg-[#b71c1c] transition-colors duration-300"
            >
              Order Food
            </Link>
          </div>


          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-700">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium hover:text-red-600 ${
                pathname === href ? 'text-red-600' : 'text-gray-700'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 bg-red-600 text-white text-center px-4 py-2 rounded-md hover:bg-red-700"
          >
            Order Food
          </Link>
        </div>
      )}
    </nav>
  );
}
