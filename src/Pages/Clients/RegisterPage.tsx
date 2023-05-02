import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { GetRole } from '../../services/storageFunc'
import { yupResolver } from '@hookform/resolvers/yup';
import { selectAuth } from '../../services/slice/authSlice'
import { clientRegisterThunk } from '../../services/thunks/authThunks';
import { useDispatch, useSelector } from "react-redux";
import { showToastError } from '../../services/toast/showToastError';
import * as yup from "yup";
import './styles.css'

type Inputs = {
    fullname: string;
    email: string;
    password: string;
    telephone: string;
};

const schema = yup.object().shape({
    fullname: yup.string().required('Ce champ est obligatoire'),
    email: yup.string().email('Format de l\'email invalide').required('Ce champ est obligatoire'),
    password: yup.string().min(8, 'Votre mot de passe doit avoir au moins 8 caractères').required('Ce champ est obligatoire'),
    telephone: yup.string().required('Ce champ est obligatoire').min(7, '7 caractères maximum'),
}).required();

export default function RegisterPage() {
    const { message, isAuthenticated, isError, isVerified } = useSelector(selectAuth)

    const dispatch = useDispatch<any>()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    function isValidContactNumber(contactNumber: string): boolean {
        if (contactNumber.startsWith("+221") || contactNumber.startsWith("+212")) {
            return true;
        } else {
            return false;
        }
    }


    const handleSend = (data: Inputs) => {
        if(!isValidContactNumber(data.telephone)){
            showToastError('Votre contact doit commencer par (+221) ou (+212)')
            return
        }

        dispatch(clientRegisterThunk(data))
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (GetRole() === 'CLIENT') window.location.href = '/'
            if (GetRole() === 'TEAM') window.location.href = '/'
        }

        if (!isVerified) {
            const telephone = JSON.parse(localStorage.getItem('telephone') || '')
            window.location.href = `/opt-verification?telephone=${telephone}`
        }
    }, [isAuthenticated, isVerified])


    return (
        <div className="authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="text-center mb-3">
                                            <a href="index.html">
                                                <img src="images/logo-full.png" alt="" />
                                            </a>
                                        </div>
                                        <h4 className="text-center mb-4">S'inscrire</h4>
                                        {isError && <span className="auth-error">{message}</span>}
                                        <form onSubmit={handleSubmit(handleSend)}>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Nom complet</strong>
                                                </label>
                                                <input
                                                    {...register('fullname')}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="username"
                                                />
                                                {errors.fullname && <p className='error'>{errors.fullname.message}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Email</strong>
                                                </label>
                                                <input
                                                    {...register('email')}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="hello@example.com"
                                                />
                                                {errors.email && <p className='error'>{errors.email.message}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Password</strong>
                                                </label>
                                                <input
                                                    {...register('password')}
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="********"
                                                />
                                                {errors.password && <p className='error'>{errors.password.message}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Contact</strong>
                                                </label>
                                                <input
                                                    {...register('telephone')}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="(+237) 00 00 00 00 00"
                                                />
                                                {errors.telephone && <p className='error'>{errors.telephone.message}</p>}
                                            </div>
                                            <div className="text-center mt-4">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    S'inscrire
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p>
                                                Vous avez déja un compte ?{" "}
                                                <a className="text-primary" href="/login">
                                                    Sign in
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
