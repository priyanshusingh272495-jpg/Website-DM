import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { name: 'Behance', icon: <span className="font-bold text-lg italic">Be</span>, href: 'https://behance.net' },
    { name: 'Pinterest', icon: <span className="font-bold text-lg">P</span>, href: 'https://pinterest.com' },
    { name: 'Upwork', icon: <span className="font-bold text-lg">Up</span>, href: 'https://upwork.com' },
  ];

  return (
    <section id="contact" className="py-24 bg-brand-bg dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 bg-brand-accent dark:bg-indigo-900/20 rounded-[2.5rem] p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">Let's collaborate.</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Open for internships, junior marketing roles, or creative projects.</p>
            </div>
            
            <div className="flex gap-4 my-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -5 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-brand-primary transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="text-xs font-bold text-indigo-400 dark:text-indigo-500 tracking-widest uppercase">
              hello@priyanshu.me
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 editorial-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Send a Brief</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <input 
                  type="email" 
                  placeholder="hello@example.com" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
              <textarea 
                rows={4}
                placeholder="What are we working on?" 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
              ></textarea>
              <button className="px-8 py-4 bg-slate-900 dark:bg-brand-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-brand-primary/20 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
