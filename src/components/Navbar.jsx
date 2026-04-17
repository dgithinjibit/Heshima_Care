import { LayoutDashboard, MapPinned, BarChart3, Shield, History } from 'lucide-react';

export default function Navbar() {
  return (
    <aside className="w-[280px] bg-brand-sidebar h-screen sticky top-0 flex flex-col p-6 text-white shrink-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-accent-red to-brand-accent-green" />
        <span className="text-xl font-extrabold tracking-tighter">
          Heshima<span className="opacity-70 font-medium">Hub</span>
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <NavItem icon={LayoutDashboard} label="System Overview" active href="#" />
        <NavItem icon={MapPinned} label="Distribution Engine" href="#locator" />
        <NavItem icon={BarChart3} label="Demand Heatmap" href="#impact" />
        <NavItem icon={Shield} label="Secure Core Access" href="#security" />
        <NavItem icon={History} label="Supply Chain Logs" href="#" />
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-[10px] text-brand-text-light uppercase font-bold tracking-widest leading-relaxed">
          VERSION 4.0.2-STABLE<br />
          OPERATIONAL SECURE CORE
        </p>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active, href }) {
  return (
    <a 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-slate-800 text-white shadow-sm' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
      {label}
    </a>
  );
}
