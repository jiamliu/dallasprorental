import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../Footer/Footer.jsx';
import { Link } from 'react-router-dom';

function InventoryList() {
    const [location, setLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [brand, setBrand] = useState('');
    const [carType, setCarType] = useState('');
    const [price, setPrice] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [seats, setSeats] = useState('');
    const [petFriendly, setPetFriendly] = useState('');
    const [childSeat, setChildSeat] = useState('');
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        fetchCars();
    }, []);

    useEffect(() => {
        filterCars();
    }, [brand, carType, price, startYear, endYear, cylinder, seats, petFriendly, childSeat, location, pickupDate, dropoffDate, cars]);

    const fetchCars = () => {
        let url = 'http://127.0.0.1:8000/api/cars/';
        if (pickupDate && dropoffDate) {
            url += `?pickup_date=${pickupDate}&dropoff_date=${dropoffDate}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setFilteredCars(data);
            })
            .catch(error => console.error('Error fetching cars:', error));
    };

    const filterCars = () => {
        let results = cars.filter(car => {
            const matchesBrand = !brand || car.make.toLowerCase().includes(brand.toLowerCase());
            const matchesType = !carType || car.type.toLowerCase() === carType.toLowerCase();
            const matchesPrice = !price || (car.price && parseFloat(car.price) <= parseFloat(price));
            const matchesYear = (!startYear || car.year >= parseInt(startYear)) && (!endYear || car.year <= parseInt(endYear));
            const matchesCylinder = !cylinder || car.cylinder === parseInt(cylinder);
            const matchesSeats = !seats || car.seats === parseInt(seats);
            const matchesPetFriendly = petFriendly === '' || car.pet_friendly === (petFriendly === 'yes');
            const matchesChildSeat = childSeat === '' || car.child_seat === (childSeat === 'yes');
            return matchesBrand && matchesType && matchesPrice && matchesYear && matchesCylinder && matchesSeats && matchesPetFriendly && matchesChildSeat;
        });
        setFilteredCars(results);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white pt-20">
            <div className="w-full px-4 py-4">
                <div className="w-full bg-gray-100 px-20 py-20 shadow mb-4">
                    <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <label htmlFor="location" className="text-xl font-bold">Location:</label>
                            <select id="location" value={location} onChange={e => setLocation(e.target.value)} className="border rounded p-2 w-full">
                                <option value="">Select Location</option>
                                <option value="Dallas, TX">Dallas, TX</option>
                                <option value="Atlanta, GA">Atlanta, GA</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="pickupDate" className="text-xl font-bold">Pick-up Date:</label>
                            <input id="pickupDate" type="datetime-local" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="border rounded p-2 w-full" />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="dropoffDate" className="text-xl font-bold">Drop-off Date:</label>
                            <input id="dropoffDate" type="datetime-local" value={dropoffDate} onChange={e => setDropoffDate(e.target.value)} className="border rounded p-2 w-full" />
                        </div>
                        <div className="col-span-1 flex items-end">
                            <button onClick={fetchCars} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full">Search</button>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow mr-4">
                        <div className="mb-4">
                            <label htmlFor="yearRange" className="text-xl font-bold">Year Range:</label>
                            <div className="flex">
                                <input id="startYear" type="number" placeholder="From" min="1900" max="2024" value={startYear} onChange={e => setStartYear(e.target.value)} className="border rounded p-2 mr-2 w-full" />
                                <input id="endYear" type="number" placeholder="To" min="1900" max="2024" value={endYear} onChange={e => setEndYear(e.target.value)} className="border rounded p-2 w-full" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="brand" className="text-xl font-bold">Brand:</label>
                            <select id="brand" className="w-full border rounded p-2" value={brand} onChange={e => setBrand(e.target.value)}>
                                <option value="">All Brands</option>
                                <option value="Honda">Honda</option>
                                <option value="Kia">Kia</option>
                                <option value="Lexus">Lexus</option>
                                <option value="Nissan">Nissan</option>
                                <option value="Volkswagen">Volkswagen</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="text-xl font-bold">Type:</label>
                            <select id="type" className="w-full border rounded p-2" value={carType} onChange={e => setCarType(e.target.value)}>
                                <option value="">All Types</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="text-xl font-bold">Price:</label>
                            <input id="price" type="number" placeholder="Max Price" className="w-full border rounded p-2" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cylinder" className="text-xl font-bold">Cylinders:</label>
                            <input id="cylinder" type="number" placeholder="Cylinder" className="border rounded p-2 w-full" value={cylinder} onChange={e => setCylinder(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="seats" className="text-xl font-bold">Seats:</label>
                            <input id="seats" type="number" placeholder="Seats" className="border rounded p-2 w-full" value={seats} onChange={e => setSeats(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="petFriendly" className="text-xl font-bold">Pet Friendly:</label>
                            <select id="petFriendly" className="border rounded p-2 w-full" value={petFriendly} onChange={e => setPetFriendly(e.target.value)}>
                                <option value="">Any</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="childSeat" className="text-xl font-bold">Child Seat:</label>
                            <select id="childSeat" className="border rounded p-2 w-full" value={childSeat} onChange={e => setChildSeat(e.target.value)}>
                                <option value="">Any</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {filteredCars.map((car) => (
                        <div key={car.id} className="bg-white p-4 rounded-lg shadow relative mb-4" data-aos="fade-up">
                            <h3 className="font-bold">{`${car.year} ${car.make} ${car.model}`}</h3>
                            {car.photos && car.photos.length > 0 ? (
                                <img src={car.photos[0].photo} alt="Car photo" className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">No image available</div>
                            )}
                            <p>Type: {car.type}</p>
                            <p className="text-lg font-semibold">${car.price}</p>
                            <Link to={`/listing/${car.id}`}> 
                                <button className="absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">
                                    Rent Now
                                </button>
                            </Link>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default InventoryList;



























