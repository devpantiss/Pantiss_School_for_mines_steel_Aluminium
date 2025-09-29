import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WhyProgrammesBanner: React.FC = () => {
  const reasons = [
    {
      title: "Industry-Aligned Training",
      text: "Our courses are co-created with leading companies to match real-world job requirements.",
      image:
        "https://images.unsplash.com/photo-1581090700227-4c4f50a1c2a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Hands-On Learning",
      text: "Practical workshops and live projects help you gain real experience.",
      image:
        "https://images.unsplash.com/photo-1581091215367-59ab6c9a5f3b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Career Support",
      text: "From resume building to placement drives, we support you every step of the way.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Future-Ready Skills",
      text: "Stay ahead with training in emerging fields like Green Jobs, AI, and Smart Infrastructure.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Expert Faculty",
      text: "Learn from industry professionals and domain experts with years of experience.",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "State-of-the-Art Facilities",
      text: "Modern labs and smart classrooms ensure you learn with the latest tools and technologies.",
      image:
        "https://images.unsplash.com/photo-1581093448799-1c2c0e6e04f6?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Affordable & Accessible",
      text: "We make quality training affordable and accessible to all, bridging the skills gap.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Global Opportunities",
      text: "Gain skills that open doors to jobs in both domestic and international markets.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="relative py-8 w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 max-w-7xl mx-auto text-white">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Why Our Programmes?
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow">
            Because we don’t just train for jobs — we build futures. Our
            programmes focus on{" "}
            <span className="font-semibold">industry-aligned skills</span>,{" "}
            <span className="font-semibold">hands-on experience</span>, and
            holistic growth, preparing you to thrive in a rapidly changing
            world.
          </p>
        </div>

        {/* Right Section (Carousel) */}
        <div className="w-full">
          <Slider {...sliderSettings}>
            {reasons.map((reason, index) => (
              <div key={index} className="px-4">
                <div
                  className="rounded-2xl h-[250px] flex flex-col justify-end p-6 bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url(${reason.image})` }}
                >
                  <div className="bg-black/50 p-4 rounded-xl">
                    <h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-sm text-gray-200">{reason.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default WhyProgrammesBanner;
