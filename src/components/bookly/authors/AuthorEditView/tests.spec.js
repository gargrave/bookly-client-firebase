import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks/';

import AuthorEditView from './';
import AuthorForm from '../../authors/AuthorForm';

const defaultProps = Object.freeze({
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
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorEditView {...props} />);
}

describe('AuthorEditView', () => {
  let component;

  it('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = getComponent();
    const element = component.find('.author-edit-view');
    expect(element).toHaveLength(1);
  });

  it('renders the AuthorForm component', () => {
    component = getComponent();
    expect(component.find(AuthorForm)).toHaveLength(1);
  });
});
