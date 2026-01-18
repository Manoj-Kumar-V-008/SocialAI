import { useState, useEffect, useRef } from 'react';

export const useCanvasAnimation = (canvasRef, onComplete) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const imagesRef = useRef([]);
    const requestRef = useRef();

    useEffect(() => {
        const loadImages = async () => {
            // Import all png/jpg files
            const modules = import.meta.glob('../assets/intro-frames/*.{png,jpg,jpeg}', { eager: true });

            const sortedKeys = Object.keys(modules).sort();
            const imageUrls = sortedKeys.map(key => modules[key].default);

            if (imageUrls.length === 0) {
                console.warn("No frames found in src/assets/intro-frames!");
                setLoading(false);
                return;
            }

            let loadedCount = 0;
            const promises = imageUrls.map((url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / imageUrls.length) * 100));
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame: ${url}`);
                        resolve(null);
                    };
                });
            });

            const loaded = await Promise.all(promises);
            imagesRef.current = loaded.filter(Boolean);
            setLoading(false);
        };

        loadImages();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const play = () => {
        if (loading || imagesRef.current.length === 0 || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        let frameIndex = 0;
        const totalFrames = imagesRef.current.length;
        const fps = 30;
        const interval = 1000 / fps;
        let lastTime = performance.now();
        let direction = 1;
        let hasCompletedOnce = false;

        const animate = (time) => {
            const delta = time - lastTime;

            if (delta >= interval) {
                lastTime = time - (delta % interval);

                const img = imagesRef.current[frameIndex];
                const canvas = canvasRef.current;

                if (canvas && img) {
                    const cw = canvas.width;
                    const ch = canvas.height;

                    const imgRatio = img.width / img.height;
                    const canvasRatio = cw / ch;
                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (canvasRatio > imgRatio) {
                        drawWidth = cw;
                        drawHeight = cw / imgRatio;
                        offsetX = 0;
                        offsetY = (ch - drawHeight) / 2;
                    } else {
                        drawHeight = ch;
                        drawWidth = ch * imgRatio;
                        offsetX = (cw - drawWidth) / 2;
                        offsetY = 0;
                    }

                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }

                // Update frame index based on direction
                frameIndex += direction;

                // Ping-Pong Logic
                if (frameIndex >= totalFrames) {
                    frameIndex = totalFrames - 2; // Step back
                    direction = -1;
                    if (!hasCompletedOnce) {
                        hasCompletedOnce = true;
                        if (onComplete) onComplete();
                    }
                } else if (frameIndex < 0) {
                    frameIndex = 1; // Step forward
                    direction = 1;
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
    };

    return { loading, progress, play };
};
