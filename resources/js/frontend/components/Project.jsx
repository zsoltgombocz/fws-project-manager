import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectContext } from '../../state/ProjectContext';
import DeleteIcon from '../atom/DeleteIcon';
import EditIcon from '../atom/EditIcon';
import ProjectStatus from '../atom/ProjectStatus'

const Project = ({id, name, status, contactNumber}) => {
    const {deleteProject} = useContext(ProjectContext);
    const [actionPressed, setActionPressed] = useState(false);

    const navigate = useNavigate();

    const handleEditClick = (projectId) => {
        navigate(`/edit/${projectId}`);
    }

    const handleDeleteClick = (projectId) => {
        setActionPressed(true);
        deleteProject(projectId).finally(() => setActionPressed(false))
    }

    return (<>
        <div className={`rounded-l-md mt-5 py-5 bg-electric-blue ${actionPressed && 'brightness-90'}`}>{name}</div>
        <div className={`mt-5 py-5 bg-electric-blue ${actionPressed && 'brightness-90'}`}><ProjectStatus status={status} /></div>
        <div className={`mt-5 py-5 bg-electric-blue ${actionPressed && 'brightness-90'}`}>{contactNumber}</div>
        <div className={`mt-5 py-5 bg-electric-blue rounded-r-md flex justify-center ${actionPressed && 'brightness-90'} gap-10`}>
            <EditIcon onClick={() => handleEditClick(id)} />
            <DeleteIcon disabled={actionPressed} onClick={() => handleDeleteClick(id)} />
        </div>
    </>)
}

export default Project
