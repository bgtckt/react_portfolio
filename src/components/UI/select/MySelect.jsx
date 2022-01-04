import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({title, defaultValue, options, value, onSelect}) => {
  return (
    <div className={classes.select__wrapper}>
      <h4>{title}</h4>
      <select
        className={classes.select}
        value={value}
        onChange={event => onSelect(event.target.value)}
      >
        {defaultValue && <option>{defaultValue}</option>}
        {options.map(option =>
          <option
            key={option.value}
            value={option.name}
          >{option.name}
          </option>
        )}
      </select>
    </div>
  );
};

export default MySelect;