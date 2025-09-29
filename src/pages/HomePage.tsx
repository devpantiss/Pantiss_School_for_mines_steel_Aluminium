import React from "react";
import HeroSection from "../components/homepage/Hero";
import SectorsAccordion from "../components/homepage/SectorsAccordion";
import FleetSection from "../components/homepage/FleetSection";
import PlacementsSection from "../components/homepage/PlacementsSection";
import CampusExperienceSection from "../components/homepage/CampusExperienceSection";
import OurFuturisticApproach from "../components/homepage/OurFuturisticApproach";
import Why from "../components/homepage/Why";
import ProgramPreview from "../components/homepage/ProgramPreview";
import Notices from "../components/homepage/Notices";
import ImpactSection from "../components/homepage/ImpactSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <SectorsAccordion />
      <Why />
      <ProgramPreview />
      <PlacementsSection />
      <OurFuturisticApproach />
      <ImpactSection />
      <FleetSection />
      <Notices />
      <CampusExperienceSection />

      {/* <SolutionCards />
      <OverLappingCards2 />
      <Ranking />
      <SkillDevelopmentSection />
      <TestimonialSection />
      <ExplorePrograms /> */}
    </div>
  );
};

export default HomePage;
