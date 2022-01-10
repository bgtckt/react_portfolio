import axios from "axios";

// экспорт кастомного класса для отправки запросов к серверу
export default class PostService {

  // метод лля получения данных о книгах из Google Books
  static async getBooks (query) {

    return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
      params: {
        authorization: process.env.REACT_APP_BOOKS_KEY,
        startIndex: 0,
        maxResults: 36
      }
    });
  }

  // метод возвращает данные с информацией о конкретной книге
  static async getBookByID (id) {
    return await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  }

  // метод для получения данных о курсах валют
  static async getCurrencies () {
    return await axios.get('https://api.jsonbin.io/b/61dc317639a33573b326b764');
  }

  // метод для получения данных о клмиентах в картотеке
  // в качестве параметров используем количество страниц и номер страницы, сразу задаем значения по-умолчанию
  static async getClients (limit = 2, page = 1) {
    return await axios.get('https://jsonplaceholder.typicode.com/users', {
      params: {
        _limit: limit,
        _page: page
      }
    });
  }
}