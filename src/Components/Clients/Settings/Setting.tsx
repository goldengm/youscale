import React from 'react'
import Main from '../../Main'
import API from './API'
import './setting.style.css'

export default function Setting() {
    return (
        <Main name='Setting'>
            <div className="content-body">
                <div className="container-fluid">
                    <API />
                    <OrderSetting />
                </div>
            </div>
        </Main>
    )
}

const OrderSetting = (): JSX.Element => {
    return (
        <div className="row">
            <h3 className="mt-4 mb-3">Order Settings</h3>
            <Status />
            <CSVExport />
            <ChangeColumn />
        </div>
    )
}

const Status = (): JSX.Element => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Status</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <StatusCheckbox />
                        <StatusCheckbox />
                        <StatusCheckbox />
                        <StatusCheckbox />
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatusCheckbox = (): JSX.Element => {
    return (
        <div className="col-xl-4 col-xxl-6 col-6">
            <div className="form-check custom-checkbox mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox1"
                />
                <label className="form-check-label" htmlFor="customCheckBox1">
                    Order id
                </label>
            </div>
        </div>
    )
}

const CSVExport = (): JSX.Element => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Export csv column</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <StatusCheckbox />
                        <StatusCheckbox />
                        <StatusCheckbox />
                        <StatusCheckbox />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChangeColumn = (): JSX.Element => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-body">
                    <div className="basic-form">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Add alias to column</label>
                                <select
                                    className="default-select  form-control wide"
                                    style={{ display: "none" }}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                                <div
                                    className="nice-select default-select form-control wide"
                                    tabIndex={0}
                                >
                                    <span className="current">1</span>
                                    <ul className="list">
                                        <li data-value={1} className="option selected focus">
                                            1
                                        </li>
                                        <li data-value={2} className="option">
                                            2
                                        </li>
                                        <li data-value={3} className="option">
                                            3
                                        </li>
                                        <li data-value={4} className="option">
                                            4
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col mt-2 mt-sm-0">
                                <input type="text" className="form-control" placeholder="alias" />
                            </div>
                            
                            <button type="button" className="btn btn-outline-primary btn-xs">
                                Change
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}