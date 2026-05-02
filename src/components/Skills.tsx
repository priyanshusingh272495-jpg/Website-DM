import React from 'react';
import { motion } from 'motion/react';
import { Search, Share2, Globe, Layout, Mail, BarChart3 } from 'lucide-react';

export default function Skills() {
  const skills = [
    { name: "SEO & Content Strategy", level: 95, color: "bg-indigo-500" },
    { name: "Social Media Ads", level: 88, color: "bg-indigo-400" },
    { name: "Google Analytics 4", level: 92, color: "bg-purple-400" },
    { name: "Email Marketing", level: 80, color: "bg-pink-400" },
  ];

  const tags = ["HubSpot", "Python", "Canva", "Shopify", "Mailchimp", "Tableau"];

  return (
    <section id="skills" className="py-24 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 editorial-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Core Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-2 text-slate-900 dark:text-slate-100">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`${skill.color} h-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-[10px] font-medium rounded-full text-slate-600 dark:text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="editorial-card flex flex-col justify-center">
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Strategic <span className="text-brand-primary">Mindset</span></h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  I don't just look at metrics; I look at the human behavior behind them. My goal is to bridge the gap between technical data and creative storytelling.
                </p>
             </div>
             <div className="bg-brand-primary rounded-[2rem] p-8 text-white flex flex-col justify-center">
                <div className="text-5xl font-black mb-2">12+</div>
                <div className="text-sm font-bold uppercase tracking-widest opacity-70">Certifications Completed</div>
                <div className="mt-6 pt-6 border-t border-white/10 text-xs font-medium opacity-80">
                  Specialized in Search, Content, and Growth Analytics.
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
