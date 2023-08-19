import React from 'react'
import { MultiSelect } from "react-multi-select-component";

type OptionsType = {
    label: string;
    value: string | number | undefined;
    quantity?: number;
    variant?: string[];
    allVariant?: string[] | undefined;
}[]
interface MultiSelectElementProps {
    options: { label: string, value: string, allVariant?: string[] }[],
    selected: OptionsType,
    onChange: any,
    className?: string
}
export default function MultiSelectElement({ options, selected, onChange, className }: MultiSelectElementProps): JSX.Element {
    
  console.log(selected)
    return (
        <MultiSelect
            className={className}
            options={options}
            value={selected}
            onChange={onChange}
            labelledBy="Sélectionner"
        />
    )
}
