import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Camera, RefreshCw } from 'lucide-react';

export default function Hero() {
  const [profileData, setProfileData] = useState<{ imageUrl?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to profile data in real-time
    const profileRef = doc(db, 'profile', 'main');
    const unsubscribe = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
      setLoading(false);
    }, (error) => {
      // For public reading, we just log instead of throwing to avoid crashing the view
      console.warn('Profile read note:', error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!auth.currentUser) {
      alert("Please log in as an admin (via the link in the footer) to change the profile image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result as string;
      try {
        const { setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'profile', 'main'), {
          imageUrl: base64String,
          updatedAt: new Date()
        }, { merge: true });
        alert('Profile image updated successfully!');
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, 'profile/main');
      }
    };
  };

  const defaultImage = "/src/assets/images/regenerated_image_1777700358930.jpg";

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
            <span className="text-black dark:text-white">Priyanshu Singh</span>
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
          
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                <RefreshCw className="animate-spin text-brand-primary" size={32} />
             </div>
          ) : (
            <img 
              src={profileData?.imageUrl || defaultImage} 
              alt="Priyanshu Singh" 
              className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
            />
          )}

          {/* Hidden Upload Input */}
          <label className="absolute top-4 right-4 z-30 cursor-pointer bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all group-hover:opacity-100 opacity-0">
            <Camera size={20} className="text-white" />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>

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
