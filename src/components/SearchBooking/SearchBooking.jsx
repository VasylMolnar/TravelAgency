import { useState, React } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';

const SearchBooking = () => {
  const [optionsHidden, setOptionsHidden] = useState(false);
  const [menuHidden, setMenuHidden] = useState(false);

  const [options, setOptions] = useState({
    min: '0',
    max: '100',
    adult: '1',
    children: '0',
    room: '1',
  });

  return (
    <div className="searchBooking">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
            'MobileDatePicker',
            'DesktopDatePicker',
            'StaticDatePicker',
          ]}
        >
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              console.log('searchBooking');
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p className="title">Шукати</p>
              <button
                type="button"
                className="menu-button"
                aria-expanded="false"
                onclick={e => setMenuHidden(!menuHidden)}
                style={{ paddingBottom: '20px' }}
              >
                <SwapVerticalCircleIcon />
              </button>
            </div>

            <div className="form__select ">
              <label className="form_item">
                <span className="form_label">"Місце / назва помешкання:"</span>
                <input
                  type="name"
                  placeholder="Буковель"
                  className="form-input"
                  name="name"
                />
                <SearchIcon className="icon" />
              </label>

              <DemoItem label="Дата заїзду" required name="data_end">
                <DatePicker />
              </DemoItem>

              <DemoItem label="Дата виїзду" required name="data_off">
                <DatePicker />
              </DemoItem>

              <div className="options">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={e => {
                    e.stopPropagation();
                    setOptionsHidden(!optionsHidden);
                  }}
                >
                  Опції
                </button>

                <div
                  className={
                    optionsHidden ? 'options_list' : 'options_list is-hidden'
                  }
                >
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Дорослі"
                    onChange={e => {
                      setOptions({ ...options, adult: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Діти"
                    onChange={e => {
                      setOptions({ ...options, children: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Кімнати"
                    onChange={e => {
                      setOptions({ ...options, room: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Max"
                    onChange={e => {
                      setOptions({ ...options, max: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Min"
                    onChange={e => {
                      setOptions({ ...options, min: e.target.value });
                    }}
                  />
                </div>
              </div>

              <button className="btn btn-primary">Знайти</button>
            </div>
          </form>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SearchBooking;
