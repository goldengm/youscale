import React from 'react'
import { MultiSelect } from "react-multi-select-component";

interface MultiSelectElementProps {
    options: { label: string, value: string }[],
    selected: [],
    onChange: React.Dispatch<any>
}
export default function MultiSelectElement({ options, selected, onChange }: MultiSelectElementProps) {
    return (
        <MultiSelect
            options={options}
            value={selected}
            onChange={onChange}
            labelledBy="Select"
        />
    )
}
