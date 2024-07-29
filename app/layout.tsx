import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Project - iPhone 15 Website Template",
  description:
    "This is a personal project that is built to mimic the iPhone 15 website to showcase animation and 3d effects",
  icons: {
    icon: [
      {
        url: "/assets/images/apple.svg",
        href: "/assets/images/apple.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
