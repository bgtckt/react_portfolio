import React, {useEffect, useMemo, useState} from 'react';
import PostService from "../API/PostService";
import {getPagesQuantity} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import CardFilter from "../components/CardFilter";
import MySelect from "../components/UI/select/MySelect";
import MyModal from "../components/UI/modal/MyModal";
import CardForm from "../components/CardForm";
import Loader from "../components/UI/loader/Loader";
import CardsList from "../components/CardsList";
import Pagination from "../components/UI/pagination/Pagination";

const Clients = () => {
  // состояние массива карточек клиентов
  const [cards, setCards] = useState([]);

  // состояния для обработки загрузки и ошибки
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // состояние модального окна
  const [modal, setModal] = useState(false);

  // фильтрация элементов
  const [filter, setFilter] = useState({query: ''});

  const filteredCards = useMemo(() => {
    return cards.filter(card => card.name.toLowerCase().includes(filter.query.toLowerCase()));
  }, [cards, filter.query]);

  // состояния для реализации пагинации
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  // основная функция для получения и отрисовки карточек
  async function getCards () {
    try {
      setIsLoading(true);

      const response = await PostService.getClients(limit, pageNumber);
      setCards(response.data);

      const cardsQuantity = response.headers['x-total-count'];
      setTotalPages(getPagesQuantity(cardsQuantity, limit));
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  // запрос на отрисовку карточек каждый раз, когда меняется номер страницы
  useEffect(() => {
    getCards().then();
  }, [limit, pageNumber]);

  // функция для добавления нового элемента в массив и закрытия модального окна
  function refreshCards (newCard) {
    setCards([...cards, newCard]);
    setModal(false);
  }

  return (
    <div className='clients'>
      <h1>Картотека</h1>

      <MyButton
        style={{margin: '10px auto'}}
        onClick={() => setModal(true)}
      >
        Добавить клиента
      </MyButton>

      <CardFilter
        filter={filter}
        setFilter={setFilter}
      />

      <MySelect
        title='Карточек на странице:'
        value={limit}
        options={[
          {value: 2, name: '2'},
          {value: 5, name: '5'},
          {value: 10, name: 'Показать все'}
        ]}
        onSelect={value => setLimit(value)}
      />

      <MyModal visible={modal} setVisible={setModal}>
        <CardForm add={refreshCards} items={cards}/>
        <MyButton
          style={{margin: '5px auto'}}
          onClick={() => setModal(false)}
        >Закрыть
        </MyButton>
      </MyModal>

      {isLoading
        ? <Loader/>
        : <CardsList items={filteredCards} setItems={setCards}/>
      }

      {error && <h2 className='clients__error'>Ошибка загрузки данных: {error}</h2>}

      <Pagination
        page={pageNumber}
        total={totalPages}
        changePage={(pageNumber) => setPageNumber(pageNumber)}
      />
    </div>
  );
};

export default Clients;