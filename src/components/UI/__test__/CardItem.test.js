import React from "react";
import {render, screen} from '@testing-library/react';
import CardItem from "../../CardItem";
import {BrowserRouter} from "react-router-dom";

const data = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  company: {
    name: "Romaguera-Crona"
  }
};

describe('CardItem component', () => {
  it ('CardItem renders', () => {
    render(
      <BrowserRouter>
        <CardItem card={data}/>
      </BrowserRouter>
    );
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
    expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
  });

  it ('CardItem snapshot', () => {
    const cardItem = render(
      <BrowserRouter>
        <CardItem card={data}/>
      </BrowserRouter>
    );
    expect(cardItem).toMatchSnapshot();
  });
});