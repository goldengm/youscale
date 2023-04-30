import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { CustumInput } from '../../../Forms';
import { GetClientOrderModel } from '../../../../models';
import { usePatchClientOrderMutation } from '../../../../services/api/ClientApi/ClientOrderApi';
import { showToastError } from '../../../../services/toast/showToastError';

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  id_order: string,
  refetch: () => void
}
export default function ReportOrderModal({ showModal, setShowModal, refetch, id_order }: Props): JSX.Element {

  const [patchOrder] = usePatchClientOrderMutation()
  const [date, setDate] = useState<string>(String(new Date()))

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    e.preventDefault()

    const data = {
      id: Number(id_order),
      reportedDate: date
    }

    patchOrder(data).unwrap()
      .then(res => {
        refetch()
        handleCloseModal()
      })
      .catch(err => showToastError(err.data.message))
  }

  return (
    <ModalWrapper title={'Report'} showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
      <FormBody
        date={date}
        setDate={setDate}
        onClick={handleSubmit}
      />
    </ModalWrapper>
  )
}

interface FormBodyProps {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}
const FormBody = ({ date, setDate, onClick }: FormBodyProps) => {

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const { value } = e.target

    setDate(value)
  }

  return (
    <div className="card-body">
      <div className="basic-form">
        <form>
          <div className="row">
            <CustumInput
              name={'date'}
              register={()=> console.log("nothing")}
              error={undefined}
              defaultValue={date}
              onChange={handleChangeDate}
              type={'date'}
              label={"Date de report"}
              placeholder={'Date de report'}
            />
          </div>

          <button
            onClick={onClick}
            type="submit"
            className="btn btn-primary"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  )
}