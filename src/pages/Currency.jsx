import React, {useEffect, useState} from 'react';
import Loader from "../components/UI/loader/Loader";
import PostService from "../API/PostService";
import MySelect from "../components/UI/select/MySelect";
import CurrenciesList from "../components/CurrenciesList";
import CurrencyConverter from "../components/CurrencyConverter";

const Currency = () => {

  const [data, setData] = useState({});
  const [pairs, setPairs] = useState([]);
  const [base, setBase] = useState('EUR');
  const [error, setError] = useState('');

  async function loadData () {
    try {
      const response = await PostService.getCurrencies();
      setTimeout(() => {
        setData(response.data);
      }, 300);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadData().then();
  }, []);

  useEffect(() => {
    if (data.success) {
      data.bases.forEach(elem => {
        if (elem.name === base) {
          setPairs(Object.entries(elem.rates));
        }
      });
    }
  }, [data.success, base]);

  return (
    <div className='currency'>
      <h1>Обмен валют</h1>

      {error && <h1 className='currency__error'>Ошибка загрузки данных: {error}</h1>}

      {!data.success
        ? <Loader/>
        : <div>
          <MySelect
            title='Выберите базовую валюту:'
            value={base}
            options={data.bases}
            onSelect={value => setBase(value)}
          />

          <h3 className='currency__subtitle'>Курсы валют на {new Date().toLocaleString()}</h3>
          <CurrenciesList items={pairs} currency={base}/>
        </div>
      }

      <CurrencyConverter data={data.bases}/>
    </div>
  );
};

export default Currency;