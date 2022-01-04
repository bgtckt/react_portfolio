import React from 'react';
import CardItem from "./CardItem";

const CardsList = ({items, setItems}) => {
  // функция для удаления карточки
  function removeCard (card) {
    setItems(items.filter(elem => elem.id !== card.id))
  }

  if (items.length === 0) {
    return (
      <h3 className='clients__error'>Список клиентов пуст!</h3>
    )
  }

  return (
    <div className='clients__list'>
      {items.map(card =>
        <CardItem
          card={card}
          key={card.id}
          remove={removeCard}
        />
      )}
    </div>
  );
};

export default CardsList;