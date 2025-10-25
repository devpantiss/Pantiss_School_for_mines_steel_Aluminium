import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCertificate,
  FaHandshake,
  FaUniversity,
  FaCoins,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

/* ---------- Programme Data ---------- */
const programmes = [
  {
    key: "rpl",
    title: "Recognition of Prior Learning (RPL)",
    subtitle:
      "Certify experienced workers — validate skills and upgrade to formal qualifications.",
    eligibility: [
      "Adults with 1+ year of verifiable work experience in relevant sector (min).",
      "Any educational background (basic literacy preferred).",
      "Citizen of India; valid ID (Aadhaar/PAN/Passport).",
    ],
    selectionProcess: [
      "Online Intake & Work-experience Declaration.",
      "Short practical assessment at nearest centre (skill demonstration).",
      "Portfolio / employer reference verification (if available).",
      "Final certification mapped to NSQF level based on evidence.",
    ],
    fees: {
      overview:
        "Fee is typically subsidized; nominal assessment fee applies. CSR/Govt funding often available.",
      breakdown: [
        { label: "Assessment & Certification", amount: "₹500 - ₹2,500" },
        {
          label: "Practical Assessment (lab use)",
          amount: "₹0 - ₹1,000 (subsidized)",
        },
        { label: "Administrative & Document Charges", amount: "₹200 - ₹500" },
      ],
    },
    scholarship: [
      "Priority funding for mining-affected communities.",
      "Full-waiver schemes via CSR partners (subject to eligibility).",
      "Travel stipend for remote/tribal candidates during assessments.",
    ],
  },
  {
    key: "apprenticeship",
    title: "Apprenticeship & Dual Training",
    subtitle:
      "Earn-while-you-learn model combining workplace training and classroom theory.",
    eligibility: [
      "Minimum 10th pass (or programme-specific requirement).",
      "Age: 17–28 years (apprenticeship rules may vary by sector).",
      "Ability to work in industrial environments and travel for placement.",
    ],
    selectionProcess: [
      "Online application & document upload.",
      "Shortlisting based on eligibility and basic aptitude.",
      "Trade-specific practical test or trial day with partner industry.",
      "Placement confirmation followed by apprenticeship contract.",
    ],
    fees: {
      overview:
        "Apprenticeships are often stipended by employers. Training-related fees are minimal or sponsored.",
      breakdown: [
        { label: "Registration & Onboarding", amount: "₹500" },
        {
          label: "Training Materials & PPE",
          amount: "₹1,000 - ₹3,000 (one-time)",
        },
        {
          label: "Industry Practical Training (if unpaid)",
          amount: "N/A (stipend provided)",
        },
      ],
    },
    scholarship: [
      "Stipend during apprenticeship (employer dependent).",
      "Partial fee waivers for women candidates and SC/ST as per government schemes.",
      "Placement-linked bonuses from industry partners for high performers.",
    ],
  },
  {
    key: "diploma",
    title: "Diploma & Advanced Diploma",
    subtitle:
      "Comprehensive multi-month programmes with AR/VR simulation, workshops and industry attachments.",
    eligibility: [
      "Minimum 10th or 12th pass depending on programme level.",
      "Age: 17–35 years (programme dependent).",
      "Basic numeracy & literacy; physically fit for workshop work.",
    ],
    selectionProcess: [
      "Online application and submission of marksheets.",
      "Entrance test (basic math, reasoning) & personal interview.",
      "Short practical evaluation for workshop-based trades.",
      "Offer letter & fee confirmation to reserve seat.",
    ],
    fees: {
      overview:
        "Program fees reflect practical exposure: simulators, labs, certifications and industry visits included.",
      breakdown: [
        { label: "Tuition & Lab Access", amount: "₹30,000 - ₹55,000" },
        { label: "AR/VR & Simulation Access", amount: "Included" },
        { label: "Uniform & Safety Kit", amount: "₹2,000" },
      ],
    },
    scholarship: [
      "Merit scholarships for top entrance scores (partial fee waiver).",
      "Need-based financial aid for EWS households.",
      "Industry-sponsored scholarships covering full/partial fees.",
    ],
  },
  {
    key: "upskill",
    title: "Upskilling & Reskilling Programmes",
    subtitle:
      "Short-duration modules to upgrade skills for new equipment, EV maintenance, solar techs and green jobs.",
    eligibility: [
      "Working professionals or jobseekers with basic domain knowledge.",
      "12th / ITI / relevant certification preferred for advanced modules.",
      "Motivated to transition to green economy roles.",
    ],
    selectionProcess: [
      "Online expression of interest & baseline assessment.",
      "Short practical test or competency scan.",
      "Enrollment after assessment & scheduling of modular training.",
    ],
    fees: {
      overview:
        "Modular pricing allows selective learning; corporate sponsorship available for employed candidates.",
      breakdown: [
        { label: "Short Module (2-4 weeks)", amount: "₹5,000 - ₹12,000" },
        { label: "Advanced Module (6-12 weeks)", amount: "₹15,000 - ₹30,000" },
        { label: "Industry Badge / Certification", amount: "₹1,000 - ₹3,000" },
      ],
    },
    scholarship: [
      "Corporate-sponsored upskilling for employees.",
      "Subsidies for marginalized groups via partner NGOs.",
      "Flexible payment & installment plans for working candidates.",
    ],
  },
  {
    key: "certification",
    title: "Industry-aligned Certification Programmes",
    subtitle:
      "Short, focused certifications co-created with industry for immediate job readiness.",
    eligibility: [
      "Minimum 8th/10th pass depending on course complexity.",
      "On-the-job experience may be preferred for advanced certifications.",
    ],
    selectionProcess: [
      "Register for the targeted certification & pay registration fee.",
      "Short pre-assessment & mini-project (if applicable).",
      "Complete module & pass final competency evaluation for certificate.",
    ],
    fees: {
      overview:
        "Low-cost, high-impact certifications; frequently subsidized by industry partners.",
      breakdown: [
        { label: "Certification Course Fee", amount: "₹2,000 - ₹10,000" },
        { label: "Assessment & Badge", amount: "₹500 - ₹2,000" },
      ],
    },
    scholarship: [
      "Industry-sponsored seats for high-potential local youth.",
      "Voucher-based support for disadvantaged candidates.",
    ],
  },
];

/* ---------- Motion Variants ---------- */
const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const formatAmt = (amt: string) => amt;

/* ---------- Component ---------- */
const AdmissionsSplitView: React.FC = () => {
  const [selected, setSelected] = useState<string>(programmes[0].key);
  const current = programmes.find((p) => p.key === selected)!;

  return (
    <div className="min-h-screen bg-black mt-32 text-white">
      {/* ---------- Hero Section ---------- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1742999025/9310125-uhd_3840_2160_30fps_l4ievp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Foreground content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-4">
            Admissions & Programmes
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover our training pathways designed to empower you with
            industry-ready skills and certifications.
          </p>
          <a
            href="#programmes"
            className="inline-block mt-6 px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Explore Programmes
          </a>
        </div>
      </section>

      {/* ---------- Main Split Section ---------- */}
      <div
        id="programmes"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 px-4 py-16"
      >
        {/* LEFT NAV */}
        <nav
          aria-label="Programmes"
          className="md:col-span-4 col-span-1 md:sticky md:top-24 self-start h-fit"
        >
          <div className="bg-neutral-900/70 border border-purple-600 rounded-xl p-4 shadow-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-purple-600 mb-2">
              Programmes
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Select a programme to view details.
            </p>

            <ul role="list" className="space-y-2">
              {programmes.map((p) => {
                const active = p.key === selected;
                return (
                  <li key={p.key}>
                    <button
                      onClick={() => setSelected(p.key)}
                      aria-current={active ? "true" : "false"}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition
                        ${
                          active
                            ? "bg-gradient-to-r from-purple-600 to-green-500 text-black shadow-inner"
                            : "hover:bg-neutral-800/60"
                        }
                      `}
                    >
                      <div className="flex-1">
                        <div
                          className={`font-semibold ${
                            active ? "text-black" : "text-white"
                          }`}
                        >
                          {p.title}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            active ? "text-black/70" : "text-gray-300"
                          }`}
                        >
                          {p.subtitle}
                        </div>
                      </div>
                      <FaArrowRight className="text-sm opacity-80" />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <a
                href="/apply"
                className="flex-1 text-center px-3 py-2 bg-green-500 text-black rounded-md font-semibold hover:bg-green-600 transition"
              >
                Apply Now
              </a>
              <a
                href="/brochure.pdf"
                className="px-3 py-2 border border-purple-600 rounded-md text-purple-600 hover:bg-neutral-800 transition text-sm"
              >
                Brochure
              </a>
            </div>
          </div>
        </nav>

        {/* RIGHT CONTENT */}
        <main className="md:col-span-8 col-span-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={current.key}
              variants={contentVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <header className="bg-neutral-900/60 border border-purple-600 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-purple-600">
                  {current.title}
                </h2>
                <p className="text-gray-300 mt-1">{current.subtitle}</p>
              </header>

              {/* Eligibility */}
              <section>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  Eligibility
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {current.eligibility.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Selection Process */}
              <section>
                <h3 className="text-xl font-semibold text-green-500 mb-2">
                  Selection Process
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  {current.selectionProcess.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>

              {/* Fee Structure */}
              <section>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  Fee Structure
                </h3>
                <p className="text-gray-300 mb-3">{current.fees.overview}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {current.fees.breakdown.map((fee, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-900/40 border border-purple-600 rounded-lg p-4 flex justify-between"
                    >
                      <span className="text-sm text-gray-300">{fee.label}</span>
                      <span className="text-sm font-semibold text-green-500">
                        {formatAmt(fee.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scholarship */}
              <section className="pb-6">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  Scholarship & Financial Aid
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {current.scholarship.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            </motion.article>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdmissionsSplitView;
