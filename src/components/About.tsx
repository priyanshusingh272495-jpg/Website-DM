import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, TrendingUp, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <span className="editorial-label">The Strategy</span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
              Blending <span className="text-brand-primary">Intuition</span> with Data.
            </h3>
            <div className="space-y-6 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>
                Hello, I'm Priyanshu Singh from Panipat. I am currently pursuing my BCA from Geeta University.
              </p>
              <p>
                As a student of both analytics and creative narrative, I specialize in identifying the underlying patterns in consumer behavior and translating them into campaigns that resonate on a personal level.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="editorial-card flex flex-col items-center justify-center text-center p-6 bg-brand-accent dark:bg-indigo-900/10 border-none">
              <div className="text-3xl font-black text-brand-primary mb-1">95%</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SEO Score Avg.</p>
            </div>
            <div className="editorial-card flex flex-col items-center justify-center text-center p-6">
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">4.2x</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">PPC ROAS</p>
            </div>
            <div className="editorial-card col-span-2 flex items-center gap-6 p-6">
               <div className="w-12 h-12 bg-brand-primary rounded-xl flex-shrink-0 flex items-center justify-center text-white">
                  <Target size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Precision Targeting</h4>
                  <p className="text-xs text-slate-500">Reaching the right audience at the right time.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
