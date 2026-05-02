import React from 'react';
import { motion } from 'motion/react';
import { Target, Share2, MousePointer2, Mail } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Organic Growth Study",
      description: "+240% traffic increase via long-form SEO strategy.",
      icon: <Target className="text-brand-primary" />,
      color: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      title: "Brand Awareness Ads",
      description: "Meta campaign reaching 500k+ users in Q3.",
      icon: <Share2 className="text-blue-400" />,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Conversion Optimization",
      description: "A/B testing leads to 15% bump in trial signups.",
      icon: <MousePointer2 className="text-purple-400" />,
      color: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Email Life Cycle",
      description: "Automated sequence resulting in 22% open rate.",
      icon: <Mail className="text-pink-400" />,
      color: "bg-pink-50 dark:bg-pink-900/20"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-8">
           <div className="col-span-12 lg:col-span-4">
              <span className="editorial-label">Selected Work</span>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">Crafting Results <br />Through <span className="text-brand-primary">Precision.</span></h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                A selection of campaigns and studies where I've applied technical skills to solve complex marketing challenges.
              </p>
           </div>
           
           <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex gap-6 items-center group cursor-pointer hover:border-brand-primary transition-all"
                >
                  <div className={`w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center ${project.color}`}>
                    {project.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{project.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{project.description}</p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
