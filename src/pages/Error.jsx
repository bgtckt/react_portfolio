import React from 'react';

// компонент страницы с ошибкой при вводе пользователем несуществующего URL
const Error = () => {
  return (
    <div>
      <h2 style={{color: 'crimson', margin: 20}}>Вы ввели адрес несуществующей страницы!</h2>
    </div>
  );
};

export default Error;