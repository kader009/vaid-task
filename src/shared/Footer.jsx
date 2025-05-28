import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo & About */}
        <div>
          <h1 className="text-2xl font-bold text-white">Ecommerce</h1>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Bringing you the best products and services with top-notch support.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="hover:text-white">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram size={20} />
            </Link>
          </div>
        </div>

        {/* Center: Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@ecommerce.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
