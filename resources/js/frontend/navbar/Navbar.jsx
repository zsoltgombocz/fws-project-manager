import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { ProjectContext } from '../../state/ProjectContext';


const Navbar = () => {
    const {projectCount} = useContext(ProjectContext);

    const location = useLocation();
    const isCreateDisabled = location.pathname === '/create';

    return (
        <nav className={'bg-electric-blue w-2/4 flex flex-row p-5 mt-5 rounded-md shadow-xl self-center items-center justify-between'}>
            <div className={'flex flex-row items-center'}>
                <Link to='/' className={'text-3xl font-medium font mr-2'}>
                    FWS PM
                </Link>
                <span className={'text-gray-400 font-light text-base'}>&#9679; Projects: {projectCount}</span>
            </div>

            <Link to="/create"><button className={'bg-red-salsa px-3 py-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed enabled:hover:bg-red-salsa-500'} disabled={isCreateDisabled}>CREATE</button></Link>
        </nav>
    )
}

export default Navbar
