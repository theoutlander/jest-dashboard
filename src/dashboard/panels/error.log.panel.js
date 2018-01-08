let BasePanel = require('./base/base.panel')
let contrib = require('blessed-contrib')

class ErrorLogPanel extends BasePanel {
  create () {
    this.log = this.grid.set(...this.coordinates, contrib.log, {
      fg: 'green',
      selectedFg: 'green',
      label: 'Logs',
      keys: true,
      interactive: true
    })

    return this.log
  }

  handleData () {
    this.log.log(this.data)
    return false
  }
}

module.exports = ErrorLogPanel
