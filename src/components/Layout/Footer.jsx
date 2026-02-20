import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    // Listen for theme changes
    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(localStorage.getItem('theme') || 'dark');
        };

        // Check for theme changes periodically
        const interval = setInterval(handleThemeChange, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-bg-primary border-t border-border mt-auto max-w-[1920px] mx-auto w-full border-x">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">

                {/* Brand Column - Huge */}
                <div className="md:col-span-12 lg:col-span-5 p-12 lg:border-r border-border flex flex-col justify-between">
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <img
                                src={theme === 'dark' ? '/PixellaLab-Logo-Dark.png' : '/PixellaLab-Logo.png'}
                                alt="Pixella Labs Logo"
                                className="h-12 w-auto"
                            />
                            <span className="text-3xl font-bold tracking-tighter text-text-primary">
                                Pixella Labs<span className="text-text-accent">.</span>
                            </span>
                        </Link>
                        <p className="text-xl text-text-secondary max-w-sm leading-relaxed font-light">
                            Where brands go digital. <br />
                            Clean, fast, and conversion-focused websites.
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="group relative w-12 h-12 flex items-center justify-center border border-border text-text-primary hover:bg-text-accent hover:text-white hover:border-text-accent transition-all cursor-help focus:outline-none"
                        >
                            <FaInstagram size={20} />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                Coming Soon
                            </span>
                        </a>
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="group relative w-12 h-12 flex items-center justify-center border border-border text-text-primary hover:bg-text-accent hover:text-white hover:border-text-accent transition-all cursor-help focus:outline-none"
                        >
                            <FaLinkedin size={20} />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                Coming Soon
                            </span>
                        </a>
                        <a
                            href="https://wa.me/918986412823"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center border border-border text-text-primary hover:bg-text-accent hover:text-white hover:border-text-accent transition-all"
                        >
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-4">
                    <div className="p-12 border-b md:border-b-0 border-r border-border">
                        <h2 className="mb-8 text-xs font-bold text-text-secondary uppercase tracking-widest">Explore</h2>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">About</Link></li>
                            <li><Link to="/portfolio" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Work</Link></li>
                            <li><Link to="/contact" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="p-12 border-b md:border-b-0 border-r border-border">
                        <h2 className="mb-8 text-xs font-bold text-text-secondary uppercase tracking-widest">Services</h2>
                        <ul className="space-y-4">
                            <li><Link to="/services" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Web Design</Link></li>
                            <li><Link to="/services" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">E-commerce</Link></li>
                            <li><Link to="/services" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Branding</Link></li>
                        </ul>
                    </div>
                    <div className="p-12 border-b md:border-b-0 border-r border-border">
                        <h2 className="mb-8 text-xs font-bold text-text-secondary uppercase tracking-widest">Tools</h2>
                        <ul className="space-y-4">
                            <li><Link to="/tools/qr-generator" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">QR Generator</Link></li>
                            <li><Link to="/tools/image-tools" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Image Tools</Link></li>
                        </ul>
                    </div>
                    <div className="p-12">
                        <h2 className="mb-8 text-xs font-bold text-text-secondary uppercase tracking-widest">Legal</h2>
                        <ul className="space-y-4">
                            <li><Link to="/privacy" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Privacy</Link></li>
                            <li><Link to="/terms" className="text-lg font-medium text-text-primary hover:text-text-accent transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-border p-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-text-secondary">
                <span>© {new Date().getFullYear()} Pixella Labs.</span>
                <span className="uppercase tracking-widest text-xs mt-2 md:mt-0">Studio-led • Design-driven • Perfomance-focused</span>
            </div>
        </footer>
    );
};

export default Footer;
