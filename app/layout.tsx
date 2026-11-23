import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clock UI — Time Widgets",
  description: "A minimalist dashboard of time widgets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}