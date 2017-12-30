import React from 'react';
import { shallow } from 'enzyme';

import Alert from './';

describe('InfoAlert', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      message: 'This is the message.',
      type: 'primary',
    };
  });

  it('renders correctly as an "info" alert', () => {
    props.type = 'info';
    wrapper = shallow(<Alert {...props} />);
    expect(wrapper.hasClass('bookly-alert')).toBeTruthy();
    expect(wrapper.hasClass('alert-info')).toBeTruthy();
    expect(wrapper.text()).toEqual(props.message);
  });

  it('renders correctly as an "danger" alert', () => {
    props.type = 'danger';
    wrapper = shallow(<Alert {...props} />);
    expect(wrapper.hasClass('bookly-alert')).toBeTruthy();
    expect(wrapper.hasClass('alert-danger')).toBeTruthy();
    expect(wrapper.text()).toEqual(props.message);
  });
});
