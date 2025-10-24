import React from "react";
import { motion } from "framer-motion";
import { Clock, Award, Download } from "lucide-react";

// -------------------------- Types -------------------------
type Program = {
  id: string;
  name: string;
  description: string;
  duration: string;
  modules: string[];
  outcomes: string[];
  certification: string;
  pdfUrl: string;
};

// -------------------------- Reusable Components -------------------------
interface SectionTitleProps {
  title: string;
  subtitle?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => (
  <div className="mb-10 text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-extrabold bg-green-500 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && <p className="text-gray-300 mt-2 text-lg">{subtitle}</p>}
  </div>
);

interface ProgramCardProps {
  program: Program;
}
const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = program.pdfUrl;
    link.download = `${program.name}-Curriculum.pdf`;
    link.click();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 to-green-400/40 hover:from-purple-500 hover:to-green-300 transition-all duration-300"
    >
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between h-full shadow-lg hover:shadow-2xl transition-all">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-semibold text-green-400 mb-2">{program.name}</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{program.description}</p>

          {/* Duration */}
          <div className="flex items-center gap-2 text-purple-400 font-medium mb-3">
            <Clock size={16} />
            <span className="text-sm">{program.duration}</span>
          </div>

          {/* Modules */}
          <div className="mb-4">
            <h4 className="text-white font-semibold text-sm mb-1 uppercase tracking-wide">
              Modules
            </h4>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1 pl-2">
              {program.modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="mb-4">
            <h4 className="text-white font-semibold text-sm mb-1 uppercase tracking-wide">
              Learning Outcomes
            </h4>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1 pl-2">
              {program.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-purple-400 mb-4">
            <Award size={16} />
            <span className="font-medium">{program.certification}</span>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center text-white gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-900 to-green-600 hover:from-purple-500 hover:to-green-300 font-semibold transition-all shadow-md"
          >
            <Download size={18} /> Download Curriculum
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// -------------------------- Page Sections -------------------------
const HeroSection: React.FC = () => (
  <section className="relative bg-black h-[80vh] text-white py-24 mt-28">
    {/* Background Image */}
    <img
      src="https://res.cloudinary.com/djtzx6wo7/image/upload/v1761228314/artyom-korshunov-NWByxwVN-J0-unsplash_1_qznmdv.jpg"
      alt="Industrial Training"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

    {/* Content */}
    <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block px-4 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full"
      >
        Curriculum
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight"
      >
        Comprehensive Industrial Training Programmes
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
      >
        Hands-on, industry-aligned training across Mining, Fabrication, Electrical, Mechanical,
        HEMM, and Foundry — featuring fleet practice, AR/VR simulations, and employability-driven
        skill development.
      </motion.p>
    </div>
  </section>
);

const ProgramsSection: React.FC = () => {
  const programs: Program[] = [
    {
      id: "rpl",
      name: "RPL Programme",
      description:
        "Recognizes prior learning and validates skill proficiency for immediate deployment.",
      duration: "3–6 Months",
      modules: [
        "Safety & compliance basics",
        "Equipment operation fundamentals",
        "AR/VR skill simulation",
        "On-site validation of competencies",
      ],
      outcomes: [
        "Validated industrial skillset",
        "Ability to operate machinery safely",
        "AR/VR simulated practice experience",
      ],
      certification: "RPL Certificate",
      pdfUrl: "/pdfs/RPL-Curriculum.pdf",
    },
    {
      id: "apprenticeship",
      name: "Apprenticeship & Dual Training",
      description:
        "Structured program combining academic knowledge with on-site apprenticeship in industry.",
      duration: "6–12 Months",
      modules: [
        "Hands-on workshop & field training",
        "Department-specific technical skills",
        "Project work and reporting",
        "AR/VR simulations for complex operations",
      ],
      outcomes: [
        "Operational proficiency in chosen department",
        "Experience with industrial workflows",
        "Preparedness for industry certification",
      ],
      certification: "Apprenticeship Certificate",
      pdfUrl: "/pdfs/Apprenticeship-Curriculum.pdf",
    },
    {
      id: "diploma",
      name: "Diploma & Advanced Diploma",
      description:
        "Comprehensive multi-level programme designed for deep expertise in industrial operations.",
      duration: "12–24 Months",
      modules: [
        "Advanced departmental skills",
        "Industrial project execution",
        "Fleet handling & safety management",
        "AR/VR immersive training modules",
      ],
      outcomes: [
        "Advanced technical proficiency",
        "Ability to manage machinery and teams",
        "Prepared for supervisory and engineering roles",
      ],
      certification: "Diploma / Advanced Diploma",
      pdfUrl: "/pdfs/Diploma-Curriculum.pdf",
    },
    {
      id: "upskill",
      name: "Upskilling & Reskilling",
      description:
        "Short-term focused programmes to upgrade workforce skills as per current industry demand.",
      duration: "2–6 Months",
      modules: [
        "Skill enhancement modules",
        "Updated safety & compliance",
        "AR/VR modules for practice",
      ],
      outcomes: [
        "Improved employability",
        "Adaptation to modern machinery and processes",
      ],
      certification: "Skill Certificate",
      pdfUrl: "/pdfs/Upskilling-Curriculum.pdf",
    },
    {
      id: "industry_cert",
      name: "Industry-Aligned Certification",
      description:
        "Specialized short-term programs focused on high-demand skills with certification recognized by industry.",
      duration: "1–3 Months",
      modules: [
        "High-demand skill modules",
        "Hands-on practical sessions",
        "Simulated industrial projects",
      ],
      outcomes: [
        "Validated expertise in targeted skills",
        "Better industry placement opportunities",
      ],
      certification: "Industry Recognized Certificate",
      pdfUrl: "/pdfs/IndustryCert-Curriculum.pdf",
    },
  ];

  return (
    <section id="programs" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Programmes & Curriculum Details"
          subtitle="Elaborate breakdown of each programme"
        />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {programs.map((program) => (
            <ProgramCard program={program} key={program.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

// -------------------------- Main Page -------------------------
const CurriculumPage: React.FC = () => (
  <div className="bg-black text-white min-h-screen font-sans">
    <HeroSection />
    <main>
      <ProgramsSection />
    </main>
  </div>
);

export default CurriculumPage;
