import {render, screen} from '@testing-library/react';
import React from "react";
import MyModal from "../MyModal";

describe('MyModal component', () => {
  it ('MyModal renders correctly with children', () => {
    render(
      <MyModal>
        <div>
          <span>Some data</span>
        </div>
      </MyModal>
    );
    expect(screen.getByText(/some data/i)).toBeInTheDocument();
  });

  it ('MyModal renders correctly without children', () => {
    render(<MyModal/>);
    expect(screen.getByTestId('my-modal')).toBeInTheDocument();
  });

  it ('MyModal is visible then prop toggles to true', () => {
    const isVisible = true;
    render(<MyModal visible={isVisible}/>);
    expect(screen.getByTestId('my-modal')).toHaveClass('modalActive');
  });

  it ('MyModal is hide then prop toggles to false', () => {
    const isVisible = false;
    render(<MyModal visible={isVisible}/>);
    expect(screen.getByTestId('my-modal')).not.toHaveClass('modalActive');
  });

  it ('MyModal matches snapshot', () => {
    const modal = render(<MyModal/>);
    expect(modal).toMatchSnapshot();
  });
});