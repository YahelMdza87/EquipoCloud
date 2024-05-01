const { truncate } = require('./string-format')

test('truncates a string correctly', () => {
  expect(truncate("I am going home", 6)).toBe('I am g...')
})