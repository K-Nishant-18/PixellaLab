import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';

const Portfolio = () => {
    const projects = [
        { type: 'Demo Business Website', title: 'Modern Salon', tags: ['Web Design', 'Local Business'], image: 'bg-gradient-to-br from-pink-500 to-purple-600' },
        { type: 'Sample Brand Website', title: 'Urban Coffee', tags: ['E-commerce', 'Branding'], image: 'bg-gradient-to-br from-yellow-700 to-orange-900' },
        { type: 'Concept Website', title: 'Tech Startup', tags: ['Identity', 'Web Development'], image: 'bg-gradient-to-br from-blue-600 to-cyan-500' },
        { type: 'Demo Portfolio', title: 'Architect Studio', tags: ['Minimalism', 'Portfolio'], image: 'bg-zinc-800' },
    ];

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                <section className="border-b border-border p-8 md:p-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <TextReveal className="text-6xl md:text-9xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                        Work.
                    </TextReveal>
                    <p className="text-text-secondary max-w-md text-lg">
                        A selection of conceptual and demo work showcasing our capabilities in design and development.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2">
                    {projects.map((project, idx) => (
                        <div key={idx} className={`group border-border ${idx % 2 === 0 ? 'md:border-r' : ''} border-b relative aspect-square overflow-hidden bg-bg-secondary`}>
                            <div className={`absolute inset-0 ${project.image} opacity-80 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105`}></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-between bg-black/20 group-hover:bg-black/40 transition-colors">
                                <div className="flex gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div>
                                    <span className="text-text-accent font-mono text-sm mb-2 block">{project.type}</span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="p-20 text-center">
                    <p className="text-text-secondary mb-8">Ready to start your project?</p>
                    <Link to="/contact">
                        <MagneticButton className="px-10 py-4 border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary transition-colors uppercase tracking-widest text-sm font-bold">
                            Get in Touch
                        </MagneticButton>
                    </Link>
                </section>

            </div>
        </PageTransition>
    );
};

export default Portfolio;
