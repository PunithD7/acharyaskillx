import React, { useState } from "react";
import Navigation from "@/components/navigation";
import Ai from "./images1/Ai.png";
import CyberSecurity from "./images1/Cybersecurity.jpg";
import Healthcare from "./images1/Healthcare.png";
import agri from "./images1/agri.jpeg";
import block from "./images1/block.jpeg";
import drone from "./images1/drone.jpeg";
import Edtech from "./images1/Edtech.jpeg";
import finance from "./images1/finance.jpeg";
import fintech from "./images1/fintech.jpeg";
import game from "./images1/game.jpeg";
import green from "./images1/green.jpeg";
import mobility from "./images1/mobility.jpeg";
import open from "./images1/open.jpeg";
import quantum from "./images1/quantum.jpeg";
import robotics from "./images1/robotics.jpeg";
import space from "./images1/space.jpeg";
import startup from "./images1/startup.jpeg";
import smart from "./images1/smart.jpeg";
import social from "./images1/social.jpeg";
import web from "./images1/web.jpeg";
import women from "./images1/women.jpeg";

interface Hackathon {
  id: number;
  title: string;
  organization: string;
  description: string;
  duration: string;
  image: string;
}

const hackathons: Hackathon[] = [
  {
    id: 1,
    title: "AI Innovations Hackathon",
    organization: "TechVerse",
    description:
      "Build AI-powered tools and applications that solve real-world challenges using machine learning and data science.",
    duration: "48 hours",
    image: Ai,
  },
  {
    id: 2,
    title: "CyberSec Challenge",
    organization: "SecureNet",
    description:
      "Compete in ethical hacking, penetration testing, and cybersecurity problem-solving challenges.",
    duration: "36 hours",
    image: CyberSecurity,
  },
  {
    id: 3,
    title: "HealthTech Hackathon",
    organization: "MediTech Labs",
    description:
      "Develop smart healthcare solutions, patient monitoring systems, and AI diagnostic tools.",
    duration: "3 days",
    image: Healthcare,
  },
  {
    id: 4,
    title: "GreenTech Innovation",
    organization: "EcoBuild",
    description:
      "Create sustainable tech solutions focusing on renewable energy, recycling, and carbon footprint reduction.",
    duration: "2 days",
    image: green,
  },
  {
    id: 5,
    title: "FinTech Revolution",
    organization: "Finify",
    description:
      "Build financial tools for automation, crypto management, and digital banking.",
    duration: "2 days",
    image: fintech,
  },
  {
    id: 6,
    title: "Game Jam 2025",
    organization: "PlayHub",
    description:
      "Develop creative 2D/3D games around an announced theme in 48 hours.",
    duration: "48 hours",
    image: game,
  },
  {
    id: 7,
    title: "Web Wizards Hackathon",
    organization: "CodeSphere",
    description:
      "Build modern, responsive web apps using React, Next.js, and advanced UI/UX.",
    duration: "36 hours",
    image: web,
  },
  {
    id: 8,
    title: "Smart City Solutions",
    organization: "UrbanTech",
    description:
      "Create IoT and AI-based solutions for sustainable urban development.",
    duration: "3 days",
    image: smart,
  },
  {
    id: 9,
    title: "SpaceTech Challenge",
    organization: "CosmoLabs",
    description:
      "Develop tools and algorithms to analyze space data and support satellite communication.",
    duration: "48 hours",
    image: space,
  },
  {
    id: 10,
    title: "Blockchain Buildathon",
    organization: "CryptoChain",
    description:
      "Create smart contracts, NFT apps, and decentralized finance tools.",
    duration: "2 days",
    image: block,
  },
  {
    id: 11,
    title: "EdTech Hack 2025",
    organization: "LearnHub",
    description:
      "Build e-learning tools, AI tutors, and interactive education platforms.",
    duration: "36 hours",
    image: Edtech,
  },
  {
    id: 12,
    title: "AgriTech Innovation",
    organization: "FarmConnect",
    description:
      "Develop AI and IoT tools to improve agriculture and crop monitoring.",
    duration: "2 days",
    image: agri,
  },
  {
    id: 13,
    title: "Women in Tech Hack",
    organization: "CodeHer",
    description:
      "Empowering women to create technology-driven solutions for social change.",
    duration: "48 hours",
    image: women,
  },
  {
    id: 14,
    title: "Open Source Hackathon",
    organization: "GitHub",
    description:
      "Contribute to open-source projects and collaborate with developers worldwide.",
    duration: "72 hours",
    image: open,
  },
  {
    id: 15,
    title: "Robotics Challenge",
    organization: "RoboLabs",
    description:
      "Build autonomous robots capable of completing complex real-world tasks.",
    duration: "3 days",
    image: robotics,
  },
  {
    id: 16,
    title: "DroneTech Hackathon",
    organization: "SkyTech",
    description:
      "Design drone-based delivery, surveillance, and emergency response systems.",
    duration: "2 days",
    image: drone,
  },
  {
    id: 17,
    title: "Smart Mobility Hack",
    organization: "AutoAI",
    description:
      "Develop intelligent transportation systems and autonomous vehicle software.",
    duration: "3 days",
    image: mobility,
  },
  {
    id: 18,
    title: "Social Impact Hackathon",
    organization: "ChangeMakers",
    description:
      "Use tech to address issues like education, healthcare, and equality.",
    duration: "48 hours",
    image: social,
  },
  {
    id: 19,
    title: "Quantum Computing Hack",
    organization: "QubitWorks",
    description:
      "Experiment with quantum algorithms and future computing innovations.",
    duration: "2 days",
    image: quantum,
  },
  {
    id: 20,
    title: "Startup Pitch Hack",
    organization: "InnovateX",
    description:
      "Build a prototype and pitch your startup idea to real investors.",
    duration: "48 hours",
    image: startup,
  },
];

export default function HackathonsPage() {
  const [selected, setSelected] = useState<Hackathon | null>(null);

  return (
    <div>
      <Navigation />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Hackathons</h1>

        {/* Hackathon cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathons.map((h) => (
            <div key={h.id} className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={h.image} alt={h.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{h.title}</h2>
                <p className="text-gray-600">{h.description}</p>
                <p className="text-sm mt-2 text-gray-500">{h.organization} · {h.duration}</p>
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setSelected(h)}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Register for {selected.title}
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">College / Organization</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Your college or company" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Project Idea (PDF)</label>
                  <input type="file" className="w-full" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setSelected(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

