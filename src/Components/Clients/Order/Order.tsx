import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import { Table } from '../../Table/Order'
import { ClientOrderApi, useGetClientOrderQuery, useGetSheetOrderQuery } from '../../../services/api/ClientApi/ClientOrderApi'
import { OrderQueryModel } from '../../../models'
import { useDispatch } from 'react-redux'
import { GetRole } from '../../../services/storageFunc'
import { CLIENT_URL } from '../../../services/url/API_URL'
import axios from 'axios'
import { number } from 'yup'

const token = localStorage.getItem('token')
export default function Order(): JSX.Element {

  const userData = localStorage.getItem('userData')

  const [id_orders, setIdOrders] = useState<number[]>([])
  const [_skip, _setSkip] = useState<number>(10);

  const { data: sheetData } = useGetSheetOrderQuery()

  const [status, setStatus] = useState<string | undefined>(undefined)
  const [date, setDate] = useState<string[]>([])
  const [product, setProduct] = useState<string>('')
  const [idTeam, setIdTeam] = useState<number>(GetRole() === 'TEAM' ? JSON.parse(userData || '{id: -1}').id : -1)
  const [usingDate, setUsingDate] = useState<boolean>(false)
  const [OrderQueryData, setOrderQueryData] = useState<OrderQueryModel>({ search: '', status: '', _skip: 0, _limit: _skip })

  const { data: OrderClient, refetch: RefetchOrderClient, isLoading } = useGetClientOrderQuery(OrderQueryData) // client data

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ClientOrderApi.util.resetApiState())
    RefetchOrderClient()
  }, [])

  let config = {
    headers: {
      'Authorization': 'Bear ' + token
    }
  }

  useEffect(() => {
    axios.get(`${CLIENT_URL}/getallid`, config).then((response) => {
      setIdOrders(response.data.data)
    })
      .catch()
  }, [])


  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], search: undefined, status: status, id_product_array: product ?? undefined, id_team: idTeam !== -1 ? idTeam : undefined, _skip: 0, _limit: _skip })
    RefetchOrderClient()
  }, [date, usingDate])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], status: status, id_product_array: product !== '0' ? product : undefined, id_team: idTeam !== -1 ? idTeam : undefined, _skip: 0, _limit: _skip })
    RefetchOrderClient()
  }, [product])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], status: status, id_team: idTeam !== -1 ? idTeam : undefined, id_product_array: product ?? undefined, _skip: 0, _limit: _skip })
    RefetchOrderClient()
  }, [idTeam])

  useEffect(() => {
    setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], status: status, id_team: idTeam !== -1 ? idTeam : undefined, id_product_array: product ?? undefined, _skip: 0, _limit: _skip })
    RefetchOrderClient()
  }, [_skip])

  return (
    <Main name={'Order'} urlVideo={'https://www.youtube.com/watch?v=t_d1cKerFUc'} showTeamFilter={true} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} showProductFilter={true} setDate={setDate} setUsingDate={setUsingDate} showDateFilter={true}>
      <div className="content-body">
        <div className="container-fluid">
          <Table
            _skip={_skip}
            _setSkip={_setSkip}
            orders_id={id_orders}
            setStatus={setStatus}
            data={OrderClient}
            refetch={RefetchOrderClient}
            setOrderQueryData={setOrderQueryData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Main>
  )
}
