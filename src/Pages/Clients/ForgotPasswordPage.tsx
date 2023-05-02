import React, { useState } from 'react'
import { GetRole } from '../../services/storageFunc';
import { useDispatch } from "react-redux";
import { clientForgotPwdThunk } from '../../services/thunks/authThunks';
import { showToastError } from '../../services/toast/showToastError';
import { showToastSucces } from '../../services/toast/showToastSucces';

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState<string>()

    const dispatch = useDispatch<any>()

    const sendSMS = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()

        if(!email) {
            showToastError('Veuillez préciser le mail')
            return
        }

        if (GetRole() === 'CLIENT') dispatch(clientForgotPwdThunk({ email }))
        if (GetRole() === 'TEAM') console.error('not implemented')

        showToastSucces('Votre nouveau mot de passe a été envoyé au contact lié a cet email')
    }

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
                                        <h4 className="text-center mb-4">Mot de passe oublié</h4>
                                        <form action="#">
                                            <div className="mb-3">
                                                <label>
                                                    <strong>veuillez renseigner votre mail</strong>
                                                </label>
                                                <input
                                                    onChange={(e)=> setEmail(e.target.value)}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="hello@example.com"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button 
                                                    onClick={sendSMS}
                                                    type="submit" 
                                                    className="btn btn-primary btn-block">
                                                    envoyer
                                                </button>
                                            </div>
                                        </form>
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
