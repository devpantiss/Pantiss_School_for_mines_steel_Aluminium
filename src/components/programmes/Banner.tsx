import React from "react";

const ProgrammesBanner: React.FC = () => {
  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/06/12/Pictures/student-pradesh-education-pradeep-meerut-development-vocational_f33699a6-4f71-11e7-8a38-d46223a68388.JPG')",
          backgroundAttachment: "fixed", // Parallax effect
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Our Skill Development Programmes
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow">
          Empowering individuals with practical skills and hands-on training
          across industries like Mines, Power, Steel, Shipping, Infrastructure,
          and more — building a workforce ready for tomorrow.
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-black to-purple-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-black to-green-500"></div>

    </section>
  );
};

export default ProgrammesBanner;
