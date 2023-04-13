import React from 'react'

interface ModalWrapperProps {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    children: JSX.Element | JSX.Element[],
    id: string
}
export default function ModalWrapper({showModal, setShowModal, children, id}:ModalWrapperProps) : JSX.Element {
    return (
        <div className={showModal ? "modal fade show" : "modal fade"} id={id}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Order</h5>
                        <button
                            onClick={() => setShowModal(false)}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => setShowModal(false)}
                            type="button"
                            className="btn btn-danger light"
                            data-bs-dismiss="modal"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
