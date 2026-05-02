import React from 'react';
import { Monitor, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-md">
            <Monitor size={20} />
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">DM.Portfolio</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
          Made with <Heart size={16} className="text-red-500 fill-current" /> for Digital Marketers
        </div>
        
        <div className="text-slate-400 dark:text-slate-600 text-sm font-bold uppercase tracking-widest">
          © {currentYear} Priyanshu Singh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
