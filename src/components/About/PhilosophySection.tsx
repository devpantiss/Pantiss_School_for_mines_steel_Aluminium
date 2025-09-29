import React from "react";

const PhilosophySection: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black to-black overflow-hidden">
      {/* Background with Floating Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-20 h-20 bg-purple-600 rounded-full opacity-40 blur-2xl top-8 left-8 animate-orbit"></div>
        <div className="absolute w-32 h-32 bg-green-600 rounded-full opacity-40 blur-2xl top-1/4 right-10 animate-orbit-delayed"></div>
        <div className="absolute w-16 h-16 bg-purple-500 rounded-full opacity-45 blur-xl bottom-20 left-1/4 animate-orbit"></div>
        <div className="absolute w-28 h-28 bg-green-500 rounded-full opacity-45 blur-2xl bottom-10 right-1/4 animate-orbit-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-green-600 mb-6 drop-shadow-md animate-fade-in">
          Our Core Beliefs
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-center text-gray-200 mb-12 max-w-3xl mx-auto animate-slide-up">
          Shaping the future of industry through innovation, skill, and dedication at Pantiss School of Mines, Steel & Aluminium.
        </p>

        {/* Content Cards with Flip Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Philosophy Card */}
          <div
            className="group relative perspective-1000 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
            role="region"
            aria-label="Philosophy Card"
          >
            <div className="relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front Face */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg backface-hidden border border-purple-600/20">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                  Our Philosophy
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  We champion practical, hands-on learning to forge skilled professionals who drive innovation in the mining, steel, and aluminium industries.
                </p>
              </div>
              {/* Back Face */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center">
                  Building skills, shaping futures.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="group relative perspective-1000 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
            role="region"
            aria-label="Vision Card"
          >
            <div className="relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front Face */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg backface-hidden border border-green-600/20">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  To lead globally in blue-collar education, creating a workforce that powers industries with expertise and resilience.
                </p>
              </div>
              {/* Back Face */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center">
                  Pioneering industrial excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div
            className="group relative perspective-1000 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
            role="region"
            aria-label="Mission Card"
          >
            <div className="relative w-full h-64 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front Face */}
              <div className="absolute inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg backface-hidden border border-purple-600/20">
                <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  To deliver cutting-edge training using AR/VR and simulators, ensuring job-ready graduates for the mining, steel, and aluminium sectors.
                </p>
              </div>
              {/* Back Face */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 p-6 rounded-xl shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center">
                  Empowering through innovation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <a
            href="/learn-more"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Learn More About Pantiss School"
          >
            Discover Our Approach
          </a>
        </div>
      </div>

      {/* Custom CSS for Animations and 3D Effects */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes orbit {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(12px, -8px) scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
        }

        @keyframes orbit-delayed {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-12px, 8px) scale(0.95);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
        }

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

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(147, 51, 234, 0.6);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4);
          }
        }

        .animate-orbit {
          animation: orbit 5s ease-in-out infinite;
        }

        .animate-orbit-delayed {
          animation: orbit-delayed 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PhilosophySection;