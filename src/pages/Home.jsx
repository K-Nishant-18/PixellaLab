import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';
import AccordionItem from '../components/UI/AccordionItem';
import HeroGrid from '../components/Home/HeroGrid';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(0);

    const services = [
        { title: 'Website Design & Development', desc: 'Custom, scalable, and conversion-focused websites.' },
        { title: 'E-commerce Solutions', desc: 'Seamless shopping experiences that drive sales.' },
        { title: 'Digital Presence', desc: 'Strategic branding and SEO for maximum visibility.' },
        { title: 'Support & Growth', desc: 'Ongoing care and performance optimization.' }
    ];

    const pricingPlans = [
        {
            name: 'Starter Website',
            price: '₹3,000 – ₹6,000',
            desc: 'Best for small businesses & personal brands.',
            features: ['3–4 page website', 'Mobile-friendly design', 'Contact form + WhatsApp CTA', 'Basic SEO setup', 'Fast delivery (5–7 days)']
        },
        {
            name: 'Business Website',
            price: '₹7,000 – ₹12,000',
            desc: 'Best for growing businesses & service providers.',
            highlight: true,
            features: ['Everything in Starter', 'Custom UI/UX design', 'Portfolio / gallery section', 'Google Maps integration', 'Enhanced SEO structure']
        },
        {
            name: 'E-commerce / Advanced',
            price: '₹15,000+',
            desc: 'Best for brands & online selling. (Custom Quote)',
            features: ['Online store setup', 'Product management', 'Payment gateway integration', 'Scalable architecture', 'Advanced SEO & Analytics']
        }
    ];
    const faqs = [
        { q: 'How long does a website take?', a: 'Typically 4-8 weeks, depending on the complexity and scope of the project. We value quality and process over rushing.' },
        { q: 'Do you work with templates?', a: 'No. We are a custom studio. Every pixel is designed with intention for your specific brand goals.' },
        { q: 'Will I be able to edit the site myself?', a: 'Yes. We build on user-friendly CMS platforms (like React, Next.js with Sanity, or Shopify) so you have full control over your content.' },
        { q: 'What is your payment structure?', a: 'We typically work with a 50% deposit to start, and the remaining 50% upon launch. For larger projects, we can discuss milestone-based payments.' }
    ];

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary min-h-screen border-x border-border max-w-[1920px] mx-auto">

                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border">
                    {/* Background Layer: Uneven Merge */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {/* Layer 1: Soft Secondary Background Blob (Right side) */}
                        <div
                            className="absolute top-[-20%] right-[-10%] w-[80%] h-[140%] bg-bg-secondary rounded-full blur-3xl opacity-80"
                            style={{ transform: 'rotate(-10deg)' }}
                        />

                        {/* Layer 2: Accent Gradient Bloom (Middle-Right) */}
                        <div
                            className="absolute top-[20%] right-[30%] w-[40%] h-[80%] bg-text-accent/5 rounded-full blur-[100px]"
                        />

                        {/* Layer 3: Grid Visual with Soft Mask */}
                        <div
                            className="absolute top-0 right-0 w-[75%] h-full pointer-events-auto"
                            style={{
                                maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)'
                            }}
                        >
                            <HeroGrid />
                        </div>
                    </div>

                    <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 h-full pointer-events-none">
                        {/* Left Content */}
                        <div className="lg:col-span-7 flex flex-col justify-center py-20 pointer-events-auto">
                            <div className="max-w-4xl">
                                <span className="block text-sm font-medium tracking-widest uppercase text-text-secondary mb-6">
                                    Digital Studio
                                </span>

                                <div className="mb-5">
                                    <TextReveal className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                                        Where Brands
                                    </TextReveal>
                                    <TextReveal className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-text-accent leading-[0.9] pb-5">
                                        Go Digital.
                                    </TextReveal>
                                </div>

                                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed font-light mb-12">
                                    We design digital experiences that help businesses grow.
                                    Clean, fast, and intentional websites for modern brands.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <Link to="/portfolio" className="group flex items-center gap-3 text-lg font-medium text-text-primary hover:text-text-accent transition-colors">
                                        View Our Work <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/contact" className="group flex items-center gap-3 text-lg font-medium text-text-primary hover:text-text-accent transition-colors">
                                        Get a Free Demo <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy */}
                <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                    <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-border bg-bg-secondary">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">Our Philosophy</h2>
                    </div>
                    <div className="md:col-span-8 p-12 md:p-20">
                        <p className="text-3xl md:text-5xl font-medium leading-tight text-text-primary tracking-tight">
                            We are not a template shop. We are not a freelancer brand.
                            <span className="text-text-secondary"> We are a studio-led digital partner focused on clarity, performance, and long-term value.</span>
                        </p>
                    </div>
                </section>

                {/* Selected Work */}
                <section className="border-b border-border">
                    <div className="p-8 border-b border-border flex justify-between items-end">
                        <h2 className="text-5xl font-semibold tracking-tighter text-text-primary">Selected Work</h2>
                        <Link to="/portfolio" className="text-sm font-medium uppercase tracking-widest hover:text-text-accent transition-colors">View All Projects</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Project 1: Miksha Salon */}
                        <a
                            href="https://miksha-salon.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border-b md:border-b-0 md:border-r border-border relative aspect-[4/3] overflow-hidden block"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center opactiy-80 group-hover:scale-105 transition-all duration-700"
                                style={{ backgroundImage: "url('/Projects/mishka.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="text-3xl font-bold mb-1">Miksha Salon</h3>
                                <p className="text-white/80 font-medium">Live Business Website</p>
                            </div>
                        </a>

                        {/* Project 2: SkillBloom+ */}
                        <a
                            href="https://skillbloom-plus.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group aspect-[4/3] relative overflow-hidden block bg-bg-secondary"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center opactiy-80 group-hover:scale-105 transition-all duration-700"
                                style={{ backgroundImage: "url('/Projects/skillbloom+.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="text-3xl font-bold mb-1">SkillBloom+</h3>
                                <p className="text-white/80 font-medium">LMS Platform</p>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                    <div className="md:col-span-3 p-8 border-r border-border border-b md:border-b-0">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary">Services</h2>
                    </div>
                    <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2">
                        {services.map((item, idx) => (
                            <div key={idx} className={`p-12 hover:bg-bg-secondary transition-colors border-border ${idx % 2 === 0 ? 'md:border-r' : ''} ${idx < 2 ? 'border-b' : ''}`}>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">{item.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing Section (NEW) */}
                <section className="border-b border-border">
                    <div className="p-8 md:p-12 border-b border-border text-center">
                        <h2 className="text-5xl font-semibold tracking-tighter text-text-primary mb-4">Invest in Quality</h2>
                        <p className="text-text-secondary">Transparent pricing for premium results.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {pricingPlans.map((plan, idx) => (
                            <div key={idx} className={`p-12 border-border ${idx < 2 ? 'border-b md:border-b-0 md:border-r' : ''} ${plan.highlight ? 'bg-bg-secondary relative' : ''} hover:bg-bg-secondary transition-colors`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-text-accent"></div>
                                )}
                                <h3 className="text-xl font-bold text-text-secondary uppercase tracking-widest mb-4">{plan.name}</h3>
                                <div className="text-5xl font-bold text-text-primary tracking-tighter mb-6">{plan.price}</div>
                                <p className="text-text-secondary mb-8 h-12">{plan.desc}</p>

                                <ul className="space-y-4 mb-12">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-text-primary">
                                            <FaCheck className="text-text-accent text-sm" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact">
                                    <button className={`w-full py-4 font-bold uppercase tracking-widest text-sm border border-text-primary transition-all ${plan.highlight ? 'bg-text-active text-bg-primary hover:bg-transparent hover:text-text-primary' : 'hover:bg-text-primary hover:text-bg-primary'}`}>
                                        Choose Plan
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section (NEW) */}
                <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-border">
                    <div className="lg:col-span-4 p-12 lg:border-r border-border bg-bg-secondary">
                        <h2 className="text-4xl font-semibold tracking-tighter text-text-primary mb-6">Common <br /> Questions</h2>
                        <p className="text-text-secondary mb-8">
                            Everything you need to know about working with us.
                        </p>
                        <Link to="/contact" className="text-text-accent font-bold uppercase tracking-widest text-sm hover:underline">
                            Ask something else &rarr;
                        </Link>
                    </div>
                    <div className="lg:col-span-8 p-8 md:p-12">
                        {faqs.map((faq, idx) => (
                            <AccordionItem
                                key={idx}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFaq === idx}
                                onClick={() => setOpenFaq(idx === openFaq ? -1 : idx)}
                            />
                        ))}
                    </div>
                </section>

                {/* Industries List */}
                <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
                    <div className="p-16 lg:border-r border-border flex flex-col justify-between">
                        <div>
                            <h2 className="text-5xl font-semibold tracking-tighter text-text-primary mb-4">Industries</h2>
                            <p className="text-xl text-text-secondary">Tailored digital solutions for modern sectors.</p>
                        </div>
                        <div className="mt-12">
                            <div className="text-8xl text-text-accent opacity-20 font-black">2026</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-lg font-medium">
                        {['Local Businesses (Salons, Gyms)', 'Beauty & Grooming', 'Lifestyle & Clothing', 'Startups & Founders', 'Service Providers'].map((item, i) => (
                            <div key={i} className="p-8 border-t border-border first:border-t-0 flex items-center justify-between group hover:bg-bg-secondary transition-colors cursor-default">
                                <span className="text-text-primary">{item}</span>
                                <span className="text-text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-4 text-center bg-text-primary text-bg-primary">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-bg-primary to-bg-secondary">
                            Let's build something impactful.
                        </h2>
                        <p className="text-xl md:text-2xl text-bg-primary/60 mb-12 font-light">
                            Ready to elevate your digital presence?
                        </p>
                        <Link to="/contact">
                            <MagneticButton className="px-10 py-5 bg-bg-primary text-text-primary rounded-sm font-bold text-lg hover:bg-bg-accent transition-all">
                                Request a Free Demo
                            </MagneticButton>
                        </Link>
                    </div>
                </section>

            </div>
        </PageTransition >
    );
};

export default Home;
