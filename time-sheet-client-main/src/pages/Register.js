import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import api from '../services/api';
import '../styles/RegisterStyle.css';

export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        login: '',
        password: '',
        role: 'ADMIN',
        status: true
    });

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (userData.password !== userData.confirmPassword) {
            console.error('Le password non coincidono');
            return;
        }

        try {
            await api.post('/register', {
                login: userData.login,
                password: userData.password,
                role: userData.role,
                status: userData.status
            });
            
            navigate('/login');
        } catch (error) {
            console.error('Erro no registro:', error);
        }
    }

    return (
        <div className="register-container">
            <Card title="Registrazione" className="register-card">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText
                                id="login"
                                value={userData.login}
                                onChange={(e) => setUserData({...userData, login: e.target.value})}
                            />
                            <label htmlFor="login">Email</label>
                        </span>
                    </div>

                    <div className="field">
                        <span className="p-float-label">
                            <Password
                                id="password"
                                value={userData.password}
                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                            />
                            <label htmlFor="password">Password</label>
                        </span>
                    </div>

                    <div className="field">
                        <span className="p-float-label">
                            <Password
                                id="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                            />
                            <label htmlFor="confirmPassword">Conferma Password</label>
                        </span>
                    </div>

                    <Button type="submit" label="Registrati" className="p-button-primary" />
                    
                    <div className="login-link">
                        <Button
                            label="Hai già un account? Accedi"
                            className="p-button-link"
                            onClick={() => navigate('/login')}
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
}