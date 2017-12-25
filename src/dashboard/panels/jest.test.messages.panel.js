let JestBaseResults = require('../../base/jest.base.results')
let blessed = require('blessed')

class TestMessagesPanel extends JestBaseResults {
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

module.exports = TestMessagesPanel
