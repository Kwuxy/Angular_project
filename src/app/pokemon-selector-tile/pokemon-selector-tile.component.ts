import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-pokemon-selector-tile',
  templateUrl: './pokemon-selector-tile.component.html',
  styleUrls: ['./pokemon-selector-tile.component.css']
})
export class PokemonSelectorTileComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() onSelect = new EventEmitter<string>();
  @Input() selectedPokemonName: string;

  constructor() { }

  ngOnInit(): void {
  }

  onPokemonSelect() {
    this.onSelect.emit(this.pokemon.name);
  }

}
