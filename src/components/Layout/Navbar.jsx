import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiDownload } from 'react-icons/hi';
import ThemeToggle from '../UI/ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Listen for theme changes
    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(localStorage.getItem('theme') || 'dark');
        };

        // Check for theme changes periodically
        const interval = setInterval(handleThemeChange, 100);

        return () => clearInterval(interval);
    }, []);

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Process', path: '/how-it-works' },
        { name: 'Work', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-border bg-bg-primary transition-colors duration-300">
            <div className="w-full px-6 md:px-12 flex items-center justify-between h-20">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group z-20">
                    <img
                        src={theme === 'dark' ? '/PixellaLab-Logo-Dark.png' : '/PixellaLab-Logo.png'}
                        alt="Pixella Labs Logo"
                        className="h-10 w-auto"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-text-primary tracking-tighter">
                        Pixella Labs<span className="text-text-accent">.</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-text-primary underline underline-offset-4' : 'text-text-secondary hover:text-text-primary'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-6">
                    <ThemeToggle />

                    {/* Brochure Download */}
                    <a
                        href="/Pixella_Labs_Brochure.pdf"
                        download
                        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <HiDownload className="text-lg" />
                        <span>Brochure</span>
                    </a>

                    <Link to="/contact">
                        <button type="button" className="px-6 py-2.5 bg-text-primary text-bg-primary font-medium text-sm rounded-sm hover:bg-transparent hover:text-text-primary border border-text-primary transition-all">
                            Start a Project
                        </button>
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="z-20 text-text-primary focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                    </button>
                </div>
            </div >

            {/* Mobile Menu Overlay */}
            < AnimatePresence >
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-bg-primary z-10 flex flex-col pt-32 px-12 md:hidden"
                    >
                        <ul className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `text-3xl font-medium tracking-tight ${isActive ? 'text-text-accent' : 'text-text-primary'}`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="pt-8 border-t border-border mt-8 space-y-4">
                                <a
                                    href="/Pixella_Labs_Brochure.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 w-full py-4 border border-border text-text-primary font-medium text-lg rounded-sm hover:bg-bg-secondary transition-colors"
                                >
                                    <HiDownload />
                                    <span>Brochure</span>
                                </a>
                                <Link to="/contact" className="block">
                                    <button className="w-full py-4 bg-text-accent text-white font-medium text-lg rounded-sm">
                                        Start a Project
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence >
        </nav >
    );
};

export default Navbar;
