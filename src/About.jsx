import React from "react";
import "./about.css";
// Footer removed; bottom tabs used for mobile navigation

export default function About() {
  return (
    <div className="about-container">
      {/* About Section */}
      <section className="about-hero">
        <div className="about-text">
          <h2>About <span>Learn and Let Learn</span></h2>
          <p>
            Learn and Let Learn is a unique platform designed to bring learners and teachers together.
            We believe that knowledge grows when shared — so whether you’re mastering a new
            programming language, teaching design skills, or exchanging cultural insights,
            this is the place to connect and grow together.
          </p>
          <p>
            Our mission is to make learning collaborative, inclusive, and completely free.
            Join us and be part of a global community that values learning, teaching,
            and personal growth through skill exchange.
          </p>
        </div>
        <div className="about-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149670.png"
            alt="About SkillExchange"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h3>Our Mission</h3>
        <div className="mission-cards">
          <div className="mission-card">
            <img src="https://cdn-icons-png.flaticon.com/512/4359/4359963.png" alt="Community" />
            <h4>Build a Global Community</h4>
            <p>
              We connect people from different regions and cultures to share their
              expertise and learn from one another.
            </p>
          </div>
          <div className="mission-card">
            <img src="https://cdn-icons-png.flaticon.com/512/906/906175.png" alt="Growth" />
            <h4>Empower Lifelong Learning</h4>
            <p>
              Learning never stops — our platform helps users continuously develop
              their skills and stay future-ready.
            </p>
          </div>
          <div className="mission-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2721/2721272.png" alt="Collaboration" />
            <h4>Encourage Collaboration</h4>
            <p>
              Learning through collaboration ensures deeper understanding and stronger
              connections between learners and mentors.
            </p>
          </div>
        </div>
      </section>

      {/* Footer removed (BottomTabs used instead) */}
    </div>
  );
}
