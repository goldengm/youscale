import React from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

interface Props {
    children: React.ReactNode,
    name: string
}
export default function Main( { children, name }: Props ) {
  return (
    <div id="main-wrapper">
        <Header name={name} />
        <Menu />
        {children}
        <Footer />
    </div>
  )
}
