import React, { memo, useMemo } from "react";
import Marquee from "react-fast-marquee";

interface Stat {
  value: string;
  description: string;
}
interface Company {
  name: string;
  logo: string;
}
interface Student {
  name: string;
  batch: string;
  package: string;
  image: string;
}

const statsData: Stat[] = [
  { value: "50+", description: "Recruiters partnered with Pantiss" },
  { value: "120+", description: "Job offers in Mining, Shipping, Power & Infrastructure" },
  { value: "₹3L", description: "Average salary of top 25% placed students" },
  { value: "20+", description: "Global companies hiring Pantiss graduates" },
  { value: "100+", description: "Students placed at packages above ₹3.5 Lakh" },
];

const companiesData: Company[] = [
  { name: "Vedanta Resources", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746008397/Screenshot_2025-04-30_at_3.49.16_PM-removebg-preview_pf7adb.png" },
  { name: "Tata Steel", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1742810048/Tata_Steel_Logo_gyv6rz.png" },
  { name: "Wistron", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746006925/wistron_u1oa59.svg" },
  { name: "Jindal Steel & Power", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746007990/Screenshot_2025-04-30_at_3.38.59_PM-removebg-preview_h2oxkt.png" },
  { name: "Dhoot Transmission", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746007547/Screenshot_2025-04-30_at_3.34.57_PM-removebg-preview_nbmrom.png" },
  { name: "Schneider Electric", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746006925/schneider_electric_q2ujfb.png" },
  { name: "FleetGuard", logo: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746006925/fleetguard_tuohkr.png" },
];

const studentsData: Student[] = [
  {
    name: "Anjali Gocchi",
    batch: "Batch 2023",
    package: "₹3.5 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000395/students-7_xxzu1w.jpg",
  },
  {
    name: "Ranjita Gochayat",
    batch: "Batch 2023",
    package: "₹3.5 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000395/student-6_ap9vlq.jpg",
  },
  {
    name: "Nabjyoti Nayak",
    batch: "Batch 2024",
    package: "₹3.5 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000395/student-5_gbdqmb.jpg",
  },
  {
    name: "Manoj Kumar Kisan",
    batch: "Batch 2024",
    package: "₹3 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000304/student-4_yx4ee4.jpg",
  },
  {
    name: "Kanha Raula",
    batch: "Batch 2024",
    package: "₹2.8 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000303/student-3_frvbwb.jpg",
  },
  {
    name: "Subham Majhi",
    batch: "Batch 2025",
    package: "₹2.8 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000304/student-2_dw91lt.jpg",
  },
  {
    name: "Chandan Sahoo",
    batch: "Batch 2025",
    package: "₹2.64 Lac.",
    image: "https://res.cloudinary.com/dgtc2fvgu/image/upload/v1746000304/student-1_krlvqn.jpg",
  },
];

const StatCard = memo(({ stat, index }: { stat: Stat; index: number }) => (
  <article
    className="bg-gray-950/90 p-6 sm:p-8 rounded-xl border border-green-600/50 hover:scale-102 hover:ring-2 hover:ring-green-600/70 transition-all duration-300 text-center"
    role="article"
    tabIndex={0}
    aria-describedby={`stat-details-${index}`}
  >
    <h3 className="text-2xl sm:text-5xl font-extrabold text-green-300">{stat.value}</h3>
    <p id={`stat-details-${index}`} className="text-sm sm:text-base text-gray-200 mt-3 line-clamp-2">{stat.description}</p>
  </article>
));

const CompanyLogo = memo(({ company }: { company: Company; index: number }) => (
  <article
    className="flex-shrink-0 w-40 sm:w-44 bg-gray-900/50 rounded-lg ring-2 ring-green-600/50 hover:ring-2 hover:ring-green-600/70 filter grayscale hover:grayscale-0 transition-all duration-300 flex flex-col items-center justify-center p-4 mx-2"
    role="article"
    tabIndex={0}
    aria-label={`Logo of ${company.name}`}
  >
    <img
      src={company.logo}
      alt={`${company.name} logo`}
      className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-md"
      loading="lazy"
      decoding="async"
    />
    <p className="text-base font-semibold text-gray-100 mt-2 line-clamp-1">{company.name}</p>
  </article>
));

const StudentCard = memo(({ student, index }: { student: Student; index: number }) => (
  <article
    className="flex-shrink-0 w-64 sm:w-72 bg-gray-900/50 rounded-xl ring-2 ring-green-600/50 hover:scale-102 hover:ring-2 hover:ring-green-600/70 filter grayscale hover:grayscale-0 transition-all duration-300 text-center p-4 sm:p-6 mx-2"
    role="article"
    tabIndex={0}
    aria-describedby={`student-details-${index}`}
  >
    <img
      src={student.image}
      alt={`${student.name} profile`}
      className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover mx-auto mb-4 border-2 border-green-600"
      loading="lazy"
      decoding="async"
    />
    <h4 className="text-lg sm:text-xl font-bold text-gray-100">{student.name}</h4>
    <p id={`student-details-${index}`} className="text-sm text-gray-200">{student.batch}</p>
    <p className="text-green-600 font-bold mt-2">{student.package}</p>
  </article>
));

const PlacementsSection: React.FC = () => {
  const companiesList = useMemo(() => [...companiesData, ...companiesData], []);
  const studentsList = useMemo(() => [...studentsData, ...studentsData], []);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dgtc2fvgu/video/upload/v1743490663/12266398_1920_1080_30fps_njenhk.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/85 via-purple-900/30 to-black/85 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wider">Placements & Careers</h2>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
            Glance at the <span className="text-green-600">Top Companies</span> Hiring from Us
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-3xl mx-auto">
            Skilling Revolution Starts at Us: Exceptional Placements for 2021-2025 Batches
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* Scrolling Content */}
        <div className="mb-12">
          <Marquee
            speed={30}
            pauseOnHover={true}
            loop={0}
            className="w-full overflow-hidden bg-gray-900/30 rounded-xl p-4"
            aria-label="Scrolling company logos"
          >
            {companiesList.map((company, i) => (
              <CompanyLogo key={`${company.name}-${i}`} company={company} index={i} />
            ))}
          </Marquee>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">Students Getting Highest Packages</h3>
        </div>

        <Marquee
          speed={20}
          pauseOnHover={true}
          loop={0}
          className="w-full overflow-hidden bg-transparent p-4"
          aria-label="Scrolling student profiles"
        >
          {studentsList.map((student, i) => (
            <StudentCard key={`${student.name}-${i}`} student={student} index={i} />
          ))}
        </Marquee>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg ring-1 ring-green-600/50 hover:bg-green-700 hover:ring-2 hover:ring-green-400/70 focus-visible:ring-2 focus-visible:ring-green-400 transition-all duration-300"
            aria-label="View placement details"
          >
            View Placements
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(PlacementsSection);