import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    id: 1,
    title: "AR/VR Mining Simulation Workshop",
    date: "2025-10-15",
    time: "10:00 AM - 4:00 PM",
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
    location: "Pantiss Campus, Rourkela, Odisha",
    description: "Validate prior skills for formal qualifications in mining and steel sectors.",
    category: "Certification",
    image: "https://images.unsplash.com/photo-1620288650879-99e24b8ff3f0?w=400&h=300&fit=crop",
    link: "/register/rpl-drive",
  },
];


const UpcomingEvents: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const filteredEvents = events.filter((event) => filter === "All" || event.category === filter);

  const categories = ["All", ...new Set(events.map((e) => e.category))];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16 bg-black relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-80 h-80 bg-green-500 rounded-full opacity-20 blur-3xl top-1/3 right-20 animate-pulse-slow delay-1000"></div>
        <div className="absolute w-56 h-56 bg-purple-500 rounded-full opacity-20 blur-3xl bottom-20 left-1/4 animate-pulse-slow delay-2000"></div>
        <div className="absolute w-72 h-72 bg-yellow-500 rounded-full opacity-20 blur-3xl bottom-10 right-1/4 animate-pulse-slow delay-3000"></div>
        <div className="absolute w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl top-1/2 left-1/2 animate-pulse-slow delay-1500"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-green-600 mb-12 animate-fade-in">
          Upcoming Events
        </h2>
        <div className="flex justify-center mb-10">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
            aria-label="Filter events by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Slider {...sliderSettings}>
          {filteredEvents.map((event) => (
            <div key={event.id} className="px-3">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up border border-gray-700">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">{event.title}</h3>
                  <p className="text-gray-300 mb-2 text-sm">
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p className="text-gray-300 mb-2 text-sm">
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="text-gray-300 mb-3 text-sm">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-gray-200 mb-4 text-base">{event.description}</p>
                  <p className="text-sm font-medium text-green-400 mb-4">{event.category}</p>
                  <a
                    href={event.link}
                    className="inline-block px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    aria-label={`Register for ${event.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
        .slick-dots li button:before {
          color: #A78BFA;
          font-size: 12px;
        }
        .slick-dots li.slick-active button:before {
          color: #F472B6;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;