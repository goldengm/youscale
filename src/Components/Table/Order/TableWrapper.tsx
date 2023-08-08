import React from 'react'

function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + '...';
    } else {
        return str;
    }
}

interface Props {
    children: JSX.Element | JSX.Element[],
    column: string[],
    handleCheckAll: () => void
}
export default function TableWrapper({ children, column, handleCheckAll }: Props): JSX.Element {
    var scl = document.getElementsByClassName('table-responsive')[0]

    document.onkeydown = checkKey;

    function checkKey(e: any) {

        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
            scl.scrollLeft -= 200
        }
        else if (e.keyCode == '39') {
            scl.scrollLeft += 200
        }

    }

    return (
        <div className="card-body">
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
                            {column.map((col: string, key: number) => <th key={key}>{truncateString(col, 10)}</th>)}
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
