// функция для получения количества страниц для пагинации
export function getPagesQuantity(itemsQuantity, limitPerPage) {
  return Math.ceil(itemsQuantity / limitPerPage);
}
