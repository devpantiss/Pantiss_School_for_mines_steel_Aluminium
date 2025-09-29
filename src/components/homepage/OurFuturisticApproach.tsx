import React, { memo, useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Vehicle {
  title: string;
  image: string;
  description: string;
  registrationNo: string;
  assetNo: string;
  engineNo: string;
  chassisNo: string;
  quantity: string;
}

const fleetData: Vehicle[] = [
  {
    title: "Futuristic Skill on Wheels",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746022829/WhatsApp_Image_2025-04-30_at_5.37.40_PM_s3tcrn.jpg",
    description: "A state-of-the-art mobile lab equipped with AR/VR-based skill development modules, delivering immersive learning to remote areas.",
    registrationNo: "VOL-EXC-5678",
    assetNo: "A-002",
    engineNo: "ENG-480-2345",
    chassisNo: "CHS-480-9012",
    quantity: "3",
  },
  {
    title: "Advanced Operator Training Simulators",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746023415/WhatsApp_Image_2025-03-03_at_10.47.37_PM_1_ng3dvl.jpg",
    description: "Realistic simulators that replicate heavy machinery controls, helping trainees master equipment handling in a safe virtual environment.",
    registrationNo: "ACE-HYD-9012",
    assetNo: "A-003",
    engineNo: "ENG-014-6789",
    chassisNo: "CHS-014-3456",
    quantity: "2",
  },
  {
    title: "Large Scale Shipping Simulator",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746023414/WhatsApp_Image_2025-02-28_at_5.00.19_PM_l7dq7p.jpg",
    description: "A maritime simulation module designed for hands-on logistics and port operations training using realistic AR-based controls.",
    registrationNo: "CAT-LOD-3456",
    assetNo: "A-004",
    engineNo: "ENG-950-1234",
    chassisNo: "CHS-950-7890",
    quantity: "4",
  },
  {
    title: "Infrastructure Equipment Simulator",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746023907/WhatsApp_Image_2025-02-28_at_5.00.19_PM_1_ov0z9z.jpg",
    description: "Simulator module for construction site operations including bulldozers, backhoes, and graders to simulate field work conditions.",
    registrationNo: "CAT-HPK-7890",
    assetNo: "A-005",
    engineNo: "ENG-777-5678",
    chassisNo: "CHS-777-2345",
    quantity: "Coming soon",
  },
  {
    title: "Highend Welding Machinaries",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_crop,w_1000,h_1000/v1746022829/welding_pfnxjr.webp",
    description: "Precision welding units integrated with simulation feedback for real-time skill correction and performance enhancement.",
    registrationNo: "PRO-EV-2345",
    assetNo: "A-006",
    engineNo: "ENG-EV-9012",
    chassisNo: "CHS-EV-6789",
    quantity: "3",
  },
  {
    title: "Electrician Training Simulators",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_crop,w_600,h_1000/v1746022828/electrician_kdeqet.webp",
    description: "Interactive simulators for wiring, circuit assembly, and troubleshooting exercises using AR overlays and guided steps.",
    registrationNo: "ACE-TC-6040",
    assetNo: "A-007",
    engineNo: "ENG-TC-6040-5678",
    chassisNo: "CHS-TC-6040-1234",
    quantity: "1",
  },
];

interface VehicleCardProps {
  vehicle: Vehicle;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
}

const VehicleCard = memo(
  ({ vehicle, onMouseEnter, onMouseLeave, index }: VehicleCardProps) => {
    return (
      <div
        className="relative w-[450px] h-full group cursor-pointer bg-gradient-to-b from-black to-purple-900 rounded-xl overflow-hidden shadow-2xl border-2 border-green-600 flex flex-col"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        tabIndex={0}
        aria-label={`Vehicle card for ${vehicle.title}`}
        aria-describedby={`vehicle-details-${index}`}
      >
        {/* Top: Vehicle Name and Quantity */}
        <div className="bg-purple-600/30 text-white text-center py-3">
          <h3 className="text-xl font-bold">{vehicle.title}</h3>
          <p className="text-sm text-green-500">Numbers: {vehicle.quantity}</p>
        </div>

        {/* Middle: Vehicle Image */}
        <img
          src={vehicle.image}
          alt={vehicle.title}
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Bottom: Vehicle Details */}
        <div className="bg-black/60 text-white text-sm p-4 flex-1 flex flex-col">
          <p id={`vehicle-details-${index}`} className="text-sm text-gray-300 line-clamp-3 mb-3">{vehicle.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-green-600">Registration No:</p>
              <p>{vehicle.registrationNo}</p>
            </div>
            <div>
              <p className="font-semibold text-green-600">Asset No:</p>
              <p>{vehicle.assetNo}</p>
            </div>
            <div>
              <p className="font-semibold text-green-600">Engine No:</p>
              <p>{vehicle.engineNo}</p>
            </div>
            <div>
              <p className="font-semibold text-green-600">Chassis No:</p>
              <p>{vehicle.chassisNo}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.vehicle.title === nextProps.vehicle.title
);

VehicleCard.displayName = "VehicleCard";

const OurFuturisticApproach: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const fleetList = useMemo(() => [...fleetData, ...fleetData], []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed;
        container.scrollLeft = scrollPositionRef.current;

        const totalWidth = fleetData.length * 320;
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    const container = scrollContainerRef.current;
    if (container) scrollPositionRef.current = container.scrollLeft;
    setIsPaused(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-purple-900 to-black overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our <span className="text-green-500">Futuristic Approach</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          A Glimpse into our Next-Gen Lab Equipments — powered by Advanced Simulators,
          AR/VR Modules, and Real-World Skill Training Infrastructure.
        </p>
      </div>

      {/* Scrollable Fleet Container */}
      <div className="relative max-w-[1440px] mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden gap-6 px-4 pb-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Scrolling futuristic equipment cards"
        >
          {fleetList.map((vehicle, index) => (
            <div
              key={`${vehicle.title}-${index}`}
              className="flex-shrink-0 min-w-[320px]"
            >
              <VehicleCard
                vehicle={vehicle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/dashboard"
          className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg ring-2 ring-green-600 hover:bg-green-700 hover:ring-2 hover:ring-green-400/70 focus-visible:ring-2 focus-visible:ring-green-400 transition-all duration-300"
          aria-label="Explore Skill and Jobs Dashboard"
        >
          Explore Skill & Jobs Dashboard
        </Link>
      </div>
    </section>
  );
};

export default memo(OurFuturisticApproach, () => true);