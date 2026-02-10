import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRPreview = ({ inputText, fgColor, bgColor, dotsType, errorCorrectionLevel, qrCodeRef, logo }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!inputText) return;

        // Create base QR code options
        const qrOptions = {
            width: 400,
            height: 400,
            data: inputText,
            margin: 10,
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: errorCorrectionLevel
            },
            dotsOptions: {
                color: fgColor,
                type: dotsType
            },
            backgroundOptions: {
                color: bgColor,
            },
            cornersSquareOptions: {
                color: fgColor,
                type: dotsType === 'dots' ? 'dot' : dotsType
            },
            cornersDotOptions: {
                color: fgColor,
                type: dotsType === 'dots' ? 'dot' : 'square'
            }
        };

        // Add logo options only if logo exists
        if (logo) {
            qrOptions.imageOptions = {
                hideBackgroundDots: true,
                imageSize: 0.3,
                margin: 5,
                crossOrigin: 'anonymous'
            };
            qrOptions.image = logo;
        }

        // Create QR code instance
        const qrCode = new QRCodeStyling(qrOptions);

        // Store reference for export
        if (qrCodeRef) {
            qrCodeRef.current = qrCode;
        }

        // Clear previous QR code
        if (canvasRef.current) {
            canvasRef.current.innerHTML = '';
            qrCode.append(canvasRef.current);
        }
    }, [inputText, fgColor, bgColor, dotsType, errorCorrectionLevel, qrCodeRef, logo]);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-bg-secondary border border-border rounded-sm">
            {inputText ? (
                <div className="relative">
                    <div
                        ref={canvasRef}
                        className="transition-all duration-300"
                    />
                    <div className="mt-4 text-center">
                        <p className="text-xs text-text-secondary uppercase tracking-widest">
                            Preview
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-[400px] h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-sm">
                    <p className="text-text-secondary text-center px-8">
                        Enter content to generate QR code
                    </p>
                </div>
            )}
        </div>
    );
};

export default QRPreview;
