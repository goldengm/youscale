import React from 'react'

interface Props {
    name: string
}
export default function CustumSelect({ name }: Props) {
    return (
        <div className="col-auto my-1">
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
