let path = require('path')
let contrib = require('blessed-contrib')
let colors = require('colors')
const EventEmitter = require('events')

let JestBaseResults = require('../../base/jest.base.results')

class JestTestResults extends JestBaseResults {
  create () {

    this.eventEmitter = new EventEmitter()

    let control = this.grid.set(...this.coordinates, contrib.table, {
      keys: true,
      label: 'Test Files',
      columnSpacing: 2,
      columnWidth: [30, 7, 7, 7],
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
        let list = control.children[1]
        let length = list.items.length
        let offset = list.childOffset

        // b.getText().split(/\s/g).filter(a=>a!=='')
        if (key.name === 'up') {
          if (offset > 0) {
            offset--
          }
        }
        else {
          if (offset < (length - 1)) {
            offset++
          }
        }

        let item = list.items[offset]
        let contentArr = item.getText().split(/\s/g).filter(a => a !== '')

        let file = contentArr[0]

        let result = this.data.testResults.filter(t => t.testFilePath.endsWith(file))[0]

        if (result) {
          this.eventEmitter.emit('select', result)
        }
        else {
          debugger
        }
        // console.log(contentArr[0])
      }
    )

    return control
  }

  onItemSelect (cb) {
    this.eventEmitter.on('select', (item) => {
      cb(item)
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
