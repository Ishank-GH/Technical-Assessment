import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SecureSight Dashboard",
  description: "Technical Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html  lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors /> 
      </body>
    </html>
  );
}