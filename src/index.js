import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";

ReactDOM.render(
  // Provider связывает react и redux, параметром принимает store
  // передает состояние из redux во все компоненты приложения
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

