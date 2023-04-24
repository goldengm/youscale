import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldError } from 'react-hook-form/dist/types/errors'

interface Props {
    label: string,
    name: string,
    register: UseFormRegister<any>,
    error: FieldError | undefined
}
export default function CustumSelectForm({ label, name, register, error }: Props): JSX.Element {
    return (
        <div className="mb-3 col-md-4">
            <label className="form-label">{label}</label>
            <select
                {...register(name)}
                name={name}
                className="me-sm-2 default-select form-control wide"
                id="inlineFormCustomSelect"
            >
                <option>{name}</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </select>
            { error && <p className='error'>{error.message}</p> }
        </div>
    )
}
