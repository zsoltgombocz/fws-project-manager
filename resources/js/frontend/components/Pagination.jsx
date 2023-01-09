import React, {useContext} from 'react'
import { ProjectContext } from '../../state/ProjectContext';
import ArrowLeft from '../atom/ArrowLeft';
import ArrowRight from '../atom/ArrowRight';

const Pagination = () => {
    const {pagination, fetchPage} = useContext(ProjectContext);
    const handleArrowClick = (arrow) => {
        switch(arrow) {
            case 'prev':
                fetchPage(pagination.page - 1, pagination.filter);
                break;
            case 'next':
                fetchPage(pagination.page + 1, pagination.filter);
                break;
            default:
                break;
        }
    }
    return pagination.last !== 1 && (
        <>
        <div className={`rounded-md mt-5 py-2 bg-electric-blue flex flex-row align-middle gap-5 px-2 shadow-xl`}>
            <ArrowLeft disabled={pagination.page === 1} onClick={() => handleArrowClick('prev')} />
            <div className={'text-lg flex align-middle items-center'}>{pagination.page}</div>
            <ArrowRight disabled={pagination.page === pagination.last} onClick={() => handleArrowClick('next')} />
        </div>
    </>
    )
}

export default Pagination
