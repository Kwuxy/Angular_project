import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from './pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() {
  }

  ngOnInit(): void {
  }
}
