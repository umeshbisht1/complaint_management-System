import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google"
import {cn} from '@/lib/utils'

const fontSans = Plus_Jakarta_Sans({
 subsets:["latin"],
  weight: ['300','400','500','700'],
  variable:'--font-sans'
});

export const metadata: Metadata = {
  title: "Complain",
  description: "Complain Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn ('min-h-screen bg-dark-300 font-sans antialiased',fontSans.variable)}
      >
        
          {children}
       
      </body>
    </html>
  );
}
