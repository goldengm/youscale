import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import { FaPen } from 'react-icons/fa'
import { RiLoginCircleFill } from 'react-icons/ri'
import { CustomHist } from '../../Chart'
import { AddTeamModal, EditTeamModal } from '../../Table/Modal/Team'
import { Cient, EarningTable, GetTeamMemberModel, Performance, TeamDashbordQueryModel } from '../../../models'
import { useGetTeamMemberQuery, usePatchTeamMemberMutation } from '../../../services/api/ClientApi/ClientTeamMemberApi'
import { useGetTeamDashbordQuery } from '../../../services/api/ClientApi/ClientTeamDashbordApi'
import { GetRole, SetRole } from '../../../services/storageFunc'
import { useLoginAsTeamMutation, usePatchClientMutation } from '../../../services/api/ClientApi/ClientApi'
import { setToken } from '../../../services/auth/setToken'
import { setUserData } from '../../../services/auth/setUserData'
import { showToastError } from '../../../services/toast/showToastError'
import { driver } from "driver.js";
import PerformanceCard from './PerformanceCard'
import EarningCard from './EarningCard'
import { showToastSucces } from '../../../services/toast/showToastSucces'
import { Spinner4Bar } from '../../Loader'
import './team.style.css'
import "driver.js/dist/driver.css";
import { BottomRightStaticBtn } from '../../Tutorial'

interface Props {
    client: Cient | undefined
}
const pageName = 'team'
export default function Team({ client }: Props): JSX.Element {
    const userData = localStorage.getItem('userData')
    const [patchClient] = usePatchClientMutation()

    const [showVideo, setShowVideo] = useState<boolean>(false)
    const [showHidden, setShowHidden] = useState<boolean>(true)
    const [showTutorial, setShowTutorial] = useState<boolean>(false);
    const { data, refetch, isLoading, isFetching } = useGetTeamMemberQuery({ isHidden: showHidden })
    const [date, setDate] = useState<string[]>([])
    const [idTeam, setIdTeam] = useState<number>(GetRole() === 'TEAM' ? JSON.parse(userData || '{id: 0}').id : 0)
    const [usingDate, setUsingDate] = useState<boolean>(false)
    const [OrderQueryData, setOrderQueryData] = useState<TeamDashbordQueryModel>({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1] })
    const { data: teamData, refetch: refetchTeamData } = useGetTeamDashbordQuery(OrderQueryData)
    const [performance, setPerformance] = useState<Performance | undefined>(teamData?.data.performance)

    useEffect(() => {
        refetch()
    }, [showHidden])

    const driverObj = driver({
        onNextClick: () => {
            if (driverObj.getActiveIndex() === 2) {
                const response = confirm("En terminant vous confirmer ne plus recevoir le tutoriel sur les autres pages ?")
                if (response) {
                    patchClient({ isBeginner: false }).unwrap()
                        .then(res => console.log(res))
                        .catch(err => console.warn(err))
                    driverObj.destroy();
                }
            } else {
                driverObj.moveNext()
            }
        },
        nextBtnText: 'Suivant',
        prevBtnText: 'Retour',
        doneBtnText: 'Terminer le tutoriel',
        showProgress: true,
        allowClose: false,
        steps: [
            {
                element: '.add-team', popover: {
                    title: 'Add your team', description: 'Add your team here', side: "right", align: 'start',
                    onNextClick: (drvHks) => {
                        driverObj.moveTo(3)
                    }
                }
            },
            {
                element: '.modal-content', popover: {
                    title: 'Add your team', description: 'Add your team here', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        driverObj.moveTo(2)
                    }, onPrevClick: (drvHks) => {
                        alert('Close your modal before')
                    },
                }
            },
            {
                element: '.fermer-btn', popover: {
                    title: 'Close modal', description: 'close', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        alert('Close your modal before')
                    }, onPrevClick: (drvHks) => {
                        alert('Close your modal before')
                    },
                }
            },
            {
                element: '.menu-step:nth-child(4)', popover: {
                    title: 'Product', description: 'Description for your product page', side: "right", align: 'start', onPrevClick: (drvHks) => {
                        driverObj.moveTo(0)
                    },
                }
            }
        ]
    });

    useEffect(() => {
        setPerformance(teamData?.data.performance)
    }, [])

    useEffect(() => {
        client?.isBeginner && driverObj.drive();
    }, [client]);

    const closeTutorial = () => {
        localStorage.setItem(`tutorial_${pageName}`, JSON.stringify(true));
        setShowTutorial(false);
    };

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
        <Main
            name={'Team'}
            urlVideo={'https://www.youtube.com/watch?v=Y2eNJGFfhVY'}
            showTeamFilter={GetRole() === 'TEAM' ? false : true}
            setIdTeam={setIdTeam}
            showDateFilter={true}
            usingDate={usingDate}
            setDate={setDate}
            setUsingDate={setUsingDate}
            closeTutorial={closeTutorial}
            showVideo={showVideo}
            setShowVideo={setShowVideo}
        >
            {showAddTeamModal && <AddTeamModal refetch={refetch} showModal={showAddTeamModal} setShowModal={setShowAddTeamModal} driverObj={driverObj} />}
            {showEditTeamModal && <EditTeamModal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal} dataEdit={item} refetch={refetch} />}
            <div className="content-body">
                <div className="container-fluid">
                    <div className="team-header">
                        <TeamCard data={data?.data} setItem={setItem} setShowAddTeamModal={setShowAddTeamModal} setShowHidden={setShowHidden} isLoading={isFetching} setShowEditTeamModal={setShowEditTeamModal} refetch={refetch} driverObj={driverObj} />
                        {
                            teamData?.data.performance &&
                            <PerformanceCard setPerformance={setPerformance} perf={teamData?.data.performance} perf_rate={teamData?.data.performance_rate}>
                                <CustomHist data={performance ?? teamData?.data.performance} options={option} />
                            </PerformanceCard>
                        }
                    </div>
                    <div className="row">
                        <EarningTale earningTable={teamData?.data.earning_table} />
                        <EarningCard>
                            {teamData && <CustomHist data={teamData.data.earning} options={option} />}
                        </EarningCard>
                    </div>
                </div>
            </div>
            <BottomRightStaticBtn setShowVideo={setShowVideo} />
        </Main>
    )
}

interface PropsTeamCard {
    setShowAddTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditTeamModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: GetTeamMemberModel[] | undefined;
    setItem: React.Dispatch<React.SetStateAction<GetTeamMemberModel | undefined>>
    setShowHidden: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    refetch: () => any
    driverObj: {
        moveNext: () => void
    }
}
const TeamCard = ({ setShowAddTeamModal, setShowEditTeamModal, data, refetch, setItem, driverObj, setShowHidden, isLoading }: PropsTeamCard): JSX.Element => {

    const handleShowTeamModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        setShowAddTeamModal(true)
        setTimeout(() => {
            driverObj.moveNext()
        }, 1000);
    }

    return (
        <div className="col-xl-3 col-xxl-5 col-xl-custum">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Team</h4>
                    </div>
                    {
                        <div className="card-tabs mt-3 mt-sm-0">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a
                                        onClick={() => setShowHidden(true)}
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#Order"
                                        role="tab"
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => setShowHidden(false)} className="nav-link" data-bs-toggle="tab" href="#Rate" role="tab">
                                        Hidden
                                    </a>
                                </li>
                            </ul>
                        </div>
                    }
                    <a
                        onClick={handleShowTeamModal}
                        type="button"
                        className="btn btn-primary mb-2 add-team">
                        Add team
                    </a>
                </div>
                <div className="card-body display-scrll">
                    {
                        isLoading ? <Spinner4Bar /> : data && data.map((dt, index) => <TeamRow key={index} refetch={refetch} item={dt} setShowEditTeamModal={setShowEditTeamModal} setItem={setItem} />)
                    }
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
                showToastSucces(item?.active ? 'Your team has ben hidden' : 'Your team has ben showed')
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
        <div className="col-lg-6">
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-responsive-sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nombre de commande</th>
                                    <th>Profit</th>
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