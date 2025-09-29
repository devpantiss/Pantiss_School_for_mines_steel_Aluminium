import React from "react";

const EventsHero: React.FC = () => {
  return (
    <section
      className="relative h-screen overflow-hidden"
      role="banner"
      aria-label="Events Hero Banner"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1558618047-3c8c76ca7e97?w=1920"
      >
        <source
          src="https://res.cloudinary.com/djtzx6wo7/video/upload/v1758535962/41823-431406517_u5gl8b.mp4"
          type="video/mp4"
        />
      </video>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-green-600 mb-4 animate-fade-in">
          Upcoming Events at Pantiss
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl mb-6 animate-slide-up">
          Join our workshops, seminars, and expos to empower Odisha's youth in mining, steel, and aluminium industries.
        </p>
        <a
          href="#events"
          className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="View Upcoming Events"
        >
          Explore Events
        </a>
      </div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          animation-delay: 0.2s;
        }
        @media (max-width: 640px) {
          video {
            object-fit: cover;
          }
        }
      `}</style>
    </section>
  );
};

export default EventsHero;