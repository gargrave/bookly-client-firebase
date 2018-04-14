import { authorMocks } from './authorMocks';
import { huxleyBooks, vonnegutBooks } from './bookMocks';

const huxley = authorMocks[0];
const huxleyKey = `${huxley.firstName} ${huxley.lastName}`;

const vonnegut = authorMocks[1];
const vonnegutKey = `${vonnegut.firstName} ${vonnegut.lastName}`;

const bookBucketMocks = [
  {
    author: huxleyKey,
    books: huxleyBooks,
  },
  {
    author: vonnegutKey,
    books: vonnegutBooks,
  },
];

export {
  bookBucketMocks,
};
