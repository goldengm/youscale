import React from 'react'
import './form.style.css'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldError } from 'react-hook-form/dist/types/errors'

interface Props {
    label: string,
    placeholder: string,
    type: string,
    className?: string,
    defaultValue?: string | number,
    register: UseFormRegister<any> | any,
    name: string,
    error: FieldError | undefined,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
}
export default function CustumInput({ label, placeholder, type, className='', defaultValue='', register, name, error, onChange }: Props): JSX.Element {
    return (
        <div className={`mb-3 col-md-6 ${className}`}>
            <label className="form-label">{label}</label>
            <input
                min={0}
                {...register(name)}
                defaultValue={defaultValue}
                onChange={onChange}
                type={type}
                className="form-control"
                placeholder={placeholder}
            />
            { error && <p className='error'>{error.message}</p> }
        </div>
    )
}
