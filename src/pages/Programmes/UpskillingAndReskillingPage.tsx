import React from 'react';
import UpskillingHero from '../../components/programmes/UpskillingAndReskilling/Hero';
import UpskillReskillHighlights from '../../components/programmes/UpskillingAndReskilling/UpskillingHighlights';
import UpskillReskillOverview from '../../components/programmes/UpskillingAndReskilling/UpskillingOverview';
import UpskillingReskillingSchoolsCourses from '../../components/programmes/UpskillingAndReskilling/UpskillingSchoolsCourses'
import TestimonialSectionUpskilling from '../../components/programmes/UpskillingAndReskilling/Testimonials';

const UpskillingAndReskillingPage: React.FC = () => {
  return (
    <div>
      <UpskillingHero />
      <UpskillReskillOverview />
      <UpskillReskillHighlights />
      <UpskillingReskillingSchoolsCourses />
      <TestimonialSectionUpskilling />
    </div>
  )
}

export default UpskillingAndReskillingPage