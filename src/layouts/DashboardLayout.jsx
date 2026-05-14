import { useState } from 'react';
import Sidebar from '../Componenets/dashboard/Sidebar';
import Header from '../Componenets/dashboard/Header';
import Dashboard from '../Pages/dashboard/Dashboard';
import { Routes, Route, useLocation } from 'react-router-dom';

import '../assets/main.css'
import UserProfile from '../Pages/dashboard/Profile/UserProfile';
import Console from '../Pages/dashboard/Consolepage/Console';

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };


  const location = useLocation();

  // Check if current path is login or signup
  const isAuthPage = location.pathname === '/dashboard/console'



  return (
    <div className={`app-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {!isAuthPage && <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
      />}
      <div className="main-wrapper">
        {!isAuthPage && <Header toggleSidebar={toggleSidebar} /> }
        <div className="main-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="console" element={<Console />} />
          </Routes>
        </div>
      </div>
      {mobileSidebarOpen && <div className="sidebar-overlay" onClick={closeMobileSidebar}></div>}
    </div>
  );
}

export default DashboardLayout;