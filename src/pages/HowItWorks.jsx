import React from 'react';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';

const HowItWorks = () => {
    const steps = [
        {
            id: '01',
            title: 'Discover',
            desc: 'We start by understanding your business, your audience, and your objectives. No assumptions, just clarity.',
            details: ['Brand Audit', 'Competitor Analysis', 'Strategy Session']
        },
        {
            id: '02',
            title: 'Design & Build',
            desc: 'We design and develop a modern, responsive website aligned with your brand using a component-driven approach.',
            details: ['UI/UX Design', 'Full-stack Development', 'Content Integration']
        },
        {
            id: '03',
            title: 'Launch & Support',
            desc: 'We launch your website and remain available for updates, improvements, and performance monitoring.',
            details: ['QA Testing', 'Live Deployment', 'Ongoing Maintenance']
        }
    ];

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                {/* Hero */}
                <section className="border-b border-border p-8 md:p-20">
                    <TextReveal className="text-6xl md:text-9xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                        Process.
                    </TextReveal>
                    <p className="mt-8 text-xl text-text-secondary max-w-xl font-light">
                        Simple. Transparent. Reliable. A structured approach to digital growth.
                    </p>
                </section>

                {/* Steps Grid */}
                <section>
                    {steps.map((step) => (
                        <div key={step.id} className="grid grid-cols-1 md:grid-cols-12 border-b border-border min-h-[40vh]">
                            {/* Number */}
                            <div className="md:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex items-start justify-between md:block">
                                <span className="text-6xl md:text-8xl font-black text-text-accent/20 tracking-tighter font-mono">{step.id}</span>
                            </div>

                            {/* Content */}
                            <div className="md:col-span-6 p-8 md:p-20 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">{step.title}</h2>
                                <p className="text-xl text-text-secondary leading-relaxed">{step.desc}</p>
                            </div>

                            {/* Details */}
                            <div className="md:col-span-4 p-8 md:p-20 bg-bg-secondary flex flex-col justify-center">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">Includes</h3>
                                <ul className="space-y-4">
                                    {step.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-4 text-text-primary text-lg font-medium">
                                            <span className="w-4 h-[1px] bg-text-accent"></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="p-20 text-center bg-text-primary">
                    <h2 className="text-3xl md:text-4xl font-bold text-bg-primary mb-8 tracking-tight">Ready to start?</h2>
                    <p className="text-bg-primary/60 mb-8 max-w-2xl mx-auto">
                        Let's apply this process to your business.
                    </p>
                </section>

            </div>
        </PageTransition>
    );
};

export default HowItWorks;
