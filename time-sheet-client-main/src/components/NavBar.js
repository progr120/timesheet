import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/NavBarStyle.css';

export default function NavBar() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleMenuClick = (event) => {
        event.preventDefault();
        const menuElement = event.target.closest('.p-menubar-root-list');
        if (menuElement) {
            menuElement.classList.add('show');
        }
    };

    const items = [
        {
            label: 'Esci',
            icon: 'pi pi-power-off',
            command: () => {
                signOut();
                navigate('/login');
            }
        },
        {
            label: 'Attività',
            icon: 'pi pi-calendar',
            command: () => navigate('/activities')
        },
        {
            label: 'Progetti',
            icon: 'pi pi-folder',
            command: () => navigate('/projects')
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => navigate('/')
        }, {
            label: 'Tema',
            icon: `pi ${theme === 'dark' ? 'pi-sun' : 'pi-moon'}`,
            command: () => toggleTheme()
        }
    ];

    return (
        <div className="navbar-container">
            <Menubar model={items} onMenuClick={(e) => handleMenuClick(e)}>
                <ng-template pTemplate="menuicon">
                    <i className="pi pi-bars" aria-label="Menu"></i>
                </ng-template>
            </Menubar>
        </div>
    );
}