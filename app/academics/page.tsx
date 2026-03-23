import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AcademicsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50 dark:bg-black">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-khand text-sky-950 dark:text-sky-50 mb-4">Academics Section</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Detailed curriculum and syllabus information coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
