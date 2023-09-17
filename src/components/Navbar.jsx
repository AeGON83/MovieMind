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
            <button className='sign-in-button'>Sign In</button>
        </div>
    </div>
  )
}
