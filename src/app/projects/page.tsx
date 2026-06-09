'use client'

import { project, typedProject } from "@/data/project";
import { Project } from "next/dist/build/swc/types";
import { useState } from "react"
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
export default function Projects() {
    type Category = keyof typeof project | "All";
    const categories: Category[] = [
    "All",
    ...(Object.keys(project) as (keyof typeof project)[]),
    ];
    const [active, setActive] = useState<Category>("All");
   const displayedProjects =
    active === "All"
        ? Object.entries(typedProject).flatMap(([category, items]) =>
            items.map((item) => ({
            ...item,
            category,
            }))
        )
        : (typedProject[active] ?? []).map((item) => ({
            ...item,
            category: active,
        }));
    const EmptyState = () => (
    <div className="text-center py-20 text-slate-400 ">
        <p className="text-slate-500 animate-pulse font-medium text-xl">No projects found...</p>
    </div>
    );
    return(
        <div className="bg-slate-950 text-white min-h-screen" >
            <section className="max-w-7xl mx-auto px-2 py-6 md:py-10" >
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white m-4 mb-6 leading-tight">My Projects</h1>
                    <p className="max-w-3xl text-lg text-gray-300 m-4">
                        A collection of projects showcasing my journey as an{" "}
                        <span className="text-blue-400 font-semibold">Informatics Student</span> and
                        <span className="text-blue-400 font-semibold"> Frontend Developer</span>.
                        These projects reflect my experience in building responsive web applications,
                        focusing on clean UI design, usability, and modern frontend practices, while
                        continuously learning Full-Stack Development and Artificial Intelligence.
                        </p>
                    <div className="flex flex-wrap gap-4 m-4 mt-8" >
                        {categories.map((label) => (
                            <button 
                                key={label}
                                onClick={() => setActive(label)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    active === label
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Card project */}
            <section className="max-w-7xl mx-auto px-2">
            {displayedProjects.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {displayedProjects.map((item) => (
                    <div
                    key={item.title}
                    className={`bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer group
                        ${item.size === "large" ? "md:col-span-2" : "md:col-span-1"}
                    `}
                    >
                    <div className="relative overflow-hidden">
                        <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 relative">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                        </h3>

                        <p className="text-slate-400 mb-4 group-hover:text-slate-300 transition-colors duration-300">
                        {item.description}
                        </p>

                        <a
                        href={item.link}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold group/link"
                        >
                        View Project
                        <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">
                            →
                        </span>
                        </a>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </section>
        </div>
    )
}
