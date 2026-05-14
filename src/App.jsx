import { Routes, Route } from 'react-router-dom';
import { useUser } from './context/UserContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingLayout from './layouts/landinglayout';

const App = () => {
   const { isAuthenticated } = useUser();

  return (
    <>
     <Routes>
      <Route path="/*" element={<LandingLayout />} />
      <Route  path="/dashboard/*" element={<DashboardLayout />} /></Routes>
    </>
  );
};

export default App;