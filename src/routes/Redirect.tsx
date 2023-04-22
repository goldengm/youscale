import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Redirect({children}: any ): JSX.Element{
    const isAuthenticated = localStorage.getItem("token") ? true : false;    

    if (isAuthenticated) {
       return <Navigate to="/" />
    }
      
    return children
}