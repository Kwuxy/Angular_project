export class Move {
  name: string;
  power: number;

  constructor(name: string, power: number = 1) {
    this.name = name;
    this.power = power;
  }

  static getMoveByName(name: string) {
    const move: Move = new Move(name);

    if (name === 'Wrap') {
      move.power = 15;
    }
    if (name === 'Ice Punch') {
      move.power = 75;
    }

    return move;
  }
}
