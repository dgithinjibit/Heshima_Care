import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Navigation, LocateFixed, ShieldCheck, Heart, LogIn, LogOut, User as UserIcon, AlertTriangle, Wifi, WifiOff, Smartphone, Clock, X } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { PrivacyService } from '../services/privacyService.js';
import SMSModal from './SMSModal.jsx';

export default function HubLocator({ mode = 'care' }) {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [identityThumbprint, setIdentityThumbprint] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastCode, setLastCode] = useState(null);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Generate anonymous identity for secure session
        const thumbprint = await PrivacyService.generateIdentityThumbprint();
        setIdentityThumbprint(thumbprint);
      }
    });

    // Proactive Geolocation Attempt
    if ("geolocation" in navigator && !userLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      }, (err) => console.log("Proactive location failed, awaiting user gesture."));
    }

    // Hubs Listener
    fetch('/api/hubs')
      .then(res => res.json())
      .then(data => {
        setHubs(data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching hubs:', err));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      unsubscribe();
    };
  }, []);

  // Update distances when location or hubs change
  useEffect(() => {
    if (userLocation && hubs.length > 0) {
      const enrichedHubs = hubs.map(hub => ({
        ...hub,
        distance: calculateDistance(userLocation.lat, userLocation.lng, hub.lat, hub.lng)
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      // Only set if changed to avoid loops
      if (JSON.stringify(enrichedHubs) !== JSON.stringify(hubs)) {
        setHubs(enrichedHubs);
      }
    }
  }, [userLocation, hubs.length]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const requestLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Enrich hubs with distance
        const enrichedHubs = hubs.map(hub => ({
          ...hub,
          distance: calculateDistance(latitude, longitude, hub.lat, hub.lng)
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setHubs(enrichedHubs);
        setIsLocating(false);
      }, (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hub.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCare = mode === 'care';

  return (
    <div className="flex flex-col gap-12">
      {/* Offline Banner */}
      {!isOnline && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-indigo-600 text-white px-8 py-2 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full"
        >
          <WifiOff className="w-3 h-3" />
          Offline Mode: Access Codes & Locations are Cached for Dignity
        </motion.div>
      )}

      {/* Authentication & Identity Panel */}
      <section className={isCare ? "care-panel flex flex-col md:flex-row items-center justify-between gap-6" : "panel flex flex-col md:flex-row items-center justify-between gap-6"}>
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${currentUser ? 'bg-care-rose/10' : 'bg-slate-100'}`}>
             {currentUser ? <ShieldCheck className="w-8 h-8 text-care-rose" /> : <UserIcon className="w-8 h-8 text-brand-text-light" />}
          </div>
          <div>
            <h3 className={`font-bold ${isCare ? 'text-2xl font-display italic' : 'text-brand-sidebar'}`}>
              {currentUser ? `Hello, ${currentUser.displayName?.split(' ')[0]}` : 'Anonymous Access'}
            </h3>
            <p className="text-[10px] text-brand-text-light uppercase font-bold tracking-widest">
              Digital Identity Status: {currentUser ? 'Hardened & Synced' : 'Offline / Private'}
            </p>
            {identityThumbprint && (
              <p className="text-[9px] font-mono text-care-rose mt-1 opacity-60">Session ID: {identityThumbprint.substring(0, 16)}...</p>
            )}
          </div>
        </div>
        <div>
          {currentUser ? (
             <button 
              onClick={handleLogout}
              className="px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="care-btn-primary flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In Securely
            </button>
          )}
        </div>
      </section>

      {/* Hub Locator Panel */}
      <section id="locator" className={isCare ? "care-panel" : "panel"}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-rose-50">
          <div>
            <h2 className={`font-bold tracking-tight mb-2 ${isCare ? 'text-4xl font-display italic text-brand-sidebar' : 'text-xl text-brand-sidebar'}`}>
              Find Near You
            </h2>
            <p className="text-xs text-brand-text-light font-medium uppercase tracking-wider">Localized inventory synchronization</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={requestLocation}
              disabled={isLocating}
              className={`w-full sm:w-auto px-6 py-3 rounded-full border transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest active:scale-95 ${userLocation ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-900/20' : 'bg-white text-care-rose border-rose-200 hover:bg-rose-50'}`}
            >
              <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              {userLocation ? 'Location Found' : 'Find My Location'}
            </button>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-light w-4 h-4" />
              <input 
                type="text"
                placeholder="Search by center or county..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-rose-100 text-sm focus:outline-none focus:ring-2 focus:ring-care-rose/20 transition-all bg-slate-50/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse text-center">
             {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-50 rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredHubs.map((hub) => (
                <motion.div 
                  layout
                  key={hub.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`${isCare ? 'bg-white border-2 border-rose-50 p-8 rounded-[2.5rem] hover:border-care-petal hover:shadow-2xl hover:shadow-care-rose/10 transition-all transition-transform hover:-translate-y-2' : 'stat-card group hover:border-brand-accent-red'} group relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`${isCare ? 'bg-rose-50 p-3 rounded-2xl' : 'bg-brand-bg p-2 rounded-md'} group-hover:scale-110 transition-transform`}>
                      <MapPin className={`w-5 h-5 ${isCare ? 'text-care-rose' : 'text-brand-text-light'}`} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        hub.stockLevel === 'High' ? 'bg-teal-50 text-teal-700' : 
                        hub.stockLevel === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-rose-50 text-care-rose'
                      }`}>
                        {hub.stockLevel} Available
                      </span>
                      {hub.distance !== undefined && (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {hub.distance.toFixed(1)} km
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={`${isCare ? 'text-2xl font-display italic text-brand-sidebar mb-1' : 'font-bold text-sm text-brand-text-main mb-0.5'} relative z-10`}>{hub.name}</h3>
                  <p className={`${isCare ? 'text-sm text-slate-400 font-bold uppercase tracking-widest mb-6' : 'text-[11px] text-brand-text-light font-bold uppercase tracking-wider mb-4'} relative z-10`}>
                    {hub.county}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {hub.products.map(p => (
                      <span key={p} className={`${isCare ? 'text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full' : 'text-[9px] font-bold text-brand-text-light border border-brand-border px-1.5 py-0.5 rounded leading-none'}`}>
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 relative z-10">
                    <button 
                      onClick={async () => {
                        const sig = await PrivacyService.generatePickupSignature(hub.id);
                        setLastCode({ hub: hub.name, code: sig });
                      }}
                      className={`${isCare ? 'care-btn-secondary w-full py-3 h-auto justify-center' : 'flex items-center justify-center w-full gap-2 text-[10px] uppercase font-bold text-brand-sidebar bg-brand-bg hover:bg-brand-sidebar hover:text-white py-2.5 rounded transition-all'} flex items-center gap-2`}
                    >
                      <Navigation className="w-4 h-4" />
                      {isCare ? 'Get Support Here' : 'Request Access Signature'}
                    </button>

                    <button 
                      onClick={async () => {
                        const sig = await PrivacyService.generatePickupSignature(hub.id);
                        setLastCode({ hub: hub.name, code: sig });
                        setIsSMSModalOpen(true);
                      }}
                      className="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-2 hover:text-care-rose transition-colors"
                    >
                      <Smartphone className="w-3 h-3" />
                      Receive via SMS
                    </button>
                    
                    {isCare && (
                      <button 
                        onClick={async () => {
                          const sealed = await PrivacyService.sealScarcityReport(hub.id, "Out of Stock");
                          // Send to surveillance
                          await fetch('/api/report-scarcity', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ payload: sealed })
                          });
                          alert("Thank you. An anonymous alert has been sent to the infrastructure team.");
                        }}
                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-care-rose transition-colors flex items-center justify-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        Report Stock Issue
                      </button>
                    )}
                  </div>
                  
                  {/* Soft Background Pulse */}
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-rose-50/30 rounded-full group-hover:scale-[5] transition-transform duration-1000 pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Offline Access Wallet */}
      <AnimatePresence>
        {lastCode && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-40"
          >
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-care-rose" />
               <button 
                 onClick={() => setLastCode(null)}
                 className="absolute top-4 right-4 text-slate-500 hover:text-white"
               >
                 <X className="w-4 h-4" />
               </button>

               <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-care-rose" />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Your Access Code</h4>
                    <p className="text-sm font-bold text-white mt-1">{lastCode.hub}</p>
                 </div>
               </div>

               <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                  <span className="text-3xl font-mono text-white tracking-[0.2em]">{lastCode.code}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(lastCode.code);
                    }}
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white"
                  >
                    Copy
                  </button>
               </div>
               <p className="text-[9px] text-slate-600 mt-4 text-center italic">Show this code at the distribution point</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <SMSModal 
        isOpen={isSMSModalOpen}
        onClose={() => setIsSMSModalOpen(false)}
        code={lastCode?.code || "---"}
      />
    </div>
  );
}
