import { useState } from 'react';
import projects from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film } from 'lucide-react';

export default function WorkGrid() {
  const [activeTab, setActiveTab] = useState('Motion Graphic Edit');

  // Slice to 6 to fit the layout perfectly
  const documentaries = projects.filter(p => p.category === 'Documentary Edit').slice(0, 6);
  const motionGraphics = projects.filter(p => p.category === 'Motion Graphic Edit').slice(0, 6);

  const categories = ['Motion Graphic Edit', 'Documentary Edit'];

  // === HELPER FUNCTIONS ===
  const getVideoId = (url) => {
    if (!url) return null;
    if (url.includes('drive.google.com')) return url.split('/d/')[1]?.split('/')[0];
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }
    return null;
  };

  const getThumbnail = (project) => {
    const id = getVideoId(project.videoUrl);
    if (project.type === 'youtube' && id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    if (project.type === 'drive' && id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`; 
    return null;
  };

  const getEmbedUrl = (url, type) => {
    if (!url) return '';
    const id = getVideoId(url);
    if (type === 'youtube' && id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    if (type === 'drive' && id) return `https://drive.google.com/file/d/${id}/preview`;
    return url;
  };

  // === BENTO CARD COMPONENT ===
  const VideoCard = ({ project, index }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [imgError, setImgError] = useState(false);
    
    const thumbnailSrc = getThumbnail(project);
    const validImage = !imgError && thumbnailSrc ? thumbnailSrc : project.image;

    // === RESPONSIVE GRID LOGIC ===
    // Mobile: 2 Columns total
    // Desktop: 6 Columns total
    
    let gridClass = "";
    let animDirection = { y: 50, opacity: 0 }; 

    // --- 1. Featured Item (Index 0) ---
    // Mobile: Full width (col-span-2)
    // Desktop: Full width (col-span-6)
    if (index === 0) {
        gridClass = "col-span-2 md:col-span-6 h-[250px] md:h-[450px]";
        animDirection = { y: -50, opacity: 0 };
    } 
    
    // --- 2. Middle Row (Index 1 & 2) ---
    // Mobile: Half width (col-span-1)
    // Desktop: Half width (col-span-3)
    else if (index === 1 || index === 2) {
        gridClass = "col-span-1 md:col-span-3 h-[200px] md:h-[350px]";
        animDirection = { x: index === 1 ? -50 : 50, opacity: 0 };
    } 
    
    // --- 3. Bottom Row (Index 3, 4, 5) ---
    // Desktop: Third width (col-span-2)
    else {
        // Mobile Layout for bottom 3 items: 
        // Index 3 & 4 share a row, Index 5 takes full width at bottom to close nicely
        if (index === 5) {
            gridClass = "col-span-2 md:col-span-2 h-[200px] md:h-[300px]";
        } else {
            gridClass = "col-span-1 md:col-span-2 h-[200px] md:h-[300px]";
        }
        animDirection = { y: 50, opacity: 0 };
    }

    return (
      <motion.div
        layout
        initial={animDirection}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-10%" }} // Adjusted margin for mobile scrolling
        transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 120,
            duration: 0.6, 
            delay: index * 0.05 // Faster stagger for mobile feel
        }}
        className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl ${gridClass}`}
      >
        {/* Glow Effect (Cyan) */}
        <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/20 transition-colors duration-500 z-10 pointer-events-none" />
        {/* Mobile border glow to match image */}
        <div className="absolute inset-0 border border-cyan-500/30 rounded-2xl md:rounded-3xl opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
        
        <div className="w-full h-full relative" onClick={() => setIsPlaying(true)}>
          {isPlaying ? (
            <iframe
              src={getEmbedUrl(project.videoUrl, project.type)}
              title={project.title}
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              {validImage ? (
                <img
                  src={validImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800">
                  <Film className="w-8 h-8 md:w-12 md:h-12 text-zinc-600 mb-2" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-8 transition-all duration-300">
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-cyan-400/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                   </div>
                </div>

                {/* Text Info */}
                <div className="relative z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {index === 0 && (
                     <span className="text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2 block">
                       Featured
                     </span>
                  )}
                  <h3 className={`font-display font-bold text-white leading-tight mb-2 ${index === 0 ? 'text-2xl md:text-4xl' : 'text-sm md:text-2xl'}`}>
                    {project.title}
                  </h3>
                  
                  {/* Category Pill */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-[10px] md:text-xs font-medium text-cyan-100 backdrop-blur-sm">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="work" className="py-12 md:py-20 px-4 bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 md:mb-12 text-center">
          My Featured Work
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeTab === cat
                  ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                  : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              // === CHANGED: grid-cols-2 on mobile, grid-cols-6 on desktop ===
              className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6"
            >
              {(activeTab === 'Documentary Edit' ? documentaries : motionGraphics).map((project, index) => (
                <VideoCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}