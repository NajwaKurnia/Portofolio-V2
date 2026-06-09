'use client'

import { useState } from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import toast  from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error(
        "Please fill in all fields before submitting."
      );
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({
        fullName: "",
        email: "",
        message: "",
      });

      toast.success(
        "Message sent! Thank you for your message. I'll respond as soon as possible."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to send message. Please try again in a few moments."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative bg-slate-950 text-white min-h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-6">
              Say Hello
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Let's craft something<br />
              <motion.span
                className="text-blue-400 inline-block"
                animate={{
                    textShadow: [
                    "0 0 10px rgba(96,165,250,0.2)",
                    "0 0 25px rgba(96,165,250,0.8)",
                    "0 0 10px rgba(96,165,250,0.2)"
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity
                }}
                >
                remarkable
                </motion.span>.
            </h1>

            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              Have a complex problem that needs a simple, elegant solution? Or just want to discuss the intersection of code and design? My door is always open.
            </p>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Email Me</p>
                  <a href="mailto:hello@fullstackdev.studio" className="text-white font-semibold hover:text-blue-400 transition-colors">
                    kurnianajwa8@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white font-semibold">
                    West Sumatera, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-12">
              <motion.a
                href="https://www.instagram.com/najwa315_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.15,
                    y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-400/20 flex items-center justify-center transition-colors text-gray-400 hover:text-blue-400"
                >
                  <FaInstagram />
              </motion.a>
              <motion.a
                href="https://github.com/NajwaKurnia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.15,
                    y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-400/20 flex items-center justify-center transition-colors text-gray-400 hover:text-blue-400"
                >
                  <FaGithub />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 0 40px rgba(59,130,246,0.15)"
                }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-3">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project dreams..."
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                    scale: 1.02
                }}
                whileTap={{
                    scale: 0.98
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>

            {/* Status Section */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">Current Status</p>
              <p className="text-white font-semibold">Open for Q3 collaborations</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}