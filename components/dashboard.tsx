"use client";

import { useState } from "react";
import SignalFeed from "@/components/signal-feed";
import ChartWrapper from "@/components/chart-wrapper";
import { TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:BTCUSDT");

  const handleSignalClick = (symbol: string) => {
    // Ensure format matches TradingView (e.g., add exchange if needed, or just send symbol)
    // For simplicity, we assume symbol is like "BTCUSDT" and we prepend BINANCE: if missing
    // or just pass as is if the widget handles it.
    const cleanSymbol = symbol.toUpperCase();
    const formatted = cleanSymbol.includes(":") ? cleanSymbol : `BINANCE:${cleanSymbol}`;
    setSelectedSymbol(formatted);
  };

  return (
    <div id="signals" className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Signals */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-green-500" /> Live Feed
          </h2>
          <span className="text-xs text-green-500 font-mono animate-pulse">
            ● LIVE
          </span>
        </div>
        <SignalFeed onSelectSignal={handleSignalClick} />
      </div>

      {/* Right Column: Chart */}
      <div className="lg:col-span-2">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Market Analysis</h2>
            <div className="text-sm font-mono text-gray-400 bg-white/5 px-3 py-1 rounded">
              {selectedSymbol}
            </div>
          </div>
          <ChartWrapper symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}
