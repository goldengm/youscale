import React, { useState } from 'react'
import { GetClientOrderModel, ProductOrder } from '../../../../models'

interface Props {
  currentData: GetClientOrderModel,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any,
}
export default function DisplaySource({ currentData, onChange }: Props): JSX.Element {
  const [sourceData] = useState<string[]>([
    'Facebook',
    'WhatsApp',
    'YouTube',
    'TikTok',
    'Snapchat',
    'Google'
  ])

  return (
    <select
      onChange={onChange}
      className="select-custum"
    >
      <option value={0}>Aucun</option>
      {sourceData.map((dt) => (<option selected={dt === currentData.Source} value={dt}>{dt}</option>))}
    </select>
  )
}
