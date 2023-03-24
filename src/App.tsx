import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './api/AuthService';
import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/parts/Header/Header';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      if (localStorage.getItem('token')) {
        if (await AuthService.tokenIsAlive()) {
          setIsAuth(true);
        }
      }
    };

    checkConnection();

    setLoading(false);
  }, []);

  if (isLoading){
    return(
      <div>is loading</div>
    )
  }

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
