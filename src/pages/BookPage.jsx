import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import PostService from "../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import {setAction} from "../store/booksStore";
import {getClearCategories} from "../utils/bookCategories";

const BookPage = () => {
  // хук useParams применяем для получения значения id из URL текущей страницы
  const params = useParams();
  // применяем хук useDispatch для изменения состояния из redux внутри компонента
  const dispatch = useDispatch();

  // при помощи хука useSelector получаем доступ к состояниям для последуюего их изменения
  const isBookLoading = useSelector(state => state.isBookLoadingReducer.isBookLoading);
  const error = useSelector(state => state.errorReducer.error);
  const book = useSelector(state => state.bookReducer.book);

  // функция для получения данных с сервера о конкретной книге по ее id
  async function getBook (id) {
    try {
      dispatch(setAction('isbookloading',true));
      const response =  await PostService.getBookByID(id);
      dispatch(setAction('book', response.data.volumeInfo));
    } catch (e) {
      dispatch(setAction('error', e.message));
    } finally {
      dispatch(setAction('isbookloading',false));
    }
  }

  // производим GET-запрос по id, полученному из URL
  // получаем данные конкретной книги при монтировании компонента
  useEffect(() => {
    getBook(params.id).then();
  }, []);

  return (
    <div>
      {error && <h1 className='bookPage__error'>Ошибка загрузки данных: {error}</h1>}

      {isBookLoading
        ? <Loader/>
        : <div className='bookPage'>
          <h1 className='bookPage__title'>"{book.title}"</h1>
          {book.imageLinks && <img className='bookPage__img' src={book.imageLinks.thumbnail} alt={book.title}/>}
          {book.authors && book.authors.map(author =>
            <h3 key={author}>{author}</h3>
          )}
          <div className='bookPage__info'>
            {book.categories && <span><b>Категории: {getClearCategories(book.categories)}</b></span>}
          </div>
          {book.description &&
          <p className='bookPage__description'>{book.description.replace(/<\/?[^>]+(>|$)/g, '')}</p>}
        </div>
      }
    </div>
  );
};

export default BookPage;