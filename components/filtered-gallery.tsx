"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Users, Calendar, GraduationCap } from "lucide-react";

const galleryData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800",
    category: "teacher",
    label: "Science Faculty",
  },
  {
    id: 2,
    url: "/groundboys.jpg",
    category: "student",
    label: "Boys Playground Activity",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    category: "teacher",
    label: "Mathematics Department",
  },
  {
    id: 4,
    url: "/groundgirls.jpg",
    category: "student",
    label: "Girls Ground Activities",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=800",
    category: "teacher",
    label: "Literature & Language Faculty",
  },
  {
    id: 7,
    url: "/26jan.jpg",
    category: "event",
    label: "Republic Day Celebration (26 Jan)",
  },
];

type FilterType = "all" | "teacher" | "student" | "event";

const filterTabs = [
  { id: "all", label: "All Photos", icon: ImageIcon },
  { id: "teacher", label: "Our Teachers", icon: GraduationCap },
  { id: "student", label: "Student Life", icon: Users },
  { id: "event", label: "Events", icon: Calendar },
] as const;

export function FilteredGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredData = galleryData.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section className="bg-sky-50/30 min-h-screen pb-24">
      {/* Banner that sits right below header */}
      <div className="bg-sky-900 border-t border-sky-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/schoolimg.jpeg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/60 to-sky-950/90"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg font-mukta"
          >
            Campus Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto font-medium"
          >
            A visual journey through our dynamic campus, celebrating academics, activities, and cherished memories.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20 mb-16">
        <div className="flex justify-center">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-sky-100/50 inline-flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as FilterType)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                    activeFilter === tab.id
                      ? "bg-sky-500 text-white shadow-md transform scale-105"
                      : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="relative break-inside-avoid group cursor-pointer"
              >
                <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white relative">
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-sky-500/90 backdrop-blur-sm border border-sky-400/50 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm">
                        {item.category}
                      </span>
                      <p className="text-white font-bold tracking-wide text-xl drop-shadow-md font-mukta leading-tight">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
