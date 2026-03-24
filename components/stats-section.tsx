"use client";

import { motion } from "framer-motion";
import { Landmark, Users, GraduationCap, TrendingUp } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      id: 1,
      title: "Established",
      value: "2013",
      icon: Landmark,
    },
    {
      id: 2,
      title: "Students",
      value: "1500+",
      icon: Users,
    },
    {
      id: 3,
      title: "Expert Faculty",
      value: "45+",
      icon: GraduationCap,
    },
    {
      id: 4,
      title: "Board Results",
      value: "100%",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-sky-600 text-white font-mukta relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/schoolimg.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-sky-700/80 to-sky-600/50"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center justify-center text-center group"
              >
                <div className="mb-4 sm:mb-6 p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors shadow-sm backdrop-blur-sm border border-white/20 group-hover:scale-110 duration-300">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-sky-50" strokeWidth={1.5} />
                </div>
                <h4 className="text-4xl sm:text-5xl font-extrabold font-khand tracking-tight mb-2 drop-shadow-md">
                  {stat.value}
                </h4>
                <p className="text-sky-100 font-bold uppercase tracking-wider text-sm sm:text-base">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
