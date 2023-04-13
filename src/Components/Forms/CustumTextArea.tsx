import React from 'react'

interface Props {
    label: string,
}
export default function CustumTextArea({ label }: Props) {
  return (
    <div>
        <label className="form-label">{label}</label>
        <textarea className="form-control" rows={4} id="comment" defaultValue={""} />
    </div>
  )
}
