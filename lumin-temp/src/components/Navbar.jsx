import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // This custom "spring" easing makes the hover feel bouncy like Apple's UI
  const springTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]";

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      {/* Container: Glass Effect with subtle shadow */}
      <div className="w-full max-w-5xl bg-[#0a1515]/70 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-5 flex justify-between items-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* LOGO */}
        <Link to="/" className={`flex items-center gap-3 group ${springTransition} hover:scale-110`}>
          <div className="w-2 h-2 rounded-full bg-cyan-neon shadow-[0_0_8px_#00f0ff] group-hover:shadow-[0_0_20px_#00f0ff] transition-all"></div>
          <span className="text-xl font-bold tracking-widest text-white group-hover:text-cyan-neon transition-colors">GOPAL RAWAT</span>
        </Link>

        {/* DESKTOP LINKS - The "Apple Dock" Effect */}
        <div className="hidden md:flex items-center gap-12">
          {['Work', 'Services', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white ${springTransition} hover:scale-125 hover:-translate-y-1`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* 'LET'S TALK' BUTTON - Bouncy & Glowing */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className={`px-8 py-3 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white inline-block bg-white/5 hover:bg-cyan-neon hover:text-black hover:border-cyan-neon hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] ${springTransition} hover:scale-110 active:scale-95`}
          >
            Let's Talk
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden text-white ${springTransition} hover:scale-110 hover:rotate-90`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="absolute top-28 left-6 right-6 bg-[#0a1515]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 shadow-2xl origin-top">
          {['Work', 'Services', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)} 
              className="text-xl font-medium text-gray-200 py-3 border-b border-white/5 last:border-0 hover:text-cyan-neon hover:pl-4 transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}