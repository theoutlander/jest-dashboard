describe('Base Panel', () => {
  test('Loads', async () => {
    expect.assertions(3)
    let base = require('./base.panel')

    base.prototype.create = jest.fn()

    let instance = new base()

    console.log('Starting to validate content')
    expect(instance).not.toBeNull()

    expect(base.prototype.create).toBeCalled()

    expect(Promise.reject(() => {base.handleData()})).rejects.toThrow()  // toThrowError('HandleData Not Implemented')
    // await expect(Promise.reject(() => {new base()})).toThrowError('Create Not Implemented')

    //let instance = new base()
    // expect(12).toBeNull()
    // await expect(Promise.rejescts(instance.creates)).toThrow('Create Not Implemented')
  })

  test('Loads Again', async () => {
    expect.assertions(3)
    let base = require('./base.panel')

    base.prototype.create = jest.fn()

    let instance = new base()

    console.log('Starting to validate content a second time')
    expect(instance).not.toBeNull()

    expect(base.prototype.create).toBeCalled()

    expect(Promise.reject(() => {base.handleData()})).rejects.toThrow()  // toThrowError('HandleData Not Implemented')
    // await expect(Promise.reject(() => {new base()})).toThrowError('Create Not Implemented')

    //let instance = new base()
    // expect(12).toBeNull()
    // await expect(Promise.rejescts(instance.creates)).toThrow('Create Not Implemented')
  })
})