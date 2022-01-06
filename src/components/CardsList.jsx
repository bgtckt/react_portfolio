import React from 'react';
import CardItem from "./CardItem";

const CardsList = ({items, setItems}) => {
  // функция для удаления карточки
  function removeCard (card) {
    setItems(items.filter(elem => elem.id !== card.id))
  }

  // проверка на наличие карточек в массиве и вывод сообщения в случае их отсутствия
  if (items.length === 0) {
    return (
      <h3 className='clients__error'>Список клиентов пуст!</h3>
    )
  }

  return (
    <div className='clients__list' data-testid='cards-list'>
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