import { GraduationCap, Users, Languages, School, Home, Clock, Award } from "lucide-react";

export function SchoolAtAGlance() {
  const features = [
    {
      title: "Board",
      description: "Primary & Secondary: UP Board (State Board)",
      icon: GraduationCap,
    },
    {
      title: "Gender",
      description: "Co-Educational (For all genders)",
      icon: Users,
    },
    {
      title: "Medium",
      description: "Bilingual: Hindi & English",
      icon: Languages,
    },
    {
      title: "Grades",
      description: "Classes 1st to 12th",
      icon: School,
    },
    {
      title: "Type",
      description: "Day School (Non-Residential)",
      icon: Home,
    },
    {
      title: "Shift",
      description: "Regular Single Shift",
      icon: Clock,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white selection:bg-sky-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            School at a Glance
          </h2>
          <div className="w-20 h-1 bg-sky-200 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-sky-100 hover:bg-sky-200 border border-sky-200 hover:border-sky-300 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-sky-300/50 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-center p-6 sm:p-8 group cursor-default"
              >
                <div className="mb-4 p-4 bg-white/80 group-hover:bg-sky-500 rounded-full transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                  <Icon className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-sky-950 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-slate-800 transition-colors duration-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 md:mt-12 text-center flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white border border-sky-100 px-5 py-3 rounded-full shadow-[0_2px_10px_-3px_rgba(14,165,233,0.15)] text-slate-700 font-medium hover:shadow-[0_4px_14px_-3px_rgba(14,165,233,0.2)] transition-shadow duration-300">
            <Award className="w-5 h-5 text-sky-500" strokeWidth={1.5} />
            <span className="text-base tracking-wide">Government Recognized <span className="text-slate-500 text-sm font-normal">(मान्यता प्राप्त)</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
