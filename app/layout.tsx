import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Clock Mobile', description: 'A minimal mobile clock dashboard with world clocks, timer and stopwatch.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
