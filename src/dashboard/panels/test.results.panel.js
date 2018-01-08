let contrib = require('blessed-contrib')
let EventEmitter = require('events')
let TestResultsProcessor = require('../../data/test.results.processor')

let BasePanel = require('./base/base.panel')

class TestResultsPanel extends BasePanel {
  create () {

    this.eventEmitter = new EventEmitter()

    let control = this.grid.set(...this.coordinates, contrib.table, {
      keys: true,
      label: 'Test Files (press \'t\' to toggle view)',
      columnSpacing: 2,
      columnWidth: [40, 7, 7, 7],
      interactive: true,
      // fg: 'red',
      selectedFg: 'black',
      selectedBg: 'white'
    })

// , width: '30%'
// , height: '30%'
// , border: {type: "line", fg: "cyan"}
// , columnSpacing: 10 //in chars
// , columnWidth: [16, 12, 12] /*in chars*/

    // control.rows.on('select', () => {
    //
    //   debugger
    // })

    control.screen.key(['up', 'down'], (ch, key) => {

        if (!this.focused) {
          return
        }

        let list = control.children[1]
        let length = list.items.length
        let offset = list.childOffset

        // b.getText().split(/\s/g).filter(a=>a!=='')
        if (key.name === 'up') {
          if (offset > 0) {
            offset--
          }
          // else if (length > 0) {
          //   offset = length - 1
          // }
        }
        else {
          if (offset < (length - 1)) {
            offset++
          }
          // else {
          //   offset = 0
          // }
        }

        this.__select(offset)
      }
    )

    return control
  }

  __select (offset) {
    let list = this.control.children[1]

    if(typeof(offset) !== "number") {
      offset = list.childOffset
    }

    let item = list.items[offset]
    let contentArr = item.getText().split(/\s/g).filter(a => a !== '')

    if (this.view === 'file') {
      let file = contentArr[0]

      let result = this.data.testResults.filter(t => t.testFilePath.endsWith(file))[0]

      if (result) {
        this.eventEmitter.emit('select', result)
      }
      else {
        debugger
      }
    }
    else if (this.view === 'test') {
      let arr = contentArr.slice(0, contentArr.length - 2).join(' ')

      let duration = Number(contentArr[contentArr.length - 1])
      let testName = arr
      let testCase

      this.data.testResults.forEach(result => {
        if (!testCase) {
          let tests = result.testResults.filter(test => {
            return test.title === testName && test.duration === duration
          })

          if (tests && tests.length > 0) {
            testCase = tests
          }
        }
      })

      if (testCase && testCase.length === 1) {
        this.eventEmitter.emit('select', testCase[0])
      }
      else {
        debugger
      }
    }
  }

  onItemSelect (cb) {
    this.eventEmitter.on('select', (item) => {
      cb(item)
    })
  }

  handleData () {
    if (this.view === 'file') {
      this.control.options.columnWidth = [60, 10, 10, 10]
      return TestResultsProcessor.GetDataByTestFiles(this.data)
    }
    else if (this.view === 'test') {
      this.control.options.columnWidth = [70, 10, 10]
      return TestResultsProcessor.GetDataByTestCases(this.data)
    }
    // else if (this.view === 'suite') {
    //   this.control.options.columnWidth = [70, 10, 10]
    //   return TestResultsProcessor.GetDataByTestSuites(this.data)
    // }
  }

  onSetView() {
    this.__select()
  }
}

module.exports = TestResultsPanel
