import {render, screen} from '@testing-library/react';
import CardsList from "../../CardsList";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event/dist";

const data = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    company: {
      name: "Romaguera-Crona"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    company: {
      name: "Deckow-Crist"
    }
  }
];

describe('CardsList component', () => {
  it ('CardsList renders', () => {
    render(
      <BrowserRouter>
        <CardsList items={data}/>
      </BrowserRouter>
    );
    expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  });

  it ('CardsList not renders without data', () => {
    render(
      <BrowserRouter>
        <CardsList items={[]}/>
      </BrowserRouter>
    );
    expect(screen.getByText('Список клиентов пуст!')).toBeInTheDocument();
    expect(screen.queryByTestId('cards-list')).toBeNull();
  });

  it ('CardsList snapshot', () => {
    const cardsList = render(
      <BrowserRouter>
        <CardsList items={data}/>
      </BrowserRouter>
    );
    expect(cardsList).toMatchSnapshot();
  });
});