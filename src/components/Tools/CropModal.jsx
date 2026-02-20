import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiRotateCcw, FiRotateCw, FiCheck, FiRefreshCw, FiCrop } from 'react-icons/fi';

/* ─── Constants ────────────────────────────────────────────────────────────── */
const ASPECT_RATIOS = [
    { label: 'Free', value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:2', value: 3 / 2 },
    { label: '9:16', value: 9 / 16 },
    { label: '2:1', value: 2 },
    { label: '⊙ Circle', value: 'circle' },
];

const MIN_SIZE = 20;

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
const clamp = (c, dW, dH) => {
    let { x, y, w, h } = c;
    w = Math.max(MIN_SIZE, Math.min(w, dW - x));
    h = Math.max(MIN_SIZE, Math.min(h, dH - y));
    x = Math.max(0, Math.min(x, dW - w));
    y = Math.max(0, Math.min(y, dH - h));
    return { x, y, w, h };
};

const enforceAR = (c, ar, anchorH = false) => {
    const eff = ar === 'circle' ? 1 : ar;
    if (!eff) return c;
    return anchorH
        ? { ...c, w: Math.round(c.h * eff) }
        : { ...c, h: Math.round(c.w / eff) };
};

/* ─── Component ─────────────────────────────────────────────────────────────── */
const CropModal = ({ img, onClose, onApply }) => {
    /* canvas / layout refs */
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const previewCanvasRef = useRef(null);

    /* image natural size & display layout */
    const [natSize, setNatSize] = useState({ w: 0, h: 0 });
    const [dispSize, setDispSize] = useState({ w: 0, h: 0 });
    const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

    /* crop state (display-space coords) */
    const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });

    /* transform state */
    const [aspectRatio, setAspectRatio] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);

    /* drag machinery */
    const dragging = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const isCircle = aspectRatio === 'circle';
    const effAR = isCircle ? 1 : aspectRatio;

    /* ── load image + layout ───────────────────────────────────────────────── */
    useEffect(() => {
        const el = new Image();
        el.crossOrigin = 'anonymous';
        el.src = img.processedPreview || img.preview;
        el.onload = () => {
            const natW = el.naturalWidth;
            const natH = el.naturalHeight;
            setNatSize({ w: natW, h: natH });

            const cont = containerRef.current;
            if (!cont) return;
            /* leave some padding */
            const maxW = cont.clientWidth - 48;
            const maxH = cont.clientHeight - 48;
            const scale = Math.min(maxW / natW, maxH / natH, 1);
            const dW = Math.floor(natW * scale);
            const dH = Math.floor(natH * scale);
            setDispSize({ w: dW, h: dH });
            setImgOffset({
                x: Math.floor((cont.clientWidth - dW) / 2),
                y: Math.floor((cont.clientHeight - dH) / 2),
            });
            setCrop({ x: 0, y: 0, w: dW, h: dH });
        };
    }, [img]);

    /* ── live preview ──────────────────────────────────────────────────────── */
    useEffect(() => {
        const canvas = previewCanvasRef.current;
        if (!canvas || !natSize.w || !dispSize.w || !crop.w) return;
        const scaleX = natSize.w / dispSize.w;
        const scaleY = natSize.h / dispSize.h;
        const rx = Math.round(crop.x * scaleX);
        const ry = Math.round(crop.y * scaleY);
        const rw = Math.round(crop.w * scaleX);
        const rh = Math.round(crop.h * scaleY);

        let outW = rw, outH = rh;
        if (rotation === 90 || rotation === 270) [outW, outH] = [outH, outW];

        const side = Math.min(outW, outH);
        canvas.width = isCircle ? side : outW;
        canvas.height = isCircle ? side : outH;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isCircle) {
            ctx.beginPath();
            ctx.arc(side / 2, side / 2, side / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        }

        const el = imageRef.current;
        if (!el) return;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        if (flipH) ctx.scale(-1, 1);
        if (flipV) ctx.scale(1, -1);
        ctx.drawImage(el, rx, ry, rw, rh, -rw / 2, -rh / 2, rw, rh);
        ctx.restore();
    }, [crop, rotation, flipH, flipV, natSize, dispSize, isCircle]);

    /* ── drag helpers ──────────────────────────────────────────────────────── */
    const getPos = useCallback((e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: cx - rect.left - imgOffset.x, y: cy - rect.top - imgOffset.y };
    }, [imgOffset]);

    const startDrag = (e, type, hX = 0, hY = 0) => {
        e.preventDefault();
        const pos = getPos(e);
        dragging.current = { type, hX, hY, startCrop: { ...crop }, startMouse: pos };
        setIsDragging(true);
    };

    const startNew = (e) => {
        e.preventDefault();
        const pos = getPos(e);
        if (pos.x < 0 || pos.x > dispSize.w || pos.y < 0 || pos.y > dispSize.h) return;
        dragging.current = { type: 'new', startMouse: pos, startCrop: { x: pos.x, y: pos.y, w: 0, h: 0 } };
        setCrop({ x: pos.x, y: pos.y, w: 0, h: 0 });
        setIsDragging(true);
    };

    useEffect(() => {
        const onMove = (e) => {
            if (!dragging.current) return;
            const pos = getPos(e);
            const { type, hX, hY, startCrop, startMouse } = dragging.current;
            const dx = pos.x - startMouse.x;
            const dy = pos.y - startMouse.y;
            const dW = dispSize.w, dH = dispSize.h;

            if (type === 'move') {
                const nx = Math.max(0, Math.min(startCrop.x + dx, dW - startCrop.w));
                const ny = Math.max(0, Math.min(startCrop.y + dy, dH - startCrop.h));
                setCrop(c => clamp({ ...c, x: nx, y: ny }, dW, dH));

            } else if (type === 'new') {
                let nx = Math.min(startMouse.x, pos.x);
                let ny = Math.min(startMouse.y, pos.y);
                let nw = Math.abs(pos.x - startMouse.x);
                let nh = Math.abs(pos.y - startMouse.y);
                setCrop(clamp(enforceAR({ x: nx, y: ny, w: nw, h: nh }, effAR), dW, dH));

            } else if (type === 'handle') {
                let { x, y, w, h } = startCrop;
                if (hX === -1) { const nx = Math.min(startCrop.x + dx, startCrop.x + startCrop.w - MIN_SIZE); x = nx; w = startCrop.w - (nx - startCrop.x); }
                if (hX === 1) { w = Math.max(MIN_SIZE, startCrop.w + dx); }
                if (hY === -1) { const ny = Math.min(startCrop.y + dy, startCrop.y + startCrop.h - MIN_SIZE); y = ny; h = startCrop.h - (ny - startCrop.y); }
                if (hY === 1) { h = Math.max(MIN_SIZE, startCrop.h + dy); }
                let nc = { x, y, w, h };
                if (effAR && hX !== 0 && hY !== 0) nc = enforceAR(nc, effAR, Math.abs(dy) > Math.abs(dx));
                setCrop(clamp(nc, dW, dH));
            }
        };

        const onUp = () => { dragging.current = null; setIsDragging(false); };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [dispSize, imgOffset, crop, effAR, getPos]);

    /* ── precision inputs ──────────────────────────────────────────────────── */
    const setField = (field, raw) => {
        const v = Math.max(0, parseInt(raw, 10) || 0);
        /* convert pixel input (natural px) back to display-space */
        const scaleX = dispSize.w / natSize.w;
        const scaleY = dispSize.h / natSize.h;
        const next = { ...crop };
        if (field === 'x') next.x = Math.round(v * scaleX);
        if (field === 'y') next.y = Math.round(v * scaleY);
        if (field === 'w') next.w = Math.round(v * scaleX);
        if (field === 'h') next.h = Math.round(v * scaleY);
        setCrop(clamp(enforceAR(next, effAR, field === 'h'), dispSize.w, dispSize.h));
    };

    /* natural-space crop values for display */
    const natCrop = natSize.w ? {
        x: Math.round(crop.x * natSize.w / dispSize.w),
        y: Math.round(crop.y * natSize.h / dispSize.h),
        w: Math.round(crop.w * natSize.w / dispSize.w),
        h: Math.round(crop.h * natSize.h / dispSize.h),
    } : { x: 0, y: 0, w: 0, h: 0 };

    /* ── aspect ratio change ───────────────────────────────────────────────── */
    const applyAR = (ar) => {
        setAspectRatio(ar);
        const eff = ar === 'circle' ? 1 : ar;
        if (eff) setCrop(c => clamp(enforceAR(c, eff), dispSize.w, dispSize.h));
    };

    /* ── reset ─────────────────────────────────────────────────────────────── */
    const resetAll = () => {
        setRotation(0); setFlipH(false); setFlipV(false);
        setAspectRatio(null);
        setCrop({ x: 0, y: 0, w: dispSize.w, h: dispSize.h });
    };

    /* ── apply ─────────────────────────────────────────────────────────────── */
    const applyCrop = () => {
        const canvas = document.createElement('canvas');
        const el = new Image();
        el.crossOrigin = 'anonymous';
        el.src = img.processedPreview || img.preview;
        el.onload = () => {
            const scaleX = natSize.w / dispSize.w;
            const scaleY = natSize.h / dispSize.h;
            const rx = Math.round(crop.x * scaleX);
            const ry = Math.round(crop.y * scaleY);
            const rw = Math.round(crop.w * scaleX);
            const rh = Math.round(crop.h * scaleY);

            let outW = rw, outH = rh;
            if (rotation === 90 || rotation === 270) [outW, outH] = [outH, outW];

            if (isCircle) {
                const side = Math.min(outW, outH);
                canvas.width = side; canvas.height = side;
                const ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.arc(side / 2, side / 2, side / 2, 0, Math.PI * 2);
                ctx.closePath(); ctx.clip();
                ctx.save();
                ctx.translate(side / 2, side / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                if (flipH) ctx.scale(-1, 1);
                if (flipV) ctx.scale(1, -1);
                ctx.drawImage(el, rx, ry, rw, rh, -rw / 2, -rh / 2, rw, rh);
                ctx.restore();
                const url = canvas.toDataURL('image/png');
                const head = 'data:image/png;base64,';
                onApply(url, { width: side, height: side, size: Math.round((url.length - head.length) * 3 / 4), format: 'png' });
            } else {
                canvas.width = outW; canvas.height = outH;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.translate(outW / 2, outH / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                if (flipH) ctx.scale(-1, 1);
                if (flipV) ctx.scale(1, -1);
                ctx.drawImage(el, rx, ry, rw, rh, -rw / 2, -rh / 2, rw, rh);
                ctx.restore();
                const mimeType = img.type && img.type !== 'image/png' ? img.type : 'image/jpeg';
                const url = canvas.toDataURL(mimeType, 0.92);
                const head = `data:${mimeType};base64,`;
                onApply(url, { width: outW, height: outH, size: Math.round((url.length - head.length) * 3 / 4), format: mimeType.split('/')[1] });
            }
        };
    };

    /* ── 8-point handles ───────────────────────────────────────────────────── */
    const handles = [
        { hX: -1, hY: -1, cursor: 'nw-resize', s: { left: crop.x - 5, top: crop.y - 5 } },
        { hX: 0, hY: -1, cursor: 'n-resize', s: { left: crop.x + crop.w / 2 - 5, top: crop.y - 5 } },
        { hX: 1, hY: -1, cursor: 'ne-resize', s: { left: crop.x + crop.w - 5, top: crop.y - 5 } },
        { hX: 1, hY: 0, cursor: 'e-resize', s: { left: crop.x + crop.w - 5, top: crop.y + crop.h / 2 - 5 } },
        { hX: 1, hY: 1, cursor: 'se-resize', s: { left: crop.x + crop.w - 5, top: crop.y + crop.h - 5 } },
        { hX: 0, hY: 1, cursor: 's-resize', s: { left: crop.x + crop.w / 2 - 5, top: crop.y + crop.h - 5 } },
        { hX: -1, hY: 1, cursor: 'sw-resize', s: { left: crop.x - 5, top: crop.y + crop.h - 5 } },
        { hX: -1, hY: 0, cursor: 'w-resize', s: { left: crop.x - 5, top: crop.y + crop.h / 2 - 5 } },
    ];

    /* ── render ────────────────────────────────────────────────────────────── */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
        >
            {/* ── Top Bar ───────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 text-white min-w-0">
                    <FiCrop size={16} className="text-blue-400 shrink-0" />
                    <span className="font-semibold tracking-wide text-sm uppercase shrink-0">Crop Editor</span>
                    <span className="text-white/30 text-xs ml-1 truncate">{img.name}</span>
                </div>
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors ml-3 shrink-0 p-1"><FiX size={22} /></button>
            </div>

            {/* ── Body ──────────────────────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

                {/* ── LEFT: crop canvas ─────────────────────────────────────── */}
                <div
                    ref={containerRef}
                    className="flex-1 min-h-[45vh] lg:min-h-0 relative overflow-hidden select-none bg-[#0a0a0a]"
                    style={{ cursor: 'crosshair' }}
                    onMouseDown={startNew}
                    onTouchStart={startNew}
                >
                    {/* hidden img used for live preview canvas draw calls */}
                    <img
                        ref={imageRef}
                        src={img.processedPreview || img.preview}
                        alt=""
                        className="hidden"
                        crossOrigin="anonymous"
                    />

                    {dispSize.w > 0 && (
                        <div
                            className="absolute"
                            style={{ left: imgOffset.x, top: imgOffset.y, width: dispSize.w, height: dispSize.h }}
                        >
                            {/* Base image */}
                            <img
                                src={img.processedPreview || img.preview}
                                alt="crop"
                                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
                                style={{
                                    transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                                    transformOrigin: 'center',
                                    opacity: 0.4,
                                }}
                                draggable={false}
                            />

                            {/* Full-brightness cropped area (clip-path) */}
                            <div
                                className="absolute inset-0 overflow-hidden pointer-events-none"
                                style={{
                                    clipPath: isCircle
                                        ? `ellipse(${crop.w / 2}px ${crop.h / 2}px at ${crop.x + crop.w / 2}px ${crop.y + crop.h / 2}px)`
                                        : `polygon(${crop.x}px ${crop.y}px, ${crop.x + crop.w}px ${crop.y}px, ${crop.x + crop.w}px ${crop.y + crop.h}px, ${crop.x}px ${crop.y + crop.h}px)`,
                                }}
                            >
                                <img
                                    src={img.processedPreview || img.preview}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
                                    style={{
                                        transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                                        transformOrigin: 'center',
                                    }}
                                    draggable={false}
                                />
                            </div>

                            {/* Crop box border */}
                            <div
                                className="absolute"
                                style={{
                                    left: crop.x, top: crop.y,
                                    width: crop.w, height: crop.h,
                                    border: '1.5px solid rgba(255,255,255,0.9)',
                                    boxSizing: 'border-box',
                                    borderRadius: isCircle ? '50%' : 0,
                                    cursor: 'move',
                                }}
                                onMouseDown={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
                                onTouchStart={(e) => { e.stopPropagation(); startDrag(e, 'move'); }}
                            >
                                {/* Rule of thirds — rectangle only */}
                                {!isCircle && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        {[33.33, 66.66].map(p => (
                                            <React.Fragment key={p}>
                                                <div className="absolute top-0 bottom-0 bg-white/15" style={{ left: `${p}%`, width: 1 }} />
                                                <div className="absolute left-0 right-0 bg-white/15" style={{ top: `${p}%`, height: 1 }} />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                                {/* Corner ticks */}
                                {!isCircle && [
                                    { cls: 'top-0 left-0 border-t-2 border-l-2', sty: { margin: -1 } },
                                    { cls: 'top-0 right-0 border-t-2 border-r-2', sty: { margin: -1 } },
                                    { cls: 'bottom-0 left-0 border-b-2 border-l-2', sty: { margin: -1 } },
                                    { cls: 'bottom-0 right-0 border-b-2 border-r-2', sty: { margin: -1 } },
                                ].map((c, i) => (
                                    <div key={i} className={`absolute w-5 h-5 border-white ${c.cls}`} style={c.sty} />
                                ))}
                            </div>

                            {/* 8 resize handles */}
                            {handles.map((h, i) => (
                                <div
                                    key={i}
                                    className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-lg touch-none"
                                    style={{ ...h.s, cursor: h.cursor, transform: 'translate(-3px,-3px)' }}
                                    onMouseDown={(e) => { e.stopPropagation(); startDrag(e, 'handle', h.hX, h.hY); }}
                                    onTouchStart={(e) => { e.stopPropagation(); startDrag(e, 'handle', h.hX, h.hY); }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Bottom dimension badge */}
                    {crop.w > 0 && natSize.w > 0 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs font-mono rounded-sm border border-white/10 pointer-events-none">
                            {natCrop.w} × {natCrop.h} px
                        </div>
                    )}
                </div>

                {/* ── RIGHT: controls panel ────────────────────────────────── */}
                <div className="w-full lg:w-96 bg-[#111] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col shrink-0 overflow-y-auto max-h-[55vh] lg:max-h-none">


                    {/* Precision Inputs */}
                    <div className="px-3 py-2.5 border-b border-white/10 space-y-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Position & Size</p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: 'X', field: 'x', val: natCrop.x },
                                { label: 'Y', field: 'y', val: natCrop.y },
                                { label: 'W', field: 'w', val: natCrop.w },
                                { label: 'H', field: 'h', val: natCrop.h },
                            ].map(({ label, field, val }) => (
                                <label key={field} className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">{label}</span>
                                    <div className="flex items-center bg-[#1a1a1a] border border-white/10 focus-within:border-blue-500/60 rounded-sm px-2 gap-1">
                                        <input
                                            type="number"
                                            min={0}
                                            value={val}
                                            onChange={e => setField(field, e.target.value)}
                                            className="w-full bg-transparent text-white text-xs font-mono py-1.5 focus:outline-none"
                                        />
                                        <span className="text-white/20 text-[9px]">px</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="px-3 py-2.5 border-b border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Aspect Ratio</p>
                        <div className="grid grid-cols-4 lg:grid-cols-4 gap-1">
                            {ASPECT_RATIOS.map(ar => (
                                <button
                                    key={ar.label}
                                    onClick={() => applyAR(ar.value)}
                                    className={`py-2 px-1 text-[10px] font-medium border transition-colors text-center rounded-sm ${aspectRatio === ar.value
                                        ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    {ar.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rotate */}
                    <div className="px-3 py-2.5 border-b border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Rotate  <span className="text-blue-400 font-mono">{rotation}°</span></p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setRotation(r => (r - 90 + 360) % 360)}
                                className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors rounded-sm"
                            >
                                <FiRotateCcw size={13} /> –90°
                            </button>
                            <button
                                onClick={() => setRotation(r => (r + 90) % 360)}
                                className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors rounded-sm"
                            >
                                <FiRotateCw size={13} /> +90°
                            </button>
                        </div>
                    </div>

                    {/* Flip */}
                    <div className="px-3 py-2.5 border-b border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Flip</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setFlipH(f => !f)}
                                className={`py-2 text-xs font-medium border transition-colors rounded-sm ${flipH ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
                            >↔ Horizontal</button>
                            <button
                                onClick={() => setFlipV(f => !f)}
                                className={`py-2 text-xs font-medium border transition-colors rounded-sm ${flipV ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
                            >↕ Vertical</button>
                        </div>
                    </div>

                    {/* Reset */}
                    <div className="px-3 py-2.5">
                        <button
                            onClick={resetAll}
                            className="w-full py-2 text-xs font-medium border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 transition-colors flex items-center justify-center gap-2 rounded-sm"
                        >
                            <FiRefreshCw size={12} /> Reset All
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 py-3 bg-[#111] border-t border-white/10 shrink-0">
                <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-3 border border-white/20 text-white/60 text-sm font-medium hover:text-white hover:border-white/40 transition-colors rounded-sm text-center"
                >
                    Cancel
                </button>
                <div className="flex-1 flex items-center gap-3 sm:justify-end">
                    <span className="text-white/30 text-xs font-mono hidden sm:block">{natCrop.w} × {natCrop.h} px</span>
                    <button
                        onClick={applyCrop}
                        className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                        <FiCheck size={16} /> Apply Crop
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CropModal;
