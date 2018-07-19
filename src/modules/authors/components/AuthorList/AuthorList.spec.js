import React from 'react';
import { shallow } from 'enzyme';

import Alert from '../../../common/components/Alert/Alert';
import AuthorList from './AuthorList';
import AuthorListDetail from '../AuthorListDetail';

const defaultProps = Object.freeze({
  authors: [
    { id: 0, firstName: 'A', lastName: 'B', bookCount: 1 },
    { id: 1, firstName: 'C', lastName: 'D', bookCount: 1 },
    { id: 2, firstName: 'E', lastName: 'F', bookCount: 1 },
  ],
  onAuthorClick: jest.fn(),
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorList {...props} />);
}

describe('AuthorList', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders the correct number of AuthorListDetail components', () => {
    component = getComponent();
    expect(component.find(AuthorListDetail)).toHaveLength(defaultProps.authors.length);
    expect(component.find(Alert)).toHaveLength(0);
  });

  test('renders a nice message when there are no authors', () => {
    component = getComponent({ authors: [] });
    expect(component.find(AuthorListDetail)).toHaveLength(0);
    expect(component.find(Alert)).toHaveLength(1);
  });
});
