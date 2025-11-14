import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaComments, FaUser } from 'react-icons/fa';
import './BottomTabs.css';

function BottomTabs() {
  const location = useLocation();

  return (
    <nav className="bottom-tabs">
      <Link to="/home" className={`tab-item ${location.pathname === '/home' ? 'active' : ''}`}>
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to="/connections" className={`tab-item ${location.pathname === '/connections' ? 'active' : ''}`}>
        <FaUserFriends />
        <span>Connections</span>
      </Link>
      <Link to="/messages" className={`tab-item ${location.pathname.startsWith('/messages') ? 'active' : ''}`}>
        <FaComments />
        <span>Messages</span>
      </Link>
      <Link to="/profile" className={`tab-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
}

export default BottomTabs;