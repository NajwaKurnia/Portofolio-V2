import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import About from "./about/page";
import Footer from "@/components/Footer";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Najwa Portofolio",
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-center" 
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid rgba(34,197,94,0.25)",
            },
          },
          error: {
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid rgba(239,68,68,0.25)",
            },
          },
        }}/>
      </body>
    </html>
  );
}
