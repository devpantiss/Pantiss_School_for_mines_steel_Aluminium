import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative h-screen w-full py-6 mt-32 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1742998746/4474927-uhd_3840_2160_30fps_v7ypop.mp4" // Replace with a mining/steel/aluminium-related video URL
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 py-8 lg:px-16">
        {/* Left Section: Text and CTA */}
        <div className="text-white lg:w-1/2 w-full p-4">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-wrap">
            Pantiss School of Mines, Steel & Aluminium
          </h1>
          <p className="text-2xl lg:text-3xl mt-4">
            Forging the Future of Industry
          </p>
          <p className="text-xl lg:text-md mt-2">
            Launch your career in the dynamic world of mining, steel, and aluminium production. Train to become a skilled Welder, Metallurgist, Machine Operator, Safety Officer, or Process Technician, and shape the backbone of modern industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;