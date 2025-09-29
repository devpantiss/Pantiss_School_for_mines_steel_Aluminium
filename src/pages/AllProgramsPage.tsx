import React from 'react'
import ProgrammesHero from '../components/programmes/ProgrammesHero'
import ProgrammesCategory from '../components/programmes/ProgrammesCategory'
import JobRolesMarquee from '../components/programmes/JobRolesMarquee'
import ProgrammesBanner from '../components/programmes/Banner'
import ProgramTimeline from '../components/programmes/Timeline'
import WhyProgrammesBanner from '../components/programmes/WhyProgrammes'
// import FeaturedProgrammes from '../components/programmes/FeaturedProgrammes'

const AllProgramsPage: React.FC = () => {
  return (
    <div>
      <ProgrammesHero />
      <ProgrammesCategory />
      <ProgrammesBanner />
      <JobRolesMarquee />
      <WhyProgrammesBanner />
      <ProgramTimeline />
      {/* <FeaturedProgrammes /> */}
    </div>
  )
}

export default AllProgramsPage