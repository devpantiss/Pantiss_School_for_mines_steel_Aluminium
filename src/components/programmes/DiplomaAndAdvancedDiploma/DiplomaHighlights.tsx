import React, { memo } from "react";
import { motion, Variants } from "framer-motion";
import { FaTrophy, FaBriefcase, FaClock, FaUserCheck } from "react-icons/fa";

// Define interfaces for type safety
interface Highlight {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface DiplomaHighlightsProps {}

// Define highlights data with unique icons
const highlights: Highlight[] = [
  {
    title: "Comprehensive Curriculum",
    description:
      "Industry-aligned coursework combining theoretical foundations with practical applications and real-world projects across all sectors.",
    icon: <FaUserCheck className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Professional Credentials",
    description:
      "NSQF-aligned diplomas and advanced diplomas recognized by industry and government for career advancement and professional growth.",
    icon: <FaTrophy className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Industry Partnerships",
    description:
      "Strong collaboration with leading companies for internships, projects, and direct placement opportunities across core sectors.",
    icon: <FaBriefcase className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Career Advancement Pathways",
    description:
      "Structured progression from diploma to advanced diploma, enabling continuous professional growth and specialization in Mines, Power & Energy, Shipping & Logistics, Infrastructure & Facility Management, Semiconductors & EV Tech, Green Jobs, Textiles & Apparels, and Social Development.",
    icon: <FaClock className="w-6 h-6 text-green-400" />,
  },
];

// Define animation variants for cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  }),
};

// Define animation variants for heading
const headingVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const DiplomaHighlights: React.FC<DiplomaHighlightsProps> = () => {
  return (
    <section
      className="relative py-24 bg-black overflow-hidden"
      role="region"
      aria-label="Diploma & Advanced Diploma Highlights"
    >
      {/* Subtle Background Accents with Glassmorphism */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-16 w-80 h-80 bg-green-500/10 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-900/5 rounded-full blur-2xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Animated Heading */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold text-center mb-16 tracking-tight font-sans leading-tight"
        >
          Key Highlights
          <span className="block mt-2 h-1 w-32 mx-auto bg-gradient-to-r from-green-600 to-purple-600 rounded-full"></span>
        </motion.h2>

        {/* Highlights Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="
                relative bg-gray-900/30 backdrop-blur-lg border border-gray-700/50 rounded-3xl
                shadow-[0_8px_32px_rgba(239,68,68,0.15)] hover:shadow-[0_12px_48px_rgba(239,68,68,0.25)]
                p-6 group hover:border-green-500/70
                transform hover:scale-105 transition-all duration-500 ease-out
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/5 before:to-purple-500/5
                before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-green-500
              "
              role="article"
              aria-label={`Highlight: ${highlight.title}`}
              tabIndex={0}
            >
              <div className="flex items-center gap-4 mb-4">
                {highlight.icon}
                <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  {highlight.title}
                </h3>
              </div>
              <p className="text-gray-200 text-sm font-medium leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(DiplomaHighlights);
