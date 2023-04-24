import React, { useEffect, useState } from 'react'
import { CustumInput, CustumTextArea, CustumSelectForm } from '../../../Forms'
import { ProductOrderCard } from './Card'
import ModalWrapper from '../ModalWrapper'
import { CityModel, StatusModel } from '../../../../models'
import { useAddClientOrderMutation } from '../../../../services/api/ClientApi/ClientOrderApi'
import { useGetCityQuery } from '../../../../services/api/ClientApi/ClientCityApi'
import { useGetProductQuery } from '../../../../services/api/ClientApi/ClientProductApi'
import { useGetStatusQuery } from '../../../../services/api/ClientApi/ClientStatusApi'
import { MultiSelectElement } from '../../../Input'

const GetCityWhosNotFromSheet = (data: CityModel[] | undefined): CityModel[] => {
  if (!data) return []

  var newArr: CityModel[] = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].isFromSheet === false) {
      newArr.push(data[i])
    }
  }

  return newArr
}

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => any
}
export default function AddOrderModal({ showModal, setShowModal }: Props): JSX.Element {

  useEffect(() => {
    var body = document.querySelector<HTMLBodyElement>('body');

    var modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop fade show';

    if (body) {
      body.classList.add('modal-open');
      body.style.overflow = 'hidden';
      body.style.paddingRight = '17px';

      body.appendChild(modalBackdrop);
    }
  }, [])

  return (
    <ModalWrapper showModal={showModal} title={'Add order'} setShowModal={setShowModal} id='AddOrderModal'>
      <FormBody />
    </ModalWrapper>
  )
}

const FormBody = () => {
  const [addOrder] = useAddClientOrderMutation()

  const [selectedProduct, setSelectedProduct] = useState<{ label: string, value: number | undefined, quantity: number, variant: string[], allVariant: string[] | undefined }[]>([]);

  const { data: CityData, isSuccess: CitySuccess } = useGetCityQuery()
  const { data: ProductData, isSuccess: ProductSuccess } = useGetProductQuery()
  const { data: StatusData, isSuccess: StatusSuccess, refetch: RefetchStatus } = useGetStatusQuery()

  useEffect(() => {
    RefetchStatus()
  }, [])

  const [sourceData] = useState<{ name: string }[]>([
    { name: 'Facebook' },
    { name: 'WhatsApp' },
    { name: 'YouTube' },
    { name: 'TikTok' },
    { name: 'Snapchat' },
    { name: 'Google' }
  ])

  const [upDownData] = useState<{ name: string }[]>([
    { name: 'UpSell' },
    { name: 'DownSell' },
    { name: 'CrossSell' }
  ])

  const changerOuvrirData = [
    { name: 'Oui' },
    { name: 'Non' }
  ]

  const FormatDataOption = (data: any) => {
    var objArr: { label: string, value: string, allVariant: [], variant: [] }[] = []

    for (let i = 0; i < data.length; i++) {
      objArr.push({ label: data[i].name, value: data[i].id, allVariant: data[i].variant, variant: [] })
    }

    return objArr
  }

  const FormatAccessArray = (data: any) => {
    var objArr: { id: number, quantity: number, variant: [] }[] = []


    for (let i = 0; i < data.length; i++) {
      objArr.push({ id: data[i].value, quantity: data[i].quantity, variant: data[i].variant })
    }

    return objArr
  }

  const onSubmit = () => {
    if (selectedProduct.length === 0) {
      alert('Please select at least one product')
      return
    }

    const data = {
      id_product_array: FormatAccessArray(selectedProduct)
    }

  }

  const FilterStatusData = (data: StatusModel[] | undefined) => {
    if (!data) return []
    var newArr = data.filter((dt: StatusModel) => dt.checked === true)
    return newArr
  }

  return (
    <div className="card-body">
      <div className="basic-form">
        <form>
          <div className="row">
            <CustumInput type={'text'} label={"Destinataire"} placeholder={'Patrick Doe'} />
            <CustumInput type={'text'} label={"Telephone"} placeholder={'778143610'} />
            <CustumInput type={'text'} label={"Prix"} placeholder={'36540'} />
            <CustumInput type={'text'} label={"Adresse"} placeholder={'Bl 4 st.Jean'} />
            <CustumTextArea label={"Commentaire"} />
          </div>

          <div className="row">
            <CustumSelectForm label={"Ville"} name={'city'} />
            <CustumSelectForm label={"Status"} name={'status'} />
            <CustumSelectForm label={"Source"} name={'source'} />
            <CustumSelectForm label={"Up/Downsell"} name={'updownsell'} />
            <CustumSelectForm label={"Changer"} name={'changer'} />
            <CustumSelectForm label={"Ouvrir"} name={'ouvrir'} />
          </div>

          <div className="row">
            {ProductSuccess ? <MultiSelectElement options={FormatDataOption(ProductData?.data)} selected={selectedProduct} onChange={setSelectedProduct} /> : <></>}

            {selectedProduct.map((dt, index) =>
              <ProductOrderCard
                key={index}
                dt={dt}
                index={index}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                title={dt.label}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  )
}