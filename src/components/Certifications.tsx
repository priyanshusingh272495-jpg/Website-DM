import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "Human Values & Professional Ethics (HVPE)",
      issuer: "Hoping Minds / SWAYAM Plus",
      date: "May 2026",
      image: "/src/assets/images/regenerated_image_1777700281590.jpg", 
      link: "#"
    }
  ];

  return (
    <section className="py-24 soft-gradient">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold text-brand-primary tracking-[0.2em] uppercase mb-4">Qualifications</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">Professional <span className="gradient-text">Certifications</span></h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Industry-recognized certifications validating my technical expertise in the digital marketing landscape.
            </p>
         </div>

         <div className="flex justify-center flex-wrap gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative w-full sm:w-[350px] h-[450px] rounded-[2.5rem] overflow-hidden"
              >
                 <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="flex items-center gap-2 text-brand-primary font-black mb-3">
                    <CheckCircle2 size={18} />
                    <span className="text-xs uppercase tracking-widest">{cert.issuer}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">{cert.title}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-400 text-sm font-medium">{cert.date}</span>
                    <a 
                      href={cert.link}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}
