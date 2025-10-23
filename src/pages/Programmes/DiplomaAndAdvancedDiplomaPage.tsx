import React from 'react'
import DiplomaHero from '../../components/programmes/DiplomaAndAdvancedDiploma/Hero'
import DiplomaOverview from '../../components/programmes/DiplomaAndAdvancedDiploma/DiplomaOverview'
import DiplomaSchoolsCourses from '../../components/programmes/DiplomaAndAdvancedDiploma/DiplomaSchoolsCourses'
import DiplomaHighlights from '../../components/programmes/DiplomaAndAdvancedDiploma/DiplomaHighlights'
import TestimonialSectionDiploma from '../../components/programmes/DiplomaAndAdvancedDiploma/Testimonials'

const DiplomaAndAdvancedDiplomaPage: React.FC = () => {
  return (
    <div>
      <DiplomaHero />
      <DiplomaOverview />
      <DiplomaSchoolsCourses />
      <DiplomaHighlights />
      <TestimonialSectionDiploma />
    </div>
  )
}

export default DiplomaAndAdvancedDiplomaPage