import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectContext } from '../../state/ProjectContext';
import FormSuccess from '../atom/FormSuccess';
import FormErrors from '../components/FormErrors';
import ProjectForm from '../components/ProjectForm';

const Edit = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const { updateProject, refreshProjects, getProjectInformation } = useContext(ProjectContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const [disableForm, setDisableForm] = useState(false);


    useEffect(() => {
        if (project === null && !isNaN(id)) {
            getProjectInformation(id).then(result => setProject(result)).catch(() => navigate('/', { replace: true }));
        } else {
            navigate('/', { replace: true });
        }
    }, [id]);

    const handleFormSubmit = (e, formData) => {
        e.preventDefault();
        setDisableForm(true);
        updateProject(formData.id, formData).then(res => {
            setSuccessMessage('Adatok frissítve!');
            setErrors([]);
            refreshProjects();
        }).catch(err => {
            setErrors(Object.entries(err));
            setSuccessMessage('');
        }).finally(() => setDisableForm(false));
    }


    return (
        <main className={'w-3/4 mx-auto'}>
            <FormErrors errors={errors} onClick={() => setErrors([])} />
            <FormSuccess message={successMessage} onClick={() => setSuccessMessage('')} />
            <ProjectForm projectData={project} onSubmitPressed={handleFormSubmit} create={false} disableForm={disableForm} />
        </main>
    )
}

export default Edit
