import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
      
      {/* Background Glows (Subtle Ambient Light) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      {/* 2. Massive Text */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
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
        className="text-gray-400 text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-12 font-light"
      >
        Video Editing & Visual Storytelling.
      </motion.p>

      {/* 4. Action Buttons */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 items-center"
      >
        {/* Neon Button - MAGNIFIES (scale-105) and glow INCREASES on hover */}
        <a href="#work" className="px-10 py-4 rounded-full bg-cyan-neon text-black font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300">
          VIEW WORK
        </a>

        {/* Glass Button - MAGNIFIES (scale-105) on hover */}
        <a href="#contact" className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-wider backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
          GET IN TOUCH
        </a>
      </motion.div>

    </section>
  );
}