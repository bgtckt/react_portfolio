// количество страниц
export function getPagesQuantity(itemsQuantity, limitPerPage) {
  return Math.ceil(itemsQuantity / limitPerPage);
}
