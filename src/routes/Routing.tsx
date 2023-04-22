import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashbordPage, OrderPage, ProductPage, TeamPage, PaiementPage, SettingPage, PackPage, LoginPage, RegisterPage, OPTVerificationPage } from '../Pages/Clients';

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

            <Route path="/opt-verification" element={
                <OPTVerificationPage />
            } />

            <Route path="/setting" element={
                <SettingPage />
            } />

            <Route path="/pack" element={
                <PackPage />
            } />

            <Route path="/login" element={
                <LoginPage />
            } />

            <Route path="/register" element={
                <RegisterPage />
            } />
        </Routes>
    )
}

export default Routing;