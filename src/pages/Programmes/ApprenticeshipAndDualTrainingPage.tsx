import React from 'react'
import DualTrainingHero from '../../components/programmes/DualTraining/Hero'
import DualTrainingHighlight from '../../components/programmes/DualTraining/Highlights'
import DualTrainingOverview from '../../components/programmes/DualTraining/DualTrainingOverview'
import DualTrainingSchoolsCarousel from "../../components/programmes/DualTraining/SchoolsCourses"
import TestimonialSectionDualTraining from '../../components/programmes/DualTraining/Testimonials'

const ApprenticeshipAndDualTrainingPage: React.FC = () => {
  return (
    <div>
      <DualTrainingHero />
      <DualTrainingOverview />
      <DualTrainingHighlight />
      <DualTrainingSchoolsCarousel />
      <TestimonialSectionDualTraining />
    </div>
  )
}

export default ApprenticeshipAndDualTrainingPage