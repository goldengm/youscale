import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage, ProductPage, TeamPage, PaiementPage } from '../Pages/Clients';

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

            <Route path="/paiement" element={
                <PaiementPage />
            } />
        </Routes>
    )
}

export default Routing;