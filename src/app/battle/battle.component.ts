import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon/pokemon';
import {TurnOrder} from './turn-order';
import {Log} from "./log";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})

export class BattleComponent implements OnInit {

  @Input() fighters: Pokemon[];
  actions: Log[];
  intervalId: number;
  isPaused: boolean;
  isFinished: boolean;
  turnOrder = new TurnOrder();
  firstAttacker: Pokemon | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.isPaused !== undefined && !this.isPaused) {
      clearInterval(this.intervalId);
    }

    this.fighters = [
      Pokemon.createPokemonByName('Gardevoir'),
      Pokemon.createPokemonByName('Milobellus')
    ];

    this.isPaused = true;
    this.isFinished = false;
    this.actions = [];
  }

  playMatch(): Promise<Pokemon> {
    return new Promise(resolve => {
      this.intervalId = setInterval(() => {
        this.playRound();
        if (!this.allPokemonsAreAlive()) {
          clearInterval(this.intervalId);
          this.isFinished = true;
          const fighterKO = this.fighters.filter(pokemon => !this.pokemonIsAlive(pokemon))[0];
          this.actions.push(new Log(`${fighterKO.name} is out of combat.`, 'red'));

          resolve(this.fighters.filter(pokemon => this.pokemonIsAlive(pokemon))[0]);
        }
      }, 1000);
    });
  }

  playRound() {
    if (this.firstAttacker === undefined) {
      this.firstAttacker = this.turnOrder.turn_order(this.fighters[0], this.fighters[1]);
      const secondPlayer = this.fighters.filter(pokemon => pokemon !== this.firstAttacker)[0];
      this.firstAttacker.attack(this.firstAttacker.moves[0], secondPlayer);
      this.actions.push(new Log(`${this.firstAttacker.name} throw move ${this.firstAttacker.moves[0].name} on ${secondPlayer.name}`, this.firstAttacker.color));
      if (!this.pokemonIsAlive(secondPlayer)) {
        return;
      }
    } else {
      const secondPlayer = this.fighters.filter(pokemon => pokemon !== this.firstAttacker)[0];
      secondPlayer.attack(secondPlayer.moves[0], this.firstAttacker);
      this.actions.push(new Log(`${secondPlayer.name} throw move ${secondPlayer.moves[0].name} on ${this.firstAttacker.name}`, secondPlayer.color));
      this.firstAttacker = undefined;
    }
  }

  allPokemonsAreAlive() {
    return this.fighters.filter(pokemon => this.pokemonIsAlive(pokemon)).length === 2;
  }

  pokemonIsAlive(pokemon: Pokemon) {
    return pokemon.hp > 0;
  }

  togglePause() {
    if (!this.isPaused) {
      clearInterval(this.intervalId);
    } else {
      this.playMatch();
    }

    this.isPaused = !this.isPaused;
  }
}
