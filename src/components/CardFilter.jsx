import React from 'react';
import MyInput from "./UI/input/MyInput";

const CardFilter = ({filter, setFilter}) => {

  return (
    <div className='clients__filter'>
      <h3 className='clients__subtitle'>Поиск клиентов</h3>
      <MyInput
        value={filter.query}
        onChange={event => setFilter({...filter, query: event.target.value})}
        placeholder='Введите имя клиента'
      />
    </div>
  );
};

export default CardFilter;