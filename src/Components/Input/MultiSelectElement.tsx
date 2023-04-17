import React from 'react'
import { MultiSelect } from "react-multi-select-component";

interface MultiSelectElementProps {
    options: { label: string, value: string }[],
    selected: [],
    onChange: React.Dispatch<any>,
    className?: string
}
export default function MultiSelectElement({ options, selected, onChange, className }: MultiSelectElementProps): JSX.Element {
    return (
        <MultiSelect
            className={className}
            options={options}
            value={selected}
            onChange={onChange}
            labelledBy="Select"
        />
    )
}
