import React from 'react';
import Hero from '../Components/Hero/Hero';
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Students Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <h3>Manuel</h3>
            <p>The courses are very well structured and helpful.</p>
          </div>
          <div className="testimonial-card">
            <h3>Ronald</h3>
            <p>My daughter has always been curious about computers, and these courses have sparked her interest even more.</p>
          </div>
          <div className="testimonial-card">
            <h3>Steven</h3>
            <p>The projects included in the courses pushed me out of my comfort zone, but they were worth it!</p>
          </div>
        </div>
      </div>

      {/* Course Highlights Section */}
      <div className="course-highlights-section">
        <h2>Explore Our Popular Courses</h2>
        <div className="course-highlights">
          <div className="course-highlight">
            <h3>JavaScript Basics</h3>
            <p>Kickstart your programming journey with JavaScript.</p>
          </div>
          <div className="course-highlight">
            <h3>React Fundamentals</h3>
            <p>Learn how to build web applications using React.</p>
          </div>
          <div className="course-highlight">
            <h3>Python for Beginners</h3>
            <p>Master Python to start your data science career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
