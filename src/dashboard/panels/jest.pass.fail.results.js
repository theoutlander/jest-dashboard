let JestBaseResults = require('../../base/jest.base.results')
let contrib = require('blessed-contrib')

class PassFailResults extends JestBaseResults {
  create () {
    return this.grid.set(...this.coordinates, contrib.donut, {
      label: 'Test',
      radius: 8,
      arcWidth: 3,
      remainColor: 'black',
      yPadding: 2,
      data: [
        {percent: 0, label: 'Passed', 'color': 'green'},
        {percent: 0, label: 'Failed', 'color': 'red'}
      ]
    })
  }

  handleData () {
    let passed = this.getPassedTestSuites()
    let failed = this.getFailedTestSuites()
    let total = this.getTotalTestSuites()
    // let pending = total - passed - failed
    let passedPercentage = Math.round((1 - (total - passed) / total) * 100)
    let failedPercentage = Math.round((1 - (total - failed) / total) * 100)

    return [
      {percent: passedPercentage, label: 'Passed', 'color': 'green'},
      {percent: failedPercentage, label: 'Failed', 'color': 'red'}
    ]
  }
}

module.exports = PassFailResults
