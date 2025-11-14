import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaCamera, FaEdit, FaGraduationCap, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import "./HomePage.css";
// Footer removed; bottom tabs used for mobile navigation

export default function HomePage() {
  const [isHoveringCover, setIsHoveringCover] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If navigated from login, jump to posts section
    if (location.hash === '#posts') {
      const el = document.querySelector('.posts-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="home-container">
      {/* Profile Section */}
      <section className="profile-section">
        <div 
          className="cover-photo"
          onMouseEnter={() => setIsHoveringCover(true)}
          onMouseLeave={() => setIsHoveringCover(false)}
        >
          {isHoveringCover && (
            <button className="edit-cover">
              <FaCamera /> Edit cover photo
            </button>
          )}
        </div>
        <div className="profile-info">
          <div 
            className="profile-photo-container"
            onMouseEnter={() => setIsHoveringProfile(true)}
            onMouseLeave={() => setIsHoveringProfile(false)}
          >
            <img
              src="https://randomuser.me/api/portraits/men/88.jpg"
              alt="Profile"
              className="profile-photo"
            />
            {isHoveringProfile && (
              <button className="edit-profile-photo">
                <FaCamera />
              </button>
            )}
          </div>
          <div className="profile-details">
            <div className="profile-header">
              <h1>John Developer <FaEdit className="edit-icon" /></h1>
              <p className="headline">Full Stack Developer & Coding Mentor</p>
            </div>
            <div className="profile-metadata">
              <p><FaGraduationCap /> Computer Science, Tech University</p>
              <p><FaBriefcase /> Senior Developer at TechCorp</p>
              <p><FaMapMarkerAlt /> New York, USA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Learn. Teach. Grow <span>Together.</span></h2>
          <p>
            Empower your learning journey by connecting with others who share
            your passion. Learn new skills, share your knowledge, and grow in a
            collaborative community.
          </p>
          <Link to="/signup" className="cta-btn">Join Now</Link>
        </div>

        <div className="hero-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3593/3593264.png"
            alt="Skill Exchange"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h3>Why Choose SkillExchange?</h3>
        <div className="feature-cards">
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Connect" />
            <h4>Connect Easily</h4>
            <p>Find learners and teachers who match your goals and interests.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/2762/2762002.png" alt="Learn" />
            <h4>Learn Freely</h4>
            <p>Access learning opportunities without barriers or fees.</p>
          </div>
          <div className="card">
            <img src="https://cdn-icons-png.flaticon.com/512/906/906175.png" alt="Grow" />
            <h4>Grow Together</h4>
            <p>Build relationships that support personal and professional growth.</p>
          </div>
        </div>
      </section>

      {/* Footer removed (BottomTabs used instead) */}
    </div>
  );
}
