import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import Authorization from "../pages/Authorization";
import {AuthContext} from "../context/context";
import BookPage from "../pages/BookPage";
import Library from "../pages/Library";
import Currency from "../pages/Currency";
import Clients from "./Clients";

const AppRouter = () => {
  // получаем доступ к переменной isAuth помещенной в контекст
  const {isAuth, setIsAuth} = useContext(AuthContext);

  return (
    // задаем доступные маршруты в зависимости от значения переменной isAuth
    isAuth
      ? <Routes>
           {/*дефолтный маршрут при загрузке главной страницы*/}
          <Route path='/react_portfolio' element={<Library/>}/>
          <Route path='/books' element={<Library/>}/>
          {/*для создания динамического маршрута используется :id
          id - параметр, по которому реализуется изменение адреса*/}
          <Route exact path='/books/:id' element={<BookPage/>}/>
          <Route path='/currency' element={<Currency/>}/>
          <Route path='/clients' element={<Clients/>}/>
          {/*обработка ввода URL несуществующей страницы*/}
          <Route path='*' element={<Error/>}/>
      </Routes>
      : <Routes>
          <Route path='/react_portfolio' element={<Authorization/>}/>
          <Route path='/books' element={<Authorization/>}/>
          <Route path='/currency' element={<Authorization/>}/>
          <Route path='/clients' element={<Authorization/>}/>
          <Route path='*' element={<Error/>}/>
      </Routes>
  );
};

export default AppRouter;