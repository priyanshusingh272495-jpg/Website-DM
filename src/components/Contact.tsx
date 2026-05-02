import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, ExternalLink, Loader2, CheckCircle } from 'lucide-react';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const socialLinks = [
    { name: 'Behance', icon: <span className="font-bold text-lg italic">Be</span>, href: 'https://behance.net' },
    { name: 'Pinterest', icon: <span className="font-bold text-lg">P</span>, href: 'https://pinterest.com' },
    { name: 'Upwork', icon: <span className="font-bold text-lg">Up</span>, href: 'https://upwork.com' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const messagesRef = collection(db, 'messages');
      await addDoc(messagesRef, {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'messages');
      } catch (err: any) {
        setErrorMessage(JSON.parse(err.message).error);
      }
    }
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@example.com" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What are we working on?" 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
              ></textarea>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button 
                  disabled={status === 'submitting'}
                  className="px-8 py-4 bg-slate-900 dark:bg-brand-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-brand-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold text-sm"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully!
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-600 dark:text-red-500 font-bold text-sm"
                  >
                    {errorMessage || 'Failed to send message. Please try again.'}
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
