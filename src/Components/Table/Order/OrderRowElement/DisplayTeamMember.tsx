import React from 'react'
import { GetTeamMemberModel } from '../../../../models'

interface Props {
  data?: GetTeamMemberModel[],
  order: { id: number, id_city: number, id_team: number, createdAt: Date } | undefined,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}
export default function DisplayTeamMember({ data, order, onChange }: Props): JSX.Element {
  return (
    <select
      onChange={onChange}
      className="select-custum"
    >
      <option value={0}>Aucun</option>
      {
        (data && order) &&
        data.map(
          (dt: any) => {
            if (!dt.active && order.createdAt > dt.updatedAt) return
            return <option selected={dt.id === order.id_team} className='form-select-option' value={dt.id}>{dt.name}</option>
          }
        )
      }
    </select>
  )
}
