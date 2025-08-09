import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FaultyTerminal from "@/components/FaultyTerminal/FaultyTerminal";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${departureMono.variable} antialiased relative`}>
        <div className="fixed inset-0 z-0">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#A7EF9E"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={true}
            brightness={0.5}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
