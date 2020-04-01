import { Injectable } from '@angular/core';
import {Move} from "../move/move";
import {Pokemon} from "./pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  createPokemonByName(name: string): Pokemon {
    let speed = 0;
    let offensive = 1;
    let defensive = 1;
    let hp = 30;
    const moves: Move[] = [];
    let sprite: string = "";
    let color: string = "";

    if (name === 'Milobellus') {
      color = 'blue';
      speed = 81;
      offensive = 60;
      defensive = 79;
      hp = 95;
      moves.push(Move.getMoveByName('Wrap'));
      sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png";
    }

    if (name === 'Gardevoir') {
      color = 'green';
      speed = 80;
      offensive = 65;
      defensive = 65;
      hp = 68;
      moves.push(Move.getMoveByName('Ice Punch'));
      sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/282.png";
    }

    return new Pokemon(name, color, speed, offensive, defensive, hp, moves, sprite);
  }

  attack(move: Move, target: Pokemon) {
    target.hp = target.hp - move.power;
    if (target.hp < 0) { target.hp = 0; }
  }
}
