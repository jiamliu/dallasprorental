import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Profile = () => {
    const { isLoggedIn, token } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchRentals = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/rentals/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setRentals(response.data);
            } catch (error) {
                console.error('Error fetching rentals:', error);
            }
        };

        if (isLoggedIn && token) {
            fetchUserData();
            fetchRentals();
        }
    }, [isLoggedIn, token]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 text-black">
            <Navbar />
            <div className="container mx-auto px-4 py-12 mt-24 flex flex-col items-center">
                <h1 className="text-3xl font-bold font-serif text-center mb-6">Profile Page</h1>
                <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6">User Information</h2>
                    <p className="text-lg mb-4">Username: {user?.username}</p>
                    <p className="text-lg mb-4">Email: {user?.email}</p>
                    <h2 className="text-2xl font-semibold mb-6">Rental Itineraries</h2>
                    {rentals.length > 0 ? (
                        rentals.map((rental) => (
                            <div key={rental.id} className="border p-4 rounded mb-4">
                                <p className="text-lg">Car: {rental.car.make} {rental.car.model}</p>
                                <p className="text-lg">Pick-Up Date: {rental.pick_up_date}</p>
                                <p className="text-lg">Drop-Off Date: {rental.drop_off_date}</p>
                                <p className="text-lg">Location: {rental.location}</p>
                                <p className="text-lg">Price: ${rental.daily_rate}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg">No rental itineraries found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;















