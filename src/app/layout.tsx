import type { Metadata } from "next";
import { Georama } from "next/font/google";
import "./globals.css";

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Padose Brand Engine — Turn Your Product Into a Brand",
  description:
    "Upload a photo of your product. Get a complete branding kit — logo, label, descriptions, social media posts — in 30 seconds. Start selling like a brand.",
  openGraph: {
    title: "Padose Brand Engine",
    description: "Turn any homemade product into a professional brand in 30 seconds",
    url: "https://padose.com/brand",
    siteName: "Padose",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${georama.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-georama), Inter, sans-serif" }}>
        {/* Header — matches Padose main site */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between">
            <a href="/brand" className="flex items-center gap-2">
              <span className="font-bold text-xl" style={{ color: "var(--primary)" }}>
                padose
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(0,31,96,0.08)",
                  color: "var(--primary)",
                  letterSpacing: "0.5px",
                }}
              >
                Brand Engine
              </span>
            </a>
            <nav className="hidden sm:flex items-center gap-8">
              <a
                href="https://padose.com"
                className="text-sm font-medium hover:opacity-70 transition"
                style={{ color: "var(--gray-600)" }}
              >
                Home
              </a>
              <a
                href="/brand/create"
                className="btn-primary text-sm"
              >
                Create Brand
              </a>
            </nav>
            <a href="/brand/create" className="sm:hidden btn-accent text-sm py-2 px-4">
              Start
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer — matches Padose dark footer */}
        <footer style={{ background: "var(--gray-900)" }} className="mt-auto">
          <div className="max-w-[1280px] mx-auto px-6 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="font-bold text-lg text-white">padose</span>
                <span className="text-xs ml-2" style={{ color: "var(--gray-400)" }}>
                  Brand Engine
                </span>
              </div>
              <div className="flex gap-6 text-sm" style={{ color: "var(--gray-400)" }}>
                <a href="https://padose.com" className="hover:text-white transition">Home</a>
                <a href="https://padose.com/for-sellers" className="hover:text-white transition">For Sellers</a>
                <a href="https://padose.com/privacy-policy" className="hover:text-white transition">Privacy</a>
                <a href="https://padose.com/terms-and-conditions" className="hover:text-white transition">Terms</a>
              </div>
            </div>
            <div
              className="mt-8 pt-6 text-center text-sm"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "var(--gray-500)" }}
            >
              Helping local sellers build real brands.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
