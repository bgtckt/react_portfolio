import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";

// компонент страницы авторизации пользователя
const Authorization = () => {
  // получаем доступ к состоянию setIsAuth из контекста
  const {isAuth, setIsAuth} = useContext(AuthContext);

  // функция для изменения и сохранения состояния авторизации
  // в момент авторизации записываем в localStorage по ключу auth значение 'true'
  function logIn (evt) {
    evt.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div className='authorization'>
      <h1>Авторизация пользователя</h1>
      <form className='authorization__form' onSubmit={logIn}>
        <h3 className='authorization__subtitle'>Введите произвольные данные</h3>
        <MyInput type='text' placeholder='Введите имя пользователя'/>
        <MyInput type='password' placeholder='Введите пароль'/>
        <MyButton style={{margin: '10px auto 0 auto'}}>Войти</MyButton>
      </form>
    </div>
  );
};

export default Authorization;