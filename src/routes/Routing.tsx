import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage, ProductPage } from '../Pages/Clients';

const Routing = (): JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={
                <DashbordPage />
            } />

            <Route path="/order" element={
                <OrderPage />
            } />

            <Route path="/product" element={
                <ProductPage />
            } />
        </Routes>
    )
}

export default Routing;