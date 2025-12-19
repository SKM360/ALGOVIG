
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UNITS } from '../constants';
import SortingVisualizer from './visualizers/SortingVisualizer';
import ComplexityChart from './visualizers/ComplexityChart';
import { Book, Code, List, HelpCircle, ChevronRight } from 'lucide-react';
import { explainAlgorithmLogic } from '../services/geminiService';

const UnitPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const unit = UNITS.find(u => u.id === id);
  const [activeTab, setActiveTab] = useState<'visualize' | 'theory' | 'quiz'>('visualize');
  const [selectedAlgo, setSelectedAlgo] = useState(unit?.algorithms[0]?.id || '');
  const [logicExp, setLogicExp] = useState<string>('');

  const currentAlgo = unit?.algorithms.find(a => a.id === selectedAlgo);

  useEffect(() => {
    if (currentAlgo) {
      explainAlgorithmLogic(currentAlgo.name).then(setLogicExp);
    }
  }, [selectedAlgo]);

  if (!unit) return <div>Unit not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{unit.id}</span>
            <span className="text-slate-400 text-xs font-medium">• 12 Lectures</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{unit.title}</h1>
          <p className="text-slate-500 leading-relaxed">
            Exploring fundamental computer science concepts including {unit.topics.join(', ')}.
          </p>
        </div>
        
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <button 
            onClick={() => setActiveTab('visualize')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'visualize' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Code size={18} />
            Visualizers
          </button>
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'theory' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Book size={18} />
            Theory
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'quiz' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <HelpCircle size={18} />
            Exam Prep
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'visualize' && (
            <>
              {unit.id === 'unit-1' ? (
                <ComplexityChart />
              ) : unit.id === 'unit-2' ? (
                <SortingVisualizer />
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                   <div className="bg-slate-100 p-6 rounded-full mb-6">
                     <Code size={40} className="text-slate-300" />
                   </div>
                   <h3 className="text-lg font-bold text-slate-700">Custom Visualizer Building...</h3>
                   <p className="text-center mt-2 max-w-xs">We are currently deploying the visualization engine for {unit.id}. Stay tuned!</p>
                </div>
              )}
              
              {currentAlgo && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <List className="text-indigo-500" />
                    How it Works: {currentAlgo.name}
                  </h3>
                  <div className="prose prose-slate max-w-none">
                    {logicExp ? (
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{logicExp}</p>
                    ) : (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'theory' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Unit Concepts</h3>
              <div className="space-y-6">
                {unit.topics.map((topic, idx) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">{topic}</h4>
                        <p className="text-slate-500 text-sm">Fundamental concept in computer science. Crucial for understanding algorithm performance and system design.</p>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Code size={20} className="text-indigo-400" />
              Pseudocode
            </h3>
            {currentAlgo ? (
              <div className="space-y-3 mono text-sm">
                {currentAlgo.pseudocode.map((line, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <span className="text-slate-600 select-none w-4">{idx + 1}</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm">Select an algorithm to see its implementation logic.</p>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Unit Algorithms</h3>
            <div className="space-y-2">
              {unit.algorithms.length > 0 ? unit.algorithms.map((algo) => (
                <button 
                  key={algo.id}
                  onClick={() => setSelectedAlgo(algo.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    selectedAlgo === algo.id 
                      ? 'bg-indigo-50 text-indigo-700 font-bold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{algo.name}</span>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedAlgo === algo.id ? 'bg-indigo-200' : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    {algo.complexity.time}
                  </div>
                </button>
              )) : (
                <p className="text-sm text-slate-500 italic">No specific algorithms listed for this theoretical unit.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitPage;
