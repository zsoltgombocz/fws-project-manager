import React, { useContext } from 'react'
import { ProjectContext } from '../../state/ProjectContext'
import ProjectStatus from '../atom/ProjectStatus';

const Filter = () => {
    const { fetchPage, pagination } = useContext(ProjectContext);
    const handleChange = (e) => {
        //If 0 index selected that means we do not need to filter, set to null thus the function handle the
        //null filter, if the selected index not the 0 then decrease since the status spreads from 0-2
        const filter = e.target.selectedIndex === 0 ? null : e.target.selectedIndex - 1;
        fetchPage(1, filter);
    }

    console.log(pagination.filter);
    return (
        <div className={'mb-5 flex flex-col'}>
            <span className={'text-alice text-lg'}>Projekt állapota</span>
            <label className={'block'}>
                <select value={
                    pagination.filter === null || pagination.filter === undefined
                        ? 'all'
                        : pagination.filter}
                    onChange={handleChange} className={'text-black block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-alice focus:ring-opacity-25'}>
                    <option value={'all'}>Mind</option>
                    <option value={0}><ProjectStatus status={0} /></option>
                    <option value={1}><ProjectStatus status={1} /></option>
                    <option value={2}><ProjectStatus status={2} /></option>
                </select>
            </label>
        </div>
    )
}

export default Filter
