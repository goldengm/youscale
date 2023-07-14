import React from 'react'
import { GetClientOrderModel, StatusModel } from '../../../../models'

interface Props {
    statusData?: StatusModel[],
    name: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any,
    currentData: GetClientOrderModel,
}
export default function DisplayStatus( { name, onChange, statusData, currentData }: Props): JSX.Element {
    return (
        <select
            onChange={onChange}
            className="select-custum"
        >
            {
                statusData && statusData.map(
                    (dt) => ( <option selected={dt.name === currentData.Status} style={{ color:dt.color ?? 'black'}} value={dt.name}>{dt.name}</option> ))
            }
        </select>
    )
}
