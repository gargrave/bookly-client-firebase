import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import AuthorEditView from './';
import AuthorForm from '../../authors/AuthorForm';

describe('AuthorEditView', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      author: Object.create(authorMocks[0]),
      errors: {
        firstName: '',
        lastName: '',
      },
      onCancel: jest.fn(),
      onInputChange: jest.fn(),
      onSubmit: jest.fn(),
      submitDisabled: false,
      topLevelError: '',
    };

    component = shallow(<AuthorEditView {...props} />);
  });

  test('renders correctly', () => {
    const element = component.find('.author-edit-view');
    expect(component).toMatchSnapshot();
    expect(element.length).toEqual(1);
  });

  test('renders the AuthorForm component', () => {
    expect(component.find(AuthorForm).length).toEqual(1);
  });
});
