import React from "react";
import Marquee from "react-fast-marquee";
import { Building, Zap, Settings } from "lucide-react";

const jobCategories = [
  {
    industry: "Mines",
    icon: <Building className="w-6 h-6" />,
    roles: [
      "Mine Helper",
      "Drill Operator",
      "Blaster",
      "Mine Safety Worker",
      "Haul Truck Driver",
      "Mine Maintenance Worker",
      "Loading Operator",
    ],
  },
  {
    industry: "Steel",
    icon: <Zap className="w-6 h-6" />,
    roles: [
      "Boiler Operator",
      "Furnace Helper",
      "Welder",
      "Crane Operator",
      "Steel Plant Helper",
      "Maintenance Fitter",
      "Rolling Mill Worker",
    ],
  },
  {
    industry: "Aluminium",
    icon: <Settings className="w-6 h-6" />,
    roles: [
      "Aluminium Fabricator",
      "Smelter Operator",
      "Casting Technician",
      "Anodizing Worker",
      "Maintenance Technician",
      "Quality Inspector",
      "Packaging Operator",
    ],
  },
];

const JobRolesMarquee = () => {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Industrial Background with Gear Patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 40 L60 40 L60 60 L40 60 Z\' stroke=\'%23ffffff\' stroke-width=\'1\' fill=\'none\' /%3E%3Cpath d=\'M35 50 A15 15 0 1 0 65 50 A15 15 0 1 0 35 50 Z\' stroke=\'%23ffffff\' stroke-width=\'1\' fill=\'none\' /%3E%3Cpath d=\'M50 35 A15 15 0 1 0 50 65 A15 15 0 1 0 50 35 Z\' stroke=\'%23ffffff\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E')]"></div>
      </div>

      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'0.5\'%3E%3Cpath d=\'M0,20 L20,0 Z\'/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-green-500 rounded-full filter blur-[100px] opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[80px] opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-green-500">Blue-Collar Careers</span> in Mining, Steel & Aluminium
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Unlock your potential with our specialized training for high-demand roles in the mining, steel, and aluminium industries.
          </p>
        </div>

        <div className="space-y-4">
          {jobCategories.map((category, index) => (
            <div key={category.industry} className="flex items-center gap-4 group">
              {/* Industry Name and Icon */}
              <div
                className="flex items-center gap-2 px-4 py-3 w-56 bg-transparent backdrop-blur-md border border-green-500 rounded-full font-bold text-sm md:text-base text-white transition-all duration-300 hover:bg-green-500/10 hover:shadow-lg hover:shadow-green-500/20 focus-visible:ring-2 focus-visible:ring-green-500"
                aria-label={`Industry: ${category.industry}`}
              >
                {React.cloneElement(category.icon, {
                  className: "w-6 h-6 group-hover:text-green-400 transition-colors duration-300",
                })}
                <span>{category.industry}</span>
              </div>

              {/* Marquee */}
              <div className="flex-1 overflow-hidden">
                <Marquee
                  gradient={false}
                  direction={index % 2 === 0 ? "left" : "right"}
                  speed={40}
                  pauseOnHover={true}
                  className="py-1"
                >
                  <div className="flex gap-4">
                    {category.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className={`
                          px-6 py-3 rounded-full font-medium text-sm md:text-base whitespace-nowrap
                          transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                          ${
                            index % 2 === 0
                              ? "bg-purple-600/10 text-purple-400 border border-purple-600/30 hover:bg-purple-600/20 hover:text-purple-300 hover:shadow-purple-600/20"
                              : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 hover:text-green-300 hover:shadow-green-500/20"
                          }
                        `}
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/programs"
            className="inline-block px-8 py-3 bg-green-500 text-white font-semibold rounded-md hover:from-purple-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-600/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Explore Training Programs"
          >
            Explore Training Programs
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-black to-green-500"></div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default JobRolesMarquee;