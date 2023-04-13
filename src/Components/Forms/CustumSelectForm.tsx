import React from 'react'

interface Props {
    label: string,
    name: string
}
export default function CustumSelectForm({ label, name }: Props) {
    return (
        <div className="mb-3 col-md-4">
            <label className="form-label">{label}</label>
            <select
                className="me-sm-2 default-select form-control wide"
                id="inlineFormCustomSelect"
            >
                <option selected={true}>{name}</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </select>
        </div>
    )
}
