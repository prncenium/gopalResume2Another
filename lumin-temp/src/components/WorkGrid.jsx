import { useState, useEffect } from 'react';
import projects from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export default function WorkGrid() {
  const [activeTab, setActiveTab] = useState('Motion Graphic Edit');
  
  // NEW: State to track which project is open in the fullscreen modal
  const [expandedProject, setExpandedProject] = useState(null);

  // Enforcing exactly 3 items per category
  const documentaries = projects.filter(p => p.category === 'Documentary Edit').slice(0, 3);
  const motionGraphics = projects.filter(p => p.category === 'Motion Graphic Edit').slice(0, 3);

  const categories = ['Motion Graphic Edit', 'Documentary Edit'];

  // NEW: Lock background scrolling when modal is open
  useEffect(() => {
    if (expandedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expandedProject]);

  // === 1. HELPER: EXTRACT VIDEO ID ===
  const getVideoId = (url) => {
    if (!url) return null;
    if (url.includes('drive.google.com')) return url.split('/d/')[1]?.split('/')[0];
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }
    if (url.includes('instagram.com')) {
      const parts = url.split('?')[0].split('/');
      const typeIndex = parts.findIndex(p => ['p', 'reel', 'tv'].includes(p));
      return typeIndex !== -1 ? parts[typeIndex + 1] : null;
    }
    return null;
  };

  // === 2. HELPER: GENERATE THUMBNAIL URL ===
  const getThumbnail = (project) => {
    const id = getVideoId(project.videoUrl);
    if (project.type === 'youtube' && id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    if (project.type === 'drive' && id) return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    if (project.image && project.image.trim() !== "") return project.image;
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
  };

  // === 3. HELPER: GENERATE EMBED URL ===
  const getEmbedUrl = (url, type) => {
    if (!url) return '';
    const id = getVideoId(url);
    if (type === 'youtube' && id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    if (type === 'drive' && id) return `https://drive.google.com/file/d/${id}/preview`;
    if (type === 'instagram' && id) return `https://www.instagram.com/p/${id}/embed/`;
    return url;
  };

  // The highly stylized Video Card component
  const VideoCard = ({ project, index, gridClass }) => {
    const thumbnailSrc = getThumbnail(project);
    
    // Check if this is the big featured video (index 0)
    const isFeatured = index === 0;

    return (
      <motion.div
        layout
        // ANIMATION CHANGE: Big video comes from left (-100), others come from right (100)
        initial={{ opacity: 0, scale: 0.95, x: isFeatured ? -100 : 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        exit={{ opacity: 0, scale: 0.95, x: isFeatured ? -50 : 50 }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
        className={`group cursor-pointer block ${gridClass}`}
        // CHANGED: Triggers modal instead of inline play
        onClick={() => setExpandedProject(project)} 
      >
        <div
          className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl bg-[#0a0a0a] transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-1"
        >
          {/* Dynamic Image Fill */}
          <img
            src={thumbnailSrc}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
            }}
          />
          
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

          {/* Play Button - Frosted Glass Pill */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-all duration-500">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1 fill-current" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };


  return (
    <>
      <section id="work" className="pt-0 pb-20 px-4 relative overflow-hidden">
        {/* ADDED HERO BACKGROUND GLOWS HERE */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <span className="block font-mono text-[10px] tracking-[0.4em] text-cyan-500/60 uppercase mb-4">
  Selected Projects — 01
</span>
          <h2 className="font-satoshi text-5xl md:text-7xl  font-extrabold text-white mb-10 text-center tracking-tighter leading-none">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Featured Work</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full text-[14px] sm:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md border ${
                  activeTab === cat
                    ? 'bg-white text-black border-cyan-400  shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="min-h-[600px]">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
              >
                {/* ASYMMETRIC BENTO GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 sm:gap-6 lg:h-[600px]">
                  {(activeTab === 'Documentary Edit' ? documentaries : motionGraphics).map((project, index) => {
                    
                    let gridClass = "";
                    if (index === 0) {
                      gridClass = "lg:col-span-2 lg:row-span-2 min-h-[350px] lg:min-h-0"; // Massive Hero
                    } else {
                      gridClass = "lg:col-span-1 lg:row-span-1 min-h-[250px] lg:min-h-0"; // Stacked side cards
                    }

                    return (
                      <VideoCard 
                        key={project.id} 
                        project={project} 
                        index={index} 
                        gridClass={gridClass} 
                      />
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- SMART FULLSCREEN MODAL --- */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center  backdrop-blur-md p-4 sm:p-6"
            onClick={() => setExpandedProject(null)} 
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 z-50"
              onClick={() => setExpandedProject(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* DYNAMIC CONTAINER SIZING 
              Checks the JSON for "isVertical: true" 
            */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative bg-[#111] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] border border-white/10 ${
                expandedProject.isVertical 
                  ? "w-full max-w-[500px] h-[85vh] max-h-[900px]" // Vertical / Phone format
                  : "w-full max-w-7xl aspect-video" // Horizontal / Widescreen format
              }`}
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Loading Spinner underneath iframe */}
              <div className="absolute inset-0 animate-pulse bg-white/5 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              </div>

              <iframe
                src={getEmbedUrl(expandedProject.videoUrl, expandedProject.type)}
                title={expandedProject.title}
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
}