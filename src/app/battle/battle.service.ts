import {Injectable} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {Log} from "./log";
import {Battle} from "./battle";
import {PokemonService} from "../pokemon/pokemon.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {interval, Observable} from "rxjs";
import {map, retry, takeWhile} from "rxjs/operators";
import {TurnOrder} from "./turn-order";
import {UtilsService} from "../utils/utils.service";
import {Move} from "../move/move";

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  roundInterval: number = 1000;
  turnOrder: TurnOrder;

  constructor(private pokemonService: PokemonService, private datePipe: DatePipe, private decimalPipe: DecimalPipe,
              private utilsService: UtilsService) {
    this.turnOrder = new TurnOrder(utilsService);
  }

  playMatch(battle: Battle, date: Date = new Date()): Observable<Pokemon> {
    if(battle.isBeginning) {
      battle.actions.push(new Log(`The match begins at ${this.datePipe.transform(date, 'medium')}`));
    }

    return interval(this.roundInterval)
      .pipe(
        takeWhile(() => !battle.isFinished),
        map(() => {
        this.playRound(battle);
        if (!this.allPokemonsAreAlive(battle.fighters)) {
          battle.isFinished = true;
          const fighterKO = battle.fighters.filter(pokemon => !this.pokemonIsAlive(pokemon))[0];
          battle.actions.push(new Log(`${fighterKO.name} is out of combat.`, 'red'));
          return battle.fighters.filter(pokemon => this.pokemonIsAlive(pokemon))[0];
        }
      }));
  }

  playRound(battle: Battle) {
    if (battle.firstAttacker === undefined) {

      battle.firstAttacker = this.turnOrder.turn_order(battle.fighters[0], battle.fighters[1]);
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let move = battle.firstAttacker.moves[this.utilsService.getRandomInt(battle.firstAttacker.moves.length)];
      this.attackAndLog(battle, battle.firstAttacker, move, secondPlayer);
      if (!this.pokemonIsAlive(secondPlayer)) {
        return;
      }
    } else {
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let move = secondPlayer.moves[this.utilsService.getRandomInt(secondPlayer.moves.length)];
      this.attackAndLog(battle, secondPlayer, move, battle.firstAttacker);

      this.resetPokemonCheat(battle.firstAttacker);
      this.resetPokemonCheat(secondPlayer);
      battle.firstAttacker = undefined;
    }
  }

  resetPokemonCheat(pokemon: Pokemon) {
    if (pokemon.cheated) {
      pokemon.cheater = false;
      pokemon.cheated = false;
    }
  }

  allPokemonsAreAlive(fighters: Pokemon[]) {
    return fighters.filter(pokemon => this.pokemonIsAlive(pokemon)).length === 2;
  }

  pokemonIsAlive(pokemon: Pokemon) {
    return pokemon.hp > 0;
  }

  initialize(battle: Battle) {
    if (battle.isPaused !== undefined && !battle.isPaused) {
      clearInterval(battle.intervalId);
    }
    battle.isPaused = true;
    battle.isFinished = false;
    battle.actions = [];
  }

  togglePause(battle: Battle) {
    battle.isBeginning = false;
    battle.isPaused = !battle.isPaused;
  }

  attackAndLog(battle: Battle, attacker: Pokemon, move: Move, target: Pokemon) {
    let damages = this.pokemonService.attack(attacker, move, target);
    let log: string;

    if (damages !== 0) { // hits
      log = `${attacker.name} throw move ${move.name}
       on ${target.name} and deals ${this.decimalPipe.transform(damages, '1.1')} HP damages.
       ${attacker.cheated ? '(Cheater :-) )' : ''}`;
    } else { // miss
      log = `${attacker.name} tries to throw move ${move.name} on ${target.name} but misses and deals no damages.`
    }

    battle.actions.push(new Log(log, attacker.color));
  }
}
