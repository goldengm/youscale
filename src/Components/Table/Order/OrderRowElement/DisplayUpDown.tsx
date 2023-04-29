import React, { useState } from 'react'
import { GetClientOrderModel, ProductOrder } from '../../../../models'

interface Props {
  currentData: GetClientOrderModel,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}
export default function DisplayUpDown({ onChange, currentData }: Props): JSX.Element {

  const [Data] = useState<string[]>([
    'UpSell',
    'DownSell',
    'CrossSell',
  ])

  return (
    <select
      onChange={onChange}
      className="select-custum"
    >

      <option value={'Aucun'}>Aucun</option>
      {Data.map((dt) => (<option selected={dt === currentData['Up/Downsell']} value={dt}>{dt}</option>))}
    </select>
  )
}
