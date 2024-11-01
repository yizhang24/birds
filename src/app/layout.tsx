import "@/styles/globals.css";
import { plex_mono } from "@/styles/fonts";
import TopNav from "@/components/topNav";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${plex_mono.variable} antialiased`} lang="en">
      <body className="flex flex-col h-screen">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
