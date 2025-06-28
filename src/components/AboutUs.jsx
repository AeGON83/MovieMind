import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const TEAM_MEMBERS = [
  {
    name: 'Rajan Makavana',
    portfolioUrl: '#', // Add portfolio URL when available
    imageOffset: '50px',
  },
  {
    name: 'Bharat Ladva',
    portfolioUrl: 'https://bharatladva.github.io/cv/',
    imageOffset: '45px',
  },
];

export default function AboutUs() {
  return (
    <div className='signin-page-container'>
      <Navbar
        navStyle={{
          height: '60px',
          position: 'relative',
          top: 0,
          opacity: 1,
          zIndex: 2,
        }}
      />
      <main className='about-main'>
        <section className='about-profiles'>
          {TEAM_MEMBERS.map(({ name, portfolioUrl, imageOffset }) => (
            <article
              key={name}
              className='profile'
            >
              <div
                className='userimage'
                style={{
                  position: 'relative',
                  top: '0',
                  left: imageOffset,
                  transform: 'scale(1.5)',
                }}
                aria-label={`${name}'s profile picture`}
              />
              <h2>{name}</h2>
              {portfolioUrl && (
                <Link
                  to={portfolioUrl}
                  className='portfolio-link'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Portfolio
                </Link>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
