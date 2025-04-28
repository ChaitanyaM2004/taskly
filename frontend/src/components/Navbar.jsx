import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTasks, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isLoggedIn ? '/home' : '/login'} className="flex items-center space-x-2">
              <FaTasks className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">Taskly</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="py-2 px-3 rounded hover:bg-blue-700 transition">Dashboard</Link>
                <Link to="/about" className="py-2 px-3 rounded hover:bg-blue-700 transition">About</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 py-2 px-3 rounded hover:bg-blue-700 transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="py-2 px-3 rounded hover:bg-blue-700 transition">About</Link>
                <Link to="/login" className="py-2 px-3 rounded hover:bg-blue-700 transition">Login</Link>
                <Link to="/signup" className="py-2 px-3 bg-white text-blue-600 font-medium rounded hover:bg-gray-100 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="block py-2 px-3 rounded hover:bg-blue-600 transition">Dashboard</Link>
                <Link to="/about" className="block py-2 px-3 rounded hover:bg-blue-600 transition">About</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 w-full text-left py-2 px-3 rounded hover:bg-blue-600 transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="block py-2 px-3 rounded hover:bg-blue-600 transition">About</Link>
                <Link to="/login" className="block py-2 px-3 rounded hover:bg-blue-600 transition">Login</Link>
                <Link to="/signup" className="block py-2 px-3 rounded hover:bg-blue-600 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;