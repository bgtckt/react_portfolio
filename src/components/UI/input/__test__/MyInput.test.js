import MyInput from "../MyInput";
import React from "react";
import userEvent from "@testing-library/user-event/dist";
import {render, screen} from "@testing-library/react";

const someHandler = jest.fn();

describe('MyInput component', () => {
  it ('MyInput renders correctly', () => {
    render(
      <MyInput onChange={someHandler}/>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it ('MyInput renders correctly with placeholder', () => {
    render(
      <MyInput onChange={someHandler} placeholder='Type something'/>
    );
    expect(screen.getByPlaceholderText(/type something/i)).toBeInTheDocument();
  });

  it ('Typing in MyInput works', () => {
    render(<MyInput onChange={someHandler}/>);

    expect(screen.queryByDisplayValue(/react/)).toBeNull();
    userEvent.type(screen.getByRole('textbox'), 'react');
    expect(screen.queryByDisplayValue(/react/)).toBeInTheDocument();
  });

  it ('MyInput focus correctly', () => {
    const {container} = render(
      <MyInput value='' onChange={someHandler}/>
    );
    const input = container.firstChild;

    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it ('onChange handler works', () => {
    render(
      <MyInput onChange={someHandler}/>
    );
    userEvent.type(screen.getByRole('textbox'), 'react');
    expect(someHandler).toHaveBeenCalledTimes(5);
  });

  it ('MyInput matches snapshot', () => {
    const input = render(
      <MyInput value='Some value' onChange={someHandler}/>
    );
    expect(input).toMatchSnapshot();
  });
});