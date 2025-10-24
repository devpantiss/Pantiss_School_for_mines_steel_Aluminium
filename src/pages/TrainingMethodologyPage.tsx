import React from "react";
import { motion } from "framer-motion";

// Reusable section title component
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-green-500">{title}</h2>
    {subtitle && <p className="text-gray-300 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const TrainingMethodologyPage: React.FC = () => {
  return (
    <main className="bg-black text-white mt-32 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 flex items-center justify-center text-center">
        <img
          src="https://res.cloudinary.com/dgtc2fvgu/image/upload/v1742816194/2cf04226-46c3-4820-90e4-61a001350d8b_jkt1vh.jpg"
          alt="Training Methodology"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Learning by Doing — The Pantiss Way
          </motion.h1>
          <p className="text-gray-200 text-lg md:text-xl">
            Our methodology integrates hands-on training, AR/VR modules, simulation-based
            learning, and live industry exposure to ensure every learner becomes truly
            job-ready.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-black via-purple-950 to-black">
        <SectionTitle
          title="Our Training Philosophy"
          subtitle="Rooted in practice, powered by technology, and aligned with industry."
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {[
            {
              title: "Hands-on Learning",
              desc: "80% of the training happens in live workshops, labs, and yards, giving learners real exposure to machines, materials, and environments.",
            },
            {
              title: "Industry Integration",
              desc: "Our programmes are co-designed with industry partners ensuring alignment with real job roles and market expectations.",
            },
            {
              title: "Continuous Assessment",
              desc: "Learners are evaluated through daily performance tracking, task-based assessments, and practical demonstrations.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/50 border border-purple-600/30 rounded-2xl p-6 hover:bg-purple-900/20 transition"
            >
              <h3 className="text-green-500 text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-black">
        <SectionTitle
          title="Our Training Process"
          subtitle="A structured journey from fundamentals to field readiness."
        />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="border-l-2 border-green-500 ml-4 pl-8 space-y-12">
            {[
              {
                step: "Orientation & Safety Induction",
                desc: "Trainees begin with rigorous safety modules focusing on PPE, emergency protocols, and industrial discipline.",
              },
              {
                step: "Skill Foundation",
                desc: "Introduction to tools, materials, and standard procedures through guided demonstrations.",
              },
              {
                step: "Practical Training Modules",
                desc: "Supervised hands-on sessions that replicate real industrial tasks within controlled environments.",
              },
              {
                step: "AR/VR Simulated Learning",
                desc: "Immersive virtual environments for complex or high-risk tasks, enhancing safety and repetition-based mastery.",
              },
              {
                step: "Field Immersion / Apprenticeship",
                desc: "On-site experience in partner industries to bridge the gap between training and employment.",
              },
              {
                step: "Assessment & Certification",
                desc: "Final evaluation through theory + practice, leading to recognized certifications.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-6 top-2 w-3 h-3 bg-green-500 rounded-full" />
                <h4 className="text-lg font-semibold text-purple-400">
                  {item.step}
                </h4>
                <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Integration */}
      <section className="py-20 bg-gradient-to-b from-purple-950 to-black">
        <SectionTitle
          title="Technology-Enabled Learning"
          subtitle="Smart tools and immersive platforms for next-generation training."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {[
            {
              title: "AR/VR Based Training Labs",
              desc: "Virtual and augmented reality modules provide risk-free learning in realistic conditions.",
            },
            {
              title: "Heavy Equipment Simulators",
              desc: "Simulate operations for cranes, loaders, and excavators before actual field handling.",
            },
            {
              title: "Smart Classrooms",
              desc: "Digital learning tools, interactive content, and video-based demonstrations enhance understanding.",
            },
            {
              title: "LMS Integration",
              desc: "Digital progress tracking, performance analytics, and feedback at every stage.",
            },
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/50 border border-green-500/30 p-6 rounded-2xl hover:bg-green-900/10 transition"
            >
              <h4 className="text-lg font-semibold text-green-500 mb-2">
                {tech.title}
              </h4>
              <p className="text-gray-300 text-sm">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instructor & Outcome Section */}
      <section className="py-20 bg-black">
        <SectionTitle
          title="Instructor-Led & Outcome-Focused"
          subtitle="Driven by mentorship and measurable results."
        />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          <div>
            <h4 className="text-green-500 font-semibold text-lg mb-3">
              Experienced Instructors
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every training batch is led by certified instructors with years of
              field experience. Their mentorship builds discipline, confidence,
              and technical mastery in each trainee.
            </p>
          </div>
          <div>
            <h4 className="text-green-500 font-semibold text-lg mb-3">
              Tangible Outcomes
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Enhanced employability and placement readiness</li>
              <li>✔ Hands-on mastery of tools and machinery</li>
              <li>✔ Improved safety and operational discipline</li>
              <li>✔ Recognized certification and progression opportunities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-800 to-green-600 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Experience the Pantiss Methodology?
        </h2>
        <p className="text-gray-100 mb-8">
          Learn through practice, guided by technology, and shaped by industry.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/downloads/training-framework.pdf"
            download
            className="px-6 py-3 bg-black text-green-400 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition"
          >
            Download Framework PDF
          </a>
          <a
            href="/apply"
            className="px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition"
          >
            Apply Now
          </a>
        </div>
      </section>
    </main>
  );
};

export default TrainingMethodologyPage;
