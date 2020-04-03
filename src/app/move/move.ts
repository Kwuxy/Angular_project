export class Move {
  name: string;
  power: number;
  accuracy: number;

  constructor(name: string, power: number = 1, accuracy: number = 75) {
    this.name = name;
    this.power = power;
    this.accuracy = accuracy;
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
