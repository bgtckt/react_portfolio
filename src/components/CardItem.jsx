import React from 'react';
import MyButton from "./UI/button/MyButton";

const CardItem = ({card, remove}) => {

  return (
    <div className='clients__card'>
      <h4 className='clients__name'>{card.id}. {card.name}</h4>
      <div className='clients__info'>
        <p><b>email:</b> {card.email}</p>
        <p><b>phone:</b> {card.phone}</p>
        <p><b>company:</b> "{card.company.name}"</p>
      </div>
      <MyButton onClick={() => remove(card)}>Удалить</MyButton>
    </div>
  );
};

export default CardItem;