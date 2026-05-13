import type { Metadata } from "next";
import { poppins, jetbrains } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import Reveals from "@/components/motion/Reveals";
import LoadingOverlay from "@/components/motion/LoadingOverlay";

export const metadata: Metadata = {
  title: "X Group — Global Sourcing. Seamless Delivery.",
  description:
    "Strategic global sourcing — curating products, partners, and innovation across continents, delivered to local markets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrains.variable}`}>
      <body>
        <LoadingOverlay />
        <SmoothScroll />
        <Cursor />
        <Reveals />
        {children}
      </body>
    </html>
  );
}
