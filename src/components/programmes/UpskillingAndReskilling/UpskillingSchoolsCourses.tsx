import React, { memo, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Play, Pause, Award, Clock, ArrowUpRight } from "lucide-react";

// Define interfaces for type safety
interface Course {
  name: string;
  skillLevel: string;
  duration: string;
  participants: number;
}

interface School {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  gradient: string;
  totalParticipants: number;
  successRate: number;
  courses: Course[];
}


// Enhanced schools data with realistic content
const schools: School[] = [
  {
    id: "mines-steel",
    name: "Skilling in Mines, Steel & Aluminium",
    shortName: "Mines & Steel",
    description:
      "Hands-on training in mining operations, steel plant processes, and aluminium fabrication. Programs emphasize workplace safety and operational excellence.",
    image:
      "https://images.unsplash.com/photo-1504917595217/d4dc5ebe6122?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-amber-500/20 via-orange-500/20 to-purple-500/20",
    totalParticipants: 2840,
    successRate: 94,
    courses: [
      { name: "Mining Equipment Operations", skillLevel: "Intermediate", duration: "6 months", participants: 485 },
      { name: "Steel Manufacturing Techniques", skillLevel: "Advanced", duration: "9 months", participants: 620 },
      { name: "Aluminium Fabrication & Safety", skillLevel: "Basic", duration: "4 months", participants: 380 },
    ],
  },
  {
    id: "power-energy",
    name: "Skilling in Power & Energy",
    shortName: "Power & Energy",
    description:
      "Programs designed for power plant operation, renewable energy systems, and electrical maintenance, blending classroom learning with live lab practice.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-yellow-400/20 via-orange-400/20 to-purple-400/20",
    totalParticipants: 3250,
    successRate: 96,
    courses: [
      { name: "Power Plant Operations", skillLevel: "Advanced", duration: "1 year", participants: 720 },
      { name: "Renewable Energy Technician", skillLevel: "Intermediate", duration: "8 months", participants: 890 },
      { name: "Electrical Systems Maintenance", skillLevel: "Basic", duration: "6 months", participants: 450 },
    ],
  },
  {
    id: "shipping-logistics",
    name: "Skilling in Shipping & Logistics",
    shortName: "Logistics",
    description:
      "Skill development programs in port management, shipping operations, and supply chain systems with strong industry partnerships for practical exposure.",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-green-400/20 via-cyan-400/20 to-teal-400/20",
    totalParticipants: 1980,
    successRate: 92,
    courses: [
      { name: "Supply Chain Coordination", skillLevel: "Advanced", duration: "9 months", participants: 420 },
      { name: "Port & Cargo Handling", skillLevel: "Basic", duration: "5 months", participants: 680 },
      { name: "International Trade Practices", skillLevel: "Intermediate", duration: "7 months", participants: 290 },
    ],
  },
  {
    id: "infra-facility",
    name: "Skilling in Infrastructure & Facility Management",
    shortName: "Infrastructure",
    description:
      "Upskilling programs covering civil construction, facility operations, and project management with real-world projects and site training.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-gray-400/20 via-slate-400/20 to-zinc-400/20",
    totalParticipants: 2760,
    successRate: 89,
    courses: [
      { name: "Civil Construction Practices", skillLevel: "Intermediate", duration: "10 months", participants: 540 },
      { name: "Facility Operations Management", skillLevel: "Advanced", duration: "1 year", participants: 780 },
      { name: "Project Planning & Supervision", skillLevel: "Basic", duration: "6 months", participants: 320 },
    ],
  },
  {
    id: "semiconductors-ev",
    name: "Skilling in Semiconductors & EV Technology",
    shortName: "Tech & EV",
    description:
      "Future-ready training on semiconductor fabrication, EV powertrains, and advanced manufacturing processes with global industry standards.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-purple-400/20 via-green-400/20 to-cyan-400/20",
    totalParticipants: 1540,
    successRate: 97,
    courses: [
      { name: "Semiconductor Fabrication", skillLevel: "Advanced", duration: "1 year", participants: 280 },
      { name: "EV Technology Training", skillLevel: "Intermediate", duration: "9 months", participants: 520 },
      { name: "Smart Manufacturing Systems", skillLevel: "Intermediate", duration: "8 months", participants: 340 },
    ],
  },
  {
    id: "green-jobs",
    name: "Skilling in Green Jobs",
    shortName: "Green Jobs",
    description:
      "Sustainability-focused skilling programs in organic farming, waste management, and renewable energy installations for a greener workforce.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-green-400/20 via-emerald-400/20 to-teal-400/20",
    totalParticipants: 2240,
    successRate: 93,
    courses: [
      { name: "Sustainable Agriculture Practices", skillLevel: "Basic", duration: "6 months", participants: 680 },
      { name: "Renewable Energy Installations", skillLevel: "Intermediate", duration: "8 months", participants: 380 },
      { name: "Waste Management & Recycling", skillLevel: "Advanced", duration: "9 months", participants: 450 },
    ],
  },
  {
    id: "textiles-apparels",
    name: "Skilling in Textiles & Apparels",
    shortName: "Textiles",
    description:
      "Practical training in textile production, garment manufacturing, and fashion technology with focus on quality standards and export readiness.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-pink-400/20 via-purple-400/20 to-indigo-400/20",
    totalParticipants: 2100,
    successRate: 91,
    courses: [
      { name: "Garment Manufacturing", skillLevel: "Basic", duration: "6 months", participants: 480 },
      { name: "Textile Engineering Basics", skillLevel: "Intermediate", duration: "9 months", participants: 350 },
      { name: "Fashion & Apparel Technology", skillLevel: "Advanced", duration: "1 year", participants: 420 },
    ],
  },
  {
    id: "social-development",
    name: "Skilling in Social Development",
    shortName: "Social Dev.",
    description:
      "Programs that equip learners with skills in community development, rural project management, and public health outreach for social change.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d85?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-blue-400/20 via-indigo-400/20 to-purple-400/20",
    totalParticipants: 1500,
    successRate: 88,
    courses: [
      { name: "Community Development Practices", skillLevel: "Basic", duration: "6 months", participants: 480 },
      { name: "Public Health Outreach", skillLevel: "Intermediate", duration: "8 months", participants: 380 },
      { name: "Rural Project Management", skillLevel: "Advanced", duration: "1 year", participants: 320 },
    ],
  },
];

const UpskillingReskillingSchoolsCourses: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-scroll with pause on hover
  useEffect(() => {
    if (!isPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % schools.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPlaying, isPaused]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? schools.length - 1 : prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % schools.length);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentSchool = schools[currentIndex];

  return (
    <section 
      className="relative py-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Diploma & Advanced Diploma Schools Carousel"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        //   poster="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&h=1080&fit=crop&crop=entropy"
        >
          <source
            src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1742994033/12700136_1920_1080_30fps_zajh9b.mp4"
            type="video/mp4"
          />
          {/* <source
            src="https://assets.mixkit.co/videos/preview/mixkit-working-in-a-factory-with-heavy-machinery-4129-large.mp4"
            type="video/mp4"
          /> */}
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black"></div>
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-black"></div>
        
        {/* Animated Overlay Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-green-600/30 to-green-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-green-100 to-purple-100 bg-clip-text text-transparent">
            Diploma & Advanced Diploma Schools
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Comprehensive academic programs with industry-aligned curriculum, practical training, and professional credentials across core sectors
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-500"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-500"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 group p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 hover:ring-green-500"
            aria-label="Previous school"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 group p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 hover:ring-green-500"
            aria-label="Next school"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Main Card */}
          <div className="mx-auto max-w-5xl">
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${currentSchool.gradient} rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Image Section */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={currentSchool.image}
                    alt={currentSchool.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Overlay Stats */}
                  <div className="absolute top-6 right-6 flex flex-col space-y-2">
                    <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {currentSchool.successRate}% Success
                    </div>
                    {/* <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {currentSchool.totalStudents.toLocaleString()} Students
                    </div> */}
                  </div>

                  {/* School Badge */}
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {currentSchool.shortName}
                    </h3>
                    <p className="text-gray-200 text-sm md:text-base max-w-md">
                      {currentSchool.description}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    NSQF-Aligned Diploma Programs
                  </h4>
                  
                  <div className="grid gap-4">
                    {currentSchool.courses.map((course, index) => (
                      <div 
                        key={index}
                        className="group/course bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-white group-hover/course:text-green-300 transition-colors">
                            {course.name}
                          </h5>
                          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover/course:text-white transition-colors" />
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          {/* <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-lg font-medium">
                            Level {course.nsqfLevel}
                          </span> */}
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </span>
                          {/* <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.enrolled} enrolled
                          </span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Indicators */}
        <div className="flex items-center justify-center mt-8 space-x-6">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:scale-110"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Indicators */}
          <div className="flex space-x-2">
            {schools.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-8 h-3 bg-green-500"
                    : "w-3 h-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="text-sm text-gray-400 font-medium">
            {currentIndex + 1} / {schools.length}
          </div>
        </div>

        {/* Navigation Hints */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Use arrow keys to navigate • Hover to pause • Swipe on mobile
        </div>
      </div>
    </section>
  );
};

export default memo(UpskillingReskillingSchoolsCourses);
