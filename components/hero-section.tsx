"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-sky-50 py-24 lg:py-32 font-mukta min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/schoolimg.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container relative mx-auto px-4 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-sky-200/50 bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-bold tracking-wide text-white shadow-xl">
              {t("ESTD. 2013 • COLLEGE CODE: 02/1425", "स्थापना २०१३ • विद्यालय कोड: ०२/१४२५")}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] font-khand uppercase">
              {t("Empowering Minds,", "सशक्त दिमाग,")} <br />
              <span className="text-sky-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">{t("Shaping the Future.", "भविष्य को आकार देना।")}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl font-bold leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {t(
                "M.D. Public Inter College is committed to providing world-class education with a focus on holistic development, ethical values, and academic excellence strictly following the UP Board Prayagraj curriculum.",
                "एम. डी. पब्लिक इण्टर कॉलेज यूपी बोर्ड प्रयागराज पाठ्यक्रम का सख्ती से पालन करते हुए समग्र विकास, नैतिक मूल्यों और शैक्षिक उत्कृष्टता पर ध्यान देने के साथ विश्व स्तरीय शिक्षा प्रदान करने के लिए प्रतिबद्ध है।"
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/admissions">
              <Button size="lg" className="group w-full md:w-auto bg-sky-500 text-white hover:bg-sky-400 font-bold text-lg px-8 h-14 shadow-lg hover:shadow-sky-500/30 transition-all font-khand tracking-wider border border-sky-400/50">
                {t("APPLY NOW", "अभी आवेदन करें")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/academics">
              <Button size="lg" variant="outline" className="w-full md:w-auto border-2 border-sky-200/50 bg-white/10 text-white hover:bg-white hover:text-sky-950 font-bold text-lg px-8 h-14 backdrop-blur-md transition-all font-khand tracking-wider shadow-sm">
                {t("EXPLORE ACADEMICS", "शिक्षाविद देखें")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
