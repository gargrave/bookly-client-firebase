import { bookBucketMocks } from '../../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../../utils/testHelpers';

import BookListDetail from '../../BookListDetail/BookListDetail';

import BookBucketBooks from './BookBucketBookList';

const defaultProps = {
  bucket: bookBucketMocks[0],
  onBookClick: jest.fn(),
};

const builder = new ComponentBuilder(
  BookBucketBooks, defaultProps,
);

describe('BookBucketBooks', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it ('renders the correct number of BookListDetail children', () => {
    const bookCount = bookBucketMocks[0].books.length;
    expect(component.find(BookListDetail)).toHaveLength(bookCount);
  });
});
