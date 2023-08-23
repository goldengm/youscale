import React, { useState } from 'react'
import SupportRow from './SupportRow'
import TableWrapper from './TableWrapper'
import { Support } from '../../../models'
import { MessageSupportModal } from '../Modal/Support'
import { useGetSupportQuery } from '../../../services/api/ClientApi/ClientSupportApi'

export default function SupportTable(): JSX.Element {

    const [showCreateSupportModal, setShowCreateSupportModal] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [item, setItem] = useState<Support>()

    const { data, isSuccess, refetch } = useGetSupportQuery()
    
    return (
        <TableWrapper
            item={item}
            title='Support'
            column={['subject', 'description', 'status']}
            refetch={refetch}
            AddBtn={<CreateIssueBtn setShowModal={setShowCreateSupportModal} />}
            showAddSupportModal={showCreateSupportModal}
            setShowCreateSupportModal={setShowCreateSupportModal}
        >
            { showMessage && <MessageSupportModal item={item} showModal={showMessage} setShowModal={setShowMessage} />}
            {isSuccess && data.data.map((dt, key) => <SupportRow data={dt} key={key} setItem={setItem} setShowMessage={setShowMessage} />)}
        </TableWrapper>
    )
}


interface AddProductBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateIssueBtn = ({ setShowModal }: AddProductBtnProps): JSX.Element => {
    return (
        <a
            onClick={() => setShowModal(true)}
            type="button"
            className="btn btn-primary mb-2 add-product"
        >Create Issues
        </a>
    )
}