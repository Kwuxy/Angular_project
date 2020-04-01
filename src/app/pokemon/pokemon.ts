import {Move} from '../move/move';

export class Pokemon {
  name: string;
  speed: number;
  cheater: boolean;
  level: number;
  offensive: number;
  defensive: number;
  max_hp: number;
  hp: number;
  moves: Move[];
  sprite: string;
  color: string;

  constructor(name: string, color: string = 'green', speed: number = 1, offensive: number = 1, defensive: number = 1,
              hp: number = 30, moves: Move[] = [], sprite: string, level: number = 50, cheater: boolean = false) {
    this.color = color;
    this.name = name;
    this.speed = speed;
    this.offensive = offensive;
    this.defensive = defensive;
    this.max_hp = hp;
    this.hp = hp;
    this.moves = moves;
    this.level = level;
    this.cheater = cheater;
    this.sprite = sprite;
  }

  static createPokemonByName(name: string): Pokemon {
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
      // hp = 68;
      hp = 120;
      moves.push(Move.getMoveByName('Ice Punch'));
      sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/282.png";
    }

    return new Pokemon(name, color, speed, offensive, defensive, hp, moves, sprite);
  }

  /*attack(move: Move, target: Pokemon) {
    const L = this.level;
    const A = this.offensive;
    const D = target.defensive;
    const P = move.power;

    const damages = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;
    target.hp = target.hp - damages;
  }*/

  attack(move: Move, target: Pokemon) {
    target.hp = target.hp - move.power;
    if (target.hp < 0) { target.hp = 0; }
  }
}
