import { Player } from './player'
import { AI } from './ai'
import { Ball } from './ball'
import { Config } from './config'

import '../assets/scss/game.scss'

class Game {
  constructor() {
    this.setListeners()
  }

  setupGameObjects() {
    this.player1 = new Player(0, 200, 'Jack')
    this.player2 = this.inOnePlayerMode ? new AI(485, 200, 'AI') : new Player(485, 200, 'Gill')
    this.ball = new Ball(250, 250)
  }

  start() {
    this.gameLoop = setInterval(() => this.update(), Config.fps)
  }

  update() {
    Config.ctx.clearRect(0, 0, Config.canvasSize, Config.canvasSize)

    this.player1.draw()
    this.player2.draw()
    this.player1.updateScore(30, 20)
    this.player2.updateScore(450, 20)

    this.ball.draw()
    this.ball.move()
    this.ball.checkCollision(this.player1, this.player2)

    this.checkWinner()

    if (this.inOnePlayerMode) {
      this.player2.move(this.ball.y)
    }
  }

  checkWinner() {
    if (this.player1.score >= 3) {
      this.restartGame()
    } else if (this.player2.score >= 3) {
      this.restartGame()
    }
  }

  restartGame() {
    clearInterval(this.gameLoop)

    this.player1.score = 0
    this.player2.score = 0

    this.start()
  }

  setPlayerMode() {
    const splash = document.querySelector('#splash')
    const modeButtons = document.querySelectorAll('#splash > div > button')

    return new Promise((resolve) => {
      modeButtons.forEach((modeButton) => {
        modeButton.addEventListener('click', (e) => {
          const playerMode = e.target.innerHTML

          this.inOnePlayerMode = playerMode === 'One Player'
          this.setupGameObjects()
          this.start()

          splash.remove()

          resolve()
        })
      })
    })
  }

  setupGameControls() {
    document.addEventListener('keydown', key => {
      switch (key.keyCode) {
        case 38:
          this.player1.y -= 50
          break
        case 40:
          this.player1.y += 50
          break
        case 87:
          this.player2.y -= 50
          break
        case 65:
          this.player2.y += 50
          break
        default:
          this.update()
      }
    })
  }

  setListeners() {
    this.setPlayerMode().then(this.setupGameControls.bind(this))
  }
}

new Game()