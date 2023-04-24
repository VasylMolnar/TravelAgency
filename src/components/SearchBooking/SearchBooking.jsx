import { useState, React } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const SearchBooking = ({ options, setOptions }) => {
  const [optionsHidden, setOptionsHidden] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false); //for mobile style btn

  const searchBooking = async e => {
    e.preventDefault();

    const { searchValue, adult, dataOff, dataEnd, children, min, max, room } =
      e.currentTarget.elements;

    await setOptions({
      ...options,
      ...{
        searchValue: searchValue.value,
        adult: adult.value,
        dataOff: dataOff.value,
        dataEnd: dataEnd.value,
        children: children.value,
        min: min.value,
        max: max.value,
        room: room.value,
      },
    });

    sessionStorage.setItem('searchValues', JSON.stringify(options));
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
              searchBooking(e);
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
                  name="searchValue"
                />
                <SearchIcon className="icon" />
              </label>

              <DemoItem label="Дата заїзду" name="data_end">
                <input
                  type="date"
                  name="dataEnd"
                  className="form-input"
                  style={{ paddingLeft: '10px' }}
                />
              </DemoItem>

              <DemoItem label="Дата виїзду" name="data_off">
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
                    name="adult"
                    min="1"
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Діти"
                    name="children"
                    min="0"
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Кімнати"
                    name="room"
                    min="1"
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Max"
                    name="max"
                    min="0"
                  />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '10px' }}
                    type="number"
                    placeholder="Min"
                    name="min"
                  />
                </div>
              </div>

              <div className="btnList">
                <button type="submit" className="btn btn-primary">
                  Знайти
                </button>
              </div>
            </div>
          </form>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SearchBooking;
