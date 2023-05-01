import React, { useEffect, useState } from 'react'
import { ProductOrderCard } from './Card'
import ModalWrapper from '../ModalWrapper'
import { MultiSelectElement, SendButton } from '../../../Input'
import { GetProductModel, ProductOrder } from '../../../../models'
import { usePatchClientOrderMutation } from '../../../../services/api/ClientApi/ClientOrderApi'
import { useGetProductQuery } from '../../../../services/api/ClientApi/ClientProductApi'
import { showToastError } from '../../../../services/toast/showToastError'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  id: number,
  refetch: () => any,
  editData?: ProductOrder[] | undefined
}
export default function AddProductOrderModal({ id, showModal, setShowModal, refetch, editData }: Props): JSX.Element {

  const [patchOrder] = usePatchClientOrderMutation()
  const { data: ProductData, isSuccess } = useGetProductQuery()

  const FormatDataOption = (data: GetProductModel[]) => {
    var objArr: { label: string, value: string, allVariant: string[], variant: [] }[] = []

    for (let i = 0; i < data.length; i++) {
      if(!data[i].isDeleted)
        objArr.push({ label: data[i].name, value: String(data[i].id), allVariant: data[i].variant, variant: [] })
    }

    return objArr
  }

  const FormatAccessArray = (data: any) => {
    var objArr: { id: number, quantity: number, variant: [] }[] = []


    for (let i = 0; i < data.length; i++) {
      objArr.push({ id: data[i].value, quantity: data[i].quantity || 1, variant: data[i].variant })
    }

    return objArr
  }

  const [selectedProduct, setSelectedProduct] = useState((editData) ? editData?.map((dt) => {
    return { label: dt.Product.name, value: dt.Product.id, quantity: dt.quantity, variant: dt.variant, allVariant: dt.Product.variant }
  }) : []);

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

  const onSubmit = () => {
    if (selectedProduct.length === 0) {
      showToastError('Please select at least one product')
      return
    }

    const data = {
      id_product_array: FormatAccessArray(selectedProduct)
    }

    patchOrder({ ...data, id }).unwrap()
      .then(res => {
        refetch()
        handleCloseModal()
      })
      .catch(err => showToastError(err.data.message))
  }

  return (
    <ModalWrapper showModal={showModal} title={'Add product to order'} setShowModal={setShowModal} id='addProductToOrder'>
      {isSuccess ? <MultiSelectElement options={FormatDataOption(ProductData?.data)} selected={selectedProduct} onChange={setSelectedProduct} /> : <></>}

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

      <SendButton value='Valider' onClick={onSubmit} />
    </ModalWrapper>
  )
}
