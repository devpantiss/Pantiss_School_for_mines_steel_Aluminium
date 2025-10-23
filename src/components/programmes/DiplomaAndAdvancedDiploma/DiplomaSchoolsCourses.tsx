import React, { memo, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Play, Pause, Users, Award, Clock, ArrowUpRight } from "lucide-react";

// Define interfaces for type safety
interface Course {
  name: string;
  nsqfLevel: number;
  duration: string;
  enrolled: number;
}

interface School {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  gradient: string;
  courses: Course[];
  totalStudents: number;
  successRate: number;
}

// Enhanced schools data with realistic content
const schools: School[] = [
  {
    id: "mines-steel",
    name: "School of Mines, Steel & Aluminium",
    shortName: "Mines & Steel",
    description:
      "Practical diploma programs in mining operations, mineral processing, steel plant operations, and aluminium fabrication with emphasis on workplace safety.",
    image: "https://images.unsplash.com/photo-1504917595217/d4dc5ebe6122?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-amber-500/20 via-orange-500/20 to-purple-500/20",
    totalStudents: 2840,
    successRate: 94,
    courses: [
      { name: "Diploma in Mining Operations", nsqfLevel: 5, duration: "2 years", enrolled: 485 },
      { name: "Advanced Diploma in Mineral Processing", nsqfLevel: 6, duration: "3 years", enrolled: 620 },
      { name: "Diploma in Steel Plant Operations", nsqfLevel: 4, duration: "1.5 years", enrolled: 380 },
    ],
  },
  {
    id: "power-energy",
    name: "School of Power & Energy",
    shortName: "Power & Energy",
    description:
      "Specialized programs covering power plant operation, renewable energy systems, electrical maintenance, and grid integration with hands-on lab training.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-yellow-400/20 via-orange-400/20 to-purple-400/20",
    totalStudents: 3250,
    successRate: 96,
    courses: [
      { name: "Advanced Diploma in Power Plant Operation", nsqfLevel: 7, duration: "3 years", enrolled: 720 },
      { name: "Diploma in Renewable Energy Systems", nsqfLevel: 5, duration: "2 years", enrolled: 890 },
      { name: "Diploma in Electrical Maintenance", nsqfLevel: 4, duration: "1.5 years", enrolled: 450 },
    ],
  },
  {
    id: "shipping-logistics",
    name: "School of Shipping & Logistics",
    shortName: "Shipping & Logistics",
    description:
      "Programs focusing on port management, shipping operations, supply chain coordination, and customs regulations, combining theory with real-world exposure.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-green-400/20 via-cyan-400/20 to-teal-400/20",
    totalStudents: 1980,
    successRate: 92,
    courses: [
      { name: "Advanced Diploma in Supply Chain Management", nsqfLevel: 6, duration: "2.5 years", enrolled: 420 },
      { name: "Diploma in Port Operations", nsqfLevel: 4, duration: "1.5 years", enrolled: 680 },
      { name: "Diploma in International Trade", nsqfLevel: 5, duration: "2 years", enrolled: 290 },
    ],
  },
  {
    id: "infra-facility",
    name: "School of Infrastructure & Facility Management",
    shortName: "Infrastructure",
    description:
      "Courses in civil construction techniques, facility operations management, project planning, and site safety with live project internships.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-gray-400/20 via-slate-400/20 to-zinc-400/20",
    totalStudents: 2760,
    successRate: 89,
    courses: [
      { name: "Advanced Diploma in Civil Construction", nsqfLevel: 6, duration: "3 years", enrolled: 540 },
      { name: "Diploma in Facility Operations Management", nsqfLevel: 5, duration: "2 years", enrolled: 780 },
      { name: "Diploma in Project Planning", nsqfLevel: 4, duration: "1.5 years", enrolled: 320 },
    ],
  },
  {
    id: "semiconductors-ev",
    name: "School of Semiconductors & EV Technology",
    shortName: "Tech & EV",
    description:
      "Industry-aligned diplomas on semiconductor fabrication processes, electric vehicle powertrain systems, and advanced manufacturing automation.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-purple-400/20 via-green-400/20 to-cyan-400/20",
    totalStudents: 1540,
    successRate: 97,
    courses: [
      { name: "Advanced Diploma in Semiconductor Technology", nsqfLevel: 7, duration: "3 years", enrolled: 280 },
      { name: "Diploma in EV Systems", nsqfLevel: 5, duration: "2 years", enrolled: 520 },
      { name: "Diploma in Advanced Manufacturing", nsqfLevel: 6, duration: "2.5 years", enrolled: 340 },
    ],
  },
  {
    id: "green-jobs",
    name: "School of Green Jobs",
    shortName: "Green Jobs",
    description:
      "Programs in sustainable farming methods, renewable energy installations, waste management, and environmental monitoring for green sector careers.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-green-400/20 via-emerald-400/20 to-teal-400/20",
    totalStudents: 2240,
    successRate: 93,
    courses: [
      { name: "Advanced Diploma in Environmental Engineering", nsqfLevel: 6, duration: "3 years", enrolled: 450 },
      { name: "Diploma in Sustainable Agriculture", nsqfLevel: 4, duration: "1.5 years", enrolled: 680 },
      { name: "Diploma in Renewable Energy Systems", nsqfLevel: 5, duration: "2 years", enrolled: 380 },
    ],
  },
  {
    id: "textiles-apparels",
    name: "School of Textiles & Apparels",
    shortName: "Textiles & Apparels",
    description:
      "Diploma programs covering textile engineering, garment manufacturing techniques, apparel quality control, and fashion technology management.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-pink-400/20 via-purple-400/20 to-indigo-400/20",
    totalStudents: 2100,
    successRate: 91,
    courses: [
      { name: "Advanced Diploma in Textile Engineering", nsqfLevel: 6, duration: "3 years", enrolled: 350 },
      { name: "Diploma in Fashion Technology", nsqfLevel: 4, duration: "1.5 years", enrolled: 480 },
      { name: "Diploma in Production Management", nsqfLevel: 5, duration: "2 years", enrolled: 420 },
    ],
  },
  {
    id: "social-development",
    name: "School of Social Development",
    shortName: "Social Development",
    description:
      "Advanced diplomas in community mobilization, public health programs, rural development project management, and research methods for social welfare.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d85?w=800&h=600&fit=crop&crop=entropy",
    gradient: "from-blue-400/20 via-indigo-400/20 to-purple-400/20",
    totalStudents: 1500,
    successRate: 88,
    courses: [
      { name: "Advanced Diploma in Social Work", nsqfLevel: 6, duration: "3 years", enrolled: 320 },
      { name: "Diploma in Community Development", nsqfLevel: 4, duration: "1.5 years", enrolled: 480 },
      { name: "Diploma in Public Health", nsqfLevel: 5, duration: "2 years", enrolled: 380 },
    ],
  },
];

const DiplomaSchoolsCarousel: React.FC = () => {
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
                    <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {currentSchool.totalStudents.toLocaleString()} Students
                    </div>
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
                          <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-lg font-medium">
                            Level {course.nsqfLevel}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.enrolled} enrolled
                          </span>
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

export default memo(DiplomaSchoolsCarousel);
