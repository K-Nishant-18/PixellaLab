import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-border">
            <button
                className="w-full py-8 flex items-center justify-between text-left group"
                onClick={onClick}
            >
                <span className="text-xl md:text-2xl font-medium text-text-primary group-hover:text-text-accent transition-colors pr-8">
                    {question}
                </span>
                <span className={`text-text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <FaMinus size={16} /> : <FaPlus size={16} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-lg text-text-secondary leading-relaxed max-w-3xl">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
