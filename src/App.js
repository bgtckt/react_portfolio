import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/context";

function App() {
  // состояние для отслеживания авторизации
  const [isAuth, setIsAuth] = useState(false);

  // проверка состояния авторизации пользователя в момент монтирования приложения
  // если в localStorage по ключу auth существует значение ('true'), то устанавливаем состояние авторизации true
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth
      }}
    >
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

