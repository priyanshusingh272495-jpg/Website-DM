import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function Education() {
  const education = [
    {
      degree: "BCA in Digital Marketing",
      school: "Geeta University",
      period: "2024 - 2028 (Pres.)",
      description: "Focusing on Computer Applications, Digital Marketing Trends, and Market Research. GPA: 3.8/4.0",
      highlights: ["Dean's List 2024", "Lead of Marketing Club"]
    }
  ];

  return (
    <section id="education" className="py-24 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="editorial-card"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2 block">{item.period}</span>
                    <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{item.degree}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">{item.school}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-2xl leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {item.highlights.map((h, i) => (
                    <span key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                      <Award size={14} />
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-4 bg-slate-900 dark:bg-brand-primary rounded-[2rem] p-8 text-white flex flex-col justify-between">
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Latest Accolade</h3>
               <p className="text-2xl font-bold mb-2">Google Ads Search Certified</p>
               <p className="text-sm text-slate-400">Issued by Google Digital Garage &bull; 2024</p>
            </div>
            <div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black">G</div>
              <div className="text-xs font-medium uppercase tracking-widest text-slate-400">Verification ID: 948275</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
