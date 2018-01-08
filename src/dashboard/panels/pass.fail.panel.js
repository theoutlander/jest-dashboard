let BasePanel = require('./base/base.panel')
let contrib = require('blessed-contrib')

class PassFailPanel extends BasePanel {
  create () {
    return this.grid.set(...this.coordinates, contrib.donut, {
      label: 'Pass/Fail Rate',
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
    let passed
    let failed
    let total

    if (this.view == 'file') {
      passed = this.getPassedTestFiles()
      failed = this.getFailedTestFiles()
      total = this.getTotalTestFiles()
    }
    else if (this.view == 'test') {
      passed = this.getPassedTests()
      failed = this.getFailedTests()
      total = this.getTotalTests()
    }

    let passedPercentage = Math.round((1 - (total - passed) / total) * 100)
    let failedPercentage = Math.round((1 - (total - failed) / total) * 100)

    return [
      {percent: passedPercentage, label: 'Passed', 'color': 'green'},
      {percent: failedPercentage, label: 'Failed', 'color': 'red'}
    ]


  // //
  //   if (this.view === 'file') {
  //     this.control.options.columnWidth = [60, 10, 10, 10]
  //     return TestResultsProcessor.GetDataByTestFiles(this.data)
  //   }
  //   else if (this.view === 'test') {
  //     this.control.options.columnWidth = [70, 10, 10]
  //     return TestResultsProcessor.GetDataByTestCases(this.data)
  //   }
  //   else if (this.view === 'suite') {
  //     this.control.options.columnWidth = [70, 10, 10]
  //     return TestResultsProcessor.GetDataByTestSuites(this.data)
  //   }
  }
}

module.exports = PassFailPanel
