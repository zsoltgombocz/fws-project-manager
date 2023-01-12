import React from 'react'
import EditIcon from '../atom/EditIcon';
import DeleteIcon from '../atom/DeleteIcon';

const ContactListItem = ({ id, name, email, variant, onEditClick, onDeleteClick, isAssigned, checkboxChanged, disabledDelete = false }) => {
    return (
        <div className={'mb-2 mt-2 flex flex-row items-center justify-between'}>
            <label htmlFor={`contact-${id}`}>{name} ({email})</label>
            <div className={'flex gap-5'}>
                {variant === 'contact' && (
                    <>
                        <EditIcon onClick={onEditClick} />
                        <DeleteIcon onClick={onDeleteClick} disabled={disabledDelete} />
                    </>
                )}

                {variant === 'project' && (
                    <label className={'inline-flex items-center'}>
                        <input type="checkbox" className='
                    rounded
                    border-gray-300
                    text-blue-500
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-offset-0
                    focus:ring-alice focus:ring-opacity-25
                ' defaultChecked={isAssigned} onChange={(e) => checkboxChanged(e, id)} id={`contact-${id}`} />
                    </label>
                )}

            </div>
        </div>
    )
}

export default ContactListItem
