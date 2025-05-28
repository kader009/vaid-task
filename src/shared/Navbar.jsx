'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#3B82F6] text-white w-full z-50 shadow ">
      <div className="max-w-screen px-4 mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold cursor-pointer">
            <Link href="/">Ecommerce</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="" className="hover:text-gray-300">
              About
            </Link>
            <Link href="" className="hover:text-gray-300">
              Services
            </Link>
            <Link href="" className="hover:text-gray-300">
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-[#3B82F6] px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:bg-indigo-600 rounded"
          >
            Home
          </Link>
          <Link
            href=""
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:bg-indigo-600 rounded"
          >
            About
          </Link>
          <Link
            href=""
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:bg-indigo-600 rounded"
          >
            Services
          </Link>
          <Link
            href=""
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:bg-indigo-600 rounded"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2 bg-white text-indigo-700 rounded text-center font-semibold"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
