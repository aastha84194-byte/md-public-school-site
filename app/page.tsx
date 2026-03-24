import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { SchoolAtAGlance } from "@/components/school-at-a-glance";
import { AboutSection } from "@/components/about-section";
import { LeadershipGrid } from "@/components/leadership-grid";
import { AcademicsPreview } from "@/components/academics-preview";
import { NoticeBoard } from "@/components/notice-board";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SchoolAtAGlance />
        <LeadershipGrid />
        <AcademicsPreview />
        <NoticeBoard />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
}
