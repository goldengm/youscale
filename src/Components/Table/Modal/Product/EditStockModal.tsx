import React, { useEffect } from 'react'
import { CustumInput, CustumSelectForm } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'
import { CityModel, GetProductModel, GetStockModel } from '../../../../models'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { usePatchStockMutation } from '../../../../services/api/ClientApi/ClientStockApi';
import { useGetCityQuery } from '../../../../services/api/ClientApi/ClientCityApi';
import { useGetProductQuery } from '../../../../services/api/ClientApi/ClientProductApi';

type Inputs = {
  quantity: string,
  id_city: string,
  id_product: string
};

type SelectType = {
  label: string,
  value: string | number
}

const schema = yup.object().shape({
  quantity: yup.string().notRequired(),
  id_city: yup.string().notRequired(),
  id_product: yup.string().notRequired(),
}).required();

const GetCityWhosNotFromSheet = (data: CityModel[] | undefined): SelectType[] => {
  if (!data) return []

  var newArr: SelectType[] = []

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

const FormatProductSelect = (data: GetProductModel[] | undefined): SelectType[] => {
  if (!data) return []

  var newArr: SelectType[] = [{ label: 'none', value: 'none' }]

  for (let i = 0; i < data.length; i++) {
    newArr.push({
      value: data[i].id ?? 0,
      label: data[i].name
    })
  }

  return newArr
}

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  refetch: () => any,
  item: GetStockModel | undefined
}
export default function EditStockModal({ showModal, setShowModal, refetch, item }: Props): JSX.Element {

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

  const handleCloseModal = () => {
    var body = document.querySelector<HTMLBodyElement>('body');

    if (body) {
      body.classList.remove('modal-open');
      body.style.overflow = '';
      body.style.paddingRight = '';

      var existingBackdrop = document.querySelectorAll('.modal-backdrop.fade.show');

      if (existingBackdrop) existingBackdrop.forEach(it => it.remove());

      setShowModal(false)
    }
  }

  return (
    <ModalWrapper title={'Edit stock'} showModal={showModal} setShowModal={setShowModal} id='AddOrderModal'>
      <FormBody handleCloseModal={handleCloseModal} refetch={refetch} item={item} />
    </ModalWrapper>
  )
}

interface FormBodyProps {
  item: GetStockModel | undefined,
  refetch: () => any,
  handleCloseModal: () => void
}
const FormBody = ({ item, handleCloseModal, refetch }: FormBodyProps) => {

  const [patchStock] = usePatchStockMutation()

  const { data: cityData } = useGetCityQuery()
  const { data: productData } = useGetProductQuery()

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Inputs) => {
    console.log(item?.id_city)

    const data = {
      id: item ? item.id : 0,
      id_city: values.id_city !== '' ? values.id_city : String(item?.id_city), 
      id_product: values.id_product ?? item?.id_product,
      quantity : values.quantity ?? item?.quantity,
    }

    patchStock(data).unwrap()
      .then(res => {
        refetch()
        handleCloseModal()
      })
      .catch(err => alert(err.data.message))
  }

  return (
    <div className="card-body">
      <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <CustumInput
              defaultValue={item?.quantity}
              register={register}
              name={'quantity'}
              error={errors.quantity}
              type={'text'}
              label={"quantity"}
              placeholder={'12'}
            />
          </div>

          <div className="row">
            <CustumSelectForm
              defaultSelected={item?.id_city}
              data={GetCityWhosNotFromSheet(cityData?.data)}
              register={register}
              error={errors.id_city}
              label={"Ville"}
              name={'id_city'}
            />

            <CustumSelectForm
              defaultSelected={item?.id_product}
              data={FormatProductSelect(productData?.data)}
              register={register}
              error={errors.id_product}
              label={"Produit"}
              name={'id_product'}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
        </form>
      </div>
    </div>
  )
}