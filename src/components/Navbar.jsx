import React from 'react'

export default function Navbar() {
  return (
    <div className='navbar-container'>
        <div className="navbar-wrapper">
            <h2 className='navbar-title'>MovieMind</h2>
            <ul className="navbar-items">
                <li>Community</li>
                <li>Categories</li>
                <li>Favorites</li>
            </ul>
            <div className="navbar-buttons-wrapper">
            <button className='normal-button' id='login-button'>Log In</button>
            <button className='normal-button' id='signin-button'>Sign In</button>
            </div>
        </div>
    </div>
  )
}
