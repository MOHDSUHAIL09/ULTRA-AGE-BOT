// src/Pages/Components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VscTerminalCmd } from 'react-icons/vsc';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New message from John', time: '5 min ago', icon: 'ti-message', color: '#5d87ff' },
    { id: 2, title: 'Sales report ready', time: '1 hour ago', icon: 'ti-chart-pie', color: '#13deb9' },
    { id: 3, title: 'Meeting at 3:00 PM', time: '3 hours ago', icon: 'ti-calendar', color: '#ffae1f' }
  ];

  const profileLinks = [
    { icon: 'ti-user', label: 'My Profile', link: '/profile' },
    { icon: 'ti-settings', label: 'Settings', link: '/settings' },
    { icon: 'ti-credit-card', label: 'Billing', link: '/billing' }
  ];

  return (
    <header className="mk-header">
      <div className="mk-header-container">
        {/* Left Section */}
        <div className="mk-header-left">
          <button className="mk-menu-toggle" onClick={toggleSidebar}>
            <i className="ti ti-menu-2"></i>
          </button>

          <Link to="/" className="mk-logo">
            <img 
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg" 
              alt="Logo" 
              className="mk-logo-img"
            />
          </Link>

          <div className="mk-nav-links">
            <Link to="/" className="mk-nav-link">Home</Link>
            <Link to="/about" className="mk-nav-link">About</Link>
            <Link to="/contact" className="mk-nav-link">Contact</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="mk-header-right">
          <Link to="/console" className="mk-icon-btn">
            <VscTerminalCmd size={20} />
          </Link>

          {/* Notification Dropdown */}
          <div className="mk-dropdown" ref={notificationRef}>
            <button 
              className={`mk-icon-btn ${notificationDropdownOpen ? 'mk-active' : ''}`}
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            >
              <i className="ti ti-bell-ringing"></i>
              <span className="mk-badge">3</span>
            </button>

            {notificationDropdownOpen && (
              <div className="mk-dropdown-menu">
                <div className="mk-dropdown-header">
                  <h6>Notifications</h6>
                  <span className="mk-badge-primary">3 New</span>
                </div>
                <div className="mk-notif-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className="mk-notif-item">
                      <div className="mk-notif-icon" style={{ background: notif.color }}>
                        <i className={notif.icon}></i>
                      </div>
                      <div className="mk-notif-content">
                        <p className="mk-notif-title">{notif.title}</p>
                        <span className="mk-notif-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mk-dropdown-footer">
                  <Link to="/notifications" className="mk-link">View all</Link>
                </div>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="mk-auth-buttons">
            <Link to="/login">
              <button className="mk-btn mk-btn-outline">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="mk-btn mk-btn-primary">Sign Up</button>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="mk-dropdown" ref={profileRef}>
            <button 
              className={`mk-profile-btn ${profileDropdownOpen ? 'mk-active' : ''}`}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <img 
                src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" 
                alt="Profile" 
                className="mk-profile-img"
              />
              <span className="mk-profile-name">Mathew</span>
              <i className="ti ti-chevron-down mk-chevron"></i>
            </button>

            {profileDropdownOpen && (
              <div className="mk-dropdown-menu mk-profile-menu">
                <div className="mk-profile-header">
                  <img 
                    src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" 
                    alt="Profile" 
                    className="mk-profile-img-large"
                  />
                  <div className="mk-profile-info">
                    <h6>Mathew Anderson</h6>
                    <span>mathew@example.com</span>
                  </div>
                </div>
                <div className="mk-divider"></div>
                {profileLinks.map((item, idx) => (
                  <Link key={idx} to={item.link} className="mk-dropdown-item">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="mk-divider"></div>
                <button className="mk-dropdown-item mk-text-danger">
                  <i className="ti ti-logout"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


















