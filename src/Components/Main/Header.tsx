import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CustumSelect } from '../Forms'
import CustumDateRangePicker from './CustumDateRangePicker'
import { RxVideo } from 'react-icons/rx'
import { useGetProductQuery } from '../../services/api/ClientApi/ClientProductApi'
import { useGetTeamMemberQuery } from '../../services/api/ClientApi/ClientTeamMemberApi'
import { useGetAnnoucementQuery } from '../../services/api/ClientApi/ClientAnnoucementApi'
import { VideoModal } from '../Table/Modal/Video'
import { GetProductModel, GetTeamMemberModel } from '../../models'
import './styles.css'

interface Props {
  setDate?: React.Dispatch<React.SetStateAction<string[]>>,
  setProduct?: React.Dispatch<React.SetStateAction<string>>,
  setUsingDate?: React.Dispatch<React.SetStateAction<boolean>>,
  showDateFilter?: boolean,
  setIdTeam?: React.Dispatch<React.SetStateAction<number>>,
  showTeamFilter?: boolean,
  showProductFilter?: boolean,
  showMenu: boolean,
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>,
  name: string
  urlVideo: string
}

type dataType = {
  label: string;
  value: string;
}[]

const convertProduct = (data: GetProductModel[] | undefined): dataType => {

  if (!data) return []

  var out: dataType = []

  data.map(dt => {
    if (!dt.isDeleted) {
      out.push({ label: dt.name, value: String(dt.id) })
    }
  })

  return out
}

const convertTeamMember = (data: GetTeamMemberModel[] | undefined): dataType => {

  if (!data) return []

  var out: dataType = [{label: 'Aucun', value: String(0)}]

  data.map(dt => {
    if (dt.active) {
      out.push({ label: dt.name ?? '', value: String(dt.id) })
    }
  })

  return out

}

export default function Header({ setDate, setUsingDate, showDateFilter, setProduct, showProductFilter, showTeamFilter, setIdTeam, name, showMenu, setShowMenu, urlVideo }: Props): JSX.Element {

  const { data: productData } = useGetProductQuery()
  const { data: teamData } = useGetTeamMemberQuery()
  const { data, isSuccess } = useGetAnnoucementQuery()

  const [showVideo, setShowVideo] = useState<boolean>(false)

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    if (value === 'all') return

    setIdTeam && setIdTeam(Number(value))
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    if (value === 'all') return

    setProduct && setProduct(value)
  }

  return (
    <>
      { showVideo && <VideoModal setShowModal={setShowVideo} showModal={showVideo} urlVideo={urlVideo} />}
      <div className="nav-header">
        <a href="index.html" className="brand-logo">
          <img src="/cus_img/Group15.png" alt="logo" className="brand-title" width="124px" height="33px" />
        </a>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="nav-control"
        >
          <div className={showMenu ? "hamburger is-active" : "hamburger"}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
      </div>

      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">{name}</div>
              </div>
              <p className='annoucement-txt'>{data?.data && data?.data.text}</p>
              <ul className="navbar-nav header-right">
                <li className="nav-item">
                  {showProductFilter && <CustumSelect name='Product' data={convertProduct(productData?.data)} onChange={handleProductChange} />}
                </li>

                <li className="nav-item">
                  {showTeamFilter && <CustumSelect name='Team member' data={convertTeamMember(teamData?.data)} onChange={handleTeamChange} />}
                </li>

                <li className="nav-item">
                  {showDateFilter && <CustumDateRangePicker setDate={setDate} setUsingDate={setUsingDate} />}
                </li>

                <li className="nav-item">
                  <Link
                    to={'/pack'}
                    className="nav-link"
                    onClick={(e) => {
                      Navigate({ to: '/pack' })
                      e.preventDefault()
                    }}
                  >
                    <svg
                      width={28}
                      height={28}
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M3.88552 6.2921C1.95571 6.54135 0.439911 8.19656 0.439911 10.1896V10.7253C0.439911 12.8874 2.21812 14.6725 4.38019 14.6725H12.7058V24.9768H7.01104C5.77451 24.9768 4.82009 24.0223 4.82009 22.7858V18.4039C4.84523 16.6262 2.16581 16.6262 2.19096 18.4039V22.7858C2.19096 25.4334 4.36345 27.6059 7.01104 27.6059H21.0331C23.6807 27.6059 25.8532 25.4334 25.8532 22.7858V13.9981C26.9064 13.286 27.6042 12.0802 27.6042 10.7253V10.1896C27.6042 8.17115 26.0501 6.50077 24.085 6.28526C24.0053 0.424609 17.6008 -1.28785 13.9827 2.48534C10.3936 -1.60185 3.7545 1.06979 3.88552 6.2921ZM12.7058 5.68103C12.7058 5.86287 12.7033 6.0541 12.7058 6.24246H6.50609C6.55988 2.31413 11.988 1.90765 12.7058 5.68103ZM21.4559 6.24246H15.3383C15.3405 6.05824 15.3538 5.87664 15.3383 5.69473C15.9325 2.04532 21.3535 2.18829 21.4559 6.24246ZM4.38019 8.87502H12.7058V12.0382H4.38019C3.62918 12.0382 3.06562 11.4764 3.06562 10.7253V10.1896C3.06562 9.43859 3.6292 8.87502 4.38019 8.87502ZM15.3383 8.87502H23.6656C24.4166 8.87502 24.9785 9.43859 24.9785 10.1896V10.7253C24.9785 11.4764 24.4167 12.0382 23.6656 12.0382H15.3383V8.87502ZM15.3383 14.6725H23.224V22.7858C23.224 24.0223 22.2696 24.9768 21.0331 24.9768H15.3383V14.6725Z"
                        fill="#4f7086"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={'#'}
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowVideo(true)
                    }}
                  >
                   <RxVideo size={30}/>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
