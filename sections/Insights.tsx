import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Activity, Zap, ArrowUpRight, Wifi } from 'lucide-react';

// Initial data generation
const generateInitialData = () => {
  const data = [];
  let value = 4000;
  for (let i = 0; i < 20; i++) {
    // Random walk
    const change = Math.floor(Math.random() * 400) - 150; 
    value = Math.max(2000, value + change);
    data.push({
      time: `${10 + Math.floor(i / 2)}:${(i % 2) * 30 || '00'}`,
      value: value,
      yield: (value / 1000) + 2.5
    });
  }
  return data;
};

const Insights: React.FC = () => {
  const [data, setData] = useState(generateInitialData());
  const [metrics, setMetrics] = useState({
    growth: 18.5,
    occupancy: 98.2,
    marketHeat: 84
  });

  // Real-time simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const lastValue = currentData[currentData.length - 1].value;
        const change = Math.floor(Math.random() * 300) - 100;
        const newValue = Math.max(2000, lastValue + change);
        
        const now = new Date();
        const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const newDataPoint = {
          time: timeLabel,
          value: newValue,
          yield: (newValue / 1000) + 2.5
        };

        // Keep array size constant (remove first, add last)
        return [...currentData.slice(1), newDataPoint];
      });

      // Fluctuate metrics slightly
      setMetrics(prev => ({
        growth: +(prev.growth + (Math.random() * 0.2 - 0.1)).toFixed(1),
        occupancy: Math.min(100, +(prev.occupancy + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        marketHeat: Math.min(100, Math.max(0, Math.floor(prev.marketHeat + (Math.random() * 4 - 2))))
      }));

    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="insights" className="py-24 md:py-32 bg-obsidian border-t border-white/5 relative overflow-hidden">
      {/* Background Grid Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header with Live Indicator */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
           <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">
                  Market Intelligence
                </span>
                <span className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full animate-pulse">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Live Feed
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Data-Driven <span className="text-white/30">Dominance.</span>
              </h2>
              <p className="text-white/60 leading-relaxed">
                 Real-time algorithmic monitoring of rental yields and asset appreciation across our global portfolio.
              </p>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-graphite/40 border border-white/10 rounded-sm p-1 relative group overflow-hidden">
            {/* Scanner Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent w-[50%] -skew-x-12 translate-x-[-200%] animate-[scan_4s_ease-in-out_infinite] pointer-events-none z-10" />

            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-sm font-mono uppercase tracking-widest">Global Asset Yield Index</h3>
                <div className="flex items-center gap-2 text-gold/60 text-xs font-mono">
                  <Wifi size={14} className="animate-pulse" />
                  Connected
                </div>
              </div>
              
              {/* Chart Container - Fixed height to solve Recharts error */}
              <div className="h-[350px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D6B36A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D6B36A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#ffffff30" 
                      tick={{fill: '#ffffff40', fontSize: 10, fontFamily: 'monospace'}} 
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis 
                      stroke="#ffffff30" 
                      tick={{fill: '#ffffff40', fontSize: 10, fontFamily: 'monospace'}} 
                      tickLine={false}
                      axisLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D6B36A" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      animationDuration={1500}
                      isAnimationActive={false} // Disable internal animation for smoother real-time updates
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Live Metrics Side Panel */}
          <div className="flex flex-col gap-4">
             {/* Metric 1 */}
             <MetricCard 
                label="Portfolio Growth (YoY)" 
                value={`${metrics.growth}%`} 
                trend="up"
                icon={TrendingUp}
             />
             {/* Metric 2 */}
             <MetricCard 
                label="Global Occupancy" 
                value={`${metrics.occupancy}%`} 
                trend="stable"
                icon={Activity}
                highlight
             />
             {/* Metric 3 */}
             <MetricCard 
                label="Market Heat Index" 
                value={metrics.marketHeat} 
                trend="up"
                icon={Zap}
                subtext="/ 100 Points"
             />

             <div className="mt-auto pt-6 border-t border-white/5">
                <button className="w-full bg-white/5 hover:bg-gold hover:text-obsidian border border-white/10 text-white py-4 px-6 text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-between group">
                   Download Q3 Report
                   <ArrowUpRight size={16} className="text-gold group-hover:text-obsidian transition-colors" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components
interface MetricCardProps {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  highlight?: boolean;
  subtext?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, icon: Icon, highlight = false, subtext = "" }) => (
  <div className={`p-6 border ${highlight ? 'bg-gold/10 border-gold/30' : 'bg-graphite/20 border-white/5'} flex items-center justify-between group hover:border-gold/20 transition-colors`}>
    <div>
       <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest mb-2">
          <Icon size={12} />
          {label}
       </div>
       <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-serif ${highlight ? 'text-gold' : 'text-white'}`}>
            {value}
          </span>
          {subtext && <span className="text-xs text-white/30">{subtext}</span>}
       </div>
    </div>
    {trend === 'up' && <div className="text-green-400/80 text-xs font-mono">▲</div>}
    {trend === 'down' && <div className="text-red-400/80 text-xs font-mono">▼</div>}
    {trend === 'stable' && <div className="text-white/40 text-xs font-mono">−</div>}
  </div>
);

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian/90 backdrop-blur-md border border-gold/30 p-4 shadow-xl">
        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-2 font-mono">{label}</p>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-gold font-bold text-lg">${payload[0].value.toLocaleString()}</span>
          <span className="text-white/40 text-xs">Asset Val</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400">
           <TrendingUp size={10} />
           <span>High Demand</span>
        </div>
      </div>
    );
  }
  return null;
};

export default Insights;