import React, { useState } from 'react'
import Main from '../../Main'
import { FaPen } from 'react-icons/fa'
import { PERFORMANCE_STATS_DATA, EARNING_STATS_DATA } from '../../../services/mocks/mock-youscale-dashbord'
import PerformanceCard from './PerformanceCard'
import EarningCard from './EarningCard'
import { CustomHist } from '../../Chart'
import { AddTeamModal, EditTeamModal } from '../../Table/Modal/Team'
import './team.style.css'
import { GetTeamMemberModel } from '../../../models'
import { useGetTeamMemberQuery, usePatchTeamMemberMutation } from '../../../services/api/ClientApi/ClientTeamMemberApi'

export default function Team(): JSX.Element {
    const { data, isSuccess, refetch } = useGetTeamMemberQuery()

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
            {showAddTeamModal && <AddTeamModal refetch={refetch} showModal={showAddTeamModal} setShowModal={setShowAddTeamModal} />}
            {showEditTeamModal && <EditTeamModal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal} />}
            <div className="content-body">
                <div className="container-fluid">
                    <div className="team-header">
                        <TeamCard data={data?.data} setShowAddTeamModal={setShowAddTeamModal} setShowEditTeamModal={setShowEditTeamModal} refetch={refetch} />
                        <PerformanceCard>
                            <CustomHist data={PERFORMANCE_STATS_DATA} options={option} />
                        </PerformanceCard>
                    </div>
                    <EarningCard>
                        <CustomHist data={EARNING_STATS_DATA} options={option} />
                        <EarningTale />
                    </EarningCard>
                </div>
            </div>
        </Main>
    )
}

interface PropsTeamCard {
    setShowAddTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: GetTeamMemberModel[] | undefined;
    refetch: ()=> any
}
const TeamCard = ({ setShowAddTeamModal, setShowEditTeamModal, data, refetch }: PropsTeamCard): JSX.Element => {

    return (
        <div className="col-xl-3 col-xxl-5 col-xl-custum">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Team</h4>
                    </div>
                    <a
                        onClick={() => setShowAddTeamModal(true)}
                        type="button"
                        className="btn btn-primary mb-2">
                        Add team
                    </a>
                </div>
                <div className="card-body">
                    {data && data.map((dt, index) => <TeamRow key={index} refetch={refetch} item={dt} setShowEditTeamModal={setShowEditTeamModal} />)}
                </div>
            </div>
        </div>
    )
}

interface PropsTeamRow {
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    item: GetTeamMemberModel,
    refetch: () => any
}
const TeamRow = ({ setShowEditTeamModal, item, refetch }: PropsTeamRow): JSX.Element => {

    const [patchTeamMember, { error, isError }] = usePatchTeamMemberMutation()

    const handleEditSatus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault()

        patchTeamMember({ id: item.id, active: !item.active }).unwrap()
            .then((res: any) => {
                refetch()
            })
            .catch((err: any) => alert(err.data.message))
    }

    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <div className="fs-18 card-info">
                <span className="text-black pe-2">{item.name}</span>
                <span>{item.email}</span>
            </div>

            <div className="fs-18 card-edit">
                <FaPen
                    onClick={() => setShowEditTeamModal(true)}
                    className='edit-team-pencil'
                    style={{ marginRight: 12 }}
                />
                <Switch active={item.active} onClick={handleEditSatus} />
            </div>
        </div>
    )
}

interface SwitchProps {
    onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => any,
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

const EarningTale = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-responsive-sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre de commande</th>
                                    <th>Her earning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Livre</td>
                                    <td>22</td>
                                    <td className="color-danger">14.85 dhs</td>
                                </tr>
                                <tr>
                                    <td>Upsell</td>
                                    <td>30</td>
                                    <td className="color-success">55.32 dhs</td>
                                </tr>
                                <tr>
                                    <td>Downsell</td>
                                    <td>30</td>
                                    <td className="color-success">55.32 dhs</td>
                                </tr>
                                <tr>
                                    <td>CrossSell</td>
                                    <td>30</td>
                                    <td className="color-success">55.32 dhs</td>
                                </tr>
                                <tr>
                                    <td>Salaire</td>
                                    <td>30</td>
                                    <td className="color-success">55.32 dhs</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>55</td>
                                    <td><span className="badge badge-primary light">21.56 dhs</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* /# card */}
        </div>
    )
}