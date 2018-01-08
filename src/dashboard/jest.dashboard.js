/* eslint-disable new-cap */

let blessed = require('blessed')
let contrib = require('blessed-contrib')
let colors = require('colors/safe')

let TestResultsPanel = require('./panels/test.results.panel')
let PassFailPanel = require('./panels/pass.fail.panel')
let RunCountPanel = require('./panels/run.count.panel')
let ConsoleMessagesPanel = require('./panels/console.messages.panel')

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
    this.states = [0, 1]
    this.state = 0

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

    this.panels = this.__createPanels()
    this.__setKeyboardEvents()
  }

  __createPanels () {
    this.testResultsPanel = new TestResultsPanel(this.grid, [0, 2, 10, 5])
    this.passFailPanel = new PassFailPanel(this.grid, [4, 0, 6, 2])
    this.runCountPanel = new RunCountPanel(this.grid, [0, 0, 4, 2])
    // this.errorLogs = new ErrorLogResults(this.grid, [5, 5, 10, 6])
    this.consoleMessagesPanel = new ConsoleMessagesPanel(this.grid, [0, 7, 10, 5])

    this.testResultsPanel.onItemSelect(item => {
      this.consoleMessagesPanel.clear()
      if (item.console) {
        item.console.forEach(log => {
          let msg = `${log.origin}\n${log.message}`

          if (log.type === 'error') {
            msg = colors.red(msg)
          }

          this.log(msg)
        })
      }

      if (item.failureMessage) {
        // let msg = strip(item.failureMessage).split('\n')
        let msg = item.failureMessage.split('\n')

        msg.forEach(m => {
          // this.log(m === '' ? '\n\n' : m)
          this.log(m)
        })
      }

      if (item.failureMessages) {
        item.failureMessages.forEach(msg => {
          this.log(msg)
        })
      }
    })

    this.testResultsPanel.focus()

    return [
      this.testResultsPanel,
      this.passFailPanel,
      this.runCountPanel,
      this.consoleMessagesPanel
    ]
  }

  setData (aggregatedResult) {
    this.testResultsPanel.setData(aggregatedResult)
    this.passFailPanel.setData(aggregatedResult)
    this.runCountPanel.setData(aggregatedResult)
  }

  log (msg) {
    //this.errorLogs.setData(msg)
    this.consoleMessagesPanel.setData(msg)
  }

  render () {
    this.screen.render()
  }

  __createGrid () {
    return new contrib.grid({
      rows: 12,
      cols: 12,
      screen: this.screen,
      style: {
        bg: 'red',
        border: {
          fg: 'blue'
        }
      }
    })
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

      // We can refine this by comparing the control label
      // That way it can be more dynamic
      // Based on an attribute, we can automatically cycle through all focusable components

      //this.testMessages.control._label
      //this.testMessages.control.options.label
      switch (item) {
        case 'list':
          this.testResultsPanel.unfocus()
          this.consoleMessagesPanel.focus()
          break
        case 'box':
          this.consoleMessagesPanel.unfocus()
          this.testResultsPanel.focus()
          break
      }
    })

    this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0)
    })

    this.screen.key(['t'], (ch, key) => {
      this.state++
      if (this.state >= this.states.length) {
        this.state = 0
      }

      let view = 'none'

      switch (this.state) {
        case 0:
          view = 'file'
          break
        // case 1:
        //   view='suite'
        //   break
        case 1:
          view = 'test'
          break
      }

      this.panels.forEach(p => {
        p.setView(view)
      })
    })
  }
}

module.exports = JestDashboard
