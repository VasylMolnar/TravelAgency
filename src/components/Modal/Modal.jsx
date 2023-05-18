import React from 'react';
import ReactDOM from 'react-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Loading, Report } from 'notiflix';
import { useCreateMessageMutation } from '../../features/callCenter/callCenterApiSlice';

const Modal = ({ isOpen, setIsOpen }) => {
  //fn Api
  const [createMessage] = useCreateMessageMutation();

  const sendMessage = async values => {
    Loading.dots('');
    const { name, phone, email, text } = values;

    await createMessage({
      name: name.value,
      phone: phone.value,
      email: email.value,
      text: text.value,
    })
      .then(data => {
        Loading.remove();
        Report.success('Успішно надіслано', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error || 'Помилка', '');
      });
  };

  return ReactDOM.createPortal(
    <div className={isOpen ? 'backdropModal' : 'backdropModal is-hidden'}>
      <div className="modalContact">
        <form
          className="modal_form"
          onSubmit={e => {
            e.preventDefault();
            sendMessage(e.target.elements);
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
            <input type="tel" className="form-input" name="phone" placeholder=" " />
            <PhoneIphoneIcon className="icon" />
          </label>

          <label className="form_item">
            <span className="form_label">Пошта</span>
            <input type="email" className="form-input" name="email" placeholder=" " />
            <MailIcon className="icon" />
          </label>

          <label className="form_item ">
            <span className="form_label">Коментар</span>
            <textarea
              className="form_textarea"
              name="text"
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
