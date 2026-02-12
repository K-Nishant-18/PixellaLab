import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaArrowRight, FaSpinner } from 'react-icons/fa';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';
import Toast from '../components/UI/Toast';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [inquiryType, setInquiryType] = useState('project'); // 'project' or 'audit'
    const [showCustomBudget, setShowCustomBudget] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Collect form data
        const formData = {
            inquiryType,
            name: e.target.name.value,
            company: e.target.company.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            // Project specific
            projectType: inquiryType === 'project' ? e.target.projectType?.value : undefined,
            budget: inquiryType === 'project' ? (showCustomBudget ? e.target.customBudget?.value : e.target.budget?.value) : undefined,
            // Audit specific
            websiteUrl: inquiryType === 'audit' ? e.target.websiteUrl?.value : undefined,
            // Common
            details: e.target.details.value
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setToast({ show: true, message: 'Message sent successfully! We will reach out shortly.', type: 'success' });
                e.target.reset();
            } else {
                setToast({ show: true, message: data.message || 'Failed to send message. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setToast({ show: true, message: 'Network error. Please check your connection and try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
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

                            {/* Free Audit Section */}
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-text-accent animate-pulse"></span>
                                    Free Website & App Audit
                                </h3>
                                <p className="text-text-secondary mb-6 font-light">
                                    Not sure why your website isn’t converting? We’re offering a free 30-minute audit where we review:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-3 text-text-primary text-sm font-medium">
                                        <span className="text-text-accent">✓</span> Website speed & performance
                                    </li>
                                    <li className="flex items-center gap-3 text-text-primary text-sm font-medium">
                                        <span className="text-text-accent">✓</span> Design & UX issues
                                    </li>
                                    <li className="flex items-center gap-3 text-text-primary text-sm font-medium">
                                        <span className="text-text-accent">✓</span> SEO & technical gaps
                                    </li>
                                    <li className="flex items-center gap-3 text-text-primary text-sm font-medium">
                                        <span className="text-text-accent">✓</span> Backend / scalability risks
                                    </li>
                                </ul>
                                <p className="text-xs text-text-secondary uppercase tracking-widest font-bold border-l-2 border-text-accent pl-4">
                                    No sales pressure. Just clear, actionable feedback.
                                </p>
                            </div>

                            <div className="space-y-6 max-w-sm">
                                <a href="https://wa.me/918986412823" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 border border-border group hover:bg-text-accent hover:border-text-accent hover:text-white transition-all">
                                    <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                                        <FaWhatsapp size={20} /> WhatsApp Us
                                    </span>
                                    <FaArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                                <a href="mailto:hello@pixellalabs.studio" className="flex items-center justify-between p-6 border border-border group hover:bg-text-accent hover:border-text-accent hover:text-white transition-all">
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

                            {/* Inquiry Type Toggle */}
                            <div className="flex p-1 bg-bg-primary border border-border rounded-sm mb-8">
                                <button
                                    type="button"
                                    onClick={() => setInquiryType('project')}
                                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all ${inquiryType === 'project' ? 'bg-text-accent text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                                >
                                    Start a Project
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInquiryType('audit')}
                                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all ${inquiryType === 'audit' ? 'bg-text-accent text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                                >
                                    Get Free Audit
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Name</label>
                                    <input required type="text" name="name" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="Rahul Sharma" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Company</label>
                                    <input type="text" name="company" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="Sharma Enterprises" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email</label>
                                    <input required type="email" name="email" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="rahul@example.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Phone</label>
                                    <input type="tel" name="phone" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="+91 98765 43210" />
                                </div>
                            </div>

                            {/* Conditional Fields */}
                            {inquiryType === 'project' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Project Type</label>
                                        <select name="projectType" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors rounded-none cursor-pointer">
                                            <option>Website Design</option>
                                            <option>E-commerce</option>
                                            <option>Branding</option>
                                            <option>Maintenance</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Budget</label>
                                        {showCustomBudget ? (
                                            <div className="flex gap-2">
                                                <input
                                                    required
                                                    name="customBudget"
                                                    type="text"
                                                    className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none"
                                                    placeholder="Enter your budget"
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCustomBudget(false)}
                                                    className="text-xs font-bold uppercase tracking-widest text-text-accent hover:text-text-primary self-center p-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <select
                                                name="budget"
                                                className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors rounded-none cursor-pointer"
                                                onChange={(e) => setShowCustomBudget(e.target.value === 'Custom')}
                                            >
                                                <option>₹5k - ₹15k</option>
                                                <option>₹15k - ₹30k</option>
                                                <option>₹30k - ₹50k</option>
                                                <option>₹50k+</option>
                                                <option value="Custom">Custom Budget</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Website URL</label>
                                        <input required name="websiteUrl" type="url" className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 rounded-none" placeholder="https://your-website.com" />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                    {inquiryType === 'project' ? 'Project Details' : 'Current Pain Points'}
                                </label>
                                <textarea
                                    required
                                    name="details"
                                    className="w-full bg-transparent border-b border-text-secondary/30 py-4 text-xl text-text-primary focus:border-text-accent focus:outline-none transition-colors placeholder:text-text-secondary/20 min-h-[120px] resize-none rounded-none"
                                    placeholder={inquiryType === 'project' ? "Tell us about your project..." : "What specific issues are you facing?"}
                                ></textarea>
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
                                ) : (inquiryType === 'project' ? 'Start Project' : 'Request Free Audit')}
                            </MagneticButton>
                        </form>
                    </div>

                </div>
            </div>
        </PageTransition >
    );
};

export default Contact;
