import React from "react";
import { motion } from "framer-motion";

const ProgrammesHero: React.FC = () => {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgtc2fvgu/image/upload/v1743679033/pilmo-kang-H72SCCTZPE8-unsplash_ru8urx.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating blurry circles for effect */}
      {/* <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" /> */}
      {/* <div className="absolute top-40 right-10 w-72 h-72 bg-green-500/30 rounded-full blur-3xl animate-pulse" /> */}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Explore Our <span className="text-purple-500">Programmes</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Empowering students with industry-ready skills, hands-on training, and
          a future-focused curriculum to lead in tomorrow’s workforce.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition">
            View All Programmes
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full shadow-lg transition">
            Admission Enquiry
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProgrammesHero;
