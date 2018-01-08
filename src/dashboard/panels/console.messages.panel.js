let BasePanel = require('./base/base.panel')
let blessed = require('blessed')

class CondsoleMessagesPanel extends BasePanel {
  create () {
    this.log = this.grid.set(...this.coordinates, blessed.box, {
      fg: 'green',
      selectedFg: 'green',
      label: 'Logs',
      keys: true,
      interactive: true
    })

    return this.log
  }

  clear() {
    this.log.content = ''
  }

  handleData () {
    this.log.content += this.data + '\n'
    return false
  }
}

module.exports = CondsoleMessagesPanel
