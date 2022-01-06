import {render, screen} from '@testing-library/react';
import React from "react";
import MySelect from "../MySelect";
import userEvent from "@testing-library/user-event/dist";

const someHandler = jest.fn();

const someOptions = [
  {value: 1, name: 'A'},
  {value: 2, name: 'B'}
];

describe('MySelect component', () => {
  it ('MySelect renders', () => {
    render(
      <MySelect
        options={someOptions}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it ('MySelect title renders correctly', () => {
    render(
      <MySelect
        title='Some title'
        options={someOptions}
      />
    );
    expect(screen.getByText(/some title/i)).toBeInTheDocument();
  });

  it ('MySelect options changing works', () => {
    render(
      <MySelect
        onSelect={someHandler}
        options={someOptions}
      />
    );
    userEvent.selectOptions(screen.getByRole('combobox'), 'A');
    expect(screen.getByText('A').selected).toBeTruthy();

    userEvent.selectOptions(screen.getByRole('combobox'), 'B');
    expect(screen.getByText('B').selected).toBeTruthy();
    expect(screen.getByText('A').selected).toBeFalsy();
  });

  it ('MySelect matches snapshot', () => {
    const select = render(
      <MySelect
        onSelect={someHandler}
        options={someOptions}
      />
    );
    expect(select).toMatchSnapshot();
  });
});