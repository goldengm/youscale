import React, { useEffect } from 'react'
import ModalWrapper from '../ModalWrapper'
import './modal.style.css'
import { useGetOrderHistoryQuery } from '../../../../services/api/ClientApi/ClientOrderApi'

type HistoryType = {
  message: string;
  createdAt: string;
}[];

interface Props {
  id_order: string,
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function HistoryOrderModal({ showModal, setShowModal, id_order }: Props): JSX.Element {

  const { data } = useGetOrderHistoryQuery({id_order})

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
    <ModalWrapper title={'History'} showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
      <FormBody data={data?.data} />
    </ModalWrapper>
  )
}

interface FormBodyProps{
    data: HistoryType | undefined
}
const FormBody = ({ data }:FormBodyProps) => {
  return (
    <div className="card-body">
      <div
        id="dlab_W_TimeLine"
        className="widget-timeline dlab-scroll height370 ps ps--active-y custum-time-line"
      >
        <ul className="timeline">
          {data && data.map(dt => <Event description={dt.message} date={dt.createdAt} />)}
        </ul>
        <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
          <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
        </div>
        <div className="ps__rail-y" style={{ top: 0, height: 370, right: 0 }}>
          <div
            className="ps__thumb-y"
            tabIndex={0}
            style={{ top: 0, height: 248 }}
          />
        </div>
      </div>
    </div>
  )
}

interface EventProps {
  description: string,
  date: string
}
const Event = ({description, date}: EventProps): JSX.Element => {
  return (
    <li>
      <div className="timeline-badge primary" />
      <a className="timeline-panel text-muted" href="#">
        <span>{date}</span>
        <h6 className="mb-0">
          {description}
        </h6>
      </a>
    </li>
  )
}