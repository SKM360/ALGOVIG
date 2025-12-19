
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  LayoutDashboard, 
  Layers, 
  BarChart2, 
  Settings, 
  Code,
  Menu,
  X,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { UNITS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Complexity Calc', path: '/calculator', icon: <Calculator size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Layers size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight">AlgoViz Master</span>}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          <div>
            <p className={`text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 ${!isSidebarOpen && 'text-center'}`}>
              {isSidebarOpen ? 'General' : '•'}
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 ${!isSidebarOpen && 'text-center'}`}>
              {isSidebarOpen ? 'Syllabus Units' : '•'}
            </p>
            <ul className="space-y-1">
              {UNITS.map((unit) => (
                <li key={unit.id}>
                  <Link 
                    to={`/unit/${unit.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      location.pathname === `/unit/${unit.id}`
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen size={20} />
                    {isSidebarOpen && (
                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">{unit.id.toUpperCase()}</span>
                        <span className="text-xs text-slate-500 mt-1 truncate w-32">{unit.title}</span>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
             <span>Platform</span>
             <ChevronRight size={14} />
             <span className="text-slate-900 font-medium capitalize">
               {location.pathname === '/' ? 'Dashboard' : location.pathname.split('/').pop()}
             </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
              JD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
