import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SessionUserProvider } from "@/context/SessionUserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wayshare",
  description: "Book your ride now!!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={metadata.description} />
          <title>{metadata.title}</title>
        </head>
        <body
          className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionUserProvider>
            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
              {children}
            </div>
          </SessionUserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
