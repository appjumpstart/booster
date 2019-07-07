const path = require('path')
const execa = require('execa')

const booster = '../../index.js'
const cwd = path.join(__dirname, 'fixtures')

module.exports = {
  async after () {
    await execa(booster, ['--drop'], { cwd })
    await execa(booster, ['test', '--drop'], { cwd })
  }
}
