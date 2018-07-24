import { bookBucketMocks } from '../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../utils/testHelpers';

import BookBucketBookList from './BookBucketBookList/BookBucketBookList';
import BookBucketHeader from './BookBucketHeader/BookBucketHeader';

import BookListBucket from './BookListBucket';

const defaultProps = {
  bucket: bookBucketMocks[0],
  onBookClick: jest.fn(),
};

const builder = new ComponentBuilder(
  BookListBucket, defaultProps,
);

describe('BookListBucket', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    const parentClass = '.bookly-book-bucket';
    expect(component.find(parentClass)).toHaveLength(1);
  });

  it ('renders one BookBucketHeader', () => {
    expect(component.find(BookBucketHeader)).toHaveLength(1);
  });

  it ('renders one BookBucketBookList', () => {
    expect(component.find(BookBucketBookList)).toHaveLength(1);
  });
});
