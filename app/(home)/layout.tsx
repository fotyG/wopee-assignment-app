import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wopee Talent App",
  description: "Developed overnight by a crazy man - foty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class">
            <ToastProvider />
            <div className="h-full">
              <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56 dark:bg-slate-800">
                <Navbar />
              </div>
              <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
                <Sidebar />
              </div>
              <main className="h-full pt-[80px] md:pl-56 dark:bg-slate-800 ">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
