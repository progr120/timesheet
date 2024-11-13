import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginStyle.css';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn({ login, password });
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }

  return (
    <div className="login-container">
      <Card title="Accesso" className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label htmlFor="login">Email</label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>

          <Button type="submit" label="Accedi" className="p-button-primary" />

          <div className="register-link">
            <Button
              label="Non hai un account? Registrati"
              className="p-button-link"
              onClick={() => navigate('/register')}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}