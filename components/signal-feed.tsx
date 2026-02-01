"use client";

import { useEffect, useState } from "react";
import { getSignals } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type Signal = {
  id: number;
  symbol: string;
  type: string;
  entryPrice: number | null;
  targetPrice: number | null;
  stopLoss: number | null;
  status: string;
  description: string | null;
  createdAt: Date;
};

export default function SignalFeed({ onSelectSignal }: { onSelectSignal?: (symbol: string) => void }) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSignals = async () => {
    try {
      const data = await getSignals();
      setSignals(data); // In a real app, optimize to only update diffs
    } catch (error) {
      console.error("Failed to fetch signals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && signals.length === 0) {
    return <div className="text-center text-gray-500 animate-pulse">Loading signals...</div>;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {signals.map((signal) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelectSignal?.(signal.symbol)}
            className="cursor-pointer"
          >
            <Card className={`border-l-4 overflow-hidden relative group hover:scale-[1.02] transition-transform duration-200 ${
              signal.type === 'BUY' ? 'border-l-green-500' : 'border-l-red-500'
            }`}>
              {/* Glow Effect */}
              <div className={`absolute -left-4 top-0 bottom-0 w-1 blur-lg opacity-50 bg-gradient-to-b ${
                signal.type === 'BUY' ? 'from-green-400 to-transparent' : 'from-red-400 to-transparent'
              }`} />

              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white tracking-wide">{signal.symbol}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      signal.type === 'BUY' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                    }`}>
                      {signal.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date(signal.createdAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm mt-3">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase">Entry</span>
                    <span className="font-mono text-white">{signal.entryPrice || 'Market'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase">Target</span>
                    <span className="font-mono text-green-400">{signal.targetPrice || '-'}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-gray-500 text-xs uppercase">Stop Loss</span>
                    <span className="font-mono text-red-400">{signal.stopLoss || '-'}</span>
                  </div>
                </div>

                {signal.status !== 'OPEN' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center font-bold text-lg uppercase tracking-widest text-white/50 border border-white/5">
                    {signal.status}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
