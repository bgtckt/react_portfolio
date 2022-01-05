import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const CurrencyConverter = ({data}) => {
  // состояние запроса, введенного пользователем в поле ввода
  const [query, setQuery] = useState('');
  // результат конвертации
  const [result, setResult] = useState('');
  // состояние для обработки ошибки
  const [error, setError] = useState('');

  // функция-обработчик запроса на конвертацию
  // проверяет запрос на валидность (соответствие шаблону "15 usd in rub")
  // формирует результат конвертации на основании запроса пользователя
  function convertHandler (evt) {
    evt.preventDefault();

    const qArr = query.split(' ');

    if (qArr.length === 4) {
      data.forEach(elem => {
        if (elem.name === qArr[1].toUpperCase()) {
          const ratesArr = Object.entries(elem.rates);
          ratesArr.forEach(el => {
            if (el[0] === qArr[3].toUpperCase()) {
              const res = `${qArr[0]} ${qArr[1]} = ${(+el[1] * +qArr[0]).toFixed(2)} ${qArr[3]}`;
              setResult(res.toUpperCase());
              setQuery('');
              setError('');
            }
          });
        }
      });
    } else {
      setError('Неверный формат запроса!');
    }
  }

  return (
    <div className='currency__converter'>
      <h2>Конвертер валюты</h2>
      <form className='currency__form'>
        {error && <div className='currency__warning'>{error}</div>}
        <MyInput
          value={query}
          onChange={evt => setQuery(evt.target.value)}
          type='text'
          placeholder='Введите запрос вида: 15 usd in rub'
        />
        <MyButton style={{margin: '0 auto'}} onClick={convertHandler}>Конвертировать</MyButton>
        {result && <div className='currency__result'>Результат: {result}</div>}
      </form>
    </div>
  );
};

export default CurrencyConverter;