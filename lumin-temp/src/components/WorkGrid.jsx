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
    
    // Google Drive
    if (url.includes('drive.google.com')) {
      return url.split('/d/')[1]?.split('/')[0];
    }
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }

    // Instagram
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

    // YouTube: High Res Thumbnail from the video itself
    if (project.type === 'youtube' && id) {
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }

    // Google Drive: Frame preview (Requires file to be shared "Anyone with link")
    if (project.type === 'drive' && id) {
      return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }

    // Fallback: If no ID found or Instagram, use manual JSON image
    if (project.image && project.image.trim() !== "") {
      return project.image;
    }

    // Ultimate Fallback: Placeholder
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
  };

  // === 3. HELPER: GENERATE EMBED URL ===
  const getEmbedUrl = (url, type) => {
    if (!url) return '';
    const id = getVideoId(url);

    if (type === 'youtube' && id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (type === 'drive' && id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    if (type === 'instagram' && id) {
      return `https://www.instagram.com/p/${id}/embed/`;
    }
    return url;
  };

  const VideoCard = ({ project, index }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailSrc = getThumbnail(project);

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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img
                src={thumbnailSrc}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
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
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 text-center">
          My Featured Work
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
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
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeTab === 'Documentary Edit' ? documentaries : motionGraphics).map((project, index) => (
                  <VideoCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}