import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, CheckCircle } from 'lucide-react';

export default function SMSModal({ isOpen, onClose, code }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!phoneNumber) return;
    setLoading(true);
    // Simulate SMS Gateway Latency
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setPhoneNumber('');
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <div className="space-y-6 relative z-10">
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-care-rose" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900">SMS Delivery Fallback</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    We'll send the Access Code <span className="font-mono font-bold text-slate-900">{code}</span> to your phone for offline reference.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input 
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-care-rose/20 focus:bg-white p-4 rounded-xl text-slate-900 font-bold outline-none transition-all"
                  />
                </div>

                <button 
                  onClick={handleSend}
                  disabled={loading || !phoneNumber}
                  className="w-full care-btn-primary flex items-center justify-center gap-2 py-4 h-auto disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Dispatch Code
                    </>
                  )}
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Message Dispatched</h3>
                  <p className="text-sm text-slate-500 mt-2">Code sent to {phoneNumber}. Valid for 60 minutes.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
