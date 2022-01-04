import React from 'react';
import {usePagination} from "../../../hooks/usePagination";

const Pagination = ({page, total, changePage}) => {
  let pagesArray = usePagination(total);

  return (
    <div className='pagination__bar'>
      {pagesArray.map(btnNumber =>
        <div
          className={btnNumber === page ? 'pagination__btn--current' : 'pagination__btn'}
          key={btnNumber}
          onClick={() => changePage(btnNumber)}
        >
          {btnNumber}
        </div>
      )}
    </div>
  );
};

export default Pagination;