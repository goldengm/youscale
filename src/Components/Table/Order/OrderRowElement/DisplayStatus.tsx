import React from 'react'
import { OptionsType } from '../../../../models'

interface Props {
    name: string,
    options: OptionsType[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}
export default function DisplayStatus({ name, options, onChange }: Props) {
    return (
        <select
            onChange={onChange}
            className="select-custum"
        >
            <option selected={true}>{name}</option>
            { options.map((opn: OptionsType) => <option value={opn.value}>{opn.label}</option> ) }
        </select>
    )
}
