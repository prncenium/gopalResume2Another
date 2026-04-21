import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-0 overflow-hidden">
      
      {/* Background Glows (Subtle Ambient Light) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      {/* 2. Massive Text */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-satoshi leading-[0.85] text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4"
      >
        <span className="block text-white">Crafting the</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 pb-4">
          Future.
        </span>
      </motion.h1>

      {/* 3. Subtext */}
      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-mono text-[12px] md:text-sm tracking-[0.3em] uppercase text-white/50 max-w-2xl mx-auto mb-16"
      >
        Video Editing & Visual Storytelling.
      </motion.p>

      {/* 4. Action Buttons */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 items-center mt-4"
      >
        {/* Neon Button - MAGNIFIES (scale-105) and glow INCREASES on hover */}
        <a href="#work" className="text-[14px] px-10 py-4 rounded-full uppercase bg-cyan-neon text-black font-semibold tracking-[0.2em] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 ">
          VIEW WORK
        </a>

        {/* Glass Button - MAGNIFIES (scale-105) on hover */}
        <a href="#contact" className="text-[14px] px-10 py-4 rounded-full uppercase bg-white/5 border border-white/10 text-white font-bold tracking-[0.2em] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 ">
          GET IN TOUCH
        </a>
      </motion.div>

      {/* 5. Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-29 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-4 font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          
          className="w-12 h-19 border-2 border-white/10 rounded-full flex justify-center pt-2"
        >
          
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  );
}