import React from 'react'

export default function RegisterPage() {
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
                                        <form action="index.html">
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Nom complet</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="username"
                                                />
                                            </div>
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
                                                    placeholder="********"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="mb-1">
                                                    <strong>Contact</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="(+237) 00 00 00 00 00"
                                                />
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
