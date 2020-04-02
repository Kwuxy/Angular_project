import {Injectable} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {Log} from "./log";
import {Battle} from "./battle";
import {PokemonService} from "../pokemon/pokemon.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {interval, Observable} from "rxjs";
import {map, retry, takeWhile} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  roundInterval: number = 1000;

  constructor(private pokemonService: PokemonService, private datePipe: DatePipe, private decimalPipe: DecimalPipe) { }

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

      battle.firstAttacker = battle.turnOrder.turn_order(battle.fighters[0], battle.fighters[1]);
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let move = battle.firstAttacker.moves[battle.turnOrder.getRandomInt(battle.firstAttacker.moves.length)];
      let damages = this.pokemonService.attack(move, secondPlayer);
      battle.actions.push(new Log(`${battle.firstAttacker.name} throw move ${move.name}
      on ${secondPlayer.name} and deals ${this.decimalPipe.transform(damages, '1.1')} HP damages. ${battle.firstAttacker.cheated ? '(Cheater :-) )' : ''}`, battle.firstAttacker.color));
      if (!this.pokemonIsAlive(secondPlayer)) {
        return;
      }
    } else {
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let move = secondPlayer.moves[battle.turnOrder.getRandomInt(secondPlayer.moves.length)];
      let damages = this.pokemonService.attack(move, battle.firstAttacker);
      battle.actions.push(new Log(`${secondPlayer.name} throw move ${move.name}
       on ${battle.firstAttacker.name} and deals ${this.decimalPipe.transform(damages, '1.1')} HP damages. ${secondPlayer.cheated ? '(Cheater :-) )' : ''}`, secondPlayer.color));

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
}
