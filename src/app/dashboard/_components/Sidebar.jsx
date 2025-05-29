'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const currentPath = usePathname();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path, exact = false) => {
    return exact ? currentPath === path : currentPath.startsWith(path);
  };

  const linkClasses = (path, exact = false) =>
    `block px-4 py-2 rounded hover:bg-[#3B82F6] transition ${
      isActive(path, exact) ? 'bg-[#3B82F6] text-white' : 'text-white'
    }`;

  // Auto expand submenus if current path is inside them
  useEffect(() => {
    if (currentPath.startsWith('/dashboard/category')) setIsCategoryOpen(true);
    if (currentPath.startsWith('/dashboard/products')) setIsProductOpen(true);
  }, [currentPath]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white bg-gray-800 p-2 rounded"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 min-h-screen w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700 mt-12 md:mt-0">
          Admin Panel
        </div>
        <nav className="mt-4 space-y-1 px-2 h-screen">
          <Link
            href="/dashboard"
            className={linkClasses('/dashboard', true)} // exact match
            onClick={() => setIsSidebarOpen(false)}
          >
            Dashboard
          </Link>

          {/* Categories */}
          <div>
            <button
              className={`w-full text-left px-4 py-2 rounded transition ${
                isActive('/dashboard/category') ? 'bg-[#3B82F6] text-white mb-1' : 'hover:bg-[#3B82F6] text-white'
              }` }
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              Categories
            </button>
            {isCategoryOpen && (
              <div className="ml-4 space-y-1">
                <Link
                  href="/dashboard/category/all-category"
                  className={linkClasses('/dashboard/category/all-category')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  All Categories
                </Link>
                <Link
                  href="/dashboard/category/create-category"
                  className={linkClasses('/dashboard/category/create-category')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Create Category
                </Link>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button
              className={`w-full text-left px-4 py-2 rounded transition ${
                isActive('/dashboard/products') ? 'bg-[#3B82F6] text-white mb-1' : 'hover:bg-[#3B82F6] text-white'
              }`}
              onClick={() => setIsProductOpen(!isProductOpen)}
            >
              Products
            </button>
            {isProductOpen && (
              <div className="ml-4 space-y-1">
                <Link
                  href="/dashboard/products/all-products"
                  className={linkClasses('/dashboard/products/all-products')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  href="/dashboard/products/create-product"
                  className={linkClasses('/dashboard/products/create-product')}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Create Product
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
