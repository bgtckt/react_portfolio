import {render, screen} from "@testing-library/react";
import React from "react";
import Pagination from "../Pagination";

describe('Pagination component', () => {
  it ('Pagination bar renders correctly with multiple pages', () => {
    render(
      <Pagination total={2}/>
    );
    expect(screen.getByTestId('pagination-bar')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it ('Pagination bar renders correctly without pages', () => {
    render(
      <Pagination total={0}/>
    );
    expect(screen.getByTestId('pagination-bar')).toBeInTheDocument();
    expect(screen.queryByText('1')).toBeNull();
  });

  it ('Current pagination button class applies correctly', () => {
    render(
      <Pagination total={5} page={2}/>
    );
    expect(screen.getByText('2')).toHaveClass('pagination__btn--current');
  });

  it ('Pagination bar snapshot', () => {
    const paginationBar = render(
      <Pagination total={5}/>
    );
    expect(paginationBar).toMatchSnapshot();
  });
});