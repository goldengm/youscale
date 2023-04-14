import React, { useEffect } from 'react'
import ModalWrapper from '../ModalWrapper'
import './modal.style.css'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function HistoryOrderModal({ showModal, setShowModal }: Props): JSX.Element {

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
    <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
      <FormBody />
    </ModalWrapper>
  )
}

const FormBody = () => {
  return (
    <div className="card-body">
      <div
        id="dlab_W_TimeLine"
        className="widget-timeline dlab-scroll height370 ps ps--active-y custum-time-line"
      >
        <ul className="timeline">
          <li>
            <div className="timeline-badge primary" />
            <a className="timeline-panel text-muted" href="#">
              <span>10 minutes ago</span>
              <h6 className="mb-0">
                Youtube, a video-sharing website, goes live{" "}
                <strong className="text-primary">$500</strong>.
              </h6>
            </a>
          </li>
          <li>
            <div className="timeline-badge info"></div>
            <a className="timeline-panel text-muted" href="#">
              <span>20 minutes ago</span>
              <h6 className="mb-0">
                New order placed <strong className="text-info">#XF-2356.</strong>
              </h6>
              <p className="mb-0">
                Quisque a consequat ante Sit amet magna at volutapt...
              </p>
            </a>
          </li>
          <li>
            <div className="timeline-badge danger"></div>
            <a className="timeline-panel text-muted" href="#">
              <span>30 minutes ago</span>
              <h6 className="mb-0">
                john just buy your product{" "}
                <strong className="text-warning">Sell $250</strong>
              </h6>
            </a>
          </li>
          <li>
            <div className="timeline-badge success"></div>
            <a className="timeline-panel text-muted" href="#">
              <span>15 minutes ago</span>
              <h6 className="mb-0">StumbleUpon is acquired by eBay. </h6>
            </a>
          </li>
          <li>
            <div className="timeline-badge warning"></div>
            <a className="timeline-panel text-muted" href="#">
              <span>20 minutes ago</span>
              <h6 className="mb-0">
                Mashable, a news website and blog, goes live.
              </h6>
            </a>
          </li>
          <li>
            <div className="timeline-badge dark"></div>
            <a className="timeline-panel text-muted" href="#">
              <span>20 minutes ago</span>
              <h6 className="mb-0">
                Mashable, a news website and blog, goes live.
              </h6>
            </a>
          </li>
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