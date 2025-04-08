'use client'
import Navbar from '@/components/Navbar';
import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default Layout;