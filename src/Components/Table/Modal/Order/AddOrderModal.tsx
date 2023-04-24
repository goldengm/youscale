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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

type Inputs = {
  destinataire: string,
  telephone: string,
  prix: string,
  adresse: string,
  commentaire: string,
  ville: string,
  status: string,
  source: string,
  up_downsell: string,
  changer: string,
  ouvrir: string
};

const schema = yup.object().shape({
  destinataire: yup.string().required('Ce champ est obligatoire'),
  telephone: yup.string().required('Ce champ est obligatoire'),
  prix: yup.string().required('Ce champ est obligatoire'),
  adresse: yup.string().required('Ce champ est obligatoire'),
  commentaire: yup.string().required('Ce champ est obligatoire'),
  ville: yup.string().required('Ce champ est obligatoire'),
  status: yup.string().required('Ce champ est obligatoire'),
  source: yup.string().required('Ce champ est obligatoire'),
  up_downsell: yup.string().required('Ce champ est obligatoire'),
  changer: yup.string().required('Ce champ est obligatoire'),
  ouvrir: yup.string().required('Ce champ est obligatoire'),
}).required();

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

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

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

  const FilterStatusData = (data: StatusModel[] | undefined) => {
    if (!data) return []
    var newArr = data.filter((dt: StatusModel) => dt.checked === true)
    return newArr
  }

  const onSubmit = (values: Inputs) => {
    console.log(values)

    if (selectedProduct.length === 0) {
      alert('Please select at least one product')
      return
    }

    const data = {
      id_product_array: FormatAccessArray(selectedProduct)
    }

  }

  return (
    <div className="card-body">
      <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <CustumInput
              register={register}
              name={'destinataire'}
              error={errors.destinataire}
              type={'text'}
              label={"Destinataire"}
              placeholder={'Patrick Doe'}
            />

            <CustumInput
              register={register}
              name={'telephone'}
              error={errors.telephone}
              type={'text'}
              label={"Telephone"}
              placeholder={'778143610'}
            />

            <CustumInput
              register={register}
              name={'prix'}
              error={errors.prix}
              type={'text'}
              label={"Prix"}
              placeholder={'36540'}
            />

            <CustumInput
              register={register}
              name={'adresse'}
              error={errors.adresse}
              type={'text'}
              label={"Adresse"}
              placeholder={'Bl 4 st.Jean'}
            />

            <CustumTextArea
              register={register}
              name={'commentaire'}
              error={errors.commentaire}
              label={"Commentaire"}
            />
          </div>

          <div className="row">
            <CustumSelectForm
              register={register}
              error={errors.ville}
              label={"Ville"}
              name={'ville'}
            />

            <CustumSelectForm
              register={register}
              error={errors.status}
              label={"Status"}
              name={'status'}
            />

            <CustumSelectForm
              register={register}
              error={errors.source}
              label={"Source"}
              name={'source'}
            />

            <CustumSelectForm
              register={register}
              error={errors.up_downsell}
              label={"Up/Downsell"}
              name={'up_downsell'}
            />

            <CustumSelectForm
              register={register}
              error={errors.changer}
              label={"Changer"}
              name={'changer'}
            />

            <CustumSelectForm
              register={register}
              error={errors.ouvrir}
              label={"Ouvrir"}
              name={'ouvrir'}
            />

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