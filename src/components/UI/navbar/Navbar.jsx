import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import classes from './Navbar.module.css';
import {AuthContext} from "../../../context/context";

const Navbar = () => {
  // получаем доступ к переменной isAuth помещенной в контекст
  const {isAuth, setIsAuth} = useContext(AuthContext);

  // функция меняет состояние авторизации на false и удаляет значение 'true' по ключу auth из localStorage
  function logOut () {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div className={classes.navbar} data-testid='nav-bar'>
      <div className={classes.navbar__links}>
        <Link className={classes.navbar__link} to='/books'>Библиотека</Link>
        <Link className={classes.navbar__link} to='/currency'>Обмен валют</Link>
        <Link className={classes.navbar__link} to='/clients'>Картотека</Link>
      </div>
      {isAuth && <MyButton onClick={logOut}>Выход</MyButton>}
    </div>
  );
};

export default Navbar;