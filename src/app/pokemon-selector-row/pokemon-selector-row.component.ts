import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector-row',
  templateUrl: './pokemon-selector-row.component.html',
  styleUrls: ['./pokemon-selector-row.component.css']
})
export class PokemonSelectorRowComponent implements OnInit {

  @Input() pokemons: Pokemon[];
  @Input() selectedPokemonName: string;
  @Output() onSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectPokemon(selectedPokemonName: string) {
    this.onSelect.emit(selectedPokemonName);
  }
}
