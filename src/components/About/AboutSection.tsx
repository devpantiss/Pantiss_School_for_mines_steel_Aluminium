import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black to-black overflow-hidden">
      {/* Background Particle Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-24 h-24 bg-purple-600 rounded-full opacity-40 blur-3xl top-12 left-12 animate-pulse-slow"></div>
        <div className="absolute w-36 h-36 bg-green-600 rounded-full opacity-40 blur-3xl top-1/4 right-16 animate-pulse-delayed"></div>
        <div className="absolute w-20 h-20 bg-purple-500 rounded-full opacity-50 blur-2xl bottom-16 left-1/3 animate-pulse-slow"></div>
        <div className="absolute w-40 h-40 bg-green-500 rounded-full opacity-45 blur-3xl bottom-12 right-1/3 animate-pulse-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-green-600 mb-6 animate-fade-in">
          About Pantiss School of Mines, Steel & Aluminium
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-center text-gray-200 mb-12 max-w-3xl mx-auto animate-slide-up">
          Empowering the next generation of blue-collar professionals with cutting-edge training and industry-aligned programs.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Mission and Approach */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                At Pantiss School of Mines, Steel & Aluminium, we are committed to shaping skilled professionals for the mining, steel, and aluminium industries. Our innovative, hands-on training approach prioritizes practical experience, preparing graduates to thrive in dynamic, high-demand environments.
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-4">
                Innovative Training Methods
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Utilizing advanced technologies like Simulator-Based Training and AR/VR modules, we deliver immersive learning experiences that bridge the gap between classroom theory and real-world application, fostering skills for innovation and efficiency.
              </p>
            </div>
          </div>

          {/* Right: Programs Offered */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-4">
              Our Programs
            </h3>
            <ul className="space-y-4 text-gray-300 text-base sm:text-lg">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <span className="font-semibold text-green-600">Apprenticeship & Dual Training Program:</span> Blend on-the-job training with structured learning for real-world experience and qualifications.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <span className="font-semibold text-green-600">Industry-Aligned Certification Programs:</span> Tailored certifications to meet the demands of the mining, steel, and aluminium sectors.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <span className="font-semibold text-green-600">Diploma & Advanced Diploma Programs:</span> In-depth training for roles like Welders, Machine Operators, and Safety Officers.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <span className="font-semibold text-green-600">Upskilling & Reskilling Programs:</span> Opportunities to enhance skills or transition to new roles within the industry.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>
                  <span className="font-semibold text-green-600">RPL (Recognition of Prior Learning) Program:</span> Validate existing skills and experience for formal qualifications.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <a
            href="/apply"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Join Pantiss School Programs"
          >
            Join Our Programs Today
          </a>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes pulse-slow {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(10px, -8px) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
        }

        @keyframes pulse-delayed {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-10px, 8px) scale(0.95);
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

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-delayed {
          animation: pulse-delayed 6s ease-in-out infinite;
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

export default AboutSection;