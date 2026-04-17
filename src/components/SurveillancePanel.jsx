import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Radio, Wifi, Zap, AlertTriangle, Cpu } from 'lucide-react';

export default function SurveillancePanel() {
  const [data, setData] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/surveillance')
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error('Surveillance link failed:', err));
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setPulse(p => p + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return (
    <div className="panel bg-slate-900 border-slate-800 h-64 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-500">
        <Activity className="w-8 h-8 animate-pulse" />
        <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Initializing Surveillance Node...</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Network Health Column */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Live Payload Stream</span>
             </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
              <Radio className="w-5 h-5 text-care-rose" />
              Infrastructure Surveillance Core
            </h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Real-time Heuristic Demand Mapping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
               <div className="flex items-center gap-3 text-slate-400 mb-3">
                 <Cpu className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Active Nodes</span>
               </div>
               <div className="text-3xl font-mono text-white">{data.activeNodes}</div>
               <div className="h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: '100%' }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                   className="h-full bg-care-rose" 
                  />
               </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
               <div className="flex items-center gap-3 text-slate-400 mb-3">
                 <Wifi className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Node Latency</span>
               </div>
               <div className="text-3xl font-mono text-green-400">{data.networkLatencyAvg}</div>
               <p className="text-[9px] text-slate-500 mt-2">Optimal range established</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
               <div className="flex items-center gap-3 text-slate-400 mb-3">
                 <Zap className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Comm Bandwidth</span>
               </div>
               <div className="text-3xl font-mono text-blue-400">{data.bandwidthAllocation}</div>
               <p className="text-[9px] text-slate-500 mt-2">Encrypted overhead: 12%</p>
            </div>
          </div>

          {/* ISP Throughput Monitoring */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">ISP Telemetry (Carrier Response)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {Object.entries(data.ispMetrics).map(([name, metrics]) => {
                 return (
                   <div key={name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase">{name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${metrics.stability === 'Optimal' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          {metrics.stability}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-400">{metrics.throughput}</div>
                   </div>
                 );
               })}
            </div>
          </div>
        </section>
      </div>

      {/* Anomalies & Alerts Column */}
      <div className="space-y-8">
        <section className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-inner overflow-y-auto max-h-[500px]">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Heuristic Anomalies
              </h3>
              <span className="text-[9px] font-mono text-slate-600">SEQ_{pulse}</span>
           </div>

           <div className="flex flex-col gap-4">
              {data.anomalyDetection.map((anomaly, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={anomaly.id} 
                  className="bg-slate-900 border-l-2 border-slate-700 p-4 rounded-r-lg group hover:border-care-rose transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${anomaly.severity === 'High' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                        {anomaly.severity}
                     </span>
                     <span className="text-[9px] font-mono text-slate-500">{new Date(anomaly.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-care-rose transition-colors">{anomaly.type}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Detected target: {anomaly.target}</div>
                </motion.div>
              ))}

              {/* Simulated Log Feed */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                 <div className="text-[8px] font-mono text-slate-600">&gt; VERIFYING ACCESS SIGNATURES... OK</div>
                 <div className="text-[8px] font-mono text-slate-600">&gt; ROTATING DECENTRALIZED KEYS... OK</div>
                 <div className="text-[8px] font-mono text-slate-600">&gt; SIGNAL ENCAPSULATION COMPLETE</div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
