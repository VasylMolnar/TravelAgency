import React from 'react';
import ReactDOM from 'react-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const Modal = ({ isOpen, setIsOpen }) => {
  return ReactDOM.createPortal(
    <div className={isOpen ? 'backdropModal' : 'backdropModal is-hidden'}>
      <div className="modalContact">
        <form
          className="modal_form"
          onSubmit={e => {
            e.preventDefault();
            console.log('Modal');
          }}
        >
          <p className="title">Залиште свої дані, ми вам передзвонимо</p>

          <label className="form_item">
            <span className="form_label">Ім'я</span>
            <input type="text" className="form-input" name="name" />
            <AccountBoxIcon className="icon" />
          </label>

          <label className="form_item">
            <span className="form_label">Телефон</span>
            <input
              type="tel"
              className="form-input"
              name="phone"
              placeholder=" "
            />
            <PhoneIphoneIcon className="icon" />
          </label>

          <label className="form_item">
            <span className="form_label">Пошта</span>
            <input
              type="email"
              className="form-input"
              name="mail"
              placeholder=" "
            />
            <MailIcon className="icon" />
          </label>

          <label className="form_item ">
            <span className="form_label">Коментар</span>
            <textarea
              className="form_textarea"
              name="comment"
              placeholder="Введіть текст"
            ></textarea>
          </label>

          <button type="submit" className="btn btn-outline-primary">
            Надіслати
          </button>
        </form>

        <button
          type="submit"
          className="btn btn-close"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
