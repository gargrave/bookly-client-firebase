// @flow
import React from 'react';
import { func, object } from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

type Props = {
  onChange: Function,
  startDate: Object,
};

const Datepicker = ({
  onChange,
  startDate,
}: Props) => {
  return (
    <DatePicker
      onChange={onChange}
      selected={moment(startDate)}
    />
  );
};

Datepicker.propTypes = {
  onChange: func.isRequired,
  startDate: object.isRequired,
};

export default Datepicker;
