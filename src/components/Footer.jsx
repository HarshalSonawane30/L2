import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-col about">
          <h5>Learn & Let Learn</h5>
          <p className="muted">A community for learners and mentors to share skills, collaborate on projects, and grow together — completely free.</p>
          <div className="contact">
            <div><FaEnvelope /> <a href="mailto:hello@learnletlearn.example">hello@learnletlearn.example</a></div>
            <div><FaPhone /> <a href="tel:+1234567890">+1 (234) 567-890</a></div>
          </div>
        </div>

        <div className="footer-col links">
          <h5>Quick links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/create-community">Create Community</Link></li>
          </ul>
        </div>

        <div className="footer-col resources">
          <h5>Resources</h5>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>

        <div className="footer-col social">
          <h5>Follow us</h5>
          <div className="social-icons">
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="small muted">© {new Date().getFullYear()} Learn & Let Learn • Built with ❤️</p>
        <div className="policy-links small">
          <Link to="/terms">Terms</Link>
          <span>•</span>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
