import React from 'react'

const FormErrors = ({errors}) => {
    return errors !== null && errors.length !== 0 &&
    (<div className={'w-full bg-red-salsa border border-1 border-red-salsa-500 rounded-md p-2 flex gap-2 flex-col'}>
        {errors.map(err => <div className={''}>{err[1][0]}</div>)}
    </div>)
}

export default FormErrors
