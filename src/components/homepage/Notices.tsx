import React from "react";

interface EventRow {
  event: string;
  date: string;
  location: string;
}

const eventRows: EventRow[] = [
  { event: "AI for Social Good Conference", date: "2025-09-10", location: "Bhubaneswar" },
  { event: "Sustainability Hackathon", date: "2025-09-18", location: "Cuttack" },
  { event: "MoWash CSR Summit", date: "2025-09-25", location: "Rourkela" },
  { event: "Water & Sanitation Workshop", date: "2025-10-02", location: "Berhampur" },
  { event: "Green Tech Expo", date: "2025-10-12", location: "Angul" },
  { event: "Waste Recycling Drive", date: "2025-10-20", location: "Khordha" },
  { event: "Youth Innovation Forum", date: "2025-11-05", location: "Jajpur" },
  { event: "Smart Villages Conclave", date: "2025-11-15", location: "Sambalpur" },
];

const Notices: React.FC = () => {
  return (
    <section className="relative w-full min-h-[650px] flex items-center justify-center px-6 py-12">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgtc2fvgu/image/upload/v1754069725/welder_jshef4.jpg')",
        }}
      />
      {/* Overlay - vertical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full items-center">
        {/* Left content */}
        <div className="text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Explore Upcoming <span className="text-green-600">Campus Events</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Stay updated with the latest events happening across campuses—from
            innovation summits and hackathons to sustainability workshops and
            community forums. These gatherings bring together passionate minds,
            industry leaders, and changemakers, creating opportunities to learn,
            collaborate, and inspire.
          </p>
        </div>

        {/* Right content - Table */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 backdrop-blur-md bg-white/10">
          {/* Side heading bar */}
          <div className="flex items-center justify-center py-4">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              Upcoming Events
            </h3>
          </div>

          {/* Table container */}
          <div className="p-4">
            <div className="overflow-hidden relative h-[400px] rounded-xl border border-white/20">
              <table className="w-full text-left table-fixed border-collapse">
                <thead className="bg-black text-white text-md sticky top-0 z-10">
                  <tr>
                    <th className="p-3 font-semibold">Event</th>
                    <th className="p-3 font-semibold">Date</th>
                    <th className="p-3 font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody className="animate-scroll">
                  {[...eventRows, ...eventRows].map((event, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/10 text-gray-100 hover:text-green-600 transition-colors duration-200"
                    >
                      <td className="p-3 text-md truncate">{event.event}</td>
                      <td className="p-3 text-md">{event.date}</td>
                      <td className="p-3 text-md">{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes scroll-events {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-scroll {
            animation: scroll-events 20s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default Notices;
