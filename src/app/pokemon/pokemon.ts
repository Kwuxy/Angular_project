import {Move} from '../move/move';

export class Pokemon {
  name: string;
  speed: number;
  cheater: boolean;
  cheated = false;
  level: number;
  offensive: number;
  defensive: number;
  max_hp: number;
  hp: number;
  moves: Move[];
  sprites: PokemonSprites;
  color: string;

  constructor(name: string, color: string = 'green', speed: number = 1, offensive: number = 1, defensive: number = 1,
              hp: number = 30, moves: Move[] = [], sprites: PokemonSprites = new PokemonSprites(), level: number = 50,
              cheater: boolean = false) {
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
    this.sprites = sprites;
  }
}

export class PokemonSprites {
  front: string;
  back: string;

  constructor() { }
}
