import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldError } from 'react-hook-form/dist/types/errors'

interface Props {
    label: string,
    name: string,
    register: UseFormRegister<any>,
    error: FieldError | undefined,
    data: {label: string, value: string | number}[],
    defaultSelected? : string | number | null,
    Onchange?: (e: React.ChangeEvent<HTMLSelectElement>)=> any
}
export default function CustumSelectForm({ label, name, register, error, data, Onchange, defaultSelected='' }: Props): JSX.Element {
    return (
        <div className="mb-3 col-md-4">
            <label className="form-label">{label}</label>
            <select
                {...register(name)}
                onChange={Onchange}
                name={name}
                className="me-sm-2 default-select form-control wide"
                id="inlineFormCustomSelect"
            >
                { data.map((dt) => <option selected={String(defaultSelected) === String(dt.value)} value={dt.value}>{dt.label}</option> )}
            </select>
            { error && <p className='error'>{error.message}</p> }
        </div>
    )
}
