import React, { useState, useEffect } from 'react';
import loginImg from '../../assets/login2.png';
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { FaLock } from 'react-icons/fa';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate(); 
    const { login } = useAuth();

    useEffect(() => {
        AOS.init();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.username, formData.password);
    };

    return (
        <div className='bg-primary grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:flex sm:items-center sm:justify-center'>
                <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-offset="500"
                    data-aos-anchor="example-anchor"
                    className='w-full max-w-xl mx-auto'
                >
                    <img className='w-full h-auto object-cover max-h-[1080px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]' src={loginImg} alt="Login Visual" />
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
                    <h2 className='text-4xl font-bold text-center py-6'>Log In to Start Your Journey with Us</h2>
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input className='border p-2' type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input className='border p-2' type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button className='flex items-center justify-center space-x-2 border w-full my-5 py-2 bg-primary hover:bg-indigo-500 rounded-lg text-white'>
                        <FaLock className="text-white"/> 
                        <span>Sign In</span>
                    </button>
                    <div className='flex justify-between'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p>Create an account</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
















