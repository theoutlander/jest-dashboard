let path = require('path')
let colors = require('colors')

module.exports = class TestResultsProcessor {
  static GetDataByTestFiles (data) {
    let list = data.testResults.reduce((arr, curr) => {
      let items = [path.basename(curr.testFilePath), curr.numPassingTests, curr.numFailingTests, (curr.perfStats.end - curr.perfStats.start)]
      // ALL FAILED
      if (curr.numPassingTests <= 0) {
        items = items.map(i => {
          return colors.red(i)
        })
      }
      else if (curr.numFailingTests > 0) {
        items = items.map(i => {
          return colors.yellow(i)
        })
      }
      else {
        // SOME PASSED / FAILED
        items = items.map(i => {
          return colors.green(i)
        })
      }

      return arr.concat([items])
    }, [])

    return {
      headers: ['Name', 'Passed', 'Failed', 'Time (ms)'],
      data: list,
      label: 'Test Files (press \'t\' to toggle view)'
    }
  }

  static GetDataByTestCases (data) {
    let list = data.testResults.reduce((arr, curr) => {
      let items = curr.testResults.map(test => {
        let arr = [test.title, test.failureMessages.length, test.duration]

        if (test.failureMessages.length > 0) {
          arr = arr.map(item => colors.red(item))
        }
        return arr
      })

      return arr.concat(items)
    }, [])

    return {
      headers: ['Name', 'Failed', 'Time (ms)'],
      data: list,
      label: 'Test Cases (press \'t\' to toggle view)'
    }
  }

  // static GetDataByTestSuites (data) {
  //   let list = data.testResults.reduce((arr, curr) => {
  //
  //     let result = curr.testResults.reduce(function (arr, test) {
  //       arr.push([test.ancestorTitles.join(' -> '), test.failureMessages.length, test.duration])
  //       return arr
  //     }, [])
  //
  //     return arr.concat(result)
  //   }, [])
  //
  //   let obj = {}
  //   for (let item of list) {
  //     if (!obj[item[0]]) {
  //       obj[item[0]] = item
  //     }
  //     else {
  //       let tmp = obj[item[0]]
  //
  //       tmp[1] += item[1]
  //       tmp[2] += item[2]
  //
  //       obj[item[0]] = tmp
  //     }
  //   }
  //
  //   let aggList = []
  //   for (let o in obj) {
  //     aggList.push(obj[o])
  //   }
  //
  //   aggList = aggList.map(item => {
  //     if (item[1] > 0) {
  //       item = item.map(item => colors.red(item))
  //     }
  //
  //     return item
  //   })
  //
  //   return {
  //     headers: ['Name', 'Failed', 'Time (ms)'],
  //     data: aggList,
  //     label: 'Test Suites (press \'t\' to toggle view)'
  //   }
  // }
}
