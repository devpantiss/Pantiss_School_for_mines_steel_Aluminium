import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Programme {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const FeaturedProgrammes = () => {
  const [programmes] = useState<Programme[]>([
    {
      id: 1,
      title: "Electrical Installation and Maintenance",
      description: "Learn advanced electrical wiring, circuit maintenance, and safety protocols for industrial and residential settings.",
      imageUrl: "https://picsum.photos/seed/electrician/800/450.jpg"
    },
    {
      id: 2,
      title: "Industrial Welding Techniques",
      description: "Master MIG, TIG, and arc welding for steel structures, pipelines, and heavy machinery applications.",
      imageUrl: "https://picsum.photos/seed/welder/800/450.jpg"
    },
    {
      id: 3,
      title: "Security Operations and Safety",
      description: "Gain skills in surveillance, crowd control, and emergency response for secure facility management.",
      imageUrl: "https://picsum.photos/seed/securityguard/800/450.jpg"
    },
    {
      id: 4,
      title: "Heavy Machinery Operation (Dumpers)",
      description: "Train to operate dumper trucks safely and efficiently in mining and construction environments.",
      imageUrl: "https://picsum.photos/seed/dumperoperator/800/450.jpg"
    },
    {
      id: 5,
      title: "Excavator Operation and Safety",
      description: "Learn to operate excavators for earth-moving tasks with a focus on precision and safety standards.",
      imageUrl: "https://picsum.photos/seed/excavatoroperator/800/450.jpg"
    },
    {
      id: 6,
      title: "Crane Operation and Rigging",
      description: "Develop expertise in operating cranes and rigging heavy loads for construction and industrial projects.",
      imageUrl: "https://picsum.photos/seed/craneoperator/800/450.jpg"
    },
    {
      id: 7,
      title: "Textile Machine Operations",
      description: "Master sewing machine operations for apparel production, focusing on precision and efficiency.",
      imageUrl: "https://picsum.photos/seed/sewingmachine/800/450.jpg"
    },
    {
      id: 8,
      title: "Material Handling and Conveyor Systems",
      description: "Learn to operate and maintain conveyor belt systems for efficient material handling in industries.",
      imageUrl: "https://picsum.photos/seed/conveyorbelt/800/450.jpg"
    }
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ],
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-purple-600/40 hover:bg-purple-600 transition-colors duration-200"></div>
    )
  };

  return (
    <section className="relative bg-black py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" role="region" aria-label="Featured Programmes">
      {/* === Glowing Background Orbs === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-green-500/25 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[150px]"></div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-white relative z-10">
        Featured Programmes
        <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 to-green-500 rounded-full"></span>
      </h2>
      
      {/* Slider */}
      <div className="relative slider-container z-10">
        <Slider {...settings}>
          {programmes.map((programme) => (
            <div key={programme.id} className="px-2">
              <ProgrammeCard programme={programme} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

interface ProgrammeCardProps {
  programme: Programme;
}

const ProgrammeCard = ({ programme }: ProgrammeCardProps) => {
  return (
    <div className="
      relative bg-black/70 backdrop-blur-md rounded-xl overflow-hidden border border-purple-600/30
      shadow-[0_4px_20px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_24px_rgba(34,197,94,0.35)]
      group cursor-pointer transition-all duration-300
      transform perspective-1000 hover:scale-105
      focus-visible:ring-2 focus-visible:ring-green-500
    ">
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={programme.imageUrl} 
          alt={programme.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">{programme.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{programme.description}</p>
        
        <button className="
          inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-green-500 text-white
          rounded-md shadow-md hover:from-purple-500 hover:to-green-400 transition-all duration-300 font-semibold text-sm
        ">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProgrammes;
