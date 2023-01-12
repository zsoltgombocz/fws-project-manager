import React, { useContext, useState } from 'react'
import { ContactContext } from '../../state/ContactContext';
import { ProjectContext } from '../../state/ProjectContext';
import FormSuccess from '../atom/FormSuccess';
import ContactListItem from './ContactListItem';
import FormErrors from './FormErrors';

const ContactForm = ({ disableForm = false }) => {
    const initialFormData = {
        id: -1,
        name: '',
        email: ''
    }
    const { allContact, createContact, deleteContact, updateContact } = useContext(ContactContext);
    const { refreshProjects } = useContext(ProjectContext)
    const [create, setCreate] = useState(true);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState(initialFormData);

    const handleDeleteClick = (contactId) => {
        setDeleteClicked(true);
        deleteContact(contactId).then(() => {
            setSuccessMessage('Kontakt törölve!');
            refreshProjects();
            if (contactId === formData.id) {
                resetForm();
            }
        }).catch(err => {
            setErrors(Object.entries(err));
            setSuccessMessage('');
        }).finally(() => setDeleteClicked(false));
    }

    const handleEditClick = (contact) => {
        setCreate(false);
        setFormData(contact);
    }

    const resetForm = () => {
        setCreate(true);
        setFormData(initialFormData);
    }

    const onSubmitPressed = (e) => {
        e.preventDefault();
        if (create) {
            createContact(formData).then(res => {
                setSuccessMessage('Kontakt létrehozva!');
                setErrors([]);
                setFormData(initialFormData);
            }).catch(err => {
                setErrors(Object.entries(err));
                setSuccessMessage('');
            });
        } else {
            updateContact(formData.id, formData).then(res => {
                setSuccessMessage('Kontakt mentve!');
                setErrors([]);
            }).catch(err => {
                setErrors(Object.entries(err));
                setSuccessMessage('');
            });
        }
    }


    return (
        <div className={'w-2/4 text-alice'}>
            <FormErrors errors={errors} onClick={() => setErrors([])} />
            <FormSuccess message={successMessage} onClick={() => setSuccessMessage('')} />
            <form onSubmit={disableForm ? undefined : onSubmitPressed} className={'mt-5 mb-5'}>
                <h2 className={'text-center text-xl'}>Kapcsolattartók</h2>
                <div className={'grid grid-cols-1 gap-6 mb-5'}>
                    <label className={'block'}>
                        <span>Kapcsolattartó neve</span>
                        <input type="text" className={'text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25'}
                            placeholder="" value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={disableForm}
                        />
                    </label>
                    <label className={'block'}>
                        <span >E-mail</span>
                        <input type="email" className={'text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25'}
                            placeholder="" value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={disableForm}
                        />
                    </label>
                </div>
                <button className={'bg-red-salsa px-3 py-2 rounded-md mt-5 hover:bg-red-salsa-500 disabled:cursor-not-allowed'} type={'submit'} disabled={disableForm}>{create ? 'LÉTREHOZ' : 'MENTÉS'}</button>
                {!create && <button onClick={resetForm} className={'bg-blue-400 px-3 py-2 rounded-md hover:bg-blue-500 cursor-pointer ml-5 disabled:cursor-not-allowed'} disabled={disableForm}>MÉGSE</button>}
            </form>
            <hr />
            <div className={'grid grid-cols-1 gap-6'}>
                <label className={'block'}>
                    <div className={'mb-6'}>
                        {allContact.map((contact, i) => (
                            <ContactListItem
                                key={contact.id + '' + contact.email}
                                name={contact.name} email={contact.email}
                                variant={'contact'}
                                onDeleteClick={() => handleDeleteClick(contact.id)}
                                onEditClick={() => handleEditClick(contact)}
                                disabledDelete={deleteClicked || disableForm}
                                disabledEdit={deleteClicked || disableForm}
                            />
                        ))}
                    </div>
                </label>
            </div>
        </div>
    )
}

export default ContactForm
