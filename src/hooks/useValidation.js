import {useEffect, useState} from "react";

// хук для валидации значения поля формы
// принимает в качестве аргументов проверяемое значение и объект с проверками вида {isEmpty: true, minLength: 8}
// возвращает состояния ошибок
export function useValidation (value, validations) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(true);
  const [emailError, setEmailError] = useState(false);

  // выполнение при изменении значения value поля формы
  useEffect(() => {
    // проходим по ключам перечисляемых свойств объекта validations
    for (const validation in validations) {
      // если ключ равен значению в case, выполняем соответствующую операцию
      switch (validation) {
        case 'minLength':
          value.length && value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          String(value).toLowerCase().match(re) ? setEmailError(false) : setEmailError(true);
          break;
      }
    }
  }, [value]);

  return {isEmpty, minLengthError, emailError}
}

// хук для изменения состояния поля формы
// принимает на вход начальное значение поля формы (пустая строка) и объект с проверками
// возвращает текущее состояние значения input'a, обработчики onChange и onBlur, состояние isDirty
// и состояния ошибок (путем разворачивания объекта valid)
export function useInput (initialState, validations) {
  const [value, setValue] = useState(initialState);
  // isDirty - состояние, меняющее значение на true при выходе из input'а
  const [isDirty, setIsDirty] = useState(false);
  // c помощью хука получаем объект valid вида {isEmpty: false, minLengthError: true} с состояниями ошибок
  const valid = useValidation(value, validations);

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onBlur = (evt) => {
    setIsDirty(true);
  };

  return {value, setValue, onChange, onBlur, isDirty, setIsDirty, ...valid};
}