import React, { useState } from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

interface Props {
    children: React.ReactNode,
    name: string
}
export default function Main( { children, name }: Props ): JSX.Element {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div id="main-wrapper" className={showMenu ? 'show menu-toggle' : 'show'}>
        <Header name={name} showMenu={showMenu} setShowMenu={setShowMenu} />
        <Menu />
        {children}
        <Footer />
    </div>
  )
}
