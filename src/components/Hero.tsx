import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-bg dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full grid grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-7 editorial-card flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent dark:bg-indigo-900/20 rounded-bl-full -mr-8 -mt-8 opacity-50" />
          
          <span className="editorial-label">Aspiring Digital Marketer</span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-black dark:text-white leading-[1.1] mb-6">
            Hi, I'm <br />
            <span className="text-black">Priyanshu Singh</span>
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            I am Priyanshu Singh from Panipat, currently pursuing my BCA from Geeta University. I blend technical computer applications knowledge with digital marketing strategy.
          </p>
          
          <div className="flex gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              href="#projects"
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold shadow-lg shadow-slate-200 dark:shadow-none"
            >
              View Portfolio
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#contact"
              className="px-6 py-3 bg-brand-accent dark:bg-indigo-900/30 text-brand-primary rounded-xl text-sm font-semibold"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column - Image & Floating Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 lg:col-span-5 h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent z-10" />
          <img 
            src="/src/assets/images/regenerated_image_1777700358930.jpg" 
            alt="Priyanshu Singh" 
            className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-0 p-8 z-20">
            <p className="text-brand-accent text-xs font-medium mb-1 uppercase tracking-widest">About Me</p>
            <p className="text-white text-base leading-snug font-light italic">
              "I blend creative intuition with technical SEO expertise to turn clicks into loyal customers."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
