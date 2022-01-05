import React, {useEffect, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useInput} from "../hooks/useValidation";

// клмпонент формы для добавления новой карточки клиента
const CardForm = ({add, items}) => {
  // применение кастомного хука для обновления состояния и валидации полей
  const name = useInput('', {isEmpty: true});
  const email = useInput('', {isEmpty: true, isEmail: true});
  const phone = useInput('', {isEmpty: true, minLength: 8});

  // состояние для изменения названия компании
  const [company, setCompany] = useState('');

  // состояние для отслеживания валидности формы
  const [formValid, setFormValid] = useState(false);

  function addCard (evt) {
    // отменяем событие submit, установленное браузером по умолчанию
    evt.preventDefault();

    // создаем новую карточку клиента и добавляем ее к массиву карточек
    const newCard = {
      id: items.length + 1,
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: {
        name: company
      }
    };
    add(newCard);

    // очищаем форму после создания нового поста
    name.setValue('');
    name.setIsDirty(false);
    email.setValue('');
    email.setIsDirty(false);
    phone.setValue('');
    phone.setIsDirty(false);
    setCompany('');
  }

  // обновление состояния валидности формы в зависимости он наличия/отсутсвия ошибок валидации полей
  useEffect(() => {
    if (name.isEmpty || phone.isEmpty || email.isEmpty || email.emailError || phone.minLengthError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name.isEmpty, phone.isEmpty, email.isEmpty, email.emailError, phone.minLengthError]);

  return (
    <form onSubmit={addCard}>
      <h2 className='clients__subtitle'>Добавление нового клиента</h2>

      {/*отрисовка сообщения об ошибке в случае, когда input потерял фокус и есть ошибка*/}
      {(name.isDirty && name.isEmpty) && <div className='currency__warning'>Поле не может быть пустым</div>}
      <MyInput
        name='name'
        type='text'
        placeholder='ФИО клиента'
        value={name.value}
        onChange={name.onChange}
        onBlur={name.onBlur}
      />

      {(email.isDirty && email.isEmpty) && <div className='currency__warning'>Поле не может быть пустым</div>}
      {(email.isDirty && email.emailError && !email.isEmpty) &&
      <div className='currency__warning'>Неверный формат email</div>
      }
      <MyInput
        name='email'
        type='email'
        placeholder='Email'
        value={email.value}
        onChange={email.onChange}
        onBlur={email.onBlur}
      />

      {(phone.isDirty && phone.isEmpty) && <div className='currency__warning'>Поле не может быть пустым</div>}
      {(phone.isDirty && phone.minLengthError) &&
      <div className='currency__warning'>Минимальная длина поля - 8 символов</div>
      }
      <MyInput
        name='phone'
        type='tel'
        placeholder='Телефон'
        value={phone.value}
        onChange={phone.onChange}
        onBlur={phone.onBlur}
      />

      <MyInput
        type='text'
        placeholder='Компания'
        value={company}
        onChange={evt => setCompany(evt.target.value)}
      />

      <MyButton
        style={{margin: '10px auto'}}
        type='submit'
        disabled={!formValid}
      >Добавить клиента
      </MyButton>
    </form>
  );
};

export default CardForm;