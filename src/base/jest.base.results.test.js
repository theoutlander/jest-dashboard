describe('Jest Base Results', () => {
  test('Loads', async () => {
    let base = require('./jest.base.results')

    base.prototype.create = jest.fn()

    let instance = new base()

    console.log("Starting to validate content")
    expect(instance).not.toBeNull()

    expect(base.prototype.create).toBeCalled()

    expect(Promise.reject(() => {base.handleData()})).rejects.toThrow()  // toThrowError('HandleData Not Implemented')
    // await expect(Promise.reject(() => {new base()})).toThrowError('Create Not Implemented')

    //let instance = new base()
    // expect(12).toBeNull()
    // await expect(Promise.rejescts(instance.creates)).toThrow('Create Not Implemented')
  })

  test('Loads Again', async ()=> {
    let base = require('./jest.base.results')

    base.prototype.create = jest.fn()

    let instance = new base()

    console.log("Starting to validate content a second time")
    expect(instance).not.toBeNull()

    expect(base.prototype.create).toBeCalled()

    expect(Promise.reject(() => {base.handleData()})).rejects.toThrow()  // toThrowError('HandleData Not Implemented')
    // await expect(Promise.reject(() => {new base()})).toThrowError('Create Not Implemented')

    //let instance = new base()
    // expect(12).toBeNull()
    // await expect(Promise.rejescts(instance.creates)).toThrow('Create Not Implemented')
  })
})