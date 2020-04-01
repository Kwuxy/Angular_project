import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon/pokemon';
import {PokemonService} from "../pokemon/pokemon.service";
import {Battle} from "./battle";
import {BattleService} from "./battle.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  providers: [ PokemonService, BattleService ]
})

export class BattleComponent implements OnInit {

  //@Input()
  fighters: Pokemon[];
  battle: Battle;

  constructor(private pokemonService: PokemonService, private battleService: BattleService) { }

  ngOnInit(): void {
    this.initialize();
  }

  togglePause() {
    this.battleService.togglePause(this.battle);
  }

  initialize() {
    // TODO: à injecter plus tard
    this.fighters = [
      this.pokemonService.createPokemonByName('Gardevoir'),
      this.pokemonService.createPokemonByName('Milobellus')
    ];

    this.battle = new Battle(this.fighters);
    this.battleService.initialize(this.battle);
  }

}
