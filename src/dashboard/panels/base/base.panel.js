class BasePanel {
  constructor (grid, coordinates) {
    this.grid = grid
    this.coordinates = coordinates
    this.view = 'file'

    this.control = this.create()
    this.setStyle()

    if (this.control) {
      this.control.on('focus', function () {
        // debugger
      })
    }
  }

  setStyle () {
    if (this.control) {
      this.control.style.border.fg = 'blue'
      this.control.style.border.bg = null
      this.control._label.style.fg = 'blue'
      this.control._label.style.bg = null
    }
  }

  setLabel (name) {
    if (this.control && name) {
      this.control.setLabel(name)
    }
  }

  backupStyle () {
    this.control.backup = {
      _label: {
        style: {
          fg: this.control._label.style.fg,
          bg: this.control._label.style.bg
        }
      },
      style: {
        border: {
          fg: this.control.style.border.fg,
          bg: this.control.style.border.bg
        }
      }
    }
  }

  focusStyle () {
    this.control.style.border.fg = 'white'    // Box Border Line
    this.control.style.border.bg = 'blue'     // Box Border Background
    this.control._label.style.bg = 'blue'     // Label Background
    this.control._label.style.fg = 'yellow'  // Label Tet
  }

  unfocusStyle () {
    this.control.style.border.fg = this.control.backup.style.border.fg
    this.control.style.border.bg = this.control.backup.style.border.bg
    this.control._label.style.bg = this.control.backup._label.style.bg
    this.control._label.style.fg = this.control.backup._label.style.fg
  }

  setData (data) {
    this.data = data
    this.controlData = this.handleData()

    this.update(this.controlData)
  }

  focus () {
    this.backupStyle()
    this.focusStyle()
    this.control.focus()
    this.update()
    this.focused = true
  }

  unfocus () {
    if (this.control.backup) {
      this.unfocusStyle()
    }
    this.focused = false
  }

  // // Suites
  // getPassedTestSuites () {
  //   return this.data.numPassedTestSuites
  // }
  //
  // getFailedTestSuites () {
  //   return this.data.numFailedTestSuites
  // }
  //
  // getTotalTestSuites () {
  //   return this.data.numTotalTestSuites
  // }

  // __getFileStats () {
  //   debugger
  //   let results = this.data.testResults.reduce((obj, curr) => {
  //     let pass = curr.numFailingTests == 0 ? 1 : 0
  //     let fail = curr.numFailingTests > 0 ? 1 : 0
  //
  //     if (!obj['pass']) {
  //       obj = {
  //         pass: pass,
  //         fail: fail
  //       }
  //     } else {
  //       obj['pass'] = obj['pass'] + pass
  //       obj['fail'] = obj['fail'] + fail
  //     }
  //
  //     return obj
  //   }, {})
  //
  //   return results
  // }

  // Files
  getPassedTestFiles () {
    return this.data.numPassedTestSuites
  }

  getFailedTestFiles () {
    return this.data.numFailedTestSuites
  }

  getTotalTestFiles () {
    return this.data.numPassedTestSuites + this.data.numFailedTestSuites
  }

  // Tests
  getPassedTests () {
    return this.data.numPassedTests
  }

  getFailedTests () {
    return this.data.numFailedTests
  }

  getTotalTests () {
    return this.data.numTotalTests
  }

  create () {
    throw new Error('Create Not Implemented')
  }

  handleData () {
    throw new Error('HandleData Not Implemented')
  }

  setView (view) {
    this.view = view
    // this.data = data
    this.controlData = this.handleData()
    if (this.controlData) {
      this.setLabel(this.controlData.label)
    }

    this.update(this.controlData)
    this.onSetView()
  }

  onSetView() {
  }

  update (controlData) {
    if (controlData) {
      this.control.setData(controlData)
    }

    this.control.screen.render()
  }
}

module.exports = BasePanel
