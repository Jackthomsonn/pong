import { Config } from './config'

export class Ball {
  constructor(x, y) {
    this.size = 15
    this.radius = 10
    this.x = x
    this.y = y
    this.dx = 5
    this.dy = 5
  }

  draw() {
    Config.ctx.beginPath()
    Config.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    Config.ctx.fillStyle = 'green'
    Config.ctx.fill()
  }

  move() {
    if (this.x + this.dx > 500 || this.x + this.dx < this.radius) {
      this.dx = -this.dx
    }
    if (
      this.y + this.dy > 500 - this.radius ||
      this.y + this.dy < this.radius
    ) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy
  }

  checkCollision(player1, player2) {
    if (
      this.x < player1.x + player1.width * 2 &&
      this.y < player1.y + player1.height &&
      this.y > player1.y
    ) {
      this.dx = -this.dx
      if (this.y % player1.y < 50) {
        this.dy = this.dy
      } else {
        this.dy = -this.dy
      }
    }

    if (
      this.x > player2.x - player2.width &&
      this.y < player2.y + player2.height &&
      this.y > player2.y
    ) {
      this.dx = -this.dx
      if (this.y % player2.y < 50) {
        this.dy = this.dy
      } else {
        this.dy = -this.dy
      }
    }

    if (this.x === 10) {
      player2.score++
    }

    if (this.x === player2.x + player2.width) {
      player1.score++
    }
  }
}