import Footer from "@/components/layout/website/Footer";
import Navbar from "@/components/layout/website/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}