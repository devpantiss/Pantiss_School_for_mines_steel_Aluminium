import React from "react";

const pastEvents = [
  {
    id: 1,
    title: "RPL Certification Drive 2025",
    description: "Skilled 150 youth in mining and steel sectors with formal qualifications.",
    image: "https://images.unsplash.com/photo-1489516983647-8abca52c7497?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "CSR Workshop: Green Mining",
    description: "Trained 100 participants in sustainable mining practices.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Aluminium Fabrication Bootcamp",
    description: "Empowered 80 youth with hands-on skills in aluminium fabrication.",
    image: "https://images.unsplash.com/photo-1620288650879-99e24b8ff3f0?w=600&h=450&fit=crop",
  },
  {
    id: 4,
    title: "Mining Safety Training 2024",
    description: "Conducted safety protocols training for 120 workers in Odisha mines.",
    image: "https://images.unsplash.com/photo-1503387762-592afbf08ef6?w=600&h=420&fit=crop",
  },
  {
    id: 5,
    title: "Steel Welding Intensive",
    description: "Trained 90 participants in advanced steel welding techniques.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=480&fit=crop",
  },
  {
    id: 6,
    title: "AR/VR Mining Tech Expo",
    description: "Showcased AR/VR innovations for mining to 200 attendees.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7e97?w=600&h=460&fit=crop",
  },
  {
    id: 7,
    title: "Sustainable Steel Seminar",
    description: "Discussed green steel initiatives with 150 industry professionals.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=440&fit=crop",
  },
];

// interface PastEvent {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

const PastEventsHighlights: React.FC = () => {
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
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 animate-fade-in">
          Past Events Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="relative group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-up"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-center p-6">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">{event.title}</h3>
                  <p className="text-gray-200 text-base leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      `}</style>
    </section>
  );
};

export default PastEventsHighlights;