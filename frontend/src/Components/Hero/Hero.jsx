import React from 'react';
import './Hero.css';
import programming from '../Assets/Poster.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1>Programming Courses for Everyone</h1>
        <p className="hero-description">Learn C++, Python, Java, and more for free!</p>
        <div className="main-latest-btn">
          <Link to="/courses" className="enroll-button">Enroll Now</Link>
        </div>
      </div>
      <div className="hero-right">
        <img src={programming} alt="Programming Poster" />
      </div>
    </div>
  );
};

export default Hero;
