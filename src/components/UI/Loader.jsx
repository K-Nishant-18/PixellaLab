import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary h-screen w-screen cursor-wait">
            {/* 3x3 Swiss Grid Pulse */}
            <div className="grid grid-cols-3 gap-1 p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 bg-text-accent"
                        initial={{ opacity: 0.1, scale: 0.8 }}
                        animate={{
                            opacity: [0.1, 1, 0.1],
                            scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.1, // Staggered ripple effect
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Minimal Brand Label */}
            <motion.div
                className="mt-8 text-text-primary text-xs uppercase tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Pixella Labs.
            </motion.div>
        </div>
    );
};

export default Loader;
