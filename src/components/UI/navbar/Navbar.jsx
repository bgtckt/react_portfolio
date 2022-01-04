import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import classes from './Navbar.module.css';
// import {AuthContext} from "../../../context/context";

const Navbar = () => {
  // const {isAuth, setIsAuth} = useContext(AuthContext);
  //
  // function logOut () {
  //   setIsAuth(false);
  //   localStorage.removeItem('auth');
  // }

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__links}>
        <Link className={classes.navbar__link} to='/books'>Библиотека</Link>
        <Link className={classes.navbar__link} to='/currency'>Обмен валют</Link>
      </div>
      <MyButton
        // onClick={logOut}
      >
        Выход</MyButton>
    </div>
  );
};

export default Navbar;