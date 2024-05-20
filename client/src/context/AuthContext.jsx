import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            fetchCurrentUser();
        } else {
            axios.defaults.headers.common['Authorization'] = '';
        }
    }, [token]);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/');
            setUser(response.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            logout();
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response.data);
            alert('Login failed');
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };

    const register = async (username, email, password1, password2) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
                username,
                email,
                password1,
                password2
            });
            console.log('Registration successful:', response.data);
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response.data);
            alert('Registration failed');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

