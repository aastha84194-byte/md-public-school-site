import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Quote, Briefcase, GraduationCap, Award } from "lucide-react";

export default function ManagerProfile() {
  const experiences = [
    {
      year: "2013 - Present",
      role: "Manager",
      organization: "M.D. Public Inter College",
      description: "Leading the modernization and technical advancement of rural education, implementing scalable infrastructure for digital learning.",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      year: "Experience",
      role: "Systems & Electronics Engineer",
      organization: "U.P. Pollution Control Board (UPPCB)",
      description: "Leveraged technical expertise for state-level environmental monitoring projects and system evaluations.",
      icon: <Award className="w-5 h-5" />
    },
    {
      year: "Education",
      role: "B.Tech (Electronics & Communication)",
      organization: "Project collaboration with IIT Kanpur",
      description: "Built a strong foundation in innovative problem-solving, hardware design, and systems engineering.",
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-sky-50 dark:bg-sky-950/20 py-20 border-b border-sky-100 dark:border-sky-900 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-sky-400 rounded-full blur-2xl opacity-20 transform scale-110" />
              <div className="h-48 w-48 md:h-64 md:w-64 rounded-full border-4 border-white shadow-xl overflow-hidden relative z-10 bg-white">
                <Image 
                  src="/shailendra.jpeg" 
                  alt="Er. Shailendra Pratap Singh" 
                  width={256} 
                  height={256} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="text-center md:text-left text-sky-950 dark:text-sky-50">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-200/50 text-sky-800 text-sm font-bold tracking-widest mb-4 uppercase drop-shadow-sm font-mukta">
                Leadership Profile
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-khand tracking-tight mb-2">Er. Shailendra Pratap Singh</h1>
              <p className="text-xl md:text-2xl text-secondary font-bold uppercase tracking-wider mb-6">Manager</p>
              
              <div className="relative max-w-2xl mx-auto md:mx-0">
                <Quote className="absolute -top-4 -left-6 w-10 h-10 text-sky-300/30 rotate-180 hidden md:block" />
                <p className="text-lg md:text-xl font-medium text-sky-800/80 dark:text-sky-200 leading-relaxed font-mukta">
                  "Education is the most powerful weapon which you can use to change the world. Our mission is to blend traditional values with modern technical excellence to empower the youth of Sirsaganj."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl font-bold font-khand text-sky-950 dark:text-sky-50 mb-4">Professional Journey</h2>
              <div className="h-1 w-16 bg-secondary rounded mx-auto md:mx-0" />
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-sky-300 before:via-sky-200 before:to-transparent">
              
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-zinc-950 bg-sky-100 text-sky-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:bg-secondary group-hover:text-white">
                     {exp.icon}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 group-hover:border-sky-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sky-900 dark:text-sky-100 text-xl font-mukta">{exp.role}</span>
                      <span className="text-sm font-bold text-secondary flex-shrink-0">{exp.year}</span>
                    </div>
                    <div className="text-sky-700 dark:text-sky-300 font-semibold text-sm mb-3 uppercase tracking-wider">{exp.organization}</div>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
