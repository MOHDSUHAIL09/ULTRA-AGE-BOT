import  { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  IconHome, 
  IconLayoutBottombar, 
  IconDeviceImacDollar, 
  IconReplaceUser, 
  IconCreditCardRefund, 
  IconHistory, 
  IconUsersGroup, 
  IconBinaryTree2, 
  IconAward, 
  IconDeviceComputerCamera, 
  IconGitCompare,
  IconPower
} from '@tabler/icons-react';

const Sidebar = ({ sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    if (!sidebarCollapsed || window.innerWidth <= 992) {
      setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    }
  };


  useEffect(() => {
    if (sidebarCollapsed && window.innerWidth > 992) {
      setOpenMenus({});
    }
  }, [sidebarCollapsed]);

  // Close sidebar when clicking on link in mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 992 && closeMobileSidebar) {
      closeMobileSidebar();
    }
  };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('regno');
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      navigate('/')
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`left-sidebar with-vertical ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
      <div>
        {/* Brand Logo */}
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/" className="text-nowrap logo-img" onClick={handleLinkClick}>
            <img 
              src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/logos/dark-logo.svg" 
              alt="Logo-Dark" 
              className="dark-logo"
            />
          </Link>
          <button 
            className="mobile-close-btn d-lg-none"
            onClick={closeMobileSidebar}
          >
            <i className="ti ti-x"></i>
          </button>
        </div>

        <nav className="sidebar-nav scroll-sidebar" data-simplebar>
          <ul id="sidebarnav">
            {/* Dashboard Items */}
            <li className="sidebar-item mt-3">
              <Link 
                className={`sidebar-link ${isActive('./dashboard') ? 'active' : ''}`} 
                to="/dashboard" 
                onClick={handleLinkClick}
              >
                <span><IconHome stroke={2}/></span>               
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Home</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/ecommerce') ? 'active' : ''}`} 
                to="/ecommerce" 
                onClick={handleLinkClick}
              >
                <span><IconLayoutBottombar stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Bot Subscription</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/nft') ? 'active' : ''}`} 
                to="/nft" 
                onClick={handleLinkClick}
              >
                <span><IconDeviceImacDollar stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Invest</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/crypto') ? 'active' : ''}`} 
                to="/crypto" 
                onClick={handleLinkClick}
              >
                <span><IconCreditCardRefund stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Income Payout</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/deposit-to-deposit') ? 'active' : ''}`} 
                to="/deposit-to-deposit" 
                onClick={handleLinkClick}
              >
                <span><IconReplaceUser stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Deposit To Deposit</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/income-to-deposit') ? 'active' : ''}`} 
                to="/income-to-deposit" 
                onClick={handleLinkClick}
              >
                <span><IconGitCompare stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Income To Deposit</span>}
              </Link>
            </li>

            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/deposit-history') ? 'active' : ''}`} 
                to="/deposit-history" 
                onClick={handleLinkClick}
              >
                <span><IconHistory stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Deposit History</span>}
              </Link>
            </li>

            {/* Investment History with Dropdown */}
            <li className="sidebar-item">
              <a 
                className={`sidebar-link ${(!sidebarCollapsed || window.innerWidth <= 992) ? 'has-arrow' : ''}`} 
                href="javascript:void(0)" 
                onClick={() => toggleMenu('investment')}
              >
                <span className="d-flex">
                  <IconHistory stroke={2} />
                </span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Investment History</span>}
              </a>
              {(!sidebarCollapsed || window.innerWidth <= 992) && (
                <ul className={`collapse first-level ${openMenus.investment ? 'show' : ''}`}>
                  <li className="sidebar-item">
                    <Link to="/investment/all" className="sidebar-link" onClick={handleLinkClick}>
                      <span className="hide-menu">All Investments</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/investment/active" className="sidebar-link" onClick={handleLinkClick}>
                      <span className="hide-menu">Active Investments</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/investment/completed" className="sidebar-link" onClick={handleLinkClick}>
                      <span className="hide-menu">Completed Investments</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Downline Team */}
            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/downline-team') ? 'active' : ''}`} 
                to="/downline-team" 
                onClick={handleLinkClick}
              >
                <span><IconUsersGroup stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Downline Team</span>}
              </Link>
            </li>

            {/* Tree View */}
            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/tree-view') ? 'active' : ''}`} 
                to="/tree-view" 
                onClick={handleLinkClick}
              >
                <span><IconBinaryTree2 stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Tree View</span>}
              </Link>
            </li>

            {/* Reward */}
            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/reward') ? 'active' : ''}`} 
                to="/reward" 
                onClick={handleLinkClick}
              >
                <span><IconAward stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Reward</span>}
              </Link>
            </li>

            {/* Royalty Status */}
            <li className="sidebar-item">
              <Link 
                className={`sidebar-link ${isActive('/royalty-status') ? 'active' : ''}`} 
                to="/royalty-status" 
                onClick={handleLinkClick}
              >
                <span><IconDeviceComputerCamera stroke={2} /></span>
                {(!sidebarCollapsed || window.innerWidth <= 992) && <span className="hide-menu">Royalty Status</span>}
              </Link>
            </li>

            {/* Fixed Profile Section */}
            <div className={`fixed-profile ${(!sidebarCollapsed || window.innerWidth <= 992) ? '' : 'collapsed-profile'}`}>
              <div className="hstack gap-3">
                <div className="john-img">
                  <img 
                    src='https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg' 
                    className="rounded-circle" 
                    width="40" 
                    height="40" 
                    alt="profile" 
                  />
                </div>
                {(!sidebarCollapsed || window.innerWidth <= 992) && (
                  <>
                    <div className="john-title">
                      <h6 className="mb-0 fs-4 fw-semibold">Mathew</h6>
                      <span className="fs-2">Designer</span>
                    </div>
                    <div
                      className="border-0 bg-transparent text-primary ms-auto"
                      onClick={handleLogout}
                    >
                      <IconPower stroke={2} size={20} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;