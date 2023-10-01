import React, { useEffect, useState } from 'react'
import styles from './setting.module.css'

interface Props {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    driverObj: {
        moveNext: () => void
    }
}
export default function IntegrateWhatsappModal({ setIsVisible, driverObj }: Props): JSX.Element {

    const handleClose = () => {
        setIsVisible(false);
        driverObj.moveNext()
    };

    const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent_Whatsapp}>
                <button className={styles.closeButton} onClick={handleClose}>
                    &times;
                </button>
                <div className={styles.main_Whatsapp}>
                    <p className={styles.title}>Intégration de Whatsapp</p>

                    <div className={styles.whtContent}>
                        <Field
                            label={'Commande ID prefix'}
                            placeholder={'#1020'}
                        />

                        <TextArea
                            label={'Message automatisé'}
                            placeholder={'msg'}
                        />
                    </div>

                    <div className={styles.bottomBtn}>
                        <button onClick={handleSaveChanges} className={styles.saveBtn}>
                            Enregistrer
                        </button>

                        <button className={styles.closeBtn}>
                            Fermer
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

interface FieldProps {
    label: string
    placeholder: string
    value?: string
}
const Field = ({ label, placeholder, value }: FieldProps): JSX.Element => {
    return (
        <div className={styles.whtField}>
            <p>
                {label}
                <img src="/svg/setting/info.svg" alt="info" />
            </p>

            <input
                type="text"
                placeholder={placeholder}
                value={value}
            />
        </div>
    )
}

interface FieldProps {
    label: string
    placeholder: string
    value?: string
}
const TextArea = ({ label, placeholder, value }: FieldProps): JSX.Element => {
    return (
        <div className={styles.whtField}>
            <p>
                {label}
                <img src="/svg/setting/info.svg" alt="info" />
            </p>

            <textarea placeholder={placeholder} value={value} cols={30} rows={10}>
            </textarea>
        </div>
    )
}