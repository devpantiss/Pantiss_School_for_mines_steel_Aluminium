import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Wrench,
  BookOpen,
  Zap,
  Heart,
  CheckCircle,
  GraduationCap,
  Building,
  Target,
  TrendingUp,
  Briefcase,
  UserCheck,
} from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  participants: string;
  category: "theory" | "practical" | "assessment" | "certification";
}

interface Program {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  timeline: TimelineEvent[];
}

const programs: Program[] = [
  {
    id: "rpl",
    name: "Recognition of Prior Learning (RPL)",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Certifies experienced workers' skills for industry recognition.",
    timeline: [
      {
        id: 1,
        title: "Skill Assessment & Documentation",
        description:
          "Comprehensive evaluation of existing skills, experience documentation, and competency mapping against industry standards.",
        date: "Week 1",
        duration: "40 hours",
        location: "Assessment Center",
        participants: "20-25",
        category: "assessment",
      },
      {
        id: 2,
        title: "Portfolio Development",
        description:
          "Creating professional portfolios, collecting evidence of prior learning, and documenting work experience.",
        date: "Week 2",
        duration: "30 hours",
        location: "Documentation Center",
        participants: "20-25",
        category: "practical",
      },
      {
        id: 3,
        title: "Skills Gap Analysis",
        description:
          "Identifying gaps between current skills and industry requirements, creating personalized learning pathways.",
        date: "Week 3",
        duration: "25 hours",
        location: "Training Center",
        participants: "20-25",
        category: "theory",
      },
      {
        id: 4,
        title: "Competency Validation",
        description:
          "Practical demonstration of skills, workplace simulation, and expert evaluation of competencies.",
        date: "Week 4",
        duration: "35 hours",
        location: "Practical Assessment Lab",
        participants: "20-25",
        category: "assessment",
      },
      {
        id: 5,
        title: "Industry Recognition Certificate",
        description:
          "Final certification ceremony and industry credential issuance for recognized prior learning.",
        date: "Week 5",
        duration: "8 hours",
        location: "Certification Center",
        participants: "20-25",
        category: "certification",
      },
    ],
  },
  {
    id: "apprenticeship-dual-training",
    name: "Apprenticeship & Dual Training Programs",
    icon: <Building className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Blends classroom learning with hands-on industry training.",
    timeline: [
      {
        id: 1,
        title: "Foundation Theory & Safety",
        description:
          "Basic theoretical knowledge, workplace safety protocols, and introduction to industry standards.",
        date: "Week 1-2",
        duration: "80 hours",
        location: "Training Institute",
        participants: "15-20",
        category: "theory",
      },
      {
        id: 2,
        title: "Industry Immersion Phase 1",
        description:
          "First workplace exposure, mentorship assignment, and basic hands-on tasks under supervision.",
        date: "Week 3-6",
        duration: "160 hours",
        location: "Industry Partner Site",
        participants: "15-20",
        category: "practical",
      },
      {
        id: 3,
        title: "Advanced Theory & Specialization",
        description:
          "Specialized technical knowledge, advanced concepts, and preparation for complex tasks.",
        date: "Week 7-8",
        duration: "80 hours",
        location: "Training Institute",
        participants: "15-20",
        category: "theory",
      },
      {
        id: 4,
        title: "Industry Immersion Phase 2",
        description:
          "Advanced workplace training, independent task execution, and project-based learning.",
        date: "Week 9-14",
        duration: "240 hours",
        location: "Industry Partner Site",
        participants: "15-20",
        category: "practical",
      },
      {
        id: 5,
        title: "Final Assessment & Placement",
        description:
          "Comprehensive evaluation, industry certification, and permanent job placement assistance.",
        date: "Week 15-16",
        duration: "60 hours",
        location: "Assessment & Placement Center",
        participants: "15-20",
        category: "certification",
      },
    ],
  },
  {
    id: "certificate-programs",
    name: "Certificate Programs (Short-Term, Modular)",
    icon: <Award className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Short courses for quick, skill-specific job readiness.",
    timeline: [
      {
        id: 1,
        title: "Module 1: Core Skills Foundation",
        description:
          "Essential skill development in chosen specialization, basic tools and equipment handling.",
        date: "Week 1-2",
        duration: "60 hours",
        location: "Skills Lab",
        participants: "25-30",
        category: "practical",
      },
      {
        id: 2,
        title: "Module 2: Applied Practice",
        description:
          "Hands-on application of skills, real-world project simulation, and quality standards training.",
        date: "Week 3-4",
        duration: "70 hours",
        location: "Practice Workshop",
        participants: "25-30",
        category: "practical",
      },
      {
        id: 3,
        title: "Module 3: Industry Standards",
        description:
          "Industry-specific protocols, quality control measures, and professional best practices.",
        date: "Week 5",
        duration: "40 hours",
        location: "Standards Training Center",
        participants: "25-30",
        category: "theory",
      },
      {
        id: 4,
        title: "Competency Assessment",
        description:
          "Practical skill evaluation, portfolio assessment, and industry-standard testing.",
        date: "Week 6",
        duration: "30 hours",
        location: "Assessment Center",
        participants: "25-30",
        category: "assessment",
      },
      {
        id: 5,
        title: "Certificate Award & Job Support",
        description:
          "Certificate presentation, job placement assistance, and career guidance session.",
        date: "Week 7",
        duration: "16 hours",
        location: "Placement Cell",
        participants: "25-30",
        category: "certification",
      },
    ],
  },
  {
    id: "diploma-advanced",
    name: "Diploma & Advanced Diploma Programs",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Structured training for technical and supervisory roles.",
    timeline: [
      {
        id: 1,
        title: "Foundation Studies",
        description:
          "Comprehensive theoretical foundation, mathematics, science basics, and communication skills.",
        date: "Month 1-3",
        duration: "360 hours",
        location: "Academic Block",
        participants: "30-35",
        category: "theory",
      },
      {
        id: 2,
        title: "Technical Specialization",
        description:
          "Advanced technical subjects, specialized equipment training, and industry-specific knowledge.",
        date: "Month 4-8",
        duration: "600 hours",
        location: "Technical Labs",
        participants: "30-35",
        category: "theory",
      },
      {
        id: 3,
        title: "Practical Training & Projects",
        description:
          "Extensive hands-on training, major project work, and real-world problem solving.",
        date: "Month 9-14",
        duration: "720 hours",
        location: "Workshop & Industry",
        participants: "30-35",
        category: "practical",
      },
      {
        id: 4,
        title: "Industrial Training",
        description:
          "Mandatory industrial internship, on-the-job training, and mentorship programs.",
        date: "Month 15-18",
        duration: "480 hours",
        location: "Industry Partners",
        participants: "30-35",
        category: "practical",
      },
      {
        id: 5,
        title: "Final Examination & Certification",
        description:
          "Comprehensive examinations, project presentation, and diploma certification ceremony.",
        date: "Month 19-20",
        duration: "120 hours",
        location: "Examination Center",
        participants: "30-35",
        category: "certification",
      },
    ],
  },
  {
    id: "bootcamps",
    name: "Skill Development Bootcamps",
    icon: <Zap className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Intensive short-term programs for rapid job entry.",
    timeline: [
      {
        id: 1,
        title: "Intensive Skills Immersion",
        description:
          "Fast-paced skill development, concentrated learning modules, and practical exercises.",
        date: "Week 1-2",
        duration: "100 hours",
        location: "Bootcamp Center",
        participants: "20-25",
        category: "practical",
      },
      {
        id: 2,
        title: "Project-Based Learning",
        description:
          "Real-world project execution, team collaboration, and problem-solving challenges.",
        date: "Week 3-4",
        duration: "80 hours",
        location: "Project Lab",
        participants: "20-25",
        category: "practical",
      },
      {
        id: 3,
        title: "Industry Mentorship",
        description:
          "Direct mentorship from industry professionals, networking sessions, and career guidance.",
        date: "Week 5",
        duration: "40 hours",
        location: "Mentorship Hub",
        participants: "20-25",
        category: "theory",
      },
      {
        id: 4,
        title: "Mock Interviews & Portfolio",
        description:
          "Interview preparation, portfolio development, and job readiness assessment.",
        date: "Week 6",
        duration: "30 hours",
        location: "Career Center",
        participants: "20-25",
        category: "assessment",
      },
      {
        id: 5,
        title: "Job Placement Sprint",
        description:
          "Intensive job placement support, company connections, and immediate employment opportunities.",
        date: "Week 7",
        duration: "20 hours",
        location: "Placement Center",
        participants: "20-25",
        category: "certification",
      },
    ],
  },
  {
    id: "bridge-foundation",
    name: "Bridge & Foundation Programs",
    icon: <Heart className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Prepares dropouts for workforce with essential skills.",
    timeline: [
      {
        id: 1,
        title: "Basic Literacy & Numeracy",
        description:
          "Fundamental reading, writing, and mathematical skills essential for workplace success.",
        date: "Week 1-3",
        duration: "90 hours",
        location: "Foundation Learning Center",
        participants: "25-30",
        category: "theory",
      },
      {
        id: 2,
        title: "Life Skills & Communication",
        description:
          "Personal development, communication skills, teamwork, and workplace etiquette training.",
        date: "Week 4-6",
        duration: "75 hours",
        location: "Soft Skills Lab",
        participants: "25-30",
        category: "theory",
      },
      {
        id: 3,
        title: "Basic Technical Skills",
        description:
          "Introduction to basic technical concepts, tool handling, and safety procedures.",
        date: "Week 7-9",
        duration: "90 hours",
        location: "Basic Skills Workshop",
        participants: "25-30",
        category: "practical",
      },
      {
        id: 4,
        title: "Workplace Readiness Training",
        description:
          "Job search skills, resume writing, interview preparation, and workplace behavior.",
        date: "Week 10-11",
        duration: "50 hours",
        location: "Career Preparation Center",
        participants: "25-30",
        category: "practical",
      },
      {
        id: 5,
        title: "Foundation Certificate & Pathways",
        description:
          "Foundation certificate ceremony and guidance for further skill development pathways.",
        date: "Week 12",
        duration: "20 hours",
        location: "Certification Hall",
        participants: "25-30",
        category: "certification",
      },
    ],
  },
  {
    id: "upskilling-reskilling",
    name: "Upskilling & Reskilling Programs",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Adapts workers to new technologies for career longevity.",
    timeline: [
      {
        id: 1,
        title: "Current Skills Assessment",
        description:
          "Evaluation of existing skills, identification of technology gaps, and learning path customization.",
        date: "Week 1",
        duration: "30 hours",
        location: "Skills Assessment Center",
        participants: "20-25",
        category: "assessment",
      },
      {
        id: 2,
        title: "Technology Foundation",
        description:
          "Introduction to new technologies, digital literacy, and modern workplace tools.",
        date: "Week 2-3",
        duration: "60 hours",
        location: "Digital Learning Lab",
        participants: "20-25",
        category: "theory",
      },
      {
        id: 3,
        title: "Advanced Technology Training",
        description:
          "Specialized training in emerging technologies, automation tools, and industry 4.0 concepts.",
        date: "Week 4-6",
        duration: "90 hours",
        location: "Advanced Tech Center",
        participants: "20-25",
        category: "practical",
      },
      {
        id: 4,
        title: "Application & Integration",
        description:
          "Practical application of new skills, integration with existing knowledge, and project work.",
        date: "Week 7-8",
        duration: "60 hours",
        location: "Integration Workshop",
        participants: "20-25",
        category: "practical",
      },
      {
        id: 5,
        title: "Certification & Career Transition",
        description:
          "New skills certification, career transition support, and job placement assistance.",
        date: "Week 9",
        duration: "25 hours",
        location: "Career Transition Center",
        participants: "20-25",
        category: "certification",
      },
    ],
  },
  {
    id: "industry-certifications",
    name: "Industry-Aligned Certification Programs",
    icon: <Target className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Industry-designed certifications for high employability.",
    timeline: [
      {
        id: 1,
        title: "Industry Standards Training",
        description:
          "Training on industry-specific standards, protocols, and best practices as defined by sector leaders.",
        date: "Week 1-2",
        duration: "80 hours",
        location: "Industry Standards Center",
        participants: "18-22",
        category: "theory",
      },
      {
        id: 2,
        title: "Hands-On Industry Practice",
        description:
          "Practical training using industry-standard equipment, processes, and real-world scenarios.",
        date: "Week 3-5",
        duration: "120 hours",
        location: "Industry Practice Lab",
        participants: "18-22",
        category: "practical",
      },
      {
        id: 3,
        title: "Quality & Compliance Training",
        description:
          "Quality control measures, regulatory compliance, and industry audit procedures.",
        date: "Week 6",
        duration: "40 hours",
        location: "Compliance Training Center",
        participants: "18-22",
        category: "theory",
      },
      {
        id: 4,
        title: "Industry Expert Assessment",
        description:
          "Assessment conducted by industry professionals using real-world evaluation criteria.",
        date: "Week 7",
        duration: "32 hours",
        location: "Industry Assessment Center",
        participants: "18-22",
        category: "assessment",
      },
      {
        id: 5,
        title: "Industry Certification & Placement",
        description:
          "Industry-recognized certification ceremony and direct placement with partner companies.",
        date: "Week 8",
        duration: "16 hours",
        location: "Industry Partner Office",
        participants: "18-22",
        category: "certification",
      },
    ],
  },
  {
    id: "cpd",
    name: "Continuing Professional Development (CPD)",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-green-500 to-green-500",
    description: "Specialized training for mid-level career advancement.",
    timeline: [
      {
        id: 1,
        title: "Leadership & Management Skills",
        description:
          "Advanced leadership techniques, team management, and strategic thinking for career progression.",
        date: "Week 1-2",
        duration: "60 hours",
        location: "Leadership Institute",
        participants: "15-18",
        category: "theory",
      },
      {
        id: 2,
        title: "Advanced Technical Specialization",
        description:
          "Cutting-edge technical skills, emerging technologies, and specialized domain expertise.",
        date: "Week 3-4",
        duration: "70 hours",
        location: "Advanced Technical Center",
        participants: "15-18",
        category: "practical",
      },
      {
        id: 3,
        title: "Strategic Project Management",
        description:
          "Advanced project management methodologies, strategic planning, and organizational development.",
        date: "Week 5-6",
        duration: "55 hours",
        location: "Management Training Center",
        participants: "15-18",
        category: "theory",
      },
      {
        id: 4,
        title: "Capstone Project",
        description:
          "Real organizational challenge solving, strategic implementation, and measurable outcomes.",
        date: "Week 7-8",
        duration: "65 hours",
        location: "Project Implementation Site",
        participants: "15-18",
        category: "practical",
      },
      {
        id: 5,
        title: "Professional Certification",
        description:
          "Advanced professional certification and senior role placement assistance.",
        date: "Week 9",
        duration: "20 hours",
        location: "Professional Development Center",
        participants: "15-18",
        category: "certification",
      },
    ],
  },
];

const categoryConfig = {
  theory: {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Theory",
  },
  practical: {
    icon: <Wrench className="w-4 h-4" />,
    label: "Practical",
  },
  assessment: {
    icon: <UserCheck className="w-4 h-4" />,
    label: "Assessment",
  },
  certification: {
    icon: <Award className="w-4 h-4" />,
    label: "Certification",
  },
};

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting && id) {
            setVisibleElements((prev) => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    const elements = document.querySelectorAll('[data-animate="true"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

export default function ProgramTimeline() {
  const [activeTab, setActiveTab] = useState(programs[0].id);
  const visibleElements = useIntersectionObserver();

  const activeProgram = useMemo(
    () => programs.find((p) => p.id === activeTab),
    [activeTab]
  );

  // Calculate program stats
  const programStats = useMemo(() => {
    if (!activeProgram) return null;

    const totalHours = activeProgram.timeline.reduce(
      (acc, event) => acc + parseInt(event.duration),
      0
    );

    const categoryCount = activeProgram.timeline.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalHours, categoryCount, phases: activeProgram.timeline.length };
  }, [activeProgram]);

  const handleTabChange = (programId: string) => {
    setActiveTab(programId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black text-white relative overflow-hidden">
      {/* Blurry Scattered Colorful Circles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating circles */}
        <div className="absolute top-10 left-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-green-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-72 h-72 bg-rose-500/25 rounded-full blur-3xl animate-bounce delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-3000"></div>

        {/* Medium floating circles */}
        <div className="absolute top-60 left-1/3 w-48 h-48 bg-green-500/30 rounded-full blur-2xl animate-bounce delay-4000"></div>
        <div className="absolute top-32 right-1/3 w-56 h-56 bg-rose-500/25 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-60 left-1/4 w-40 h-40 bg-green-500/35 rounded-full blur-2xl animate-bounce delay-1500"></div>
        <div className="absolute top-2/3 right-1/4 w-52 h-52 bg-rose-500/20 rounded-full blur-2xl animate-pulse delay-2500"></div>

        {/* Small accent circles */}
        <div className="absolute top-20 left-1/2 w-32 h-32 bg-green-500/40 rounded-full blur-xl animate-ping delay-1000"></div>
        <div className="absolute bottom-40 right-1/2 w-28 h-28 bg-rose-500/35 rounded-full blur-xl animate-ping delay-3500"></div>
        <div className="absolute top-1/3 left-10 w-24 h-24 bg-green-500/45 rounded-full blur-lg animate-ping delay-2000"></div>
        <div className="absolute bottom-80 right-10 w-36 h-36 bg-rose-500/30 rounded-full blur-xl animate-bounce delay-4500"></div>

        {/* Extra scattered circles */}
        <div className="absolute top-1/4 left-3/4 w-44 h-44 bg-green-500/25 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/4 left-1/5 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl animate-bounce delay-5000"></div>
        <div className="absolute top-3/4 right-3/4 w-32 h-32 bg-green-500/30 rounded-full blur-xl animate-ping delay-4000"></div>
        <div className="absolute top-1/6 right-1/6 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl animate-pulse delay-6000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight">
              <p className="">
                Our <span className="text-green-500">Training</span>
              </p>
              <span className="text-white">Timeline</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Comprehensive skill development programs designed to launch your
              career in high-demand industries
            </p>
          </div>
        </header>

        {/* Program Selector */}
        <section className="px-4 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => handleTabChange(program.id)}
                  className={`group relative flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 font-semibold text-left ${
                    activeTab === program.id
                      ? `bg-gradient-to-r ${program.color} text-white shadow-2xl scale-105`
                      : "bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:text-white backdrop-blur-sm border border-gray-700/50"
                  }`}
                  aria-label={`Select ${program.name} program`}
                >
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      activeTab === program.id
                        ? "bg-purple-600"
                        : "bg-green-500 group-hover:bg-gray-500/50"
                    } transition-colors`}
                  >
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm line-clamp-2">{program.name}</div>
                    <div
                      className={`text-xs mt-1 line-clamp-2 ${
                        activeTab === program.id
                          ? "text-white/80"
                          : "text-gray-400"
                      }`}
                    >
                      {program.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Program Stats Overview */}
        {programStats && (
          <section className="px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/80 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-rose-500 mb-2">
                    {programStats.totalHours}
                  </div>
                  <div className="text-gray-200 font-medium">Total Hours</div>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-green-500 mb-2">
                    {programStats.phases}
                  </div>
                  <div className="text-gray-200 font-medium">
                    Training Phases
                  </div>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-rose-500 mb-2">
                    {activeProgram?.id === 'diploma-advanced' ? '20' : 
                     activeProgram?.id === 'apprenticeship-dual-training' ? '16' : 
                     activeProgram?.id === 'bridge-foundation' ? '12' : 
                     activeProgram?.id === 'cpd' ? '9' : '5-8'}
                  </div>
                  <div className="text-gray-200 font-medium">
                    {activeProgram?.id === 'diploma-advanced' ? 'Months Duration' : 'Weeks Duration'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute -z-20 left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-purple-600 via-green-500 to-purple-600 rounded-full"></div>

              <div className="space-y-16">
                {activeProgram?.timeline.map((event, index) => {
                  const isEven = index % 2 === 0;
                  const isVisible = visibleElements.has(event.id.toString());
                  const categoryInfo = categoryConfig[event.category];
                  const isRedCard = index % 2 === 0; // Alternate between red and green
                  const cardColor = isRedCard ? "bg-purple-600/80" : "bg-green-500/80";
                  const iconColor = isRedCard ? "text-green-500" : "text-purple-600";

                  return (
                    <div
                      key={event.id}
                      data-animate="true"
                      data-id={event.id}
                      className={`relative flex ${
                        isEven ? "justify-start" : "justify-end"
                      } items-center z-10`}
                    >
                      {/* Timeline Card */}
                      <div
                        className={`relative w-full max-w-lg transform transition-all duration-700 delay-${
                          index * 100
                        } ${
                          isVisible
                            ? "translate-x-0 opacity-100"
                            : isEven
                            ? "-translate-x-20 opacity-0"
                            : "translate-x-20 opacity-0"
                        }`}
                      >
                        <div
                          className={`group ${cardColor} backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl shadow-black/30`}
                        >
                          {/* Category Badge */}
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm ${isRedCard ? "bg-green-500/90" : "bg-purple-600/90"} text-white border border-white/20`}
                          >
                            {categoryInfo.icon}
                            {categoryInfo.label}
                          </div>

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-white/90 mb-6 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Event Details Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-white/90">
                              <div className={`p-2 ${isRedCard ? "bg-green-500/20" : "bg-purple-600/20"} rounded-lg backdrop-blur-sm border border-white/10`}>
                                <Calendar className={`w-4 h-4 ${iconColor}`} />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-white/70">
                                  Duration
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {event.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                              <div className={`p-2 ${isRedCard ? "bg-green-500/20" : "bg-purple-600/20"} rounded-lg backdrop-blur-sm border border-white/10`}>
                                <Clock className={`w-4 h-4 ${iconColor}`} />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-white/70">
                                  Hours
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {event.duration}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                              <div className={`p-2 ${isRedCard ? "bg-green-500/20" : "bg-purple-600/20"} rounded-lg backdrop-blur-sm border border-white/10`}>
                                <MapPin className={`w-4 h-4 ${iconColor}`} />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-white/70">
                                  Location
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {event.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-white/90">
                              <div className={`p-2 ${isRedCard ? "bg-green-500/20" : "bg-purple-600/20"} rounded-lg backdrop-blur-sm border border-white/10`}>
                                <Users className={`w-4 h-4 ${iconColor}`} />
                              </div>
                              <div>
                                <div className="text-xs font-medium text-white/70">
                                  Participants
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {event.participants}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Timeline Node */}
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 ${
                            isEven ? "-right-6" : "-left-6"
                          } w-12 h-12 ${isRedCard ? "bg-green-500" : "bg-purple-600"} rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-gray-900 backdrop-blur-sm`}
                        >
                          <span className="text-white">
                            {categoryInfo.icon}
                          </span>
                        </div>

                        {/* Connecting Line */}
                        <div
                          className={`absolute top-1/2 transform -translate-y-0.5 ${
                            isEven ? "-right-3" : "-left-3"
                          } w-6 h-1 ${isRedCard ? "bg-green-500" : "bg-purple-600"} z-10`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Completion Badge */}
              <div className="flex justify-center mt-16 z-10">
                <div
                  className="
      relative bg-gray-900/30 backdrop-blur-md rounded-3xl p-8 text-center
      border border-green-500/20 shadow-[0_4px_30px_rgba(20,184,166,0.2)]
      hover:bg-gray-900/40 hover:shadow-[0_4px_30px_rgba(20,184,166,0.3)]
      transition-all duration-300
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-rose-500/10 before:to-green-500/10
      before:rounded-3xl before:opacity-0 before:transform before:scale-95
      before:transition-all before:duration-500
      hover:before:opacity-100 hover:before:scale-100
    "
                  aria-label="Program completion badge"
                >
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Program Complete
                  </h3>
                  <p className="text-gray-200">
                    Ready for industry placement and career growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-black to-purple-600"></div>

    </div>
  );
}