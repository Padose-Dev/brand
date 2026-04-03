import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Padose Brand Engine — Turn Your Product Into a Brand",
  description:
    "Upload a photo of your product. Get a complete branding kit — logo, label, descriptions, social media posts — in 30 seconds. Start selling like a brand.",
  openGraph: {
    title: "Padose Brand Engine",
    description: "Turn any homemade product into a professional brand in 30 seconds",
    url: "https://brand.padose.com",
    siteName: "Padose",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-amber-50/30">
        <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-amber-900 tracking-tight">
              Padose <span className="text-amber-600 font-normal text-sm">Brand Engine</span>
            </a>
            <nav className="hidden sm:flex gap-6 text-sm text-amber-800">
              <a href="/pricing" className="hover:text-amber-600">Pricing</a>
              <a href="/gallery" className="hover:text-amber-600">Gallery</a>
              <a href="/create" className="bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition">
                Create Brand
              </a>
            </nav>
            <a href="/create" className="sm:hidden bg-amber-600 text-white px-4 py-1.5 rounded-full text-sm">
              Start
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-amber-200/50 bg-white/60 py-6 mt-auto">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-amber-700/60">
            Padose Brand Engine — Helping local sellers build real brands.
          </div>
        </footer>
      </body>
    </html>
  );
}
