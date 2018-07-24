import { bookMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../utils/testHelpers';
import { filterAndBucket } from '../helpers';

import Alert from '../../../common/components/Alert/Alert';
import BookListBucket from '../BookListBucket/BookListBucket';
import BookListDetail from '../BookListDetail/BookListDetail';

import BookList from './BookList';

const defaultProps = {
  books: bookMocks,
  filterBy: '',
  onBookClick: jest.fn(),
  groupBooksByAuthor: false,
};

const builder = new ComponentBuilder(
  BookList, defaultProps,
);

describe('BookList', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it ('renders a flat book list when "groupBooksByAuthor" is false', () => {
    component = builder.shallowGetComponent();
    expect(component.find(Alert)).toHaveLength(0);
    expect(component.find(BookListBucket)).toHaveLength(0);
    expect(component.find(BookListDetail)).toHaveLength(bookMocks.length);
  });

  it ('renders a bucketed book list when "groupBooksByAuthor" is true', () => {
    component = builder.shallowGetComponent({ groupBooksByAuthor: true });
    const expected = filterAndBucket(bookMocks).length;
    expect(component.find(Alert)).toHaveLength(0);
    expect(component.find(BookListBucket)).toHaveLength(expected);
    expect(component.find(BookListDetail)).toHaveLength(0);
  });

  it ('renders just an Alert when no books are provided', () => {
    component = builder.shallowGetComponent({ books: [] });
    expect(component.find(Alert)).toHaveLength(1);
    expect(component.find(BookListBucket)).toHaveLength(0);
    expect(component.find(BookListDetail)).toHaveLength(0);
  });
});
