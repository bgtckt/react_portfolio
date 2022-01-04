import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
// import Authorization from "../pages/Authorization";
// import {AuthContext} from "../context/context";
import BookPage from "../pages/BookPage";
import Library from "../pages/Library";
import Currency from "../pages/Currency";
import Clients from "./Clients";

const AppRouter = () => {
  // const {isAuth, setIsAuth} = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={<Library/>}/>
      <Route path='/books' element={<Library/>}/>
      <Route exact path='/books/:id' element={<BookPage/>}/>
      <Route path='/currency' element={<Currency/>}/>
      <Route path='/clients' element={<Clients/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    // isAuth
    //   ? <Routes>
    //     <Route path='/' element={<Library/>}/>
    //     <Route path='/books' element={<Library/>}/>
    //     <Route exact path='/books/:id' element={<BookPage/>}/>
    //     <Route path='*' element={<Error/>}/>
    //   </Routes>
    //   : <Routes>
    //     <Route path='/' element={<Authorization/>}/>
    //     <Route path='*' element={<Error/>}/>
    //   </Routes>
  );
};

export default AppRouter;