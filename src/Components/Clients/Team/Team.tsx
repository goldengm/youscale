import React, { useState } from 'react'
import Main from '../../Main'
import { FaPen } from 'react-icons/fa'
import { PERFORMANCE_STATS_DATA, EARNING_STATS_DATA } from '../../../services/mocks/mock-youscale-dashbord'
import PerformanceCard from './PerformanceCard'
import EarningCard from './EarningCard'
import { CustomHist } from '../../Chart'
import { AddTeamModal, EditTeamModal } from '../../Table/Modal/Team'
import './team.style.css'

export default function Team(): JSX.Element {

    const [showAddTeamModal, setShowAddTeamModal] = useState<boolean>(false)
    const [showEditTeamModal, setShowEditTeamModal] = useState<boolean>(false)

    let option = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: {
                display: false,
            }
        }
    }

    return (
        <Main name={'Team'}>
            { showAddTeamModal && <AddTeamModal showModal={showAddTeamModal} setShowModal={setShowAddTeamModal} /> }
            { showEditTeamModal && <EditTeamModal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal} /> }
            <div className="content-body">
                <div className="container-fluid">
                    <div className="team-header">
                        <TeamCard setShowAddTeamModal={setShowAddTeamModal} setShowEditTeamModal={setShowEditTeamModal} />
                        <PerformanceCard>
                            <CustomHist data={PERFORMANCE_STATS_DATA} options={option} />
                        </PerformanceCard>
                    </div>
                    <EarningCard>
                        <CustomHist data={EARNING_STATS_DATA} options={option} />
                    </EarningCard>
                </div>
            </div>
        </Main>
    )
}

interface PropsTeamCard {
    setShowAddTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TeamCard = ({ setShowAddTeamModal, setShowEditTeamModal }:PropsTeamCard): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-5 col-xl-custum">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Team</h4>
                    </div>
                    <a 
                        onClick={()=> setShowAddTeamModal(true)}
                        type="button" 
                        className="btn btn-primary mb-2">
                            Add team
                    </a>
                </div>
                <div className="card-body">
                    <TeamRow setShowEditTeamModal={setShowEditTeamModal} />
                    <TeamRow setShowEditTeamModal={setShowEditTeamModal} />
                    <TeamRow setShowEditTeamModal={setShowEditTeamModal} />
                    <TeamRow setShowEditTeamModal={setShowEditTeamModal} />
                </div>
            </div>
        </div>
    )
}

interface PropsTeamRow {
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TeamRow = ({ setShowEditTeamModal }:PropsTeamRow): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <div className="fs-18 card-info">
                <span className="text-black pe-2">Malick</span>
                <span>malick@mail.com</span>
            </div>

            <div className="fs-18 card-edit">
                <FaPen
                    onClick={()=> setShowEditTeamModal(true)}
                    className='edit-team-pencil'
                    style={{ marginRight: 12 }}
                />
                <Switch active={true} onClick={() => console.log("click")} />
            </div>
        </div>
    )
}

interface SwitchProps {
    onClick: any,
    active: boolean | undefined
}
const Switch = ({ onClick, active }: SwitchProps) => {
    return (
        <label className="switch">
            <input defaultChecked={active} onClick={onClick} type="checkbox" />
            <span className="slider round"></span>
        </label>

    )
}