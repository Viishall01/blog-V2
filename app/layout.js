import localFont from "next/font/local";
import "./globals.css";
import  Headuo  from "@/components/Headuo";
import  Sessionu  from "@/components/Session";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "@viishall.01",
  description: "Created by Vishal Vishwakarma",
};

export default function RootLayout({ children }) {
  return (
    <Sessionu>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Headuo/>
        {children}
      </body>
    </html>
    </Sessionu>
  );
}
