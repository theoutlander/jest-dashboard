describe('Index file', () => {
  test('can be required', () => {
    let index = require('./index')
    expect(index).not.toBeNull()
  })
})