let JestBaseResults = require('../../base/jest.base.results')
let contrib = require('blessed-contrib')

class RunCountResults extends JestBaseResults {
  create () {
    let guage = this.grid.set(...this.coordinates, contrib.gauge, {
      label: 'Total Run',
      showLabel: false
    })

    guage.setStack([{percent: 100, stroke: 'blue'}])

    return guage
  }

  handleData () {
    let passed = this.getPassedTestSuites()
    let failed = this.getFailedTestSuites()
    let total = this.getTotalTestSuites()
    // // let pending = total - passed - failed

    let passedPercentage = Math.round((1 - (total - passed) / total) * 100)
    let failedPercentage = Math.round((1 - (total - failed) / total) * 100)
    let remaining = Math.round(100 - passedPercentage - failedPercentage)

    let data = []

    if (passedPercentage > 0) {
      data.push({percent: passedPercentage, stroke: 'green'})
    }

    if (failedPercentage > 0) {
      data.push({percent: failedPercentage, stroke: 'red'})
    }

    if (remaining > 0) {
      data.push({percent: remaining, stroke: 'blue'})
    }

    return data

    // return [
    //   {percent: passedPercentage, label: 'Passed', 'color': 'green'},
    //   {percent: failedPercentage, label: 'Failed', 'color': 'red'}
    // ]
    //
    // if (failedPercentage === 0 && remaining === 0) {
    //   return [{percent: passedPercentage, label: 'PASSED', stroke: 'green'}]
    // }
    // debugger
    // this.control.setData([{percent: passedPercentage, stroke: 'green'},
    //   {percent: failedPercentage, stroke: 'red'},
    //   {percent: remaining, stroke: 'magenta'}])
    //
    // return false
  }
}

module.exports = RunCountResults
