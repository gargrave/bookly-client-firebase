import { ComponentBuilder } from '../../../../utils/testHelpers';

import Alert from '../../../common/components/Alert/Alert';
import AuthorListDetail from '../AuthorListDetail/AuthorListDetail';

import AuthorList from './AuthorList';

const defaultProps = {
  authors: [
    { id: 0, firstName: 'A', lastName: 'B', bookCount: 1 },
    { id: 1, firstName: 'C', lastName: 'D', bookCount: 1 },
    { id: 2, firstName: 'E', lastName: 'F', bookCount: 1 },
  ],
  onAuthorClick: jest.fn(),
};

const builder = new ComponentBuilder(
  AuthorList, defaultProps,
);

describe('AuthorList', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders the correct number of AuthorListDetail components', () => {
    component = builder.shallowGetComponent();
    expect(component.find(AuthorListDetail)).toHaveLength(defaultProps.authors.length);
    expect(component.find(Alert)).toHaveLength(0);
  });

  it('renders a nice message when there are no authors', () => {
    component = builder.shallowGetComponent({ authors: [] });
    expect(component.find(AuthorListDetail)).toHaveLength(0);
    expect(component.find(Alert)).toHaveLength(1);
  });
});
