import React from "react";
import HeroSection from "../components/homepage/Hero";
import OverLappingCards2 from "../components/homepage/OverLappingCards2";
import SolutionCards from "../components/homepage/SolutionCards";
import SectorsAccordion from "../components/homepage/SectorsAccordion";
import FleetSection from "../components/homepage/FleetSection";
import PlacementsSection from "../components/homepage/PlacementsSection";
import CampusExperienceSection from "../components/homepage/CampusExperienceSection";
import Ranking from "../components/homepage/Ranking";
import ExplorePrograms from "../components/homepage/ExplorePrograms";
import OurFuturisticApproach from "../components/homepage/OurFuturisticApproach";
import Why from "../components/Academics/Why";
import SkillDevelopmentSection from "../components/homepage/SkillDevelopmentSection";
import TestimonialSection from "../components/homepage/TestimonialSection";
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
