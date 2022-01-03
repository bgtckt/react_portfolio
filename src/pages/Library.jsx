import React, {useEffect, useMemo} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import BooksList from "../components/BooksList";
import {useDispatch, useSelector} from "react-redux";
import {setAction} from "../store/booksStore";
import MySelect from "../components/UI/select/MySelect";
import PostService from "../API/PostService";

const Library = () => {
  const dispatch = useDispatch();

  const books = useSelector(state => state.booksReducer.books);
  const searchField = useSelector(state => state.searchFieldReducer.searchField);
  const sort = useSelector(state => state.sortReducer.sort);
  const filter = useSelector(state => state.filterReducer.filter);
  const isSearchDone = useSelector(state => state.isSearchDoneReducer.isSearchDone);
  const isLoading = useSelector(state => state.isLoadingReducer.isLoading);
  const isPagVisible = useSelector(state => state.isPagVisibleReducer.isPagVisible);
  const message = useSelector(state => state.messageReducer.message);
  const amount = useSelector(state => state.amountReducer.amount);

  function getCleanedData (data) {
    const cleanedData = data.items.map(item => {
      if (!item.volumeInfo.hasOwnProperty('publishedDate')) {
        item.volumeInfo['publishedDate'] = '0000';
      }
      if (!item.volumeInfo.hasOwnProperty('imageLinks')) {
        item.volumeInfo['imageLinks'] = {thumbnail: 'https://st3.depositphotos.com/1322515/35964/v/1600/depositphotos_359648638-stock-illustration-image-available-icon.jpg'};
      }
      if (!item.volumeInfo.hasOwnProperty('categories')) {
        item.volumeInfo['categories'] = ['Unknown'];
      }
      return item;
    });
    return cleanedData;
  }

  async function searchBook (evt) {
    evt.preventDefault();
    if (searchField.length) {
      dispatch(setAction('books',[]));
      dispatch(setAction('issearchdone',false));
      dispatch(setAction('isloading',true));
      const response = await PostService.getBooks(searchField);
      if (response.data.items) {
        const cleanData = getCleanedData(response.data);
        dispatch(setAction('books',cleanData));
      }
      dispatch(setAction('isloading',false));
      dispatch(setAction('issearchdone',true));
    }
  }

  const filteredBooks = useMemo(() => {
    if (filter === 'All') {
      return books;
    }
    return books.filter(book => book.volumeInfo.categories[0] === filter);
  }, [books, filter]);

  const sortedFilteredBooks = useMemo(() => {
    if (sort === 'Сначала новые') {
      return filteredBooks.sort((a, b) => +b.volumeInfo.publishedDate.substring(0, 4) - +a.volumeInfo.publishedDate.substring(0, 4));
    } else if (sort === 'Сначала старые') {
      return filteredBooks.sort((a, b) => +a.volumeInfo.publishedDate.substring(0, 4) - b.volumeInfo.publishedDate.substring(0, 4));
    }
    return filteredBooks;
  }, [filteredBooks, sort]);

  useEffect(() => {
    if (sortedFilteredBooks[0] && isSearchDone) {
      dispatch(setAction('message', `Количество книг по вашему запросу: ${sortedFilteredBooks.length}`));
    }
    if (!sortedFilteredBooks[0] && isSearchDone) {
      dispatch(setAction('message', 'По вашему запросу ничего не найдено'));
    }
  }, [sortedFilteredBooks, isSearchDone]);

  useEffect(() => {
    if (sortedFilteredBooks[0] && amount < sortedFilteredBooks.length) {
      dispatch(setAction('ispagvisible', true));
    } else {
      dispatch(setAction('ispagvisible', false));
    }
  }, [sortedFilteredBooks, amount]);

  return (
    <div className='library'>
      <h1>Библиотека</h1>

        <form className='library__form' onSubmit={searchBook}>
          <MyInput
            value={searchField}
            onChange={evt => dispatch(setAction('searchfield',evt.target.value))}
            type='text'
            placeholder='Введите название книги'
          />
          <MyButton type='submit'>Поиск</MyButton>

          <MySelect
            title='Выберите категорию'
            value={filter}
            defaultValue='All'
            options={[
              {value: 1, name: 'Pets'},
              {value: 2, name: 'Fiction'},
              {value: 3, name: 'Medical'},
              {value: 4, name: 'Poetry'}
            ]}
            onSelect={value => dispatch(setAction('filter', value))}
          />

          <MySelect
            title='Сортировка'
            value={sort}
            defaultValue='Сначала новые'
            options={[
              {value: 1, name: 'Сначала старые'}
            ]}
            onSelect={value => dispatch(setAction('sort', value))}
          />
        </form>

      <h3 className='library__message'>{message}</h3>

      {isLoading ? <Loader/> : <BooksList items={sortedFilteredBooks} quantity={amount}/>}

      {isPagVisible &&
      <MyButton
        style={{margin: '0 auto'}}
        onClick={() => dispatch(setAction('amount', 6))}
      >
        Загрузить еще
      </MyButton>}
    </div>
  );
};

export default Library;