import {Pokemon} from '../pokemon/pokemon';

export class TurnOrder {

  constructor(random = Math.random) {
    this.random = random;
  }
  random: any;

  static xor_cheater(p1: Pokemon, p2: Pokemon): Pokemon | null {
    if (p1.cheater && !p2.cheater) {
      p1.cheated = true;
      return p1;
    }

    if (p2.cheater && !p1.cheater) {
      p2.cheated = true;
      return p2;
    }

    return null;
  }

  getRandomInt(max: number): number {
    return Math.floor(this.random() * Math.floor(max));
  }

  turn_order(p1: Pokemon, p2: Pokemon): Pokemon {
    const cheater = TurnOrder.xor_cheater(p1, p2);

    if (cheater !== null) { return cheater; }

    if (p1.speed === p2.speed) {
      if (this.getRandomInt(2) === 0) {
        return p1;
      } else {
        return p2;
      }
    }

    return p1.speed > p2.speed ? p1 : p2;
  }
}
