import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import AddProjectUserForm from '../components/AddprojectUser';
import { AuthContext } from '../context/AuthContext';  
import { useNavigate } from 'react-router-dom';
const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);   
  const { id: projectId } = useParams();       
  const [refreshKey, setRefreshKey] = useState(0);  

  if (!token) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="p-4 w-full">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-gray-700"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-2xl mb-4 text-blue-700 font-bold">Project Tickets</h1>
      <div className="flex items-center justify-evenly">

        <AddProjectUserForm 
          projectId={projectId} 
          token={token} 
          onUserAdded={() => {
                     }} 
        />

        <div>
          <TicketForm 
            projectId={projectId} 
            token={token} 
            onTicketCreated={() => setRefreshKey(prev => prev + 1)} 
          />

          <TicketList 
            key={refreshKey} 
            projectId={projectId} 
            token={token} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
