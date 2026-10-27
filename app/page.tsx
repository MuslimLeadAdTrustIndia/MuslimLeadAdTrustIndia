import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import OurAimsSection from "./components/OurAimsSection";
import PrisonersAndSupportSection from "./components/PrisonersAndSupportSection";
import RecentLegalActionsSection from "./components/RecentLegalActionsSection";
import GallerySection from "./components/GallerySection";
import DonationSection from "./components/DonationSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <OurAimsSection />
        <PrisonersAndSupportSection />
        <RecentLegalActionsSection />
        <GallerySection />
        <DonationSection />
      </main>
      <Footer />
    </div>
  );
}
