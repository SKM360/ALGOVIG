
import React from 'react';
import { Link } from 'react-router-dom';
import { UNITS } from '../constants';
import { 
  Trophy, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  PlayCircle,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Trophy size={24} />
            </div>
            <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full">+12% vs last week</span>
          </div>
          <div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Learning Progress</p>
            <h2 className="text-4xl font-extrabold tracking-tight">64%</h2>
          </div>
        </div>

        <div className="bg-emerald-500 rounded-3xl p-8 text-white shadow-xl shadow-emerald-100 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Clock size={24} />
            </div>
          </div>
          <div>
            <p className="text-emerald-50 text-sm font-medium mb-1">Total Study Time</p>
            <h2 className="text-4xl font-extrabold tracking-tight">18.5h</h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <div className="bg-slate-100 p-3 rounded-2xl text-slate-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Algorithms Mastered</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">12/24</h2>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Curriculum Roadmap</h2>
            <p className="text-slate-500">Master the syllabus step-by-step through visualization.</p>
          </div>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View Syllabus <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UNITS.map((unit) => (
            <Link 
              key={unit.id}
              to={`/unit/${unit.id}`}
              className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 -mr-8 -mt-8 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="flex justify-between items-start relative z-10 mb-8">
                <div className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {unit.id}
                </div>
                <div className="text-slate-300">
                  <PlayCircle size={24} />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{unit.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  Learn about {unit.topics.join(', ')} with interactive labs.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                        <img src={`https://picsum.photos/seed/${unit.id}${i}/100`} alt="Avatar" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">+1.2k students</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 border-4 border-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-emerald-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1 rounded-full text-sm font-bold border border-indigo-500/30">
              <TrendingUp size={16} />
              AI Algorithm Lab
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Test your knowledge with our AI-powered playground
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Upload snippets or try built-in examples. Our Gemini-powered engine will explain 
              the logic and calculate complexity in real-time.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/calculator" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-50 transition-colors flex items-center gap-2">
                Launch Lab
                <ChevronRight size={20} />
              </Link>
              <button className="bg-slate-800 text-slate-300 px-8 py-4 rounded-2xl font-bold hover:bg-slate-750 transition-colors">
                Quick Start Guide
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-6 shadow-2xl">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="space-y-4 mono text-sm text-indigo-300">
                <div className="flex gap-4">
                  <span className="text-slate-600">1</span>
                  <span>async function analyze(code) {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">2</span>
                  <span className="pl-4">const logic = await Gemini.explain(code);</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">3</span>
                  <span className="pl-4 text-emerald-400">return logic.complexity; // Result: O(n log n)</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-600">4</span>
                  <span>{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
