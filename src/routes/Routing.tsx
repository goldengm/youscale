import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Redirect from './Redirect';
import Error403 from '../Pages/Errors/Error403';
import { DashbordPage, OrderPage, ProductPage, TeamPage, PaiementPage, SettingPage, PackPage, LoginPage, RegisterPage, OPTVerificationPage } from '../Pages/Clients';
import { useGetClientTeamMemberPageQuery } from '../services/api/ClientTeamApi/ClientTeamPageApi';
import { GetRole } from '../services/storageFunc';

interface WithAuthTeamProps {
    Component: any,
    pageAccess: string[],
    name?: string
}
const AuthComponent = ({ Component, pageAccess, name }: WithAuthTeamProps) => {

    if (GetRole() === "TEAM" && name === 'setting') return <Error403 />

    const user: any = localStorage.getItem('userData') ? JSON.parse(String(localStorage.getItem('userData'))) : null;

    if (!user) return <Navigate to="/login" />;

    if (pageAccess.length === 0) return <Component />;

    return <Component />;
};

const Routing = (): JSX.Element => {
    const { data } = useGetClientTeamMemberPageQuery();

    return (
        <Routes>
            <Route path="/opt-verification" element={
                <Redirect>
                    <OPTVerificationPage />
                </Redirect>
            } />

            <Route path="/login" element={
                <Redirect>
                    <LoginPage />
                </Redirect>
            } />

            <Route path="/register" element={
                <Redirect>
                    <RegisterPage />
                </Redirect>
            } />

            <Route path="/" element={AuthComponent({ Component: DashbordPage, pageAccess: data?.data ?? [] })} />

            <Route path="/order" element={AuthComponent({ Component: OrderPage, pageAccess: data?.data ?? [] })} />

            <Route path="/product" element={AuthComponent({ Component: ProductPage, pageAccess: data?.data ?? [] })} />

            <Route path="/team" element={AuthComponent({ Component: TeamPage, pageAccess: data?.data ?? [] })} />

            <Route path="/paiement" element={AuthComponent({ Component: PaiementPage, pageAccess: data?.data ?? [] })} />

            <Route path="/setting" element={AuthComponent({ Component: SettingPage, pageAccess: data?.data ?? [], name: 'setting' })} />

            <Route path="/pack" element={AuthComponent({ Component: PackPage, pageAccess: data?.data ?? [] })} />

        </Routes>
    )
}

export default Routing;