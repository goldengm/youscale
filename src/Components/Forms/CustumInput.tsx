import React from 'react'

interface Props {
    label: string,
    placeholder: string,
    type: string
}
export default function CustumInput({ label, placeholder, type }: Props): JSX.Element {
    return (
        <div className="mb-3 col-md-6">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className="form-control"
                placeholder={placeholder}
            />
        </div>
    )
}
