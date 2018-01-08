describe('Index file one', () => {
  describe('Index file two', () => {
    describe('Index file three', () => {
      test('can be required', () => {
        expect.assertions(1)
        let index = require('./index')
        expect(index).not.toBeNull()
      })
    })
  })

  describe('Index file four', () => {
    describe('Index file five', () => {
      test('can be required', () => {
        expect.assertions(1)
        let index = require('./index')
        expect(index).not.toBeNull()
      })


      test('can be required again', () => {
        expect.assertions(1)
        let index = require('./index')
        expect(index).not.toBeNull()
      })


      test('and again', () => {
        expect.assertions(1)
        let index = require('./index')
        expect(index).not.toBeNull()
      })
    })
  })
})