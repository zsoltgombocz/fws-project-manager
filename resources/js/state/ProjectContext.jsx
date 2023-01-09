import { first } from "lodash";
import { useState, createContext, useEffect } from "react";
import { api } from "../api/api";
import { arraysEqual } from "../utils/arraysEqual";

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
            //After creating a project the contact list is empty, assign the contacts
            //based on the payload that we have got

            //pass empty array thus we just created, no contact
            await addContactsToProject(data.id, payload.contacts, []);

            return data;
		} catch (error) {
			throw (error.response.data.errors);
		}
    }

    const updateProject = async (id, payload) => {
        try {
			const { data } = await api().put(`projects/${id}`, payload);
            await addContactsToProject(id, payload.contacts, data.contacts);

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

    const addContactsToProject = async (projectId, contacts, defaultContacts) => {
        try {
            const defaultIds = defaultContacts.map(dc => dc.id);
            if(arraysEqual(contacts, defaultIds)) return;

            //first check wheter the already added contacts still added, if not remove them
            for(let def of defaultIds) {
                if(!contacts.includes(def)) {
                    await api().patch(`contacts/assign/${def}/-1`);
                }
            }

            //loop through the contact array which contains the updated list of contact ids
            //we removed the unneccessary contacts, or let them stay as they were, now we
            //add the rest of the ids listed in the array (making sure the default contact list not including)
            for(let contact of contacts) {
                if(!defaultIds.includes(contact)) {
                    await api().patch(`contacts/assign/${contact}/${projectId}`);
                }
            }
        } catch (error) {
          throw(error);
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
