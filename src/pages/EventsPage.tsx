import React from 'react'
import EventsHero from '../components/Events/EventsHero'
import UpcomingEvents from '../components/Events/UpcomingEvents'
import EventsCalendar from '../components/Events/EventsCalender'
import PastEventsHighlights from '../components/Events/PastEventsHighlights'
import RegistrationNewsletter from '../components/Events/RegistrationNewsletter'
import FooterCTA from '../components/Events/FooterCTA'

const EventsPage: React.FC = () => {
  return (
    <div>
        <EventsHero />
        <UpcomingEvents />
        <EventsCalendar />
        <PastEventsHighlights />
        <RegistrationNewsletter />
        <FooterCTA />
    </div>
  )
}

export default EventsPage