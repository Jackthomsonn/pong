import { Player } from './player'

export class AI extends Player {
  constructor(x, y, name) {
    super(x, y, name)
  }

  move(y) {
    this.y = y
  }
}