import React from 'react';
import Input from '../UI/Input/Input';
import { debounce } from 'lodash';

const Search = ({ setSearch }) => {
  return (
    <form
      className="search"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Input
        className="input"
        type="text"
        placeholder="Пошук"
        onChange={debounce(e => {
          setSearch(e.target.value);
        }, 300)}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={e => {
          e.currentTarget.parentNode.reset();
          setSearch('');
        }}
      >
        Очистити
      </button>
    </form>
  );
};

export default Search;
