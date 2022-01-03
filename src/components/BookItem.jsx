import React from 'react';
import {useNavigate} from "react-router-dom";

const BookItem = ({elem}) => {
  const router = useNavigate();
  return (
    <div className='book__card' key={elem.id} onClick={() => router(`/books/${elem.id}`)}>
      <img className='book__img' src={elem.volumeInfo.imageLinks.thumbnail} alt={elem.volumeInfo.title}/>
      <p className='book__title'>{elem.volumeInfo.title}</p>
      {elem.volumeInfo.categories[0] !== 'Unknown' &&
      <p className='book__info'>
        Категория: {elem.volumeInfo.categories[0]}
      </p>}
      {elem.volumeInfo.authors &&
        elem.volumeInfo.authors.map(author =>
        <p className='book__author' key={author}>{author}</p>
      )
      }
      {elem.volumeInfo.publishedDate !== '0000' &&
      <p className='book__info'>{elem.volumeInfo.publishedDate.split('-').reverse().join('.')} г.</p>
      }
    </div>
  );
};

export default BookItem;