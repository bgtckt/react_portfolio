import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
  const defClassModal = [classes.modal];
  const defClassContent = [classes.content];

  if (visible) {
    defClassModal.push(classes.modalActive);
    defClassContent.push(classes.contentActive);
  }

  return (
    <div
      className={defClassModal.join(' ')}
      onClick={() => setVisible(false)}
    >

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