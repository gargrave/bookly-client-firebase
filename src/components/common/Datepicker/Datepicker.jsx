// @flow
import React from 'react';
import { any, func } from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

type Props = {
  date: any,
  onChange: Function,
};

const Datepicker = ({
  onChange,
  date,
}: Props) => {
  return (
    <DatePicker
      isClearable
      name='startedOn'
      onChange={onChange}
      placeholderText="Click to select a date"
      readOnly
      selected={date ? moment(date) : null}
    />
  );
};

Datepicker.propTypes = {
  date: any,
  onChange: func.isRequired,
};

export default Datepicker;
