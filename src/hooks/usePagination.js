import {useMemo} from "react";

// получение массива с кнопками/страницами с помощью кастомного хука
export function usePagination (quantity) {
  const pagesArr = useMemo(() => {
    const resArr = [];
    let i = 0;
    while (i < quantity) {
      resArr.push(i + 1);
      i++;
    }
    return resArr;
  }, [quantity]);
  return pagesArr;
}