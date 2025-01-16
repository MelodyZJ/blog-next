import type { Metadata } from "next";
import { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LayoutContextProvider } from "@store/layoutStore";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "瓶中星辰的博客",
  description: "瓶中星辰的个人博客站，记录生活，分享知识",
  keywords: ["瓶中星辰博客", "瓶中星辰的博客", "瓶中星辰", "博客", "个人博客"],
  authors: [{ name: "瓶中星辰", url: "" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <LayoutContextProvider>
          <NavBar />
          {children}
          <Footer />
        </LayoutContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
