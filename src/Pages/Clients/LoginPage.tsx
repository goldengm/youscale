import React, { useEffect, useState } from 'react'
import { SetRole, GetRole } from '../../services/storageFunc'
import { selectAuth } from '../../services/slice/authSlice'
import { clientLoginThunk, clientOTPVerifyThunk, clientTeamLoginThunk, resendOTPThunk } from '../../services/thunks/authThunks';
import { useDispatch, useSelector } from "react-redux";
import { CustumAuthInput } from '../../Components/Forms';
import { useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io'
import { yupResolver } from '@hookform/resolvers/yup';
import { BASE_URL } from '../../services/url/API_URL';
import { RotatingLines } from 'react-loader-spinner'
import * as yup from "yup";
import './styles.css'


const ParseTel = (contact: string): string => contact.trim()

type Inputs = {
    email: string;
    password: string;
};

const schema = yup.object().shape({
    email: yup.string().email('Format de l\'email invalide').required('Ce champ est obligatoire'),
    password: yup.string().min(8, 'Votre mot de passe doit avoir au moins 8 caractères').required('Ce champ est obligatoire'),
}).required();

export default function LoginPage() {
    const [showOtpSect, setSowOtpSect] = useState<boolean>(false)

    return (
        <div className='ys-login-page'>
            <section className="ys-login-sect-video">
                <div className='ys-login-sect-video-content'>
                    <a href="/" className='sect-video-logo'>Youscale</a>
                    <video playsInline className="video-sec" autoPlay loop muted src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"></video>
                </div>
            </section>

            {showOtpSect ? <VerifyNumberSection showOtpSect={showOtpSect} setSowOtpSect={setSowOtpSect} /> : <LoginSection showOtpSect={showOtpSect} setSowOtpSect={setSowOtpSect} />}
        </div>
    )
}

interface LoginProps {
    setSowOtpSect: React.Dispatch<React.SetStateAction<boolean>>
    showOtpSect: boolean
}
const LoginSection = ({ setSowOtpSect, showOtpSect }: LoginProps) => {
    const dispatch = useDispatch<any>()
    const { message, isAuthenticated, isError, isVerified, step } = useSelector(selectAuth)

    const activeBtn = (button: 'CLIENT' | 'TEAM'): string => {

        if (button === 'CLIENT') {
            if (GetRole() === 'TEAM') return 'btn-outline-dark'
            else if (GetRole() === 'CLIENT') return 'btn-dark'
        }

        if (GetRole() === 'TEAM') return 'btn-dark'

        return ''
    }

    const handleChangeRole = (role: 'CLIENT' | 'TEAM'): any => {
        SetRole(role)
        window.location.reload()
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            if (GetRole() === 'CLIENT') {
                console.log(step)
                window.location.href = '/'
            }
            if (GetRole() === 'TEAM') window.location.href = '/order'
        }

        if (isVerified === false) {
            setSowOtpSect(true)
        }
    }, [isAuthenticated, isVerified])

    const handleSend = (data: Inputs) => {
        if (GetRole() === 'CLIENT') dispatch(clientLoginThunk(data))
        if (GetRole() === 'TEAM') dispatch(clientTeamLoginThunk(data))
    }

    const googleAuth = () => {
        
        window.open(`${BASE_URL}/auth/google/callback`, '_self')
    }

    return (
        <section className="ys-login-sect-content">
            <div className="sect-content-auth">
                <h2>Sign in to Youscale</h2>
                <div className="btn-group btn-login-switch">
                    <button
                        onClick={() => handleChangeRole('CLIENT')}
                        type="button"
                        className={`btn ${activeBtn('CLIENT')}`}
                    >
                        Client
                    </button>
                    <button
                        onClick={() => handleChangeRole('TEAM')}
                        type="button"
                        className={`btn ${activeBtn('TEAM')}`}
                    >
                        Team
                    </button>
                </div>

                <div className="content-auth-form">
                    {isError && <span className="auth-error">{message}</span>}
                    <form onSubmit={handleSubmit(handleSend)}>
                        <CustumAuthInput
                            label='Email'
                            placeholder='youscale@mail.com'
                            type='text'
                            register={register}
                            name='email'
                            error={errors.email}
                        />
                        <CustumAuthInput
                            label='Password'
                            placeholder='*******'
                            type='password'
                            register={register}
                            name='password'
                            error={errors.password}
                        />
                        <p className="auth-link">Forgot password? <a className="underline" href="/forgotpwd">Click here</a></p>
                        <button className="submit-button">Se connecter</button>
                    </form>
                    <p className="auth-link">Don't have an account? <a className="underline" href="/register">Sign up</a></p>
                    <a className="underline" onClick={() => googleAuth()} href="#">Sign with google</a>
                </div>
            </div>
        </section>
    )
}

const VerifyNumberSection = ({ setSowOtpSect }: LoginProps) => {
    const [code, setCode] = useState<string>()

    const dispatch = useDispatch<any>()
    const { message, isAuthenticated, isError, isLoading } = useSelector(selectAuth)

    const telephone = JSON.parse(localStorage.getItem('telephone') || '')

    const handleVerifyOTP = (): void => {
        dispatch(clientOTPVerifyThunk({ telephone: ParseTel(telephone), code: Number(code) }))
    }

    const resendOTP = (): void => {
        dispatch(resendOTPThunk({ telephone: ParseTel(telephone) }))
    }

    const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target
        setCode(value)
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (GetRole() === 'CLIENT') window.location.href = '/'
            if (GetRole() === 'TEAM') window.location.href = '/order-client-team'
        }
    }, [isAuthenticated])

    return (
        <section className="ys-login-sect-content">
            <div onClick={() => window.location.reload()} className="back-btn">
                <IoIosArrowBack size={25} color={'black'} />
            </div>
            <div className="sect-content-auth">
                <h2>Vérifier votre contact</h2>

                <div className="content-auth-form">
                    {isError && <span className="auth-error">{message}</span>}
                    <form>
                        <fieldset className='fields'>
                            <label htmlFor="login-lab">{'Code'}</label>
                            <input
                                onChange={handleChangeCode}
                                type={'number'}
                                max={4}
                                role='presentation'
                                autoComplete='off'
                                className="form-control"
                            />
                            <a onClick={() => resendOTP()} className='resend-c-txt' href="#">Renvoyer le code</a>
                        </fieldset>

                        <button
                            onClick={() => handleVerifyOTP()}
                            disabled={isLoading}
                            className={`submit-button ${isLoading && 'hide-submit'}`}>
                            {isLoading ? 'Verification' : 'Véfifier'}
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="22"
                                visible={isLoading}
                            />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}