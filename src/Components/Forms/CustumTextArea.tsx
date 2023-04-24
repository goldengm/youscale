import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldError } from 'react-hook-form/dist/types/errors'

interface Props {
    label: string,
    register: UseFormRegister<any>,
    name: string,
    error: FieldError | undefined
}
export default function CustumTextArea({ label, register, name, error }: Props): JSX.Element {
  return (
    <div>
        <label className="form-label">{label}</label>
        <textarea 
          {...register(name)}
          className="form-control" 
          rows={4} 
          id="comment" 
          defaultValue={""} 
        />
        { error && <p className='error'>{error.message}</p> }
    </div>
  )
}
