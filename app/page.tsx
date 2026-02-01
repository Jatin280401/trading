import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Signals Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Trade Smarter <br/> Not Harder
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Get instant buy/sell signals from professional traders. Real-time data, 
            analytics, and community insights directly to your dashboard.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
             <Link href="#signals">
              <Button size="lg" variant="neon" className="font-bold text-base">
                View Signals <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
             </Link>
             <Button size="lg" variant="outline" className="font-bold text-base bg-white/5 border-white/10 hover:bg-white/10">
               Learn More <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
          </div>
        </div>
      </section>

      {/* Main Content Info */}
      <Dashboard />
    </div>
  );
}
