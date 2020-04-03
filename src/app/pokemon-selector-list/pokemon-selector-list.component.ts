import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector-list',
  templateUrl: './pokemon-selector-list.component.html',
  styleUrls: ['./pokemon-selector-list.component.css']
})
export class PokemonSelectorListComponent implements OnInit {
  @Input() pokemons: Pokemon[];
  selectedPokemonName = '';
  pokemonsAsGrid;

  @Output() onSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.pokemonsAsGrid = this.chunkArray(this.pokemons, 6);
  }

  setFirstPokemon(selectedPokemonName: string) {
    this.selectedPokemonName = selectedPokemonName;
    this.onSelect.emit(selectedPokemonName);
  }

  chunkArray(array: Pokemon[], chunkSize: number) {
    return [].concat.apply([],
      array.map((elem, i) => {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
}
