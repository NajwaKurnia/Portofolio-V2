'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { fadeUp, slideLeft, slideRight } from '../animations/motionVariants';
import { skillsData } from '@/data/skillsData';
export default function About() {
    const animationMap = {
        fadeUp,
        slideLeft,
        slideRight,
    }
  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-hidden">
      

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Crafting digital experiences with <span className="text-blue-400 animate-pulse">Precision</span> and purpose and continuous learning.
            </h1>
            
            <motion.p  variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base mb-4">
              I believe great web applications are built through clean design, thoughtful development, and constant improvement. Every project is an opportunity to grow and create meaningful user experiences.
            </motion.p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRight}
          >
            <div className="w-72 h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/30">
              <Image src="/profilpic.jpeg" alt="Profile Picture" width={500} height={500} className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Philosophy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
          >
            <h2 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">The Philosophy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              I approach every project as a learning opportunity, focusing on how design and development work together to solve real user needs. My goal is to build digital experiences that are intuitive, accessible, and visually engaging.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I combine structured thinking with creative exploration to create solutions that are functional, clean, and meaningful for users.
            </p>
          </motion.div>

          {/* Professional Design */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRight}
          >
            <h2 className="text-2xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">Professional Design</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Through academic and personal projects, I have developed an understanding of how design and development work together to create effective digital solutions. I value collaboration, iteration, and continuous improvement in every project I build.
            </p>
            <div className="border-l-4 border-blue-400 pl-4 transform hover:translate-x-2 transition-transform duration-300">
              <p className="text-blue-400 font-semibold mb-2">Modern Tech Stack</p>
              <p className="text-gray-300 text-sm">
                I stay up to date with modern web technologies and frameworks as part of my learning journey in frontend development. I focus on building responsive, clean, and maintainable applications while continuously exploring new tools and practices.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Proficiency Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-10">
  <motion.h2
    initial="hidden"
    animate="visible"
    variants={slideLeft}
    className="text-3xl font-bold mb-12"
  >
    Technical Proficiency
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {skillsData.map((section, index) => (
      <motion.div
        key={index}
        initial="hidden"
        animate="visible"
        variants={animationMap[section.animation as keyof typeof animationMap]}
        className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
      >
        <h3 className="text-xl font-bold text-blue-400 mb-4">
          {section.title}
        </h3>

        <ul className="space-y-2 text-gray-300">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
</section>

      {/* My Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-10">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={slideLeft}
          className="text-3xl font-bold mb-12"
        >
          My Process
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRight}
            className="bg-slate-900 p-6 rounded-lg opacity-0 animate-fade-in delay-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-default"
          >
            <div className="bg-blue-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 animate-pulse">1</div>
            <h3 className="text-lg font-bold mb-3">Discovery</h3>
            <p className="text-gray-400 text-sm">
              I start by understanding project requirements, goals, and target users to build a clear foundation before development.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="bg-slate-900 p-6 rounded-lg opacity-0 animate-fade-in delay-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-default"
          >
            <div className="bg-blue-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 animate-pulse">2</div>
            <h3 className="text-lg font-bold mb-3">Strategy</h3>
            <p className="text-gray-400 text-sm">
              I plan the project structure and create wireframes and basic design concepts to guide development.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideRight}
            className="bg-slate-900 p-6 rounded-lg opacity-0 animate-fade-in delay-100 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-default"
          >
            <div className="bg-blue-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 animate-pulse">3</div>
            <h3 className="text-lg font-bold mb-3">Design</h3>
            <p className="text-gray-400 text-sm">
              I design clean and user-friendly interfaces that focus on usability and visual clarity.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="bg-slate-900 p-6 rounded-lg opacity-0 animate-fade-in delay-200 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-default"
          >
            <div className="bg-blue-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 animate-pulse">4</div>
            <h3 className="text-lg font-bold mb-3">Launch</h3>
            <p className="text-gray-400 text-sm">
              I finalize and deploy the project, ensuring it is functional and optimized for use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        whileHover={{
          scale: 1.01,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-blue-600 py-16 md:py-10 mt-16 md:mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-4 lg:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to build something <span className="text-white">remarkable</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 text-lg mb-8"
          >
            Let's collaborate and create a digital experience that stands out and delivers real value.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95">
              Start a Project
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
