import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
  // установка классов по-умолчанию
  const defClassModal = [classes.modal];
  const defClassContent = [classes.content];

  if (visible) {
    defClassModal.push(classes.modalActive);
    defClassContent.push(classes.contentActive);
  }

  return (
    // добавление двух и более классов с помощью метода join
    // по клику на корневой div скрываем модальное окно
    <div
      className={defClassModal.join(' ')}
      onClick={() => setVisible(false)}
    >
      {/*предотвращаем закрытие модального окна при нажатии на контентную область вне инпутов*/}
      <div
        className={defClassContent.join(' ')}
        onClick={evt => evt.stopPropagation()}
      >
        {children}
      </div>

    </div>
  );
};

export default MyModal;