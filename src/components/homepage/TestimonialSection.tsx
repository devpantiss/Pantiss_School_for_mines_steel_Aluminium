import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";

// Define testimonial interface
interface Testimonial {
  logo: string;
  text: string;
  name: string;
  designation: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    logo: "https://labournet.in/wp-content/uploads/2022/03/Hindustan_Unilever_Logo-1.png",
    text: `The work delivered by LabourNet has always been par excellence. Our association with LabourNet has only grown stronger over the years and has become an integral part of HUL’s Economic Empowerment work under the Prabhat program. We hope to pursue this relationship in the future too.`,
    name: "Kanikal Pal",
    designation: "South Asia Head - Community Investment & Sustainability Programs",
    photo: "https://labournet.in/wp-content/uploads/2022/03/1612287903181-1.jpg",
  },
  {
    logo: "https://labournet.in/wp-content/uploads/2022/03/0-8.png",
    text: `We chose Labournet to ensure smooth roll out of our projects since it engages in effective planning, hires the right resources, assigns accountability, establishes clear communication between various stakeholders and monitors daily progress.`,
    name: "Sarita Bahl",
    designation: "Director - Bayer Foundation India",
    photo: "https://labournet.in/wp-content/uploads/2022/03/1612287903181-1-1.jpg",
  },
  {
    logo: "https://labournet.in/wp-content/uploads/2022/03/Bharat_Petroleum_Logo-1.png",
    text: `I thank the LabourNet for the exemplary work of imparting training in the local language in a very understanding and interactive manner, and the trainers were completely dedicated and involved. I would also recommend LabourNet to other organizations for their training services.`,
    name: "Mahendra Dongre",
    designation: "Marketing Manager - BPCL",
    photo: "https://labournet.in/wp-content/uploads/2022/03/1612287903181-1-1.jpg",
  },
];

// Default image fallback
const defaultImage = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-orange-600 rounded-full bg-white/10 p-2 hover:bg-white/20 z-10 transition-all duration-300"
    onClick={onClick}
    aria-label="Next testimonial"
    role="button"
    tabIndex={0}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-orange-600 rounded-full bg-white/10 p-2 hover:bg-white/20 z-10 transition-all duration-300"
    onClick={onClick}
    aria-label="Previous testimonial"
    role="button"
    tabIndex={0}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

const TestimonialSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const handleBeforeChange = (current: number, next: number) => {
    gsap.fromTo(
      `.slick-slide[data-index="${current}"]`,
      { opacity: 0.5, y: 20 },
      { opacity: 0, y: 0, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      `.slick-slide[data-index="${next}"]`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: handleBeforeChange,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {dots}
      </div>
    ),
    customPaging: () => (
      <div className="h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300" />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Initialize slider at first slide
  React.useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  return (
    <section className="bg-gradient-to-b from-black via-purple-900 to-black py-20">
      <div className="max-w-8xl mx-auto px-6">
        <h2 className="text-5xl font-semibold text-white text-center mb-12 relative tracking-wide">
          Trusted by the <span className="text-[#FF6A3D]">Best</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#FF6A3D] to-transparent rounded-lg" />
        </h2>
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-6 flex flex-col items-start relative h-full transform transition-all duration-300">
                {/* Company Logo */}
                <div className="mb-8">
                  <img
                    src={testimonial.logo || defaultImage}
                    alt="Company Logo"
                    className="h-16 object-contain"
                    loading="lazy"
                    onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
                  />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-50 italic text-base mb-6 flex-1">
                  "{testimonial.text}"
                </p>

                {/* User Details */}
                <div className="flex items-center mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-5">
                    <img
                      src={testimonial.photo || defaultImage}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-xl">{testimonial.name}</p>
                    <p className="text-md text-gray-200">{testimonial.designation}</p>
                  </div>
                </div>

                {/* Quotation Mark Icon */}
                <div className="absolute bottom-6 right-6 text-[#FF6A3D] text-4xl font-bold animate-pulse-slow">
                  “
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Custom animation for quotation mark
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default TestimonialSection;