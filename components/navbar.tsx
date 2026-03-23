"use client";

import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-sky-200 bg-sky-50/95 backdrop-blur-md text-sky-950 shadow-sm transition-all pt-2 pb-2 dark:bg-sky-950/95 dark:border-sky-800 dark:text-sky-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-sky-200 p-2 text-sky-700 shadow-sm min-w-10 dark:bg-sky-800 dark:text-sky-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg lg:text-xl leading-tight font-mukta text-sky-900 dark:text-sky-100">
                {t("M.D. Public Inter College", "एम. डी. पब्लिक इण्टर कॉलेज")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mukta">
            <Link href="/admissions" className="text-sm font-bold text-sky-800 hover:text-sky-500 transition-colors uppercase tracking-wider dark:text-sky-200 dark:hover:text-sky-400">
              {t("Admissions", "प्रवेश")}
            </Link>
            <Link href="/academics" className="text-sm font-bold text-sky-800 hover:text-sky-500 transition-colors uppercase tracking-wider dark:text-sky-200 dark:hover:text-sky-400">
              {t("Academics", "शिक्षाविद")}
            </Link>
            <Link href="/gallery" className="text-sm font-bold text-sky-800 hover:text-sky-500 transition-colors uppercase tracking-wider dark:text-sky-200 dark:hover:text-sky-400">
              {t("Gallery", "गैलरी")}
            </Link>
            <Link href="/contact" className="text-sm font-bold text-sky-800 hover:text-sky-500 transition-colors uppercase tracking-wider dark:text-sky-200 dark:hover:text-sky-400">
              {t("Contact", "संपर्क")}
            </Link>
            
            <div className="h-6 w-px bg-sky-200 dark:bg-sky-800 mx-2" />
            
            <div className="flex items-center gap-2 bg-sky-100/50 dark:bg-sky-900/50 rounded-full p-1 border border-sky-200 dark:border-sky-800">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  language === "en" ? "bg-sky-500 text-white shadow-sm" : "text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  language === "hi" ? "bg-sky-500 text-white shadow-sm" : "text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-white"
                }`}
              >
                HI
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <div className="flex items-center gap-1 bg-sky-100/50 dark:bg-sky-900/50 rounded-full p-1 border border-sky-200 dark:border-sky-800">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
                  language === "en" ? "bg-sky-500 text-white shadow-sm" : "text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${
                  language === "hi" ? "bg-sky-500 text-white shadow-sm" : "text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-white"
                }`}
              >
                HI
              </button>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-sky-900 hover:bg-sky-100 dark:text-sky-100 dark:hover:bg-sky-800">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-sky-200 bg-sky-50/95 backdrop-blur-md overflow-hidden font-mukta dark:bg-sky-950/95 dark:border-sky-800"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <Link href="/admissions" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-sky-800 hover:text-sky-500 dark:text-sky-200 dark:hover:text-sky-400">
                {t("Admissions", "प्रवेश")}
              </Link>
              <Link href="/academics" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-sky-800 hover:text-sky-500 dark:text-sky-200 dark:hover:text-sky-400">
                {t("Academics", "शिक्षाविद")}
              </Link>
              <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-sky-800 hover:text-sky-500 dark:text-sky-200 dark:hover:text-sky-400">
                {t("Gallery", "गैलरी")}
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-sky-800 hover:text-sky-500 dark:text-sky-200 dark:hover:text-sky-400">
                {t("Contact", "संपर्क")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
