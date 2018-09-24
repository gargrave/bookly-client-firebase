import { sortBooks } from './helpers'

const book = (title, lastName, sortBy = '') => ({
  author: {
    lastName,
  },
  sortBy,
  title,
})

describe('Books helpers', () => {
  describe('sortBooks', () => {
    it('sortBooks', () => {
      expect(sortBooks).toBeDefined()
    })

    it('correctly sorts by title and author last name (no custom sort)', () => {
      const inBooks = [
        book('Title C', 'Author A'),
        book('Title C', 'Author B'),
        book('Title C', 'Author C'),
        book('Title A', 'Author C'),
        book('Title A', 'Author B'),
        book('Title A', 'Author A'),
        book('Title B', 'Author B'),
        book('Title B', 'Author A'),
        book('Title B', 'Author C'),
      ]
      const outBooks = [
        book('Title A', 'Author A'),
        book('Title B', 'Author A'),
        book('Title C', 'Author A'),
        book('Title A', 'Author B'),
        book('Title B', 'Author B'),
        book('Title C', 'Author B'),
        book('Title A', 'Author C'),
        book('Title B', 'Author C'),
        book('Title C', 'Author C'),
      ]
      expect(sortBooks(inBooks)).toEqual(outBooks)
    })

    it('correctly sorts by custom sort fields', () => {
      const inBooks = [
        book('Title E', 'Author A', 'sort b'),
        book('The Wind Through the Keyhole', 'King', 'Dark Tower 4.5'),
        book('Title AB', 'Author B', 'sortby 3'),
        book('The Drawing of the Three', 'King', 'Dark Tower 2'),
        book('Title B', 'Author A', 'sort c'),
        book('The Dark Tower', 'King', 'Dark Tower 7'),
        book('Title A', 'Author A', 'sort d'),
        book('Title C', 'Author A'),
        book('BBB', 'Author A'),
        book('The AAA', 'Author A'),
        book('Title AC', 'Author B', 'sortby 2'),
        book('Wolves of the Callah', 'King', 'Dark Tower 5'),
        book('Title C', 'Author A', 'sort a'),
        book('Title AC', 'Author B', 'sort A'),
        book('Wizard and Glass', 'King', 'Dark Tower 4'),
        book('The Gunslinger', 'King', 'Dark Tower 1'),
        book('Title AC', 'Author B'),
        book('Title D', 'Author A', 'sort b'),
        book('Title A', 'Author A'),
        book('Title F', 'Author B', 'sortby 1'),
        book('The Wastelands', 'King', 'Dark Tower 3'),
        book('Song of Susannah', 'King', 'Dark Tower 6'),
      ]
      const outBooks = [
        book('The AAA', 'Author A'),
        book('BBB', 'Author A'),
        book('Title A', 'Author A'),
        book('Title C', 'Author A'),
        book('Title C', 'Author A', 'sort a'),
        book('Title D', 'Author A', 'sort b'),
        book('Title E', 'Author A', 'sort b'),
        book('Title B', 'Author A', 'sort c'),
        book('Title A', 'Author A', 'sort d'),
        book('Title AC', 'Author B'),
        book('Title AC', 'Author B', 'sort A'),
        book('Title F', 'Author B', 'sortby 1'),
        book('Title AC', 'Author B', 'sortby 2'),
        book('Title AB', 'Author B', 'sortby 3'),
        book('The Gunslinger', 'King', 'Dark Tower 1'),
        book('The Drawing of the Three', 'King', 'Dark Tower 2'),
        book('The Wastelands', 'King', 'Dark Tower 3'),
        book('Wizard and Glass', 'King', 'Dark Tower 4'),
        book('The Wind Through the Keyhole', 'King', 'Dark Tower 4.5'),
        book('Wolves of the Callah', 'King', 'Dark Tower 5'),
        book('Song of Susannah', 'King', 'Dark Tower 6'),
        book('The Dark Tower', 'King', 'Dark Tower 7'),
      ]
      expect(sortBooks(inBooks)).toEqual(outBooks)
    })
  })
})
