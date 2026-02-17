import { Instagram, MessageCircle, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 flex justify-center relative overflow-hidden text-center">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Main Title Area */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Let's Create Together
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Have a project in mind or just want to chat about video? I'd love to hear from you. 
            Reach out and let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* === MAIN CTA BUTTON === */}
        <div className="mb-16">
          <a 
            href="https://wa.me/" // Updated with your number
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xl tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            TEXT ME
          </a>
        </div>

        {/* === SOCIAL LINKS (WhatsApp & Instagram) === */}
        <div className="flex justify-center items-center gap-10 text-gray-400">
          
          {/* WhatsApp */}
          <a 
            href="https://wa.me/919599357334" // Updated with your number
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <MessageCircle size={24} className="group-hover:text-green-500 transition-colors" />
            <span className="text-lg font-medium">WhatsApp</span>
          </a>

          {/* LinkedIn */}
<a 
  href="https://www.linkedin.com/in/laxman-mahato-647190190?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:text-white transition-colors group"
>
  <Linkedin size={24} className="group-hover:text-blue-500 transition-colors" />
  <span className="text-lg font-medium">LinkedIn</span>
</a>


        </div>

      </div>
    </section>
  );
}