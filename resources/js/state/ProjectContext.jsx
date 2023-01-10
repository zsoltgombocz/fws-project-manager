import { useState, createContext, useEffect } from "react";
import { api } from "../api/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const [currentProjects, setCurrentProjects] = useState([]);
	const [projectCount, setProjectCount] = useState([]);
    const [pagination, setPagination] = useState({});

	useEffect(() => {
        refreshProjectsCount();

        fetchPage();
	}, []);

	const fetchPage = async (page = 1, filter = null) => {
		try {
			const { data } = await api().get(`projects?filter=${filter}&page=${page}`);
			const { last_page, current_page } = data;

			setCurrentProjects(data.data);
			setPagination({page: current_page, last: last_page, filter});
		} catch (error) {
			throw new Error(error);
		}
	};

    const refreshProjectsCount = async () => {
        try {
			const { data } = await  api().get('projects/?all=true');
			setProjectCount(data)
		} catch (error) {
			throw new Error(error);
		}
    }

    const refreshProjects = () => {
        refreshProjectsCount();
        fetchPage(pagination.page, pagination.filter);
    }

    const getProjectInformation = async (id) => {
        try {
			const { data } = await api().get(`projects/${id}`)

            return data;
		} catch (error) {
			throw new Error(error);
		}
    }

    const createProject = async (payload) => {
        try {
			const { data } = await api().post(`projects/create`, payload);

            return data;
		} catch (error) {
			throw (error.response.data.errors);
		}
    }

    const updateProject = async (id, payload) => {
        try {
			const { data } = await api().put(`projects/${id}`, payload);

            return data;
		} catch (error) {
			throw (error.response.data.errors);
		}
    }

    const deleteProject = async (id) => {
        try {
			const { data, status } = await api().delete(`projects/${id}`);
            if(data === "DELETED" && status === 200) {
                refreshProjects();
                return data;
            }
		} catch (error) {
			throw (error);
		}
    }

	return (
		<ProjectContext.Provider
            value={{
                currentProjects, pagination,
                projectCount, refreshProjectsCount,
                fetchPage, refreshProjects,
                getProjectInformation, updateProject,
                createProject, deleteProject }}>
			{children}
		</ProjectContext.Provider>
	);
};
