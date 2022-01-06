import React from "react";
import MyButton from "../MyButton";
import userEvent from "@testing-library/user-event/dist";
import {render, screen} from "@testing-library/react";

const someHandler = jest.fn();

describe('MyButton component', () => {
  it ('MyButton renders with label', () => {
    render(
      <MyButton>Find something</MyButton>
    );
    expect(screen.getByText(/find something/i)).toBeInTheDocument();
  });

  it ('MyButton renders without label', () => {
    render(<MyButton/>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it ('onClick handler works', () => {
    render(
      <MyButton onClick={someHandler}>Find something</MyButton>
    );
    userEvent.click(screen.getByRole('button'));
    expect(someHandler).toHaveBeenCalled();
  });

  it ('MyButton matches snapshot', () => {
    const button = render(
      <MyButton>Save</MyButton>
    );
    expect(button).toMatchSnapshot();
  });
});