import { useState } from 'react';
import projects from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

export default function WorkGrid() {
  const [activeTab, setActiveTab] = useState('Motion Graphic Edit');

  const documentaries = projects.filter(p => p.category === 'Documentary Edit').slice(0, 3);
  const motionGraphics = projects.filter(p => p.category === 'Motion Graphic Edit').slice(0, 3);

  const categories = ['Motion Graphic Edit', 'Documentary Edit'];

  // === 1. HELPER: EXTRACT VIDEO ID ===
  const getVideoId = (url) => {
    if (!url) return null;
    if (url.includes('drive.google.com')) {
      // Extract ID between /d/ and /preview (or /view)
      return url.split('/d/')[1]?.split('/')[0];
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
      if (url.includes('youtu.be/')) return url.split('youtu.be/')[1];
    }
    return null;
  };

  // === 2. HELPER: GENERATE THUMBNAIL URL ===
  const getThumbnail = (url, type) => {
    const id = getVideoId(url);
    if (!id) return ''; // Fallback or empty

    if (type === 'youtube') {
      // YouTube High Quality Thumbnail
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`; 
    }
    if (type === 'drive') {
      // Google Drive Thumbnail Endpoint (Works for public files)
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`; 
    }
    return '';
  };

  // === 3. HELPER: GENERATE EMBED URL ===
  const getEmbedUrl = (url, type) => {
    const id = getVideoId(url);
    if (!id) return url;

    if (type === 'youtube') {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (type === 'drive') {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url;
  };

  const VideoCard = ({ project, index }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Automatically get the thumbnail
    const thumbnailSrc = getThumbnail(project.videoUrl, project.type);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -100 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true, amount: 0.3 }} 
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
        className="group cursor-pointer block"
      >
        <div 
          className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black transition-all group-hover:border-cyan-400/50"
          onClick={() => setIsPlaying(true)}
        >
          {isPlaying ? (
            <iframe
              src={getEmbedUrl(project.videoUrl, project.type)}
              title={project.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              {/* AUTOMATIC THUMBNAIL IMAGE */}
              <img 
                src={thumbnailSrc} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                // Fallback for broken thumbnails (optional: nice to have)
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"; // Fallback placeholder
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-300">
                  <Play className="w-6 h-6 text-white group-hover:text-black fill-current" />
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="work" className="py-8 px-4 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center">
          My Featured Work
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md border hover:scale-95 ${
                activeTab === cat 
                  ? 'bg-cyan-400/20 border-cyan-400/80 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="space-y-8">
          {/* Documentary Section */}
          {activeTab === 'Documentary Edit' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='wait'>
                  {documentaries.map((project, index) => (
                    <VideoCard key={project.id} project={project} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Motion Graphics Section */}
          {activeTab === 'Motion Graphic Edit' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='wait'>
                  {motionGraphics.map((project, index) => (
                    <VideoCard key={project.id} project={project} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}