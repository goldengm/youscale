import style from './table.module.css'

function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + '...';
    } else {
        return str;
    }
}

interface Props {
    column: string[]
    handleCheckAll: () => void
    children: JSX.Element | JSX.Element[]
}
export default function TableContainer({ column, handleCheckAll, children }: Props) {
    return (
        <div className={style.tableContainer}>
            <table className={style.table}>
                <Column column={column} handleCheckAll={handleCheckAll} />
                {children}
            </table>
        </div>
    )
}

interface ColumnProps {
    column: string[]
    handleCheckAll: () => void
}
const Column = ({ column, handleCheckAll }: ColumnProps): JSX.Element => {
    return (
        <tr>
            <th>
                <input
                    type="checkbox"
                    className={style.checkAll}
                    onChange={handleCheckAll}
                />
            </th>
            {column.map((col: string, key: number) => <th key={key}>{truncateString(col, 15)}</th>)}
        </tr>
    )
}