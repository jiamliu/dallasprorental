import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../Footer/Footer';

const Reserve = () => {
  const { carId } = useParams();
  const location = useLocation();
  const [carDetails, setCarDetails] = useState(null);
  const [rentalInfo, setRentalInfo] = useState({
    car: carId,
    pick_up_date: location.state?.pickUpDate || '',
    pick_up_time: location.state?.pickUpTime || '',
    drop_off_date: location.state?.dropOffDate || '',
    drop_off_time: location.state?.dropOffTime || '',
    location: '',
    rental_days: 0,
    daily_rate: location.state?.car?.price || 0,
    insurance_rate: 39,
    first_name: '',
    last_name: '',
    driver_license: '',
    driver_state: '',
    driver_address: '',
    phone_number: '',
    email: '',
    credit_card_number: '',
    expire_date: '',
    security_number: '',
    billing_address: '',
  });
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    AOS.init();
    fetchCarDetails();
  }, []);

  useEffect(() => {
    calculateTotalCost();
  }, [rentalInfo.pick_up_date, rentalInfo.drop_off_date, rentalInfo.daily_rate, rentalInfo.insurance_rate]);

  const fetchCarDetails = () => {
    fetch(`http://127.0.0.1:8000/api/cars/${carId}/`)
      .then((response) => response.json())
      .then((data) => setCarDetails(data))
      .catch((error) => console.error('Error fetching car details:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotalCost = () => {
    const rentalDays =
      Math.ceil(
        (new Date(rentalInfo.drop_off_date) - new Date(rentalInfo.pick_up_date)) /
          (1000 * 60 * 60 * 24)
      ) || 0;
    const dailyCost = rentalDays * (rentalInfo.daily_rate || 0);
    const insuranceCost = rentalDays * (rentalInfo.insurance_rate || 0);
    const tax = (dailyCost + insuranceCost) * 0.07;
    setTotalCost(dailyCost + insuranceCost + tax);
    setRentalInfo((prev) => ({
      ...prev,
      rental_days: rentalDays,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:8000/api/rentals/';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rentalInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit rental info');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        alert('Rental information submitted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Vehicle had been booked for the selected date');
      });
  };

  const carImage = carDetails?.photos?.[0]?.photo || 'default_image_url';
  const carMake = carDetails?.make || 'Unknown Make';
  const carModel = carDetails?.model || 'Unknown Model';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <div className="container mx-auto px-4 py-12 mt-24 flex flex-col items-center">
        <div className="flex flex-wrap justify-between w-full max-w-5xl">
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <img src={carImage} alt="Car" className="w-full h-40 object-cover rounded mb-4" />
            <p className="text-lg">Car: {carMake} {carModel}</p>
            <p className="text-lg">Rental Days: {rentalInfo.rental_days}</p>
            <p className="text-lg">Daily Rate: ${rentalInfo.daily_rate}</p>
            <p className="text-lg">Insurance Rate: ${rentalInfo.insurance_rate}</p>
            <p className="text-lg font-bold">Total Cost: ${totalCost.toFixed(2)}</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Driver Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={rentalInfo.first_name}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={rentalInfo.last_name}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Driver License</label>
                <input
                  type="text"
                  name="driver_license"
                  value={rentalInfo.driver_license}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Driver State</label>
                <input
                  type="text"
                  name="driver_state"
                  value={rentalInfo.driver_state}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Driver Address</label>
                <input
                  type="text"
                  name="driver_address"
                  value={rentalInfo.driver_address}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={rentalInfo.phone_number}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={rentalInfo.email}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-6">Rental Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2">Pick-Up Date</label>
                <input
                  type="date"
                  name="pick_up_date"
                  value={rentalInfo.pick_up_date}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Pick-Up Time</label>
                <input
                  type="time"
                  name="pick_up_time"
                  value={rentalInfo.pick_up_time}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Drop-Off Date</label>
                <input
                  type="date"
                  name="drop_off_date"
                  value={rentalInfo.drop_off_date}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Drop-Off Time</label>
                <input
                  type="time"
                  name="drop_off_time"
                  value={rentalInfo.drop_off_time}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={rentalInfo.location}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold mb-2">Credit Card Number</label>
                <input
                  type="text"
                  name="credit_card_number"
                  value={rentalInfo.credit_card_number}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Expire Date</label>
                <input
                  type="date"
                  name="expire_date"
                  value={rentalInfo.expire_date}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Security Number</label>
                <input
                  type="text"
                  name="security_number"
                  value={rentalInfo.security_number}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Billing Address</label>
                <input
                  type="text"
                  name="billing_address"
                  value={rentalInfo.billing_address}
                  onChange={handleChange}
                  className="form-input w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-primary text-white py-2 px-4 rounded font-bold hover:bg-primary-dark transition-colors">
                Reserve Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reserve;






















