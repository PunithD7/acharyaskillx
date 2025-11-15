// src/pages/Courses.tsx
import React, { useState } from "react";
import Navigation from "@/components/navigation";
import Ai from "./images2/Ai.jpeg";
import big from './images2/Big.jpeg';
import block from "./images2/block.jpeg";
import cloud from "./images2/cloud.jpeg";
import content from "./images2/content.jpeg";
import cyber from "./images2/cyber.jpeg";
import digital from "./images2/digital.jpeg";
import finance from "./images2/finance.jpeg";
import full from "./images2/full.jpeg";
import game from "./images2/game.jpeg";
import health from "./images2/health.jpeg";
import iot from "./images2/iot.jpeg";
import machine from "./images2/machine.jpeg";

import mobile from "./images2/mobile.jpeg";
import product from "./images2/product.jpeg";
import python from "./images2/python.jpeg";
import uiux from "./images2/uiux.jpeg";
import video from "./images2/video.jpeg";
import human from "./images2/human.jpeg";
import startup from "./images2/startup.jpeg"



interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  duration: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and databases to build real-world applications.",
    duration: "12 weeks",
    image: full,
  },
  {
    id: 2,
    title: "Data Science with Python",
    category: "Data Science",
    description: "Master Python, Pandas, and Machine Learning algorithms with hands-on projects.",
    duration: "10 weeks",
    image: python,
  },
  {
    id: 3,
    title: "Artificial Intelligence Fundamentals",
    category: "AI & ML",
    description: "Understand neural networks, deep learning, and AI problem-solving techniques.",
    duration: "8 weeks",
    image: Ai,
  },
  {
    id: 4,
    title: "Cybersecurity Essentials",
    category: "Security",
    description: "Learn ethical hacking, penetration testing, and cybersecurity defense strategies.",
    duration: "6 weeks",
    image: cyber,
  },
  {
    id: 5,
    title: "UI/UX Design Masterclass",
    category: "Design",
    description: "Design beautiful and user-friendly interfaces with Figma and Adobe XD.",
    duration: "6 weeks",
    image: uiux,
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    category: "Cloud",
    description: "Deploy and manage scalable applications using AWS services and tools.",
    duration: "8 weeks",
    image: cloud,
  },
  {
    id: 7,
    title: "Mobile App Development with Flutter",
    category: "Mobile",
    description: "Build cross-platform apps using Flutter and Dart for Android and iOS.",
    duration: "10 weeks",
    image: mobile,
  },
  {
    id: 8,
    title: "Blockchain and Web3 Development",
    category: "Blockchain",
    description: "Learn to build decentralized apps and smart contracts on Ethereum.",
    duration: "10 weeks",
    image: block,
  },
  {
    id: 9,
    title: "Game Development with Unity",
    category: "Game Dev",
    description: "Create immersive 2D and 3D games using Unity and C#.",
    duration: "12 weeks",
    image: game,
  },
  {
    id: 10,
    title: "Machine Learning Projects Bootcamp",
    category: "AI & ML",
    description: "Work on supervised and unsupervised learning models in real datasets.",
    duration: "8 weeks",
    image: machine,
  },
  {
    id: 11,
    title: "Internet of Things (IoT)",
    category: "IoT",
    description: "Build smart devices using Arduino, Raspberry Pi, and IoT protocols.",
    duration: "8 weeks",
    image: iot,
  },
  {
    id: 12,
    title: "Digital Marketing",
    category: "Marketing",
    description: "Master SEO, social media marketing, and ad campaigns to boost online presence.",
    duration: "6 weeks",
    image: digital,
  },
  {
    id: 13,
    title: "Finance for Beginners",
    category: "Finance",
    description: "Understand financial modeling, budgeting, and investment strategies.",
    duration: "5 weeks",
    image: finance,
  },
  {
    id: 14,
    title: "Health Tech Innovations",
    category: "Healthcare",
    description: "Learn how technology is transforming the healthcare sector globally.",
    duration: "7 weeks",
    image: health,
  },
  {
    id: 15,
    title: "Content Writing and Strategy",
    category: "Writing",
    description: "Learn storytelling, blog creation, and digital content marketing strategies.",
    duration: "4 weeks",
    image: content,
  },
  {
    id: 16,
    title: "Human Resource Management",
    category: "Management",
    description: "Understand HR processes, recruitment, and organizational development.",
    duration: "6 weeks",
    image: human,
  },
  {
    id: 17,
    title: "Product Management 101",
    category: "Management",
    description: "Learn how to plan, design, and manage successful product launches.",
    duration: "8 weeks",
    image: product,
  },
  {
    id: 18,
    title: "Video Editing & Motion Graphics",
    category: "Media",
    description: "Create professional videos with Adobe Premiere Pro and After Effects.",
    duration: "5 weeks",
    image: video,
  },
  {
    id: 19,
    title: "Big Data & Hadoop",
    category: "Data Engineering",
    description: "Learn to process and analyze large datasets using Hadoop and Spark.",
    duration: "10 weeks",
    image: big,
  },
  {
    id: 20,
    title: "Entrepreneurship & Startup Basics",
    category: "Business",
    description: "Learn to build, pitch, and scale your startup ideas effectively.",
    duration: "6 weeks",
    image: startup,
  },
];

export default function CoursesPage() {
  const [selected, setSelected] = useState<Course | null>(null);

  return (
    <div>
      <Navigation />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="border rounded-lg shadow-lg overflow-hidden">
              <img src={c.image} alt={c.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="text-gray-600">{c.description}</p>
                <p className="text-sm mt-2">{c.category} · {c.duration}</p>
                <button
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={() => setSelected(c)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Enroll in {selected.title}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input type="text" className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setSelected(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
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
