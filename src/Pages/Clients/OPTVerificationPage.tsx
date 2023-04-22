import React from 'react'

export default function OPTVerificationPage(): JSX.Element {
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
                                        <h4 className="text-center mb-4">OTP Verification</h4>
                                        <form action="index.html">
                                            <div className="mb-3">
                                                <label>
                                                    <strong>Code</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="472854"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Vérifier
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
