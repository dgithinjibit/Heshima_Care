import { motion } from 'motion/react';
import { MapPin, ShieldCheck, Zap, Activity, Info } from 'lucide-react';

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Primary Info Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel lg:col-span-2 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h2 className="text-lg font-bold text-brand-sidebar flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-accent-red" />
            Project Implementation Manifest
          </h2>
          <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest">Doc ID: HU-K-2026</span>
        </div>

        <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          <div>
            <h3 className="text-[10px] font-bold text-brand-accent-red uppercase tracking-widest mb-2">1. Project Vision</h3>
            <p className="text-sm text-brand-text-main leading-relaxed">
              Heshima Hub is a specialized infrastructure project designed to eradicate period poverty across Kenya's 47 counties. By adapting the Scottish 'PickUpMyPeriod' model to the Kenyan landscape, we bridge the gap between resource allocation and local demand through precision profiling.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-brand-accent-red uppercase tracking-widest mb-2">2. Engineering Philosophy</h3>
            <p className="text-sm text-brand-text-main leading-relaxed mb-4">
              The core engine leverages zero-cost abstractions to achieve precision performance. Our architecture prioritizes Decentralized Identity (DID) to allow for secure, anonymous access without central tracking.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-[11px] text-slate-700">
              $ cargo build --release --target=kenya-secure-node
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-brand-accent-red uppercase tracking-widest mb-2">3. End-to-End Encryption (E2EE)</h3>
            <p className="text-sm text-brand-text-main leading-relaxed">
              All telemetry is sealed at the origin using AES-256-GCM. Combined with SHA-256 anonymization, we ensure national-level profiling while maintaining absolute citizen privacy. Visit the <a href="#security" className="text-brand-accent-red font-bold hover:underline">Security Section</a> for architectural logs.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Side Profile / Stats Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <div className="panel flex-1 flex flex-col gap-6">
          <div className="stat-card">
            <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest">National Coverage</span>
            <span className="text-3xl font-bold text-brand-sidebar tracking-tighter">94.2%</span>
            <div className="h-1 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '94.2%' }}
                className="h-full bg-brand-accent-green" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest">Active Nodes</span>
              <span className="text-xl font-bold text-brand-sidebar tracking-tighter">4,120</span>
            </div>
            <div className="stat-card">
              <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest">Avg Latency</span>
              <span className="text-xl font-bold text-brand-sidebar tracking-tighter">12ms</span>
            </div>
          </div>

          <div className="stat-card">
            <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest">Distribution Events (24h)</span>
            <span className="text-xl font-bold text-brand-sidebar tracking-tighter">142,802</span>
          </div>

          <div className="flex-1 min-h-[140px] bg-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
             <img 
                src="https://picsum.photos/seed/kenya-map/400/300" 
                alt="Map" 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-[0.2em] bg-white/80 px-2 py-1 rounded">Regional Hotspots</span>
              </div>
              {/* Pulsing Dots */}
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-brand-accent-red rounded-full animate-ping" />
              <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-brand-accent-red rounded-full animate-ping [animation-delay:0.5s]" />
              <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-brand-accent-red rounded-full animate-ping [animation-delay:1s]" />
          </div>
          
          <p className="text-[10px] text-center text-brand-text-light font-medium italic">
            Real-time demand syncing via Secure Service Tunnel
          </p>
        </div>
      </motion.div>
    </div>
  );
}
