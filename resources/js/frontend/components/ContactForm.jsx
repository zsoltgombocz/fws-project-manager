import React, {useContext, useState} from 'react'
import { ContactContext } from '../../state/ContactContext';
import DeleteIcon from '../atom/DeleteIcon';
import EditIcon from '../atom/EditIcon';
import ContactListItem from './ContactListItem';

const ContactForm = ({disableForm}) => {
    const {allContact} = useContext(ContactContext);
    const [create, setCreate] = useState(true);
    const [formData, setFormData] = useState({})

    const onSubmitPressed = () => {
        e.preventDefault();
        console.log()
    }

    return (
    <div class="w-2/4 text-alice">
        <form onSubmit={disableForm ? undefined : onSubmitPressed} className={'mt-5 mb-5'}>
            <h2 className={'text-center text-xl'}>Kapcsolattartók</h2>
            <div class="grid grid-cols-1 gap-6 mb-5">
                <label class="block">
                    <span>Kapcsolattartó neve</span>
                    <input type="text" class="
                        text-black
                        mt-1
                        block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25
                        " placeholder="" value={""} onChange={null} />
                </label>
                <label class="block">
                    <span >E-mail</span>
                   <input type="email" className={'text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25'} placeholder="" value={""} onChange={null} />
                </label>
            </div>
            <button className={'bg-red-salsa px-3 py-2 rounded-md mt-5 hover:bg-red-salsa-500 '} type={'submit'} disabled={disableForm}>{create ? 'LÉTREHOZ' : 'MENTÉS'}</button>
        </form>
        <hr />
            <div class="grid grid-cols-1 gap-6">
                <label class="block">
                    <div className={'mb-6'}>
                    {allContact.map((contact,i) => (
                        <ContactListItem key={contact.id + '' + contact.email} name={contact.name} email={contact.email} variant={'contact'}/>
                    ))}
                    </div>
                </label>
            </div>
        </div>
    )
}

export default ContactForm
