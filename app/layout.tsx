import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Blog | SEO Optimized Articles",
  description: "A fast, SEO-optimized tech blog built with Next.js",
  openGraph: {
    title: "Tech Blog",
    description: "Latest tech articles and insights",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog",
    description: "SEO optimized tech articles",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
