import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import { Navigation } from "./components/Navigation";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travelmate - Your Travel Companion",
  description: "Plan, organize, and share your travel experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} text-slate-900 antialiased`}>
        <AuthProvider>
          <Navigation />
          <main className="pt-2">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
