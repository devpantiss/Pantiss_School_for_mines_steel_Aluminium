import React from "react";

const BannerSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-[500px] sm:h-[600px] bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://res.cloudinary.com/djtzx6wo7/image/upload/v1758384859/wrongtog-PTIHdN4NDI8-unsplash_i8hyyy.jpg')", // High-tech industrial scene
      }}
      role="banner"
      aria-label="About Pantiss School Banner"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://res.cloudinary.com/djtzx6wo7/image/upload/v1758384859/wrongtog-PTIHdN4NDI8-unsplash_i8hyyy.jpg')",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-green-600 mb-4 animate-fade-in">
          Innovate. Skill. Succeed.
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 animate-slide-up">
          Step into the future with Pantiss School's advanced training programs, leveraging AR/VR and simulator technologies to prepare you for leadership in mining, steel, and aluminium industries.
        </p>
        <a
          href="/programs"
          className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Explore Pantiss School Programs"
        >
          Explore Programs
        </a>
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
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(147, 51, 234, 0.6); }
          100% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-up { animation: slide-up 1s ease-out forwards; animation-delay: 0.2s; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        @media (max-width: 640px) { section { background-attachment: scroll; } }
      `}</style>
    </section>
  );
};

export default BannerSection;