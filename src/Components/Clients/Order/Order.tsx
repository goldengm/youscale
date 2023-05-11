import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import { Table } from '../../Table/Order'
import { ClientOrderApi, useGetClientOrderQuery } from '../../../services/api/ClientApi/ClientOrderApi'
import { OrderQueryModel } from '../../../models'
import { useDispatch } from 'react-redux'
import { GetRole } from '../../../services/storageFunc'

export default function Order(): JSX.Element {

  const userData = localStorage.getItem('userData')

  const [date, setDate] = useState<string[]>([])
  const [product, setProduct] = useState<string>('')
  const [idTeam, setIdTeam] = useState<number>(GetRole() === 'TEAM' ? JSON.parse(userData || '{id: 0}').id : 0)
  const [usingDate, setUsingDate] = useState<boolean>(false)
  const [OrderQueryData, setOrderQueryData] = useState<OrderQueryModel>({ search: '', status: '', _skip: 0, _limit: 50 })

  const { data: OrderClient, refetch: RefetchOrderClient } = useGetClientOrderQuery(OrderQueryData) // client data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ClientOrderApi.util.resetApiState())
    RefetchOrderClient()
  }, [])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], search: undefined, status: undefined, id_product_array: product ?? undefined, id_team: idTeam !== 0 ? idTeam : undefined, _skip: 0, _limit: 50 })
    RefetchOrderClient()
  }, [date, usingDate])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_product_array: product !== '0' ? product : undefined, id_team: idTeam !== 0 ? idTeam : undefined, _skip: 0, _limit: 50 })
    RefetchOrderClient()
  }, [product])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_team: idTeam !== 0 ? idTeam : undefined, id_product_array: product ?? undefined, _skip: 0, _limit: 50 })
    RefetchOrderClient()
  }, [idTeam])

  return (
    <Main name={'Order'} showTeamFilter={true} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} showProductFilter={true} setDate={setDate} setUsingDate={setUsingDate} showDateFilter={true}>
      <div className="content-body">
        <div className="container-fluid">
          <Table data={OrderClient} refetch={RefetchOrderClient} setOrderQueryData={setOrderQueryData} />
        </div>
      </div>
    </Main>
  )
}
