import React, { memo, useState, useMemo } from "react";

interface Feature {
  label: string;
  icon: string;
}

interface LocationContent {
  [key: string]: {
    image: string;
    description: string;
    features: Feature[];
  };
}

const CampusExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Talcher");

  const locationContent = useMemo<LocationContent>(
    () => ({
      Talcher: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963114/center_2_robsat.avif",
        description: "Talcher campus offers state-of-the-art facilities for skill development, blending modern technology with vibrant student life. Known for its sports and cultural programs, it provides an immersive learning environment with top-tier residential amenities.",
        features: [
          { label: "Sports & Fitness", icon: "🚴" },
          { label: "Art & Culture", icon: "🎨" },
          { label: "Residential Facilities", icon: "🏢" },
          { label: "Student Clubs", icon: "📂" },
        ],
      },
      Bhawanipatna: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963115/center_5_cxafn9.jpg",
        description: "Bhawanipatna campus is a hub for innovation, featuring advanced tech clubs and cultural events. Its modern gymnasium and comfortable hostels create a dynamic space for students to grow and connect.",
        features: [
          { label: "Modern Gymnasium", icon: "💪" },
          { label: "Cultural Events", icon: "🎭" },
          { label: "Hostel Accommodation", icon: "🏠" },
          { label: "Tech Clubs", icon: "💻" },
        ],
      },
      Sukinda: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963115/center_6_wp93zg.jpg",
        description: "Sukinda campus excels in fostering creativity and entrepreneurship. With a state-of-the-art sports complex and music programs, it offers a nurturing environment for both academic and personal growth.",
        features: [
          { label: "Sports Complex", icon: "🏀" },
          { label: "Music & Dance", icon: "🎶" },
          { label: "Dormitories", icon: "🛏️" },
          { label: "Entrepreneurship Club", icon: "🚀" },
        ],
      },
      Paradip: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963115/center_4_lwlmxt.jpg",
        description: "Paradip campus is renowned for its coastal-inspired facilities, including an aquatic center and theater group. Its residential halls and coding society make it a vibrant hub for skill development.",
        features: [
          { label: "Aquatic Center", icon: "🏊" },
          { label: "Theater Group", icon: "🎬" },
          { label: "Residential Halls", icon: "🏛️" },
          { label: "Coding Society", icon: "🖥️" },
        ],
      },
      Jharsuguda: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963115/center_1_h0i0l3.webp",
        description: "Jharsuguda campus combines cutting-edge technology with artistic expression. Its fitness arena and robotics club provide students with opportunities to excel in both physical and technical skills.",
        features: [
          { label: "Fitness Arena", icon: "🏋️" },
          { label: "Art Exhibitions", icon: "🖼️" },
          { label: "Student Housing", icon: "🏘️" },
          { label: "Robotics Club", icon: "🤖" },
        ],
      },
      Joda: {
        image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1753963116/center_3_jvfg3r.jpg",
        description: "Joda campus is a center for innovation and cultural vibrancy. With sports fields and an innovation hub, it fosters a collaborative environment for students to explore and create.",
        features: [
          { label: "Sports Fields", icon: "⚽" },
          { label: "Cultural Festivals", icon: "🎉" },
          { label: "Campus Residences", icon: "🏡" },
          { label: "Innovation Hub", icon: "💡" },
        ],
      },
    }),
    []
  );

  const campusLocations = ["Talcher", "Bhawanipatna", "Sukinda", "Paradip", "Jharsuguda", "Joda"];

  return (
    <section className="bg-gradient-to-b from-black via-purple-900 to-black">
      <div className="max-w-7xl mx-auto gap-x-8 py-16 px-4 md:px-16 flex flex-col md:flex-row-reverse items-center">
        {/* Left Section */}
        <div className="md:w-1/3 w-full flex flex-col justify-start space-y-6">
          <h2 className="text-5xl font-semibold leading-snug text-white">
            A<br />
            <span className="text-green-500">Campus</span> Experience <br />
            Like No Other.
          </h2>
          <div className="">
            {[
              { label: "Sports & Fitness", icon: "🚴" },
              { label: "Art & Culture", icon: "🎨" },
              { label: "Residential Facilities", icon: "🏢" },
              { label: "Student Clubs", icon: "📂" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 border-b text-white border-gray-300 cursor-pointer hover:bg-green-500 transition"
                aria-label={item.label}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 w-full flex flex-col items-center justify-center md:items-end relative mt-10 md:mt-0">
          {/* Buttons */}
          <div className="flex w-full justify-center mb-6 items-center gap-x-4">
            {["INFRASTRUCTURE", "RESIDENTIAL FACILITIES"].map((text, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 bg-purple-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
                aria-label={text}
              >
                <span className="text-lg">➤</span>
                <span className="text-sm font-medium">{text}</span>
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap w-full mb-6 justify-center gap-4 px-4"
            role="tablist"
            aria-label="Campus locations"
          >
            {campusLocations.map((location, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow transition ${
                  activeTab === location
                    ? "bg-green-500 text-white"
                    : "bg-purple-600 text-white hover:bg-green-500"
                }`}
                onClick={() => setActiveTab(location)}
                role="tab"
                aria-selected={activeTab === location}
                aria-controls={`panel-${location}`}
                tabIndex={0}
                id={`tab-${location}`}
              >
                {location}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div
            className="w-full flex flex-col items-center"
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {/* Dynamic Image */}
            <div className="w-full bg-gray-300 rounded-md overflow-hidden mb-4">
              <img
                src={locationContent[activeTab]?.image || ""}
                alt={`${activeTab} Campus View`}
                className="w-full h-[450px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Dynamic Description */}
            <p
              id={`description-${activeTab}`}
              className="text-sm text-gray-300 max-w-prose mx-auto mb-4"
              aria-label={`${activeTab} campus description`}
            >
              {locationContent[activeTab]?.description || ""}
            </p>

            {/* Dynamic Feature List */}
            {/* <div className="w-full space-y-4">
              {locationContent[activeTab]?.features.map((item, index) => (
                <div
                  key={index}
                  id={`feature-${activeTab}-${index}`}
                  className="flex items-center space-x-3 p-4 border-b text-white border-gray-300 cursor-pointer hover:bg-orange-500 transition"
                  aria-label={item.label}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CampusExperience);