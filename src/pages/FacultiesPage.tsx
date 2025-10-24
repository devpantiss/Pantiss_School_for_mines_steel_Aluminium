import { motion } from "framer-motion";

const faculties = [
  {
    name: "Mr. Ashish Kumar Mishra",
    designation: "Master Trainer",
    department: "HEMM Operations",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760096444/ashish_2_c5ruxq.jpg",
    email: "ashish.mishra@psmsa.edu.in",
  },
  {
    name: "Mr. Rituraj Tarei",
    designation: "Associate Trainer",
    department: "Electricals",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760096656/rituraj_3_i1wfve.jpg",
    email: "rituraj.tarei@psmsa.edu.in",
  },
  {
    name: "Mr. Yagnesh Kumar Nanda",
    designation: "Senior Trainer",
    department: "Fabrication & Welding",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760096329/yagnesh_2_lmjxag.jpg",
    email: "yagnesh.nanda@psmsa.edu.in",
  },
  {
    name: "Mr. Bikram Keshari Gouda",
    designation: "Assistant Trainer",
    department: "Mechanical Maintenance",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760096195/bikram_2_ufeeka.jpg",
    email: "bikram.keshari@psmsa.edu.in",
  },
  {
    name: "Mr. Tushar Ranjan Ojha",
    designation: "Assistant Trainer",
    department: "Mining Operations",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760095938/tushar_2_apsaoi.jpg",
    email: "tushar.ranjan@psmsa.edu.in",
  },
  {
    name: "Mr. Truti Ranjan Samal",
    designation: "Assistant Professor",
    department: "Casting & Foundry",
    image:
      "https://res.cloudinary.com/djtzx6wo7/image/upload/v1760095697/trupti_ranjan_2_v74nbw.jpg",
    email: "trupti.samal@psmsa.edu.in",
  },
];

const FacultiesPage = () => {
  return (
    <div className="min-h-screen bg-black py-16 px-6 lg:px-20 mt-32">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold underline text-center mb-12 text-green-500"
      >
        Our Faculty Members
      </motion.h1>

      {/* Faculty Grid */}
      <div className="flex flex-wrap justify-center gap-10">
        {faculties.map((faculty, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-md hover:shadow-green-500/20 transition-all duration-300 overflow-hidden w-[350px] h-[550px] flex flex-col"
          >
            {/* Image */}
            <div className="h-[450px] w-full overflow-hidden">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="flex-1 p-5 text-center flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-purple-500">
                {faculty.name}
              </h3>
              <p className="text-sm text-white">{faculty.designation}</p>
              <p className="text-sm font-medium text-green-500 mt-1">
                {faculty.department}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FacultiesPage;
