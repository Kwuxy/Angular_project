import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector-list',
  templateUrl: './pokemon-selector-list.component.html',
  styleUrls: ['./pokemon-selector-list.component.css']
})
export class PokemonSelectorListComponent implements OnInit {
  @Input() pokemons: Pokemon[];
  firstPokemon = '';
  secondPokemon = '';

  constructor() { }

  ngOnInit(): void {
  }

  setFirstPokemon(selectedPokemonName: string) {
    this.firstPokemon = selectedPokemonName;
  }
}
