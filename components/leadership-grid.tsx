"use client";

import { useLanguage } from "./language-provider";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LeadershipGrid() {
  const { t } = useLanguage();

  const leaders = [
    {
      name: t("Matadin Dhanagar", "मातादीन धनगर"),
      title: t("President", "अध्यक्ष"),
      color: "from-sky-400 to-blue-600",
      image: null,
      link: null,
    },
    {
      name: "Eng. Shailendra Pratap Singh",
      title: t("Manager", "प्रबंधक"),
      color: "from-secondary to-orange-400",
      image: "/shailendra.jpeg",
      link: "/about/manager",
    },
    {
      name: t("Pratibha Dhanagar", "प्रतिभा धनगर"),
      title: t("Principal", "प्रधानाचार्य"),
      color: "from-teal-400 to-emerald-600",
      image: null,
      link: null,
    },
  ];

  return (
    <section id="leadership" className="bg-zinc-50 py-24 dark:bg-black font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl text-balance font-khand">
            {t("Our Leadership", "हमारा नेतृत्व")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-secondary" />
          <p className="mt-4 text-lg text-muted-foreground font-mukta">
            {t(
              "Guided by visionaries dedicated to excellence in education.",
              "शिक्षा में उत्कृष्टता के लिए समर्पित दूरदर्शियों द्वारा निर्देशित।"
            )}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 font-mukta">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col h-full rounded-2xl">
                <div className={`h-32 shrink-0 bg-gradient-to-r ${leader.color} opacity-90`} />
                <CardContent className="relative flex flex-col items-center px-6 pb-8 pt-0 flex-1">
                  <div className="-mt-16 mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-zinc-100 shadow-md dark:border-zinc-950 dark:bg-zinc-800 overflow-hidden shrink-0">
                    {leader.image ? (
                        <Image 
                          src={leader.image} 
                          alt={leader.name} 
                          width={128} 
                          height={128} 
                          className="h-full w-full object-cover rounded-full aspect-square" 
                        />
                      ) : (
                        <User className="h-12 w-12 text-zinc-400" />
                      )}
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-zinc-900 dark:text-zinc-50 text-center text-balance leading-tight font-khand">
                    {leader.name}
                  </h3>
                  <p className="font-bold text-secondary text-sm md:text-base uppercase tracking-wider text-center">
                    {leader.title}
                  </p>

                  {leader.link && (
                    <div className="mt-auto pt-6 w-full flex justify-center border-t border-zinc-100 dark:border-zinc-800">
                      <Link href={leader.link}>
                         <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors uppercase tracking-widest mt-4">
                           {t("VIEW PROFILE", "प्रोफ़ाइल देखें")}
                           <ArrowRight className="h-4 w-4" />
                         </button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
