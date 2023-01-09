import React from 'react'

const ProjectStatus = ({status}) => {
    switch(status) {
        case 0:
            return (<span className={'font-normal'}>Fejlesztésre vár</span>)
        case 1:
            return (<span className={'font-normal text-blue-900'}>Folyamatban</span>)
        case 2:
            return (<span className={'font-normal text-green-900'}>Kész</span>)
    }
}

export default ProjectStatus
