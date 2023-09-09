import React from 'react'
import './hovercard.css'

interface Props {
    children: JSX.Element | JSX.Element[]
}
export default function HoverCard({ children }: Props) {
    return (
        <div className="col-md-12">
            <span className="person person-text">
                <a className="name" href="#">
                    {children}
                </a>
                <div className="hovercard">
                    <div className="hovercard-container">
                        <div className="hovercard-arrow"></div>
                        <div className="hovercard-box">
                            <div className="hovercard-body">
                                Formule here
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    )
}
