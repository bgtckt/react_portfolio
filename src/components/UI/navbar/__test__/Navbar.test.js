import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Navbar from "../Navbar";
import {AuthContext} from "../../../../context/context";
import userEvent from "@testing-library/user-event/dist";

describe('Navbar component', () => {
  it ('Navbar renders correctly when user is logged in', () => {
    render(
      <AuthContext.Provider
        value={{
          isAuth: true
        }}
      >
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
    expect(screen.getByText('Выход')).toBeInTheDocument();
  });

  it ('Navbar renders correctly when user is logged out', () => {
    render(
      <AuthContext.Provider
        value={{
          isAuth: false
        }}
      >
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
    expect(screen.queryByText('Выход')).toBeNull();
  });

  it ('Navigation between pages works correctly', () => {
    render(
      <AuthContext.Provider
        value={{
          isAuth: true
        }}
      >
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    userEvent.click(screen.getByText(/обмен валют/i));
    expect(location.pathname).toEqual('/currency');
    userEvent.click(screen.getByText(/картотека/i));
    expect(location.pathname).toEqual('/clients');
  });

  it ('Navbar snapshot', () => {
   const navBar =  render(
      <AuthContext.Provider
        value={{
          isAuth: true
        }}
      >
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(navBar).toMatchSnapshot();
  });
});