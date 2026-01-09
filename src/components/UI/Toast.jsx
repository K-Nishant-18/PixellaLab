import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-8 right-8 z-[10000] flex items-center gap-4 bg-text-primary text-bg-primary px-6 py-4 rounded-sm shadow-2xl min-w-[300px]"
                >
                    <span className={`text-xl ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    </span>
                    <div className="flex-1">
                        <p className="font-bold text-sm uppercase tracking-widest">{type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-sm opacity-90">{message}</p>
                    </div>
                    <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
                        <FaTimes />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
