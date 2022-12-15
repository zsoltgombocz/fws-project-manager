import React, {useState, useEffect, useContext} from 'react'
import { api } from '../api/api';
import { ProjectContext } from '../state/ProjectContext';
import Project from './components/Project';

const Home = () => {
    const [filter, setFilter] = useState(null);
    const {currentProjects} = useContext(ProjectContext);
    console.log(currentProjects)
  return (
    <main className={'w-3/4 flex mx-auto'}>
        <div className={'grid grid-cols-4 grid-flow-row auto-rows-max'}>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Project Name</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Status</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Contact Number</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Actions</div>

                {currentProjects.map(project =>
                    <Project name={project.name} status={project.status} contactNumber={project.contacts.length} />
                )}
        </div>
    </main>
  )
}

export default Home
