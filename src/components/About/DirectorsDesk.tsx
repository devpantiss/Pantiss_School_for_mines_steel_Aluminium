import React from "react";

const DirectorsDeskSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black to-black">
      {/* Background with Subtle Particle Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-20 h-20 bg-purple-600 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-32 h-32 bg-green-600 rounded-full opacity-20 blur-3xl top-1/4 right-12 animate-pulse-delayed"></div>
        <div className="absolute w-16 h-16 bg-purple-500 rounded-full opacity-25 blur-2xl bottom-20 left-1/3 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-green-600 mb-12 animate-fade-in">
          From the Director's Desk
        </h2>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Director's Photo and Info */}
          <div className="flex flex-col items-center lg:items-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-lg overflow-hidden shadow-xl border-2 border-purple-600/30">
              <img
                src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1735040843/stalin_sir_wbrcxh.jpg" // Placeholder for Shri Stalin Nayak
                alt="Shri Stalin Nayak, Director of Pantiss School"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Shri Stalin Nayak</h3>
            <p className="text-green-600 font-medium">Founder & Director</p>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h4 className="text-xl sm:text-2xl font-semibold text-purple-600">A Vision Born from Compassion</h4>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Shri Stalin Nayak, our founder, grew up amidst the rugged landscapes of mining-affected villages, where he witnessed the struggles of youth yearning for opportunity. The economic shifts—mine closures and mechanization—left many young individuals without viable paths to employment, their potential stifled by a lack of access to relevant skills.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Driven by a deep sense of responsibility, Shri Nayak envisioned a transformative solution: Pantiss School of Mines, Steel & Aluminium. His goal was clear—to empower these youth with practical, industry-aligned training that would turn their aspirations into reality. By prioritizing hands-on learning over traditional theory, he sought to bridge the gap between ambition and achievement.
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-purple-600">Building a Skilled Future</h4>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Pantiss School was founded on the belief that every individual deserves a chance to thrive. Through innovative programs like apprenticeships, NSQF-aligned certifications, and advanced AR/VR and simulator-based training, we equip students with the skills to excel as welders, operators, technicians, and more. Our Recognition of Prior Learning (RPL) program honors existing expertise, ensuring no talent goes unrecognized.
            </p>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              From Shri Nayak’s desk, the mission is unwavering: to transform lives by fostering a skilled, confident workforce that powers the mining, steel, and aluminium industries. Each graduate is a testament to his vision—a spark of hope kindled in those mining villages, now illuminating careers and communities across the nation.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Contact Pantiss School"
          >
            Connect With Our Vision
          </a>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style >{`
        @keyframes pulse-slow {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(6px, -4px) scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes pulse-delayed {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-6px, 4px) scale(0.95);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
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

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-delayed {
          animation: pulse-delayed 7s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default DirectorsDeskSection;