import React from "react";
import { Link } from "react-router-dom";

const PartnerWithUs = () => {
  return (
    <>
      <div id="partnerWithUs" data-aos="zoom-in" className="dark:bg-black dark:text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-800 py-12 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Have unused cars sitting in your parking lot?</h1>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Need extra cash but no extra time?</h1>
              <p className="text-gray-400">Contact us for extra income!</p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <Link
                to="/submit-car"
                className="inline-block font-semibold py-2 px-6 bg-primary text-white hover:bg-primary/80 duration-200 tracking-widest uppercase"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerWithUs;




