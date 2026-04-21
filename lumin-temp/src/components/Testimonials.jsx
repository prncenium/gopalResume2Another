import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimonials from '../data/testimonials.json';

const Testimonials = () => {
  const [expandedVideo, setExpandedVideo] = useState(null);
  const displayTestimonials = testimonials.slice(0, 4);

  const getPreviewUrl = (url) => {
    if (!url) return '';
    return url.replace(/\/view.*$/, '/preview');
  };

  useEffect(() => {
    if (expandedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedVideo]);

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 md:w-5 md:h-5 ${i < rating ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-gray-700'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // --- UPDATED ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Slightly longer stagger for a slower sequence
      },
    },
  };

  // Card sliding in from the Left
  const leftSlideVariants = {
    hidden: { opacity: 0, x: -100 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.2, // "Slowly"
        ease: [0.25, 1, 0.5, 1] // "Smoothly" - custom cubic bezier
      } 
    },
  };

  // Card sliding in from the Right
  const rightSlideVariants = {
    hidden: { opacity: 0, x: 100 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1] 
      } 
    },
  };

  return (
    <>
      <section className="w-full py-24 relative z-10 bg-[#050505] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-cyan-500/60 uppercase mb-4 block">
  Testimonials — 03
</span>
            <h2 className="text-4xl md:text-5xl lg:text-[85px] font-extrabold text-white mb-6 tracking-tight">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Feedback</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
              Real results and experiences from creators and directors I've collaborated with.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(0,1fr)]"
          >
            {displayTestimonials.map((testimonial, index) => {
              let bentoClasses = "group flex flex-col bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-500";
              
              if (index === 0) bentoClasses += " lg:col-span-1";
              if (index === 1) bentoClasses += " lg:col-span-2";
              if (index === 2) bentoClasses += " lg:col-span-2";
              if (index === 3) bentoClasses += " lg:col-span-1";

              const hasWallpaper = !!testimonial.wallpaperUrl;
              
              // Select variant based on left (0, 2) or right (1, 3) position
              const currentVariant = (index === 0 || index === 2) ? leftSlideVariants : rightSlideVariants;

              return (
                <motion.div variants={currentVariant} key={testimonial.id} className={bentoClasses}>
                  <div className={`relative w-full bg-black/90 border-b border-white/5 overflow-hidden flex items-center justify-center ${index === 0 || index === 3 ? 'aspect-square' : 'aspect-video'}`}>
                    <div className="absolute inset-0 animate-pulse bg-white/5"></div>
                    
                    {hasWallpaper ? (
                      <img 
                        src={testimonial.wallpaperUrl} 
                        alt={`${testimonial.clientName} thumbnail`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                    ) : (
                      <iframe
                        src={getPreviewUrl(testimonial.driveEmbedUrl)}
                        title={`Thumbnail ${testimonial.clientName}`}
                        className="absolute top-0 left-0 w-full h-full z-10 opacity-70 pointer-events-none"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    )}

                    <div 
                      className="absolute inset-0 z-20 cursor-pointer flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-300"
                      onClick={() => setExpandedVideo(testimonial)}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full bg-cyan-500/90 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                      >
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between relative">
                    <div className="absolute top-6 right-8 text-white/5 font-serif text-8xl pointer-events-none select-none">"</div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-1">{renderStars(testimonial.rating || 5)}</div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg font-light italic">
                        "{testimonial.review}"
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-lg shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:border-cyan-400/50 transition-colors duration-300">
                        {getInitials(testimonial.clientName)}
                      </div>
                      <div>
                        <h4 className="font-satoshi text-white font-bold text-lg tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                          {testimonial.clientName}
                        </h4>
                        <p className="text-cyan-500/80 text-sm font-mono">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {expandedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setExpandedVideo(null)} 
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 z-50"
              onClick={() => setExpandedVideo(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[505px] h-[85vh] max-h-[900px] bg-[#111] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] border border-white/10"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="absolute inset-0 animate-pulse bg-white/5 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              </div>

              <iframe
                src={getPreviewUrl(expandedVideo.driveEmbedUrl)}
                title={`Testimonial from ${expandedVideo.clientName}`}
                className="absolute top-0 left-0 w-full h-full z-10"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Testimonials;