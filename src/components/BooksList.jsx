import React from 'react';
import BookItem from "./BookItem";

const BooksList = ({items, quantity}) => {
  return (
    <div className='books__list'>
      {items.map((book, idx) =>
        idx < quantity &&
        <BookItem
          elem={book}
          key={book.id}
        />
      )}
    </div>
  );
};

export default BooksList;