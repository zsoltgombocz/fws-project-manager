import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../state/ProjectContext';
import FormSuccess from '../atom/FormSuccess';
import FormErrors from '../components/FormErrors';
import ProjectForm from '../components/ProjectForm'

const Create = () => {
    const {createProject, refreshProjects} = useContext(ProjectContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState([]);
    const [disableForm, setDisableForm] = useState(false);
    let timer;
    useEffect(() => {
      return () => {
        clearInterval(timer);
      }
    }, [])

    const handleCreate = (e, formData) => {
        setDisableForm(true);
        e.preventDefault();
        createProject(formData).then(res => {
            redirectIn(5000, 'Sikeres létrehozás!');
            setErrors([]);
            refreshProjects();
        }).catch(err => {
            setErrors(Object.entries(err));
            setSuccessMessage('');
            setDisableForm(false);
        });

    }

    const redirectIn = (time, message) => {
        if(timer === null || timer === undefined) {
            let curr = time;
            setSuccessMessage(`${message} Vissza irányítás ${curr / 1000}...`);
            timer = setInterval(() => {
                if(curr <= 0){
                    navigate('/');
                }else{
                    curr = curr - 1000;
                    setSuccessMessage(`${message} Vissza irányítás ${curr / 1000}...`);
                }
            }, 500);
        }
    }

    return (
        <main className={'w-3/4 mx-auto'}>
            <FormErrors errors={errors} />
            <FormSuccess message={successMessage} />
            <ProjectForm onSubmitPressed={handleCreate} create={true} disableForm={disableForm}/>
        </main>
    )
}

export default Create
