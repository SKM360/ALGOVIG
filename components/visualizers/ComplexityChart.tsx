
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const ComplexityChart: React.FC = () => {
  const generateData = () => {
    const data = [];
    for (let n = 1; n <= 15; n++) {
      data.push({
        n,
        'O(1)': 1,
        'O(log n)': Math.log2(n),
        'O(n)': n,
        'O(n log n)': n * Math.log2(n),
        'O(n²)': n * n,
        'O(2ⁿ)': Math.pow(2, n),
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Growth of Functions</h3>
        <p className="text-slate-500 text-sm">Comparing computational complexity classes.</p>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="n" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[0, 250]} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }} 
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="O(1)" stroke="#94a3b8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O(log n)" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O(n)" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O(n log n)" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O(n²)" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O(2ⁿ)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <span>Constant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Logarithmic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Linear</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <span>Quadratic</span>
        </div>
      </div>
    </div>
  );
};

export default ComplexityChart;
