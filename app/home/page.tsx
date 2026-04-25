import HeroSection from "./hero/hero-section";
import NavBar from "./lib/nav-bar";
import TrustBar from "./lib/trust-bar";
import EngineeringDifference from "./about/about-section";
import ContactSection from "./contact/form";
import StarsWrapper from "./canvas/StarsWrapper";
import ServiceSection from "./services/service-section";
import ProjectSection from "./projexts/project-section";

export default function HomePageSection() {
  return (
    <main className="w-full h-full">
      <NavBar />
      <HeroSection />
      <TrustBar />
      <EngineeringDifference />
      <ServiceSection />
      <ProjectSection />

      <div className="relative z-0">
        <StarsWrapper />
        <ContactSection />
      </div>
    </main>
  );
}
