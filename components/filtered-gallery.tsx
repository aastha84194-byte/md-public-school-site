"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function FilteredGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredData = galleryData.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section className="py-20 md:py-28 bg-white selection:bg-sky-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Campus Gallery
          </h2>
          <div className="w-24 h-1.5 bg-sky-200 mx-auto rounded-full mb-10"></div>
          
          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 p-1.5 bg-sky-50/50 rounded-2xl border border-sky-100 shadow-sm">
            {(["all", "teacher", "student", "event"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 sm:px-8 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-sky-100 text-sky-800 border border-sky-300 shadow-sm"
                    : "text-slate-600 hover:text-sky-700 hover:bg-sky-50 border border-transparent"
                }`}
              >
                {filter === "all" && "All"}
                {filter === "teacher" && "Our Teachers"}
                {filter === "student" && "Student Life"}
                {filter === "event" && "Events"}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid with Framer Motion Layout animations */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="relative break-inside-avoid group cursor-pointer"
              >
                <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 border border-sky-50 bg-white relative">
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Teacher Profile Overlay Overlay */}
                  {item.category === "teacher" && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent p-6 pt-16">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold tracking-wide text-lg drop-shadow-md">
                          {item.label}
                        </p>
                        <div className="w-12 h-1 bg-sky-400 mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  )}

                  {/* Candid / Event Overlay */}
                  {(item.category === "student" || item.category === "event") && (
                    <div className="absolute inset-0 bg-sky-900/0 group-hover:bg-sky-900/30 transition-colors duration-500 flex items-center justify-center p-6">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                        <span className="bg-white/95 text-sky-900 font-bold px-5 py-2.5 rounded-full text-sm shadow-lg backdrop-blur-sm border border-sky-100 inline-block">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
