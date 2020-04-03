import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon/pokemon.service";
import {Pokemon} from "../pokemon/pokemon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.css']
})
export class PokemonSelectorComponent implements OnInit {
  pokemons: Pokemon[];
  firstPokemonName: string;
  secondPokemonName: string;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getPokemonsFromAPI();
  }

  firstPokemonSelected(selectedPokemonName: string) {
    this.firstPokemonName = selectedPokemonName;
  }

  secondPokemonSelected(selectedPokemonName: string) {
    this.secondPokemonName = selectedPokemonName;
  }

  goToBattle() {
    this.router.navigate([`./battle/${this.firstPokemonName}/${this.secondPokemonName}`])
  }
}
