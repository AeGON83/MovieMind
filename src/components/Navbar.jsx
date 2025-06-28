/** @format */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './user/AuthContext';

export default function Navbar({ navStyle }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigateToHomepage = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  let { currentUser } = useAuth();

  return (
    <div
      className={`navbar-container ${isScrolled ? 'scrolled' : ''} ${
        isMenuOpen ? 'menu-open' : ''
      }`}
      style={navStyle}
    >
      <div className='navbar-wrapper'>
        <div className='navbar-title'>
          <div
            className='navbar-title-logo'
            onClick={navigateToHomepage}
          ></div>
          <p onClick={navigateToHomepage}>MovieMind</p>
        </div>

        {/* Burger Menu Button */}
        <div
          className='burger-menu'
          onClick={toggleMenu}
        >
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        {/* Navigation Items */}
        <ul className={`navbar-items ${isMenuOpen ? 'open' : ''}`}>
          <li onClick={() => handleNavClick('/community')}>Community</li>
          <li onClick={() => handleNavClick('/MovieSection')}>Movies</li>
          <li onClick={() => handleNavClick('/TvSection')}>Web Series</li>
          <li onClick={() => handleNavClick('/DiscoverPage/28')}>Discover</li>
          <li onClick={() => handleNavClick('/user/favorites')}>Favorites</li>
          <li onClick={() => handleNavClick('/user/watchList')}>Watchlist</li>

          {/* Mobile Account Button */}
          <li className='mobile-account-button '>
            {currentUser ? (
              <Link
                to='/account'
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            ) : (
              <Link
                to='/signup'
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>

        {/* Account Button */}
        <div className='navbar-buttons-wrapper'>
          <button
            className='normal-button'
            id='signin-button'
          >
            {currentUser ? <Link to='/account'>Account</Link> : <Link to='/signup'>Sign In</Link>}
          </button>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  navStyle: PropTypes.object,
};
