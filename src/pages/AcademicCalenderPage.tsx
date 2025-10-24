import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Download } from "lucide-react";

type AcademicEvent = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  type: "semester" | "holiday" | "exam" | "training" | "orientation" | "event";
};

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-10 text-center md:text-left">
    <h2 className="text-3xl md:text-4xl font-extrabold bg-green-500 bg-clip-text text-transparent">
      {title}
    </h2>
    {subtitle && <p className="text-gray-300 mt-2 text-lg">{subtitle}</p>}
  </div>
);

const EventCard: React.FC<{ event: AcademicEvent }> = ({ event }) => {
  const typeColors: Record<AcademicEvent["type"], string> = {
    semester: "from-green-400 to-teal-500",
    holiday: "from-yellow-400 to-orange-400",
    exam: "from-red-500 to-pink-500",
    training: "from-purple-500 to-fuchsia-400",
    orientation: "from-blue-500 to-purple-500",
    event: "from-cyan-400 to-sky-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div
        className={`absolute top-0 left-0 h-1 w-full rounded-t-2xl bg-gradient-to-r ${typeColors[event.type]}`}
      ></div>
      <div className="mt-3">
        <h3 className="text-xl font-semibold text-white mb-1">{event.title}</h3>
        <p className="text-gray-300 text-sm mb-2 leading-relaxed">
          {event.description}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm text-purple-400 font-medium">
          <Clock size={16} />
          <span>
            {event.startDate}
            {event.endDate ? ` — ${event.endDate}` : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const CalendarSection: React.FC = () => {
  const programmes = [
    { id: "rpl", name: "RPL Programme" },
    { id: "apprenticeship", name: "Apprenticeship & Dual Training" },
    { id: "diploma", name: "Diploma / Advanced Diploma" },
    { id: "upskill", name: "Upskilling & Reskilling" },
  ];

  const calendars: Record<string, AcademicEvent[]> = {
    rpl: [
      {
        id: "rpl1",
        title: "Batch 1 Commencement & Orientation",
        description: "Induction of first RPL batch; overview of tools and safety.",
        startDate: "July 5, 2025",
        type: "orientation",
      },
      {
        id: "rpl2",
        title: "Industrial Safety Training",
        description: "Mandatory safety sessions across all centres.",
        startDate: "July 7, 2025",
        endDate: "July 25, 2025",
        type: "training",
      },
      {
        id: "rpl3",
        title: "Batch 1 Assessment & Certification",
        description: "On-field performance evaluation and skill validation.",
        startDate: "Aug 10, 2025",
        endDate: "Aug 20, 2025",
        type: "exam",
      },
      {
        id: "rpl4",
        title: "RPL Convocation (Batch 1)",
        description: "Certificate distribution ceremony at Bhubaneswar campus.",
        startDate: "Aug 25, 2025",
        type: "event",
      },
      {
        id: "rpl5",
        title: "Batch 2 Orientation",
        description: "Second batch induction for new trainees.",
        startDate: "Nov 10, 2025",
        type: "orientation",
      },
      {
        id: "rpl6",
        title: "Panchuka & Kartik Purnima Holidays",
        description: "Regional festive holidays across Odisha.",
        startDate: "Nov 9, 2025",
        endDate: "Nov 15, 2025",
        type: "holiday",
      },
      {
        id: "rpl7",
        title: "Batch 2 Assessment & Certification",
        description: "Industry partner evaluation and felicitation.",
        startDate: "Feb 1, 2026",
        endDate: "Feb 10, 2026",
        type: "exam",
      },
      {
        id: "rpl8",
        title: "Annual Convocation 2026",
        description: "All batches awarded NSQF-aligned certifications.",
        startDate: "March 20, 2026",
        type: "event",
      },
    ],

    apprenticeship: [
      {
        id: "ap1",
        title: "Batch Commencement & Orientation",
        description: "Introduction to plant operations, safety, and work ethics.",
        startDate: "July 15, 2025",
        type: "orientation",
      },
      {
        id: "ap2",
        title: "Workshop & Departmental Training",
        description: "Rotational training in foundry, fabrication, and electrical.",
        startDate: "July 20, 2025",
        endDate: "Oct 10, 2025",
        type: "training",
      },
      {
        id: "ap3",
        title: "Durga Puja Holidays",
        description: "Major state holiday period in Odisha.",
        startDate: "Oct 2, 2025",
        endDate: "Oct 10, 2025",
        type: "holiday",
      },
      {
        id: "ap4",
        title: "Project Work & Evaluation",
        description: "Students work on mini-projects under industry supervision.",
        startDate: "Nov 1, 2025",
        endDate: "Jan 15, 2026",
        type: "exam",
      },
      {
        id: "ap5",
        title: "Utkal Divas Celebration",
        description: "State foundation day celebration (Odisha Day).",
        startDate: "April 1, 2026",
        type: "event",
      },
      {
        id: "ap6",
        title: "Annual Apprenticeship Convocation",
        description: "Graduation and felicitation of successful apprentices.",
        startDate: "May 10, 2026",
        type: "event",
      },
    ],

    diploma: [
      {
        id: "d1",
        title: "Semester I Commencement",
        description: "Academic year begins for Diploma students.",
        startDate: "July 10, 2025",
        type: "semester",
      },
      {
        id: "d2",
        title: "Raja Festival Holidays",
        description: "Mid-year state holiday celebrating womanhood.",
        startDate: "June 14, 2025",
        endDate: "June 16, 2025",
        type: "holiday",
      },
      {
        id: "d3",
        title: "Mid-Semester Exams",
        description: "Internal evaluations across departments.",
        startDate: "Sept 20, 2025",
        endDate: "Sept 28, 2025",
        type: "exam",
      },
      {
        id: "d4",
        title: "Durga Puja Vacation",
        description: "Autumn holidays across Odisha.",
        startDate: "Oct 2, 2025",
        endDate: "Oct 10, 2025",
        type: "holiday",
      },
      {
        id: "d5",
        title: "Semester-End Exams",
        description: "Comprehensive theoretical and practical exams.",
        startDate: "Dec 5, 2025",
        endDate: "Dec 22, 2025",
        type: "exam",
      },
      {
        id: "d6",
        title: "Winter Break",
        description: "End-of-semester holidays.",
        startDate: "Dec 23, 2025",
        endDate: "Jan 5, 2026",
        type: "holiday",
      },
      {
        id: "d7",
        title: "Semester II Begins",
        description: "New term classes begin for all Diploma batches.",
        startDate: "Jan 10, 2026",
        type: "semester",
      },
      {
        id: "d8",
        title: "Industrial Internship & Visit",
        description: "Hands-on exposure at mines, refineries, and workshops.",
        startDate: "Feb 15, 2026",
        endDate: "Mar 15, 2026",
        type: "training",
      },
      {
        id: "d9",
        title: "Annual Convocation Ceremony",
        description: "Diploma completion ceremony and award distribution.",
        startDate: "June 25, 2026",
        type: "event",
      },
    ],

    upskill: [
      {
        id: "u1",
        title: "Batch 1 Orientation",
        description: "Introduction to new technologies and safety modules.",
        startDate: "Aug 1, 2025",
        type: "orientation",
      },
      {
        id: "u2",
        title: "Green Skills Module",
        description: "Focused sessions on sustainable technologies and EV servicing.",
        startDate: "Aug 3, 2025",
        endDate: "Sept 15, 2025",
        type: "training",
      },
      {
        id: "u3",
        title: "Gandhi Jayanti & Puja Break",
        description: "Public holidays across Odisha.",
        startDate: "Oct 2, 2025",
        endDate: "Oct 10, 2025",
        type: "holiday",
      },
      {
        id: "u4",
        title: "Assessment & Certification (Batch 1)",
        description: "Short-term trainees appear for evaluation.",
        startDate: "Oct 15, 2025",
        type: "exam",
      },
      {
        id: "u5",
        title: "Batch 2 Induction",
        description: "New upskilling batch begins in Q1.",
        startDate: "Feb 5, 2026",
        type: "orientation",
      },
      {
        id: "u6",
        title: "Rath Yatra Holiday",
        description: "Cultural and religious festival break.",
        startDate: "June 25, 2026",
        endDate: "June 28, 2026",
        type: "holiday",
      },
      {
        id: "u7",
        title: "Annual Convocation & Industry Meet",
        description: "Joint ceremony with industry partners for all batches.",
        startDate: "June 30, 2026",
        type: "event",
      },
    ],
  };

  const [activeProgramme, setActiveProgramme] = useState("rpl");

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Programme-wise Academic Calendar"
          subtitle="Switch between different training schedules"
        />

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {programmes.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProgramme(p.id)}
              className={`px-5 py-2 rounded-full font-medium border transition-all ${
                activeProgramme === p.id
                  ? "bg-purple-600 text-black shadow-md"
                  : "bg-black border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProgramme}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {calendars[activeProgramme].map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const DownloadSection: React.FC = () => (
  <section className="bg-gradient-to-b from-black to-purple-950 py-20 text-center text-white">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Download Complete Academic Calendar
      </h2>
      <p className="text-gray-300 mb-8">
        Access the detailed timeline including sessions, holidays, and events for all programmes.
      </p>
      <button
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/pdfs/Academic-Calendar-2025-26.pdf";
          link.download = "Academic-Calendar-2025-26.pdf";
          link.click();
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-black font-semibold rounded-xl shadow-md hover:from-purple-500 hover:to-green-300 transition-all"
      >
        <Download size={18} />
        Download PDF
      </button>
    </div>
  </section>
);

const AcademicCalendarPage: React.FC = () => (
  <div className="bg-black text-white min-h-screen font-sans">
    <main className="mt-28">
      <CalendarSection />
      <DownloadSection />
    </main>
  </div>
);

export default AcademicCalendarPage;
