import React, { useState, useEffect } from 'react'
import Dashbord from '../../Components/Clients/Dashbord/Dashbord'
import { DashbordQueryModel } from '../../models'
import { useGetClientDashbordQuery } from '../../services/api/ClientApi/ClientDashbordApi'
import { RotatingLines } from 'react-loader-spinner'

export default function DashbordPage(): JSX.Element {
  const [product, setProduct] = useState<string>('')
  const [date, setDate] = useState<string[]>([])
  const [idTeam, setIdTeam] = useState<number>(0)
  const [usingDate, setUsingDate] = useState<boolean>(false)
  const [OrderQueryData, setOrderQueryData] = useState<DashbordQueryModel>({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1] })
  const { data, isLoading, refetch } = useGetClientDashbordQuery(OrderQueryData)

  useEffect(() => { refetch() }, [])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1] })
    refetch()
  }, [date, usingDate])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_product_array: product })
    refetch()
  }, [product])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_team: idTeam !==0 ? idTeam : undefined })
    refetch()
  }, [idTeam])

  return !data ? <div className='global-loader'>
    <RotatingLines
      strokeColor="grey"
      strokeWidth="3"
      animationDuration="0.75"
      width="50"
      visible={true}
    />
  </div> : <Dashbord data={data?.data} showTeamFilter={true} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} setDate={setDate} setUsingDate={setUsingDate} showProductFilter={true} showDateFilter={true} />
}
