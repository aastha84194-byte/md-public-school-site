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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-sky-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center p-5 sm:p-6 group"
              >
                <div className="mb-3 p-3 bg-sky-50 rounded-full group-hover:bg-sky-100 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-sky-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-snug">{feature.description}</p>
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
