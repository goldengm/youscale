import React from 'react'
import Main from '../../Main'
import { FaPen } from 'react-icons/fa'
import { PERFORMANCE_STATS_DATA, EARNING_STATS_DATA } from '../../../services/mocks/mock-youscale-dashbord'
import PerformanceCard from './PerformanceCard'
import EarningCard from './EarningCard'
import { CustomHist } from '../../Chart'
import './team.style.css'

export default function Team(): JSX.Element {

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
            <div className="content-body">
                <div className="container-fluid">
                    <div className="team-header">
                        <BestSellingProduct />
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

const BestSellingProduct = (): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-5 col-xl-custum">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Team</h4>
                    </div>
                </div>
                <div className="card-body">
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                </div>
            </div>
        </div>
    )
}

const BestSellingCard = (): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <div className="fs-18 card-info">
                <span className="text-black pe-2">Malick</span>
                <span>malick@mail.com</span>
            </div>

            <div className="fs-18 card-edit">
                <FaPen
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