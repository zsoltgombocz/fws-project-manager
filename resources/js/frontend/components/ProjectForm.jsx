import React, {useState, useContext, useEffect} from 'react'
import { ContactContext } from '../../state/ContactContext';
import ProjectStatus from '../atom/ProjectStatus';
import ContactForm from './ContactForm';
import ContactListItem from './ContactListItem';

const ProjectForm = ({projectData, onSubmitPressed, create = true, disableForm = false}) => {

    const [formData, setFormData] = useState({id: -1, name: '', description:'', status: 0, contacts: []});

    const [contacts, setContacts] = useState([]);
    const {allContact} = useContext(ContactContext);

    useEffect(() => {
        if(projectData !== null && projectData !== undefined) {
            setFormData(projectData);
            setContacts([...projectData.contacts.map(c => c.id)]);
        }

        return () => {
            setFormData({id: -1, name: '', description:'', status: 0, contacts: []})
        }
    }, [projectData]);

    const isContactAssignedToProject = (contact) => {
        if(projectData === null || projectData === undefined) return false;

        return projectData.contacts.filter(c => c.id === contact.id).length === 1;
    }

    const handleContactChecked = (e, id) => {
        if(e.target.checked) {
            setContacts((prev) => {
                return [...prev, id];
            });
        }else{
            const newArr = contacts.filter(c => c !== id);
            setContacts(newArr);
        }
    }

    useEffect(() => {setFormData({...formData, contacts})}, [contacts])

    return (projectData || create) && (
        <div className={'w-full flex flex-row gap-20'}>
        <div class="w-2/4 text-alice">
        <form onSubmit={(e) => disableForm ? undefined : onSubmitPressed(e, formData)} className={'mt-5'}>
            <h2 className={'text-center text-xl'}>Projekt adatai</h2>
            <div class="grid grid-cols-1 gap-6 mb-5">
                <label class="block">
                    <span>Projekt neve</span>
                    <input type="text" class="
                        text-black
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25
                        " placeholder="" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={disableForm}/>
                </label>
                <label class="block">
                    <span >Projekt leírása</span>
                    <textarea class="
                        text-black
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25
                        " rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} disabled={disableForm}></textarea>
                </label>
                <label class="block">
                    <span>Projekt státusza</span>
                    <select class="
                        text-black
                        block
                        w-full
                        mt-1
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25
                        " onChange={(e) => setFormData({...formData, status: e.target.selectedIndex}) } disabled={disableForm}>
                        <option selected={formData.status === 0}><ProjectStatus status={0} /></option>
                        <option selected={formData.status === 1}><ProjectStatus status={1} /></option>
                        <option selected={formData.status === 2}><ProjectStatus status={2} /></option>
                    </select>
                </label>
            </div>
            <hr />
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <h2 className={'text-center text-xl'}>Kapcsolattartók</h2>
                    <div className={'mb-6'}>
                    {allContact.map((contact) => (
                        <ContactListItem key={contact.id + '' + contact.email} id={contact.id} name={contact.name} email={contact.email} isAssigned={isContactAssignedToProject(contact)} variant={'project'} checkboxChanged={handleContactChecked} />
                    ))}
                    </div>
                </label>
            </div>
            <button className={'bg-red-salsa px-3 py-2 rounded-md mt-5 hover:bg-red-salsa-500 disabled:cursor-not-allowed'} type={'submit'} disabled={disableForm}>{create ? 'LÉTREHOZ' : 'MENTÉS'}</button>
        </form>
        </div>

        <ContactForm />
        </div>
    )
}

export default ProjectForm
