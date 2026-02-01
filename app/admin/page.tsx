import { getSignals, closeSignal, deleteSignal, createSignal } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

export default async function AdminPage() {
  const signals = await getSignals();

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Signal Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Post New Signal</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createSignal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input 
                  id="symbol" 
                  name="symbol" 
                  placeholder="BTCUSDT" 
                  required 
                  className="uppercase" 
                  list="trading-symbols"
                />
                <datalist id="trading-symbols">
                  {/* Crypto */}
                  <option value="BINANCE:BTCUSDT" />
                  <option value="BINANCE:ETHUSDT" />
                  <option value="BINANCE:SOLUSDT" />
                  <option value="BINANCE:XRPUSDT" />
                  <option value="BINANCE:ADAUSDT" />
                  
                  {/* Commodities / Forex */}
                  <option value="OANDA:XAUUSD" label="Gold Spot" />
                  <option value="MCX:GOLD" label="Gold Future (India)" />
                  <option value="TVC:USOIL" label="Crude Oil" />
                  <option value="TVC:SILVER" />
                  
                  {/* Indian Stocks (NSE) */}
                  <option value="NSE:RELIANCE" />
                  <option value="NSE:TCS" />
                  <option value="NSE:HDFCBANK" />
                  <option value="NSE:INFY" />
                  <option value="NSE:ICICIBANK" />
                  <option value="NSE:SBIN" />
                  <option value="NSE:BHARTIARTL" />
                  <option value="NSE:ITC" />
                  <option value="NSE:KOTAKBANK" />
                  <option value="NSE:LT" />
                  <option value="NSE:AXISBANK" />
                  <option value="NSE:TATAMOTORS" />
                  <option value="NSE:MARUTI" />
                  <option value="NSE:ULTRACEMCO" />
                  <option value="NSE:ASIANPAINT" />
                  <option value="NSE:SUNPHARMA" />
                  <option value="NSE:TITAN" />
                  <option value="NSE:BAJFINANCE" />
                  <option value="NSE:NIFTY" label="Nifty 50 Index" />
                  <option value="NSE:BANKNIFTY" label="Bank Nifty Index" />
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select 
                  id="type" 
                  name="type" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="BUY">BUY / LONG</option>
                  <option value="SELL">SELL / SHORT</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryPrice">Entry Price</Label>
                  <Input id="entryPrice" name="entryPrice" type="number" step="any" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetPrice">Target Price</Label>
                  <Input id="targetPrice" name="targetPrice" type="number" step="any" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss</Label>
                <Input id="stopLoss" name="stopLoss" type="number" step="any" placeholder="0.00" className="text-red-400" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Notes</Label>
                <Input id="description" name="description" placeholder="Optional notes..." />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                Post Signal
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Signals List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Active Signals</h2>
          <div className="grid gap-4">
            {signals.map((signal: any) => (
              <Card key={signal.id} className={`border-l-4 ${signal.type === 'BUY' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{signal.symbol}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        signal.type === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {signal.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        signal.status === 'OPEN' ? 'border-yellow-500 text-yellow-500' : 'border-gray-500 text-gray-500'
                      }`}>
                        {signal.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 space-x-4">
                      <span>Entry: {signal.entryPrice}</span>
                      <span>Target: {signal.targetPrice}</span>
                      <span className="text-red-400/80">SL: {signal.stopLoss}</span>
                    </div>
                    {signal.description && (
                      <p className="text-xs text-gray-500 mt-1">{signal.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {signal.status === 'OPEN' && (
                       <form action={closeSignal.bind(null, signal.id)}>
                         <Button size="icon" variant="ghost" className="hover:text-yellow-500" title="Close Signal">
                           <XCircle className="w-5 h-5" />
                         </Button>
                       </form>
                    )}
                    <form action={deleteSignal.bind(null, signal.id)}>
                      <Button size="icon" variant="ghost" className="hover:text-red-500" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {signals.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                No signals posted yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
