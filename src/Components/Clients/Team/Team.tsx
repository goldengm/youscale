import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import { FaPen } from 'react-icons/fa'
import { RiLoginCircleFill } from 'react-icons/ri'
import { CustomHist } from '../../Chart'
import { AddTeamModal, EditTeamModal } from '../../Table/Modal/Team'
import { EarningTable, GetTeamMemberModel, TeamDashbordQueryModel } from '../../../models'
import { useGetTeamMemberQuery, usePatchTeamMemberMutation } from '../../../services/api/ClientApi/ClientTeamMemberApi'
import { useGetTeamDashbordQuery } from '../../../services/api/ClientApi/ClientTeamDashbordApi'
import { showToastError } from '../../../services/toast/showToastError'
import PerformanceCard from './PerformanceCard'
import EarningCard from './EarningCard'
import './team.style.css'

import { GetRole, SetRole } from '../../../services/storageFunc'
import { useLoginAsTeamMutation } from '../../../services/api/ClientApi/ClientApi'
import { setToken } from '../../../services/auth/setToken'
import { setUserData } from '../../../services/auth/setUserData'

export default function Team(): JSX.Element {
    const userData = localStorage.getItem('userData')

    const { data, refetch } = useGetTeamMemberQuery()

    const [date, setDate] = useState<string[]>([])
    const [idTeam, setIdTeam] = useState<number>(GetRole() === 'TEAM' ? JSON.parse(userData || '{id: 0}').id : 0)
    const [usingDate, setUsingDate] = useState<boolean>(false)
    const [OrderQueryData, setOrderQueryData] = useState<TeamDashbordQueryModel>({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1] })
    const { data: teamData, refetch: refetchTeamData } = useGetTeamDashbordQuery(OrderQueryData)

    useEffect(() => {
        setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_team: idTeam ?? undefined })
        refetchTeamData()
    }, [date, usingDate])

    useEffect(() => {
        setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_team: idTeam ?? undefined })
        refetchTeamData()
    }, [idTeam])

    const [showAddTeamModal, setShowAddTeamModal] = useState<boolean>(false)
    const [showEditTeamModal, setShowEditTeamModal] = useState<boolean>(false)

    const [item, setItem] = useState<GetTeamMemberModel>()

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
        <Main name={'Team'} urlVideo={'https://www.youtube.com/watch?v=Y2eNJGFfhVY'} showTeamFilter={GetRole() === 'TEAM' ? false : true} setIdTeam={setIdTeam} showDateFilter={true} usingDate={usingDate} setDate={setDate} setUsingDate={setUsingDate}>
            {showAddTeamModal && <AddTeamModal refetch={refetch} showModal={showAddTeamModal} setShowModal={setShowAddTeamModal} />}
            {showEditTeamModal && <EditTeamModal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal} dataEdit={item} refetch={refetch} />}
            <div className="content-body">
                <div className="container-fluid">
                    <div className="team-header">
                        <TeamCard data={data?.data} setItem={setItem} setShowAddTeamModal={setShowAddTeamModal} setShowEditTeamModal={setShowEditTeamModal} refetch={refetch} />
                        {
                            teamData &&
                            <PerformanceCard>
                                <CustomHist data={teamData.data.performance} options={option} />
                            </PerformanceCard>
                        }
                    </div>
                    <EarningCard>
                        {teamData && <CustomHist data={teamData.data.earning} options={option} />}
                        <EarningTale earningTable={teamData?.data.earning_table} />
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
    setItem: React.Dispatch<React.SetStateAction<GetTeamMemberModel | undefined>>
    refetch: () => any
}
const TeamCard = ({ setShowAddTeamModal, setShowEditTeamModal, data, refetch, setItem }: PropsTeamCard): JSX.Element => {

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
                    {data && data.map((dt, index) => <TeamRow key={index} refetch={refetch} item={dt} setShowEditTeamModal={setShowEditTeamModal} setItem={setItem} />)}
                </div>
            </div>
        </div>
    )
}

interface PropsTeamRow {
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    item: GetTeamMemberModel,
    setItem: React.Dispatch<React.SetStateAction<GetTeamMemberModel | undefined>>
    refetch: () => any
}
const TeamRow = ({ setShowEditTeamModal, item, refetch, setItem }: PropsTeamRow): JSX.Element => {

    const [loginAsTeam] = useLoginAsTeamMutation()

    const [patchTeamMember, { error, isError }] = usePatchTeamMemberMutation()

    const handleEditSatus = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {

        patchTeamMember({ id: item.id, active: !item.active }).unwrap()
            .then((res: any) => {
                refetch()
            })
            .catch((err: any) => showToastError(err.data.message))
    }

    const handleShowEdit = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()

        setItem(item)
        setShowEditTeamModal(true)
    }

    const handleLoginAsTeam = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()

        loginAsTeam({ email: item.email ?? '' }).unwrap()
            .then((res: any) => {
                localStorage.removeItem('STEP')

                setToken(res.token)
                setUserData(res.team)
                SetRole('TEAM')

                window.location.href = '/order'
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <div className="fs-18 card-info">
                <span className="text-black pe-2">{item.name}</span>
                <span>{item.email}</span>
            </div>

            <div className="fs-18 card-edit">
                <RiLoginCircleFill onClick={handleLoginAsTeam} size={22} color={'black'} style={{ marginRight: 12 }} className='login-as-team-btn' />
                <FaPen
                    onClick={handleShowEdit}
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

interface EarningTaleProps {
    earningTable: EarningTable | undefined
}
const EarningTale = ({ earningTable }: EarningTaleProps) => {

    function sumNbCommande(earningTable: EarningTable | undefined) {
        if (!earningTable) return 0

        var sum = earningTable.upsell.nb_commande + earningTable.livre.nb_commande + earningTable.downsell.nb_commande + earningTable.crosssell.nb_commande
        return sum
    }

    function sumHerEarning(earningTable: EarningTable | undefined) {
        if (!earningTable) return 0

        var sum = earningTable.upsell.her_earning + earningTable.livre.her_earning + earningTable.downsell.her_earning + earningTable.crosssell.her_earning + earningTable.crosssell.salaire
        return sum
    }

    function sumSalaire(earningTable: EarningTable | undefined) {
        if (!earningTable) return 0

        var sum = earningTable.upsell.salaire + earningTable.livre.salaire + earningTable.downsell.salaire + earningTable.crosssell.salaire
        return sum
    }

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
                                    <td>{earningTable?.livre.nb_commande}</td>
                                    <td>{earningTable?.livre.her_earning}</td>
                                </tr>
                                <tr>
                                    <td>Upsell</td>
                                    <td>{earningTable?.upsell.nb_commande}</td>
                                    <td>{earningTable?.upsell.her_earning}</td>
                                </tr>
                                <tr>
                                    <td>Downsell</td>
                                    <td>{earningTable?.downsell.nb_commande}</td>
                                    <td>{earningTable?.downsell.her_earning}</td>
                                </tr>
                                <tr>
                                    <td>CrossSell</td>
                                    <td>{earningTable?.crosssell.nb_commande}</td>
                                    <td>{earningTable?.crosssell.her_earning}</td>
                                </tr>
                                <tr>
                                    <td>Salaire</td>
                                    <td>0</td>
                                    <td>{earningTable?.crosssell.salaire}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>{sumNbCommande(earningTable)}</td>
                                    <td>{sumHerEarning(earningTable)}</td>
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