"use client";

import { useLanguage } from "./language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bell, Calendar } from "lucide-react";

export function NoticeBoard() {
  const { t } = useLanguage();

  const notices = [
    {
      date: t("March 15, 2026", "१५ मार्च २०६"),
      title: t("Admissions Open for 2026-27 session.", "सत्र 2026-27 के लिए प्रवेश प्रारंभ।"),
      isNew: true,
    },
    {
      date: t("March 10, 2026", "१० मार्च २०६"),
      title: t("Annual Sports Meet Scheduled for next month.", "अगले महीने वार्षिक खेलकूद प्रतियोगिता निर्धारित।"),
      isNew: false,
    },
    {
      date: t("March 05, 2026", "०५ मार्च २०६"),
      title: t("Board Exam Results to be announced soon.", "बोर्ड परीक्षा के परिणाम जल्द ही घोषित किए जाएंगे।"),
      isNew: false,
    },
    {
      date: t("February 28, 2026", "२८ फरवरी २०६"),
      title: t("Science Exhibition winners announced.", "विज्ञान प्रदर्शनी के विजेताओं की घोषणा।"),
      isNew: false,
    },
  ];

  return (
    <section id="academics" className="bg-white py-24 dark:bg-black font-mukta">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl text-balance font-khand">
              {t("Academics & Updates", "शिक्षाविद और अपडेट")}
            </h2>
            <div className="mt-4 h-1 w-20 rounded bg-secondary" />
            <p className="mb-8 mt-4 text-lg text-muted-foreground">
              {t(
                "Stay informed with the latest announcements, events, and academic schedules of M.D. Public Inter College.",
                "एम. डी. पब्लिक इण्टर कॉलेज की नवीनतम घोषणाओं, कार्यक्रमों और शैक्षणिक कार्यक्रमों के साथ सूचित रहें।"
              )}
            </p>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop" 
                alt="School Building" 
                className="rounded-2xl object-cover shadow-2xl h-[300px] w-full"
              />
            </div>
          </div>

          <Card className="overflow-hidden border-zinc-200 bg-white/50 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50 rounded-2xl">
            <CardHeader className="bg-primary px-6 py-5">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-white tracking-widest uppercase font-khand">
                <Bell className="h-6 w-6 text-secondary" />
                {t("Notice Board", "सूचना पट्ट")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] overflow-y-auto p-4 custom-scrollbar">
                <div className="flex flex-col gap-4">
                  {notices.map((notice, i) => (
                    <div 
                      key={i} 
                      className="group relative flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:border-secondary/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      {notice.isNew && (
                        <span className="absolute -right-2 -top-2 flex h-6 w-12 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm animate-pulse tracking-wider">
                          {t("NEW", "नया")}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs font-bold uppercase text-secondary">
                        <Calendar className="h-3.5 w-3.5" />
                        {notice.date}
                      </div>
                      
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors text-balance">
                        {notice.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
