import {Pokemon} from '../pokemon/pokemon';
import {UtilsService} from "../utils/utils.service";

export class TurnOrder {
  utilsService: UtilsService;

  constructor(utilsService: UtilsService) {
    this.utilsService = utilsService;
  }

  xor_cheater(p1: Pokemon, p2: Pokemon): Pokemon | null {
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

  turn_order(p1: Pokemon, p2: Pokemon): Pokemon {
    const cheater = this.xor_cheater(p1, p2);

    if (cheater !== null) { return cheater; }

    if (p1.speed === p2.speed) {
      if (this.utilsService.getRandomInt(2) === 0) {
        return p1;
      } else {
        return p2;
      }
    }

    return p1.speed > p2.speed ? p1 : p2;
  }
}
