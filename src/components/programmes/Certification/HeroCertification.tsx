import React from "react";
import { motion } from "framer-motion";

const HeroCertification: React.FC = () => {
  return (
    <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgtc2fvgu/image/upload/v1742126787/E-FvYHdVIAYEXa9_efneu2.webp')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight font-sans">
          Industry-Aligned Certification Courses
        </h1>
        <p className="text-lg md:text-xl text-gray-100 drop-shadow-md leading-relaxed">
          Specialized certification programs co-designed with industry experts, 
          equipping learners with cutting-edge skills across Mines, Steel & Aluminium, 
          Power & Energy, Shipping & Logistics, Infrastructure, Semiconductors & EV Tech, 
          Green Jobs, Textiles & Apparels, and Social Development. 
          Build capabilities that employers demand and fast-track your career growth 
          with globally recognized credentials.
        </p>
      </motion.div>

      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-black to-purple-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-black to-green-600"></div>

      {/* Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default HeroCertification;
