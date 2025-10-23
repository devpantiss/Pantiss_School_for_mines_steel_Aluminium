import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const programmes = [
  {
    title: "Recognition of Prior Learning (RPL)",
    description: "Certifies experienced workers' skills for industry recognition.",
    comingSoon: false,
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1756969575/Gemini_Generated_Image_qpe2ylqpe2ylqpe2_qmxnkn.png",
    highlights: ["Skill Assessment", "Industry Recognition", "Career Advancement"],
    path: "/our-programmes/recognition-of-prior-learning",
  },
  {
    title: "Apprenticeship & Dual Training Programs",
    description: "Blends classroom learning with hands-on industry training.",
    comingSoon: false,
    image: "https://factly.in/wp-content/uploads//2022/04/National-Apprenticeship-Promotion-Scheme_Image-1.jpg",
    highlights: ["Hands-On Training", "Industry Exposure", "Dual Learning"],
    path: "/our-programmes/apprenticeship-and-dual-training",
  },
  {
    title: "Diploma & Advanced Diploma Programs",
    description: "Structured training for technical and supervisory roles.",
    comingSoon: false,
    image: "https://res.cloudinary.com/djtzx6wo7/image/upload/v1756907996/WhatsApp_Image_2025-09-03_at_7.27.27_PM_s7fkrs.jpg",
    highlights: ["Technical Skills", "Supervisory Training", "Career Growth"],
    path: "/our-programmes/diploma-programs",
  },
  {
    title: "Skill Development Bootcamps",
    description: "Intensive short-term programs for rapid job entry.",
    comingSoon: true,
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1739283474/WhatsApp_Image_2025-02-11_at_7.45.14_PM_zual7i.jpg",
    path: "/our-programmes/bootcamps",
  },
  {
    title: "Bridge & Foundation Programs",
    description: "Prepares dropouts for workforce with essential skills.",
    comingSoon: true,
    image: "https://affinityclasses.in/wp-content/uploads/2024/10/FOUNDATION-copy.jpg",
    path: "/our-programmes/bridge-foundation",
  },
  {
    title: "Upskilling & Reskilling Programs",
    description: "Adapts workers to new technologies for career longevity.",
    comingSoon: false,
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1740387857/7cf81b40-cb85-47b0-bc17-5ed47fa210ed_viwshh.jpg",
    highlights: ["Technology Adaptation", "Career Longevity", "Skill Enhancement"],
    path: "/our-programmes/upskilling-and-reskilling-program",
  },
  {
    title: "Industry-Aligned Certification Programs",
    description: "Industry-designed certifications for high employability.",
    comingSoon: false,
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1742126787/E-FvYHdVIAYEXa9_efneu2.webp",
    highlights: ["High Employability", "Industry Standards", "Certification"],
    path: "/our-programmes/industry-alligned-certification",
  },
  {
    title: "Continuing Professional Development (CPD)",
    description: "Specialized training for mid-level career advancement.",
    comingSoon: true,
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746023907/WhatsApp_Image_2025-02-28_at_5.00.19_PM_1_ov0z9z.jpg",
    path: "/our-programmes/cpd",
  },
  {
    title: "International Mobility Programs",
    description: "Global-standard training for overseas job opportunities.",
    comingSoon: true,
    image: "https://cdn.prod.website-files.com/67139b4944f3d6b890cda082/6720a95f025dc22684bab942_64f07126f5659751e457ca5a_workforce-management-system-mining-industry.jpeg",
    path: "/our-programmes/international-mobility",
  },
];

const ProgrammeCategories: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Dark Themed Section */}
      <section className="relative py-20 bg-black" role="region" aria-label="Programme Categories">
        {/* Blurry colorful circles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-70"></div>
          <div className="absolute bottom-32 right-10 w-80 h-80 bg-green-500 rounded-full mix-blend-screen filter blur-[140px] opacity-65"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-[160px] opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-purple-700 rounded-full mix-blend-screen filter blur-[130px] opacity-70"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* Animated Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-white font-black text-center mb-14 tracking-wide relative"
          >
            Programme Categories
            <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
          </motion.h2>

          {/* Active Programmes Row */}
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white font-black text-center mb-8 relative"
          >
            Active Programmes
            <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-16 h-1 bg-green-500 rounded-full"></span>
          </motion.h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {programmes
              .filter((programme) => !programme.comingSoon)
              .map((programme, index) => (
                <Link
                  to={programme.path}
                  key={index}
                  aria-label={`Navigate to ${programme.title}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                    className="
                      relative bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl
                      shadow-[0_6px_24px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_24px_rgba(239,68,68,0.3)]
                      overflow-hidden group hover:border-purple-500
                      transform perspective-1000 rotateX-5 rotateY-5 hover:rotateX-0 hover:rotateY-0 hover:scale-105
                      transition-all duration-300 animate-[pulse_2s_ease-in-out_1]
                      before:absolute before:inset-0 before:bg-gray-900/75 before:rounded-2xl before:opacity-100 before:transition-opacity before:duration-500
                      hover:before:bg-gray-900/70 focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer
                    "
                    style={{ backgroundImage: `url(${programme.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    {/* CONTENT */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-500 transition-colors">
                        {programme.title}
                      </h3>
                      <p className="mt-3 text-gray-100 text-sm font-medium leading-relaxed">
                        {programme.description}
                      </p>

                      {/* Highlights List */}
                      {(programme.highlights ?? []).length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {(programme.highlights ?? []).map((point, i) => (
                            <li
                              key={i}
                              className="flex items-center text-sm text-gray-100 font-medium"
                            >
                              <FaCheckCircle className="text-green-400 w-4 h-4 mr-2" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>

          {/* Coming Soon Programmes Row */}
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white font-black text-center mb-8 relative"
          >
            Coming Soon Programmes
            <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-16 h-1 bg-green-500 rounded-full"></span>
          </motion.h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {programmes
              .filter((programme) => programme.comingSoon)
              .map((programme, index) => (
                <Link
                  to={programme.path}
                  key={index}
                  aria-label={`Navigate to ${programme.title}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                    className="
                      relative bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl
                      shadow-[0_6px_24px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_24px_rgba(239,68,68,0.3)]
                      overflow-hidden group hover:border-purple-500
                      transform perspective-1000 rotateX-5 rotateY-5 hover:rotateX-0 hover:rotateY-0 hover:scale-105
                      transition-all duration-300 animate-[pulse_2s_ease-in-out_1]
                      before:absolute before:inset-0 before:bg-gray-900/75 before:rounded-2xl before:opacity-100 before:transition-opacity before:duration-500
                      hover:before:bg-gray-900/70 focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer
                    "
                    style={{ backgroundImage: `url(${programme.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    {/* COMING SOON BADGE */}
                    <span className="absolute z-50 top-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-[shake_3s_ease-in-out_infinite]">
                      <FaClock className="w-3 h-3" /> Coming Soon
                    </span>

                    {/* CONTENT */}
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-500 transition-colors">
                        {programme.title}
                      </h3>
                      <p className="mt-3 text-gray-100 text-sm font-medium leading-relaxed">
                        {programme.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgrammeCategories;