import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Scene6Birthday({ onComplete }: { onComplete: () => void }) {
  const [showNext, setShowNext] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNext(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simple confetti
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const colors = ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#f9d423', '#fff'];
    const particles: {x: number, y: number, r: number, dx: number, dy: number, color: string, tilt: number, tiltAngle: number}[] = [];

    for(let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0
      });
    }

    let animationId: number;
    let time = 0;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach((p, i) => {
        p.tiltAngle += p.dx * 0.1;
        p.y += (Math.cos(time + p.dx) + 1 + p.r / 2) / 2 + p.dy;
        p.x += Math.sin(time);

        if (p.y > height) {
          if (time < 10) { // Keep regenerating for 10s
            particles[i] = {
              x: Math.random() * width,
              y: -10,
              r: p.r,
              dx: p.dx,
              dy: p.dy,
              color: p.color,
              tilt: p.tilt,
              tiltAngle: p.tiltAngle
            };
          }
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
      });
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          src="/hbd-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      <motion.div
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ bottom: 'max(2.5rem, env(safe-area-inset-bottom, 2.5rem))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showNext ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {showNext && (
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-serif tracking-wide text-base sm:text-lg shadow-[0_0_20px_rgba(255,100,150,0.5)] hover:shadow-[0_0_30px_rgba(255,100,150,0.8)] transition-all active:scale-95"
          >
            Next ♥
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
