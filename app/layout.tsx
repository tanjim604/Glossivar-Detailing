import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glossiva Detailing | Premium Mobile Automotive & Marine Detailing",
  description:
    "100% Mobile Service — We Come To You! Professional automotive detailing, ceramic coatings, and marine restoration brought straight to your driveway, dock, or marina.",
  metadataBase: new URL("https://glossivadetailing.com"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Glossiva Detailing | Premium Mobile Detailing",
    description:
      "100% Mobile Service — We Come To You! Professional automotive detailing and marine restoration brought straight to your driveway or dock.",
    url: "https://glossivadetailing.com",
    siteName: "Glossiva Detailing",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Glossiva Detailing Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossiva Detailing | Premium Mobile Detailing",
    description:
      "100% Mobile Service — We Come To You! Professional automotive detailing and marine restoration.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}