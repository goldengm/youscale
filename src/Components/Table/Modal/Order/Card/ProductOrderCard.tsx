import React, { useState } from 'react'
import { MultiSelectElement } from '../../../../Input'

interface Props {
    title: string
}
export default function ProductOrderCard({ title }: Props) {
    const [selected, setSelected] = useState<[]>([]);

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

    return (
        <div>
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <h5 className="card-title">{title}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <div className="input-group mb-3  input-success">
                            <span className="input-group-text">Quantity</span>
                            <input type="number" defaultValue={0} className="form-control" />
                        </div>
                        <MultiSelectElement options={options} selected={selected} onChange={setSelected}/>
                    </p>
                </div>
            </div>
        </div>

    )
}
