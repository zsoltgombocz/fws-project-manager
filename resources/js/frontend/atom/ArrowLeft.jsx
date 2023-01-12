import React from 'react'

const ArrowLeft = ({ onClick, disabled }) => {
    return (
        <div onClick={disabled ? undefined : onClick} className={`${disabled ? 'cursor-not-allowed text-gray-400' : 'hover:text-blue-500 cursor-pointer inline-block'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>
    )
}

export default ArrowLeft
