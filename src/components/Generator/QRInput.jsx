import React from 'react';

const QRInput = ({ inputText, setInputText, qrType, setQrType }) => {
    const qrTypes = [
        { id: 'text', label: 'Text' },
        { id: 'url', label: 'URL' },
        { id: 'email', label: 'Email' },
        { id: 'wifi', label: 'WiFi' },
        { id: 'vcard', label: 'vCard' }
    ];

    const getPlaceholder = () => {
        switch (qrType) {
            case 'url':
                return 'https://example.com';
            case 'email':
                return 'email@example.com';
            case 'wifi':
                return 'WIFI:T:WPA;S:NetworkName;P:Password;;';
            case 'vcard':
                return 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD';
            default:
                return 'Enter your text here...';
        }
    };

    return (
        <div className="space-y-6">
            {/* Type Selector */}
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                    QR Code Type
                </label>
                <div className="flex flex-wrap gap-2">
                    {qrTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setQrType(type.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-sm transition-all border ${qrType === type.id
                                ? 'bg-text-accent text-white border-text-accent'
                                : 'bg-bg-secondary text-text-secondary border-border hover:bg-bg-accent hover:text-text-primary'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Text Input */}
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Content
                </label>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="w-full min-h-[60px] p-4 bg-bg-secondary text-text-primary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-text-accent resize-none font-mono text-sm transition-all"
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-text-secondary">
                        {inputText.length} characters
                    </span>
                    {inputText.length > 2953 && (
                        <span className="text-xs text-red-500 font-medium">
                            Warning: May exceed QR code capacity
                        </span>
                    )}
                </div>
            </div>

            {/* Helper Text */}
            <div className="p-4 bg-bg-accent border border-border rounded-sm">
                <p className="text-sm text-text-secondary leading-relaxed">
                    {qrType === 'url' && '💡 Tip: Make sure to include https:// at the beginning of your URL.'}
                    {qrType === 'email' && '💡 Tip: Enter a valid email address to create a mailto: QR code.'}
                    {qrType === 'wifi' && '💡 Tip: Format: WIFI:T:WPA;S:YourSSID;P:YourPassword;;'}
                    {qrType === 'vcard' && '💡 Tip: Use vCard format for contact information.'}
                    {qrType === 'text' && '💡 Tip: Enter any text, paragraph, or message.'}
                </p>
            </div>
        </div>
    );
};

export default QRInput;
