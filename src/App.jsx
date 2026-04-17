import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HubLocator from './components/HubLocator.jsx';
import StatsSection from './components/StatsSection.jsx';
import Footer from './components/Footer.jsx';
import SurveillancePanel from './components/SurveillancePanel.jsx';

export default function App() {
  const [mode, setMode] = useState('care');

  const toggleMode = () => setMode(mode === 'care' ? 'admin' : 'care');

  if (mode === 'admin') {
    return (
      <div className="flex h-screen bg-brand-bg font-sans selection:bg-brand-accent-red selection:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-[80px] bg-white border-b border-brand-border px-8 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl font-bold text-brand-text-main tracking-tight">System Overview</h1>
              <p className="text-xs text-brand-text-light font-medium uppercase tracking-wider">Kenyan National Menstrual Health Infrastructure</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleMode}
                className="px-4 py-2 bg-care-rose/10 text-care-rose rounded-full text-xs font-bold uppercase tracking-widest hover:bg-care-rose hover:text-white transition-all"
              >
                Switch to Care View
              </button>
              <div className="px-3 py-1 bg-green-50 text-brand-accent-green rounded-full text-[10px] font-bold border border-green-100 uppercase tracking-widest">
                Encrypted Node Connected
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
              <SurveillancePanel />
              <Hero />
              
              <section id="about" className="panel grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <span className="text-brand-accent-red font-bold text-[10px] uppercase tracking-[0.2em] mb-3 block">The Mission</span>
                  <h2 className="text-2xl font-bold text-brand-text-main tracking-tight leading-tight">
                    Eradicating Period Poverty via Technical Infrastructure
                  </h2>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-brand-text-main leading-relaxed opacity-80">
                  <p>
                    Access to menstrual products is a fundamental human right. Heshima Hub (Respect Hub) bridge the gap between supply and demand by using intelligent location data to ensure no shelf is empty and no girl is left in the shadows.
                  </p>
                  <p>
                    Inspired by global movements but tailored for the unique challenges of the Kenyan landscape—from the streets of Nairobi to the rural heartlands—we provide a unified, dignified, and secure access channel for all.
                  </p>
                </div>
              </section>

              <HubLocator mode="admin" />
              <StatsSection mode="admin" />
              <Footer />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Care Mode UI
  return (
    <div className="min-h-screen bg-care-bg font-sans selection:bg-care-rose selection:text-white pb-20">
      {/* Care Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-care-rose rounded-2xl rotate-12 flex items-center justify-center">
              <span className="text-white font-display text-xl">H</span>
            </div>
            <span className="font-display text-2xl text-brand-sidebar italic">Heshima Care</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#find" className="text-sm font-semibold text-brand-text-main hover:text-care-rose transition-colors">Find Products</a>
            <a href="#wellness" className="text-sm font-semibold text-brand-text-main hover:text-care-rose transition-colors">Wellness</a>
            <a href="#security" className="text-sm font-semibold text-brand-text-main hover:text-care-rose transition-colors">Security</a>
            <button 
              onClick={toggleMode}
              className="px-5 py-2 rounded-full border border-rose-200 text-xs font-bold uppercase tracking-widest text-care-rose hover:bg-rose-50 transition-all"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-24">
        {/* Care Hero */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-care-rose rounded-full text-xs font-bold uppercase tracking-widest w-fit">
              <span className="w-2 h-2 bg-care-rose rounded-full animate-pulse" />
              Empowering Every Choice
            </div>
            <h1 className="text-6xl md:text-7xl font-display italic text-brand-sidebar leading-[1.1]">
              Dignity is a <br/>
              <span className="text-care-rose font-sans font-extrabold not-italic">Universal Right.</span>
            </h1>
            <p className="text-xl text-brand-text-light leading-relaxed max-w-xl">
              Heshima (Respect) is about more than access. It's about a future where every girl in Kenya can pursue her dreams without interruption. Find the support you need, locally and securely.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#find" className="care-btn-primary">Find Nearest Center</a>
              <button className="care-btn-secondary">Learn About Heshima</button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-teal-100 rounded-[3rem] -rotate-3 translate-x-4 translate-y-4 opacity-30" />
            <img 
              src="https://picsum.photos/seed/care/800/800"
              alt="Care"
              className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Localized Care", desc: "Real-time mapping of centers ensuring dignity is always within reach.", bg: "bg-white" },
            { title: "Encrypted Privacy", desc: "Your health data remains your own. We use zero-knowledge profiling to keep you safe.", bg: "bg-rose-50" },
            { title: "Seamless Access", desc: "No red tape. Just simple, direct access to the products you need to thrive.", bg: "bg-white" }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              whileHover={{ y: -10 }}
              className={`${feature.bg} p-10 rounded-[2.5rem] border border-rose-100/50 flex flex-col gap-4 shadow-lg shadow-rose-900/5`}
            >
              <h3 className="text-2xl font-display italic text-brand-sidebar">{feature.title}</h3>
              <p className="text-brand-text-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        <section id="find">
          <HubLocator mode="care" />
        </section>

        <section id="wellness">
          <StatsSection mode="care" />
        </section>

        <section id="security" className="care-panel bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-care-rose/20 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-care-rose rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-display italic mb-6">Privacy is a <br/><span className="text-care-rose not-italic font-sans font-extrabold uppercase tracking-tighter">Sovereign Right.</span></h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
                Heshima Hub uses <strong>Zero-Knowledge Identity Thumbprints</strong>. Your real identity is never stored in the cloud. We generate a unique cryptographic signature on your device that verifies your right to access services without ever knowing who you are.
              </p>
              <ul className="space-y-4">
                {[
                  "No PII (Personally Identifiable Information) stored",
                  "Encrypted local access signatures",
                  "Anonymous supply-chain surveillance",
                  "Blockchain-inspired integrity checks"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-300">
                    <div className="w-1.5 h-1.5 bg-care-rose rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Identity", val: "Thumbprinted" },
                 { label: "Data Route", val: "AES-256" },
                 { label: "Storage", val: "Ephemeral" },
                 { label: "Access", val: "Self-Sovereign" }
               ].map(stat => (
                 <div key={stat.label} className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-white uppercase">{stat.val}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
