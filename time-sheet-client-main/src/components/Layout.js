import React from 'react';
import NavBar from './NavBar';
import '../styles/LayoutStyle.css';

export default function Layout({ children }) {
    return (
        <div className="layout-container">
            <NavBar />
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
}