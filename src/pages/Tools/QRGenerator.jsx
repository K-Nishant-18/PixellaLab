import React, { useState, useRef } from 'react';
import PageTransition from '../../components/UI/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import QRInput from '../../components/Generator/QRInput';
import QRStyler from '../../components/Generator/QRStyler';
import QRPreview from '../../components/Generator/QRPreview';
import QRExport from '../../components/Generator/QRExport';

const QRGenerator = () => {
    // QR Code Configuration State
    const [inputText, setInputText] = useState('https://pixellalabs.com');
    const [qrType, setQrType] = useState('url');
    const [fgColor, setFgColor] = useState('#1a1a1a');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [dotsType, setDotsType] = useState('rounded');
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
    const [logo, setLogo] = useState(null);

    // QR Code Reference for export
    const qrCodeRef = useRef(null);

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary min-h-screen border-x border-border max-w-[1920px] mx-auto">

                {/* Hero Section */}
                <section className="relative border-b border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Left: Hero Content */}
                        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-12 py-20">
                            <span className="block text-sm font-medium tracking-widest uppercase text-text-secondary mb-6">
                                Free Tool
                            </span>

                            <div className="mb-5">
                                <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                                    QR Code
                                </TextReveal>
                                <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-accent leading-[0.9] pb-5">
                                    Generator
                                </TextReveal>
                            </div>

                            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed font-light">
                                Create premium, customizable QR codes with advanced styling options.
                                Swiss design meets modern functionality.
                            </p>
                        </div>

                        {/* Right: Features List */}
                        <div className="lg:col-span-5 p-6 md:p-12 py-20 bg-bg-secondary flex items-center">
                            <div className="w-full">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-8">
                                    Why Choose Us
                                </h3>
                                <ul className="space-y-5">
                                    {[
                                        { text: '100% Free', icon: '✓' },
                                        { text: 'Unlimited Scans', icon: '✓' },
                                        { text: 'No Ads', icon: '✓' },
                                        { text: 'No Login', icon: '✓' },
                                        { text: 'No Watermark', icon: '✓' },
                                        { text: 'Works Forever', icon: '✓' }
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4 text-text-primary">
                                            <span className="w-6 h-6 flex items-center justify-center bg-text-accent text-white text-sm font-bold rounded-sm">
                                                {feature.icon}
                                            </span>
                                            <span className="text-lg font-medium">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Generator Interface */}
                <section className="border-b border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Left Panel: Input & Styling */}
                        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border">
                            {/* Input Section */}
                            <div className="p-8 border-b border-border">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
                                    01 — Content
                                </h2>
                                <QRInput
                                    inputText={inputText}
                                    setInputText={setInputText}
                                    qrType={qrType}
                                    setQrType={setQrType}
                                />
                            </div>

                            {/* Styling Section */}
                            <div className="p-8">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
                                    02 — Styling
                                </h2>
                                <QRStyler
                                    fgColor={fgColor}
                                    setFgColor={setFgColor}
                                    bgColor={bgColor}
                                    setBgColor={setBgColor}
                                    dotsType={dotsType}
                                    setDotsType={setDotsType}
                                    errorCorrectionLevel={errorCorrectionLevel}
                                    setErrorCorrectionLevel={setErrorCorrectionLevel}
                                    logo={logo}
                                    setLogo={setLogo}
                                />
                            </div>
                        </div>

                        {/* Right Panel: Preview */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="p-8 border-b border-border">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
                                    03 — Preview
                                </h2>
                            </div>

                            <div className="flex-1 flex items-center justify-center p-8 min-h-[600px]">
                                <QRPreview
                                    inputText={inputText}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    dotsType={dotsType}
                                    errorCorrectionLevel={errorCorrectionLevel}
                                    qrCodeRef={qrCodeRef}
                                    logo={logo}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Export Section */}
                    <QRExport
                        qrCodeRef={qrCodeRef}
                        inputText={inputText}
                    />
                </section>

                {/* Features Section */}
                <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                    <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-border bg-bg-secondary">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                            Features
                        </h2>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2">
                        <div className="p-12 border-b md:border-b-0 md:border-r border-border hover:bg-bg-secondary transition-colors">
                            <h3 className="text-2xl font-bold text-text-primary mb-4">Multiple Formats</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Export as PNG, SVG, or JPEG in various sizes for web, print, or billboard use.
                            </p>
                        </div>
                        <div className="p-12 border-b md:border-b-0 border-border hover:bg-bg-secondary transition-colors">
                            <h3 className="text-2xl font-bold text-text-primary mb-4">Custom Styling</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Choose colors, patterns, and error correction levels to match your brand.
                            </p>
                        </div>
                        <div className="p-12 md:border-r border-border hover:bg-bg-secondary transition-colors">
                            <h3 className="text-2xl font-bold text-text-primary mb-4">QR Types</h3>
                            <p className="text-text-secondary leading-relaxed">
                                Generate QR codes for URLs, text, emails, WiFi credentials, and vCards.
                            </p>
                        </div>
                        <div className="p-12 hover:bg-bg-secondary transition-colors">
                            <h3 className="text-2xl font-bold text-text-primary mb-4">Privacy First</h3>
                            <p className="text-text-secondary leading-relaxed">
                                All generation happens in your browser. No data is stored or tracked.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
                    <div className="p-16 lg:border-r border-border flex flex-col justify-between">
                        <div>
                            <h2 className="text-5xl font-semibold tracking-tighter text-text-primary mb-4">
                                Use Cases
                            </h2>
                            <p className="text-xl text-text-secondary">
                                From business cards to product packaging.
                            </p>
                        </div>
                        <div className="mt-12">
                            <div className="text-8xl text-text-accent opacity-20 font-black">QR</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-lg font-medium">
                        {[
                            'Business Cards & Marketing',
                            'Product Packaging & Labels',
                            'Event Tickets & Invitations',
                            'Menu & Restaurant Ordering',
                            'Digital Portfolios'
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-8 border-t border-border first:border-t-0 flex items-center justify-between group hover:bg-bg-secondary transition-colors cursor-default"
                            >
                                <span className="text-text-primary">{item}</span>
                                <span className="text-text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 text-center border-b border-border">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-text-primary mb-6">
                            Need a custom web solution?
                        </h2>
                        <p className="text-xl text-text-secondary mb-8">
                            We build premium websites and digital experiences for modern brands.
                        </p>
                        <a
                            href="/"
                            className="inline-block px-10 py-4 bg-text-accent text-white rounded-sm font-bold text-lg hover:bg-text-primary transition-all"
                        >
                            Explore Pixella Labs
                        </a>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default QRGenerator;
