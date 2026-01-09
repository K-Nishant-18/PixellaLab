import React from 'react';
import PageTransition from '../components/UI/PageTransition';

const Terms = () => {
    return (
        <PageTransition>
            <div className="pt-24 min-h-screen bg-bg-primary text-text-primary px-6 md:px-12 xl:px-24 pb-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Terms of Service</h1>
                    <p className="text-text-secondary mb-16 uppercase tracking-widest text-sm">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-12 text-lg leading-relaxed text-text-secondary">
                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Intellectual Property</h2>
                            <p>
                                The Site and its original content, features and functionality are owned by Pixella Labs and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Services</h2>
                            <p>
                                Pixella Labs provides digital design and development services. The specific terms and deliverables for paid projects will be outlined in a separate Statement of Work (SOW) or contract agreed upon by both parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Limitation of Liability</h2>
                            <p>
                                In no event shall Pixella Labs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Terms;
