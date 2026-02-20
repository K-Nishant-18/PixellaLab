import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiDownload, FiImage, FiSettings, FiMaximize2, FiTrash2, FiRefreshCw, FiCrop } from 'react-icons/fi';
import PageTransition from '../../components/UI/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import MagneticButton from '../../components/UI/MagneticButton';
import CropModal from '../../components/Tools/CropModal';

const ImageTools = () => {
    const [images, setImages] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [cropTarget, setCropTarget] = useState(null);

    const [settings, setSettings] = useState({
        width: 100,
        widthUnit: '%',
        format: 'original',
        quality: 0.8,
        targetSize: 0,
    });

    const onDrop = useCallback((e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        handleFiles(files);
    }, []);

    const onFileSelect = (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        handleFiles(files);
    };

    const handleFiles = (newFiles) => {
        const newImages = newFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
            processedPreview: null,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'pending',
            details: null
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const processImages = async () => {
        setProcessing(true);
        const processed = await Promise.all(images.map(async (img) => {
            return await processSingleImage(img, settings);
        }));
        setImages(processed);
        setProcessing(false);
    };

    const processSingleImage = (img, config) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = img.processedPreview || img.preview;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = image;

                if (config.widthUnit === '%') {
                    const ratio = config.width / 100;
                    width = width * ratio;
                    height = height * ratio;
                } else {
                    const ratio = config.width / width;
                    width = config.width;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);

                let mimeType = img.type;
                if (config.format !== 'original') mimeType = `image/${config.format}`;

                let quality = config.quality;
                if (config.targetSize > 0 && mimeType === 'image/png') mimeType = 'image/jpeg';

                let dataUrl = canvas.toDataURL(mimeType, quality);
                const head = 'data:' + mimeType + ';base64,';

                if (config.targetSize > 0) {
                    const targetBytes = config.targetSize * 1024;
                    let min = 0, max = 1, attempt = 0;
                    let bestQuality = 0.1;
                    while (attempt < 12) {
                        const mid = (min + max) / 2;
                        const testDataUrl = canvas.toDataURL(mimeType, mid);
                        const currentSize = Math.round((testDataUrl.length - head.length) * 3 / 4);
                        if (currentSize <= targetBytes) { bestQuality = mid; min = mid; } else { max = mid; }
                        attempt++;
                    }
                    quality = bestQuality;
                    dataUrl = canvas.toDataURL(mimeType, quality);
                }

                const size = Math.round((dataUrl.length - head.length) * 3 / 4);
                resolve({
                    ...img,
                    processedPreview: dataUrl,
                    status: 'done',
                    details: { width, height, size, format: mimeType.split('/')[1], qualityObj: quality }
                });
            };
            image.onerror = () => { resolve({ ...img, status: 'error' }); };
        });
    };

    const getDownloadName = (img) => {
        const ext = img.details?.format || img.name.split('.').pop();
        const baseName = img.name.replace(/\.[^/.]+$/, '');
        return `${baseName}.${ext}`;
    };

    const downloadAll = () => {
        const processedImages = images.filter(img => img.processedPreview);
        if (processedImages.length === 0) {
            alert("No processed images to download. Please click 'Process Images' first.");
            return;
        }
        processedImages.forEach((img, index) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = img.processedPreview;
                a.download = getDownloadName(img);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, index * 200);
        });
    };

    const downloadSingle = (img) => {
        if (!img.processedPreview) return;
        const a = document.createElement('a');
        a.href = img.processedPreview;
        a.download = getDownloadName(img);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const onApplyCrop = (dataUrl, details) => {
        setImages(prev => prev.map(img =>
            img.id === cropTarget.id
                ? { ...img, processedPreview: dataUrl, preview: dataUrl, details, status: 'done' }
                : img
        ));
        setCropTarget(null);
    };

    return (
        <>
            <PageTransition>
                <div className="pt-20 bg-bg-primary min-h-screen border-x border-border max-w-[1920px] mx-auto">

                    {/* ── Hero Section ─────────────────────────────────────────── */}
                    <section className="relative border-b border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Left: Hero Content */}
                            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-12 py-20">
                                <span className="block text-sm font-medium tracking-widest uppercase text-text-secondary mb-6">
                                    Free Tool
                                </span>
                                <div className="mb-5">
                                    <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-primary leading-[0.9]">
                                        Image
                                    </TextReveal>
                                    <TextReveal className="text-6xl md:text-8xl font-semibold tracking-tighter text-text-accent leading-[0.9] pb-5">
                                        Studio
                                    </TextReveal>
                                </div>
                                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed font-light">
                                    Resize, compress, convert and crop images — all in your browser.
                                    Zero uploads, zero tracking.
                                </p>
                            </div>

                            {/* Right: Why Choose Us */}
                            <div className="lg:col-span-5 p-6 md:p-12 py-20 bg-bg-secondary flex items-center">
                                <div className="w-full">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-8">
                                        Why Choose Us
                                    </h3>
                                    <ul className="space-y-5">
                                        {[
                                            { text: '100% Free', icon: '✓' },
                                            { text: 'Works in Browser', icon: '✓' },
                                            { text: 'No Login Required', icon: '✓' },
                                            { text: 'Batch Processing', icon: '✓' },
                                            { text: 'No Watermark', icon: '✓' },
                                            { text: 'Privacy First', icon: '✓' },
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

                    {/* ── Tool Interface ────────────────────────────────────────── */}
                    <section className="border-b border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Left Panel: Settings */}
                            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border flex flex-col">

                                {/* 01 — Upload */}
                                <div className="p-8 border-b border-border">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
                                        01 — Upload
                                    </h2>
                                    <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border p-8 cursor-pointer hover:bg-bg-secondary transition-colors text-text-secondary">
                                        <FiUpload size={24} className="opacity-50" />
                                        <span className="text-sm font-medium">Drop images or browse</span>
                                        <input type="file" multiple accept="image/*" className="hidden" onChange={onFileSelect} />
                                    </label>
                                    {images.length > 0 && (
                                        <p className="text-xs text-text-secondary mt-3 text-center">
                                            {images.length} image{images.length > 1 ? 's' : ''} loaded
                                        </p>
                                    )}
                                </div>

                                {/* 02 — Settings */}
                                <div className="p-8">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
                                        02 — Settings
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Resize */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                                    <FiMaximize2 size={12} /> Resize
                                                </label>
                                                <div className="flex items-center gap-1 p-0.5 bg-bg-secondary border border-border rounded-sm">
                                                    {['%', 'px'].map(unit => (
                                                        <button
                                                            key={unit}
                                                            onClick={() => setSettings(s => ({ ...s, widthUnit: unit, width: unit === '%' ? 100 : 1920 }))}
                                                            className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${settings.widthUnit === unit ? 'bg-text-primary text-bg-primary' : 'text-text-secondary hover:text-text-primary'}`}
                                                        >
                                                            {unit}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <input
                                                type="number"
                                                value={settings.width}
                                                onChange={(e) => setSettings(s => ({ ...s, width: Number(e.target.value) }))}
                                                placeholder={settings.widthUnit === '%' ? '100' : '1920'}
                                                className="w-full bg-bg-secondary border border-border p-3 text-sm focus:outline-none focus:border-text-accent"
                                            />
                                        </div>

                                        {/* Format */}
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                                <FiImage size={12} /> Format
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['original', 'jpeg', 'png', 'webp'].map(fmt => (
                                                    <button
                                                        key={fmt}
                                                        onClick={() => setSettings(s => ({ ...s, format: fmt }))}
                                                        className={`py-2 px-3 text-xs font-medium border transition-colors text-left ${settings.format === fmt
                                                            ? 'border-text-accent bg-text-accent/5 text-text-accent'
                                                            : 'border-border text-text-secondary hover:border-text-secondary'}`}
                                                    >
                                                        {fmt.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quality */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                                    <FiSettings size={12} /> Quality
                                                </label>
                                                <span className="text-xs font-mono text-text-accent">{Math.round(settings.quality * 100)}%</span>
                                            </div>
                                            <input
                                                type="range" min="0.1" max="1" step="0.1"
                                                value={settings.quality}
                                                onChange={(e) => setSettings(s => ({ ...s, quality: Number(e.target.value), targetSize: 0 }))}
                                                className="w-full accent-text-accent h-1 bg-border rounded-full appearance-none"
                                            />
                                            <div className="flex justify-between text-[10px] text-text-secondary opacity-60">
                                                <span>Smaller file</span><span>Higher quality</span>
                                            </div>
                                        </div>

                                        {/* Target Size */}
                                        <div className="space-y-2 pt-4 border-t border-border">
                                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary block">
                                                Target Size (KB) <span className="text-text-secondary/40 font-normal normal-case tracking-normal">— overrides quality</span>
                                            </label>
                                            <input
                                                type="number"
                                                value={settings.targetSize || ''}
                                                placeholder="e.g. 500"
                                                onChange={(e) => setSettings(s => ({ ...s, targetSize: Number(e.target.value), quality: 0.9 }))}
                                                className="w-full bg-bg-secondary border border-border p-3 text-sm focus:outline-none focus:border-text-accent"
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-2">
                                            <MagneticButton
                                                onClick={processImages}
                                                className={`flex-1 py-4 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 ${processing ? 'bg-text-secondary cursor-wait' : images.length === 0 ? 'bg-border text-text-secondary cursor-not-allowed' : 'bg-text-accent hover:bg-blue-600'} text-white transition-colors`}
                                            >
                                                {processing ? <>Processing...</> : <><FiRefreshCw /> Process</>}
                                            </MagneticButton>
                                            <MagneticButton
                                                onClick={downloadAll}
                                                className={`flex-1 py-4 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 border ${images.some(i => i.processedPreview) ? 'border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary' : 'border-border text-text-secondary cursor-not-allowed'} transition-colors`}
                                            >
                                                <FiDownload /> Download
                                            </MagneticButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Canvas */}
                            <div className="lg:col-span-8 flex flex-col"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={onDrop}
                            >
                                <div className="p-8 border-b border-border flex items-center justify-between">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                                        03 — Canvas
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); if (images.length > 0) setCropTarget(images[0]); }}
                                            disabled={images.length === 0}
                                            className={`relative flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest border-2 transition-all duration-200 ${images.length === 0
                                                ? 'border-border text-text-secondary/30 cursor-not-allowed bg-transparent'
                                                : 'border-text-accent bg-text-accent text-white shadow-lg shadow-text-accent/30 hover:scale-105 hover:shadow-text-accent/50 active:scale-95'}`}
                                        >
                                            {images.length > 0 && (
                                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-text-accent rounded-full animate-ping opacity-75" />
                                            )}
                                            <FiCrop size={13} /> ✂ Crop
                                        </button>

                                        {images.length > 0 && (
                                            <button onClick={() => setImages([])} className="text-xs text-red-500 hover:underline">
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 p-8 min-h-[600px] overflow-y-auto bg-bg-secondary"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={onDrop}
                                >
                                    {images.length === 0 ? (
                                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-border text-text-secondary">
                                            <FiUpload className="text-4xl mb-4 opacity-30" />
                                            <p className="text-lg font-light">Drop images here to get started</p>
                                            <span className="my-3 text-sm opacity-40">— or —</span>
                                            <label className="cursor-pointer px-6 py-3 bg-text-primary text-bg-primary font-bold text-sm uppercase tracking-wide hover:bg-text-accent transition-colors">
                                                Browse Files
                                                <input type="file" multiple accept="image/*" className="hidden" onChange={onFileSelect} />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            <AnimatePresence>
                                                {images.map(img => (
                                                    <motion.div
                                                        key={img.id}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        layout
                                                        className="bg-bg-primary border border-border relative group"
                                                    >
                                                        <div className="absolute top-2 right-2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setCropTarget(img); }}
                                                                className="p-2 bg-bg-primary text-text-accent border border-border hover:bg-bg-secondary transition-colors"
                                                                title="Crop"
                                                            >
                                                                <FiCrop size={14} />
                                                            </button>
                                                            {img.processedPreview && (
                                                                <button
                                                                    onClick={() => downloadSingle(img)}
                                                                    className="p-2 bg-text-accent text-white border border-text-accent hover:bg-blue-600 transition-colors"
                                                                    title="Download"
                                                                >
                                                                    <FiDownload size={14} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => removeImage(img.id)}
                                                                className="p-2 bg-bg-primary text-red-500 border border-border hover:bg-bg-secondary transition-colors"
                                                                title="Remove"
                                                            >
                                                                <FiX size={14} />
                                                            </button>
                                                        </div>

                                                        <div className="h-48 bg-bg-secondary flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={img.processedPreview || img.preview}
                                                                alt={img.name}
                                                                className="object-contain h-full w-full"
                                                            />
                                                        </div>

                                                        <div className="p-3 space-y-1 border-t border-border">
                                                            <p className="font-medium truncate text-sm" title={img.name}>{img.name}</p>
                                                            <div className="flex justify-between text-xs text-text-secondary">
                                                                <span>{(img.size / 1024).toFixed(1)} KB</span>
                                                                {img.details && (
                                                                    <span className="text-green-600 font-bold">→ {(img.details.size / 1024).toFixed(1)} KB</span>
                                                                )}
                                                            </div>
                                                            {img.details && (
                                                                <div className="flex justify-between text-xs text-text-secondary">
                                                                    <span>{img.type.split('/')[1]}</span>
                                                                    <span className="text-text-accent">→ {img.details.format} · {img.details.width}×{img.details.height}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}

                                                {/* Add more */}
                                                <motion.label
                                                    layout
                                                    className="border-2 border-dashed border-border flex flex-col items-center justify-center h-[calc(192px+68px+2px)] cursor-pointer hover:bg-bg-primary transition-colors text-text-secondary"
                                                >
                                                    <FiUpload className="text-2xl mb-2 opacity-40" />
                                                    <span className="text-sm">Add more</span>
                                                    <input type="file" multiple accept="image/*" className="hidden" onChange={onFileSelect} />
                                                </motion.label>
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Features Section ─────────────────────────────────────── */}
                    <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                        <div className="md:col-span-4 p-12 border-b md:border-b-0 md:border-r border-border bg-bg-secondary">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                                Features
                            </h2>
                        </div>
                        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2">
                            <div className="p-12 border-b md:border-b-0 md:border-r border-border hover:bg-bg-secondary transition-colors">
                                <h3 className="text-2xl font-bold text-text-primary mb-4">Batch Resize</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Process multiple images at once by percentage or exact pixel dimensions with aspect-ratio locking.
                                </p>
                            </div>
                            <div className="p-12 border-b md:border-b-0 border-border hover:bg-bg-secondary transition-colors">
                                <h3 className="text-2xl font-bold text-text-primary mb-4">Format Convert</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Convert to JPEG, PNG, or WebP. Set a target file size in KB for precise compression control.
                                </p>
                            </div>
                            <div className="p-12 md:border-r border-border hover:bg-bg-secondary transition-colors">
                                <h3 className="text-2xl font-bold text-text-primary mb-4">Precision Crop</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Full crop editor with drag handles, aspect ratio locks, rotation, flip, and circle crop.
                                </p>
                            </div>
                            <div className="p-12 hover:bg-bg-secondary transition-colors">
                                <h3 className="text-2xl font-bold text-text-primary mb-4">Privacy First</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Everything runs in your browser. Your images never leave your device.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ── CTA Section ──────────────────────────────────────────── */}
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

            <AnimatePresence>
                {cropTarget && (
                    <CropModal
                        img={cropTarget}
                        onClose={() => setCropTarget(null)}
                        onApply={onApplyCrop}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageTools;
