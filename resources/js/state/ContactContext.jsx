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

    const createContact = async (payload) => {
        try {
            const { data } = await api().post(`contacts/create`, payload);
            getAllContact();
            return data;
        } catch (error) {
            throw (error.response.data.errors);
        }
    }

    const deleteContact = async (id) => {
        try {
            const { data, status } = await api().delete(`contacts/${id}`);
            if (data === "DELETED" && status === 200) {
                getAllContact();
                return data;
            }
        } catch (error) {
            throw (error);
        }
    }

    const updateContact = async (id, payload) => {
        try {
            const { data } = await api().put(`contacts/${id}`, payload);
            getAllContact();
            return data;
        } catch (error) {
            throw (error.response.data.errors);
        }
    }

    return (
        <ContactContext.Provider value={{ allContact, createContact, deleteContact, updateContact }}>
            {children}
        </ContactContext.Provider>
    );
};
