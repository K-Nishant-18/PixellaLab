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
                {/* Core Team - Grid */}
                <section className="border-b border-border">
                    <div className="p-12 border-b border-border text-center">
                        <h2 className="text-4xl font-semibold tracking-tighter text-text-primary">Core Team</h2>
                        <p className="text-text-secondary mt-4 uppercase tracking-widest text-sm">The minds behind the pixels.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {[
                            {
                                name: 'Kumar Nishant',
                                role: 'Founder · Studio Lead',
                                bio: 'Leads Pixella Labs and oversees strategy, project direction, and client collaboration. Ensures every project meets studio standards for quality, clarity, and performance.',
                                image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=KN'
                            },
                            {
                                name: 'Iti Karmakar',
                                role: 'Marketing & Growth',
                                bio: 'Focuses on positioning, conversion strategy, and digital growth. Ensures websites are not just visually appealing, but optimized for visibility, engagement, and customer action.',
                                image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=IK'
                            },
                            {
                                name: 'Subham Bangal',
                                role: 'Operations & Client Support',
                                bio: 'Manages project coordination, timelines, communication, and post-launch support. Ensures smooth delivery and a reliable client experience.',
                                image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=SB'
                            },
                            {
                                name: 'Aditya Suryavanshi',
                                role: 'UI/UX Designer',
                                bio: 'Designs clean, modern interfaces focused on usability, visual clarity, and brand consistency. Responsible for layout systems, user journeys, and experience design.',
                                image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=AS'
                            },
                            {
                                name: 'Gaurav Shaw',
                                role: 'Web Developer',
                                bio: 'Builds fast, responsive, and scalable websites. Focuses on performance, accessibility, and smooth functionality across all devices.',
                                image: 'https://placehold.co/400x400/1a1a1a/ffffff?text=GS'
                            },
                            
                            
                        ].map((member, idx) => (
                            <div key={idx} className={`p-16 border-border border-b md:border-b-0 ${idx % 3 !== 2 ? 'md:border-r' : ''} ${idx >= 3 ? 'md:border-t' : ''} hover:bg-bg-secondary transition-colors group`}>
                                <div className="mb-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-border"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-1">{member.name}</h3>
                                <div className="text-sm font-medium text-text-accent uppercase tracking-widest mb-6">{member.role}</div>
                                <p className="text-text-secondary text-lg leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                        {/* Filler div for the 6th slot to complete the grid visually if needed, or leave blank styling */}
                        <div className="p-16 border-border md:border-t hidden md:block bg-bg-secondary/20">
                            <div className="h-full flex items-center justify-center text-text-secondary opacity-20 font-display text-4xl">
                                Pixella Labs.
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default About;
