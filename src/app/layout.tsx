import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Archer Studio® — Design that hits the target | 设计直击痛点",
  description:
    "Archer Studio is a digital agency shaping first impressions — brand, film, web and marketing for companies that know perception is what sets them apart. 品牌、影像、网页与营销，设计直击痛点。",
  keywords: [
    "Archer Studio",
    "digital agency",
    "brand identity",
    "web design",
    "3D design",
    "film",
    "marketing",
    "设计直击痛点",
    "数字代理",
  ],
  other: {
    google: "notranslate",
  },
  authors: [{ name: "Archer Studio" }],
  openGraph: {
    title: "Archer Studio® — Design that hits the target",
    description:
      "Brand, film, web and marketing — shaped with archer's precision. 设计直击痛点®",
    type: "website",
    siteName: "Archer Studio",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className="notranslate bg-[#0a0a0b]"
    >
      <body
        className={`${anton.variable} ${grotesk.variable} ${notoSansSC.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
