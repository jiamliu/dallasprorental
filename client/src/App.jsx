import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import CarList from './components/CarList/CarList';
import Testimonial from './components/Testimonial/Testimonial';
import PartnerWithUs from './components/PartnerWithUs/PartnerWithUs';
import Footer from './components/Footer/Footer';
import Career from './components/Career/Career';
import SubmitCarForm from './components/SubmitCarForm/SubmitCarForm';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import Login from './components/Login/Login'; 
import Registration from './components/Registration/Registration'; 
import RentDirect from './components/RentDirect/RentDirect'
import Listing from './components/Listing/Listing'
import Reserve from './components/Reserve/Reserve'

import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import AOS from "aos";
import "aos/dist/aos.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
  }, [theme]);

  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero theme={theme} id="home" />
              <About id="about" />
              <Services id="services" />
              <CarList id="carList" />
              <Testimonial id="testimonial" />
              <PartnerWithUs id="partnerWithUs" />
              <Footer />
            </>
          } />
          <Route path="/career" element={<Career />} />
          <Route path="/submit-car" element={<SubmitCarForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> 
          <Route path="/rent" element={<RentDirect />} />
          <Route path="/listing/:carId" element={<Listing />} />
          <Route path="/reserve/:carId" element={<Reserve />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
        <ScrollToTopButton />
      </AuthProvider>
    </Router>
  );
};

export default App;














