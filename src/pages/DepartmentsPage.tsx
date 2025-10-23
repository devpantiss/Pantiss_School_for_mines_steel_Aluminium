import React from "react";
import { motion } from "framer-motion";

// DepartmentsPage.tsx
// Single-file React + TypeScript component set for the "Departments" page.
// Uses Tailwind CSS classes. Color palette: black (background / text accents),
// purple-600 (primary accents), green-500 (secondary accents).
// Default export: DepartmentsPage component.

// USAGE
// 1. Place this file in your React project (e.g. src/components/DepartmentsPage.tsx).
// 2. Ensure Tailwind CSS is configured and framer-motion is installed.
//    npm install framer-motion
// 3. Use <DepartmentsPage /> inside a route or page.

// ----------------------------- Types ---------------------------------

type Department = {
  id: string;
  name: string;
  short: string;
  highlights: string[];
  icon?: React.ReactNode;
};

const DEPARTMENTS: Department[] = [
  {
    id: "mining",
    name: "Mining Operations",
    short: "Extraction, site safety, equipment operation and surveying.",
    highlights: [
      "Drilling & blasting",
      "Haulage & material handling",
      "Mine safety & compliance",
    ],
  },
  {
    id: "fabrication",
    name: "Fabrication & Welding",
    short: "Structural fabrication, welding processes and inspection.",
    highlights: ["SMAW, MIG, TIG", "Blueprint reading", "Weld inspection"],
  },
  {
    id: "electrical",
    name: "Electricals",
    short: "Industrial electrical systems, control panels and safety.",
    highlights: [
      "Control panels & PLC basics",
      "Motor repair",
      "Earthing & safety",
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical Maintenance",
    short: "Repair, preventive maintenance and machine diagnostics.",
    highlights: [
      "Alignment & assembly",
      "Hydraulics & pneumatics",
      "Lubrication",
    ],
  },
  {
    id: "hemm",
    name: "HEMM Operations",
    short: "Operation & servicing of heavy earth moving machinery.",
    highlights: ["Equipment operation", "Field safety", "Pre-shift checks"],
  },
  {
    id: "foundry",
    name: "Casting & Foundry",
    short: "Melting, molding and casting for industrial components.",
    highlights: ["Pattern making", "Furnace ops", "Quality inspection"],
  },
];

const PROGRAMMES = [
  "RPL Programme",
  "Apprenticeship & Dual Training Programme",
  "Diploma & Advanced Diploma Programme",
  "Upskilling & Reskilling Programme",
  "Industry Aligned Certification Programmes",
];

// -------------------------- Small UI Primitives -----------------------

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-purple-600/10 text-purple-600 px-3 py-1 text-sm font-medium">
    {children}
  </span>
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white">
      {title}
    </h2>
    {subtitle && <p className="text-sm text-gray-100 mt-1">{subtitle}</p>}
  </div>
);

// ------------------------------ Components ---------------------------

const Hero: React.FC = () => {
  return (
    <header className="relative bg-black text-white mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <Badge>Departments</Badge>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Practical departments training India’s industrial workforce
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl">
            Hands-on programs across Mining, Fabrication, Electrical, Mechanical
            Maintenance, HEMM and Foundry — designed for rapid employability and
            industry readiness.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#departments"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-lg shadow-md"
            >
              Explore Departments n{" "}
            </a>
            <a
              href="#programmes"
              className="inline-flex items-center gap-2 border border-purple-600 text-purple-600 hover:bg-purple-50 transition px-4 py-2 rounded-lg"
            >
              View Programmes
            </a>
          </div>
        </div>

        <div className="flex-1 w-full">
          {/* Illustration: simple modern card showing workshop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-600/10 to-green-500/5 border border-purple-600/10 rounded-2xl p-6 shadow-xl"
          >
            <div className="h-52 md:h-64 w-full rounded-xl bg-white/5 flex items-center justify-center text-purple-600">
              <svg
                className="w-28 h-28 opacity-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M3 7h18M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="mt-4 text-sm text-gray-300">
              Workshop simulation • Live equipment • Industry mentors
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const Overview: React.FC = () => (
  <section className="bg-gradient-to-b from-black via-purple-900 to-black">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SectionTitle
            title="Practical, Industry-Mapped Training"
            subtitle="Each department blends hands-on workshop practice with field exposure and industry mentorship."
          />
          <ul className="space-y-3 text-gray-50">
            <li className="flex gap-3 items-start">
              <span className="mt-1 text-purple-500">●</span>
              <div>
                <div className="font-semibold">Industry-aligned curricula</div>
                <div className="text-sm">
                  Mapped to employer needs and recognized frameworks.
                </div>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 text-green-500">●</span>
              <div>
                <div className="font-semibold">Hands-on learning</div>
                <div className="text-sm">
                  Minimum 60–80% practical time inside workshops and on-site.
                </div>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 text-purple-600">●</span>
              <div>
                <div className="font-semibold">Placement-focused</div>
                <div className="text-sm">
                  Strong ties with industry partners for apprenticeships and
                  placements.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-lg p-6 bg-white/5 border-2 border-green-600 shadow-sm">
          <h3 className="text-lg font-semibold text-green-400 mb-3">
            Programme highlights
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {PROGRAMMES.map((p) => (
              <div key={p} className="p-3 rounded-lg bg-green-500/70">
                <div className="text-sm font-medium text-white">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DepartmentCard: React.FC<{ dept: Department }> = ({ dept }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden rounded-2xl border-2 border-green-500 shadow-sm hover:shadow-lg transition"
      aria-labelledby={`${dept.id}-title`}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1742994000/16498883-hd_1920_1080_24fps_zb7mxr.mp4" // 👈 replace with your actual video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Black translucent overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600/40 to-green-500/30 flex items-center justify-center backdrop-blur-sm">
            {/* simple icon */}
            <svg
              className="w-8 h-8 text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="3"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.4 15a8 8 0 1 0-14.8 0"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3
              id={`${dept.id}-title`}
              className="text-lg font-semibold text-white drop-shadow-md"
            >
              {dept.name}
            </h3>
            <p className="mt-1 text-sm text-gray-200">{dept.short}</p>
          </div>
        </div>

        <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          {dept.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-gray-200">
              <span className="text-green-400">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium text-purple-600 hover:underline"
            aria-label={`Learn more about ${dept.name}`}
          >
            Learn more
          </a>
          <a
            href="#"
            className="ml-auto inline-flex items-center gap-2 bg-green-500 text-black px-3 py-2 rounded-lg text-sm shadow-md hover:bg-green-400 transition"
          >
            Apply
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const DepartmentsGrid: React.FC = () => {
  return (
    <section id="departments" className="bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <SectionTitle
          title="Our Departments"
          subtitle="Practical departments focused on employability and industry skills."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((d) => (
            <DepartmentCard dept={d} key={d.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FacilitiesSection: React.FC = () => (
  <section className="relative bg-gradient-to-b from-black via-purple-900 to-black py-16">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <SectionTitle
        title="Facilities & Infrastructure"
        subtitle="Workshop-grade facilities that simulate real industrial environments."
      />

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {[
          {
            title: "Workshops & Labs",
            desc: "Fully equipped welding bays, foundry, motor lab and HEMM yard.",
            img: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1756907996/WhatsApp_Image_2025-09-03_at_7.27.27_PM_s7fkrs.jpg",
          },
          {
            title: "Simulators & AR/VR",
            desc: "Operator simulators for safe, accelerated practice on heavy machinery.",
            img: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746023907/WhatsApp_Image_2025-02-28_at_5.00.19_PM_1_ov0z9z.jpg",
          },
          {
            title: "Practical Oriented Curriculum",
            desc: "The complete course curriculum is practical oriented, giving students hands-on exposure.",
            img: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760708752/GMC10092024_162547_pnvm7v.jpg",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <img
              src={card.img}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90 group-hover:from-black/70 group-hover:to-black/95 transition-all duration-700" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-72 md:h-80 p-6 ring-1 ring-green-500/60">
              <h5 className="font-semibold text-green-400 text-xl tracking-wide">
                {card.title}
              </h5>
              <p className="text-gray-200 text-sm mt-2 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BannerSection: React.FC = () => (
  <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
    {/* Parallax Background */}
    <div
      className="absolute inset-0 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/djtzx6wo7/image/upload/v1756907996/WhatsApp_Image_2025-09-03_at_7.27.27_PM_s7fkrs.jpg')",
      }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

    {/* Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 text-center px-6 md:px-12 max-w-4xl"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-green-500 drop-shadow-lg">
        Building the Future Workforce
      </h2>
      <p className="mt-4 text-gray-100 text-base md:text-lg leading-relaxed">
        Our training blends practical exposure, modern technology and real
        industry mentorship — ensuring every learner becomes job-ready,
        confident, and skilled for India’s industrial growth.
      </p>

      <div className="mt-6 flex justify-center">
        <a
          href="#apply"
          className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md transition"
        >
          Join a Programme
        </a>
      </div>
    </motion.div>
  </section>
);

const CareersSection: React.FC = () => (
  <section className="bg-black">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 bg-gradient-to-b from-black via-purple-900 to-black rounded-lg border border-purple-600/10">
      <SectionTitle
        title="Career Pathways"
        subtitle="How each department maps to job roles and progression."
      />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-black/60 ring-2 ring-green-600 rounded-lg shadow-sm">
          <h6 className="font-semibold text-white">Entry Roles</h6>
          <p className="text-sm text-gray-100 mt-2">
            Operator, Junior Technician, Fitter, Welder
          </p>
        </div>
        <div className="p-4 bg-black/60 ring-2 ring-green-600 rounded-lg shadow-sm">
          <h6 className="font-semibold text-white">Mid-Level</h6>
          <p className="text-sm text-gray-100 mt-2">
            Technician II, Machine Supervisor, Shift Incharge
          </p>
        </div>
        <div className="p-4 bg-black/60 ring-2 ring-green-600 rounded-lg shadow-sm">
          <h6 className="font-semibold text-white">Advanced</h6>
          <p className="text-sm text-gray-100 mt-2">
            Maintenance Engineer, HEMM Specialist, Plant Lead
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CTASection: React.FC = () => (
  <section className="bg-gradient-to-b from-black via-purple-900 to-black">
    <div className="max-w-7xl mx-auto bg-black px-6 md:px-12 py-12 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h3 className="text-2xl font-extrabold text-white">
          Ready to train for industry-ready roles?
        </h3>
        <p className="text-gray-100 mt-2">
          Apply for programmes, request a brochure or partner with us for
          apprenticeships.
        </p>
      </div>
      <div className="flex gap-3">
        <a
          className="inline-flex items-center px-5 py-3 bg-purple-600 text-white rounded-md shadow-md"
          href="#apply"
        >
          Apply Now
        </a>
        <a
          className="inline-flex items-center px-5 py-3 border border-purple-600 text-purple-600 rounded-md"
          href="#contact"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
);

// --------------------------- Page Export ------------------------------

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Hero />
      <main className="-mt-6">
        <Overview />
        <DepartmentsGrid />
        {/* <ProgrammesSection /> */}
        <FacilitiesSection />
        <BannerSection /> {/* 👈 Add here */}
        <CareersSection />
        <CTASection />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
