let path = require('path')
let contrib = require('blessed-contrib')
let colors = require('colors')

let JestBaseResults = require('../../base/jest.base.results')

class JestTestResults extends JestBaseResults {
  create () {
    return this.grid.set(...this.coordinates, contrib.table, {
      keys: true,
      label: 'Test Files',
      columnSpacing: 2,
      columnWidth: [30, 7, 7, 7],
      interactive: true

      //
      // scrollable: true,
      // scrollbar: {
      //   bg: 'blue'
      // },
      // align: 'left',
      // draggable: false,
      // focused: true,
      // mouse: false,
      // input: true,
      // alwaysScroll: true
    })
  }

  handleData () {
    let list = this.data.testResults.reduce((arr, curr) => {
      let items = [path.basename(curr.testFilePath), curr.numPassingTests, curr.numFailingTests, curr.numPendingTests]
      // return arr.concat([[path.basename(curr.testFilePath), curr.numPassingTests, curr.numFailingTests, curr.numPendingTests]])

      // ALL PASSED
      // if (curr.numFailingTests <= 0) {
      //   // DO NOTHING
      // }
      // ALL FAILED
      if (curr.numPassingTests <= 0) {
        items = items.map(i => {
          return colors.red(i)
        })
      } else {
        // SOME PASSED / FAILED
        items = items.map(i => {
          return colors.yellow(i)
        })
      }

      return arr.concat([items])
    }, [])

    return {
      headers: ['File', 'Passed', 'Failed', 'Pending'],
      data: list
    }
  }
}

module.exports = JestTestResults
