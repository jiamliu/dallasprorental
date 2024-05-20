import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14" style={{ marginTop: '0px' }}>
      <section className="container min-h-[480px] flex">
        <div className="grid md:grid-cols-3 py-9">
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif text-black dark:text-white">
              Dallas Pro Rental
            </h1>
            <p className="text-sm text-black dark:text-white">
              Dallas Pro Rental is taking our pride to serve you as our valued customer. Please visit us or our social media for more info.
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow className="text-black dark:text-white" />
              <p className="text-black dark:text-white">405 S Central Expy, Richardson, Texas, 75080</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt className="text-black dark:text-white" />
              <p className="text-black dark:text-white">1-262-202-2632</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-3xl text-black hover:text-primary dark:text-white duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl text-black hover:text-primary dark:text-white duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl text-black hover:text-primary dark:text-white duration-300" />
              </a>
            </div>
          </div>
          <div className="col-span-2 pl-10"> 
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.1769087852576!2d-96.74100975196579!3d32.94633840745067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1f771c421c7d%3A0x7ec899c654392731!2s405%20S%20Central%20Expy%2C%20Richardson%2C%20TX%2075080!5e0!3m2!1sen!2sus!4v1714581995720!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;

