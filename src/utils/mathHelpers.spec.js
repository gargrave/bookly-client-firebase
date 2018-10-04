import { clamp } from './mathHelpers'

describe('clamp', () => {
  describe('"val" is between "min" and "max"', () => {
    test('returns "val"', () => {
      expect(clamp(5, 1, 10)).toBe(5)
    })
  })

  describe('"val" is too high', () => {
    test('returns the max value', () => {
      expect(clamp(10, 1, 5)).toBe(5)
    })
  })

  describe('"val" is too low', () => {
    test('returns the max value', () => {
      expect(clamp(-1, 1, 5)).toBe(1)
    })
  })
})
