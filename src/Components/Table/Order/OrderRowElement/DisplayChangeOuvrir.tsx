import React from 'react'
import './style.css'

interface Props {
  name: string
}
export default function DisplayChangeOuvrir({ name }: Props): JSX.Element {
  return (
    <select
      className="select-custum"
    >
      <option selected={true}>{name}</option>
      <option value={1}>One</option>
      <option value={2}>Two</option>
      <option value={3}>Three</option>
    </select>
  )
}
