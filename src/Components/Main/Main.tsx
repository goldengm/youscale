import React, { useState } from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

interface Props {
  children: React.ReactNode,
  name: string,
  usingDate?: boolean,
  setDate?: React.Dispatch<React.SetStateAction<string[]>>,
  setUsingDate?: React.Dispatch<React.SetStateAction<boolean>>,
  setIdTeam?: React.Dispatch<React.SetStateAction<number>>,
  showDateFilter?: boolean,
  showProductFilter?: boolean,
  showTeamFilter?: boolean,
  setProduct?: React.Dispatch<React.SetStateAction<string>>
  urlVideo: string
  showTutorial: boolean
  closeTutorial: () => void
}
export default function Main({ children, name, setUsingDate, setDate, showDateFilter, setProduct, showProductFilter, showTeamFilter, setIdTeam, urlVideo, showTutorial, closeTutorial }: Props): JSX.Element {
  const [showMenu, setShowMenu] = useState<boolean>(true)

  return (
    <div id="main-wrapper" className={showMenu ? 'show menu-toggle' : 'show'}>
      <Header
        name={name}
        urlVideo={urlVideo}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setProduct={setProduct}
        showProductFilter={showProductFilter}
        setDate={setDate}
        setIdTeam={setIdTeam}
        showTeamFilter={showTeamFilter}
        setUsingDate={setUsingDate}
        showDateFilter={showDateFilter}
        showTutorial={showTutorial}
        closeTutorial={closeTutorial}
      />
      <Menu />
      {children}
      <Footer />
    </div>
  )
}
