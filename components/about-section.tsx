"use client";

import { useLanguage } from "./language-provider";
import { BookOpen, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function AboutSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: BookOpen,
      title: t("Education", "शिक्षा"),
    },
    {
      icon: HeartHandshake,
      title: t("Values", "संस्कार"),
    },
    {
      icon: ShieldCheck,
      title: t("Discipline", "अनुशासन"),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden font-mukta selection:bg-sky-100 dark:bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* The Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-sky-50 border border-sky-100">
              <img 
                src="/school.jpeg" 
                alt="M.D. Public Inter College Campus" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/30 to-transparent" />
            </div>
            
            {/* Soft decorative blob behind image */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-sky-200/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse"></div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 bg-white p-5 rounded-2xl shadow-xl border border-sky-50 flex items-center gap-4 dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className="bg-sky-50 rounded-full p-3.5 text-sky-600 shadow-sm dark:bg-sky-900/30 dark:text-sky-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="pr-4">
                <p className="text-2xl font-black text-sky-950 leading-none mb-1 dark:text-sky-100">20+</p>
                <p className="text-sm font-bold text-sky-700 uppercase tracking-wider dark:text-sky-300">
                  {t("Years of Excellence", "उत्कृष्टता के वर्ष")}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col pt-12 lg:pt-0"
          >
            <div className="inline-flex items-center gap-3 text-sky-600 font-bold uppercase tracking-widest text-sm mb-5">
              <span className="w-10 h-0.5 bg-sky-400 rounded-full"></span>
              {t("Welcome to the Campus", "परिसर में आपका स्वागत है")}
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-[1.2] mb-6 font-khand drop-shadow-sm dark:text-white">
              {t("Nurturing Future Leaders in Sirsaganj", "सिरसागंज में भविष्य के नेतृत्वकर्ताओं का निर्माण")}
            </h2>
            
            <p className="text-lg text-slate-600 font-normal leading-loose mb-10 dark:text-zinc-400">
              {t(
                "M.D. Public Inter College is a premier UP Board institution dedicated to providing a balanced mix of traditional values and modern technical education. Under the guidance of Er. Shailendra Pratap Singh, we focus on empowering students with practical knowledge.",
                "एम. डी. पब्लिक इण्टर कॉलेज एक प्रमुख यूपी बोर्ड संस्थान है जो पारंपरिक मूल्यों और आधुनिक तकनीकी शिक्षा का संतुलित मिश्रण प्रदान करने के लिए समर्पित है। ईआर. शैलेंद्र प्रताप सिंह के मार्गदर्शन में, हम छात्रों को व्यावहारिक ज्ञान के साथ सशक्त बनाने पर ध्यान केंद्रित करते हैं।"
              )}
            </p>

            {/* The Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center sm:items-start p-6 bg-sky-50 rounded-2xl border border-sky-100 shadow-[0_2px_10px_-4px_rgba(14,165,233,0.1)] hover:shadow-[0_8px_20px_-4px_rgba(14,165,233,0.2)] transition-shadow dark:bg-zinc-900/50 dark:border-sky-900/30"
                  >
                    <Icon className="w-8 h-8 text-sky-500 mb-4 drop-shadow-sm" strokeWidth={1.5} />
                    <h3 className="font-bold text-slate-800 text-lg tracking-wide dark:text-sky-100">{pillar.title}</h3>
                  </motion.div>
                );
              })}
            </div>

            {/* Call to Action Button */}
            <div>
              <Link href="/about">
                <Button size="lg" variant="outline" className="group border-2 border-sky-400 text-sky-700 hover:bg-sky-50 hover:border-sky-500 hover:text-sky-800 font-bold text-base px-8 h-14 shadow-sm transition-all rounded-xl dark:border-sky-600 dark:text-sky-300 dark:hover:bg-zinc-900">
                  {t("Read More About Our History", "हमारे इतिहास के बारे में अधिक पढ़ें")}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
