import React from 'react'
import { ImNext, ImBackward } from 'react-icons/im'

interface Props {
    children: JSX.Element | JSX.Element[],
    column: string[],
    handleCheckAll: () => void
}
export default function TableWrapper({ children, column, handleCheckAll }: Props): JSX.Element {
    var scl = document.getElementsByClassName('table-responsive')[0]

    const scollNext = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        scl.scrollLeft += 200
    }

    const scollBack = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        scl.scrollLeft -= 200
    }
    
    return (
        <div className="card-body">
             <div className="scrollbar-top">
                <ImNext size={30} color={'black'} className='next-scroll-order' onClick={scollNext} />
                <ImBackward size={30} color={'black'} className='back-scroll-order' onClick={scollBack} />
            </div>
            <div className="table-responsive responsive-cus">
           
                <table id="example3" className="table table-responsive-sm display table-custum">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="check_all"
                                    onChange={handleCheckAll}
                                />
                            </th>
                            {column.map((col: string, key: number) => <th key={key}>{col}</th>)}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
