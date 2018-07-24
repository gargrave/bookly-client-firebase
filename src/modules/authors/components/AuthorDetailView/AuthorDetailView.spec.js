import { ComponentBuilder } from '../../../../utils/testHelpers';

import { authorMocks, bookMocks } from '../../../../globals/mocks/';

import AuthorDetailCard from './AuthorDetailCard/AuthorDetailCard';

import AuthorDetailView from './AuthorDetailView';

const defaultProps = {
  author: { ...authorMocks[0] },
  booksForAuthor: bookMocks,
  onBackClick: jest.fn(),
  onBookClick: jest.fn(),
  onBookAddClick: jest.fn(),
  onDeleteClick: jest.fn(),
  onEditClick: jest.fn(),
  topLevelError: '',
};

const builder = new ComponentBuilder(
  AuthorDetailView, defaultProps,
);

describe('AuthorDetailView', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    expect(component.find('.bookly-author-detail-view')).toHaveLength(1);
    expect(component.find(AuthorDetailCard)).toHaveLength(1);
  });
});
