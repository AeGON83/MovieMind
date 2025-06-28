/** @format */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './user/AuthContext';

export default function Navbar({ navStyle }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { currentUser } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToHomepage = () => {
    navigate('/');
    setIsMenuOpen(false); // Close mobile menu when navigating
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
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
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        <ul className={`navbar-items ${isMenuOpen ? 'open' : ''}`}>
          <li onClick={() => handleNavigation('/community')}>Community</li>
          <li onClick={() => handleNavigation('/MovieSection')}>Movies</li>
          <li onClick={() => handleNavigation('/TvSection')}>Web Series</li>
          <li onClick={() => handleNavigation('/DiscoverPage/28')}>Discover</li>
          <li onClick={() => handleNavigation('/user/favorites')}>Favorites</li>
          <li onClick={() => handleNavigation('/user/watchList')}>Watchlist</li>

          {/* Mobile Account Button */}
          <li className='mobile-account-button'>
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
