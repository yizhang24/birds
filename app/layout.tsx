import "@/app/ui/globals.css";
import { plex_mono } from "@/app/ui/fonts";
import TopNav from "@/app/ui/topnav";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${plex_mono.variable} antialiased`} lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
