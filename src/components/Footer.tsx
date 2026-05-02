import React, { useState, useEffect } from 'react';
import { Monitor, Heart, LogIn, LogOut, User } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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

        <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-900/50 flex justify-center">
           {user ? (
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-brand-primary flex items-center justify-center border border-white dark:border-slate-700">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                  ) : (
                    <User size={14} className="text-white" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                  Admin Logged In
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1 ml-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 hover:text-brand-primary transition-all duration-300 py-2 px-4 rounded-lg bg-slate-50/50 dark:bg-slate-900/30"
              >
                <LogIn size={14} />
                Admin Access
              </button>
            )}
        </div>
      </div>
    </footer>
  );
}
