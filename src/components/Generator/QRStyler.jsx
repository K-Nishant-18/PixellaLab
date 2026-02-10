import React from 'react';
import { FaSquare, FaCircle, FaUpload, FaTimes } from 'react-icons/fa';

const QRStyler = ({
    fgColor,
    setFgColor,
    bgColor,
    setBgColor,
    dotsType,
    setDotsType,
    errorCorrectionLevel,
    setErrorCorrectionLevel,
    logo,
    setLogo
}) => {
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogo(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogo(null);
    };
    const dotPatterns = [
        { id: 'square', label: 'Square', icon: FaSquare },
        { id: 'rounded', label: 'Rounded', icon: FaSquare },
        { id: 'dots', label: 'Dots', icon: FaCircle },
    ];

    const errorLevels = [
        { id: 'L', label: 'Low', desc: '7% correction' },
        { id: 'M', label: 'Medium', desc: '15% correction' },
        { id: 'Q', label: 'Quartile', desc: '25% correction' },
        { id: 'H', label: 'High', desc: '30% correction' }
    ];

    const presetColors = [
        '#1a1a1a', // Black
        '#2b45f5', // Blue
        '#f54242', // Red
        '#42f554', // Green
        '#f5a442', // Orange
        '#9b42f5', // Purple
    ];

    return (
        <div className="space-y-6">
            {/* Color Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Foreground Color */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                        Foreground
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-16 h-16 border border-border rounded-sm cursor-pointer"
                        />
                        <input
                            type="text"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="flex-1 px-4 py-2 bg-bg-secondary text-text-primary border border-border rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-text-accent"
                            placeholder="#000000"
                        />
                    </div>
                    {/* Preset Colors */}
                    <div className="flex gap-2 mt-3">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setFgColor(color)}
                                className="w-8 h-8 rounded-sm border border-border hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                </div>

                {/* Background Color */}
                <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                        Background
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-16 h-16 border border-border rounded-sm cursor-pointer"
                        />
                        <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1 px-4 py-2 bg-bg-secondary text-text-primary border border-border rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-text-accent"
                            placeholder="#FFFFFF"
                        />
                    </div>
                    {/* Preset Colors */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => setBgColor('#ffffff')}
                            className="w-8 h-8 rounded-sm border border-border hover:scale-110 transition-transform bg-white"
                            title="#ffffff"
                        />
                        <button
                            onClick={() => setBgColor('#f4f4f0')}
                            className="w-8 h-8 rounded-sm border border-border hover:scale-110 transition-transform"
                            style={{ backgroundColor: '#f4f4f0' }}
                            title="#f4f4f0"
                        />
                        <button
                            onClick={() => setBgColor('#e0e0dc')}
                            className="w-8 h-8 rounded-sm border border-border hover:scale-110 transition-transform"
                            style={{ backgroundColor: '#e0e0dc' }}
                            title="#e0e0dc"
                        />
                    </div>
                </div>
            </div>

            {/* Dot Pattern */}
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Pattern Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {dotPatterns.map((pattern) => (
                        <button
                            key={pattern.id}
                            onClick={() => setDotsType(pattern.id)}
                            className={`p-4 flex flex-col items-center gap-2 border rounded-sm transition-all ${dotsType === pattern.id
                                ? 'bg-text-accent text-white border-text-accent'
                                : 'bg-bg-secondary text-text-secondary border-border hover:bg-bg-accent hover:text-text-primary'
                                }`}
                        >
                            <pattern.icon size={24} />
                            <span className="text-xs font-medium">{pattern.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Error Correction Level */}
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Error Correction
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {errorLevels.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => setErrorCorrectionLevel(level.id)}
                            className={`p-3 flex flex-col items-center border rounded-sm transition-all ${errorCorrectionLevel === level.id
                                ? 'bg-text-accent text-white border-text-accent'
                                : 'bg-bg-secondary text-text-secondary border-border hover:bg-bg-accent hover:text-text-primary'
                                }`}
                        >
                            <span className="text-lg font-bold">{level.id}</span>
                            <span className="text-xs">{level.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Logo Upload */}
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Logo (Optional)
                </label>
                {logo ? (
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 border border-border rounded-sm overflow-hidden bg-white flex items-center justify-center">
                            <img src={logo} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                        </div>
                        <button
                            onClick={removeLogo}
                            className="px-4 py-2 bg-red-500 text-white rounded-sm font-medium text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                            <FaTimes /> Remove Logo
                        </button>
                    </div>
                ) : (
                    <label className="block w-full p-8 border-2 border-dashed border-border rounded-sm hover:border-text-accent hover:bg-bg-accent transition-all cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2 text-text-secondary">
                            <FaUpload size={32} />
                            <span className="text-sm font-medium">Click to upload logo</span>
                            <span className="text-xs">PNG, JPG, SVG (max 2MB)</span>
                        </div>
                    </label>
                )}
            </div>
        </div>
    );
};

export default QRStyler;
