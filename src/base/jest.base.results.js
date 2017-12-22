class JestBaseResults {
  constructor (grid, coordinates) {
    this.grid = grid
    this.coordinates = coordinates
    this.control = this.create()
  }

  setData (data) {
    this.data = data
    this.controlData = this.handleData()

    if (this.controlData) {
      this.control.setData(this.controlData)
    }

    this.update()
  }

  getPassedTestSuites () {
    return this.data.numPassedTestSuites
  }

  getFailedTestSuites () {
    return this.data.numFailedTestSuites
  }

  getTotalTestSuites () {
    return this.data.numTotalTestSuites
  }

  create () {
    throw new Error('Create Not Implemented')
  }

  handleData () {
    throw new Error('HandleData Not Implemented')
  }

  update () {
    this.control.screen.render()
  }
}

module.exports = JestBaseResults
