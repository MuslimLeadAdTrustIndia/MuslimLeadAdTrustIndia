import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import OurAimsSection from "./components/OurAimsSection";
import PrisonersAndSupportSection from "./components/PrisonersAndSupportSection";
import RecentLegalActionsSection from "./components/RecentLegalActionsSection";
import GallerySection from "./components/GallerySection";
import DonationSection from "./components/DonationSection";
import Footer from "./components/Footer";
import {
  getSiteContent,
  getHomeStats,
  getLegalActions,
  getGalleryImages,
} from "./lib/server/content";

export const instant = false;

export default async function Home() {
  const [hero, stats, about, donation, legalActions, gallery] = await Promise.all([
    getSiteContent("home_hero", {}),
    getHomeStats(),
    getSiteContent("home_about", {}),
    getSiteContent("home_donation_banner", {}),
    getLegalActions(),
    getGalleryImages(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1">
        <HeroSection hero={hero} stats={stats} />
        <AboutSection about={about} />
        <OurAimsSection />
        <PrisonersAndSupportSection />
        <RecentLegalActionsSection cases={legalActions} />
        <GallerySection images={gallery} />
        <DonationSection donation={donation} />
      </main>
      <Footer />
    </div>
  );
}
