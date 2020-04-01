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
}
