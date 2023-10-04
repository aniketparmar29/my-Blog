// src/components/Navbar.js
import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // You can use other icons if preferred
import { useDarkMode } from '../hooks/useDarkMode';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize AOS animation
  AOS.init();

  return (
    <nav
      className={`bg-gray-900 ${
        isDarkMode ? 'text-white' : 'text-gray-900 bg-white'
      } transition-all duration-300`}
    >
      <div className="container mx-auto py-4 pr-4"> {/* Added padding-right */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            Blog App
          </div>
          <div className="hidden md:flex space-x-6 ">
            <Link
              to="/"
              className="hover:text-blue-500"
              data-aos="fade-right"
            >
              Home
            </Link>
            <Link
              to="/"
              className="hover:text-blue-500"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Blog
            </Link>
            <Link
              to="/"
              className="hover:text-blue-500"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              About
            </Link>
            <Link
              to="/"
              className="hover:text-blue-500"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Contact
            </Link>
            <div className="md:absolute top-4 right-4 flex items-center"> {/* Changed absolute to md:absolute */}
        <button
          onClick={toggleDarkMode}
          className="text-2xl text-gray-500 hover:text-gray-400 transition"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-2xl text-blue-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Blog
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Contact
          </Link>
          <div className="md:absolute top-4 right-4 flex items-center"> {/* Changed absolute to md:absolute */}
        <button
          onClick={toggleDarkMode}
          className="text-2xl text-gray-500 hover:text-gray-400 transition"
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
        </div>
      )}
      {/* Dark mode toggle */}
     
    </nav>
  );
};

export default Navbar;
