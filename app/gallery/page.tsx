import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilteredGallery } from "@/components/filtered-gallery";

export const metadata = {
  title: "Gallery | M.D. Public Inter College",
  description: "View the campus gallery, student life, and faculty of M.D. Public Inter College.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-16">
        <FilteredGallery />
      </main>
      <Footer />
    </div>
  );
}
