import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar as RBNavbar, Nav, Container, Button, Form, InputGroup } from "react-bootstrap";
import { FaHome, FaUserFriends, FaEnvelope, FaUser, FaSearch, FaBell, FaUsers } from "react-icons/fa";
import "./Navbar.css";
import statusManager from './utils/statusManager';

function Navbar() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [meOnline, setMeOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "John Doe commented on your post",
      type: 'post',
      targetId: 101,
      time: "5 minutes ago",
      unread: true
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "Sarah Smith liked your project",
      type: 'post',
      targetId: 102,
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "New message from David Wilson",
      type: 'message',
      targetId: 6,
      time: "2 hours ago",
      unread: false
    }
  ]);
  const location = useLocation();
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  useEffect(() => {
    const update = () => {
      const statuses = statusManager.getStatuses();
      const count = Object.entries(statuses).filter(([k, s]) => k !== 'me' && s && s.online).length;
      setOnlineCount(count);
    };

    update();
    const iv = setInterval(update, 5000);

    try {
      statusManager.setOnline('me', navigator.onLine);
    } catch (e) {
      // ignore in non-browser environments
    }

    const handleOnline = () => {
      setMeOnline(true);
      statusManager.setOnline('me', true);
      update();
    };

    const handleOffline = () => {
      setMeOnline(false);
      statusManager.setOnline('me', false);
      update();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(iv);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';


  return (
    <>
      {/* Top Navbar */}
      <RBNavbar expand="lg" className="site-navbar">
        <Container>
          <RBNavbar.Brand as={Link} to="/" className="brand-text">
            Learn & Let Learn
          </RBNavbar.Brand>
          
          {/* Search Bar */}
          <div className="navbar-search-container">
            <InputGroup>
              <Form.Control
                placeholder="Search skills, people, posts..."
                className="search-input"
                aria-label="Search"
              />
              <Button variant="link" className="search-icon">
                <FaSearch />
              </Button>
            </InputGroup>
          </div>

          {/* Auth Buttons and Status */}
          <div className="auth-buttons">
            <div className="notification-wrapper" ref={notificationRef}>
              <Button 
                variant="link" 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                <span className="notification-badge">
                  {notifications.filter(n => n.unread).length}
                </span>
              </Button>
              
              <div className={`notifications-dropdown ${showNotifications ? 'show' : ''}`}>
                <div className="notifications-header">
                  <h6 className="notifications-title">Notifications</h6>
                  <button className="mark-all-read" onClick={markAllRead}>
                    Mark all as read
                  </button>
                </div>
                {notifications.map((notification) => {
                  // Route to user profile with notification context
                  const to = `/user/${notification.targetId}?notification=${notification.id}`;

                  return (
                    <Link
                      key={notification.id}
                      to={to}
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                      onClick={() => {
                        // mark this notification read and close dropdown
                        setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, unread: false } : n));
                        setShowNotifications(false);
                      }}
                    >
                      <img 
                        src={notification.avatar} 
                        alt="avatar" 
                        className="notification-avatar"
                      />
                      <div className="notification-content">
                        <div className="notification-text">{notification.text}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      {notification.unread && <div className="notification-dot" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="online-indicator">
              <span className="online-dot"></span>
              <span>{onlineCount} online</span>
            </div>

            <Button 
              as={Link} 
              to="/create-community" 
              variant="outline-primary" 
              className="create-community-btn"
            >
              <FaUsers />
              <span>Create Community</span>
            </Button>

            {!isAuthenticated ? (
              <>
                <Button 
                  as={Link} 
                  to="/signup" 
                  state={{ fromNavbar: true }}
                  variant="primary" 
                  className="join-button"
                >
                  Join Now
                </Button>
                <Button as={Link} to="/login" variant="outline-secondary" className="login-link">
                  Login
                </Button>
              </>
            ) : (
              <Button as={Link} to="/profile" variant="primary" className="profile-btn">
                <FaUser />
              </Button>
            )}

          </div>
        </Container>
      </RBNavbar>

      {/* Bottom navigation moved to BottomTabs component */}
    </>
  );
}

export default Navbar;
