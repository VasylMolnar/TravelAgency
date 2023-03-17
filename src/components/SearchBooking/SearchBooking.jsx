import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SearchBooking = () => {
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
            onSubmit={e => {
              e.preventDefault();
              console.log('searchBooking');
            }}
          >
            <label className="form_item">
              <span className="form_label">"Місце / назва помешкання:"</span>
              <input
                type="name"
                placeholder="Буковель"
                required
                className="form-input"
                name="name"
              />
              <SearchIcon className="icon" />
            </label>

            {/* <label className="form_item">
          <span className="form_label">"Дата заїзду"</span>
          <input
            type="date"
            placeholder="Буковель"
            required
            className="form-input"
            name="data_end"
          />
          <DateRangeIcon className="icon" />
        </label>

        <label className="form_item">
          <span className="form_label">"Дата виїзду"</span>
          <input
            type="date"
            placeholder="Буковель"
            required
            className="form-input"
            name="data_off"
          />
          <CalendarMonthIcon className="icon" />
        </label> */}

            <DemoItem label="Responsive variant">
              <DatePicker defaultValue={dayjs('2022-04-17')} />
            </DemoItem>
          </form>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SearchBooking;
