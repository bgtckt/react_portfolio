import axios from "axios";

export default class PostService {

  static async getBooks (query) {
    const apiKey = 'AIzaSyD8fT_s0YvFbNUIVfrlzXjB34O_GxRftBY';

    return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
      params: {
        authorization: apiKey,
        startIndex: 0,
        maxResults: 36
      }
    });
  }

  static async getBookByID (id) {
    return await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  }

  static async getCurrencies () {
    return await axios.get('./JSON/currencies.json');
  }

  static async getClients (limit = 2, page = 1) {
    return await axios.get('https://jsonplaceholder.typicode.com/users', {
      params: {
        _limit: limit,
        _page: page
      }
    });
  }
}