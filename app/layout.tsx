import type { Metadata } from "next";
import { Geist, Geist_Mono, Khand, Mukta } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/lib/auth-hooks";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const khand = Khand({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-khand",
  subsets: ["devanagari", "latin"],
});

const mukta = Mukta({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "M.D. Public Inter College",
  description: "Official Homepage of M.D. Public Inter College, Sirsaganj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${khand.variable} ${mukta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col pt-0 font-sans">
        <ToastProvider>
          <AuthProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
