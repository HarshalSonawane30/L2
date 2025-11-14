import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaEnvelope, FaUser } from 'react-icons/fa';
import './BottomTabs.css';

export default function BottomTabs() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Nav className="bottom-tabs fixed-bottom d-md-none">
      <Nav.Item>
        <Nav.Link as={Link} to="/home" className={`tab-item ${isActive('/home') ? 'active' : ''}`}>
          <FaHome className="tab-icon" />
          <div className="tab-label">Home</div>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/connections" className={`tab-item ${isActive('/connections') ? 'active' : ''}`}>
          <FaUserFriends className="tab-icon" />
          <div className="tab-label">Connections</div>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/messages" className={`tab-item ${isActive('/messages') ? 'active' : ''}`}>
          <FaEnvelope className="tab-icon" />
          <div className="tab-label">Messages</div>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} to="/profile" className={`tab-item ${isActive('/profile') ? 'active' : ''}`}>
          <FaUser className="tab-icon" />
          <div className="tab-label">Profile</div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
