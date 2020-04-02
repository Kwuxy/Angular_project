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
  subscriber;

  constructor(private pokemonService: PokemonService, private battleService: BattleService) { }

  ngOnInit(): void {
    this.initialize();
  }

  togglePause() {
    if(this.battle.isPaused) {
      this.play();
    }else{
      this.pause();
    }

    this.battleService.togglePause(this.battle);
  }

  play() {
    this.subscriber = this.battleService.playMatch(this.battle).subscribe(
      () => { },
      err => console.log(err)
    );
  }

  pause() {
    this.subscriber.unsubscribe();
  }

  initialize() {
    // TODO: à injecter plus tard
    this.fighters = [
      this.pokemonService.getPokemonFromPokeApi('milotic'),
      this.pokemonService.getPokemonFromPokeApi('gardevoir')
    ];

    this.battle = new Battle(this.fighters);
    this.battleService.initialize(this.battle);
  }

  ngOnDestroy(): void {
    //TODO: clearinterval
    this.subscriber.unsubscribe();
  }

}
