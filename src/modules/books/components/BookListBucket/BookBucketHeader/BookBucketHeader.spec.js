import { bookBucketMocks } from '../../../../../globals/mocks/';
import { ComponentBuilder } from '../../../../../utils/testHelpers';

import BookBucketHeader from './BookBucketHeader';

const defaultProps = {
  bucket: bookBucketMocks[0],
};

const builder = new ComponentBuilder(
  BookBucketHeader, defaultProps,
);

describe('BookBucketHeader', () => {
  let component;

  it('matches the snapshot', () => {
    component = builder.shallowGetComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    component = builder.shallowGetComponent();
    const parentClass = '.bookly-book-bucket__header';
    expect(component.find(parentClass)).toHaveLength(1);

    const authorString = `${bookBucketMocks[0].author}`;
    const matched = component.find('p').text().match(new RegExp(authorString));
    expect(matched.length).toBe(1);
  });
});
