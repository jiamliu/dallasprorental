import React from 'react'
import CarPng from "../../assets/car2.png"

const About = () => {
  return (
    <div id="about" className="dark:bg-dark bg-slate-100 dark:text-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
                <div data-aos="slide-right" data-aos-duration="1500" >
                    <img src={CarPng} alt="" className="sm:scale-105 sm:-translate-x-11 max-h-[500px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"/>
                </div>
                <div>
                    <div className="space-y-5 sm:p-16 pb-6">
                        <h1 data-aos="fade-up"  className="text-3xl sm:text-4xl font-bold font-serif">About Us</h1>
                        <p data-aos="fade-up">
                          Founded in 2023 in Dallas, Texas, Dallas Pro Rental offers top-quality rental vehicles at competitive rates. We prioritize seamless service and flexibility, ensuring a personalized rental experience for every customer. Drive with us and discover effortless travel tailored to your needs.
                        </p>
                        <p data-aos="fade-up">
                          Rent directly from our website, our Richardson location, or on Turo, and enjoy streamlined service tailored to meet your travel needs. Experience hassle-free booking and exceptional customer care.
                        </p>
                        <button data-aos="fade-up" className="button-outline">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About