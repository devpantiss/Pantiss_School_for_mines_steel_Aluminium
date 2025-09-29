import React, { memo, useMemo, useEffect, useRef, useState } from "react";

// Define the Program interface
interface Program {
  title: string;
  description: string;
  image: string;
  duration?: string; // optional
}

// Static program data
const programData: Program[] = [
  {
    title: "Apprenticeship & Dual Training Program",
    description:
      "Blends classroom learning with hands-on industry training to prepare students for practical roles in mining, steel, and aluminium sectors.",
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758377117/apprenticeship_m3zgfv.png",
    duration: "6-24 months",
  },
  {
    title: "Industry Aligned Certification",
    description:
      "Industry-designed certifications focused on high employability, aligning skills directly with employer requirements.",
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758377339/industry_gixjl2.jpg",
    duration: "3-6 months",
  },
  {
    title: "Diploma & Advanced Diploma Program",
    description:
      "Structured training for technical and supervisory roles, combining theoretical knowledge with practical industry exposure.",
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758377200/345_u9ckp1.webp",
    duration: "1-3 years",
  },
  {
    title: "Upskilling & Reskilling Program",
    description:
      "Upgrades existing workers to new technologies and skills, ensuring long-term career growth in dynamic industries.",
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1758374124/elecMine_hjgm7o.webp",
    duration: "1-6 months",
  },
  {
    title: "Recognition of Prior Learning (RPL) Program",
    description:
      "Certifies experienced workers' skills for formal recognition and career advancement in the industry.",
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1756969575/Gemini_Generated_Image_qpe2ylqpe2ylqpe2_qmxnkn.png",
    duration: "2-4 weeks",
  },
];

// ProgramCard Component
interface ProgramCardProps {
  program: Program;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProgramCard = memo(
  ({ program, onMouseEnter, onMouseLeave }: ProgramCardProps) => {
    return (
      <div
        className="relative w-80 h-[500px] group cursor-pointer bg-gradient-to-b from-black to-purple-900 rounded-xl overflow-hidden shadow-2xl border-2 border-green-600 flex flex-col"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Top: Program Title */}
        <div className="bg-purple-600/30 text-white text-center py-3">
          <h3 className="text-xl font-bold">{program.title}</h3>
          {program.duration && (
            <p className="text-sm text-green-400">Duration: {program.duration}</p>
          )}
        </div>

        {/* Middle: Program Image */}
        <img
          src={program.image}
          alt={program.title}
          className="h-full object-cover w-[600px] transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Bottom: Program Description */}
        <div className="bg-black/60 text-white text-sm p-4 flex-1 flex items-center justify-center">
          <p>{program.description}</p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.program.title === nextProps.program.title
);
ProgramCard.displayName = "ProgramCard";

// ProgramPreview Component
const ProgramPreview: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const programList = useMemo(() => [...programData, ...programData], []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed;
        container.scrollLeft = scrollPositionRef.current;

        const totalWidth = programData.length * 320;
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    const container = scrollContainerRef.current;
    if (container) {
      scrollPositionRef.current = container.scrollLeft;
    }
    setIsPaused(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-purple-900 to-black overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Our <span className="text-green-500">Programs</span>
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
          Empowering students with industry-ready skills through hands-on training and certification programs.
        </p>
      </div>

      {/* Scrollable Programs Container */}
      <div className="relative max-w-[1440px] mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden gap-6 px-4 pb-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {programList.map((program, index) => (
            <div
              key={`${program.title}-${index}`}
              className="flex-shrink-0 min-w-[320px]"
            >
              <ProgramCard
                program={program}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors duration-300">
          Explore Programs
        </button>
      </div>
    </section>
  );
};

export default memo(ProgramPreview, () => true);
