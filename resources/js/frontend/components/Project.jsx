import React from 'react'

const Project = ({name, status, contactNumber}) => {

  return (<>
        <div className={'mt-5 py-5 bg-electric-blue'}>{name}</div>
        <div>{status}</div>
        <div>{contactNumber}</div>
        <div>actions</div>
    </>)
}

export default Project
