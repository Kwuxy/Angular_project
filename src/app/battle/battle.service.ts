import {Injectable} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";
import {Log} from "./log";
import {Battle} from "./battle";
import {PokemonService} from "../pokemon/pokemon.service";
import {DatePipe, DecimalPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private pokemonService: PokemonService, private datePipe: DatePipe, private decimalPipe: DecimalPipe) { }

  playMatch(battle: Battle, date: Date = new Date()): Promise<Pokemon> {
    if(battle.isBeginning) {
      battle.actions.push(new Log(`The match begins at ${this.datePipe.transform(date, 'medium')}`));
    }

    return new Promise(resolve => {
      battle.intervalId = setInterval(() => {
        this.playRound(battle);
        if (!this.allPokemonsAreAlive(battle.fighters)) {
          clearInterval(battle.intervalId);
          battle.isFinished = true;
          const fighterKO = battle.fighters.filter(pokemon => !this.pokemonIsAlive(pokemon))[0];
          battle.actions.push(new Log(`${fighterKO.name} is out of combat.`, 'red'));

          resolve(battle.fighters.filter(pokemon => this.pokemonIsAlive(pokemon))[0]);
        }
      }, 1000);
    });
  }

  playRound(battle: Battle) {
    if (battle.firstAttacker === undefined) {
      battle.firstAttacker = battle.turnOrder.turn_order(battle.fighters[0], battle.fighters[1]);
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let damages = this.pokemonService.attack(battle.firstAttacker.moves[0], secondPlayer);
      battle.actions.push(new Log(`${battle.firstAttacker.name} throw move ${battle.firstAttacker.moves[0].name}
      on ${secondPlayer.name} and deals ${this.decimalPipe.transform(damages, '1.1')} HP damages.`, battle.firstAttacker.color));
      if (!this.pokemonIsAlive(secondPlayer)) {
        return;
      }
    } else {
      const secondPlayer = battle.fighters.filter(pokemon => pokemon !== battle.firstAttacker)[0];
      let damages = this.pokemonService.attack(secondPlayer.moves[0], battle.firstAttacker);
      battle.actions.push(new Log(`${secondPlayer.name} throw move ${secondPlayer.moves[0].name}
       on ${battle.firstAttacker.name} and deals ${this.decimalPipe.transform(damages, '1.1')} HP damages.`, secondPlayer.color));
      battle.firstAttacker = undefined;
    }
  }

  allPokemonsAreAlive(fighters: Pokemon[]) {
    return fighters.filter(pokemon => this.pokemonIsAlive(pokemon)).length === 2;
  }

  pokemonIsAlive(pokemon: Pokemon) {
    return pokemon.hp > 0;
  }

  togglePause(battle: Battle) {
    if (!battle.isPaused) {
      clearInterval(battle.intervalId);
    } else {
      this.playMatch(battle);
    }

    battle.isBeginning = false;
    battle.isPaused = !battle.isPaused;
  }

  initialize(battle: Battle) {
    if (battle.isPaused !== undefined && !battle.isPaused) {
      clearInterval(battle.intervalId);
    }
    battle.isPaused = true;
    battle.isFinished = false;
    battle.actions = [];
  }
}
