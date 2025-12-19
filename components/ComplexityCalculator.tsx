
import React, { useState } from 'react';
import { Brain, Code, Zap, Loader2 } from 'lucide-react';
import { analyzeComplexity } from '../services/geminiService';

const ComplexityCalculator: React.FC = () => {
  const [code, setCode] = useState(`function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const analysis = await analyzeComplexity(code);
      setResult(analysis);
    } catch (err) {
      alert("Failed to analyze code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl text-white">
            <Brain size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Complexity Calculator</h1>
            <p className="text-slate-500">Paste your algorithm code and let AI analyze its asymptotic behavior.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700 uppercase">Input Code</span>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">JavaScript / Pseudo</span>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 rounded-xl border border-slate-200 bg-slate-50 mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Paste your function here..."
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
              {loading ? 'Analyzing with Gemini...' : 'Analyze Complexity'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700 uppercase">AI Analysis</span>
              {result && <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-bold">Analysis Ready</span>}
            </div>
            
            <div className="h-80 border border-slate-200 rounded-xl p-6 bg-slate-50 overflow-y-auto">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                  <Code size={48} className="mb-4 opacity-20" />
                  <p>Results will appear here after analysis.</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center animate-pulse">
                   <Loader2 size={32} className="animate-spin text-indigo-500 mb-4" />
                   <p className="font-medium">Consulting Gemini for code analysis...</p>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <span className="text-xs text-slate-400 uppercase font-bold">Time</span>
                      <p className="text-xl font-bold text-indigo-600">{result.timeComplexity}</p>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                      <span className="text-xs text-slate-400 uppercase font-bold">Space</span>
                      <p className="text-xl font-bold text-emerald-600">{result.spaceComplexity}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-xs text-slate-400 uppercase font-bold block mb-2">Explanation</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{result.explanation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Best Case</span>
                      <code className="text-xs bg-slate-200 px-2 py-1 rounded">{result.bestCase || 'N/A'}</code>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Worst Case</span>
                      <code className="text-xs bg-slate-200 px-2 py-1 rounded">{result.worstCase || 'N/A'}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityCalculator;
