import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage, ProductPage, TeamPage } from '../Pages/Clients';

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

            <Route path="/team" element={
                <TeamPage />
            } />
        </Routes>
    )
}

export default Routing;