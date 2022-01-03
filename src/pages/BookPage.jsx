import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import PostService from "../API/PostService";
import {useDispatch, useSelector} from "react-redux";
import {setAction} from "../store/booksStore";

const BookPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const isBookLoading = useSelector(state => state.isBookLoadingReducer.isBookLoading);
  const error = useSelector(state => state.errorReducer.error);
  const book = useSelector(state => state.bookReducer.book);

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

  useEffect(() => {
    getBook(params.id).then();
  }, []);

  function getClearCategories (categories) {
    return categories[0].split(' / ').filter(elem => elem !== 'General').join(', ');
  }

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