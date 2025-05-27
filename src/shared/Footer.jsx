const Footer = () => {  
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side - Logo & About */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">Ecommerce</h2>
          <p className="text-gray-400 max-w-sm mt-2">
            Bringing you the best products and services with top-notch support.
          </p>
        </div>

        {/* Center - Useful Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="/" className="hover:text-white">
            Home
          </a>
          <a href="" className="hover:text-white">
            About
          </a>
          <a href="" className="hover:text-white">
            Services
          </a>
          <a href="" className="hover:text-white">
            Contact
          </a>
        </div>

        {/* Right side - Contact Info */}
        <div className="text-gray-400 text-center md:text-right">
          <p>Email: support@ecommerce.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Ecommerce. All rights reserved. 
      </div>
    </footer>
  );
};

export default Footer;
