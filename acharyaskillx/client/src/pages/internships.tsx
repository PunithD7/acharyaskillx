// src/pages/Internships.tsx
import Navigation from "@/components/navigation";
import React, { useState } from "react";
//import FullstackImage from './Fullstack.jpeg';
import front from './images/front.jpeg';
import app from './images/app.jpeg';
import block from './images/block.jpeg';
import cloud from './images/cloud.jpeg';
import content from './images/content.jpeg';
import dataanlyst from './images/dataanlyst.jpeg';
import finance from './images/finance.jpeg';
import game from './images/game.jpeg';
import hr from './images/hr.jpeg';
import iot from './images/iot.jpeg';
import Market from './images/Market.jpeg';
import product from './images/product.jpeg';
import Research from './images/Research.jpeg';
import sales from './images/sales.jpeg';
import uiux from './images/uiux.jpeg';
import video from './images/video.jpeg';
import cyber from './images/cyber.jpeg';
import machine from './images/machine.jpeg';
import datascientist from './images/datascientist.jpeg';
import Health from './images/Health.jpeg';


interface Internship {
  id: number;
  title: string;
  company: string;
  description: string;
  duration: string;
  image: string;
}

const internships: Internship[] = [
  {
    id: 1,
    title: "Frontend Development Intern",
    company: "TechSoft",
    description: "Work on React-based projects and improve UI/UX.",
    duration: "3 months",
    image: front,
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "DataWorks",
    description: "Assist in data cleaning and visualization projects.",
    duration: "2 months",
    image: dataanlyst,
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "MarketHub",
    description: "Manage social media campaigns and SEO strategies.",
    duration: "2 months",
    image: Market,
  },
  {
    id: 4,
    title: "AI Research Intern",
    company: "AI Labs",
    description: "Work on NLP and computer vision research projects.",
    duration: "6 months",
    image: Research,
  },
  {
    id: 5,
    title: "Cybersecurity Intern",
    company: "SecureNet",
    description: "Assist in penetration testing and threat analysis.",
    duration: "4 months",
    image: cyber,
  },
  {
    id: 6,
    title: "Cloud Engineer Intern",
    company: "Cloudify",
    description: "Learn and deploy scalable cloud-based applications.",
    duration: "3 months",
    image: cloud,
  },
  {
    id: 7,
    title: "Mobile App Developer Intern",
    company: "Appify",
    description: "Build cross-platform mobile applications using Flutter.",
    duration: "3 months",
    image: app,
  },
  {
    id: 8,
    title: "Blockchain Intern",
    company: "CryptoChain",
    description: "Develop smart contracts and blockchain-based apps.",
    duration: "5 months",
    image: block,
  },
  {
    id: 9,
    title: "UI/UX Designer Intern",
    company: "DesignPro",
    description: "Create wireframes, prototypes, and user experiences.",
    duration: "2 months",
    image: uiux,
  },
  {
    id: 10,
    title: "Game Development Intern",
    company: "GameWorld",
    description: "Develop 2D/3D games using Unity and Unreal Engine.",
    duration: "4 months",
    image: game,
  },
  {
    id: 11,
    title: "Machine Learning Intern",
    company: "MLWorks",
    description: "Work on supervised and unsupervised learning models.",
    duration: "6 months",
    image: machine,
  },
  {
    id: 12,
    title: "IoT Developer Intern",
    company: "IoT Hub",
    description: "Build and test IoT devices with Arduino and Raspberry Pi.",
    duration: "3 months",
    image: iot,
  },
  {
    id: 13,
    title: "Finance Analyst Intern",
    company: "FinTech Corp",
    description: "Assist in financial modeling and market research.",
    duration: "2 months",
    image: finance,
  },
  {
    id: 14,
    title: "Healthcare Tech Intern",
    company: "MediTech",
    description: "Work on healthcare applications and patient monitoring.",
    duration: "5 months",
    image: Health,
  },
  {
    id: 15,
    title: "Content Writing Intern",
    company: "WriteHub",
    description: "Write blogs, articles, and marketing content.",
    duration: "2 months",
    image: content,
  },
  {
    id: 16,
    title: "HR Intern",
    company: "PeopleFirst",
    description: "Assist in recruitment, onboarding, and HR operations.",
    duration: "3 months",
    image: hr,
  },
  {
    id: 17,
    title: "Product Manager Intern",
    company: "Prodify",
    description: "Work on product research, design, and launch strategy.",
    duration: "4 months",
    image: product,
  },
  {
    id: 18,
    title: "Video Editing Intern",
    company: "MediaWorks",
    description: "Edit promotional and educational video content.",
    duration: "2 months",
    image: video,
  },
  {
    id: 19,
    title: "Data Scientist Intern",
    company: "DeepData",
    description: "Analyze datasets and build predictive models.",
    duration: "6 months",
    image: datascientist,
  },
  {
    id: 20,
    title: "Sales Intern",
    company: "SellWell",
    description: "Work on sales pitches and client management.",
    duration: "2 months",
    image: sales,
  },
];

export default function InternshipsPage() {
  const [selected, setSelected] = useState<Internship | null>(null);

  return (
    <div>
    <Navigation />
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-100">
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 mb-10 animate-pulse">
          Explore Exciting Internships 🚀
        </h1>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {internships.map((i) => (
            <div
              key={i.id}
              className="relative border rounded-xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl bg-white bg-opacity-90"
            >
              <div className="overflow-hidden">
                <img
                  src={i.image}
                  alt={i.title}
                  className="h-48 w-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-blue-700">{i.title}</h2>
                <p className="text-gray-700 mt-2">{i.description}</p>
                <p className="text-sm mt-2 text-gray-500">
                  {i.company} · {i.duration}
                </p>
                <button
                  className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all"
                  onClick={() => setSelected(i)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all scale-100 hover:scale-105">
              <h2 className="text-3xl font-bold mb-4 text-blue-700">Apply for {selected.title}</h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Application submitted successfully! 🎉");
                  setSelected(null);
                }}
              >
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
                  <input type="email" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">LinkedIn Profile</label>
                  <input type="url" placeholder="https://linkedin.com/in/yourprofile" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Experience Level</label>
                  <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Skills</label>
                  <input type="text" placeholder="React, Python, SQL..." className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Preferred Start Date</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Cover Letter</label>
                  <textarea rows={3} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Tell us why you are a great fit..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Upload Resume</label>
                  <input type="file" className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    onClick={() => setSelected(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-teal-500 hover:to-green-600 transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}