import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiDownload, FiImage, FiSettings, FiMaximize2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import PageTransition from '../../components/UI/PageTransition';
import TextReveal from '../../components/UI/TextReveal';
import MagneticButton from '../../components/UI/MagneticButton';

const ImageTools = () => {
    const [images, setImages] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('resize'); // resize, convert, compress

    // Global Settings
    const [settings, setSettings] = useState({
        width: 100,
        widthUnit: '%', // %, px
        height: 100, // auto if 0 or null logic to be added
        format: 'original', // original, jpeg, png, webp
        quality: 0.8, // 0.1 to 1.0
        targetSize: 0, // 0 means no target size, in KB
    });

    // Drag & Drop Handlers
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
            preview: URL.createObjectURL(file), // Original preview
            processedPreview: null, // Processed result preview
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'pending', // pending, processing, done, error
            details: null // { width, height, size }
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    // Processing Logic
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
            image.src = img.preview;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = image;

                // Resize Logic
                if (config.widthUnit === '%') {
                    const ratio = config.width / 100;
                    width = width * ratio;
                    height = height * ratio;
                } else {
                    // px
                    const ratio = config.width / width;
                    width = config.width;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);

                // Format & Quality Logic
                let mimeType = img.type;
                if (config.format !== 'original') {
                    mimeType = `image/${config.format}`;
                }

                // Compress / Export
                let quality = config.quality;

                // If target size is set and format is PNG (lossless), auto-switch to JPEG
                if (config.targetSize > 0 && mimeType === 'image/png') {
                    mimeType = 'image/jpeg';
                }

                let dataUrl = canvas.toDataURL(mimeType, quality);
                const head = 'data:' + mimeType + ';base64,';

                // Target Size Control (Binary Search) — works for JPEG and WebP
                if (config.targetSize > 0) {
                    const targetBytes = config.targetSize * 1024;
                    let min = 0, max = 1, attempt = 0;
                    let bestQuality = 0.1; // Use lowest as fallback

                    while (attempt < 12) {
                        const mid = (min + max) / 2;
                        const testDataUrl = canvas.toDataURL(mimeType, mid);
                        const currentSize = Math.round((testDataUrl.length - head.length) * 3 / 4);

                        if (currentSize <= targetBytes) {
                            bestQuality = mid;
                            min = mid; // Success — try pushing quality higher
                        } else {
                            max = mid; // Too big — lower quality
                        }
                        attempt++;
                    }
                    quality = bestQuality;
                    dataUrl = canvas.toDataURL(mimeType, quality);
                }

                // Final calculation
                const size = Math.round((dataUrl.length - head.length) * 3 / 4);

                resolve({
                    ...img,
                    processedPreview: dataUrl,
                    status: 'done',
                    details: {
                        width,
                        height,
                        size,
                        format: mimeType.split('/')[1],
                        qualityObj: quality // Keep track of actual used quality
                    }
                });
            };
            image.onerror = () => {
                resolve({ ...img, status: 'error' });
            };
        });
    };

    const getDownloadName = (img) => {
        const ext = img.details?.format || img.name.split('.').pop();
        const baseName = img.name.replace(/\.[^/.]+$/, ''); // strip original extension
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

    return (
        <PageTransition>
            <div className="pt-20 bg-bg-primary min-h-screen border-x border-border max-w-[1920px] mx-auto flex flex-col lg:flex-row">

                {/* Visualizer / Dropspace */}
                <div
                    className="flex-1 flex flex-col h-[calc(100vh-80px)]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                >
                    <div className="p-8 border-b border-border">
                        <TextReveal className="text-4xl md:text-5xl font-semibold tracking-tighter text-text-primary">
                            Image Studio
                        </TextReveal>
                        <p className="text-text-secondary mt-2">
                            Resize, Compress, and Convert images locally.
                        </p>
                    </div>

                    {/* Image Grid */}
                    <div className="flex-1 bg-bg-secondary p-8 overflow-y-auto">
                        {images.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg text-text-secondary">
                                <FiUpload className="text-4xl mb-4 opacity-50" />
                                <p className="text-lg">Drag & Drop images here</p>
                                <span className="my-2 text-sm opacity-50">- or -</span>
                                <label className="cursor-pointer px-6 py-2 bg-text-primary text-bg-primary font-medium rounded-sm">
                                    Browse Files
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={onFileSelect} />
                                </label>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {images.map(img => (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            layout
                                            className="bg-bg-primary border border-border p-4 rounded-sm relative group"
                                        >
                                            <div className="absolute top-2 right-2 flex gap-2 z-10 transition-opacity opacity-0 group-hover:opacity-100">
                                                {img.processedPreview && (
                                                    <button
                                                        onClick={() => downloadSingle(img)}
                                                        className="p-2 bg-text-accent text-white rounded-full border border-border hover:bg-blue-600 transition-colors"
                                                        title="Download"
                                                    >
                                                        <FiDownload />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => removeImage(img.id)}
                                                    className="p-2 bg-bg-primary text-red-500 rounded-full border border-border hover:bg-gray-100 transition-colors"
                                                    title="Remove"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>

                                            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden mb-4 relative">
                                                {/* Compare Hover */}
                                                <img
                                                    src={img.processedPreview || img.preview}
                                                    alt={img.name}
                                                    className="object-contain h-full w-full"
                                                />
                                                {img.processedPreview && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                                                        Hold to fix (N/A)
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <p className="font-medium truncate text-sm" title={img.name}>{img.name}</p>
                                                <div className="flex justify-between text-xs text-text-secondary">
                                                    <span>{(img.size / 1024).toFixed(1)} KB</span>
                                                    {img.details && (
                                                        <span className="text-green-600 font-bold">
                                                            → {(img.details.size / 1024).toFixed(1)} KB
                                                        </span>
                                                    )}
                                                </div>
                                                {img.details && (
                                                    <div className="flex justify-between text-xs text-text-secondary">
                                                        <span>{img.type.split('/')[1]}</span>
                                                        <span className="text-green-600">→ {img.details.format}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Add more button */}
                                    <motion.label
                                        layout
                                        className="border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center h-[280px] cursor-pointer hover:bg-bg-accent transition-colors text-text-secondary"
                                    >
                                        <FiUpload className="text-2xl mb-2" />
                                        <span className="text-sm">Add more</span>
                                        <input type="file" multiple accept="image/*" className="hidden" onChange={onFileSelect} />
                                    </motion.label>
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Actions Bar */}
                    {images.length > 0 && (
                        <div className="p-6 border-t border-border bg-bg-primary flex justify-between items-center">
                            <button
                                onClick={() => setImages([])}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Clear All
                            </button>
                            <MagneticButton
                                onClick={downloadAll}
                                className="px-8 py-3 bg-text-primary text-bg-primary font-bold uppercase tracking-wide text-sm"
                            >
                                Download All
                            </MagneticButton>
                        </div>
                    )}
                </div>

                {/* Toolbar Sidebar */}
                <div className="w-full lg:w-[480px] bg-bg-primary border-l border-border flex flex-col h-[calc(100vh-80px)]">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                            Configuration
                        </h2>
                    </div>

                    <div className="p-6 space-y-8 flex-1 overflow-y-auto">

                        {/* Resize Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FiMaximize2 className="text-text-accent" />
                                <h3 className="font-semibold">Resize</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-2 p-1 bg-bg-secondary rounded-sm border border-border">
                                {['%', 'px'].map(unit => (
                                    <button
                                        key={unit}
                                        onClick={() => setSettings(s => ({ ...s, widthUnit: unit, width: unit === '%' ? 100 : 1920 }))}
                                        className={`py-1 text-xs font-medium rounded-sm transition-colors ${settings.widthUnit === unit
                                            ? 'bg-text-primary text-bg-primary'
                                            : 'text-text-secondary hover:text-text-primary'
                                            }`}
                                    >
                                        {unit === '%' ? 'Percent' : 'Pixels'}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-text-secondary block">
                                    Width ({settings.widthUnit})
                                </label>
                                <input
                                    type="number"
                                    value={settings.width}
                                    onChange={(e) => setSettings(s => ({ ...s, width: Number(e.target.value) }))}
                                    className="w-full bg-bg-secondary border border-border p-2 text-sm focus:outline-none focus:border-text-accent"
                                />
                            </div>
                        </div>

                        {/* Format Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FiImage className="text-text-accent" />
                                <h3 className="font-semibold">Format</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {['original', 'jpeg', 'png', 'webp'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setSettings(s => ({ ...s, format: fmt }))}
                                        className={`py-2 px-3 text-xs font-medium border transition-colors text-left ${settings.format === fmt
                                            ? 'border-text-accent bg-text-accent/5 text-text-accent'
                                            : 'border-border text-text-secondary hover:border-text-secondary'
                                            }`}
                                    >
                                        {fmt.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quality Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <FiSettings className="text-text-accent" />
                                <h3 className="font-semibold">Quality</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs text-text-secondary">
                                    <span>Low File Size</span>
                                    <span>High Quality</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={settings.quality}
                                    onChange={(e) => setSettings(s => ({ ...s, quality: Number(e.target.value), targetSize: 0 }))} //Reset target size if sliding quality
                                    className="w-full accent-text-accent h-1 bg-border rounded-full appearance-none"
                                />
                                <div className="text-right text-xs font-mono">
                                    {Math.round(settings.quality * 100)}%
                                </div>

                                <div className="pt-4 border-t border-border mt-4">
                                    <label className="text-xs text-text-secondary block mb-2">
                                        Target Size (KB) - Overrides Quality
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.targetSize || ''}
                                        placeholder="e.g. 500"
                                        onChange={(e) => setSettings(s => ({ ...s, targetSize: Number(e.target.value), quality: 0.9 }))} // Reset quality somewhat if setting target
                                        className="w-full bg-bg-secondary border border-border p-2 text-sm focus:outline-none focus:border-text-accent"
                                    />
                                    <p className="text-[10px] text-text-secondary mt-1">
                                        Set to 0 to use Quality slider instead.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-border bg-bg-secondary z-10 relative">
                        <MagneticButton
                            onClick={processImages}
                            className={`w-full py-4 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 ${processing ? 'bg-text-secondary cursor-wait' : 'bg-text-accent hover:bg-blue-600'
                                } text-white transition-colors`}
                        >
                            {processing ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <FiRefreshCw />
                                    Process Images
                                </>
                            )}
                        </MagneticButton>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
};

export default ImageTools;
