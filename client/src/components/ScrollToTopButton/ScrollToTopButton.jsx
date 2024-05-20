import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PiArrowFatUpFill } from "react-icons/pi";

const ScrollToTopButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation(); //use this to detect user's current path on the landing page. eg: if click to about us, user will be at abou us section of the page.

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonStyle = {
    position: 'fixed',
    right: '5%',
    bottom: scrollPosition > 500 ? '20%' : '10%', 
    zIndex: 1000,
    display: pathname === '/' && scrollPosition < 500 ? 'none' : 'block' //use this to hide arrow to create a better visual and maintain strong overall user experience
  };

  return (
    <button onClick={scrollToTop} style={buttonStyle} aria-label="Scroll to top">
      <PiArrowFatUpFill className="text-5xl text-primary hover:text-black transition-colors duration-300"/>
    </button>
  );
};

export default ScrollToTopButton;


