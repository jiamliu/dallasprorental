import React, { useState, useEffect } from "react";
import AOS from "aos";

const ListingHero = ({ carId }) => {
  const [car, setCar] = useState(null);

  useEffect(() => {
    AOS.init();
    fetch(`http://127.0.0.1:8000/api/cars/${carId}/`)
      .then(response => response.json())
      .then(data => {
        console.log('Car data loaded:', data);
        setCar(data);
      })
      .catch(error => {
        console.error('Failed to load car data:', error);
      });
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary text-black duration-300">
      <div className="container min-h-[1080px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="zoom-in" data-aos-duration="1500" className="order-1 sm:order-2">
            <img
              src={car.photos[0].photo}
              alt={`Car ${car.make} ${car.model}`}
              className="sm:scale-125 relative -z-10 max-h-[500px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 mb-28 mt-12">
            <p data-aos="fade-up" className="text-5xl font-serif font-semibold mb-8">
              {`${car.year} ${car.make} ${car.model}`}
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-lg lg:text-xl text-justify font-sans" 
            >
              {car.description}
            </h1>
            <div className="flex flex-row justify-around text-center border-t border-b py-4">
              <div data-aos="fade-up" data-aos-delay="1000">
                <p className="font-bold">Cylinders</p>
                <p>{car.cylinder || "N/A"}</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="1200">
                <p className="font-bold">Drivetrain</p>
                <p>{car.drivetrain || "N/A"}</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="1400">
                <p className="font-bold">Fuel Consumption</p>
                <p>{car.fuel_consumption || "N/A"}</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="1600">
                <p className="font-bold">Seats</p>
                <p>{car.seats || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHero;



