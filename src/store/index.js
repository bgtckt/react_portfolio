import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {
  amountReducer, bookReducer,
  booksReducer, errorReducer,
  filterReducer, isBookLoadingReducer,
  isLoadingReducer, isPagVisibleReducer,
  isSearchDoneReducer, messageReducer,
  searchFieldReducer,
  sortReducer
} from "./booksStore";

// получаем объект rootReducer путем передачи в combineReducers объекта с функциями-reduce
// в качестве ключей задаем произвольные названия
const rootReducer = combineReducers({
  booksReducer: booksReducer,
  searchFieldReducer: searchFieldReducer,
  sortReducer: sortReducer,
  filterReducer: filterReducer,
  isSearchDoneReducer: isSearchDoneReducer,
  isLoadingReducer: isLoadingReducer,
  isBookLoadingReducer: isBookLoadingReducer,
  isPagVisibleReducer: isPagVisibleReducer,
  messageReducer: messageReducer,
  amountReducer: amountReducer,
  errorReducer: errorReducer,
  bookReducer: bookReducer
});

// создание объекта store, который содержит встроенные методы для работы с состояниями
// первым параметром всегда принимает reducer
// thunk является middle ware, поэтому для его добавления в store применяется хук applyMiddleWare
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));