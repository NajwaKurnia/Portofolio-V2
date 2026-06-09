'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { project } from '@/data/project';
import { motion } from 'framer-motion';

export default function Home() {
  const [currentPreview, setCurrentPreview] = useState(0);
  const projectList = Object.entries(project ?? {}).flatMap(
    ([category, items]) =>
      Array.isArray(items)
        ? items.map((item) => ({
            ...item,
            category,
          }))
        : []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreview((prev)=> (prev +1)% projectList.length);
    }, 2500);
    return() => clearInterval(interval);
  }, []);

  const categoryColors: { [key: string]: string } = {
    'UI/UX Design':
      'text-pink-300 border-pink-500/30',

    'Web Development':
      'text-blue-300 border-blue-500/30',

    'Mobile Apps':
      'text-green-300 border-green-500/30',
  };
  const totalProjects = Object.values(project)
  .flat()
  .length;
  const stats = [
    { id: 1, value: totalProjects.toString(), label: "Projects Completed" },
    { id: 2, value: "Frontend", label: "Focused Development" },
    { id: 3, value: "6th Semester", label: "Informatics Student" },
    { id: 4, value: "Continuous", label: "Learner" },
  ];

  const fadeUp = {hidden: {opacity:0, y:30}, visible: {opacity:1, y:0}};
  const staggerContainer = {hidden:{}, visible: {transition: {staggerChildren: 0.15}}};

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-blue-400 text-sm font-semibold mb-4 uppercase tracking-wider"
            >
              Welcome to my portfolio
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Hi, I'm <span className="text-blue-400 animate-pulse">Najwa Kurnia</span>, an <span className="text-blue-400 animate-pulse">Informatics Student </span> & Frontend Developer
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-lg mb-8 leading-relaxed"
            >
              Building clean, responsive, and user-friendly web applications through academic and personal projects. Passionate about Full-Stack Development and Artificial Intelligence, and always eager to learn new technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50 active:scale-95">
                View Selected Works
              </Link>
            </motion.div>
          </div>
            {/* Right Image */}
            <motion.div
              className="flex justify-center order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                }}
                className="w-80 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <img src="poto.jpeg" alt="Profile Picture" className="object-cover w-full h-full" />
                </div>
              </motion.div>
            </motion.div>
        </div>
    </section>

      {/* Selected Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold hover:text-blue-400 transition-colors duration-300 cursor-default">
            Selected Projects
          </h2>

          {projectList.length > 0 && (
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 transition-all duration-300 flex items-center gap-2 group"
            >
              View All Projects
              <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                →
              </span>
            </Link>
          )}
        </motion.div>

        {projectList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-dashed border-slate-700 rounded-xl py-20 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              No Projects Yet
            </h3>

            <p className="text-slate-400 text-center max-w-lg">
              I'm currently working on exciting projects. They will be showcased
              here soon. Stay tuned!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projectList.slice(0, 4).map((project, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
              >
                <Link
                  href="/projects"
                  className="group relative h-80 rounded-xl overflow-hidden block"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />

                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <p
                      className={`text-sm ${
                        categoryColors[project.category] || "text-blue-400"
                      }`}
                    >
                      {project.category}
                    </p>

                    <h3 className="text-white text-xl font-bold">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="w-full bg-slate-900 py-10 md:py-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              whileHover={{
                scale: 1.05, y: -4
              }}
              className="text-center"
            >
              <h3 className="text-2xl md:text-2xl font-bold text-blue-400">
                {stat.value}
              </h3>

              <p className="text-gray-400 text-sm tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
