import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon/pokemon.service";
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css']
})
export class PokemonSelectorComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.get10PokemonsFromAPI();
    console.log(this.pokemons);
  }

}
