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
    const authorString = `${bookBucketMocks[0].author}`;
    const matched = component.find('div').text().match(new RegExp(authorString));
    expect(matched.length).toBe(1);
  });
});
