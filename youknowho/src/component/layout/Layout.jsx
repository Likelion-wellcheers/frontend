import React from 'react'
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { ThemeColorProvider } from '../../context/context';

export const Layout = () => {
    return (
        <>
            <ThemeColorProvider>
                <Nav />
                <Outlet />
            </ThemeColorProvider>
        </>
    );
}
