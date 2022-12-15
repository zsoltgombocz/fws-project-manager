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
			const { next_page_url, prev_page_url, current_page } = data;

			setCurrentProjects(data.data);
            console.log(data);
			setPagination({page: current_page, next: next_page_url, prev: prev_page_url});
		} catch (error) {
			return new Error(error);
		}
	};

    const refreshProjectsCount = () => {
        api().get('projects/?all=true').then(({data}) => setProjectCount(data));
    }

	return (
		<ProjectContext.Provider value={{ currentProjects, pagination, projectCount, refreshProjectsCount, fetchPage }}>
			{children}
		</ProjectContext.Provider>
	);
};
