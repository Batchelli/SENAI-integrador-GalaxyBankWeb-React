import React from 'react';
import style from './Input.module.css';

const Input = ({ text, type, value, onChange, name }) => {
  return (
    <div className={style.container}>
      <input
        className={style.inp}
        type={type}
        placeholder={text}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
