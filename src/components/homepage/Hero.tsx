import React, { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection: React.FC = () => {


  return (
    <div className="relative mt-28 text-white h-[700px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1742991998/video-poster_kzq1zq.jpg"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1742369429/WhatsApp_Video_2025-03-19_at_12-VEED_qo9hv6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* Main Content */}
      <div className="relative mt-10 flex mx-auto max-w-7xl flex-col md:flex-row items-center justify-center gap-y-8 md:gap-y-0 md:gap-x-12 px-8">
        {/* Text Section */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-6 mt-16 animate-fadeIn">
          <h1 className="text-5xl lg:text-6xl font-bold text-center lg:text-left text-white leading-tight">
            India's largest school exclusively for  <br />
            <span className="text-green-500">Mines, Steel & Aluminium Sector.</span>
          </h1>

          <h2 className="text-2xl font-bold text-center lg:text-left text-white">
            Roam in <span className="text-green-500">Mine, Steel & Aluminium Skill Park</span> & Enjoy{" "}
            <span className="text-green-500">AR/VR</span>, Simulation & Real-Time Gigantic Machines from{" "}
            <span className="text-green-500">Australia</span> & <span className="text-green-500">Japan</span>.
          </h2>

        </div>

      </div>
    </div>
  );
};

// Inject fade-in animation
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
    will-change: opacity, transform;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default memo(HeroSection);
