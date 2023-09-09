import React, { ElementRef, useRef } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi'
import { useGetStatusQuery } from '../../../../services/api/ClientApi/ClientStatusApi'
import styles from './styles.module.css'

function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    } else {
        // Find the index of the first space character after the maxLength
        const truncated: string = str.substr(0, maxLength);
        const lastSpaceIndex: number = truncated.lastIndexOf(' ');

        // If there's a space, truncate at that space; otherwise, just truncate at maxLength
        if (lastSpaceIndex !== -1) {
            return truncated.substr(0, lastSpaceIndex) + '...';
        } else {
            return truncated + '...';
        }
    }
}

export default function DisplayStatusBottom() {
    const { data: dataStatus } = useGetStatusQuery()
    const displayElemRef = useRef<ElementRef<"div">>(null)

    return (
        <div className={styles.displayStatusBottomContainer}>
            <div ref={displayElemRef} className={styles.displayStatusBottom}>
                {
                    dataStatus?.data.map(dt => <ItemsStatus name={dt.name} borderColor={dt.color || 'transparent'} />)
                }
            </div>
            <SwithButton displayElemRef={displayElemRef} />
        </div>
    )
}

interface ItemsStatusProps {
    name: string
    borderColor: string
}
const ItemsStatus = ({ name, borderColor }: ItemsStatusProps): JSX.Element => {
    return (
        <div style={{ borderBottom: `1px solid ${borderColor}` }} className={styles.ItemsStatus}>
            <p>{truncateString(name, 10)}</p>
            <FaCaretDown className={styles.ItemsStatusIcon} size={13} />
        </div>
    )
}

interface SwithProps {
    displayElemRef: React.RefObject<HTMLDivElement>
}
const SwithButton = ({ displayElemRef }: SwithProps): JSX.Element => {

    const onLeft = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()

        if (displayElemRef.current) {
            displayElemRef.current.scrollLeft -= 80
        }
    }

    const onRight = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()

        if (displayElemRef.current) {
            displayElemRef.current.scrollLeft += 80
        }
    }

    return (
        <div className={styles.SwithButton}>
            <HiOutlineArrowSmLeft onClick={onLeft} className={styles.SwithButtonArrow} />
            <HiOutlineArrowSmRight onClick={onRight} className={styles.SwithButtonArrow} />
        </div>
    )
}