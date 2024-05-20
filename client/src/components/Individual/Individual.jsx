import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar } from "react-icons/fa";
import { MdChildCare, MdPets, MdEventSeat, MdOutlineDescription, MdHelpOutline } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import Footer from '../Footer/Footer';

function Individual() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cars/${carId}/`)
            .then(response => response.json())
            .then(data => {
                setCar(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching car data:', error);
                setLoading(false);
            });
    }, [carId]);

    if (loading) return <div>Loading...</div>;
    if (!car) return <div>No car data available.</div>;

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === car.photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? car.photos.length - 1 : prevIndex - 1
        );
    };

    const descriptionElements = car.description.split('\n').map((item, index) => (
        <p key={index} className="text-lg mb-4">{item}</p>
    ));

    return (
        <div className="flex flex-col min-h-screen justify-center">
            <div className="flex-grow container mx-auto pt-40 py-6 flex justify-between">
                <div className="flex-1 pr-4">
                    <img src={car.photos[selectedImageIndex].photo} alt="Selected Car" className="w-full h-96 object-cover" />
                    <div className="mt-2 flex justify-center items-center">
                        <button onClick={previousImage} className="bg-gray-800 text-white p-1 rounded-full mx-2">&#8592;</button>
                        {car.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.photo}
                                alt={`Thumbnail ${index}`}
                                className={`w-24 h-24 mr-2 cursor-pointer object-cover ${index === selectedImageIndex ? 'ring-2 ring-yellow-500' : ''}`}
                                onClick={() => handleImageSelect(index)}
                            />
                        ))}
                        <button onClick={nextImage} className="bg-gray-800 text-white p-1 rounded-full mx-2">&#8594;</button>
                    </div>
                    <div className="mt-12">
                        <div className="text-5xl font-bold mb-8 mt-12 mr-[500px]">Vehicle Specification</div>
                        <div className="flex gap-4 mb-4">
                            <FaCar className="text-4xl" />
                            <span className="text-2xl">Type: {car.type}</span>
                            <MdEventSeat className="text-4xl" />
                            <span className="text-2xl">Seats: {car.seats}</span>
                            <TbEngine className="text-4xl" />
                            <span className="text-2xl">Cylinders: {car.cylinder}</span>
                        </div>
                        <div className="flex gap-4 mb-12">
                            <MdChildCare className="text-4xl" />
                            <span className="text-2xl">Child Seat: {car.childSeat ? 'Available' : 'Not Available'}</span>
                            <MdPets className="text-4xl" />
                            <span className="text-2xl">Pet Friendly: {car.petFriendly ? 'Yes' : 'No'}</span>
                        </div>


                        <div className="text-4xl font-bold mb-8">Description:</div>
                        <div className="text-justify text-lg mb-4">
                        {showMore ? descriptionElements : descriptionElements[0]}
                        <button onClick={() => setShowMore(!showMore)} className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4">
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 ml-[150px] mt-16">
                    <div className="text-5xl font-bold mb-4">{`${car.year} ${car.make} ${car.model}`}</div>
                    <h3 className="text-4xl font-bold mb-4">Price: ${car.price}</h3>
                    <div className="text-5xl font-bold ml-[50px] mt-[410px]">Rental Detail</div>
                    <div className="mt-8">
                        <label className="block font-medium text-lg font-bold ml-[50px]">Start Date</label>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} className="p-2 border rounded ml-[50px]" />
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium text-lg font-bold ml-[50px]">End Date</label>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} className="p-2 border rounded ml-[50px]" />
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium text-lg font-bold ml-[50px]">Pick-Up and Drop-Off Location</label>
                        <select className="ml-[50px] p-2 border rounded w-full" value={location} onChange={e => setLocation(e.target.value)}>
                            <option value="">Select Location</option>
                            <option value="Dallas, TX">Dallas, TX</option>
                            <option value="Atlanta, GA">Atlanta, GA</option>
                        </select>
                    </div>
                    <div className="mt-4 text-lg ml-[50px]">Free Cancellation</div>
                    <div className="mt-2 text-lg ml-[50px]">Distance Included: 200 miles/day</div>
                    <div className="mt-2 flex items-center text-lg ml-[50px]">
                        <span>Insurance via Travelers</span>
                        <MdHelpOutline className="ml-2 cursor-pointer" onMouseEnter={() => setShowHelp(true)} onMouseLeave={() => setShowHelp(false)} />
                        {showHelp && (
                            <div className="absolute bg-white p-4 border rounded shadow-lg mt-2">
                                "The Travelers policy provides secondary (excess) coverage for third-party liability unless primary coverage is explicitly required by an applicable state statute (e.g., Maryland and New York). Liability coverage is typically the minimum amount required by law, except in some states and at some airports that require additional coverage. For New York trips, the liability coverage is $1,250,000. Protection plans also come with 24/7 customer support and access to roadside service, subject to additional terms, conditions, and costs."
                            </div>
                        )}
                    </div>
                    <button className="ml-[50px] mt-8 mb-24 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 w-1/3 mx-auto">
                        Rent Now
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Individual;































