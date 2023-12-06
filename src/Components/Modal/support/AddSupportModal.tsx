import React, { useState, useEffect, useRef } from 'react';
import { ErrorModel } from '../../../models';
import { showToastError } from '../../../services/toast/showToastError';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner4Bar } from '../../Loader';
import styles from './support.module.css';
import * as yup from "yup";
import { useCreateSupportMutation } from '../../../services/api/ClientApi/ClientSupportApi';
import CustumInput from './CustumInput';
import CustumTextArea from './CustumTextArea';

type Inputs = {
    subject: string,
    description: string
    attachment: string
};

const schema = yup.object().shape({
    subject: yup.string().required('Ce champ est obligatoire'),
    description: yup.string().required('Ce champ est obligatoire'),
    attachment: yup.string().notRequired()
}).required();

interface Props {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => any
}
const AddSupportModal: React.FC<Props> = ({ setIsVisible, refetch }): JSX.Element | null => {

    const handleClose = () => {
        setIsVisible(false)
    };

    const useOutsideClick = (callback: () => void) => {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [callback]);

        return ref;
    };

    const ref = useOutsideClick(() => {
        console.log('Clicked outside of MyComponent');
        handleClose();
    });

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleClose}>
                    &times;
                </button>
                <div className={styles.main} ref={ref}>
                    <p className={styles.title}>Créer un ticket</p>

                    <FormBody refetch={refetch} handleClose={handleClose} />
                </div>
            </div>
        </div>
    );
}

interface FormBodyProps {
    refetch: () => any
    handleClose: () => void
}

const FormBody = ({ refetch, handleClose }: FormBodyProps) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
        // @ts-ignore
        resolver: yupResolver(schema),
    });

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const getBase64 = (file: any) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
    })

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
        getBase64(e.target.files[0]).then((data: any) => {
            setValue('attachment', data)
        })
    }

    const [createIssue, { isLoading }] = useCreateSupportMutation()

    const onSubmit = (values: Inputs) => {
        const data = {
            ...values
        }

        createIssue(data).unwrap()
            .then(res => {
                console.log(res)
                refetch()
                handleClose()
            })
            .catch((err: { data: ErrorModel, status: number }) => showToastError(err.data.errors[0].msg))
    }
    return (
        <div className="card-body">
            <div className="basic-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <CustumInput
                            register={register}
                            name={'subject'}
                            error={errors.subject}
                            label={"Objet"}
                            placeholder={'Lorem pissu'}
                        />

                        <CustumTextArea
                            register={register}
                            name={'description'}
                            error={errors.description}
                            label={"Description"}
                            placeholder={'your description'}
                        />
                    </div>

                    <div className={styles.sectionTitle}>Capture d’écran</div>
                    <div className="row">
                        {selectedFile && <img src={preview} className={styles.previewImg} />}
                        <input type="file" className={styles.inputFile} onChange={onSelectFile} id='attachement' name="attachement" accept="image/png, image/jpeg" />
                        <label className={styles.loadImgLabel} htmlFor="attachement">
                            <img src="/svg/support/file.svg" alt="file" />
                            Déposer votre fichier
                        </label>
                        {errors.attachment && <p className={styles.error}>{errors.attachment.message}</p>}
                    </div>

                    {
                        isLoading ? <Spinner4Bar /> :
                            <div className={styles.bottomAction}>
                                <button type="submit" className={styles.saveBtn}>
                                    Ajouter
                                </button>
                                <a href="#" onClick={handleClose} className={styles.NextBtn}>
                                    Fermer
                                </a>
                            </div>
                    }
                </form>
            </div>
        </div>

    )
}



export default AddSupportModal;
