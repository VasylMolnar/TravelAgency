import { useState, React } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';

const SearchBooking = () => {
  const [optionsHidden, setOptionsHidden] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false); //for mobile style btn

  const [options, setOptions] = useState({
    //save to localStorage
    searchValue: '',
    dataEnd: null,
    dataOff: '',
    min: '',
    max: '',
    adult: '',
    children: '',
    room: '',
  });

  const searchBooking = () => {
    console.log(options);
  };

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
            className={mobileSearch ? 'form mobile' : 'form'}
            onSubmit={e => {
              e.preventDefault();
              searchBooking();
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              className="btn-select"
            >
              {/* for mobile style btn */}
              <p className="title">Шукати</p>
              <button
                type="button"
                className="menu-button"
                aria-expanded="false"
                onClick={e => setMobileSearch(!mobileSearch)}
                style={{ paddingBottom: '20px' }}
              >
                <SwapVerticalCircleIcon />
              </button>
            </div>

            <div className={!mobileSearch ? 'form__select is-hidden' : null}>
              <label className="form_item">
                <span className="form_label">"Місце / назва помешкання:"</span>
                <input
                  type="name"
                  placeholder="Буковель"
                  className="form-input"
                  name="name"
                  value={options.searchValue}
                  onChange={e => {
                    setOptions({ ...options, searchValue: e.target.value });
                  }}
                />
                <SearchIcon className="icon" />
              </label>

              <DemoItem label="Дата заїзду" required name="data_end">
                <input
                  type="date"
                  name="dataEnd"
                  className="form-input"
                  style={{ paddingLeft: '10px' }}
                  onChange={e => console.log(e.target.value)}
                  format=""
                />
              </DemoItem>

              <DemoItem label="Дата виїзду" required name="data_off">
                <input
                  type="date"
                  name="dataOff"
                  className="form-input"
                  style={{ paddingLeft: '10px' }}
                />
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
                  className={optionsHidden ? 'options_list' : 'options_list is-hidden'}
                >
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Дорослі"
                    value={options.adult}
                    onChange={e => {
                      setOptions({ ...options, adult: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Діти"
                    value={options.children}
                    onChange={e => {
                      setOptions({ ...options, children: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Кімнати"
                    value={options.room}
                    onChange={e => {
                      setOptions({ ...options, room: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Max"
                    value={options.max}
                    onChange={e => {
                      setOptions({ ...options, max: e.target.value });
                    }}
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Min"
                    value={options.min}
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
