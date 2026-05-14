import { useState } from 'react';
import { VscTerminalCmd } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; 


const userProfileImage =  "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg";

const Header = ({ toggleSidebar }) => {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get user data from context
  const { user, userData, logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser(); // Use context logout function
    navigate('/');
  };

  // Get user name and email from context
  const userName = userData?.name || user?.Name || user?.name || "Guest User";
  const userEmail = userData?.email || user?.email || "guest@example.com";
  const loginid = userData?.loginid 


  return (
    <header className="topbar px-3">
      <nav className="navbar navbar-expand-lg p-0">
        {/* Left side - Menu Icon for Sidebar Toggle */}
        <ul className="navbar-nav">
          <li className="nav-item nav-icon-hover-bg rounded-circle ms-n2">
            <button
              className="nav-link sidebartoggler"
              onClick={toggleSidebar}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="ti ti-menu-2"></i>
            </button>
          </li>
        </ul>

        {/* Mobile Logo */}
        <div className="d-block d-lg-none py-4">
          <Link to="/" className="text-nowrap logo-img">
            <img
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg"
              className="dark-logo"
              alt="Logo"
              style={{ height: '30px' }}
            />
          </Link>
        </div>

        {/* Right Side Dropdowns */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex align-items-center justify-content-between">
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
              {/* Language Dropdown */}
              <li className="nav-item nav-icon-hover-bg rounded-circle dropdown">
                <button
                  className="nav-link"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  style={{ background: 'none', border: 'none' }}
                >
                  <img
                    src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-flag-en.svg"
                    alt="flag"
                    width="20"
                    height="20"
                    className="rounded-circle"
                  />
                </button>
                {languageDropdownOpen && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', top: '100%', right: 0 }}>
                    <a className="dropdown-item" href="#">English</a>
                    <a className="dropdown-item" href="#">Hindi</a>
                  </div>
                )}
              </li>

              {/* Console Link */}
              <Link to="/dashboard/console">
                <li className="nav-item">
                  <div className="nav-link">
                    <VscTerminalCmd size={20} />
                  </div>
                </li>
              </Link>

              {/* Notification Dropdown */}
              <li className="nav-item nav-icon-hover-bg rounded-circle dropdown">
                <button
                  className="nav-link position-relative"
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  style={{ background: 'none', border: 'none' }}
                >
                  <i className="ti ti-bell-ringing"></i>
                  <div className="notification-dot"></div>
                </button>
                {notificationDropdownOpen && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', top: '100%', right: 0, width: '320px' }}>
                    <div className="py-3 px-7 pb-0">
                      <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                    </div>
                    <div className="message-body">
                      <a href="#" className="py-8 px-7 mt-8 d-flex align-items-center">
                        <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                          <i className="ti ti-mail fs-6"></i>
                        </span>
                        <div className="w-100 ps-3">
                          <h6 className="mb-1 fs-3 fw-semibold lh-base">New message received</h6>
                          <span className="fs-2 d-block text-body-secondary">2 min ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </li>

              {/* Profile Dropdown - WITH DYNAMIC USER DATA */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link pe-0"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <div className="user-profile-img">
                      <img
                        src={userProfileImage}
                        className="rounded-circle"
                        width="35"
                        height="35"
                        alt="profile"
                      />
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    className="dropdown-menu show dropdown-menu-end"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      width: '360px',
                      display: 'block'
                    }}
                  >
                    <div className="profile-dropdown position-relative" data-simplebar>
                      <div className="py-3 px-7 pb-0">
                        <h5 className="mb-0 fs-5 fw-semibold">My Profile</h5>
                      </div>
                      
                      {/* User Info Section - DYNAMIC FROM API */}
                      <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                        <img
                          src={userProfileImage}
                          className="rounded-circle"
                          width="80"
                          height="80"
                          alt="profile"
                        />
                        <div className="ms-3">
                          <h5 className="mb-1 fs-3">{userName}</h5>
                          {loginid && (
                            <span className="mb-1 d-block fs-2 text-muted">ID: {loginid}</span>
                          )}
                          <p className="mb-0 d-flex align-items-center gap-2">
                            <i className="ti ti-mail fs-4"></i>
                            <span style={{ fontSize: '12px' }}>{userEmail}</span>
                          </p>
                        
                        </div>
                      </div>
                      
                      <div className="message-body">    
                          <Link to="/changepassword" className="py-8 px-7 d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setProfileDropdownOpen(false)}>
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img
                              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-tasks.svg"
                              alt="icon"
                              width="24"
                              height="24"
                            />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">Change Password</h6>
                            <span className="fs-2 d-block text-body-secondary">Forget Password</span>
                          </div>
                        </Link>


                        <Link to="/inbox" className="py-8 px-7 d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setProfileDropdownOpen(false)}>
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img
                              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-inbox.svg"
                              alt="icon"
                              width="24"
                              height="24"
                            />
                          </span>                         
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">Support</h6>
                            <span className="fs-2 d-block text-body-secondary">Messages & Emails</span>
                          </div>
                        </Link>

                        <Link to="/dashboard/profile" className="py-8 px-7 d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setProfileDropdownOpen(false)}>
                          <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                            <img
                              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-tasks.svg"
                              alt="icon"
                              width="24"
                              height="24"
                            />
                          </span>
                          <div className="w-100 ps-3">
                            <h6 className="mb-1 fs-3 fw-semibold lh-base">Profile</h6>
                            <span className="fs-2 d-block text-body-secondary">Update profile</span>
                          </div>
                        </Link>
                      </div>
                      
                      <div className="d-grid py-4 px-7 pt-8">
                        <div className="upgrade-plan bg-primary-subtle position-relative overflow-hidden rounded-4 p-4 mb-9">
                          <div className="row">
                            <div className="col-6">
                              <h5 className="fs-4 mb-3 fw-semibold">Unlimited Access</h5>
                              <button className="btn btn-primary">Upgrade</button>
                            </div>
                            <div className="col-6">
                              <div className="m-n4 unlimited-img">
                                <img
                                  src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/unlimited-bg.png"
                                  alt="unlimited"
                                  className="w-100"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-outline-primary" onClick={handleLogout}>
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;