import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { IoMdListBox } from 'react-icons/io'
import { MdProductionQuantityLimits, MdOutlinePayments } from 'react-icons/md'
import { AiOutlineTeam } from 'react-icons/ai'
import { FcSettings } from 'react-icons/fc'
import { logOut } from '../../services/auth/logout'
import { useGetClientTeamMemberPageQuery } from '../../services/api/ClientTeamApi/ClientTeamPageApi'
import { GetRole } from '../../services/storageFunc'

const MenuNav = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <RxDashboard size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'dashbord'
  },
  {
    title: 'Order',
    path: '/order',
    icon: <IoMdListBox size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'order'
  },
  {
    title: 'Produit',
    path: '/product',
    icon: <MdProductionQuantityLimits size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'produit'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <AiOutlineTeam size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'team'
  },
  {
    title: 'Paiement',
    path: '/paiement',
    icon: <MdOutlinePayments size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'payment'
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <FcSettings size={35} color={'gray'} />,
    cName: 'nav-text',
    name: 'setting'
  },
]

function getActivePageArr(data: string[] | undefined): string[] {
  if (data === undefined) return []

  var arr: string[] = []
  data?.map((name) => arr.push(name))
  return arr
}

const DEFAULT_TEAM_PAGES_ACCESS = ['dashbord', 'order', 'produit', 'team', 'payment']

export default function Menu(): JSX.Element {

  const { data } = useGetClientTeamMemberPageQuery()

  const userData = localStorage.getItem('userData')
  var fullname = userData ? JSON.parse(userData).fullname : ''
  var name = userData ? JSON.parse(userData).name : ''

  var email = userData ? JSON.parse(userData).email : ''

  const activePageArr = getActivePageArr(data?.data)

  return (
    <div className="dlabnav">
      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">

          <li className="dropdown header-profile">
            <a
              className="nav-link"
              href="javascript:void(0);"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img src="images/profile/pic1.jpg" width={20} alt="" />
              <div className="header-info ms-3">
                <span className="font-w600 ">
                  Hi,<b> {fullname || name}</b>
                </span>
                <small className="text-end font-w400">{email}</small>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a
                href="#"
                onClick={() => logOut()}
                className="dropdown-item ai-icon"
              >
                <svg
                  id="icon-logout"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-danger"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="ms-2">Logout </span>
              </a>
            </div>
          </li>
          {
            GetRole() === 'CLIENT' ?
              MenuNav.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.path} onClick={(e) => {
                      Navigate({ to: item.path })
                      e.preventDefault()

                    }} className="ai-icon" aria-expanded="false">
                      {item.icon}
                      <span className={item.cName}>{item.title}</span>
                    </Link>
                  </li>
                )
              }) :
              activePageArr.length !== 0 ?
                MenuNav.map((item, index) => {
                  if (activePageArr.includes(item.name)) {
                    return (
                      <li key={index}>
                        <Link to={item.path} onClick={(e) => {
                          Navigate({ to: item.path })
                          e.preventDefault()

                        }} className="ai-icon" aria-expanded="false">
                          {item.icon}
                          <span className={item.cName}>{item.title}</span>
                        </Link>
                      </li>
                    )
                  }
                }) :
                MenuNav.map((item, index) => {
                  if (DEFAULT_TEAM_PAGES_ACCESS.includes(item.name)) {
                    return (
                      <li key={index}>
                        <Link to={item.path} onClick={(e) => {
                          Navigate({ to: item.path })
                          e.preventDefault()

                        }} className="ai-icon" aria-expanded="false">
                          {item.icon}
                          <span className={item.cName}>{item.title}</span>
                        </Link>
                      </li>
                    )
                  }
                })
          }
        </ul>
        <div className="copyright">
          <p>
            <strong>Dompet Payment Admin Dashboard</strong> © 2022 All Rights
            Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart" /> by DexignLab
          </p>
        </div>
      </div>
    </div>
  )
}
