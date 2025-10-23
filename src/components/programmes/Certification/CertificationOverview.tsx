import React, { memo, useState } from "react";
import { motion, Variants } from "framer-motion";
import Slider from "react-slick";

// Define interfaces for type safety
interface ImpactData {
  courses: number;
  trained: number;
  placed: number;
}

interface Sector {
  name: string;
  description: string;
  icon: string;
  impact: ImpactData;
  certificationLevel: string;
  skills: string[];
}

interface CertificationOverviewProps {}

// Define sectors data with unique impact data for each
const sectors: Sector[] = [
  {
    name: "Mines, Steel & Aluminium",
    description:
      "Industry-certified programs in mining operations, steel manufacturing, and aluminium processing with advanced safety and automation practices.",
    icon: "⚒️",
    impact: { courses: 12, trained: 2500, placed: 1800 },
    certificationLevel: "Level 4-6",
    skills: ["Mining Ops", "Steel Production", "Safety Standards"],
  },
  {
    name: "Power & Energy",
    description:
      "Certification courses in power plant operations, renewable energy systems, and smart grid technologies with applied lab training.",
    icon: "⚡",
    impact: { courses: 15, trained: 3200, placed: 2400 },
    certificationLevel: "Level 5-7",
    skills: ["Renewable Energy", "Grid Management", "Power Systems"],
  },
  {
    name: "Shipping & Logistics",
    description:
      "Skill certifications in supply chain management, port operations, and logistics analytics aligned with global trade requirements.",
    icon: "🚢",
    impact: { courses: 10, trained: 1800, placed: 1500 },
    certificationLevel: "Level 3-5",
    skills: ["Logistics Mgmt", "Port Operations", "International Trade"],
  },
  {
    name: "Infrastructure & Facility Management",
    description:
      "Certification programs in project management, facility operations, and sustainable infrastructure with live project experience.",
    icon: "🏗️",
    impact: { courses: 18, trained: 4000, placed: 3000 },
    certificationLevel: "Level 4-6",
    skills: ["Construction Mgmt", "Facility Ops", "Project Delivery"],
  },
  {
    name: "Semiconductors & EV Tech",
    description:
      "Cutting-edge certifications in semiconductor design, EV systems, and advanced manufacturing aligned with future industry demand.",
    icon: "🔬",
    impact: { courses: 8, trained: 1200, placed: 900 },
    certificationLevel: "Level 6-8",
    skills: ["Chip Design", "EV Systems", "Advanced Manufacturing"],
  },
  {
    name: "Green Jobs",
    description:
      "Courses in sustainability, renewable energy, and environmental management with certifications recognized by global green standards.",
    icon: "🌱",
    impact: { courses: 14, trained: 2800, placed: 2200 },
    certificationLevel: "Level 3-5",
    skills: ["Sustainability", "Green Energy", "Eco Practices"],
  },
  {
    name: "Textiles & Apparels",
    description:
      "Industry-focused certifications in textile design, modern apparel production, and fashion technology with practical workshops.",
    icon: "🧵",
    impact: { courses: 11, trained: 2100, placed: 1600 },
    certificationLevel: "Level 3-4",
    skills: ["Textile Design", "Fashion Tech", "Production Mgmt"],
  },
  {
    name: "Social Development",
    description:
      "Certification courses in community leadership, social impact projects, and public health with field-based applications.",
    icon: "🤝",
    impact: { courses: 9, trained: 1500, placed: 1200 },
    certificationLevel: "Level 4-5",
    skills: ["Community Work", "Public Health", "Development Studies"],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Custom arrow components for react-slick
interface CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomPrevArrow = ({ onClick }: CustomArrowProps) => (
  <button
    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
    onClick={onClick}
    aria-label="Previous sector"
  >
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const CustomNextArrow = ({ onClick }: CustomArrowProps) => (
  <button
    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
    onClick={onClick}
    aria-label="Next sector"
  >
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const CertificationOverview: React.FC<CertificationOverviewProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: (_i: number) => (
      <button className="w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full bg-white/30 hover:bg-white/60" />
    ),
    dotsClass: "slick-dots !bottom-[-30px] sm:!bottom-[-40px] !flex !justify-center !space-x-2",
  };

  const currentImpact = sectors[currentSlide]?.impact;
//   const currentSector = sectors[currentSlide];

  return (
    <section className="relative min-h-screen py-12 lg:py-20 bg-black overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants as Variants} className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Industry-Aligned <span className="text-green-500">Certification</span> Programs
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Specialized courses designed with industry input to upskill and reskill professionals, 
            ensuring career readiness and placement opportunities across key sectors.
          </p>
        </motion.div>

        {/* Video + Carousel */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Video */}
          <motion.div variants={fadeInLeft as Variants}>
            <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Program Introduction
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Certification Program Intro"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeInRight as Variants}>
            <Slider {...sliderSettings}>
              {sectors.map((sector, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{sector.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{sector.name}</h4>
                        <span className="text-sm text-white/60">{sector.certificationLevel}</span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-4">{sector.description}</p>
                    <div className="mt-auto">
                      <h5 className="text-sm font-semibold text-white mb-2">Key Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {sector.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>

        {/* Dynamic Impact */}
        {currentImpact && (
          <motion.div
            key={`impact-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-500">{currentImpact.courses}</div>
              <div className="text-white/80">Courses Offered</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-500">
                {currentImpact.trained.toLocaleString()}
              </div>
              <div className="text-white/80">Professionals Upskilled</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400">
                {currentImpact.placed.toLocaleString()}
              </div>
              <div className="text-white/80">Career Transitions</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default memo(CertificationOverview);
