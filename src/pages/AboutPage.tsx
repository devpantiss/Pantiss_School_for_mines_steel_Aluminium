import React from 'react'
import AboutHero from '../components/About/AboutHero'
import AboutSection from '../components/About/AboutSection'
import PhilosophySection from '../components/About/PhilosophySection'
import Ranking from '../components/homepage/Ranking'
import Partners from '../components/About/Partners'
import BannerSection from '../components/About/BannerSection'
import DirectorsDesk from '../components/About/DirectorsDesk'

const AboutPage: React.FC = () => {
  return (
    <div>
        <AboutHero />
        <AboutSection />
        <Ranking />
        <PhilosophySection />
        <BannerSection />
        <Partners />
        <DirectorsDesk />
    </div>
  )
}

export default AboutPage