"use client";

import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }: { symbol?: string }) {
  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
       <AdvancedRealTimeChart 
         theme="dark" 
         autosize
         symbol={symbol}
         interval="D"
         timezone="Etc/UTC"
         style="1"
         locale="en"
         toolbar_bg="#f1f3f6"
         enable_publishing={false}
         hide_side_toolbar={false}
         allow_symbol_change={true}
       />
       {/* Overlay to prevent interaction if needed, or style tweaks */}
       <div className="absolute top-0 right-0 p-2 z-10 opacity-50 hover:opacity-100 transition-opacity">
          {/* Custom controls could go here */}
       </div>
    </div>
  );
}
