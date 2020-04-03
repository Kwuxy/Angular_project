import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../pokemon/pokemon';
import {PokemonService} from "../pokemon/pokemon.service";
import {Battle} from "./battle";
import {BattleService} from "./battle.service";
import {ActivatedRoute, Params} from "@angular/router";

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
  firstPokemonName: string;
  secondPokemonName: string;

  constructor(private pokemonService: PokemonService, private battleService: BattleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.firstPokemonName = params.firstPokemon;
      this.secondPokemonName = params.secondPokemon;
      this.initialize();
    });
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
    this.fighters = [
      this.pokemonService.getPokemonFromPokeApi(this.firstPokemonName),
      this.pokemonService.getPokemonFromPokeApi(this.secondPokemonName)
    ];

    this.battle = new Battle(this.fighters);
    this.battleService.initialize(this.battle);
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

}
