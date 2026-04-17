import { Heart, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-care-rose rounded-2xl rotate-12 flex items-center justify-center">
                <span className="text-white font-display text-2xl">H</span>
              </div>
              <span className="font-display text-3xl italic text-brand-sidebar">Heshima Hub</span>
            </div>
            <p className="text-brand-text-light max-w-sm leading-relaxed mb-10 text-lg">
              Empowering dignity through secure, accessible menstrual health infrastructure. Kenyan-led, globally inspired.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, color: 'hover:text-sky-500' },
                { icon: Github, color: 'hover:text-slate-900' },
                { icon: Mail, color: 'hover:text-care-rose' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`w-12 h-12 bg-slate-50 text-slate-400 ${social.color} hover:bg-white hover:shadow-xl hover:shadow-rose-900/5 rounded-2xl flex items-center justify-center transition-all`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display italic text-xl text-brand-sidebar mb-8">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#find" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Find Centers</a></li>
              <li><a href="#wellness" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Impact Stats</a></li>
              <li><a href="#security" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Privacy Policy</a></li>
              <li><a href="#about" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Our Mission</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display italic text-xl text-brand-sidebar mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Health Guides</a></li>
              <li><a href="#" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Legal Identity</a></li>
              <li><a href="#" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">API for Partners</a></li>
              <li><a href="#" className="text-brand-text-light hover:text-care-rose transition-colors font-semibold">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-rose-50 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Heshima Hub. Built with dignity in Nairobi.
          </p>
          <div className="flex gap-10">
            <a href="#security" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-care-rose transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-care-rose transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-care-rose transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
