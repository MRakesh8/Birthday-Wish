import { motion } from "framer-motion";

export function DiamondRing({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 220, height: 220 }}>

      {/* Soft ambient glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160, height: 160,
          background: "radial-gradient(circle, rgba(200,150,40,0.3) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating + gentle sway */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/ring.webp"
          alt="Diamond Ring"
          style={{
            width: 180,
            height: 180,
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(180,130,20,0.6)) drop-shadow(0 0 14px rgba(255,220,80,0.45))",
          }}
        />
      </motion.div>

      {/* Sparkle particles */}
      {[
        { x: -70, y: -50, size: 18, delay: 0,   dur: 2.5 },
        { x:  75, y: -40, size: 13, delay: 0.7, dur: 3   },
        { x: -75, y:  20, size: 10, delay: 1.3, dur: 2.8 },
        { x:  80, y:  25, size: 15, delay: 0.4, dur: 3.2 },
        { x:   0, y: -80, size: 20, delay: 0.9, dur: 2.2 },
        { x: -35, y:  70, size:  9, delay: 1.8, dur: 3.5 },
        { x:  40, y:  68, size: 11, delay: 1.1, dur: 2.9 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-amber-200"
          style={{ left: "50%", top: "50%", marginLeft: s.x, marginTop: s.y, fontSize: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4], rotate: [0, 180, 360] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      ))}

      {/* Diamond flash shimmer */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 14px 7px rgba(255,255,255,0.95)",
          top: "22%", left: "52%", marginLeft: -3,
        }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}
