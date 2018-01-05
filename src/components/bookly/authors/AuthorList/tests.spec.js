import React from 'react';
import { mount, shallow } from 'enzyme';

import Alert from '../../../common/Alert';
import AuthorList from './';
import AuthorListDetail from '../../../bookly/authors/AuthorListDetail';

describe('AuthorList', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      authors: [
        { id: 0, firstName: 'A', lastName: 'B', bookCount: 1 },
        { id: 1, firstName: 'C', lastName: 'D', bookCount: 1 },
        { id: 2, firstName: 'E', lastName: 'F', bookCount: 1 },
      ],
      onAuthorClick: jest.fn(),
    };
  });

  it('matches the snapshot', () => {
    wrapper = shallow(<AuthorList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the correct number of AuthorListDetail wrappers', () => {
    wrapper = mount(<AuthorList {...props} />);
    expect(wrapper.find(AuthorListDetail)).toHaveLength(props.authors.length);
    expect(wrapper.find(Alert)).toHaveLength(0);
  });

  it('renders a nice message when there are no authors', () => {
    props.authors = [];
    wrapper = mount(<AuthorList {...props} />);
    expect(wrapper.find(AuthorListDetail)).toHaveLength(0);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
