import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [image, setImage] = useState('');

  const handleImageChange = EventTarget => {
    setImage(EventTarget.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (image.trim() === '') {
      toast.error('Введите название изображения!', {
        position: 'top-left',
        theme: 'colored',
      });
      return;
    }
    onSubmit(image);
    setImage('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={image}
          onChange={handleImageChange}
        />
      </form>
    </header>
  );
}

Searchbar.propType = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
