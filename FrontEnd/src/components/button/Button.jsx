import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, type }) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={onClick} type={type}>
        {text}
      </button>
    </div>
  );
};

export default Button;