import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroGrid = () => {
    const containerRef = useRef(null);
    const [gridSize, setGridSize] = useState({ columns: 0, rows: 0 });

    useEffect(() => {
        const updateGrid = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                const cellSize = 50; // Larger cells for Swiss minimalist look
                const columns = Math.ceil(offsetWidth / cellSize);
                const rows = Math.ceil(offsetHeight / cellSize);
                setGridSize({ columns, rows });
            }
        };

        const observer = new ResizeObserver(updateGrid);
        if (containerRef.current) observer.observe(containerRef.current);

        // Initial call
        updateGrid();

        return () => observer.disconnect();
    }, []);

    const totalCells = gridSize.columns * gridSize.rows;

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden">
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                    width: '100%',
                    height: '100%'
                }}
            >
                {Array.from({ length: totalCells }).map((_, i) => (
                    <GridCell key={i} />
                ))}
            </div>

            {/* Swiss Accent overlay */}
            <div className="absolute bottom-25 right-10 pointer-events-none mix-blend-difference">
                <h1 className="text-8xl font-black text-text-accent opacity-10 tracking-tighter">
                    Pixella Labs
                </h1>
            </div>
        </div>
    );
};

const GridCell = () => {
    // Generate uniform random opacity between 0.05 and 0.3 for the "uneven shades" look
    // Using useState to keep it stable across re-renders
    const [baseOpacity] = useState(() => Math.random() * 0.3 + 0.1);

    return (
        <motion.div
            className="w-full h-full border-[0.5px] border-text-primary/30 relative"
            initial={{
                opacity: 0,
                backgroundColor: "transparent"
            }}
            animate={{
                opacity: baseOpacity,
                backgroundColor: "transparent",
                transition: { duration: 1.5, ease: "easeOut" }
            }}
            whileHover={{
                opacity: 1,
                backgroundColor: "var(--color-text-accent)",
                scale: 0.9,
                transition: {
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }}
        />
    );
};

export default HeroGrid;
