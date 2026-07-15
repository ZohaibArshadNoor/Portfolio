import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { SITE } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Software Engineer",
    "FastAPI",
    "React",
    "Portfolio",
    "Karachi",
    "Zohaib Arshad Noor",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/zan-logo.svg", type: "image/svg+xml" },
      { url: "/icons/zan-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/icons/zan-logo.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  jobTitle: SITE.title,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: [SITE.github, SITE.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bahria University",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Engineering",
    "Backend Development",
    "FastAPI",
    "React",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('zan-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(t);r.setAttribute('data-theme',t);r.style.colorScheme=t}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analytics hook — replace with GA / Plausible when ready */}
        {/* <Script src="https://plausible.io/js/script.js" data-domain="yourdomain.com" strategy="afterInteractive" /> */}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-bg text-text antialiased`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
