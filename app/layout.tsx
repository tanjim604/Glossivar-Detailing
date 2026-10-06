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

const SITE_URL = "https://www.glossivadetailing.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Glossiva Detailing | Premium Mobile Automotive & Marine Detailing",
    template: "%s | Glossiva Detailing",
  },
  description:
    "100% mobile car and boat detailing in Kamloops, BC. Complete interior & exterior vehicle detailing, boat detailing and monthly maintenance plans, brought to your driveway, dock or marina. Call (604) 782-9107.",
  applicationName: "Glossiva Detailing",
  keywords: [
    "Kamloops mobile car detailing",
    "Kamloops boat detailing",
    "mobile detailing Kamloops",
    "car detailing Kamloops",
    "interior detailing",
    "exterior detailing",
    "monthly car maintenance",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Glossiva Detailing | Premium Mobile Detailing",
    description:
      "100% Mobile Service — We Come To You! Professional mobile car and boat detailing in Kamloops, brought straight to your driveway or dock.",
    url: SITE_URL,
    siteName: "Glossiva Detailing",
    images: [{ url: "/icon.png", alt: "Glossiva Detailing Logo" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossiva Detailing | Premium Mobile Detailing",
    description:
      "100% mobile car and boat detailing in Kamloops, BC. We come to you.",
    images: ["/icon.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  "@id": `${SITE_URL}/#business`,
  name: "Glossiva Detailing",
  url: SITE_URL,
  image: `${SITE_URL}/icon.png`,
  logo: `${SITE_URL}/icon.png`,
  telephone: "+1-604-782-9107",
  priceRange: "$$",
  areaServed: { "@type": "City", name: "Kamloops", containedInAddress: { "@type": "AdministrativeArea", name: "British Columbia" } },
  address: { "@type": "PostalAddress", addressLocality: "Kamloops", addressRegion: "BC", addressCountry: "CA" },
  currenciesAccepted: "CAD",
  description:
    "100% mobile car and boat detailing in Kamloops, BC, performed at your driveway, dock or marina.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Detailing Services",
    itemListElement: [
      { name: "Showroom Interior & Exterior Detail", price: "200" },
      { name: "Marine Detailing", price: "40" },
      { name: "Monthly Maintenance (per service)", price: "30" },
    ].map(({ name, price }) => ({
      "@type": "Offer",
      priceCurrency: "CAD",
      price,
      itemOffered: { "@type": "Service", name },
    })),
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
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}