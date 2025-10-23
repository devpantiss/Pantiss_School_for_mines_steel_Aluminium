import React from 'react'
import RplHero from '../../components/programmes/RPL/Hero'
import RplHighlights from '../../components/programmes/RPL/Highlights'
import SchoolsCourses from '../../components/programmes/RPL/SchoolsCourses'
import RplOverview from '../../components/programmes/RPL/RplOverview'
import TestimonialSectionRpl from '../../components/programmes/RPL/Testimonials'

const RecognitionofPriorLearningPage: React.FC = () => {
  return (
    <div>
        <RplHero />
        <RplOverview />
        <SchoolsCourses />
        <RplHighlights />
        <TestimonialSectionRpl />
    </div>
  )
}

export default RecognitionofPriorLearningPage