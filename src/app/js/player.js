import { Config } from './config'

export class Player {
  constructor(x, y, name) {
    this.name = name
    this.width = 15
    this.height = 100
    this.x = x
    this.y = y
    this.score = 0
  }

  draw() {
    Config.ctx.beginPath()
    Config.ctx.fillRect(this.x, this.y, this.width, this.height)
    Config.ctx.strokeStyle = "#FFF"
    Config.ctx.stroke()
    Config.ctx.closePath()
  }

  updateScore(x, y) {
    Config.ctx.beginPath()
    Config.ctx.fillText(this.name + ': ' + this.score, x, y)
    Config.ctx.closePath()
  }

  move(y) {
    this.y = y
  }
}