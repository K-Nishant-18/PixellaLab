import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';
import MagneticButton from '../components/UI/MagneticButton';

const Portfolio = () => {
    const projects = [
        { type: 'Live Business Website', title: 'Miksha Salon', tags: ['Web Design', 'Local Business', 'Production'], image: '/Projects/mishka.png', link: 'https://miksha-salon.vercel.app/' },
        { type: 'College Platform', title: 'Collegia', tags: ['EdTech', 'Social', 'Production'], image: '/Projects/collegia.png', link: 'https://collegia.vercel.app/home' },
        { type: 'LMS Platform', title: 'SkillBloom+', tags: ['Education', 'Learning', 'Production'], image: '/Projects/skillbloom+.png', link: 'https://skillbloom-plus.vercel.app/' },
        { type: 'Personal Portfolio', title: 'Nishant Portfolio', tags: ['Identity', 'Design', 'Production'], image: '/Projects/nishant_portfolio.png', link: 'https://www.kumar-nishant.me/' },
    ];

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                <section className="border-b border-border p-8 md:p-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    <TextReveal className="text-6xl md:text-9xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                        Work.
                    </TextReveal>
                    <p className="text-text-secondary max-w-md text-lg">
                        A selection of our latest work showcasing our capabilities in design & development.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2">
                    {projects.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group border-border ${idx % 2 === 0 ? 'md:border-r' : ''} border-b relative aspect-video overflow-hidden bg-bg-secondary block`}
                        >
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                                style={{ backgroundImage: `url(${project.image})` }}
                            ></div>

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
                        </a>
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
