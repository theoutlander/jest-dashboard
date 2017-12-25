let Dashboard = require('../dashboard/jest.dashboard')

class JestDashboardReporter {
  constructor (globalConfig, options) {
    // console.log('constructor')
    this._globalConfig = globalConfig
    this._options = options

    this.dashboard = new Dashboard()
  }

  onRunStart (result, options) {
    this.dashboard.render()
    // console.log('On Run start: ')
    // this.dashboard.log("On Start")

    // this.dashboard.setTestList()
  }

  onTestStart (test) {
    // this.dashboard.log('On test Start')
// console.log('On Test start: ')
  }

  onTestResult (test, testResult, aggregatedResult) {
    // console.log('On Test result: ')

    if (testResult.testExecError) {
      // return this.handleExecError(testResult);
      this.dashboard.log(testResult.testExecError)
    }

    // if (testResult.failureMessage) {
    //   let messages = testResult.testResults.map(t => {
    //     return t.failureMessages
    //   }).reduce((arr, curr) => {
    //     if (curr.length <= 0) {
    //       return arr
    //     }
    //
    //     return arr.concat(curr)
    //   }, [])
    //
    //   this.dashboard.log(aggregatedResult.testResults[0].failureMessage )
    //   messages.forEach(m => {
    //     this.dashboard.log(m)
    //   })
    //   // return this.handleExecError(testResult);
    // }

    // if (testResult.console) {
    //   testResult.console.forEach((log, origin, type) => {
    //     this.dashboard.log(`${origin}:\n\t${log}\n\n`, type)
    //     // this.dashboard.log(colorizeLog(`${origin}:\n\t${message}\n\n`, type)),
    //   })
    // }

    this.dashboard.setData(aggregatedResult)
  }

  onRunComplete (contexts, results) {
    // console.log('On Run Complete:')
    // console.log('GlobalConfig: ', this._globalConfig)
    // console.log('Options: ', this._options)
    //

  }

  getLastError () {
    // console.log('On Get Last Error')
    if (this._shouldFail) {
      return new Error('my-custom-reporter.js reported an error')
    }
  }
}

module.exports = JestDashboardReporter
