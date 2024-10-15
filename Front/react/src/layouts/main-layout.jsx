import React, { useEffect } from 'react';
import HeaderComponent from '../shared/header';
import FooterComponent from '../shared/footer';
import { Outlet, useNavigate } from 'react-router-dom';
import * as loginService from '../services/login/loginService';
// import { useSelector } from 'react-redux';


const MainLayout = () => {
    const navigate = useNavigate();
    // const {id} = useSelector(state => state.usuarioStore.userData)

    const handleValidateToken = async (token) => {
        const result = await loginService.validateToken({ jwt: token });
        return result;
    }

    useEffect(()=>{
        const token = localStorage.getItem('jwt_token');

        if (!token) {
            navigate('/login')
        }

        handleValidateToken(token).catch(
            (error) => {
                console.error(error);
                navigate('/login')
            }
        );
    }, [navigate]);

    return(
        <>
        {/* Header */}
        <HeaderComponent/>
        {/* Body */}
        <Outlet/>
        {/* Footer */}
        <FooterComponent/>
        </>
    )
}

export default MainLayout;