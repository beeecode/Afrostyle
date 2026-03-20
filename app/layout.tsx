import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afrostyle",
  description: "Nigerian tailoring marketplace platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-afs-black">
        {children}
      </body>
    </html>
  );
}
