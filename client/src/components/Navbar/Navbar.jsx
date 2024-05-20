import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useAuth } from '../../context/AuthContext'; 

const NavLinks = [
    { id: "1", name: "Home", link: "/#home" },
    { id: "2", name: "About Us", link: "/#about" },
    { id: "3", name: "Services", link: "/#services" },
    { id: "4", name: "Our Cars", link: "/#carList" },
    { id: "5", name: "Partner With Us", link: "/#partnerWithUs" },
    { id: "6", name: "Career", link: "/career" },
];

function Navbar({ theme, setTheme }) {
    const { pathname } = useLocation();
    const { isLoggedIn, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const hideDropdownTimeout = useRef(null);

    const scrollToSection = (event, link) => {
        if (pathname !== '/') {
            return;
        }
        event.preventDefault();
        const sectionId = link.slice(2);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleMouseEnter = () => {
        if (hideDropdownTimeout.current) {
            clearTimeout(hideDropdownTimeout.current);
        }
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        hideDropdownTimeout.current = setTimeout(() => {
            setShowDropdown(false);
        }, 500);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 shadow-md bg-white ${theme === 'dark' ? 'dark:bg-dark dark:text-white' : 'text-gray-800'} duration-300 py-4`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold font-serif">Dallas Pro Rental</h1>
                <div className="flex items-center gap-8">
                    {NavLinks.map((data) => (
                        <li key={data.id} className="list-none">
                            {data.link.startsWith('/#') ? (
                                <a href={data.link}
                                   className="inline-block p-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                                   onClick={(event) => scrollToSection(event, data.link)}>
                                    {data.name}
                                </a>
                            ) : (
                                <Link to={data.link}
                                      className="inline-block p-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium">
                                    {data.name}
                                </Link>
                            )}
                        </li>
                    ))}
                    <div className="relative"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <button className="inline-block p-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium">
                            Menu
                        </button>
                        {showDropdown && (
                            <ul className={`absolute right-0 w-48 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-gray-900'} shadow-md mt-2 rounded-md py-1`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                {!isLoggedIn ? (
                                    <>
                                        <li><Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link></li>
                                        <li><Link to="/registration" className="block px-4 py-2 hover:bg-gray-100">Registration</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link></li>
                                        <li><Link to="/mycars" className="block px-4 py-2 hover:bg-gray-100">My Cars</Link></li>
                                        <li><button onClick={logout} className="block px-4 py-2 text-left hover:bg-gray-100">Logout</button></li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                    {theme === "dark" ? (
                        <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer"/>
                    ) : (
                        <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer"/>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;





















