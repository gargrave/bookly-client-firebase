import React from 'react';
import { shallow } from 'enzyme';

import { authorMocks } from '../../../../utils/mocks';

import AuthorLink from './';

const defaultProps = Object.freeze({
  author: authorMocks[0],
});

function getComponent(extraProps = {}) {
  const props = Object.assign({}, defaultProps, extraProps);
  return shallow(<AuthorLink {...props} />);
}

describe('AuthorLink', () => {
  let component;

  test('matches the snapshot', () => {
    component = getComponent();
    expect(component).toMatchSnapshot();
  });

  test('renders correctly', () => {
    component = getComponent();
    expect(component.find('.bookly-author-link')).toHaveLength(1);
  });
});
