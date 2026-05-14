
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from '../Componenets/landing/Home';
import AboutPage from '../Pages/landing/AboutPage';
import Signup from '../Pages/auth/Signup';
import Login from '../Pages/auth/Login';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import Header from '../Componenets/common/Header';
import Contact from '../Pages/landing/Contact';


const LandingLayout = () => {

      const location = useLocation();
  
  // Check if current path is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgotpassword' ;


  return (
    <>
    
       {!isAuthPage && <Header/>}
      <main className="landing-main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />

        </Routes>
      </main>
    </>
  )
}

export default LandingLayout