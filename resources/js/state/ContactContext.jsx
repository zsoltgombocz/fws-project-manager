import { useState, createContext, useEffect } from "react";
import { api } from "../api/api";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
	const [allContact, setAllContact] = useState([]);

	useEffect(() => {
        getAllContact();
	}, []);

	const getAllContact = async () => {
		try {
			const { data } = await api().get(`contacts`);
			setAllContact(data);
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<ContactContext.Provider value={{ allContact }}>
			{children}
		</ContactContext.Provider>
	);
};
