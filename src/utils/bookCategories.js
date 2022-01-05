// функция для получения строки с категориями (жанрами) книги нужного вида
export function getClearCategories (categories) {
  return categories[0].split(' / ').filter(elem => elem !== 'General').join(', ');
}