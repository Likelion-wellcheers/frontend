import React from 'react'
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { ThemeColorProvider } from '../../context/context';
import RouteChangeListener from '../RouterChangeListener';

export const Layout = () => {
    return (
        <>
            <ThemeColorProvider>
                <Nav />
                <RouteChangeListener />
                <Outlet />
            </ThemeColorProvider>
        </>
    );
}
