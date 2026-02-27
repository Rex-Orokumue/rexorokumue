'use client';

import { projects } from '../data/projects';

export default function Projects() {
  return (
    <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center">My Projects</h1>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
            <p className="mt-2 text-gray-600">{project.description}</p>
            <p className="mt-1 text-sm text-gray-400">{project.tech}</p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}