import React from 'react'
import HeroCertification from '../../components/programmes/Certification/HeroCertification'
import CertificationOverview from '../../components/programmes/Certification/CertificationOverview'
import CertificationHighlights from '../../components/programmes/Certification/CertificationHighlights'
import CertificationSchoolsCourses from '../../components/programmes/Certification/CertificationSchoolsCourses'
import TestimonialSectionCertification from '../../components/programmes/Certification/Testimonials'

const IndustryAllignedCertificationPage: React.FC = () => {
  return (
    <div>
      <HeroCertification />
      <CertificationOverview />
      <CertificationHighlights />
      <CertificationSchoolsCourses />
      <TestimonialSectionCertification />
    </div>
  )
}

export default IndustryAllignedCertificationPage;