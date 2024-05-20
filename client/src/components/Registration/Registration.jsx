import React, { useState, useEffect } from 'react';
import registerImg from '../../assets/login.png';
import AOS from "aos";
import { FaUserPlus } from 'react-icons/fa';
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    try {
        const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
            username: formData.fullName,
            email: formData.email,
            password1: formData.password,
            password2: formData.confirmPassword
        });
        console.log(response.data);
        alert('Registration successful');
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Registration error:', error.response.data);
            setErrors(error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Registration error: No response received', error.request);
            alert('Registration failed: No response from server');
        } else {
            // Something else caused the error
            console.error('Registration error:', error.message);
            alert('Registration failed');
        }
    }
  };

  return (
    <div className='bg-primary grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:flex sm:items-center sm:justify-center'>
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className='w-full max-w-lg mx-auto'
        >
          <img className='w-full h-auto object-cover max-h-[1080px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]' src={registerImg} alt="Register Visual" />
        </div>
      </div>
      <div className='bg-primary flex flex-col justify-center'>
        <form
          className='max-w-[400px] w-full mx-auto bg-gray-100 p-4 rounded-lg'
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-offset="300"
          data-aos-delay="500"
          onSubmit={handleSubmit}
        >
          <h2 className='text-4xl font-bold text-center py-6'>Join Us Today</h2>
          <div className='flex flex-col py-2'>
            <label>Full Name</label>
            <input className='border p-2' type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>
          <div className='flex flex-col py-2'>
            <label>Email Address</label>
            <input className='border p-2' type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className='flex flex-col py-2'>
            <label>Password</label>
            <input className='border p-2' type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password1 && <p className="text-red-500">{errors.password1}</p>}
          </div>
          <div className='flex flex-col py-2'>
            <label>Confirm Password</label>
            <input className='border p-2' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.password2 && <p className="text-red-500">{errors.password2}</p>}
          </div>
          <button type="submit" className='flex items-center justify-center space-x-2 border w-full my-5 py-2 bg-primary hover:bg-indigo-500 rounded-lg text-white'>
            <FaUserPlus className="text-white"/> 
            <span>Register</span>
          </button>
          <p className='text-center'>
            Already have an account? 
            <Link to="/login" className='cursor-pointer text-blue-500 hover:text-blue-700'>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;





