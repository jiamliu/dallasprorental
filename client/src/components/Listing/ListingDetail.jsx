import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCamera, FaMapMarkerAlt, FaApple, FaParking, FaSun, FaSnowflake, FaKey, FaCar, FaChild, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineChildCare, MdOutlinePets } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ListingDetail = ({ carId }) => {
  const [car, setCar] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInsuranceInfo, setShowInsuranceInfo] = useState(false);
  const [pickUpDate, setPickUpDate] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [dropOffTime, setDropOffTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();

    fetch(`http://127.0.0.1:8000/api/cars/${carId}/`)
      .then(response => response.json())
      .then(data => {
        setCar(data);
        setActiveIndex(0);
      })
      .catch(error => console.error('Failed to load car data:', error));
  }, [carId]);

  const nextSlide = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % (car.photos.length - 1));
  };

  const previousSlide = () => {
    setActiveIndex(prevIndex => (prevIndex - 1 + (car.photos.length - 1)) % (car.photos.length - 1));
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  const toggleInsuranceInfo = () => {
    setShowInsuranceInfo(!showInsuranceInfo);
  };

  const handleBookNow = () => {
    navigate(`/reserve/${car.id}`, {
      state: {
        car,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow container mt-6 mx-auto py-6 flex justify-between">
        <div className="flex-1 mr-4">
          <h1 className="text-white text-6xl mb-4 ml-2">Vehicle Detail</h1>
          <div className="relative h-[36rem] w-2/3 ml-4 overflow-hidden rounded-lg" data-aos="zoom-out-right" data-aos-delay="400">
            {car.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={photo.photo}
                alt={`Vehicle photo ${index + 2}`}
                className={`absolute transition-opacity duration-700 ease-in-out w-full h-full object-contain ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}

            <button onClick={previousSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full">
              &#8592;
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full">
              &#8594;
            </button>
          </div>
          <h2 className="text-white text-4xl mb-8 mt-4 ml-4">Vehicle Highlights</h2>
          <div className="mt-4 grid grid-cols-3 gap-y-8 gap-x-4 text-white text-center text-sm font-bold ml-4 w-2/3">
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
              <FaCamera className="text-primary" size={24} />
              <span>{car.option_camera}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-primary" size={24} />
              <span>{car.option_navigation}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col items-center">
              <FaApple className="text-primary" size={24} />
              <span>{car.option_carplay}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
              <MdVisibility className="text-primary" size={24} />
              <span>{car.option_blindspot}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center">
              <FaParking className="text-primary" size={24} />
              <span>{car.option_parkingassist}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col items-center">
              <FaSun className="text-primary" size={24} />
              <span>{car.option_sunroof}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
              <FaSnowflake className="text-primary" size={24} />
              <span>{car.option_heatcoolseat}</span>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center">
              <FaKey className="text-primary" size={24} />
              <span>{car.option_keyless}</span>
            </div>
          </div>
        </div>
        <div className="sticky top-20 self-start p-4 bg-gray-300 shadow-lg rounded-lg w-full max-w-lg mx-2">
          <div className="flex justify-between items-center">
            <p className="text-5xl font-semibold mb-12">${car.price}/day</p>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Pick-up Date</label>
                <input
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Start Date"
                />
              </div>
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Pick-up Time</label>
                <input
                  type="time"
                  value={pickUpTime}
                  onChange={(e) => setPickUpTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Pick-up Time"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Drop-off Date</label>
                <input
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="End Date"
                />
              </div>
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Drop-off Time</label>
                <input
                  type="time"
                  value={dropOffTime}
                  onChange={(e) => setDropOffTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Drop-off Time"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Pick-up Location</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  <option value="" disabled selected>Select Pick-up Location</option>
                  <option value="dallas">Dallas, TX</option>
                  <option value="atlanta">Atlanta, GA</option>
                </select>
              </div>
              <div className="relative w-1/2">
                <label className="text-gray-700 dark:text-black font-bold">Drop-off Location</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  <option value="" disabled selected>Select Drop-off Location</option>
                  <option value="dallas">Dallas, TX</option>
                  <option value="atlanta">Atlanta, GA</option>
                </select>
              </div>
            </div>
            <div className="mt-2 p-2 bg-gray-400 rounded-lg shadow">
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex space-x-2 items-center">
                  <FaCar className="text-yellow-500" size={24} />
                  <span className="font-semibold">200 miles/day</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <MdOutlinePets className="text-yellow-500" size={24} />
                  <span className="font-semibold">No pet allowed</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <MdOutlineChildCare className="text-yellow-500" size={24} />
                  <span className="font-semibold">Child seat available</span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center space-x-2">
                <FaChild className="text-yellow-500" size={24} />
                <span className="font-semibold">Age Requirement: 25+</span>
              </div>
              <hr className="my-4" />
              <div>
                <button className="text-black flex items-center space-x-2" onClick={toggleInsuranceInfo}>
                  <FaQuestionCircle className="text-yellow-500" size={24} />
                  <span className="font-semibold">Insurance Via Travelers</span>
                </button>
                {showInsuranceInfo && (
                  <div className="mt-2 p-4 bg-gray-200 rounded-lg shadow-lg">
                    <p className="text-justify">
                      <strong>Note:</strong> Get the peace of mind with Travelers Insurance. This insurance plan covers liability, collision, and comprehensive coverage for the duration of your rental period.
                    </p>
                    <button className="mt-2 text-yellow-500 flex items-center space-x-2" onClick={toggleInsuranceInfo}>
                      <AiOutlineCloseCircle size={24} />
                      <span>Close</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button onClick={handleBookNow} className="bg-primary text-white py-2 px-4 rounded-md text-sm font-bold mx-auto block">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;



































