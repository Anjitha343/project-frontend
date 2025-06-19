import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
});

// Project API calls
export const createProject = (data,token) => API.post("/projects", data,{
  headers:{Authorization :`Bearer ${token}`},
});
export const fetchProjects = (token) => API.get("/projects",{
  headers:{Authorization :`Bearer ${token}`},});
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Team member management
export const addTeamMember = (projectId, email) =>
  API.post(`/projects/${projectId}/admin-add-user`, { email });

export const removeMember = (projectId, memberId) =>
  API.post(`/projects/${projectId}/admin-remove-user`, { memberId });

// Users
export const fetchUsers = () => API.get("/users");
