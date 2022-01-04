import React from 'react';

const CurrenciesList = ({items, currency}) => {
  return (
    <div className='currency__list'>
      {items.map(pair =>
        <div key={pair[0]} className='currency__card'>
          <p className='currency__pair'>1 {currency} = {(+pair[1]).toFixed(3)} {pair[0]}</p>
        </div>
      )}
    </div>
  );
};

export default CurrenciesList;