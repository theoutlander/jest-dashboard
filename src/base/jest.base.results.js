class JestBaseResults {
  constructor (grid, coordinates) {
    this.grid = grid
    this.coordinates = coordinates

    this.control = this.create()
    this.setStyle()

    if (this.control) {
      this.control.on('focus', function () {
        debugger

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
  }

  unfocus () {
    if (this.control.backup) {
      this.unfocusStyle()
    }
  }

  getPassedTestSuites () {
    return this.data.numPassedTestSuites
  }

  getFailedTestSuites () {
    return this.data.numFailedTestSuites
  }

  getTotalTestSuites () {
    return this.data.numTotalTestSuites
  }

  create () {
    throw new Error('Create Not Implemented')
  }

  handleData () {
    throw new Error('HandleData Not Implemented')
  }

  update (controlData) {
    if (controlData) {
      this.control.setData(controlData)
    }

    this.control.screen.render()
  }
}

module.exports = JestBaseResults
