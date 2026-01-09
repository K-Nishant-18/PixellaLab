import React from 'react';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';

const About = () => {
    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                {/* Hero */}
                <section className="border-b border-border p-8 md:p-20">
                    <div className="mb-4">
                        <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                            Purpose
                        </TextReveal>
                        <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-secondary leading-[0.9]">
                            Over Hype.
                        </TextReveal>
                    </div>
                </section>

                {/* Story - Split */}
                <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                    <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-border bg-bg-secondary">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary sticky top-32">The Studio</h2>
                    </div>
                    <div className="md:col-span-8 p-12 md:p-20">
                        <div className="prose prose-lg prose-headings:font-display prose-headings:tracking-tight max-w-none text-text-primary">
                            <p className="text-3xl leading-relaxed font-light mb-12 text-text-primary">
                                Pixella Labs is a creative digital studio focused on building high-quality digital experiences for businesses and brands across industries.
                            </p>
                            <div className="grid gap-12 text-xl text-text-secondary leading-relaxed">
                                <p>
                                    We work with local businesses, service providers, and early-stage startups to design websites that are clean, fast, and easy to use — websites that build trust and support real business goals.
                                </p>
                                <p>
                                    Our approach is intentional and collaborative. We take the time to understand the brand, design with purpose, and build digital products that are scalable and future-ready.
                                </p>
                                <p>
                                    From strategy and design to development and ongoing support, we handle the entire process — so our clients can focus on running their business while we handle the digital side.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values - Grid */}
                <section className="border-b border-border">
                    <div className="p-12 border-b border-border text-center">
                        <h2 className="text-4xl font-semibold tracking-tighter text-text-primary">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {[
                            { title: 'Intentional', desc: 'Calm confidence, not loud marketing.' },
                            { title: 'Clear', desc: 'Clear outcomes over buzzwords.' },
                            { title: 'Honest', desc: 'Real capabilities, no exaggerated promises.' }
                        ].map((item, idx) => (
                            <div key={idx} className={`p-16 border-border ${idx < 2 ? 'border-b md:border-b-0 md:border-r' : ''} hover:bg-bg-secondary transition-colors`}>
                                <div className="w-2 h-2 bg-text-accent mb-8"></div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4">{item.title}</h3>
                                <p className="text-text-secondary text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team/Contact Mini CTA */}
                <section className="p-20 text-center bg-bg-secondary">
                    <p className="text-text-secondary uppercase tracking-widest text-sm mb-4">The Team</p>
                    <p className="text-2xl md:text-3xl text-text-primary max-w-2xl mx-auto mb-8 font-light">
                        A small, dedicated team of designers and developers building for the long term.
                    </p>
                </section>

            </div>
        </PageTransition>
    );
};

export default About;
