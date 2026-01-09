import React from 'react';
import PageTransition from '../components/UI/PageTransition';
import TextReveal from '../components/UI/TextReveal';

const Services = () => {
    const serviceList = [
        {
            id: '01',
            title: 'Website Design & Development',
            features: [
                'Custom website design (no generic templates)',
                'Mobile-first & responsive layouts',
                'Fast loading & SEO-ready structure',
                'Business, brand, & portfolio websites'
            ]
        },
        {
            id: '02',
            title: 'E-commerce Solutions',
            features: [
                'Online store setup',
                'Product & category structure',
                'Payment gateway integration',
                'Scalable architecture'
            ]
        },
        {
            id: '03',
            title: 'Brand & Digital Presence',
            features: [
                'Business website setup',
                'Online visibility optimization',
                'Consistent digital branding',
                'Conversion-focused layouts'
            ]
        },
        {
            id: '04',
            title: 'Website Care & Support',
            features: [
                'Ongoing maintenance',
                'Content & design updates',
                'Performance monitoring',
                'Technical support'
            ],
            note: "We don’t just launch websites — we support them."
        }
    ];

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary transition-colors duration-300 min-h-screen border-x border-border max-w-[1920px] mx-auto">

                {/* Hero */}
                <section className="border-b border-border p-8 md:p-20">
                    <TextReveal className="text-6xl md:text-9xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                        Capabilities.
                    </TextReveal>
                </section>

                {/* Services List */}
                <section>
                    {serviceList.map((service) => (
                        <div key={service.id} className="grid grid-cols-1 md:grid-cols-12 border-b border-border group hover:bg-bg-secondary transition-colors">
                            {/* Label */}
                            <div className="md:col-span-1 p-8 md:p-12 md:border-r border-border font-mono text-text-accent opacity-50">
                                {service.id}
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-11 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 gap-8 items-start">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">{service.title}</h2>
                                    {service.note && <p className="text-text-accent italic font-medium mt-2">{service.note}</p>}
                                </div>

                                <div>
                                    <ul className="grid gap-4">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-lg text-text-secondary group-hover:text-text-primary transition-colors">
                                                <span className="mt-2 w-1.5 h-1.5 bg-text-primary rounded-none opacity-20 group-hover:opacity-100 transition-opacity"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

            </div>
        </PageTransition>
    );
};

export default Services;
