import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);
  let checkToken = localStorage.getItem('@timesheet:token');

  if (checkToken && load) {
    const decodedToken = jwtDecode(checkToken);
    const userId = decodedToken.id;
    setUser(userId);
    setLoad(false);
  }

  async function signIn({ login, password }) {
    try {
      const response = await api.post('/login', {
        login,
        password
      });

      const { token } = response.data;

      localStorage.setItem('@timesheet:token', token);
      api.defaults.headers.authorization = `Bearer ${token}`;

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (token) {
        setUser(userId);
      }
    } catch (err) {
      throw new Error('Erro na autenticação');
    }
  }

  function signOut() {
    localStorage.removeItem('@timesheet:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}