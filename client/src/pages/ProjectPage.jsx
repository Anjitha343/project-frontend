import React, { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../api/projectApi";
import { useNavigate } from "react-router-dom";


const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    const getProjects = async () => {
       try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
    };
    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProject(form);
    setProjects([...projects, res.data]);
    setForm({ title: "", description: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl mb-45 mb-5">Projects</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Project</button>
      </form>

      <ul>
        {projects.map((proj) => {
          console.log("Project ID in list:",proj._id);
          return (
           <li key={proj._id} className="mb-2 p-2 border">
            <strong>{proj.title}</strong> — {proj.description}
             <button 
              onClick={() => navigate(`/projects/${proj._id}`)} 
              className="ml-2 bg-green-500 text-white px-2 py-1"
             >
             View Tickets
            </button>
           </li>
          );
})
      }
      </ul>
    </div>
  );
};

export default ProjectsPage;