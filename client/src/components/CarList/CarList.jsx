import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

import tiguan from "../../assets/tiguan.png";
import rio from "../../assets/rio.png";
import jetta from "../../assets/jetta.png";
import lexus from "../../assets/lexus.png";
import x1 from "../../assets/x1.avif";

const carList = [
  {
    name: "2024 VolksWagen Tiguan S",
    price: 65,
    image: tiguan,
    aosDelay: "0",
  },
  {
    name: "2023 KIA Rio",
    price: 45,
    image: rio,
    aosDelay: "200",
  },
  {
    name: "2023 Volkswagen Jetta Sports",
    price: 50,
    image: jetta,
    aosDelay: "400",
  },
  {
    name: "2023 VolksWagen Tiguan S",
    price: 60,
    image: tiguan,
    aosDelay: "600",
  },
  {
    name: "2020 Lexus NX 300",
    price: 55,
    image: lexus,
    aosDelay: "800",
  },
  {
    name: "2018 BMW X1",
    price: 50,
    image: x1,
    aosDelay: "1000",
  },
];

const CarList = () => {
  const navigate = useNavigate(); 


  const handleViewInventory = () => {
    navigate('/rent'); 
  };

  return (
    <div id="carList" className="pb-24 pt-12 bg-slate-100 dark:bg-dark dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Our Premium Car Selection
        </h1>
        <p className="text-sm pb-10">
          Explore our top rentals from a wide range of premium vehicles.
        </p>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          className="mySwiper"
        >
          {carList.map((car, index) => (
            <SwiperSlide key={index}>
              <div
                data-aos="fade-up"
                data-aos-delay={car.aosDelay}
                className="space-y-3 p-3 rounded-xl relative group hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-[200px]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{car.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${car.price}/day</p>
                    <a href="#">Details</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid place-items-center mt-8">
          <button className="button-outline" onClick={handleViewInventory}>
            View All Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;





  
  
  
