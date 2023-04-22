import React, { useState } from 'react'
import Dashbord from '../../Components/Clients/Dashbord/Dashbord'
import { DashbordQueryModel } from '../../models'
import { useGetClientDashbordQuery } from '../../services/api/ClientApi/ClientDashbordApi'

export default function DashbordPage(): JSX.Element {
  const [product, setProduct] = useState<string>('')
  const [date, setDate] = useState<string[]>([])
  const [idTeam, setIdTeam] = useState<number>(0)
  const [usingDate, setUsingDate] = useState<boolean>(false)
  const [OrderQueryData, setOrderQueryData] = useState<DashbordQueryModel>({usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1]})
  const {data, isLoading, refetch} = useGetClientDashbordQuery(OrderQueryData)

  return <Dashbord showTeamFilter={true} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} setDate={setDate} setUsingDate={setUsingDate} showProductFilter={true} showDateFilter={true} />
}
