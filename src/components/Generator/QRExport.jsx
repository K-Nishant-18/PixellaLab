import React, { useState } from 'react';
import { FaDownload, FaCheck } from 'react-icons/fa';

const QRExport = ({ qrCodeRef, inputText }) => {
    const [format, setFormat] = useState('png');
    const [size, setSize] = useState(1024);
    const [downloading, setDownloading] = useState(false);
    const [success, setSuccess] = useState(false);

    const formats = [
        { id: 'png', label: 'PNG' },
        { id: 'svg', label: 'SVG' },
        { id: 'jpeg', label: 'JPEG' }
    ];

    const sizes = [
        { value: 256, label: '256x256 (Small)' },
        { value: 512, label: '512x512 (Medium)' },
        { value: 1024, label: '1024x1024 (Large)' },
        { value: 2048, label: '2048x2048 (XL)' }
    ];

    const handleDownload = async () => {
        if (!qrCodeRef?.current || !inputText) return;

        setDownloading(true);

        try {
            // Save original size
            const originalSize = 400;

            // Temporarily update to download size
            qrCodeRef.current.update({ width: size, height: size });

            // Download
            await qrCodeRef.current.download({ name: 'pixella-qr-code', extension: format });

            // Restore original size immediately
            qrCodeRef.current.update({ width: originalSize, height: originalSize });

            // Show success state
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setDownloading(false);
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
            setDownloading(false);
        }
    };

    return (
        <div className="border-t border-border bg-bg-primary">
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    {/* Format Selector */}
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                            Format
                        </label>
                        <div className="flex gap-2">
                            {formats.map((fmt) => (
                                <button
                                    key={fmt.id}
                                    onClick={() => setFormat(fmt.id)}
                                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-sm transition-all border ${format === fmt.id
                                        ? 'bg-text-accent text-white border-text-accent'
                                        : 'bg-bg-secondary text-text-secondary border-border hover:bg-bg-accent hover:text-text-primary'
                                        }`}
                                >
                                    {fmt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                            Size
                        </label>
                        <select
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-bg-secondary text-text-primary border border-border rounded-sm font-medium text-sm focus:outline-none focus:ring-2 focus:ring-text-accent cursor-pointer"
                        >
                            {sizes.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Download Button */}
                    <div>
                        <button
                            onClick={handleDownload}
                            disabled={!inputText || downloading}
                            className={`w-full px-6 py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-all flex items-center justify-center gap-3 ${success
                                ? 'bg-green-500 text-white'
                                : !inputText || downloading
                                    ? 'bg-bg-accent text-text-secondary cursor-not-allowed'
                                    : 'bg-text-accent text-white hover:bg-text-primary hover:text-bg-primary border border-text-accent'
                                }`}
                        >
                            {success ? (
                                <>
                                    <FaCheck /> Downloaded!
                                </>
                            ) : downloading ? (
                                'Processing...'
                            ) : (
                                <>
                                    <FaDownload /> Download QR Code
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRExport;
