/* eslint-disable new-cap */

let blessed = require('blessed')
let contrib = require('blessed-contrib')
let strip = require('strip-color')
let colors = require('colors/safe')

let JestTestResults = require('./panels/jest.test.results')
let PassFailResults = require('./panels/jest.pass.fail.results')
let RunCountResults = require('./panels/jest.run.count.results')
let ErrorLogResults = require('./panels/jest.error.log.results')
let TestMessagesPanel = require('./panels/jest.test.messages.panel')

// function hook_stream (stream, callback) {
//   var old_write = stream.write
//
//   stream.write = (function (write) {
//     return function (string, encoding, fd) {
//       // write.apply(stream, arguments)  // comments this line if you don't want output in the console
//       callback(string, encoding, fd)
//     }
//   })(stream.write)
//
//   return function () {
//     stream.write = old_write
//   }
// }

class JestDashboard {
  constructor (data) {
    this.data = data
    this.screen = this.__createScreen()
    this.grid = this.__createGrid()

    // this.unhook_stdout = hook_stream(process.stdout, function (string, encoding, fd) {
    //   //log_file.write(string, encoding)
    //   this.unhook_stdout(string)
    //   // debugger
    // })
    //
    // this.unhook_stderr = hook_stream(process.stderr, function (string, encoding, fd) {
    //   // debugger
    //   // log_file.write(string, encoding)
    // })

    // var access = fs.createWriteStream('/var/log/node/api.access.log')
    // process.stdout.write = process.stderr.write = access.write.bind(access)

    this.__createPanels()
    this.__setKeyboardEvents()
  }

  __createPanels () {
    this.testResults = new JestTestResults(this.grid, [0, 2, 10, 3])
    this.passFailResults = new PassFailResults(this.grid, [4, 0, 6, 2])
    this.runCountResults = new RunCountResults(this.grid, [0, 0, 4, 2])
    // this.errorLogs = new ErrorLogResults(this.grid, [5, 5, 10, 6])
    this.testMessages = new TestMessagesPanel(this.grid, [0, 5, 10, 6])

    this.testResults.onItemSelect(item => {
      this.testMessages.clear()

      item.console.forEach(log => {
        let msg =`${log.origin}\n${log.message}`

        if (log.type === 'error')
        {
          msg = colors.red(msg)
        }

        this.log(msg)
      })

      if (item.failureMessage) {
        // let msg = strip(item.failureMessage).split('\n')
        let msg = item.failureMessage.split('\n')

        msg.forEach(m => {
          // this.log(m === '' ? '\n\n' : m)
          this.log(m)
        })
      }
    })

    this.testResults.control.focus()
  }

  setData (aggregatedResult) {
    this.testResults.setData(aggregatedResult)
    this.passFailResults.setData(aggregatedResult)
    this.runCountResults.setData(aggregatedResult)
  }

  log (msg) {
    //this.errorLogs.setData(msg)
    this.testMessages.setData(msg)
  }

  render () {
    this.screen.render()
  }

  __createGrid () {
    return new contrib.grid({rows: 12, cols: 12, screen: this.screen})
  }

  __createScreen () {
    process.on('uncaughtException', function (err) {
      console.error((err && err.stack) ? err.stack : err)
    })

    return blessed.screen({
      smartCSR: true,
      log: 'blessed-terminal.log',
      fullUnicode: true,
      dockBorders: true,
      ignoreDockContrast: true
    })
  }

  __setKeyboardEvents () {
    this.screen.key(['r'], () => {

      // Doesn't force a rerender....????!
      this.screen.render()
    })

    this.screen.key(['tab'], (ch, key) => {
      let item = this.screen.focused.type
      switch (item) {
        case 'list':
          this.testMessages.control.focus()
          break
        case 'box':
          this.testResults.control.focus()
          break
      }
    })

    this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0)
    })
  }

  // __createListTable () {
  //   this.__testList = this.grid.set(0, 0, 8, 8, blessed.listtable, {
  //     scrollable: true,
  //     scrollbar: {
  //       bg: 'blue'
  //     },
  //     align: 'left',
  //     draggable: false,
  //     focused: true,
  //     mouse: false,
  //     input: true,
  //     alwaysScroll: true
  //   })
  //
  //   return this.__testList
  // }

  // __renderTree () {
  //   // var tree = contrib.tree({fg: 'green'})
  //
  //   let tree = this.grid.set(0,0,3,3, contrib.tree, {fg: 'green'})
  //   //allow control the table with the keyboard
  //   tree.focus()
  //
  //   tree.on('select', function (node) {
  //     if (node.myCustomProperty) {
  //       console.log(node.myCustomProperty)
  //     }
  //     console.log(node.name)
  //   })
  //
  //   // you can specify a name property at root level to display root
  //   tree.setData(
  //     {
  //       extended: true
  //       , children:
  //         {
  //           'Fruit':
  //             {
  //               children:
  //                 {
  //                   'Banana': {}
  //                   , 'Apple': {}
  //                   , 'Cherry': {}
  //                   , 'Exotics': {
  //                     children:
  //                       {
  //                         'Mango': {}
  //                         , 'Papaya': {}
  //                         , 'Kiwi': {name: 'Kiwi (not the bird!)', myCustomProperty: 'hairy fruit'}
  //                       }
  //                   }
  //                   , 'Pear': {}
  //                 }
  //             }
  //           , 'Vegetables':
  //             {
  //               children:
  //                 {
  //                   'Peas': {}
  //                   , 'Lettuce': {}
  //                   , 'Pepper': {}
  //                 }
  //             }
  //         }
  //     })
  // }

  // __renderLineChart () {
  //   let line = contrib.line(
  //     {
  //       style:
  //         {
  //           line: 'yellow',
  //           text: 'green',
  //           baseline: 'black'
  //         },
  //       xLabelPadding: 3,
  //       xPadding: 5,
  //       label: 'Title'
  //     })
  //
  //   let data = {
  //     x: ['t1', 't2', 't3', 't4'],
  //     y: [5, 1, 7, 5]
  //   }
  //   this.screen.append(line) // must append before setting data
  //   line.setData([data])
  // }

  // __renderBox2 (title, location) {
  //   this.logger = contrib.log(
  //     {
  //       fg: 'green'
  //       , selectedFg: 'green'
  //       , label: 'Server Log'
  //     })
  //   this.screen.append(this.logger)
  //   this.logger.log('Starting log')
  // }

  // __renderTerminal () {
  //   let self = this
  //   // let topleft = blessed.terminal({
  //   //   parent: this.screen,
  //   //   cursor: 'line',
  //   //   cursorBlink: true,
  //   //   screenKeys: false,
  //   //   label: ' multiplex.js ',
  //   //   left: 0,
  //   //   top: 0,
  //   //   width: '50%',
  //   //   height: '50%',
  //   //   border: 'line',
  //   //   style: {
  //   //     fg: 'default',
  //   //     bg: 'default',
  //   //     focus: {
  //   //       border: {
  //   //         fg: 'green'
  //   //       }
  //   //     }
  //   //   }
  //   // })
  //
  //   let topright = blessed.terminal({
  //     parent: this.screen,
  //     cursor: 'block',
  //     cursorBlink: true,
  //     screenKeys: false,
  //     label: ' multiplex.js ',
  //     left: '50%-1',
  //     top: 0,
  //     width: '50%+1',
  //     height: '50%',
  //     border: 'line',
  //     style: {
  //       fg: 'red',
  //       bg: 'black',
  //       focus: {
  //         border: {
  //           fg: 'green'
  //         }
  //       }
  //     }
  //   })
  //
  //   topright.pty.on('data', function (data) {
  //     self.screen.log(JSON.stringify(data))
  //   })
  // }
}

module.exports = JestDashboard
