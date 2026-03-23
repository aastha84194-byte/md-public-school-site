"use client";

import { useLanguage } from "./language-provider";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 font-mukta">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          
          <div className="lg:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-secondary p-2 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-bold tracking-tight text-xl text-primary dark:text-white font-khand">
                {t("M.D. Public Inter College", "एम. डी. पब्लिक इण्टर कॉलेज")}
              </span>
            </Link>
            <p className="mb-6 text-sm text-muted-foreground mr-4 font-medium leading-relaxed">
              {t(
                "Recognized by UP Board, Prayagraj. Excellence in education since 2002. Fostering future leaders with integrity and knowledge.",
                "यूपी बोर्ड, प्रयागराज द्वारा मान्यता प्राप्त। २००२ से शिक्षा में उत्कृष्टता। सत्यनिष्ठा और ज्ञान के साथ भविष्य के नेताओं को बढ़ावा देना।"
              )}
            </p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary dark:text-zinc-50 font-khand">
              {t("Quick Links", "त्वरित संपर्क")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/admissions" className="font-bold text-zinc-600 dark:text-zinc-300 hover:text-secondary transition-colors">
                  {t("Admissions", "प्रवेश")}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="font-bold text-zinc-600 dark:text-zinc-300 hover:text-secondary transition-colors">
                  {t("Academics", "शिक्षाविद")}
                </Link>
              </li>
               <li>
                <Link href="/gallery" className="font-bold text-zinc-600 dark:text-zinc-300 hover:text-secondary transition-colors">
                  {t("Gallery", "गैलरी")}
                </Link>
              </li>
               <li>
                <Link href="/contact" className="font-bold text-zinc-600 dark:text-zinc-300 hover:text-secondary transition-colors">
                  {t("Contact Us", "हमसे संपर्क करें")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
             <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary dark:text-zinc-50 font-khand">
              {t("Contact & Location", "संपर्क और स्थान")}
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                <span className="font-medium">
                  Ashutosh Nagar, Paigu Road, Sirsaganj, Firozabad (U.P.)
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <GraduationCap className="h-5 w-5 shrink-0 text-secondary" />
                <span className="font-medium">
                  {t("College Code: 02/1425", "विद्यालय कोड: ०२/१४२५")}
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0 text-secondary" />
                <span className="font-medium">08923024187</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-xs text-muted-foreground font-semibold">
          <p>
            © {new Date().getFullYear()} M.D. Public Inter College, Sirsaganj. {t("All rights reserved.", "सर्वाधिकार सुरक्षित।")}
          </p>
        </div>
      </div>
    </footer>
  );
}
