"use client";

import dynamic from "next/dynamic";

const TradingViewWidget = dynamic(
  () => import("@/components/trading-chart"),
  { ssr: false }
);

export default function ChartWrapper({ symbol }: { symbol?: string }) {
  return <TradingViewWidget symbol={symbol} />;
}
