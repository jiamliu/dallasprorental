import React, { useEffect } from "react";
import career4 from "../../assets/career4.png";
import AOS from "aos";

const CareerHero = () => {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="bg-primary text-black duration-300"> 
      <div className="container min-h-[1080px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={career4}
              alt="Dynamic workplace environment"
              className="sm:scale-125 relative -z-10 max-h-[300px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
            <p data-aos="fade-up" className="text-2xl font-serif">
              Join Our Team
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Building Careers at Dallas Pro Rental
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Kickstart your career with us and be part of an innovative team dedicated to excellence. Explore diverse opportunities in a workplace that fosters professional growth and personal development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHero;


