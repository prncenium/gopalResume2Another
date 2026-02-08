import { motion } from 'framer-motion';
import { Film, Zap, Palette, Speaker } from 'lucide-react';

export default function About() {
  
  const services = [
    {
      id: 1,
      title: "Video Editing",
      desc: "Transforming raw footage into a cohesive narrative. I handle pacing, continuity, and storytelling to keep your audience engaged from start to finish.",
      icon: <Film className="w-8 h-8 text-cyan-400" />
    },
    {
      id: 2,
      title: "Motion Graphics",
      desc: "Adding dynamic visual layers to your content. From animated titles to complex VFX, I create eye-catching elements that elevate your brand identity.",
      icon: <Zap className="w-8 h-8 text-cyan-400" />
    },
    {
      id: 3,
      title: "Color Grading",
      desc: "Setting the mood and tone. I enhance visuals using industry-standard grading techniques to give your video a cinematic, professional look.",
      icon: <Palette className="w-8 h-8 text-cyan-400" />
    },
    {
      id: 4,
      title: "Sound Design",
      desc: "Immersive audio engineering. I balance dialogue, add impactful sound effects, and sync music perfectly to drive the emotional impact of your story.",
      icon: <Speaker className="w-8 h-8 text-cyan-400" />
    }
  ];

  // Shared Glass Style Class
  const glassCardClass = "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]";

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* === SECTION 1: ABOUT ME === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              About Me
            </h2>
            <h3 className="text-2xl text-cyan-400 mb-6 font-medium tracking-wide">
              Transforming Ideas into Cinematic Reality
            </h3>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
              <p>
                With over <span className="text-white font-semibold">2 years</span> of experience in the fast-paced world of video production, 
                I've honed my skills in storytelling, pacing, and visual effects to deliver 
                high-impact videos that resonate with audiences.
              </p>
              <p>
                My passion is to find the hidden narrative in every project and bring it 
                to life with precision and creativity. From corporate brand films to 
                dynamic social media content, I am dedicated to excellence.
              </p>
            </div>
          </motion.div>

          {/* Right Card: 2+ Years Experience */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              // === MAGNIFY EFFECT ===
              whileHover={{ scale: 1.05 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-default ${glassCardClass} hover:border-cyan-400/30 hover:bg-white/10 transition-colors duration-300`}
            >
              <span className="block text-8xl font-display font-bold text-white mb-4 group-hover:text-cyan-neon transition-colors duration-300 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                2+
              </span>
              <span className="text-gray-400 tracking-[0.2em] uppercase text-sm font-bold group-hover:text-white transition-colors">
                Years of Experience
              </span>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-cyan-400/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
          </motion.div>
        </div>


        {/* === SECTION 2: SERVICES WE PROVIDE === */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Services I Provide
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            A comprehensive suite of post-production services designed to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.9 }}
              
              // === MAGNIFY EFFECT ===
              whileHover={{ scale: 1.05 }}
              
              // Glass Card Styling with Hover Gradient
              className={`group relative rounded-2xl p-8 cursor-default ${glassCardClass} hover:bg-gradient-to-br hover:from-white/10 hover:to-transparent hover:border-cyan-400/40`}
            >
              <div className="flex items-start gap-6">
                {/* Icon Container */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 transition-colors duration-300 shadow-lg">
                  {service.icon}
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-cyan-neon transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-200 font-light transition-colors">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}