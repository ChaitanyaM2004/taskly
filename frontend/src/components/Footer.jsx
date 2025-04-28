import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Taskly</h3>
            <p className="text-gray-300">
              Taskly is a powerful task management application designed to help you organize,
              track, and complete your tasks efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="text-gray-300 hover:text-white transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaGithub size={24} />
              </a>
            </div>
            <p className="text-gray-300">
              Email: contact@taskly.com<br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Taskly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;