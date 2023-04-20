import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage, ProductPage, TeamPage, PaiementPage, SettingPage, PackPage } from '../Pages/Clients';

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

            <Route path="/setting" element={
                <SettingPage />
            } />

            <Route path="/pack" element={
                <PackPage />
            } />
        </Routes>
    )
}

export default Routing;