import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useDarkMode } from '../hooks/useDarkMode';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  AOS.init();

  return (
    <nav
      className={`bg-gray-900 ${
        isDarkMode ? 'text-white' : 'text-gray-900 bg-white'
      } transition-all duration-300`}
    >
      <div className="container mx-auto py-4 pr-4">
        <div className="flex justify-between items-center space-x-8">
          <div className="text-xl font-semibold">
            Blog App
          </div>
          <div className="hidden md:flex space-x-6 ">
            <Link
              to="/"
              className={`hover:text-blue-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              data-aos="fade-right"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className={`hover:text-blue-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Blogs
            </Link>
            <Link
              to="/authors"
              className={`hover:text-blue-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Authors
            </Link>
            <Link
              to="/login"
              className={`hover:text-blue-500 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              data-aos="fade-right"
              data-aos-delay="300"
            >
              Login
            </Link>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className={`text-2xl ${
                  isDarkMode ? 'text-white' : 'text-gray-500'
                } hover:text-gray-400 transition`}
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`text-2xl ${
                isDarkMode ? 'text-white' : 'text-gray-500'
              } hover:text-gray-400 transition`}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Menu
              className={`bg-gray-900 ${
                isDarkMode ? 'text-white' : 'text-gray-900 bg-white'
              } transition-all duration-300`}
            >
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} rightIcon={<ChevronDownIcon />}>
                    <HamburgerIcon boxSize={8} />
                  </MenuButton>
                  <MenuList>
                    <Link to="/" className={`${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MenuItem
                        className={`${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Home
                      </MenuItem>
                    </Link>
                    <Link to="/blogs" className={`${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MenuItem
                        className={`${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Blogs
                      </MenuItem>
                    </Link>
                    <Link to="/authors" className={`${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MenuItem
                        className={`${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Authors
                      </MenuItem>
                    </Link>
                    <Link to="/login" className={`${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MenuItem
                        className={`${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Login
                      </MenuItem>
                    </Link>
                  </MenuList>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
