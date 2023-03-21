import React from 'react';
import css from './index.module.css';

const Input = ({ ...props }) => {
  return <input {...props} className={css.input} />;
};

export default Input;
