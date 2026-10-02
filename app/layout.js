import "./globals.css";

import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {UserProvider} from "@/context/UserContext";
import { FavoriteProvider } from "@/context/FavoriteContext";

const fontSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Svarati - Ruang Aman untuk Perempuan Indonesia",
  description:
    "Pahami hakmu, temukan amanmu. Svarati adalah ruang pribadi dan anonim bagi perempuan Indonesia, terutama penyintas kekerasan seksual, untuk memahami hak-hak, menemukan bantuan, dan melangkah menuju pemulihan.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-scroll-behavior="smooth"
      className={`dark ${fontSans.variable}` }
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <UserProvider>
          <FavoriteProvider>
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </FavoriteProvider>
        </UserProvider>
      </body>
    </html>
  );
}
