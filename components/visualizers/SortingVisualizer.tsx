
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, SkipForward, Pause, BarChart } from 'lucide-react';

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState('bubble');
  
  const stopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsRunning(false);
    stopRef.current = false;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsRunning(true);
    let arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        
        setComparing([j, j + 1]);
        await sleep(speed);
        
        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
        setSwapping([]);
      }
      setSorted(prev => [...prev, n - i - 1]);
    }
    setIsRunning(false);
    setComparing([]);
  };

  const reset = () => {
    stopRef.current = true;
    generateArray();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Sorting Playground</h3>
          <p className="text-slate-500 text-sm">Visualize algorithm execution in real-time.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
          
          <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1 border border-slate-200">
            <span className="text-xs font-medium text-slate-500">Speed</span>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 h-1 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <button 
            onClick={generateArray}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Generate Random Data"
          >
            <RotateCcw size={20} />
          </button>
          
          <button 
            disabled={isRunning}
            onClick={bubbleSort}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Running...' : 'Sort Now'}
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-center gap-2 px-4 mb-6 border-b border-slate-100 pb-2">
        {array.map((val, idx) => {
          let bgColor = 'bg-indigo-500';
          if (comparing.includes(idx)) bgColor = 'bg-yellow-400 ring-4 ring-yellow-100';
          if (swapping.includes(idx)) bgColor = 'bg-rose-500 ring-4 ring-rose-100';
          if (sorted.includes(idx)) bgColor = 'bg-emerald-500';
          
          return (
            <div 
              key={idx}
              className={`w-full max-w-[40px] rounded-t-lg transition-all duration-200 relative group ${bgColor}`}
              style={{ height: `${val}%` }}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] py-1 px-2 rounded transition-opacity">
                {val}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Comparisons</span>
          <p className="text-2xl font-bold text-slate-900">{comparing.length > 0 ? 'Updating...' : '0'}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Swaps</span>
          <p className="text-2xl font-bold text-slate-900">{swapping.length > 0 ? 'Swapping...' : '0'}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Time Comp.</span>
          <p className="text-2xl font-bold text-indigo-600">O(n²)</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Space Comp.</span>
          <p className="text-2xl font-bold text-emerald-600">O(1)</p>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
