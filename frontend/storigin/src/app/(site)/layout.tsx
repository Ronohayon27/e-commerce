import Header from "@/components/Header";
import "../globals.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center flex-col pb-10 pt-10">
      <Header/>
      {children}
    </div>
  );
}
