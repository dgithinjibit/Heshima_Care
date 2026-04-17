import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Globe, Activity } from 'lucide-react';

export default function StatsSection({ mode = 'care' }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  if (!stats) return null;

  const isCare = mode === 'care';

  const statItems = [
    { 
      label: isCare ? 'Care Packages Sent' : 'Total Distributions', 
      value: stats.totalDistributions.toLocaleString(), 
      icon: TrendingUp, 
      color: isCare ? 'text-care-rose' : 'text-brand-accent-red', 
      bg: isCare ? 'bg-rose-50' : 'bg-red-50' 
    },
    { 
      label: isCare ? 'Lives Touched' : 'Secured Users', 
      value: stats.activeUsers.toLocaleString(), 
      icon: Users, 
      color: isCare ? 'text-teal-600' : 'text-brand-accent-green', 
      bg: isCare ? 'bg-teal-50' : 'bg-green-50' 
    },
    { 
      label: isCare ? 'Local Communities' : 'County Nodes', 
      value: stats.countiesCovered, 
      icon: Globe, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: isCare ? 'Happiness Score' : 'Efficiency Index', 
      value: (stats.impactFactor * 100).toFixed(0) + '%', 
      icon: Activity, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50' 
    },
  ];

  return (
    <section id="impact" className={isCare ? "care-panel" : "panel"}>
      <div className="mb-12">
        <h2 className={`font-bold tracking-tight mb-2 ${isCare ? 'text-4xl font-display italic text-brand-sidebar' : 'text-xl text-brand-sidebar'}`}>
          {isCare ? 'Our Shared Journey' : 'Telemetry & Metrics'}
        </h2>
        <p className={`text-brand-text-light font-medium uppercase tracking-wider ${isCare ? 'text-sm font-sans lowercase italic opacity-70' : 'text-xs uppercase'}`}>
          {isCare ? 'Every number represents a story of dignity and strength.' : 'National distribution telemetry feed'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group transition-transform hover:-translate-y-1 ${isCare ? '' : 'stat-card hover:shadow-md'}`}
          >
            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm`}>
              <item.icon className={`w-7 h-7 ${item.color}`} />
            </div>
            <p className={`font-bold text-brand-sidebar tracking-tighter mb-2 ${isCare ? 'text-4xl font-display italic' : 'text-2xl'}`}>{item.value}</p>
            <p className={`font-bold text-brand-text-light uppercase tracking-widest ${isCare ? 'text-[10px]' : 'text-[10px]'}`}>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
