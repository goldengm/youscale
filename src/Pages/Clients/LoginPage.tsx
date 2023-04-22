import React from 'react'
import './styles.css'
import { SetRole, GetRole } from '../../services/storageFunc'

export default function LoginPage() {

    const handleChangeRole = (role: 'CLIENT' | 'TEAM'): any =>{
        SetRole(role)
        window.location.reload()
    }

    const activeBtn = (button: 'CLIENT' | 'TEAM') : string =>{
       
        if(button === 'CLIENT') {
            if (GetRole() === 'TEAM') return 'btn-outline-dark'
            else if (GetRole() === 'CLIENT') return 'btn-dark'
        }

        if (GetRole() === 'TEAM') return 'btn-dark'

        return ''        
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
                                        <h4 className="text-center mb-4">Se connecter</h4>

                                        <div className="btn-group btn-login-switch">
                                            <button 
                                                onClick={()=> handleChangeRole('CLIENT')}
                                                type="button" 
                                                className={`btn ${activeBtn('CLIENT')}`}
                                            >
                                                Client
                                            </button>
                                            <button 
                                                onClick={()=> handleChangeRole('TEAM')}
                                                type="button" 
                                                className={`btn ${activeBtn('TEAM')}`}
                                            >
                                                Team
                                            </button>
                                        </div>

                                        <form action="/">
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Email</strong>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="hello@example.com"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Password</strong>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="******"
                                                />
                                            </div>
                                            <div className="row d-flex justify-content-between mt-4 mb-2">
                                                <div className="mb-3">
                                                    <div className="form-check custom-checkbox ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="basic_checkbox_1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="basic_checkbox_1"
                                                        >
                                                            Remember my preference
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <a href="page-forgot-password.html">Password oublié?</a>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Se connecter
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p>
                                                Vous n'avez pas de compte?{" "}
                                                <a className="text-primary" href="/register">
                                                    S'inscrire
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
