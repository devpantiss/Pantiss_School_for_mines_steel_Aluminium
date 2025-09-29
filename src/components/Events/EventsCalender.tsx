import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Date-fns setup for calendar localization
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Updated events with new ones for September and October 2025
const events = [
  {
    id: 1,
    title: "AR/VR Mining Simulation Workshop",
    date: "2025-10-15",
    time: "10:00 AM - 4:00 PM",
    start: new Date("2025-10-15T10:00:00"),
    end: new Date("2025-10-15T16:00:00"),
    location: "Pantiss Campus, Bhubaneswar, Odisha",
    description: "Hands-on training on AR/VR tools for safe mining practices, targeting youth from mining-affected villages.",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7e97?w=400&h=300&fit=crop",
    link: "/register/ar-vr-workshop",
  },
  {
    id: 2,
    title: "CSR Seminar: Sustainable Steel Production",
    date: "2025-11-05",
    time: "2:00 PM - 5:00 PM",
    start: new Date("2025-11-05T14:00:00"),
    end: new Date("2025-11-05T17:00:00"),
    location: "Virtual (Zoom)",
    description: "Explore CSR-funded programs for green steel initiatives with industry experts.",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    link: "/register/csr-seminar",
  },
  {
    id: 3,
    title: "4th Odisha Mining & Infrastructure Expo",
    date: "2026-01-22",
    time: "9:00 AM - 6:00 PM",
    start: new Date("2026-01-22T09:00:00"),
    end: new Date("2026-01-22T18:00:00"),
    location: "Bhubaneswar Exhibition Centre",
    description: "Showcasing mining tech with a Pantiss booth for RPL certifications and placements.",
    category: "Expo",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop",
    link: "https://odishaminingexpo.com/",
  },
  {
    id: 4,
    title: "Welding & Fabrication Bootcamp",
    date: "2025-12-10",
    time: "8:00 AM - 5:00 PM",
    start: new Date("2025-12-10T08:00:00"),
    end: new Date("2025-12-11T17:00:00"),
    location: "Pantiss Workshop, Angul, Odisha",
    description: "Intensive training for aluminium and steel fabrication skills for 50 participants.",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1489516983647-8abca52c7497?w=400&h=300&fit=crop",
    link: "/register/bootcamp",
  },
  {
    id: 5,
    title: "RPL Certification Drive",
    date: "2025-11-20",
    time: "9:00 AM - 3:00 PM",
    start: new Date("2025-11-20T09:00:00"),
    end: new Date("2025-11-20T15:00:00"),
    location: "Pantiss Campus, Rourkela, Odisha",
    description: "Validate prior skills for formal qualifications in mining and steel sectors.",
    category: "Certification",
    image: "https://images.unsplash.com/photo-1620288650879-99e24b8ff3f0?w=400&h=300&fit=crop",
    link: "/register/rpl-drive",
  },
  {
    id: 6,
    title: "Green Mining Workshop",
    date: "2025-03-15",
    time: "10:00 AM - 4:00 PM",
    start: new Date("2025-03-15T10:00:00"),
    end: new Date("2025-03-15T16:00:00"),
    location: "Pantiss Campus, Bhubaneswar, Odisha",
    description: "Trained 100 participants in sustainable mining practices.",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    link: "/register/green-mining",
  },
  {
    id: 7,
    title: "Mining Safety Seminar",
    date: "2025-09-10",
    time: "1:00 PM - 4:00 PM",
    start: new Date("2025-09-10T13:00:00"),
    end: new Date("2025-09-10T16:00:00"),
    location: "Virtual (Microsoft Teams)",
    description: "Discuss latest safety protocols for mining operations with industry leaders.",
    category: "Seminar",
    image: "https://images.unsplash.com/photo-14973662105479-4275897d9e21?w=400&h=300&fit=crop",
    link: "/register/mining-safety-seminar",
  },
  {
    id: 8,
    title: "Heavy Machinery Operation Bootcamp",
    date: "2025-09-20",
    time: "8:00 AM - 5:00 PM",
    start: new Date("2025-09-20T08:00:00"),
    end: new Date("2025-09-20T17:00:00"),
    location: "Pantiss Training Ground, Keonjhar, Odisha",
    description: "Hands-on training for operating heavy machinery in mining environments.",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1503387762-592afbf08ef6?w=400&h=300&fit=crop",
    link: "/register/heavy-machinery-bootcamp",
  },
  {
    id: 9,
    title: "RPL Certification Workshop",
    date: "2025-10-05",
    time: "9:00 AM - 3:00 PM",
    start: new Date("2025-10-05T09:00:00"),
    end: new Date("2025-10-05T15:00:00"),
    location: "Pantiss Campus, Rourkela, Odisha",
    description: "Certification program for experienced workers in mining and steel sectors.",
    category: "Certification",
    image: "https://images.unsplash.com/photo-1590402494587-44b71d7709c4?w=400&h=300&fit=crop",
    link: "/register/rpl-workshop",
  },
  {
    id: 10,
    title: "Sustainable Mining Expo",
    date: "2025-10-25",
    time: "10:00 AM - 6:00 PM",
    start: new Date("2025-10-25T10:00:00"),
    end: new Date("2025-10-25T18:00:00"),
    location: "Bhubaneswar Exhibition Centre",
    description: "Exhibition showcasing eco-friendly mining technologies and practices.",
    category: "Expo",
    image: "https://images.unsplash.com/photo-1516321318423-7d6b727f0b66?w=400&h=300&fit=crop",
    link: "https://sustainableminingexpo.com/",
  },
];

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  start: Date;
  end: Date;
  location: string;
  description: string;
  category: "Workshop" | "Seminar" | "Expo" | "Bootcamp" | "Certification";
  image: string;
  link: string;
}

const EventsCalendar: React.FC = () => {
  const currentDate = new Date("2025-09-22T16:26:00"); // Updated to 4:26 PM IST
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Custom event styling with vibrant category-based colors
  const eventStyleGetter = (event: Event) => {
    const isPast = event.end < currentDate;
    const categoryColors: Record<string, string> = {
      Workshop: isPast ? "#6B7280" : "#1D4ED8", // Vibrant blue for Workshops
      Seminar: isPast ? "#6B7280" : "#059669", // Emerald green for Seminars
      Expo: isPast ? "#6B7280" : "#D97706", // Amber for Expos
      Bootcamp: isPast ? "#6B7280" : "#B91C1C", // Red for Bootcamps
      Certification: isPast ? "#6B7280" : "#7C3AED", // Violet for Certifications
    };
    const style = {
      backgroundColor: categoryColors[event.category] || "#9333EA",
      borderRadius: "8px",
      opacity: isPast ? 0.5 : 1,
      color: "#FFFFFF",
      border: `2px solid ${isPast ? "#6B7280" : categoryColors[event.category]}`,
      fontSize: "14px",
      padding: "6px",
      boxShadow: isPast ? "none" : "0 2px 4px rgba(0,0,0,0.2)",
      transition: "all 0.2s ease",
    };
    return { style };
  };

  // Custom event component for richer display
  const EventComponent = ({ event }: { event: Event }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold truncate">{event.title}</span>
      <span className="text-xs opacity-80">({event.category})</span>
    </div>
  );

  // Modal for event details
  const EventModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
    if (!event) return null;
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="bg-black rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-6 border-4 border-green-600"
          />
          <h3 className="text-2xl font-bold text-purple-300 mb-4">{event.title}</h3>
          <p className="text-gray-200 mb-3">
            <strong>Date:</strong> {format(event.start, "MMMM d, yyyy")}
          </p>
          <p className="text-gray-200 mb-3">
            <strong>Time:</strong> {event.time}
          </p>
          <p className="text-gray-200 mb-3">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-200 mb-4">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="text-gray-200 mb-6">
            <strong>Category:</strong> {event.category}
          </p>
          <div className="flex justify-between items-center">
            <a
              href={event.link}
              className="inline-block bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage:
          "url('https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/06/12/Pictures/student-pradesh-education-pradeep-meerut-development-vocational_f33699a6-4f71-11e7-8a38-d46223a68388.JPG')",
      }}
    >
      <div className="bg-transparent backdrop-blur-md min-h-screen py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-green-600 mb-12 animate-fade-in">
            Event Calendar
          </h2>
          <div
            className="h-[700px] bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800"
            role="region"
            aria-label="Events Calendar"
          >
            <Calendar
              localizer={localizer}
              events={events as Event[]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              eventPropGetter={eventStyleGetter}
              components={{ event: EventComponent }}
              popup
              onSelectEvent={(event: Event) => setSelectedEvent(event)}
              className="rbc-custom-calendar"
            />
          </div>
        </div>
      </div>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .rbc-custom-calendar {
          background-color: #1F2937;
          color: #E5E7EB;
          border-radius: 12px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .rbc-custom-calendar .rbc-toolbar {
          background-color: #111827;
          border-bottom: 2px solid #374151;
          padding: 12px;
          border-radius: 8px 8px 0 0;
        }
        .rbc-custom-calendar .rbc-toolbar button {
          color: #E5E7EB;
          border: 1px solid #6B7280;
          border-radius: 6px;
          padding: 8px 16px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .rbc-custom-calendar .rbc-toolbar button:hover {
          background-color: #7C3AED;
          border-color: #7C3AED;
          color: #FFFFFF;
        }
        .rbc-custom-calendar .rbc-month-view,
        .rbc-custom-calendar .rbc-time-view {
          background-color: #1F2937;
        }
        .rbc-custom-calendar .rbc-header {
          border-bottom: 2px solid #374151;
          color: #E5E7EB;
          font-weight: 600;
          padding: 12px;
        }
        .rbc-custom-calendar .rbc-day-bg {
          background-color: #111827;
        }
        .rbc-custom-calendar .rbc-today {
          background-color: #374151;
        }
        .rbc-custom-calendar .rbc-event {
          border-radius: 8px;
          padding: 6px 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rbc-custom-calendar .rbc-event:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        @media (max-width: 640px) {
          .rbc-custom-calendar .rbc-toolbar {
            flex-direction: column;
            gap: 12px;
          }
          .rbc-custom-calendar .rbc-event {
            font-size: 12px;
            padding: 3px 6px;
          }
        }
      `}</style>
    </section>
  );
};

export default EventsCalendar;