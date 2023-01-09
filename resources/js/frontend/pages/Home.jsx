import React, {useContext} from 'react'
import { ProjectContext } from '../../state/ProjectContext';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import Project from '../components/Project';

const Home = () => {
    const {currentProjects} = useContext(ProjectContext);

  return (
    <main className={'w-3/4 mx-auto h-fit'}>
        <div className={'flex flex-row items-center justify-between'}>
            <Filter />
            <Pagination />
        </div>
        <div className={'grid grid-cols-4 grid-flow-row auto-rows-max text-center pb-5'}>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Projekt neve</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Státusz</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Kapcsolattartók</div>
                <div className={'border-solid border-b-2 border-electric-blue shadow-xl pb-2'}>Műveletek</div>

                {currentProjects.map(project =>
                    <Project key={project.id} id={project.id} name={project.name} status={project.status} contactNumber={project.contacts.length} />
                )}


        </div>
    </main>
  )
}

export default Home
