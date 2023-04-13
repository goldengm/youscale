import React from 'react'

interface Props {
  name: string
}
export default function DisplaySource({ name }: Props) {
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
