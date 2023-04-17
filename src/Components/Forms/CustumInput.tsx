import React from 'react'
import './form.style.css'

interface Props {
    label: string,
    placeholder: string,
    type: string,
    className?: string,
    defaultValue?: string | number
}
export default function CustumInput({ label, placeholder, type, className='', defaultValue='' }: Props): JSX.Element {
    return (
        <div className={`mb-3 col-md-6 ${className}`}>
            <label className="form-label">{label}</label>
            <input
                defaultValue={defaultValue}
                type={type}
                className="form-control"
                placeholder={placeholder}
            />
        </div>
    )
}
