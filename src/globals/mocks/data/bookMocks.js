import { authorMocks } from './authorMocks'

const aldousHuxley = authorMocks[0]
const kurtVonnegut = authorMocks[1]
const stephenKing = authorMocks[4]

const bookMocks = [
  {
    id: 'sv3hmbefpc95MRXQsTHr',
    created: new Date('2018-01-14T01:36:26.220Z'),
    updated: new Date('2018-01-14T01:36:26.220Z'),
    title: 'Brave New World',
    author: aldousHuxley,
    sortBy: '',
  },
  {
    id: 'Hmh9eR3rs5bMvsTXfpcQ',
    created: new Date('2018-01-15T01:36:26.220Z'),
    updated: new Date('2018-01-15T01:36:26.220Z'),
    title: 'Island',
    author: aldousHuxley,
    sortBy: '',
  },
  {
    id: 'eRpcQ5H3rsTXfmh9bMvs',
    created: new Date('2018-01-16T01:36:26.220Z'),
    updated: new Date('2018-01-16T01:36:26.220Z'),
    title: 'The Doors of Perception',
    author: aldousHuxley,
    sortBy: '',
  },
  {
    id: 'e2TedzRQJKJ1VL5m7QhG',
    created: new Date('2017-11-01T01:36:26.220Z'),
    updated: new Date('2017-11-01T01:36:26.220Z'),
    title: 'Mother Night',
    author: kurtVonnegut,
    sortBy: '',
  },
  {
    id: '8ZYttrQY042IhlZ11BVJ',
    created: new Date('2017-11-01T01:39:26.220Z'),
    updated: new Date('2017-11-01T01:39:26.220Z'),
    title: 'Breakfast of Champions',
    author: kurtVonnegut,
    sortBy: '',
  },
  {
    id: '2IYttrQYhlZ118Z04BVJ',
    created: new Date('2017-10-01T01:39:26.220Z'),
    updated: new Date('2017-10-01T01:39:26.220Z'),
    title: 'The Gunslinger',
    author: stephenKing,
    sortBy: 'Dark Tower 1',
  },
  {
    id: '2IYt04BVltrQYhZ118ZJ',
    created: new Date('2017-10-01T01:39:26.220Z'),
    updated: new Date('2017-10-01T01:39:26.220Z'),
    title: 'The Drawing of the Three',
    author: stephenKing,
    sortBy: 'Dark Tower 2',
  },
]

const huxleyBooks = bookMocks.slice(0, 3)
const vonnegutBooks = bookMocks.slice(3, 5)

export { bookMocks, huxleyBooks, vonnegutBooks }
