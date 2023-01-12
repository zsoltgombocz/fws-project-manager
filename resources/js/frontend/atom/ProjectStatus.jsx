import React from 'react'

const ProjectStatus = ({ status, raw = false }) => {
    const STATUS_TEXT = [
        'Fejlesztésre vár',
        'Folyamatban',
        'Kész'
    ];

    const STATUS_COLOR = [
        null,
        'blue-900',
        'green-900'
    ]

    return raw ?
        STATUS_TEXT[status] :
        (<span className={`font-normal ${STATUS_COLOR[status] !== null ? 'text-' + STATUS_COLOR[status] : ''}`}>
            {STATUS_TEXT[status]}
        </span>)
}

export default ProjectStatus
