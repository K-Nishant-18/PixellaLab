import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaArrowRight, FaSpinner } from 'react-icons/fa';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';
import Toast from '../components/UI/Toast';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setToast({ show: true, message: 'We have received your message. We will reach out shortly.', type: 'success' });
            e.target.reset();
        }, 2000);
    };

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                <Toast
                    isVisible={toast.show}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">

                    {/* Left: Info */}
                    <div className="p-8 md:p-20 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between bg-bg-primary">
                        <div>
                            <div className="mb-8">
                                <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                                    Let's
                                </TextReveal>
                                <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-accent leading-[0.9]">
                                    Talk.
                                </TextReveal>
                            </div>
                            <p className="text-xl text-text-secondary max-w-md font-light mb-12">
                                Have a project in mind? Let’s build something digital, professional, and impactful together.
                            </p>

                            <div className="space-y-6 max-w-sm">
                                <a href="#" className="flex items-center justify-between p-6 border border-border group hover:bg-text-accent hover:border-text-accent hover:text-white transition-all">
                                    <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                                        <FaWhatsapp size={20} /> WhatsApp
                                    </span>
                                    <FaArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                                <a href="#" className="flex items-center justify-between p-6 border border-border group hover:bg-text-accent hover:border-text-accent hover:text-white transition-all">
                                    <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                                        <FaEnvelope size={20} /> Email Us
                                    </span>
                                    <FaArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 hidden lg:block text-text-secondary text-sm">
                            Based in the Cloud. Serving brands globally.
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-8 md:p-20 bg-bg-secondary flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="space-y-8 max-w-lg w-full mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Name</label>
                                    <input required type="text" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="Rahul Sharma" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Company</label>
                                    <input type="text" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="Sharma Enterprises" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email</label>
                                    <input required type="email" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="rahul@example.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Phone</label>
                                    <input type="tel" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="+91 98765 43210" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Project Type</label>
                                    <select className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors rounded-none cursor-pointer">
                                        <option>Website Design</option>
                                        <option>E-commerce</option>
                                        <option>Branding</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Budget</label>
                                    <select className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors rounded-none cursor-pointer">
                                        <option>₹5k - ₹15k</option>
                                        <option>₹15k - ₹30k</option>
                                        <option>₹30k - ₹50k</option>
                                        <option>₹50k+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Details</label>
                                <textarea required className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 min-h-[120px] resize-none rounded-none" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <MagneticButton
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 font-bold text-lg uppercase tracking-widest transition-colors mt-8 flex items-center justify-center gap-3 ${isSubmitting ? 'bg-text-secondary cursor-not-allowed text-bg-primary' : 'bg-text-primary text-bg-primary hover:bg-text-accent'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Sending...
                                    </>
                                ) : 'Send Message'}
                            </MagneticButton>
                        </form>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
