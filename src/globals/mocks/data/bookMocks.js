import { authorMocks } from './authorMocks'

const aldousHuxley = authorMocks[0]
const kurtVonnegut = authorMocks[1]

const bookMocks = [
  {
    id: 'sv3hmbefpc95MRXQsTHr',
    created: new Date('2018-01-14T01:36:26.220Z'),
    updated: new Date('2018-01-14T01:36:26.220Z'),
    title: 'Brave New World',
    author: aldousHuxley,
  },
  {
    id: 'Hmh9eR3rs5bMvsTXfpcQ',
    created: new Date('2018-01-15T01:36:26.220Z'),
    updated: new Date('2018-01-15T01:36:26.220Z'),
    title: 'Island',
    author: aldousHuxley,
  },
  {
    id: 'eRpcQ5H3rsTXfmh9bMvs',
    created: new Date('2018-01-16T01:36:26.220Z'),
    updated: new Date('2018-01-16T01:36:26.220Z'),
    title: 'The Doors of Perception',
    author: aldousHuxley,
  },
  {
    id: 'e2TedzRQJKJ1VL5m7QhG',
    created: new Date('2017-11-01T01:36:26.220Z'),
    updated: new Date('2017-11-01T01:36:26.220Z'),
    title: 'Mother Night',
    author: kurtVonnegut,
  },
  {
    id: '8ZYttrQY042IhlZ11BVJ',
    created: new Date('2017-11-01T01:39:26.220Z'),
    updated: new Date('2017-11-01T01:39:26.220Z'),
    title: 'Breakfast of Champions',
    author: kurtVonnegut,
  },
]

const huxleyBooks = bookMocks.slice(0, 3)
const vonnegutBooks = bookMocks.slice(3, 5)

export { bookMocks, huxleyBooks, vonnegutBooks }
