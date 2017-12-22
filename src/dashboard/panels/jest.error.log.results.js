let JestBaseResults = require('../../base/jest.base.results')
let contrib = require('blessed-contrib')

class ErrorLogResults extends JestBaseResults {
  create () {
    this.log = this.grid.set(...this.coordinates, contrib.log, {
      fg: 'green',
      selectedFg: 'green',
      label: 'Logs'
    })

    return this.log
  }

  handleData () {
    this.log.log(this.data)
    return false
  }
}

module.exports = ErrorLogResults
