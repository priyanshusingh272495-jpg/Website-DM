import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle2, Camera, RefreshCw } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

interface CertificationType {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
}

export default function Certifications() {
  const [certs, setCerts] = useState<CertificationType[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCerts: CertificationType[] = [
    {
      id: "hvpe-2026",
      title: "Human Values & Professional Ethics (HVPE)",
      issuer: "Hoping Minds / SWAYAM Plus",
      date: "May 2026",
      imageUrl: "/src/assets/images/regenerated_image_1777700281590.jpg", 
      link: "#"
    }
  ];

  useEffect(() => {
    const certsCollection = collection(db, 'certifications');
    const unsubscribe = onSnapshot(certsCollection, (snapshot) => {
      if (snapshot.empty) {
        setCerts(defaultCerts);
      } else {
        const certData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CertificationType));
        setCerts(certData);
      }
      setLoading(false);
    }, (error) => {
      console.warn('Certs read note:', error.message);
      setCerts(defaultCerts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (certId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!auth.currentUser) {
      alert("Please log in as an admin via the footer to change images.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result as string;
      try {
        const certRef = doc(db, 'certifications', certId);
        // Find existing cert to keep other fields
        const existingCert = certs.find(c => c.id === certId) || defaultCerts.find(c => c.id === certId);
        await setDoc(certRef, {
          ...existingCert,
          imageUrl: base64String,
          updatedAt: new Date()
        }, { merge: true });
        alert('Certification image updated!');
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `certifications/${certId}`);
      }
    };
  };

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

         {loading ? (
            <div className="flex justify-center py-20">
              <RefreshCw className="animate-spin text-brand-primary" size={32} />
            </div>
         ) : (
           <div className="flex justify-center flex-wrap gap-6">
              {certs.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group relative w-full sm:w-[350px] h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900"
                >
                   <img 
                    src={cert.imageUrl} 
                    alt={cert.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Admin Upload Trigger */}
                  <label className="absolute top-4 right-4 z-30 cursor-pointer bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all group-hover:opacity-100 opacity-0 border border-white/30">
                    <Camera size={18} className="text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(cert.id!, e)} />
                  </label>

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
         )}
      </div>
    </section>
  );
}
