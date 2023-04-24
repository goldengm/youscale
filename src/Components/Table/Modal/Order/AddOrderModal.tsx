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

type SelectType = {
  label: string,
  value: string | number
}

const GetCityWhosNotFromSheet = (data: CityModel[] | undefined): SelectType[] => {
  if (!data) return []

  var newArr: SelectType[] = [{ label: 'none', value: 'none' }]

  for (let i = 0; i < data.length; i++) {
    if (data[i].isFromSheet === false) {
      newArr.push({
        value: data[i].id ?? 0,
        label: data[i].name
      })
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
  commentaire: yup.string().notRequired(),
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

  const [sourceData] = useState<SelectType[]>([
    { label: 'none', value: 'none' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'YouTube', value: 'YouTube' },
    { label: 'TikTok', value: 'TikTok' },
    { label: 'Snapchat', value: 'Snapchat' },
    { label: 'Google', value: 'Google' }
  ])

  const [upDownData] = useState<SelectType[]>([
    { label: 'none', value: 'none' },
    { label: 'UpSell', value: 'UpSell' },
    { label: 'DownSell', value: 'UpSell' },
    { label: 'CrossSell', value: 'UpSell' }
  ])

  const changerOuvrirData: SelectType[] = [
    { label: 'none', value: 'none' },
    { label: 'Oui', value: 'Oui' },
    { label: 'Non', value: 'Non' }
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

  const FilterStatusData = (data: StatusModel[] | undefined): SelectType[] => {
    if (!data) return []

    var newArr: SelectType[] = [{ label: 'none', value: 'none' }]

    data.filter((dt: StatusModel) => {
      if (dt.checked === true) newArr.push({ label: dt.name, value: dt.id ?? '' })
    })

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
              data={GetCityWhosNotFromSheet(CityData?.data)}
              register={register}
              error={errors.ville}
              label={"Ville"}
              name={'ville'}
            />

            <CustumSelectForm
              data={FilterStatusData(StatusData?.data)}
              register={register}
              error={errors.status}
              label={"Status"}
              name={'status'}
            />

            <CustumSelectForm
              data={sourceData}
              register={register}
              error={errors.source}
              label={"Source"}
              name={'source'}
            />

            <CustumSelectForm
              data={upDownData}
              register={register}
              error={errors.up_downsell}
              label={"Up/Downsell"}
              name={'up_downsell'}
            />

            <CustumSelectForm
              data={changerOuvrirData}
              register={register}
              error={errors.changer}
              label={"Changer"}
              name={'changer'}
            />

            <CustumSelectForm
              data={changerOuvrirData}
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