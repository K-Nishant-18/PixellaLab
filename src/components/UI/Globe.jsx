import React from 'react';

const Globe = () => {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-60">
                <div
                    className="absolute inset-0 w-full h-full rounded-full animate-[spin_20s_linear_infinite]"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Longitude Lines (Meridians) */}
                    {[0, 45, 90, 135].map((deg, i) => (
                        <div
                            key={`long-${i}`}
                            className="absolute inset-0 border border-text-accent rounded-full"
                            style={{ transform: `rotateY(${deg}deg)` }}
                        ></div>
                    ))}

                    {/* Latitude Lines (Parallels) - simulated as scaled circles */}
                    {[0.9, 0.75, 0.55, 0.3].map((scale, i) => (
                        <div
                            key={`lat-${i}`}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-text-accent rounded-full"
                            style={{
                                width: `${scale * 100}%`,
                                height: `${scale * 100}%`,
                                transform: `translate(-50%, -50%) rotateX(90deg)` // This doesn't quite work in 2D space without proper 3D setup.
                                // Actually, for a simple wireframe sphere rotating on Y axis, horizontal circles should just be flat circles if we are looking straight on, 
                                // BUT if the parent is rotating, they need to be 3D.
                                // Let's stick to a set of concentric rotating rings for a more abstract "atom/globe" feel which is safer and cleaner in pure CSS without complex trigonometric math for positions.
                                // OR simple: Just meridians rotating creates a great sphere effect.
                            }}
                        ></div>
                    ))}

                    {/* Equator */}
                    <div className="absolute inset-0 border border-text-accent rounded-full rotate-90 opacity-50"></div>
                </div>

                {/* Inner glow/core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-text-accent rounded-full blur-md"></div>
            </div>
        </div>
    );
};

// Let's try a better approach: A true 3D CSS globe requires the parent to hold perspective.
// Cleaner implementation:
const Globe3D = () => {
    return (
        <div className="perspective-[1000px] w-full h-full flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-[spin_30s_linear_infinite] preserve-3d">
                {/* Meridians - Vertical Circles */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 border border-text-accent/40 rounded-full"
                        style={{ transform: `rotateY(${i * 30}deg)` }}
                    ></div>
                ))}

                {/* Equator - Horizontal Circle */}
                <div className="absolute inset-0 border border-text-accent/40 rounded-full" style={{ transform: 'rotateX(90deg)' }}></div>

                {/* 45 degree parallels */}
                <div className="absolute inset-[15%] border border-text-accent/40 rounded-full" style={{ transform: 'translateZ(40px)' }}></div>
                <div className="absolute inset-[15%] border border-text-accent/40 rounded-full" style={{ transform: 'translateZ(-40px)' }}></div>
            </div>
        </div>
    )
}

export default Globe3D;
