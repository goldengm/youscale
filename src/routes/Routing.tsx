import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage } from '../Pages/Clients';

const Routing = () => {

    return (
        <Routes>
            <Route path="/" element={
                    <DashbordPage />
            } />
            <Route path="/order" element={
                    <OrderPage />
            } />
        </Routes>
    )
}

export default Routing;