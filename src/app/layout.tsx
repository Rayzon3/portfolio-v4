// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CRTOverlay from "@/components/CRTOverlay";

const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.woff",
  variable: "--font-departure-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rahul Bhardwaj - Software Engineer",
  icons: {
    icon: "https://api.dicebear.com/9.x/big-smile/svg?skinColor=f5d7b1&mouth=openedSmile&hairColor=220f00&hair=shortHair&eyes=winking&backgroundColor=b6e3f4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${departureMono.variable} antialiased relative`}>
        <CRTOverlay />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
