import React, { memo, useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGem, FaIndustry, FaBolt, FaTools, FaTruck, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Sector {
  title: string;
  color: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  backgroundImage: string;
}

const sectorData: Sector[] = [
  {
    title: "Mining Operations",
    color: "bg-gray-800",
    description: "Advanced training for safe and efficient resource extraction in mining operations, aligned with NSQF Levels 4-6.",
    icon: FaGem,
    backgroundImage: "https://res.cloudinary.com/dgtc2fvgu/image/upload/q_auto,f_auto,w_800/v1739294514/cls-open-pit-mining_pbeseo.jpg",
  },
  {
    title: "Fabrication & Welding",
    color: "bg-blue-700",
    description: "Specialized skills in metal fabrication and welding techniques for industrial applications, NSQF Levels 4-5.",
    icon: FaIndustry,
    backgroundImage: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758374123/weldermine_q7tprr.jpg",
  },
  {
    title: "Electricals",
    color: "bg-yellow-600",
    description: "Expertise in electrical systems, maintenance, and renewable energy integration, NSQF Levels 4-6.",
    icon: FaBolt,
    backgroundImage: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758374124/elecMine_hjgm7o.webp",
  },
  {
    title: "Mechanical Maintenance",
    color: "bg-purple-700",
    description: "Training in machinery maintenance and repair for optimal industrial performance, NSQF Levels 4-5.",
    icon: FaTools,
    backgroundImage: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758374125/HEMMmine_jatdcd.png",
  },
  {
    title: "HEMM Operations",
    color: "bg-teal-600",
    description: "Skills for operating Heavy Earth Moving Machinery in mining and construction, NSQF Levels 4-6.",
    icon: FaTruck,
    backgroundImage: "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_300/v1735301666/IMG_9085_tkrncl.jpg",
  },
  {
    title: "Casting & Foundry",
    color: "bg-orange-600",
    description: "Proficiency in metal casting and foundry processes for precision manufacturing, NSQF Levels 4-5.",
    icon: FaFire,
    backgroundImage: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758374123/foundry_xc0h2w.jpg",
  },
];

const SectorItem = memo(
  ({
    sector,
    isActive,
    onMouseEnter,
    onMouseLeave,
  }: {
    sector: Sector;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }) => {
    const IconComponent = sector.icon;

    return (
      <div
        role="tab"
        aria-expanded={isActive}
        aria-label={`Expand ${sector.title} department`}
        aria-controls={`panel-${sector.title}`}
        className={`
          relative flex-1 transition-[flex,opacity] duration-500 ease-in-out
          ${isActive ? "flex-[6] sm:flex-[5]" : "flex-[1.5] sm:flex-[1.2]"}
          cursor-pointer flex items-center justify-center overflow-hidden ${sector.color}
          border border-gray-700/50 backdrop-blur-lg group hover:border-green-600/70
          shadow-[0_4px_16px_rgba(101,163,13,0.15)] will-change-[flex,opacity]
        `}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onMouseEnter();
          }
        }}
        tabIndex={0}
      >
        <img
          src={isActive ? sector.backgroundImage : sector.backgroundImage.replace("w_800", "w_200")}
          alt={`${sector.title} background`}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-all duration-500"></div>

        {!isActive && (
          <div
            className="
              relative z-20 transform bg-gray-900/60 p-3 sm:p-4 rounded-md
              text-white text-xl sm:text-2xl font-extrabold tracking-wide uppercase
              opacity-80 transition-opacity duration-500 group-hover:opacity-100
              scale-90 sm:scale-100 will-change-[opacity,transform]
            "
            style={{ transform: "rotate(-90deg)" }}
          >
            {sector.title}
          </div>
        )}

        {isActive && (
          <div
            id={`panel-${sector.title}`}
            className="
              relative z-20 text-center p-4 sm:p-6 lg:p-8 bg-gray-900/50 backdrop-blur-lg
              rounded-lg shadow-[0_8px_32px_rgba(101,163,13,0.2)] transition-opacity duration-500
              opacity-100 will-change-opacity
            "
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <IconComponent className="text-4xl sm:text-5xl text-white group-hover:text-green-600 transition-colors duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase text-white mb-2 sm:mb-3">
              {sector.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-200 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
              {sector.description}
            </p>
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive && prevProps.sector.title === nextProps.sector.title
);
SectorItem.displayName = "SectorItem";

const SectorsAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((index: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    requestAnimationFrame(() => {
      setActiveIndex(index);
    });
  }, [timeoutId]);

  const handleMouseLeave = useCallback(() => {
    const id = setTimeout(() => {
      setActiveIndex(null);
    }, 300);
    setTimeoutId(id);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const accordionItems = useMemo(() => {
    return sectorData.map((sector, index) => (
      <SectorItem
        key={sector.title}
        sector={sector}
        isActive={activeIndex === index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      />
    ));
  }, [activeIndex, handleMouseEnter, handleMouseLeave]);

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 bg-black overflow-hidden">
      {/* Vibrant Blurred Scattered Colorful Circles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 sm:top-12 left-4 sm:left-16 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-br from-green-600/20 to-purple-600/20 rounded-full blur-4xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-16 w-56 sm:w-96 h-56 sm:h-96 bg-gradient-to-br from-purple-600/20 to-green-600/20 rounded-full blur-4xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/5 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-green-600/20 to-purple-600/20 rounded-full blur-4xl opacity-50 animate-pulse delay-600"></div>
        <div className="absolute bottom-1/4 right-1/5 w-36 sm:w-64 h-36 sm:h-64 bg-gradient-to-br from-purple-600/20 to-green-600/20 rounded-full blur-4xl opacity-50 animate-pulse delay-1200"></div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147,51,234,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-8 tracking-tight"
        >
          Our <span className="bg-green-600 bg-clip-text text-transparent">Top Departments</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg text-gray-200 mb-8 sm:mb-10 max-w-3xl mx-auto"
        >
          Delivering industry-specific expertise for impactful results at SkillNet.
        </motion.p>

        <div
          role="tablist"
          aria-label="Top Departments Accordion"
          className="flex w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(147,51,234,0.2)]"
        >
          {accordionItems}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link
            to="/academics"
            className="inline-block mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 rounded-md text-white font-semibold hover:from-green-700 hover:to-purple-700 transition-all duration-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            aria-label="Explore all departments"
          >
            Explore All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(SectorsAccordion, () => true);