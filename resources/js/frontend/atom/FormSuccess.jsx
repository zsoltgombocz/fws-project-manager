import React from 'react'

const FormSuccess = ({message}) => {
  return message && message !== "" && message.length > 0 && (
    <div className={'w-full bg-green-600 border border-1 border-green-900 rounded-md p-2 flex gap-2 flex-col'}>
        {message}
    </div>
  )
}

export default FormSuccess
