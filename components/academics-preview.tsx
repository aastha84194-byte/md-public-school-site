"use client";

import { useLanguage } from "./language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  BookOpen,
  Microscope,
  Palette,
  Lightbulb,
  FileText,
  Calendar,
  GraduationCap,
  Download,
} from "lucide-react";

export function AcademicsPreview() {
  const { t } = useLanguage();

  const resources = [
    {
      title: t("UP Board Syllabus", "यूपी बोर्ड पाठ्यक्रम"),
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: t("Model Papers", "मॉडल प्रश्न पत्र"),
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: t("Academic Calendar", "शैक्षणिक कैलेंडर"),
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: t("Scholarship Info", "छात्रवृत्ति जानकारी"),
      icon: <GraduationCap className="h-6 w-6" />,
    },
  ];

  return (
    <section id="academics" className="bg-white py-24 font-sans text-slate-800 dark:bg-zinc-950 dark:text-slate-200">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-sky-50 sm:text-4xl text-balance">
            {t("Explore Academics", "शैक्षणिक अन्वेषण")}
          </h2>
          <div className="mx-auto h-1 w-24 rounded bg-sky-400 dark:bg-sky-600" />
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t(
              "Comprehensive UP Board curriculum designed to foster academic excellence, ethical values, and technical proficiency.",
              "शैक्षणिक उत्कृष्टता, नैतिक मूल्यों और तकनीकी दक्षता को बढ़ावा देने के लिए डिज़ाइन किया गया व्यापक यूपी बोर्ड पाठ्यक्रम।"
            )}
          </p>
        </div>

        {/* Academic Stages */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full overflow-hidden rounded-2xl border-0 bg-sky-50 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border dark:border-zinc-800">
              <CardHeader className="border-b border-sky-100 bg-sky-50/50 pb-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <CardTitle className="text-2xl font-bold text-sky-900 dark:text-sky-100">
                  {t("Secondary", "माध्यमिक")} <span className="text-sky-600 text-lg font-medium ml-2">(9th - 10th)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t(
                    "A strong foundational phase focusing on compulsory subjects as per the UPMSP Prayagraj curriculum.",
                    "यूपीएमएसपी प्रयागराज पाठ्यक्रम के अनुसार अनिवार्य विषयों पर ध्यान केंद्रित करने वाला एक मजबूत आधारभूत चरण।"
                  )}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{t("Hindi & English", "हिन्दी और अंग्रेज़ी")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                      <Microscope className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{t("Science & Math", "विज्ञान और गणित")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                      <Palette className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{t("Social Science", "सामाजिक विज्ञान")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{t("Drawing / Computer", "चित्रकला / कंप्यूटर")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full overflow-hidden rounded-2xl border-0 bg-sky-50 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border dark:border-zinc-800">
              <CardHeader className="border-b border-sky-100 bg-sky-50/50 pb-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                <CardTitle className="text-2xl font-bold text-sky-900 dark:text-sky-100">
                  {t("Senior Secondary", "वरिष्ठ माध्यमिक")} <span className="text-sky-600 text-lg font-medium ml-2">(11th - 12th)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t(
                    "Specialized academic streams designed to prepare students for higher education and competitive success.",
                    "उच्च शिक्षा और प्रतिस्पर्धी सफलता के लिए छात्रों को तैयार करने के लिए डिज़ाइन की गई विशेष शैक्षणिक धाराएँ।"
                  )}
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 font-bold text-sky-800 dark:text-sky-300 flex items-center gap-2">
                       <Microscope className="w-5 h-5" />
                       {t("Science Stream (विज्ञान वर्ग)", "Science Stream")}
                    </h4>
                    <ul className="grid grid-cols-2 gap-2 pl-7 list-disc list-outside marker:text-sky-400 text-sm font-medium">
                      <li>{t("Physics (भौतिक विज्ञान)", "Physics")}</li>
                      <li>{t("Chemistry (रसायन विज्ञान)", "Chemistry")}</li>
                      <li>{t("Mathematics (गणित)", "Mathematics")}</li>
                      <li>{t("Biology (जीव विज्ञान)", "Biology")}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-bold text-sky-800 dark:text-sky-300 flex items-center gap-2">
                       <Palette className="w-5 h-5" />
                       {t("Arts / Humanities (कला वर्ग)", "Arts / Humanities")}
                    </h4>
                    <ul className="grid grid-cols-2 gap-2 pl-7 list-disc list-outside marker:text-sky-400 text-sm font-medium">
                      <li>{t("History (इतिहास)", "History")}</li>
                      <li>{t("Geography (भूगोल)", "Geography")}</li>
                      <li>{t("Civics (नागरिक शास्त्र)", "Civics")}</li>
                      <li>{t("Sociology (समाजशास्त्र)", "Sociology")}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* The Engineer’s Edge Component */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20 overflow-hidden rounded-2xl bg-slate-900 shadow-xl dark:bg-zinc-900 dark:border dark:border-zinc-800"
        >
          <div className="grid md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative h-64 md:h-auto hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                alt="Bright Sunny Classroom Reference" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-sky-900/20 mix-blend-multiply" />
            </div>
            <div className="md:col-span-3 p-8 lg:p-12 text-white flex flex-col justify-center">
               <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-1.5 text-sm font-semibold text-sky-300 border border-sky-500/30 w-fit">
                  <Lightbulb className="h-4 w-4" />
                  {t("Innovation & Tech", "नवाचार और तकनीकी")}
               </div>
               <h3 className="text-3xl font-bold mb-4 tracking-tight">
                 {t("The Engineer’s Edge", "इंजीनियर का दृष्टिकोण")}
               </h3>
               <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                 {t(
                   "Under the direct supervision of Er. Shailendra Pratap Singh, our Science and Computer labs are strictly focused on practical logic and strong engineering foundations to build the innovators of tomorrow.",
                   "इंजी. शैलेंद्र प्रताप सिंह के सीधे पर्यवेक्षण में, हमारी विज्ञान और कंप्यूटर प्रयोगशालाओं का पूरा ध्यान व्यावहारिक तर्क और कल के नवोन्मेषकों के निर्माण के लिए मजबूत इंजीनियरिंग नींव पर है।"
                 )}
               </p>
            </div>
          </div>
        </motion.div>

        {/* Resource Grid */}
        <div className="pt-12 border-t border-sky-100 dark:border-zinc-800">
           <h3 className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("Academic Resources", "शैक्षणिक संसाधन")}
           </h3>
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => (
                <div key={index} className="flex flex-col items-center p-6 text-center rounded-2xl border border-sky-100 bg-white hover:shadow-lg transition-all dark:bg-zinc-900 dark:border-zinc-800 group">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-500 mb-6 group-hover:scale-110 group-hover:bg-sky-100 transition-all dark:bg-sky-900/50 dark:group-hover:bg-sky-800/50">
                    {resource.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6">{resource.title}</h4>
                  <Button variant="ghost" className="mt-auto w-full text-sky-600 hover:text-sky-700 hover:bg-sky-50 font-semibold dark:text-sky-400 dark:hover:bg-sky-900/30">
                    <Download className="w-4 h-4 mr-2" />
                    {t("Download", "डाउनलोड करें")}
                  </Button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
