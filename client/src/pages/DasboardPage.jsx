import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DashboardLayout from './../components/DashboardLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import { AuthContext } from '../context/AuthContext'; 

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState('');
  const { token } = useContext(AuthContext); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <DashboardLayout>
      <Breadcrumbs items={[{ label: 'Home' }, { label: 'Dashboard' }]} />

      <div className="flex justify-between items-center mb-4">
        <select
          className="border p-2 rounded"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
               {p.title || p.name || p._id}
            </option>
          ))}
        </select>
      </div>

      {project ? (
        <p className="text-lg">
          Showing data for project ID: <strong>{project}</strong>
        </p>
      ) : (
        <p className="text-lg font-medium text-gray-600">Select a project</p>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
