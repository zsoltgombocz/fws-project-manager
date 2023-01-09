import React from 'react'

const ArrowRight = ({onClick, disabled}) => {
  return (
    <div onClick={disabled ? undefined : onClick} className={`${disabled ? 'cursor-not-allowed text-gray-400' : 'hover:text-blue-500 cursor-pointer inline-block'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </div>
  )
}

export default ArrowRight